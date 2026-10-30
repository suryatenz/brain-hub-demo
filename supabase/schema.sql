-- BRAIN Hub — auth + role hierarchy schema
-- Run this once in the Supabase SQL editor (Project > SQL Editor > New query).
-- Hierarchy, lowest to highest: public < student < faculty < industry < admin
-- (matches the roles already described on the Hub preview page)

create type public.brain_role as enum ('public', 'student', 'faculty', 'industry', 'admin');

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text,
  institution text,
  role public.brain_role not null default 'student',
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- security definer functions run with the privileges of their owner (the
-- postgres role in the SQL editor, which bypasses RLS), so this check does
-- NOT re-trigger the policies below — a plain subquery on profiles inside a
-- profiles policy would cause "infinite recursion detected in policy".
create function public.is_admin(uid uuid)
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (select 1 from public.profiles where id = uid and role = 'admin');
$$;

-- Everyone who is logged in can read their own profile row.
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

-- Admins can read every profile (needed for the "manage roles" panel).
create policy "profiles_select_admin_all"
  on public.profiles for select
  using (public.is_admin(auth.uid()));

-- Everyone who is logged in can update their own row (name/institution).
-- The trigger below stops this from being used to self-promote a role.
create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

-- Admins can update any profile's role (the self-escalation trigger below
-- exempts admins by definition, since is_admin(auth.uid()) is true for them).
create policy "profiles_update_admin_any"
  on public.profiles for update
  using (public.is_admin(auth.uid()));

-- New signups get a profiles row automatically, seeded from the metadata
-- passed to supabase.auth.signUp() (full_name, institution).
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, institution)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'institution'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Prevent a user from promoting their own role through the update policy
-- above; only an existing admin (via the app) or a direct SQL editor /
-- postgres connection (which has no auth.uid() at all) can change a role.
-- auth.uid() is null outside of a PostgREST-authenticated request, so this
-- also lets you bootstrap the very first admin straight from the SQL editor.
create function public.prevent_role_self_escalation()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  if new.role is distinct from old.role then
    if auth.uid() is not null and not public.is_admin(auth.uid()) then
      new.role := old.role;
    end if;
  end if;
  return new;
end;
$$;

create trigger enforce_role_hierarchy
  before update on public.profiles
  for each row execute function public.prevent_role_self_escalation();

-- To make the first admin (yourself), after signing up once through the
-- app, run this in the SQL editor:
--   update public.profiles set role = 'admin' where email = 'you@university.edu';

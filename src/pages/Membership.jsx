import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Users, Boxes, Rocket, ShieldCheck, GraduationCap } from "lucide-react";
import PageTransition from "../components/PageTransition";
import { FeatureCard } from "../components/Card";
import AnimatedStat from "../components/AnimatedStat";
import { Headline, Reveal } from "../components/fx/Reveal";

const stats = [
  { value: "9", label: "Member universities" },
  { value: "50+", label: "Expert faculty" },
  { value: "6×", label: "Leverage on investment" },
];

const benefits = [
  {
    icon: Users,
    color: "rose",
    title: "Collaboration & Governance",
    desc: "Pool funds for pre-competitive research, network with other IAB members, and meet twice a year to vote on funded projects.",
  },
  {
    icon: Boxes,
    color: "green",
    title: "Access & Resources",
    desc: "Access the Center's technology roadmaps and research portfolio, and engage expert faculty and students across all nine sites.",
  },
  {
    icon: Rocket,
    color: "orange",
    title: "Funding & Acceleration",
    desc: "Partner with BRAIN sites on federal grant applications (SBIR, STTR) with rapid teaming for large opportunities.",
  },
  {
    icon: ShieldCheck,
    color: "maroon",
    title: "IP & Policy",
    desc: "Receive a royalty-free, non-exclusive license to generated intellectual property under the IUCRC IP policy.",
  },
  {
    icon: GraduationCap,
    color: "peach",
    title: "Workforce & Talent",
    desc: "Priority recruiting from Center programs, sabbaticals between industry and Center labs, and degree-granting mentorship.",
  },
];

export default function Membership() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <PageTransition>
      <section className="relative border-b border-ink-100">
        <div className="container-page pb-16 pt-16 sm:pb-24 sm:pt-24">
          <span className="eyebrow">Membership</span>
          <Headline as="h1" onMount className="display-2 mt-6 max-w-[18ch]">
            {`"Join Us" that actually *leads somewhere*`}
          </Headline>
          <p className="lead mt-8 max-w-xl">
            BRAIN Center members shape the research agenda, access multi-institution talent and resources, and gain
            structured pathways for technology transfer through the NSF IUCRC model.
          </p>
        </div>
      </section>

      <section className="container-page">
        <div className="grid grid-cols-3 border-b border-ink-100">
          {stats.map((st, i) => (
            <Reveal key={st.label} delay={i * 0.08} className={`py-12 sm:py-16 ${i > 0 ? "border-l border-ink-100 pl-4 sm:pl-8" : ""}`}>
              <AnimatedStat value={st.value} className="tnum font-display text-[clamp(2rem,4vw,3.4rem)] leading-none tracking-[-0.03em] text-ink-900" />
              <div className="mono-label mt-4 text-slate-muted">{st.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-page section-pad grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map((t, i) => (
          <FeatureCard key={t.title} icon={t.icon} color={t.color} title={t.title} index={i}>
            {t.desc}
          </FeatureCard>
        ))}
      </section>

      <section className="container-page pb-24">
        <div className="mx-auto max-w-xl border border-ink-900/15 bg-white p-8 sm:p-10">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              role="status"
              aria-live="polite"
              className="flex flex-col items-center py-6 text-center"
            >
              <CheckCircle2 size={40} className="mb-3 text-accent-greenInk" aria-hidden="true" />
              <h3 className="font-display text-xl font-semibold text-ink-900">
                Thanks, {name || "there"} — request received.
              </h3>
              <p className="mt-2 text-sm text-slate-muted">
                This is a demo — in production, this would notify the membership team.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <h3 className="display-3 text-ink-900">Request to join</h3>
              <p className="-mb-1 text-xs text-slate-muted">
                Fields marked <span aria-hidden="true" className="font-semibold text-accent-roseInk">*</span>
                <span className="sr-only">with an asterisk</span> are required.
              </p>
              <div>
                <label htmlFor="mem-name" className="mb-1 block text-xs font-semibold text-ink-700">
                  Name <span aria-hidden="true" className="text-accent-roseInk">*</span>
                </label>
                <input
                  id="mem-name"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="min-h-11 w-full rounded-xl border border-ink-100 px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500"
                  placeholder="Jane Doe"
                />
              </div>
              <div>
                <label htmlFor="mem-email" className="mb-1 block text-xs font-semibold text-ink-700">
                  Email <span aria-hidden="true" className="text-accent-roseInk">*</span>
                </label>
                <input
                  id="mem-email"
                  required
                  type="email"
                  autoComplete="email"
                  className="min-h-11 w-full rounded-xl border border-ink-100 px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500"
                  placeholder="jane@university.edu"
                />
              </div>
              <div>
                <label htmlFor="mem-inst" className="mb-1 block text-xs font-semibold text-ink-700">Institution</label>
                <input
                  id="mem-inst"
                  autoComplete="organization"
                  className="min-h-11 w-full rounded-xl border border-ink-100 px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500"
                  placeholder="University of Houston"
                />
              </div>
              <div>
                <label htmlFor="mem-interest" className="mb-1 block text-xs font-semibold text-ink-700">I'm interested in</label>
                <select
                  id="mem-interest"
                  className="min-h-11 w-full rounded-xl border border-ink-100 px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500"
                >
                  <option>Industry Partner (IAB)</option>
                  <option>Student Network</option>
                  <option>Faculty / Partner Institution</option>
                </select>
              </div>
              <button
                type="submit"
                className="chip mt-2 min-h-12 rounded-full bg-signal px-7 font-medium text-ink-900 transition-transform hover:scale-[1.02]"
              >
                Submit request
              </button>
            </form>
          )}
        </div>
      </section>
    </PageTransition>
  );
}

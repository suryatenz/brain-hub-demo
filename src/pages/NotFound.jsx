import { Link } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import Magnetic from "../components/fx/Magnetic";
import { Headline } from "../components/fx/Reveal";

export default function NotFound() {
  return (
    <PageTransition>
      <section className="on-dark relative flex min-h-[70svh] items-center overflow-hidden bg-ink text-paper">
        <div className="bg-grid-dark absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="container-page relative py-24">
          <span className="eyebrow">Error 404</span>
          <Headline as="h1" onMount accent="text-signal" className="display-1 mt-6">
            Signal *lost.*
          </Headline>
          <p className="lead mt-8 max-w-md">
            This page doesn't exist in the demo — try the navigation above, or head back to the start.
          </p>
          <div className="mt-10">
            <Magnetic>
              <Link
                to="/"
                className="chip min-h-12 rounded-full bg-signal px-7 font-medium text-ink-900 transition-transform hover:scale-[1.03]"
              >
                Back to home
              </Link>
            </Magnetic>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

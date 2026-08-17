import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms governing use of the enelope.ch website.",
};

const linkClass = "text-brand underline underline-offset-2 hover:no-underline dark:text-signal";

export default function TermsPage() {
  return (
    <div className="py-20 sm:py-28">
      <Container className="max-w-2xl">
        <h1 className="font-display text-3xl font-medium text-ink dark:text-white">
          Terms of Service
        </h1>
        <p className="mt-4 text-sm text-ink-soft dark:text-white/50">
          Last updated: August 17, 2026
        </p>
        <div className="mt-10 space-y-8 text-sm leading-relaxed text-ink-soft dark:text-white/70">
          <section>
            <h2 className="font-display text-lg font-medium text-ink dark:text-white">
              Acceptance of terms
            </h2>
            <p className="mt-2">
              By using enelope.ch (the "Site"), you agree to these terms.
              These terms govern use of the Site only — they don't govern any
              paid engagement with Enelope, which is covered by a separate
              signed agreement or statement of work.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-medium text-ink dark:text-white">
              Use of the site
            </h2>
            <p className="mt-2">
              The Site is provided for informational purposes — to describe
              our services, share case studies, and let you get in touch. You
              agree not to misuse the Site, including attempting to gain
              unauthorized access to the admin panel or any other non-public
              part of the Site.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-medium text-ink dark:text-white">
              Engaging our services
            </h2>
            <p className="mt-2">
              Descriptions of services on this Site are informational and do
              not constitute an offer or contract. Project scope, pricing,
              deliverables, and ownership of work product for any engagement
              are defined exclusively in a separate written agreement between
              Enelope and the client.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-medium text-ink dark:text-white">
              Intellectual property
            </h2>
            <p className="mt-2">
              The Site's content, design, and the Enelope name and logo are
              owned by Enelope and may not be copied or reused without
              permission. This does not apply to deliverables produced under
              a separate client agreement, which is governed by that
              agreement's IP terms.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-medium text-ink dark:text-white">
              No warranty
            </h2>
            <p className="mt-2">
              The Site is provided "as is," without warranties of any kind. We
              don't guarantee the Site will be uninterrupted, error-free, or
              available at all times.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-medium text-ink dark:text-white">
              Limitation of liability
            </h2>
            <p className="mt-2">
              To the fullest extent permitted by law, Enelope is not liable
              for any indirect, incidental, or consequential damages arising
              from your use of the Site.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-medium text-ink dark:text-white">
              Third-party services
            </h2>
            <p className="mt-2">
              The Site relies on third-party providers (Supabase, Resend,
              Vercel) to operate. We aren't responsible for outages or issues
              originating from those providers.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-medium text-ink dark:text-white">
              Governing law
            </h2>
            <p className="mt-2">
              These terms are governed by the laws of Switzerland, without
              regard to conflict-of-law principles.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-medium text-ink dark:text-white">
              Changes to these terms
            </h2>
            <p className="mt-2">
              We may update these terms from time to time. Material changes
              will be reflected by updating the date at the top of this page.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-medium text-ink dark:text-white">
              Contact
            </h2>
            <p className="mt-2">
              Questions about these terms? Email{" "}
              <a href="mailto:hello@enelope.ch" className={linkClass}>
                hello@enelope.ch
              </a>
              .
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}

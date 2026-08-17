import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Enelope collects, uses, and protects your information.",
};

const linkClass = "text-brand underline underline-offset-2 hover:no-underline dark:text-signal";

export default function PrivacyPage() {
  return (
    <div className="py-20 sm:py-28">
      <Container className="max-w-2xl">
        <h1 className="font-display text-3xl font-medium text-ink dark:text-white">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-ink-soft dark:text-white/50">
          Last updated: August 17, 2026
        </p>
        <div className="mt-10 space-y-8 text-sm leading-relaxed text-ink-soft dark:text-white/70">
          <section>
            <h2 className="font-display text-lg font-medium text-ink dark:text-white">
              Overview
            </h2>
            <p className="mt-2">
              This policy explains what information Enelope ("we", "us")
              collects through enelope.ch, how we use it, and who we share it
              with. It covers this website only — separate agreements govern
              any client engagement or project work.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-medium text-ink dark:text-white">
              Information we collect
            </h2>
            <p className="mt-2">We collect information in two ways:</p>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>
                <strong className="text-ink dark:text-white">Contact form.</strong>{" "}
                When you submit the contact form, we receive the name, email,
                company, phone number, service of interest, and message you
                provide.
              </li>
              <li>
                <strong className="text-ink dark:text-white">Basic hosting logs.</strong>{" "}
                Our hosting provider (Vercel) automatically logs standard
                request data (such as IP address and browser type) for
                security and reliability. We do not use analytics or
                advertising trackers on this site.
              </li>
            </ul>
            <p className="mt-2">
              Your theme preference (light or dark mode) is stored locally in
              your browser and never sent to us.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-medium text-ink dark:text-white">
              How we use your information
            </h2>
            <p className="mt-2">
              We use contact form submissions solely to respond to your
              inquiry. We do not sell your personal data, and we do not use
              it for marketing unless you separately opt in.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-medium text-ink dark:text-white">
              Third-party service providers
            </h2>
            <p className="mt-2">
              We rely on a small number of subprocessors to run this site and
              deliver contact form messages:
            </p>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>
                <strong className="text-ink dark:text-white">Supabase</strong> — hosts
                our database, authentication, and file storage for the
                services and testimonials shown on this site (
                <a
                  href="https://supabase.com/privacy"
                  target="_blank"
                  rel="noreferrer"
                  className={linkClass}
                >
                  privacy policy
                </a>
                ).
              </li>
              <li>
                <strong className="text-ink dark:text-white">Resend</strong> — delivers
                the email generated when you submit the contact form (
                <a
                  href="https://resend.com/legal/privacy-policy"
                  target="_blank"
                  rel="noreferrer"
                  className={linkClass}
                >
                  privacy policy
                </a>
                ).
              </li>
              <li>
                <strong className="text-ink dark:text-white">Vercel</strong> — hosts
                this website (
                <a
                  href="https://vercel.com/legal/privacy-policy"
                  target="_blank"
                  rel="noreferrer"
                  className={linkClass}
                >
                  privacy policy
                </a>
                ).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-lg font-medium text-ink dark:text-white">
              Cookies
            </h2>
            <p className="mt-2">
              We don't use tracking or advertising cookies. Signing into the
              admin panel sets a secure, necessary session cookie used only to
              keep you authenticated.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-medium text-ink dark:text-white">
              Data retention
            </h2>
            <p className="mt-2">
              Contact form submissions are emailed directly to our team and
              are not stored in a database. Services and testimonials content
              is retained in our database until removed by an administrator.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-medium text-ink dark:text-white">
              Your rights
            </h2>
            <p className="mt-2">
              You can ask us what information we hold about you, or request
              that we delete it, by emailing{" "}
              <a href="mailto:hello@enelope.ch" className={linkClass}>
                hello@enelope.ch
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-medium text-ink dark:text-white">
              Changes to this policy
            </h2>
            <p className="mt-2">
              We may update this policy from time to time. Material changes
              will be reflected by updating the date at the top of this page.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-medium text-ink dark:text-white">
              Contact
            </h2>
            <p className="mt-2">
              Questions about this policy? Email{" "}
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

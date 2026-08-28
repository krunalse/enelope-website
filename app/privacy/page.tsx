import type { Metadata } from "next";
import { LegalBody, linkClass } from "@/components/legal/LegalBody";
import { LegalPage, LegalSection } from "@/components/legal/LegalPage";
import { dictionary } from "@/lib/content/dictionary";

export const metadata: Metadata = {
  title: dictionary.meta.privacy.title,
  description: dictionary.meta.privacy.description,
};

const listClass = "mt-3 list-disc space-y-2.5 pl-5 marker:text-ink-faint";

export default function PrivacyPage() {
  const dict = dictionary.privacyPage;

  return (
    <LegalPage title={dict.title} lastUpdated={dict.lastUpdated}>
      {dict.sections.map((section, i) => (
        <LegalSection key={i} index={i + 1} heading={section.heading}>
          {"bullets" in section && section.bullets ? (
            <>
              <p>{section.intro}</p>
              <ul className={listClass}>
                {section.bullets.map((b, j) => (
                  <li key={j}>
                    <strong className="font-semibold text-ink">
                      {b.label}
                    </strong>{" "}
                    {b.body}
                  </li>
                ))}
              </ul>
              <p className="mt-3">{section.outro}</p>
            </>
          ) : "providers" in section && section.providers ? (
            <>
              <p>{section.intro}</p>
              <ul className={listClass}>
                {section.providers.map((p, j) => (
                  <li key={j}>
                    <strong className="font-semibold text-ink">{p.name}</strong>{" "}
                    — {p.body} (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noreferrer"
                      className={linkClass}
                    >
                      {p.linkLabel}
                    </a>
                    ).
                  </li>
                ))}
              </ul>
            </>
          ) : "body" in section && section.body ? (
            <LegalBody text={section.body} />
          ) : null}
        </LegalSection>
      ))}
    </LegalPage>
  );
}

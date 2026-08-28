import { Fragment } from "react";

const linkClass =
  "font-medium text-brand underline underline-offset-4 decoration-brand/30 transition-colors hover:decoration-brand";
const CONTACT_EMAIL = "hello@NexaAI.ch";

// Renders paragraph text that may contain"{email}"placeholders, replacing each
// with a mailto link — used by the Privacy/Terms pages'"Your rights"/"Contact"
// sections in every locale. Vertical spacing is owned by the parent section.
export function LegalBody({ text }: { text: string }) {
  const parts = text.split("{email}");

  return (
    <p>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {part}
          {i < parts.length - 1 && (
            <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
              {CONTACT_EMAIL}
            </a>
          )}
        </Fragment>
      ))}
    </p>
  );
}

export { linkClass };

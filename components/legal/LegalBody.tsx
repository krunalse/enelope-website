const linkClass = "text-brand underline underline-offset-2 hover:no-underline dark:text-signal";
const CONTACT_EMAIL = "hello@enelope.ch";

// Renders paragraph text that may contain a single "{email}" placeholder,
// replacing it with an actual mailto link — used by the Privacy/Terms
// pages' "Your rights" / "Contact" sections in every locale.
export function LegalBody({ text }: { text: string }) {
  const parts = text.split("{email}");
  if (parts.length === 1) return <p className="mt-2">{text}</p>;

  return (
    <p className="mt-2">
      {parts[0]}
      <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
        {CONTACT_EMAIL}
      </a>
      {parts[1]}
    </p>
  );
}

export { linkClass };

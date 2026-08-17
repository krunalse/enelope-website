import { NextRequest, NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email/resend";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, company, phone, service, message } = body ?? {};

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  try {
    await sendContactEmail({ name, email, company, phone, service, message });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form email failed:", err);
    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 500 }
    );
  }
}

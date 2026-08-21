import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);
const teamEmail = process.env.RESEND_TO_EMAIL;

interface ContactRequest {
  name: string;
  email: string;
  message: string;
}

interface ContactResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export async function POST(req: NextRequest): Promise<NextResponse<ContactResponse>> {
  if (!teamEmail) {
    console.error("RESEND_TO_EMAIL not configured");
    return NextResponse.json({ success: true }, { status: 200 });
  }

  try {
    const body: ContactRequest = await req.json();
    const { name, email, message } = body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Email 1: Confirmación al usuario
    try {
      await resend.emails.send({
        from: "Arcade Vault <noreply@resend.dev>",
        to: email,
        subject: "Hemos recibido tu mensaje - Arcade Vault",
        html: `
          <div style="font-family: monospace; color: #e6e9ff; background: #0a0a0f; padding: 20px; border: 1px solid #00f5ff;">
            <h2 style="color: #00f5ff;">Hola ${name},</h2>
            <p>Gracias por contactarnos. Hemos recibido tu mensaje y te responderemos en 24-48 horas.</p>
            <p><strong>Tu mensaje:</strong></p>
            <p style="color: #8a8fb5;">${message.replace(/\n/g, "<br>")}</p>
            <hr style="border: 1px solid #00f5ff; margin: 20px 0;">
            <p style="color: #8a8fb5; font-size: 12px;">Arcade Vault • Preservando clásicos • ${new Date().toISOString()}</p>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error("Error sending user confirmation email:", emailErr);
    }

    // Email 2: Notificación al equipo
    try {
      await resend.emails.send({
        from: "Arcade Vault <noreply@resend.dev>",
        to: teamEmail,
        subject: `Nuevo contacto: ${name}`,
        html: `
          <div style="font-family: monospace; color: #e6e9ff; background: #0a0a0f; padding: 20px; border: 1px solid #ff006e;">
            <h2 style="color: #ff006e;">Nuevo mensaje de contacto</h2>
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
            <hr style="border: 1px solid #ff006e; margin: 20px 0;">
            <p><strong>Mensaje:</strong></p>
            <p style="color: #8a8fb5;">${message.replace(/\n/g, "<br>")}</p>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error("Error sending team notification email:", emailErr);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ success: true }, { status: 200 });
  }
}

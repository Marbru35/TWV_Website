const { app } = require("@azure/functions");
const nodemailer = require("nodemailer");

function requiredEnv(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

app.http("mail", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    try {
      // 1) JSON Body lesen
      const contentType = request.headers.get("content-type") || "";
      if (!contentType.toLowerCase().includes("application/json")) {
        return {
          status: 415,
          headers: { "Content-Type": "application/json; charset=utf-8" },
          body: JSON.stringify({
            ok: false,
            error: "Expected Content-Type: application/json",
            receivedContentType: contentType,
          }),
        };
      }

      const data = await request.json();

      // 2) Minimal-Validierung (Client validiert zwar, aber Server MUSS trotzdem prüfen)
      if (!data?.consent) {
        return {
          status: 400,
          headers: { "Content-Type": "application/json; charset=utf-8" },
          body: JSON.stringify({ ok: false, error: "Consent is required." }),
        };
      }

      if (!data?.name || !data?.email || !data?.phone) {
        return {
          status: 400,
          headers: { "Content-Type": "application/json; charset=utf-8" },
          body: JSON.stringify({ ok: false, error: "Missing required fields." }),
        };
      }

      // 3) SMTP Config aus Env
      const host = requiredEnv("SMTP_HOST");
      const port = Number(requiredEnv("SMTP_PORT"));
      const secure = String(process.env.SMTP_SECURE || "").toLowerCase() === "true";
      const user = requiredEnv("SMTP_USER");
      const pass = requiredEnv("SMTP_PASS");
      const mailTo = requiredEnv("MAIL_TO");
      const mailFrom = requiredEnv("MAIL_FROM");

      // 4) Nodemailer Transporter
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: { user, pass },
      });

      // 5) Mail-Inhalt bauen
      const subject = `Neue Anfrage – ${data.name} (${data.model || "kein Modell"})`;

      const text = [
        "Neue Anfrage über das Kontaktformular",
        "",
        `Name: ${data.name}`,
        `E-Mail: ${data.email}`,
        `Telefon: ${data.phone}`,
        "",
        "Rechnungsadresse:",
        `  Straße: ${data.billStreet || "-"}`,
        `  PLZ/Ort: ${data.billZip || "-"} ${data.billCity || "-"}`,
        "",
        "Lieferadresse:",
        `  Straße: ${data.delStreet || "-"}`,
        `  PLZ/Ort: ${data.delZip || "-"} ${data.delCity || "-"}`,
        "",
        "Eckdaten:",
        `  Personenzahl: ${data.people || "-"}`,
        `  Modell: ${data.model || "-"}`,
        `  Anlass: ${data.occasion || "-"}`,
        "",
        "Nachricht:",
        `${data.message || "-"}`,
      ].join("\n");

      // 6) Senden
      const info = await transporter.sendMail({
        from: mailFrom,
        to: mailTo,
        replyTo: data.email, // Antworten gehen direkt an den Absender
        subject,
        text,
      });

      context.log("Mail sent:", info?.messageId || info);

      // 7) Response ans Frontend
      return {
        status: 200,
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({ ok: true }),
      };
    } catch (err) {
      context.log("MAIL ERROR:", err);
      return {
        status: 500,
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({ ok: false, error: "Mail could not be sent." }),
      };
    }
  },
});
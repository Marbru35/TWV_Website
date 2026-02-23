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

      // 2) Minimal-Validierung
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

      // 3) Config aus Env (so wie du es schon hast)
      // Du nutzt zwar SMTP_* Namen, aber hier sind es einfach nur Werte für Gmail-Auth.
      const user = requiredEnv("SMTP_USER");   // muss ein Gmail-Konto sein
      const pass = requiredEnv("SMTP_PASS");   // App-Passwort (oder OAuth2, aber hier: App-Passwort)
      const mailTo = requiredEnv("MAIL_TO");

      // 4) Nodemailer Transporter (EXAKT wie von dir gewünscht)
      const authentification_ = nodemailer.createTransport({
        host: "smtp.gmail.com",
        pot: 587,
        secure: false,
        auth: {
          user: user,
          pass: pass,
        },
      });

      // Optional aber sehr hilfreich: prüft Login direkt (liefert klare Fehler wie EAUTH)
      await authentification_.verify();

      // 5) Inhalt bauen
      const subject = `Anfrage - TWV Viola (${data.model || "kein Modell"})`;

      const html = `
        <h2>Neue Anfrage über das Kontaktformular</h2>

        <p><b>Name:</b> ${escapeHtml(data.name)}</p>
        <p><b>E-Mail:</b> ${escapeHtml(data.email)}</p>
        <p><b>Telefon:</b> ${escapeHtml(data.phone)}</p>

        <h3>Rechnungsadresse</h3>
        <p>
          ${escapeHtml(data.billStreet || "-")}<br/>
          ${escapeHtml(data.billZip || "-")} ${escapeHtml(data.billCity || "-")}
        </p>

        <h3>Lieferadresse</h3>
        <p>
          ${escapeHtml(data.delStreet || "-")}<br/>
          ${escapeHtml(data.delZip || "-")} ${escapeHtml(data.delCity || "-")}
        </p>

        <h3>Eckdaten</h3>
        <ul>
          <li><b>Personenzahl:</b> ${escapeHtml(data.people || "-")}</li>
          <li><b>Modell:</b> ${escapeHtml(data.model || "-")}</li>
          <li><b>Anlass:</b> ${escapeHtml(data.occasion || "-")}</li>
        </ul>

        <h3>Nachricht</h3>
        <p style="white-space:pre-wrap">${escapeHtml(data.message || "-")}</p>
      `;

      // 6) mailOptions (EXAKT wie im Screenshot-Stil)
      const mailOptions = {
        from: user,        // sichtbarer Absender
        to: user,            // Empfänger
        subject: subject,
        html: html,
        replyTo: data.email,   // Antworten gehen an den Formular-Absender
      };

      // 7) Senden (korrekt: mailOptions direkt übergeben, nicht {mailOptions: ...})
      const info = await authentification_.sendMail(mailOptions);
      context.log("Mail sent:", info?.messageId || info);

      return {
        status: 200,
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({ ok: true }),
      };
    } catch (err) {
      context.log("MAIL ERROR:", err);

      // Für Debug: echte Fehlermeldung zurückgeben (ohne Secrets)
      return {
        status: 500,
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          ok: false,
          message: err?.message || String(err),
          code: err?.code,
          name: err?.name,
        }),
      };
    }
  },
});

function escapeHtml(input) {
  return String(input ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
const { app } = require("@azure/functions");
const nodemailer = require("nodemailer");

app.http("mail", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    try {
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

      const authentification_ = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "hobbitviola@gmail.com",
          pass: process.env.SMTP_PASS,
        },
      });

      await authentification_.verify();

      const models = Array.isArray(data.model) ? data.model : (data.model ? [data.model] : []);
      const modelsText = models.length ? models.join(", ") : "-";

      const eventFrom = formatDateDE(data.eventDateFrom);
      const eventTo = formatDateDE(data.eventDateTo);
      const eventRange = eventFrom || eventTo ? `${eventFrom || "-"} bis ${eventTo || "-"}` : "-";

      const subject = `Anfrage - TWV Viola (${models.length ? models[0] : "kein Modell"})`;

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
          <li><b>Anlass:</b> ${escapeHtml(data.occasion || "-")}</li>
          <li><b>Veranstaltungsdatum:</b> ${escapeHtml(eventRange)}</li>
          <li><b>Modelle:</b> ${escapeHtml(modelsText)}</li>
        </ul>

        <h3>Nachricht</h3>
        <p style="white-space:pre-wrap">${escapeHtml(data.message || "-")}</p>
      `;

      const mailOptions = {
        from: "hobbitviola@gmail.com",
        to: "twv-viola@web.de",
        subject,
        html,
        replyTo: data.email,
      };

      const info = await authentification_.sendMail(mailOptions);
      context.log("Mail sent:", info?.messageId || info);

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

function formatDateDE(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (!Number.isFinite(d.getTime())) return "";
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = String(d.getFullYear());
  return `${dd}.${mm}.${yyyy}`;
}

function escapeHtml(input) {
  return String(input ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
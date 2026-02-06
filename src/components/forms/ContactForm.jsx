import { useMemo, useState } from "react";
import { validateContact } from "./formSchema";

const initial = {
  name: "",
  email: "",
  phone: "",
  eventType: "",
  dateFrom: "",
  dateTo: "",
  location: "",
  people: "",
  message: "",
  consent: false,
};

export default function ContactForm() {
  const [values, setValues] = useState(initial);
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [serverMsg, setServerMsg] = useState("");

  const errors = useMemo(() => validateContact(values), [values]);

  const setField = (name, value) => setValues((v) => ({ ...v, [name]: value }));
  const onBlur = (name) => setTouched((t) => ({ ...t, [name]: true }));
  const showError = (field) => touched[field] && errors[field];

  const submit = async (e) => {
    e.preventDefault();

    setTouched({
      name: true,
      email: true,
      phone: true,
      eventType: true,
      dateFrom: true,
      dateTo: true,
      location: true,
      message: true,
      consent: true,
    });

    const current = validateContact(values);
    if (Object.keys(current).length) return;

    setStatus("sending");
    setServerMsg("");

    try {
      // TODO: hier dein Backend/Service einhängen
      // await fetch("/api/contact", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify(values) });

      await new Promise((r) => setTimeout(r, 600)); // Demo
      setStatus("success");
      setValues(initial);
      setTouched({});
    } catch {
      setStatus("error");
      setServerMsg("Senden fehlgeschlagen. Bitte erneut versuchen oder anrufen.");
    }
  };

  return (
    <form onSubmit={submit} className="form">
      <div className="grid grid--2">
        <Field
          label="Name"
          value={values.name}
          onChange={(v) => setField("name", v)}
          onBlur={() => onBlur("name")}
          error={showError("name")}
        />
        <Field
          label="E-Mail"
          type="email"
          value={values.email}
          onChange={(v) => setField("email", v)}
          onBlur={() => onBlur("email")}
          error={showError("email")}
        />
      </div>

      <div className="grid grid--2">
        <Field
          label="Telefon"
          value={values.phone}
          onChange={(v) => setField("phone", v)}
          onBlur={() => onBlur("phone")}
          error={showError("phone")}
        />

        <div className="field">
          <label className="field__label">Anlass</label>
          <select
            className={`input ${showError("eventType") ? "input--error" : ""}`}
            value={values.eventType}
            onChange={(e) => setField("eventType", e.target.value)}
            onBlur={() => onBlur("eventType")}
          >
            <option value="">Bitte wählen…</option>
            <option value="privat">Privat (Gartenparty, Hochzeit)</option>
            <option value="verein">Vereins-/Straßenfest</option>
            <option value="firma">Firmenfeier / Event</option>
            <option value="baustelle">Baustelle</option>
            <option value="sonstiges">Sonstiges</option>
          </select>
          {showError("eventType") && (
            <div className="field__error">{errors.eventType}</div>
          )}
        </div>
      </div>

      <div className="grid grid--2">
        <Field
          label="Datum von"
          type="date"
          value={values.dateFrom}
          onChange={(v) => setField("dateFrom", v)}
          onBlur={() => onBlur("dateFrom")}
          error={showError("dateFrom")}
        />
        <Field
          label="Datum bis"
          type="date"
          value={values.dateTo}
          onChange={(v) => setField("dateTo", v)}
          onBlur={() => onBlur("dateTo")}
          error={showError("dateTo")}
        />
      </div>

      <div className="grid grid--2">
        <Field
          label="Ort / PLZ"
          value={values.location}
          onChange={(v) => setField("location", v)}
          onBlur={() => onBlur("location")}
          error={showError("location")}
        />
        <Field
          label="Personen (optional)"
          value={values.people}
          onChange={(v) => setField("people", v)}
          onBlur={() => onBlur("people")}
          placeholder="z.B. 80"
        />
      </div>

      <div className="field">
        <label className="field__label">Nachricht</label>
        <textarea
          className={`input input--textarea ${
            showError("message") ? "input--error" : ""
          }`}
          value={values.message}
          onChange={(e) => setField("message", e.target.value)}
          onBlur={() => onBlur("message")}
          rows={5}
          placeholder="Kurz: Anlass, Besonderheiten, Zufahrt, gewünschte Dauer…"
        />
        {showError("message") && (
          <div className="field__error">{errors.message}</div>
        )}
      </div>

      <label className="checkbox">
        <input
          type="checkbox"
          checked={values.consent}
          onChange={(e) => setField("consent", e.target.checked)}
          onBlur={() => onBlur("consent")}
        />
        <span>Ich stimme der Verarbeitung meiner Daten gemäß Datenschutz zu.</span>
      </label>
      {showError("consent") && (
        <div className="field__error">{errors.consent}</div>
      )}

      <div className="form__actions">
        <button className="btn" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sende…" : "Anfrage senden"}
        </button>

        <div className="form__hint">
          {status === "success" && (
            <span className="ok">Danke! Wir melden uns zeitnah.</span>
          )}
          {status === "error" && <span className="bad">{serverMsg}</span>}
        </div>
      </div>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  onBlur,
  error,
  type = "text",
  placeholder,
}) {
  return (
    <div className="field">
      <label className="field__label">{label}</label>
      <input
        className={`input ${error ? "input--error" : ""}`}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
      />
      {error && <div className="field__error">{error}</div>}
    </div>
  );
}

import { useMemo, useState } from "react";
import { validateContact } from "./formSchema";

const initial = {
  name: "",

  billStreet: "",
  billZip: "",
  billCity: "",

  delStreet: "",
  delZip: "",
  delCity: "",

  people: "",
  email: "",
  phone: "",
  model: "",
  occasion: "",
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

      billStreet: true,
      billZip: true,
      billCity: true,

      delStreet: true,
      delZip: true,
      delCity: true,

      people: true,
      model: true,
      occasion: true,
      message: true,
      consent: true,
    });

    const current = validateContact(values);
    if (Object.keys(current).length) return;

    setStatus("sending");
    setServerMsg("");

    try {
      const res = await fetch("/api/mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const contentType = res.headers.get("content-type") || "";
      const payload = contentType.includes("application/json")
        ? await res.json()
        : await res.text();

      if (!res.ok) {
        const msg =
          (payload && typeof payload === "object" && payload.error) ||
          (typeof payload === "string" && payload) ||
          `Serverfehler (${res.status})`;
        throw new Error(msg);
      }

      setStatus("success");
      setValues(initial);
      setTouched({});
    } catch (err) {
      setStatus("error");
      setServerMsg(
        err?.message || "Senden fehlgeschlagen. Bitte erneut versuchen."
      );
    }
  };

  return (
    <form onSubmit={submit} className="form">
      <div className="grid grid--3">
        <Field
          label="Name"
          value={values.name}
          onChange={(v) => setField("name", v)}
          onBlur={() => onBlur("name")}
          error={showError("name")}
          placeholder="Vorname Nachname"
        />
        <Field
          label="E-Mail"
          type="email"
          value={values.email}
          onChange={(v) => setField("email", v)}
          onBlur={() => onBlur("email")}
          error={showError("email")}
        />
        <Field
          label="Handynummer"
          value={values.phone}
          onChange={(v) => setField("phone", v)}
          onBlur={() => onBlur("phone")}
          error={showError("phone")}
          placeholder="z.B. 0176 …"
        />
      </div>

      {/* Rechnungsadresse */}
      <div className="form__sectionTitle">Rechnungsadresse</div>

      <div className="grid grid--2">
        <Field
          label="Straße / Hausnummer"
          value={values.billStreet}
          onChange={(v) => setField("billStreet", v)}
          onBlur={() => onBlur("billStreet")}
          error={showError("billStreet")}
          placeholder="Musterstraße 1"
        />

        <div className="grid grid--2 grid--tight">
          <Field
            label="PLZ"
            value={values.billZip}
            onChange={(v) => setField("billZip", v)}
            onBlur={() => onBlur("billZip")}
            error={showError("billZip")}
            placeholder="12345"
          />
          <Field
            label="Ort"
            value={values.billCity}
            onChange={(v) => setField("billCity", v)}
            onBlur={() => onBlur("billCity")}
            error={showError("billCity")}
            placeholder="Musterstadt"
          />
        </div>
      </div>

      <div className="form__sectionTitle">Lieferadresse (wo der Wagen hin soll)</div>

      <div className="grid grid--2">
        <Field
          label="Straße / Hausnummer"
          value={values.delStreet}
          onChange={(v) => setField("delStreet", v)}
          onBlur={() => onBlur("delStreet")}
          error={showError("delStreet")}
          placeholder="Musterstraße 1"
        />

        <div className="grid grid--2 grid--tight">
          <Field
            label="PLZ"
            value={values.delZip}
            onChange={(v) => setField("delZip", v)}
            onBlur={() => onBlur("delZip")}
            error={showError("delZip")}
            placeholder="12345"
          />
          <Field
            label="Ort"
            value={values.delCity}
            onChange={(v) => setField("delCity", v)}
            onBlur={() => onBlur("delCity")}
            error={showError("delCity")}
            placeholder="Musterstadt"
          />
        </div>
      </div>

      <div className="grid grid--2">
        <Field
          label="Ungefähre Personenzahl"
          value={values.people}
          onChange={(v) => setField("people", v)}
          onBlur={() => onBlur("people")}
          error={showError("people")}
          placeholder="z.B. 50"
        />

        <div className="field">
          <label className="field__label">Modell</label>
          <select
            className={`input ${showError("model") ? "input--error" : ""}`}
            value={values.model}
            onChange={(e) => setField("model", e.target.value)}
            onBlur={() => onBlur("model")}
          >
            <option value="">Bitte wählen…</option>
            <option value="Modell 3-1-3">Modell 3-1-3</option>
            <option value="Modell 1-1-1">Modell 1-1-1</option>
            <option value="Autarkes Modell 1-1-1">Autarkes Modell 1-1-1</option>
          </select>
          {showError("model") && <div className="field__error">{errors.model}</div>}
        </div>
      </div>

      <div className="field">
        <label className="field__label">Anlass</label>
        <input
          className={`input ${showError("occasion") ? "input--error" : ""}`}
          value={values.occasion}
          onChange={(e) => setField("occasion", e.target.value)}
          onBlur={() => onBlur("occasion")}
          placeholder="z.B. Hochzeit, Firmenevent …"
        />
        {showError("occasion") && <div className="field__error">{errors.occasion}</div>}
      </div>

      <div className="field">
        <label className="field__label">Nachricht</label>
        <textarea
          className={`input input--textarea ${showError("message") ? "input--error" : ""}`}
          value={values.message}
          onChange={(e) => setField("message", e.target.value)}
          onBlur={() => onBlur("message")}
          rows={5}
          placeholder="Kurz: Dauer, Zufahrt, Besonderheiten, etc."
        />
        {showError("message") && <div className="field__error">{errors.message}</div>}
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
      {showError("consent") && <div className="field__error">{errors.consent}</div>}

      <div className="form__actions">
        <button className="btn" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sende…" : "Anfrage senden"}
        </button>

        <div className="form__hint">
          {status === "success" && <span className="ok">Danke! Wir melden uns zeitnah.</span>}
          {status === "error" && <span className="bad">{serverMsg}</span>}
        </div>
      </div>
    </form>
  );
}

function Field({ label, value, onChange, onBlur, error, type = "text", placeholder }) {
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
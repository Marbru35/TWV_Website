export function validateContact(values) {
  const errors = {};
  const str = (v) => (typeof v === "string" ? v.trim() : "");
  const setRequired = (key, msg) => {
    if (!str(values[key])) errors[key] = msg;
  };

  const requiredTextFields = [
    ["name", "Bitte Name angeben."],
    ["phone", "Bitte Handynummer angeben."],
    ["addrStreet", "Bitte Straße/Hausnummer angeben."],
    ["addrZip", "Bitte PLZ angeben."],
    ["addrCity", "Bitte Ort angeben."],
    ["people", "Bitte Personenzahl angeben."],
    ["occasion", "Bitte Anlass angeben."],
    ["message", "Bitte kurze Nachricht ergänzen."],
  ];

  requiredTextFields.forEach(([key, msg]) => setRequired(key, msg));

  const email = str(values.email);
  if (!email) errors.email = "Bitte E-Mail angeben.";
  else if (!/^\S+@\S+\.\S+$/.test(email)) {
    errors.email = "Bitte gültige E-Mail angeben.";
  }

  const addrZip = str(values.addrZip);
  if (!errors.addrZip && !/^\d{4,5}$/.test(addrZip)) {
    errors.addrZip = "Bitte gültige PLZ angeben.";
  }

  const people = str(values.people);
  if (!errors.people && !/^\d{1,5}$/.test(people)) {
    errors.people = "Bitte Personenzahl als Zahl angeben.";
  }

  const models = Array.isArray(values.model) ? values.model : [];
  if (models.length === 0) {
    errors.model = "Bitte mindestens ein Modell auswählen.";
  }

  if (!values.eventDateFrom) errors.eventDateFrom = "Bitte Startdatum angeben.";
  if (!values.eventDateTo) errors.eventDateTo = "Bitte Enddatum angeben.";

  if (values.eventDateFrom && values.eventDateTo) {
    const from = new Date(values.eventDateFrom);
    const to = new Date(values.eventDateTo);
    if (
      Number.isFinite(from.getTime()) &&
      Number.isFinite(to.getTime()) &&
      to < from
    ) {
      errors.eventDateTo = "Enddatum muss nach dem Startdatum liegen.";
    }
  }

  if (!values.consent) errors.consent = "Bitte Zustimmung erforderlich.";

  return errors;
}

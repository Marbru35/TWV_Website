export function validateContact(values) {
  const errors = {};

  if (!values.name.trim()) errors.name = "Bitte Name angeben.";
  if (!values.email.trim()) errors.email = "Bitte E-Mail angeben.";
  else if (!/^\S+@\S+\.\S+$/.test(values.email.trim()))
    errors.email = "Bitte gültige E-Mail angeben.";

  if (!values.phone.trim()) errors.phone = "Bitte Telefonnummer angeben.";
  if (!values.eventType) errors.eventType = "Bitte Anlass auswählen.";
  if (!values.location.trim()) errors.location = "Bitte Ort/PLZ angeben.";

  if (!values.dateFrom) errors.dateFrom = "Bitte Startdatum angeben.";
  if (!values.dateTo) errors.dateTo = "Bitte Enddatum angeben.";
  if (values.dateFrom && values.dateTo) {
    const a = new Date(values.dateFrom);
    const b = new Date(values.dateTo);
    if (b < a) errors.dateTo = "Enddatum muss nach dem Startdatum liegen.";
  }

  if (!values.message.trim())
    errors.message = "Bitte kurze Nachricht ergänzen.";

  if (!values.consent) errors.consent = "Bitte Zustimmung erforderlich.";

  return errors;
}

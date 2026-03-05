export function validateContact(values) {
  const errors = {};

  if (!values.name.trim()) errors.name = "Bitte Name angeben.";

  // Email
  if (!values.email.trim()) errors.email = "Bitte E-Mail angeben.";
  else if (!/^\S+@\S+\.\S+$/.test(values.email.trim()))
    errors.email = "Bitte gültige E-Mail angeben.";

  // Handy
  if (!values.phone.trim()) errors.phone = "Bitte Handynummer angeben.";

  // Rechnungsadresse
  if (!values.billStreet.trim()) errors.billStreet = "Bitte Straße/Hausnummer angeben.";
  if (!values.billZip.trim()) errors.billZip = "Bitte PLZ angeben.";
  else if (!/^\d{4,5}$/.test(values.billZip.trim()))
    errors.billZip = "Bitte gültige PLZ angeben.";
  if (!values.billCity.trim()) errors.billCity = "Bitte Ort angeben.";

  // Lieferadresse
  if (!values.delStreet.trim()) errors.delStreet = "Bitte Straße/Hausnummer angeben.";
  if (!values.delZip.trim()) errors.delZip = "Bitte PLZ angeben.";
  else if (!/^\d{4,5}$/.test(values.delZip.trim()))
    errors.delZip = "Bitte gültige PLZ angeben.";
  if (!values.delCity.trim()) errors.delCity = "Bitte Ort angeben.";

  // Personenzahl
  if (!values.people.trim()) errors.people = "Bitte Personenzahl angeben.";
  else if (!/^\d{1,5}$/.test(values.people.trim()))
    errors.people = "Bitte Personenzahl als Zahl angeben.";

  // Modelle
  const models = Array.isArray(values.model) ? values.model : [];
  if (models.length === 0) errors.model = "Bitte mindestens ein Modell auswählen.";

  // Anlass
  if (!values.occasion.trim()) errors.occasion = "Bitte Anlass angeben.";

  // Datum
  if (!values.eventDateFrom.trim()) errors.eventDateFrom = "Bitte Datum angeben.";
  if (!values.eventDateTo.trim()) errors.eventDateTo = "Bitte Datum angeben.";

  if (values.eventDateFrom && values.eventDateTo) {
    const from = new Date(values.eventDateFrom);
    const to = new Date(values.eventDateTo);
    if (Number.isFinite(from.getTime()) && Number.isFinite(to.getTime())) {
      if (to < from) errors.eventDateTo = "Enddatum muss nach dem Startdatum liegen.";
    }
  }

  // Nachricht
  if (!values.message.trim()) errors.message = "Bitte kurze Nachricht ergänzen.";

  // DSGVO
  if (!values.consent) errors.consent = "Bitte Zustimmung erforderlich.";

  return errors;
}
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
  else if (!/^\d{4,5}$/.test(values.billZip.trim())) errors.billZip = "Bitte gültige PLZ angeben.";
  if (!values.billCity.trim()) errors.billCity = "Bitte Ort angeben.";

  // Lieferadresse
  if (!values.delStreet.trim()) errors.delStreet = "Bitte Straße/Hausnummer angeben.";
  if (!values.delZip.trim()) errors.delZip = "Bitte PLZ angeben.";
  else if (!/^\d{4,5}$/.test(values.delZip.trim())) errors.delZip = "Bitte gültige PLZ angeben.";
  if (!values.delCity.trim()) errors.delCity = "Bitte Ort angeben.";

  // Optional: Personenzahl (wenn befüllt: Zahl)
  if (values.people && !/^\d{1,5}$/.test(values.people.trim()))
    errors.people = "Bitte Personenzahl als Zahl angeben.";

  // Modell
  if (!values.model) errors.model = "Bitte Modell auswählen.";

  // Anlass
  if (!values.occasion.trim()) errors.occasion = "Bitte Anlass angeben.";

  // Nachricht
  if (!values.message.trim()) errors.message = "Bitte kurze Nachricht ergänzen.";

  // DSGVO
  if (!values.consent) errors.consent = "Bitte Zustimmung erforderlich.";

  return errors;
}

// Nicht-autark Modell 3-1-3
import nonAutark313_1 from "../assets/nonAutark313/non_autark_313_1.jpeg";
import nonAutark313_2 from "../assets/nonAutark313/non_autark_313_2.jpeg";
import nonAutark313_3 from "../assets/nonAutark313/non_autark_313_3.jpeg";
import nonAutark313_4 from "../assets/nonAutark313/non_autark_313_4.jpeg";
import nonAutark313_5 from "../assets/nonAutark313/non_autark_313_5.jpeg";
import nonAutark313_6 from "../assets/nonAutark313/non_autark_313_6.jpeg";
import nonAutark313_7 from "../assets/nonAutark313/non_autark_313_7.jpeg";

// Nicht-autark Modell 1-1-1
import nonAutark111_1 from "../assets/nonAutark111/non_autark_111_1.jpeg";
import nonAutark111_2 from "../assets/nonAutark111/non_autark_111_2.jpeg";
import nonAutark111_3 from "../assets/nonAutark111/non_autark_111_3.jpeg";

// Autark Modell 1-1-1
import autark111_1 from "../assets/autark111/autark_111_1.jpeg";
import autark111_2 from "../assets/autark111/autark_111_2.jpeg";

// Urinal Turm 4
import urinalTurm4_1 from "../assets/urinalTurm4/urinal_turm_4.png";

export const models = [
  {
    slug: "anschluss-3-1-3",
    title: "Toilettenwagen mit Anschluss – Modell 3-1-3",
    lead: "Mit direktem Frisch- und Abwasseranschluss.",

    requires: ["Wasseranschluss", "Abwasseranschluss", "220 Volt Steckdose"],
    notes: ["Abwasseranschluss in unmittelbarer Nähe zum Stellplatz erforderlich."],
    includes: [
      "LED Beleuchtung innen und außen",
      "Transport",
      "Auf- und Abbau",
      "Toilettenpapier",
      "Handtuchpapier",
      "Seife",
      "Endreinigung",
      "Heizung"
    ],

    gallery: [
      { src: nonAutark313_1, alt: "Toilettenwagen 3-1-3" },
      { src: nonAutark313_2, alt: "Toilettenwagen 3-1-3" },
      { src: nonAutark313_3, alt: "Toilettenwagen 3-1-3" },
      { src: nonAutark313_4, alt: "Toilettenwagen 3-1-3" },
      { src: nonAutark313_5, alt: "Toilettenwagen 3-1-3" },
      { src: nonAutark313_6, alt: "Toilettenwagen 3-1-3" },
      { src: nonAutark313_7, alt: "Toilettenwagen 3-1-3" },
    ],
  },
  {
    slug: "anschluss-1-1-1",
    title: "Toilettenwagen mit Anschluss – Modell 1-1-1",
    lead: "Kompakter Toilettenwagen mit direktem Frisch- und Abwasseranschluss.",

    requires: ["Wasseranschluss", "Abwasseranschluss", "220 Volt Steckdose"],
    notes: ["Abwasseranschluss in unmittelbarer Nähe zum Stellplatz erforderlich."],
    includes: [
      "LED Beleuchtung innen",
      "Transport",
      "Auf- und Abbau",
      "Toilettenpapier",
      "Handtuchpapier",
      "Seife",
      "Endreinigung",
      "Heizung"
    ],

    gallery: [
      { src: nonAutark111_1, alt: "Toilettenwagen 1-1-1" },
      { src: nonAutark111_2, alt: "Toilettenwagen 1-1-1" },
      { src: nonAutark111_3, alt: "Toilettenwagen 1-1-1" },
    ],
  },
  {
    slug: "autark-1-1-1",
    title: "Autarker Toilettenwagen – Modell 1-1-1",
    lead: "Mit integriertem Frisch- und Abwassertank – ideal ohne Anschluss vor Ort.",


    requires: ["220 Volt Steckdose"],
    notes: ["Lediglich ein Stromanschluss wird benötigt."],
    includes: [
      "LED Beleuchtung innen und außen",
      "Transport",
      "Auf- und Abbau",
      "Toilettenpapier",
      "Handtuchpapier",
      "Seife",
      "Endreinigung",
      "Heizung"
    ],

    gallery: [
      { src: autark111_1, alt: "Toilettenwagen 1-1-1" },
      { src: autark111_2, alt: "Toilettenwagen 1-1-1" },
    ],
  },
  {
    slug: "urinal-turm-4",
    title: "Urinalturm 4",
    lead: "Ein Urinal Turm mit 4 Urinalen.",


    requires: ["Ggf. Abwasseranschluss"],
    notes: ["Das freistehende Urinal ist für 4 Benutzer gleichzeitig nutzbar. Unsere Urinale können gegebenenfalls bequem mit an das Abwasser angeschlossen werden und somit eine sehr gute Ergänzung zum WC-Wagen, um Wartezeiten zu verkürzen."],
    includes: [
      "Endreinigung"
    ],

    gallery: [
      { src: urinalTurm4_1, alt: "Urinal Turm 4" }
    ],
  },
];

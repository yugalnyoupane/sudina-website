// ─────────────────────────────────────────────────────────────
//  SITE CONFIG — edit these before going live.
//  Anything marked TODO is a placeholder, not real contact info.
// ─────────────────────────────────────────────────────────────
export const site = {
  name: "Dr. Sudina Humagain",
  title: "Dental Surgeon · Host · Wellness Educator",
  instagram: "https://www.instagram.com/sudina_hmgn/",
  linkedin: "https://np.linkedin.com/in/dr-sudina-humagain-414972326",
  email: "", // TODO: e.g. "hello@drsudina.com"
  whatsapp: "", // TODO: digits only with country code, e.g. "9779800000000"
  location: "Dhulikhel · Banepa · Kavrepalanchok, Nepal",

  // Booking backend. Leave empty to run in demo mode (requests are only
  // confirmed on screen). Paste a Formspree / Getform / your own API URL
  // to receive every request as JSON by email.
  formEndpoint: "", // TODO: e.g. "https://formspree.io/f/xxxxxxx"

  // Nepal's weekly holiday is Saturday (getDay() === 6)
  closedWeekdays: [6],
  slots: ["10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"],
};

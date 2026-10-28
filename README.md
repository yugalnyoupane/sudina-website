# Dr. Sudina Humagain — Portfolio

React + Vite portfolio with a 4-step consultation booking form.

## Run
```bash
npm install
npm run dev            # local dev server
npm run build          # production build → dist/ (deploy to Vercel/Netlify)
npm run build:single   # single self-contained HTML → dist-single/index.html
```

## Before going live
Edit `src/config.js`:
- `formEndpoint`: paste a Formspree/Getform URL (or your own API) to receive bookings as JSON. While it's empty, the form runs in demo mode.
- `email`, `whatsapp`: add these to show the "Email a copy" and "Send on WhatsApp" buttons after a booking.
- `slots` and `closedWeekdays`: set the available hours (Saturday is closed by default).

## Structure
- `src/App.jsx`: page sections (Hero, About, Care, Outreach gallery + lightbox, Advocacy, Media, Studio, Booking, FAQ, Footer)
- `src/components/Booking.jsx`: multi-step booking form (validation, .ics calendar export, WhatsApp/email hand-off)
- `src/components/Logo.jsx`: custom SVG logo
- `src/data.js`: all copy (timeline, services, gallery captions, FAQ)
- `src/index.css`: design system and responsive styles

Designed & built by yugal.codes

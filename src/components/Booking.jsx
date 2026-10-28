import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarCheck,
  Check,
  Download,
  Mail,
  MapPin,
  MessageCircle,
  Video,
  Loader2,
} from "lucide-react";
import { site } from "../config";
import { services } from "../data";

const reasons = [
  ...services.map((s) => ({ id: s.id, title: s.title })),
  { id: "community", title: "Community / School Programme" },
];

const steps = ["Reason", "Schedule", "Your details", "Confirmed"];

function nextDays(n) {
  const out = [];
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  while (out.length < n) {
    d.setDate(d.getDate() + 1);
    if (!site.closedWeekdays.includes(d.getDay())) out.push(new Date(d));
  }
  return out;
}

const fmtDate = (d) =>
  d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

const empty = {
  reason: "",
  mode: "in-person",
  date: null,
  time: "",
  name: "",
  phone: "",
  email: "",
  age: "adult",
  notes: "",
  consent: false,
};

export default function Booking() {
  const [step, setStep] = useState(0);
  const [f, setF] = useState(empty);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [ref, setRef] = useState("");
  const days = useMemo(() => nextDays(12), []);
  const set = (k, v) => {
    setF((p) => ({ ...p, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const reasonTitle = reasons.find((r) => r.id === f.reason)?.title;

  function validate(s) {
    const e = {};
    if (s === 0 && !f.reason) e.reason = "Choose what you'd like help with.";
    if (s === 1) {
      if (!f.date) e.date = "Pick a preferred day.";
      if (!f.time) e.time = "Pick a preferred time.";
    }
    if (s === 2) {
      if (f.name.trim().length < 2) e.name = "Please enter your full name.";
      if (!/^\+?[0-9\s-]{7,15}$/.test(f.phone.trim())) e.phone = "Enter a valid phone number.";
      if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "That email doesn't look right.";
      if (!f.consent) e.consent = "Please confirm so we can contact you.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function submit() {
    if (!validate(2)) return;
    setSending(true);
    const id = "SH-" + Date.now().toString(36).toUpperCase().slice(-6);
    const payload = {
      reference: id,
      reason: reasonTitle,
      mode: f.mode,
      date: f.date.toISOString().slice(0, 10),
      time: f.time,
      name: f.name,
      phone: f.phone,
      email: f.email,
      patient: f.age,
      notes: f.notes,
    };
    try {
      if (site.formEndpoint) {
        const r = await fetch(site.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
        if (!r.ok) throw new Error("Request failed");
      } else {
        await new Promise((r) => setTimeout(r, 900)); // demo mode
      }
      setRef(id);
      setStep(3);
    } catch {
      setErrors({ submit: "We couldn't send your request. Please try again or reach out on Instagram." });
    } finally {
      setSending(false);
    }
  }

  function downloadIcs() {
    const [h, m] = f.time.split(":").map(Number);
    const start = new Date(f.date);
    start.setHours(h, m, 0, 0);
    const end = new Date(start.getTime() + 30 * 60000);
    const z = (d) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//drsudina//booking//EN",
      "BEGIN:VEVENT",
      `UID:${ref}@drsudina`,
      `DTSTAMP:${z(new Date())}`,
      `DTSTART:${z(start)}`,
      `DTEND:${z(end)}`,
      `SUMMARY:Dental consultation with Dr. Sudina Humagain (requested)`,
      `DESCRIPTION:${reasonTitle} · ${f.mode === "video" ? "Video consult" : "In person"} · Ref ${ref}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
    a.download = `consultation-${ref}.ics`;
    a.click();
  }

  const summary = f.date
    ? `Hello Dr. Sudina, I've requested a consultation (Ref ${ref}).\nReason: ${reasonTitle}\nMode: ${
        f.mode === "video" ? "Video consult" : "In person"
      }\nPreferred: ${fmtDate(f.date)}, ${f.time}\nName: ${f.name}\nPhone: ${f.phone}`
    : "";

  return (
    <div className="booking">
      <ol className="booking__steps" aria-label="Booking progress">
        {steps.map((s, i) => (
          <li key={s} className={i === step ? "is-active" : i < step ? "is-done" : ""}>
            <span>{i < step ? <Check size={14} /> : i + 1}</span>
            {s}
          </li>
        ))}
      </ol>

      <div className="booking__panel" key={step}>
        {step === 0 && (
          <fieldset>
            <legend>What would you like help with?</legend>
            <div className="choice-grid">
              {reasons.map((r) => (
                <label key={r.id} className={`choice ${f.reason === r.id ? "is-on" : ""}`}>
                  <input
                    type="radio"
                    name="reason"
                    value={r.id}
                    checked={f.reason === r.id}
                    onChange={() => set("reason", r.id)}
                  />
                  <span className="choice__tick">
                    <Check size={14} />
                  </span>
                  {r.title}
                </label>
              ))}
            </div>
            {errors.reason && <p className="err">{errors.reason}</p>}
          </fieldset>
        )}

        {step === 1 && (
          <>
            <fieldset>
              <legend>How would you like to meet?</legend>
              <div className="mode">
                {[
                  { id: "in-person", icon: MapPin, t: "In person", s: "Clinic visit · exam & treatment" },
                  { id: "video", icon: Video, t: "Video consult", s: "Advice, follow-ups, second opinions" },
                ].map(({ id, icon: I, t, s }) => (
                  <label key={id} className={`mode__opt ${f.mode === id ? "is-on" : ""}`}>
                    <input type="radio" name="mode" checked={f.mode === id} onChange={() => set("mode", id)} />
                    <I size={22} />
                    <span>
                      <b>{t}</b>
                      <small>{s}</small>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend>Preferred day</legend>
              <div className="days">
                {days.map((d) => {
                  const on = f.date && d.getTime() === f.date.getTime();
                  return (
                    <button
                      type="button"
                      key={d.toISOString()}
                      className={`day ${on ? "is-on" : ""}`}
                      onClick={() => set("date", d)}
                      aria-pressed={on}
                    >
                      <small>{d.toLocaleDateString("en-GB", { weekday: "short" })}</small>
                      <b>{d.getDate()}</b>
                      <small>{d.toLocaleDateString("en-GB", { month: "short" })}</small>
                    </button>
                  );
                })}
              </div>
              {errors.date && <p className="err">{errors.date}</p>}
            </fieldset>
            <fieldset>
              <legend>Preferred time</legend>
              <div className="slots">
                {site.slots.map((t) => (
                  <button
                    type="button"
                    key={t}
                    className={`slot ${f.time === t ? "is-on" : ""}`}
                    onClick={() => set("time", t)}
                    aria-pressed={f.time === t}
                  >
                    {t}
                  </button>
                ))}
              </div>
              {errors.time && <p className="err">{errors.time}</p>}
            </fieldset>
          </>
        )}

        {step === 2 && (
          <div className="fields">
            <label className="field">
              <span>Full name *</span>
              <input value={f.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" />
              {errors.name && <em className="err">{errors.name}</em>}
            </label>
            <label className="field">
              <span>Phone *</span>
              <input
                value={f.phone}
                onChange={(e) => set("phone", e.target.value)}
                placeholder="+977 98XXXXXXXX"
                inputMode="tel"
                autoComplete="tel"
              />
              {errors.phone && <em className="err">{errors.phone}</em>}
            </label>
            <label className="field">
              <span>Email</span>
              <input
                value={f.email}
                onChange={(e) => set("email", e.target.value)}
                type="email"
                autoComplete="email"
              />
              {errors.email && <em className="err">{errors.email}</em>}
            </label>
            <label className="field">
              <span>Patient</span>
              <select value={f.age} onChange={(e) => set("age", e.target.value)}>
                <option value="adult">Adult</option>
                <option value="child">Child (under 12)</option>
                <option value="teen">Teen (12–17)</option>
                <option value="senior">Senior (60+)</option>
              </select>
            </label>
            <label className="field field--full">
              <span>Tell us a little more (optional)</span>
              <textarea
                rows={3}
                value={f.notes}
                onChange={(e) => set("notes", e.target.value)}
                placeholder="E.g. pain on the lower left side when drinking cold water, for about a week."
              />
            </label>
            <label className="consent field--full">
              <input type="checkbox" checked={f.consent} onChange={(e) => set("consent", e.target.checked)} />
              <span>I agree to be contacted about this request. This form is not for emergencies.</span>
            </label>
            {errors.consent && <p className="err field--full">{errors.consent}</p>}
            <div className="recap field--full">
              <CalendarCheck size={18} />
              <span>
                <b>{reasonTitle}</b> · {f.mode === "video" ? "Video consult" : "In person"} · {fmtDate(f.date)},{" "}
                {f.time}
              </span>
            </div>
            {errors.submit && <p className="err field--full">{errors.submit}</p>}
          </div>
        )}

        {step === 3 && (
          <div className="done">
            <div className="done__badge">
              <Check size={34} />
            </div>
            <h3>Request received, {f.name.split(" ")[0]}!</h3>
            <p>
              Your reference is <b>{ref}</b>. We'll confirm your consultation for{" "}
              <b>
                {fmtDate(f.date)} at {f.time}
              </b>{" "}
              by phone{f.email ? " or email" : ""}, usually within one working day.
            </p>
            {!site.formEndpoint && (
              <p className="demo-note">
                Demo mode: connect a form endpoint in <code>src/config.js</code> to receive bookings.
              </p>
            )}
            <div className="done__actions">
              <button className="btn btn--ghost" onClick={downloadIcs}>
                <Download size={18} /> Add to calendar
              </button>
              {site.whatsapp && (
                <a
                  className="btn btn--ghost"
                  href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(summary)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle size={18} /> Send on WhatsApp
                </a>
              )}
              {site.email && (
                <a
                  className="btn btn--ghost"
                  href={`mailto:${site.email}?subject=${encodeURIComponent("Consultation request " + ref)}&body=${encodeURIComponent(summary)}`}
                >
                  <Mail size={18} /> Email a copy
                </a>
              )}
              <button
                className="btn btn--text"
                onClick={() => {
                  setF(empty);
                  setStep(0);
                }}
              >
                Book another
              </button>
            </div>
          </div>
        )}
      </div>

      {step < 3 && (
        <div className="booking__nav">
          {step > 0 ? (
            <button className="btn btn--text" onClick={() => setStep(step - 1)}>
              <ArrowLeft size={18} /> Back
            </button>
          ) : (
            <span />
          )}
          {step < 2 ? (
            <button className="btn btn--primary" onClick={() => validate(step) && setStep(step + 1)}>
              Continue <ArrowRight size={18} />
            </button>
          ) : (
            <button className="btn btn--primary" onClick={submit} disabled={sending}>
              {sending ? (
                <>
                  <Loader2 size={18} className="spin" /> Sending…
                </>
              ) : (
                <>
                  Request consultation <ArrowRight size={18} />
                </>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

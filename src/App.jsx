import { useEffect, useState } from "react";
import {
  ArrowRight, ArrowUpRight, Menu, X, ChevronLeft, ChevronRight, Plus, GraduationCap, Stethoscope, Crown, Mic, Flower2,
  Radio, Clock, Video, MapPin, TriangleAlert, CalendarPlus, Sparkles, Zap, HeartPulse, Baby, Smile, ClipboardCheck,
} from "lucide-react";
const Icons = { Sparkles, Zap, HeartPulse, Baby, Smile, ClipboardCheck };
import Logo, { LogoMark } from "./components/Logo";
import Booking from "./components/Booking";
import { site } from "./config";
import { timeline, services, pillars, gallery, faqs } from "./data";
import cutout from "./assets/img/sudina-cutout.webp";
import himalaya from "./assets/img/himalaya-view.webp";
import portraitFlags from "./assets/img/portrait-flags.webp";


const InstagramIcon = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
  </svg>
);

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const nav = [
  ["About", "#about"],
  ["Care", "#care"],
  ["Outreach", "#outreach"],
  ["Media", "#media"],
  ["Studio", "#studio"],
];

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="wrap header__row">
        <a href="#top" aria-label="Home">
          <Logo tone="light" />
        </a>
        <nav className={`nav ${open ? "is-open" : ""}`}>
          {nav.map(([l, h]) => (
            <a key={h} href={h} onClick={() => setOpen(false)}>
              {l}
            </a>
          ))}
          <a href="#book" className="btn btn--rose btn--sm" onClick={() => setOpen(false)}>
            Book a consultation
          </a>
        </nav>
        <button className="nav__toggle" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__band" />
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <p className="eyebrow">
            <span className="dot" /> Dental Surgeon · Kavre, Nepal
          </p>
          <h1>
            Dr. Sudina Humagain is a dental surgeon, TV host, yoga trainer and a{" "}
            <em>voice for preventive oral health.</em>
          </h1>
          <p className="lede">
            A BDS graduate of Kathmandu University School of Medical Sciences and a general dentist at Dhulikhel
            Hospital, she takes a healthy smile from the clinic chair to classrooms, studios and national television.
          </p>
          <div className="hero__cta">
            <a href="#book" className="btn btn--primary btn--lg">
              Book a consultation <ArrowRight size={18} />
            </a>
            <a href="#about" className="btn btn--ghost btn--lg">
              About Dr. Sudina
            </a>
          </div>
          <p className="hero__tag">Miss Nepal 2025 · Contestant No. 03</p>
        </div>
        <div className="hero__figure">
          <div className="hero__halo" />
          <img src={cutout} alt="Dr. Sudina Humagain in her white coat" className="hero__cutout" />
          <span className="chip chip--a">
            <GraduationCap size={16} /> BDS · KUSMS
          </span>
          <span className="chip chip--b">
            <Stethoscope size={16} /> Dhulikhel Hospital
          </span>
          <span className="chip chip--c">
            <Mic size={16} /> Host · The Fab Show
          </span>
        </div>
      </div>
    </section>
  );
}

function Strip() {
  const items = [
    ["Bachelor of Dental Surgery", "Kathmandu University School of Medical Sciences"],
    ["General Dentist & Intern Doctor", "Dhulikhel Hospital"],
    ["Contestant No. 03", "Miss Nepal 2025, representing Kushadevi, Panauti"],
    ["Certified Yoga Trainer", "Founder, Fit O'Clock Studio"],
  ];
  return (
    <section className="strip">
      <div className="wrap strip__grid">
        {items.map(([a, b], i) => (
          <div key={i} className="strip__item" data-reveal style={{ "--d": i }}>
            <b>{a}</b>
            <span>{b}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section about" id="about">
      <div className="wrap about__grid">
        <div className="about__media" data-reveal>
          <img src={himalaya} alt="Dr. Sudina in the hills of Kavre" />
          <div className="about__quote">
            <LogoMark size={30} tone="light" />
            <p>“A healthy smile starts long before the dental chair, at home, at school and in the community.”</p>
          </div>
        </div>
        <div>
          <p className="kicker" data-reveal>
            Her story
          </p>
          <h2 data-reveal>
            From the hills of Panauti <em>to the national stage.</em>
          </h2>
          <p className="body" data-reveal>
            Sudina's path has never fit a single title. She is a clinician, a broadcaster, a mover and an advocate,
            and each of those roles comes back to one idea: people deserve health information that is clear, kind
            and close to home.
          </p>
          <ol className="timeline">
            {timeline.map((t, i) => (
              <li key={i} data-reveal style={{ "--d": i }}>
                <span className="timeline__year">{t.year}</span>
                <div>
                  <h3>{t.title}</h3>
                  <p>{t.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Care() {
  return (
    <section className="section care" id="care">
      <div className="wrap">
        <div className="section__head">
          <p className="kicker" data-reveal>
            Consultations
          </p>
          <h2 data-reveal>
            Clear answers, <em>gentle care.</em>
          </h2>
          <p className="body" data-reveal>
            General dental consultations in person or by video, for adults, children and families.
          </p>
        </div>
        <div className="cards">
          {services.map((s, i) => {
            const I = Icons[s.icon];
            return (
              <a href="#book" key={s.id} className="card" data-reveal style={{ "--d": i % 3 }}>
                <span className="card__icon">
                  <I size={22} />
                </span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <span className="card__go">
                  Book this <ArrowUpRight size={16} />
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Outreach() {
  const [filter, setFilter] = useState("All");
  const [idx, setIdx] = useState(null);
  const list = gallery.filter((g) => filter === "All" || g.tag === filter);
  useEffect(() => {
    if (idx === null) return;
    const k = (e) => {
      if (e.key === "Escape") setIdx(null);
      if (e.key === "ArrowRight") setIdx((i) => (i + 1) % list.length);
      if (e.key === "ArrowLeft") setIdx((i) => (i - 1 + list.length) % list.length);
    };
    window.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", k);
      document.body.style.overflow = "";
    };
  }, [idx, list.length]);

  return (
    <section className="section outreach" id="outreach">
      <div className="wrap">
        <div className="outreach__head">
          <div>
            <p className="kicker kicker--light" data-reveal>
              In the field
            </p>
            <h2 data-reveal>
              School Health Screening <em>camps.</em>
            </h2>
            <p className="body body--light" data-reveal>
              With Dhulikhel Hospital and German Rotary Volunteer Doctors, Sudina screens, teaches and reassures
              students at schools in Sarlahi and the Kathmandu Valley.
            </p>
          </div>
          <div className="filters" role="tablist">
            {["All", "Clinical", "Community"].map((f) => (
              <button key={f} role="tab" aria-selected={filter === f} className={filter === f ? "is-on" : ""} onClick={() => setFilter(f)}>
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="masonry">
          {list.map((g, i) => (
            <button
              key={g.src}
              className={`tile ${g.wide ? "tile--wide" : ""} ${g.tall ? "tile--tall" : ""}`}
              onClick={() => setIdx(i)}
            >
              <img src={g.src} alt={g.title} loading="lazy" />
              <span className="tile__cap">
                <small>{g.tag}</small>
                <b>{g.title}</b>
              </span>
            </button>
          ))}
        </div>
      </div>

      {idx !== null && (
        <div className="lightbox" onClick={() => setIdx(null)} role="dialog" aria-modal="true">
          <button className="lightbox__x" aria-label="Close">
            <X />
          </button>
          <button
            className="lightbox__nav lightbox__nav--l"
            aria-label="Previous"
            onClick={(e) => (e.stopPropagation(), setIdx((idx - 1 + list.length) % list.length))}
          >
            <ChevronLeft />
          </button>
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={list[idx].src} alt={list[idx].title} />
            <figcaption>
              <b>{list[idx].title}</b>
              <span>{list[idx].place}</span>
            </figcaption>
          </figure>
          <button
            className="lightbox__nav lightbox__nav--r"
            aria-label="Next"
            onClick={(e) => (e.stopPropagation(), setIdx((idx + 1) % list.length))}
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </section>
  );
}

function Advocacy() {
  return (
    <section className="section advocacy">
      <div className="wrap">
        <div className="section__head">
          <p className="kicker" data-reveal>
            What she stands for
          </p>
          <h2 data-reveal>
            Three causes, <em>one platform.</em>
          </h2>
        </div>
        <div className="pillars">
          {pillars.map((p, i) => (
            <article key={p.k} className="pillar" data-reveal style={{ "--d": i }}>
              <span>{p.k}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Media() {
  const items = [
    {
      icon: Crown,
      label: "Pageant",
      title: "Miss Nepal 2025",
      text: "Contestant No. 03 representing Kushadevi, Panauti, Kavre. She used the stage to put oral health in the national conversation.",
      link: "https://www.facebook.com/missnepalthehiddentreasure/posts/03-sudina-humagainsudina-is-a-22-years-old-dental-surgery-student-from-kathmandu/1180541957440311/",
      cta: "Official profile",
    },
    {
      icon: Mic,
      label: "Television",
      title: "Host, The Fab Show",
      text: "Presenter of The Fab Show on Himalaya TV HD, bringing warmth and clarity to lifestyle television.",
      link: "https://www.instagram.com/reel/DdLcxEFKArv/",
      cta: "Watch a clip",
    },
    {
      icon: Radio,
      label: "Radio",
      title: "Community RJ",
      text: "Her first microphone was at her local community radio station, where she learned to speak plainly to every listener.",
    },
  ];
  return (
    <section className="section media" id="media">
      <div className="wrap media__grid">
        <div className="media__portrait" data-reveal>
          <img src={portraitFlags} alt="Dr. Sudina Humagain portrait" />
        </div>
        <div>
          <p className="kicker" data-reveal>
            On stage & on air
          </p>
          <h2 data-reveal>
            A dentist who <em>knows the mic.</em>
          </h2>
          <div className="media__list">
            {items.map(({ icon: I, ...m }, i) => (
              <article key={m.title} className="mediaitem" data-reveal style={{ "--d": i }}>
                <span className="mediaitem__icon">
                  <I size={20} />
                </span>
                <div>
                  <small>{m.label}</small>
                  <h3>{m.title}</h3>
                  <p>{m.text}</p>
                  {m.link && (
                    <a href={m.link} target="_blank" rel="noreferrer">
                      {m.cta} <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
          <a className="btn btn--ghost" href={site.instagram} target="_blank" rel="noreferrer">
            <InstagramIcon /> Follow @sudina_hmgn
          </a>
        </div>
      </div>
    </section>
  );
}

function Studio() {
  return (
    <section className="section studio" id="studio">
      <div className="wrap studio__card" data-reveal>
        <div className="studio__mark">
          <Flower2 size={44} />
          <span>Fit O'Clock</span>
          <small>Studio</small>
        </div>
        <div>
          <p className="kicker kicker--light">Movement as medicine</p>
          <h2>
            Yoga, dance and <em>a little discipline.</em>
          </h2>
          <p className="body body--light">
            As a certified yoga trainer and lifelong dancer, Sudina founded Fit O'Clock Studio to make movement a daily
            habit. Classes mix mindful yoga with joyful dance and, unsurprisingly, plenty of reminders to look after
            your posture and your smile.
          </p>
          <div className="studio__tags">
            <span>Yoga</span>
            <span>Dance</span>
            <span>Breathwork</span>
            <span>Women's wellness</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Book() {
  return (
    <section className="section book" id="book">
      <div className="wrap book__grid">
        <div className="book__intro">
          <p className="kicker" data-reveal>
            Book a consultation
          </p>
          <h2 data-reveal>
            Let's talk about <em>your smile.</em>
          </h2>
          <p className="body" data-reveal>
            Choose a reason, pick a time that suits you and leave your details. Every request is reviewed personally
            and confirmed by phone or email.
          </p>
          <ul className="book__points" data-reveal>
            <li>
              <Clock size={18} /> About 30 minutes per consultation
            </li>
            <li>
              <Video size={18} /> In person or by video
            </li>
            <li>
              <MapPin size={18} /> {site.location}
            </li>
          </ul>
          <p className="book__emergency">
            <TriangleAlert size={16} /> For severe swelling, trauma or bleeding that won't stop, go to your
            nearest emergency department.
          </p>
        </div>
        <div data-reveal>
          <Booking />
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section faq">
      <div className="wrap faq__grid">
        <h2 data-reveal>
          Good <em>questions.</em>
        </h2>
        <div className="faq__list">
          {faqs.map((f, i) => (
            <div key={i} className={`faq__item ${open === i ? "is-open" : ""}`}>
              <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                {f.q}
                <Plus size={20} />
              </button>
              <div className="faq__a">
                <p>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__grid">
        <div>
          <Logo tone="light" />
          <p>Dental surgeon, host and wellness educator, caring for smiles across Kavre and beyond.</p>
        </div>
        <div>
          <h4>Explore</h4>
          {nav.map(([l, h]) => (
            <a key={h} href={h}>
              {l}
            </a>
          ))}
        </div>
        <div>
          <h4>Connect</h4>
          <a href={site.instagram} target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a href={site.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          {site.email && <a href={`mailto:${site.email}`}>{site.email}</a>}
          <a href="#book">Book a consultation</a>
        </div>
      </div>
      <div className="wrap footer__base">
        <span>© {new Date().getFullYear()} Dr. Sudina Humagain. All rights reserved.</span>
        <span>
          Designed & built by <a href="https://yugal.codes" target="_blank" rel="noreferrer">yugal.codes</a>
        </span>
      </div>
    </footer>
  );
}

export default function App() {
  useReveal();
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Strip />
        <About />
        <Care />
        <Outreach />
        <Advocacy />
        <Media />
        <Studio />
        <Book />
        <Faq />
      </main>
      <Footer />
      <a href="#book" className="fab" aria-label="Book a consultation">
        <CalendarPlus size={22} />
      </a>
    </>
  );
}

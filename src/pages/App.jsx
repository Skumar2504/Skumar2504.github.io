import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import ThreeHero from '../components/ThreeHero.jsx'

// Features for HiredPath (each with bullet points)
const features = [
  {
    title: 'AI Job Matching',
    desc: 'Discover high-signal product management roles tailored to your background and aspirations using our AI-driven matching engine.',
    points: ['Personalized role suggestions', 'Signal-based quality scoring', 'Save & compare target roles']
  },
  {
    title: 'Keyword Intelligence',
    desc: 'Get personalized resume and pitch insights based on job description keywords to improve your search ranking and relevance.',
    points: ['JD parsing & keyword gaps', 'Resume line suggestions', 'Pitch prompts and examples']
  },
  {
    title: 'Rapid Applications',
    desc: 'Automate job applications with targeted scripts and pre-filled forms, so you can apply to more roles in less time.',
    points: ['Company-tailored cover letters', 'Pre-filled forms & checks', 'Batch apply flows']
  },
  {
    title: 'Smart Tracking & Insights',
    desc: 'Organize applications, schedule follow-ups, and gain data-driven insights into company signals and interview prep.',
    points: ['Unified pipeline & reminders', 'Company signals & alerts', 'Interview prep hub']
  },
  {
    title: 'Emotional & Community Support',
    desc: 'Stay motivated through built-in journaling and a supportive community of job seekers and mentors.',
    points: ['Weekly reflection & goals', 'Peer rooms and mentors', 'Templates to stay consistent']
  },
  {
    title: 'Network Activation Tools',
    desc: 'Leverage your professional network with personalized outreach templates and warm introduction suggestions.',
    points: ['Warm intro suggestions', 'Outreach templates', 'Follow‑up nudges']
  },
];
// Parallax on scroll (applies subtle translate based on scroll position)
function useParallax(ref, factor = 0.08) {
  useEffect(() => {
    const el = ref.current; if (!el) return;
    let rafId = 0;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const centerDist = (rect.top + rect.height/2) - vh/2;
        const t = Math.max(-1, Math.min(1, centerDist / vh));
        el.style.transform = `translateY(${(t*factor*100).toFixed(2)}px)`;
        el.style.opacity = String(Math.max(0, 1 - Math.abs(t)*0.4));
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(rafId); };
  }, [ref, factor]);
}


// Smooth scrolling
function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.12,
      wheelMultiplier: 1,
      smoothTouch: false,
    });
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }, []);
}

// Reveal-on-scroll
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('reveal-in'); });
    }, { threshold: 0.15 });
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// Count-up on reveal
function useCountUp(target, duration = 1200) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let started = false;
    const obs = new IntersectionObserver((entries) => {
      if (!started && entries[0].isIntersecting) {
        started = true;
        const start = performance.now();
        const step = (t) => {
          const p = Math.min(1, (t - start) / duration);
          setVal(target * p);
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);
  return [val, ref];
}

// Hero section with subtle animated background and type/delete effect
function Hero() {
  const ref = useRef(null);
  const words = ['AI‑Matched Roles', 'Keyword Intelligence', 'Rapid Applications', 'Smart Tracking', 'Supportive Community'];
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState('');
  const [deleting, setDeleting] = useState(false);

  // subtle mouse parallax for background
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty('--mx', x.toFixed(3));
      el.style.setProperty('--my', y.toFixed(3));
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  // type and delete effect (slower for clarity)
  useEffect(() => {
    const full = words[index % words.length];
    const speed = deleting ? 110 : 180; // slower typing & deleting
    const pause = 900; // hold on full word before deleting
    const t = setTimeout(() => {
      if (!deleting) {
        const next = full.slice(0, display.length + 1);
        setDisplay(next);
        if (next === full) {
          // small pause at the end then start deleting
          setTimeout(() => setDeleting(true), pause);
        }
      } else {
        const next = full.slice(0, display.length - 1);
        setDisplay(next);
        if (next.length === 0) { setDeleting(false); setIndex((i) => i + 1); }
      }
    }, display.length === 0 && !deleting ? 500 : speed);
    return () => clearTimeout(t);
  }, [display, deleting, index]);

  return (
    <section className="hero reveal" ref={ref}>
      <div className="hero-bg" aria-hidden />
      <div className="hero-layer l1" aria-hidden />
      <div className="hero-layer l2" aria-hidden />
      <div className="particles" aria-hidden>
        {Array.from({ length: 16 }).map((_, i) => (
          <span className="p" key={i} style={{
            '--dx': `${(i % 4) * 12 - 18}px`,
            '--delay': `${(i * 97) % 3000}ms`,
            '--dur': `${4000 + (i % 5) * 1000}ms`,
            '--size': `${6 + (i % 3) * 3}px`,
            left: `${6 + (i * 6) % 88}%`,
            top: `${10 + (i * 13) % 60}%`,
          }} />
        ))}
      </div>

      <ThreeHero />

      <div className="hero-stack">
        <h1 className="title center">Land Your Next PM Role Faster</h1>
        <p className="sub center">HiredPath is your AI copilot for job search—match roles, tailor resumes, and stay on track with clarity and calm.</p>
        <div className="actions center">
          <a href="#waitlist" className="btn btn-primary glow">Join the Waitlist</a>
          <a href="#features" className="btn btn-ghost">See Features</a>
        </div>
        <div className="type center">
          <span className="label">We power</span>
          <span className={`typing ${deleting ? 'deleting' : 'writing'}`}>{display}</span>
          <span className="caret" />
        </div>
      </div>
    </section>
  );
}

// Professional Problem section with center heading and count-up stats
function Stat({ label, to }) {
  const [val, ref] = useCountUp(to);
  const display = `${val.toFixed(1)}%`;
  return (
    <div className="stat" ref={ref}>
      <div className="num">{display}</div>
      <div className="label">{label}</div>
    </div>
  );
}

function Problem() {
  const stats = [
    { to: 94.7, label: 'find the process inefficient and overwhelming' },
    { to: 26.5, label: 'receive replies to applications' },
    { to: 73.7, label: 'lose track of applications and follow-ups' },
    { to: 90.8, label: 'want keyword insights to tailor resumes' },
    { to: 78.3, label: 'have networks they rarely utilize' },
  ];
  return (
    <section className="problem reveal" id="problem">
      <h2 className="center">Job searching shouldn’t feel like a second job</h2>
      <div className="stats">
        {stats.map(s => (<Stat key={s.label} label={s.label} to={s.to} />))}
      </div>
    </section>
  );
}

// Alternating feature sections with scroll-in and bullet points
function FeatureSection({ feature, align = 'left' }) {
  const cardRef = useRef(null);
  const parallaxRef = useRef(null);
  useParallax(parallaxRef, 0.06);
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      const rx = (-py * 6).toFixed(2);
      const ry = (px * 8).toFixed(2);
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', () => { el.style.transform = 'perspective(900px)'; });
    return () => { el.removeEventListener('mousemove', onMove); };
  }, []);

  return (
    <section className={`feature reveal ${align}`} ref={parallaxRef}>
      <div className="feature-content" ref={cardRef}>
        <div className="feature-inner">
          <div className="copy">
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
            {feature.points && (
              <ul className="points">
                {feature.points.map((p) => (<li key={p}>{p}</li>))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// Features list wrapper with alternating orientation
function Features() {
  return (
    <section className="features reveal" id="features">
      {features.map((feat, i) => (
        <FeatureSection key={feat.title} feature={feat} align={i % 2 === 0 ? 'left' : 'right'} />
      ))}
    </section>
  );
}

// Call‑to‑action section (enhanced)
function CTA() {
  return (
    <section className="cta reveal" id="waitlist">
      <div className="cta-inner">
        <h2>Ready to transform your job search?</h2>
        <p className="cta-sub">Join early members getting access to matching, insights and community.</p>
        <div className="cta-actions">
          <a href="https://forms.gle/" className="btn btn-primary">Join the Waitlist</a>
          <a href="#problem" className="btn btn-ghost">Why this matters</a>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} HiredPath. All rights reserved.</p>
    </footer>
  );
}

export default function App() {
  useLenis();
  useReveal();
  return (
    <div className="app">
      <Hero />
      <Problem />
      <Features />
      <CTA />
      <Footer />
    </div>
  );
}

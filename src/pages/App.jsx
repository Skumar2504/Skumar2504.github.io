import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';

// Features for HiredPath
const features = [
  {
    title: 'AI Job Matching',
    desc: 'Discover high-signal product management roles tailored to your background and aspirations using our AI-driven matching engine.',
  },
  {
    title: 'Keyword Intelligence',
    desc: 'Get personalized resume and pitch insights based on job description keywords to improve your search ranking and relevance.',
  },
  {
    title: 'Rapid Applications',
    desc: 'Automate job applications with targeted scripts and pre-filled forms, so you can apply to more roles in less time.',
  },
  {
    title: 'Smart Tracking & Insights',
    desc: 'Organize applications, schedule follow-ups, and gain data-driven insights into company signals and interview prep.',
  },
  {
    title: 'Emotional & Community Support',
    desc: 'Stay motivated through built-in journaling and a supportive community of job seekers and mentors.',
  },
  {
    title: 'Network Activation Tools',
    desc: 'Leverage your professional network with personalized outreach templates and warm introduction suggestions.',
  },
];

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

// Hero section with lightweight 3D parallax layers
function Hero() {
  const ref = useRef(null);
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

  return (
    <section className="hero reveal" ref={ref}>
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
      <h1 className="reveal">Find Your Path to the Perfect PM Role</h1>
      <p className="reveal">HiredPath helps busy professionals navigate the job market with AI-driven role matching, keyword insights, and supportive community.</p>
      <a href="#waitlist" className="btn primary reveal">Join the Waitlist</a>
    </section>
  );
}

// Problem section
function Problem() {
  return (
    <section className="problem reveal">
      <h2>Job searching shouldn’t feel like a second job</h2>
      <ul>
        <li><strong>94.7%</strong> find the process inefficient and overwhelming.</li>
        <li>Only <strong>26.5%</strong> receive replies to applications.</li>
        <li><strong>73.7%</strong> lose track of applications and follow-ups.</li>
        <li><strong>90.8%</strong> want better keyword insights to tailor their resumes.</li>
        <li><strong>78.3%</strong> have networks they rarely utilize.</li>
      </ul>
    </section>
  );
}

// Tilted feature card
function FeatureSection({ feature }) {
  const cardRef = useRef(null);
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      const rx = (-py * 10).toFixed(2);
      const ry = (px * 12).toFixed(2);
      el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      el.style.boxShadow = `0 18px 40px rgba(16,179,163,0.18)`;
    };
    const onLeave = () => {
      el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
      el.style.boxShadow = '';
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave); };
  }, []);

  return (
    <section className="feature reveal">
      <div className="feature-content" ref={cardRef}>
        <h3>{feature.title}</h3>
        <p>{feature.desc}</p>
      </div>
    </section>
  );
}

// Features list wrapper
function Features() {
  return (
    <section className="features reveal">
      {features.map((feat) => (
        <FeatureSection key={feat.title} feature={feat} />
      ))}
    </section>
  );
}

// Call‑to‑action section
function CTA() {
  return (
    <section className="cta reveal" id="waitlist">
      <h2>Ready to transform your job search?</h2>
      <a href="https://forms.gle/" className="btn primary">Join the Waitlist</a>
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

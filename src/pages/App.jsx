import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

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

// Hook to initialize Lenis smooth scrolling
function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.12,
      wheelMultiplier: 1,
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);
}

// Hero section for top of page
function Hero() {
  return (
    <section className="hero">
      <h1>Find Your Path to the Perfect PM Role</h1>
      <p>HiredPath helps busy professionals navigate the job market with AI-driven role matching, keyword insights, and supportive community.</p>
      <a href="#waitlist" className="btn primary">Join the Waitlist</a>
    </section>
  );
}

// Problem section with statistics highlighting pain points
function Problem() {
  return (
    <section className="problem">
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

// Single feature call‑out section
function FeatureSection({ feature }) {
  return (
    <section className="feature">
      <div className="feature-content">
        <h3>{feature.title}</h3>
        <p>{feature.desc}</p>
      </div>
    </section>
  );
}

// Features list wrapper
function Features() {
  return (
    <section className="features">
      {features.map((feat) => (
        <FeatureSection key={feat.title} feature={feat} />
      ))}
    </section>
  );
}

// Call‑to‑action section
function CTA() {
  return (
    <section className="cta" id="waitlist">
      <h2>Ready to transform your job search?</h2>
      {/* Replace the href with your actual waitlist or signup link */}
      <a href="https://forms.gle/" className="btn primary">Join the Waitlist</a>
    </section>
  );
}

// Footer component
function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} HiredPath. All rights reserved.</p>
    </footer>
  );
}

export default function App() {
  useLenis();
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

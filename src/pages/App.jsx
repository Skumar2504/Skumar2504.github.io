import React, { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'

const features = [
  {
    title: 'Role Matching Intelligence',
    desc: 'AI curates high-signal PM roles across the market based on your background and preferences.'
  },
  {
    title: 'Tailored Pitch & Resume Insights',
    desc: 'Get targeted suggestions to refine your resume and outreach for each role.'
  },
  {
    title: 'Smart Tracking Dashboard',
    desc: 'Organize applications, follow-ups, and interview prep with reminders.'
  },
  {
    title: 'Company Signals & Insights',
    desc: 'See team structure, product maturity, and recent signals to prioritize where to apply.'
  }
]

function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.12,
      wheelMultiplier: 1,
      smoothTouch: false,
    })

    // Smooth RAF loop
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Smooth anchor links
    const links = Array.from(document.querySelectorAll('a[href^="#"]'))
    const clickHandlers = links.map(link => {
      const handler = (e) => {
        const target = link.getAttribute('href')
        if (target && target !== '#') {
     
          e.preventDefault()
          lenis.scrollTo(target)
        }
      }
      link.addEventListener('click', handler)
      return { link, handler }
    })

    return () => {
      clickHandlers.forEach(({ link, handler }) => link.removeEventListener('click', handler))
      lenis.destroy()
    }
  }, [])
}

function Parallax({ speed = 0.2, children, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const offset = rect.top + rect.height / 2 - window.innerHeight / 2
      const translate = -offset * speed
      el.style.transform = `translate3d(0, ${translate.toFixed(2)}px, 0)`
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [speed])
  return (
    <div ref={ref} className={className} style={{ willChange: 'transform' }}>
      {children}
    </div>
  )
}

export default function App() {
  useLenis()

  return (
    <div>
      <div id="top" />
      <Header />
      <Hero />
      <Features />
      <ParallaxBand />
      <About />
      <CTA />
      <Footer />
    </div>
  )
}

function Header() {
  return (
    <header className="container header">
      <div className="brand">
        <span className="logo">H</span>
        <span className="name">Hiredpath</span>
      </div>
      <nav>
        <a href="#features">Features</a>
        <a href="#about">About</a>
        <a href="#cta" className="btn btn-primary">Join Waitlist</a>
      </nav>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <Parallax speed={0.12} className="hero-badge">AI Copilot for PM Job Search</Parallax>
        <h1>
          Find your next PM role faster
        </h1>
        <p className="sub">
          Hiredpath uses AI to match you with high-signal roles, tailor your pitch, and track progress.
        </p>
        <div className="hero-cta">
          <a href="#cta" className="btn btn-primary">Get Early Access</a>
          <a href="#features" className="btn btn-ghost">See Features</a>
        </div>
      </div>
      <Parallax speed={0.06} className="shape s1" />
      <Parallax speed={0.1} className="shape s2" />
      <Parallax speed={0.2} className="shape s3" />
    </section>
  )
}

function Features() {
  return (
    <section id="features" className="section container">
      <h2 className="section-title">Features</h2>
      <div className="grid">
        {features.map((f) => (
          <div key={f.title} className="card">
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function ParallaxBand() {
  return (
    <section className="parallax-band">
      <div className="container band-inner">
        <Parallax speed={0.15}>
          <h3>Let AI surface the right opportunities — you focus on landing them.</h3>
        </Parallax>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="section container">
      <h2 className="section-title">About Us</h2>
      <p>
        We’re building Hiredpath to simplify the PM job search with AI. Our mission is to give every product
        manager the clarity and leverage to find roles where they can thrive.
      </p>
    </section>
  )
}

function CTA() {
  return (
    <section id="cta" className="section container cta">
      <h2 className="section-title">Join the waitlist</h2>
      <p>Be the first to try Hiredpath when we launch.</p>
      <a href="mailto:hello@hiredpath.ai?subject=Waitlist" className="btn btn-primary">Request Access</a>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>© {new Date().getFullYear()} Hiredpath</span>
        <a href="#top" className="top">Back to top ↑</a>
      </div>
    </footer>
  )
}


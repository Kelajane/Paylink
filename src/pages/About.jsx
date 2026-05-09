import { Globe, Shield, Sparkles, Users, BarChart3, MessageCircle } from 'lucide-react';

const reasons = [
  {
    icon: Globe,
    title: 'Global payments focus',
    description: 'Accept crypto payments across borders with a link-based checkout designed for worldwide conversion.'
  },
  {
    icon: Shield,
    title: 'Secure transactions',
    description: 'Link delivery and encrypted payment details keep every transaction lightweight and secure.'
  },
  {
    icon: Sparkles,
    title: 'Creator economy ready',
    description: 'Built for freelancers, artists, and small businesses who need fast, reliable payment tools.'
  },
  {
    icon: BarChart3,
    title: 'Actionable insights',
    description: 'Monitor revenue, transactions, and business performance with polished analytics.'
  }
];

const benefits = [
  'Fast settlement with link-based checkout',
  'Borderless payments for global customers',
  'Secure, final payments without chargebacks',
  'Frictionless checkout from any device',
  'Creator-friendly billing experience',
  'Easy commercial adoption worldwide'
];

export default function About() {
  return (
    <div className="about-page container fade-in">
      <section className="about-hero section">
        <div className="about-copy">
          <p className="eyebrow">About PayLink</p>
          <h1>Modern payment infrastructure for creators and businesses</h1>
          <p className="about-subtitle">
            PayLink helps teams accept crypto payments seamlessly through shareable payment links, polished receipts, and conversion-focused workflows.
          </p>
        </div>
      </section>

      <section className="mission-section section">
        <div className="section-header text-center">
          <p className="eyebrow">Our mission</p>
          <h2>Why PayLink exists</h2>
          <p>We simplify crypto payments so creators and businesses can focus on revenue, not integration.</p>
        </div>

        <div className="mission-grid">
          {reasons.map(({ icon: Icon, title, description }) => (
            <article key={title} className="mission-card">
              <div className="mission-icon"><Icon size={28} /></div>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="story-section section">
        <div className="story-content">
          <div className="story-text">
            <h2>Built for growth across the creator economy</h2>
            <p>PayLink exists to eliminate payment friction and give businesses a polished cash collection experience with no backend required.</p>
            <p>Our platform is designed to support teams who need simple, secure payment links and analytics without technical overhead.</p>
            <p>Every step of the product is optimized for speed, trust, and conversion so customers complete payments quickly and confidently.</p>
          </div>

          <div className="story-visual card">
            <div className="story-stat">
              <span className="stat-number">10K+</span>
              <p>Payments processed</p>
            </div>
            <div className="story-stat">
              <span className="stat-number">99.9%</span>
              <p>Uptime reliability</p>
            </div>
            <div className="story-stat">
              <span className="stat-number">500+</span>
              <p>Creators onboarded</p>
            </div>
          </div>
        </div>
      </section>

      <section className="business-section section">
        <div className="section-header text-center">
          <p className="eyebrow">Why businesses choose PayLink</p>
          <h2>Premium payment rails for modern commerce</h2>
        </div>

        <div className="business-grid">
          {benefits.map((benefit) => (
            <div key={benefit} className="business-card">
              <div className="business-dot" />
              <p>{benefit}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-cta section">
        <div className="about-cta-card card">
          <div>
            <p className="eyebrow">Ready to launch</p>
            <h2>Start accepting crypto with a refined checkout experience</h2>
          </div>
          <a href="/create" className="primary-button">Create your first PayLink</a>
        </div>
      </section>
    </div>
  );
}

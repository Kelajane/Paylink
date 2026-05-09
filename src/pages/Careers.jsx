import { Link } from 'react-router-dom';
import { Users, Heart, Zap, Globe, Coffee, Target, ArrowRight, MapPin, Clock } from 'lucide-react';

export default function Careers() {
  const values = [
    {
      icon: <Heart size={32} />,
      title: "Creator-First",
      description: "We build for creators, by creators. Every decision starts with understanding the needs of artists, freelancers, and small businesses."
    },
    {
      icon: <Zap size={32} />,
      title: "Move Fast",
      description: "We believe in rapid iteration and shipping features that matter. No bureaucracy, just focused execution and continuous improvement."
    },
    {
      icon: <Globe size={32} />,
      title: "Global Mindset",
      description: "Our team spans continents and cultures. We build products that work seamlessly across borders and time zones."
    },
    {
      icon: <Coffee size={32} />,
      title: "Work-Life Balance",
      description: "We believe great work comes from happy people. Flexible hours, remote-first culture, and unlimited PTO for all team members."
    }
  ];

  const openRoles = [
    {
      title: "Senior Frontend Engineer",
      type: "Full-time",
      location: "Remote",
      description: "Build the next generation of payment experiences using React, TypeScript, and modern web technologies."
    },
    {
      title: "Product Designer",
      type: "Full-time",
      location: "Remote",
      description: "Design intuitive interfaces that make crypto payments accessible to everyone, regardless of technical background."
    },
    {
      title: "DevOps Engineer",
      type: "Full-time",
      location: "Remote",
      description: "Ensure our infrastructure scales globally while maintaining 99.9% uptime for millions of transactions."
    },
    {
      title: "Customer Success Manager",
      type: "Full-time",
      location: "Remote",
      description: "Help creators and businesses succeed with PayLink through personalized onboarding and ongoing support."
    }
  ];

  return (
    <div className="page-content">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-container fade-in">
            <div className="hero-content">
              <p className="eyebrow">Join Our Team</p>
              <h1 className="hero-title">Build the future of payments</h1>
              <p className="hero-subtitle">
                We're a small, passionate team building tools that empower creators and businesses worldwide.
                Help us make crypto payments simple, fast, and accessible to everyone.
              </p>
              <div className="hero-ctas">
                <a href="#openings" className="primary-button">
                  View Open Roles <ArrowRight size={18} />
                </a>
                <Link to="/about" className="secondary-button">
                  Learn About Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section section">
        <div className="container">
          <div className="mission-card card">
            <div className="mission-content">
              <h2>Our Mission</h2>
              <p className="mission-text">
                To democratize access to fast, secure, and borderless payments. We believe that money should move
                as freely as information does online. By removing the friction from payments, we empower creators,
                freelancers, and businesses to focus on what they do best.
              </p>
              <div className="mission-stats">
                <div className="stat">
                  <strong>$2M+</strong>
                  <span>Processed in payments</span>
                </div>
                <div className="stat">
                  <strong>120+</strong>
                  <span>Countries supported</span>
                </div>
                <div className="stat">
                  <strong>10K+</strong>
                  <span>Active users</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Our Values</h2>
            <p>What drives us every day</p>
          </div>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">
                  {value.icon}
                </div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-desc">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="culture-section section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Life at PayLink</h2>
            <p>Work with purpose, flexibility, and impact</p>
          </div>
          <div className="culture-grid">
            <div className="culture-card">
              <div className="culture-icon">
                <MapPin size={32} />
              </div>
              <h3>Remote-First</h3>
              <p>Work from anywhere in the world. We have team members across 15+ countries and counting.</p>
            </div>
            <div className="culture-card">
              <div className="culture-icon">
                <Clock size={32} />
              </div>
              <h3>Flexible Hours</h3>
              <p>Set your own schedule. We focus on output and impact, not hours at a desk.</p>
            </div>
            <div className="culture-card">
              <div className="culture-icon">
                <Target size={32} />
              </div>
              <h3>Autonomy</h3>
              <p>Own your projects from start to finish. We trust our team to make the right decisions.</p>
            </div>
            <div className="culture-card">
              <div className="culture-icon">
                <Users size={32} />
              </div>
              <h3>Growth Focus</h3>
              <p>Continuous learning and development. Regular feedback, mentorship, and conference budgets.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Roles Section */}
      <section id="openings" className="openings-section section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Open Positions</h2>
            <p>Join us in building the future of payments</p>
          </div>
          <div className="openings-grid">
            {openRoles.map((role, index) => (
              <div key={index} className="opening-card">
                <div className="opening-header">
                  <h3>{role.title}</h3>
                  <div className="opening-meta">
                    <span className="opening-type">{role.type}</span>
                    <span className="opening-location">{role.location}</span>
                  </div>
                </div>
                <p className="opening-desc">{role.description}</p>
                <button className="ghost-button">
                  Learn More <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-banner-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to join our mission?</h2>
            <p className="cta-subtitle">We're always looking for talented people who share our vision</p>
            <a href="mailto:careers@paylink.com" className="cta-button">
              Send Us Your Resume
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
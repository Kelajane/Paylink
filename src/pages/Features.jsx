import { Link } from 'react-router-dom';
import { Zap, Share2, Shield, Globe, Clock, CheckCircle, BarChart3, Users, Star, Lock, Activity, TrendingUp, ArrowRight } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Zap size={32} />,
      title: "Instant Payments",
      description: "Receive payments instantly on the Solana blockchain. No waiting for bank transfers or payment processors.",
      benefits: ["Sub-second confirmations", "No intermediaries", "Direct to your wallet"]
    },
    {
      icon: <Globe size={32} />,
      title: "Global Reach",
      description: "Accept payments from anywhere in the world. No geographic restrictions or currency conversion fees.",
      benefits: ["200+ countries supported", "No cross-border fees", "Multi-currency support"]
    },
    {
      icon: <Shield size={32} />,
      title: "Bank-Grade Security",
      description: "Built on Solana's secure blockchain with cryptographic protection and no chargeback fraud.",
      benefits: ["Immutable transactions", "No chargebacks", "Enterprise security"]
    },
    {
      icon: <BarChart3 size={32} />,
      title: "Real-Time Analytics",
      description: "Track payments, revenue trends, and customer insights with comprehensive dashboard analytics.",
      benefits: ["Live payment tracking", "Revenue analytics", "Customer insights"]
    },
    {
      icon: <Share2 size={32} />,
      title: "Easy Sharing",
      description: "Share payment links via email, SMS, social media, or any messaging platform instantly.",
      benefits: ["One-click sharing", "Mobile optimized", "No app required"]
    },
    {
      icon: <Clock size={32} />,
      title: "24/7 Availability",
      description: "Payments work around the clock. No business hours, holidays, or maintenance windows.",
      benefits: ["Always available", "No downtime", "Global timezone support"]
    }
  ];

  return (
    <div className="page-content">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-container fade-in">
            <div className="hero-content">
              <p className="eyebrow">Product Features</p>
              <h1 className="hero-title">Everything you need to accept crypto payments</h1>
              <p className="hero-subtitle">
                Powerful features designed for creators, freelancers, and businesses who want the best payment experience.
              </p>
              <div className="hero-ctas">
                <Link to="/create" className="primary-button">
                  Start Creating Links <ArrowRight size={18} />
                </Link>
                <Link to="/pricing" className="secondary-button">
                  View Pricing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="features-section section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Core Features</h2>
            <p>Built for speed, security, and simplicity</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.description}</p>
                <ul className="feature-benefits">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i}>
                      <CheckCircle size={16} />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="advanced-section section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Advanced Capabilities</h2>
            <p>Professional tools for growing businesses</p>
          </div>
          <div className="advanced-grid">
            <div className="advanced-card">
              <div className="advanced-icon">
                <Activity size={40} />
              </div>
              <h3>Real-Time Notifications</h3>
              <p>Get instant alerts when payments are received. Never miss a transaction with push notifications and email updates.</p>
            </div>
            <div className="advanced-card">
              <div className="advanced-icon">
                <TrendingUp size={40} />
              </div>
              <h3>Revenue Analytics</h3>
              <p>Detailed insights into your payment trends, customer behavior, and revenue growth with exportable reports.</p>
            </div>
            <div className="advanced-card">
              <div className="advanced-icon">
                <Users size={40} />
              </div>
              <h3>Customer Management</h3>
              <p>Track customer payment history, manage recurring payments, and build lasting relationships with detailed profiles.</p>
            </div>
            <div className="advanced-card">
              <div className="advanced-icon">
                <Lock size={40} />
              </div>
              <h3>Enterprise Security</h3>
              <p>Bank-level encryption, compliance certifications, and advanced fraud detection to protect your business.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-banner-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to experience these features?</h2>
            <p className="cta-subtitle">Join thousands of creators and businesses already using PayLink</p>
            <Link to="/create" className="cta-button">
              Create Your First PayLink
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
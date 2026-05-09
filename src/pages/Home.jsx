import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Share2, Shield, Globe, Clock, CheckCircle, BarChart3, Users, Star, Lock, Activity, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';
import FAQAccordion from '../components/FAQAccordion.jsx';

const activityFeed = [
  { text: 'Sarah Chen received 0.45 SOL', time: '2 mins ago', active: true },
  { text: 'Payment from Germany completed', time: '5 mins ago', active: true },
  { text: 'Creator payout successful', time: '12 mins ago', active: true },
  { text: 'Invoice payment received', time: '18 mins ago', active: false },
];

const faqData = [
  {
    question: "How does PayLink work?",
    answer: "PayLink creates secure payment links that you can share with customers. They click the link, enter their payment details, and the transaction completes instantly on the Solana blockchain. No apps or accounts needed for payers."
  },
  {
    question: "Are payments secure?",
    answer: "Absolutely. PayLink uses blockchain technology for immutable, fraud-proof transactions. Payments are processed on Solana's secure network with no chargebacks or intermediaries. Your funds go directly to your wallet."
  },
  {
    question: "Do I need crypto experience?",
    answer: "Not at all! PayLink is designed for everyone. You just need a Solana wallet address to receive payments. Customers can pay with any Solana-compatible wallet or even credit cards through our integrated partners."
  },
  {
    question: "Can I use PayLink globally?",
    answer: "Yes! PayLink works worldwide. Since it's built on Solana, there are no geographic restrictions or currency conversion fees. Customers from any country can pay you instantly."
  },
  {
    question: "How fast are transactions?",
    answer: "Lightning fast! Most transactions confirm within 3-5 seconds on the Solana network. You'll receive instant notifications, and funds are available immediately in your wallet."
  },
  {
    question: "Is there a free plan?",
    answer: "Yes! PayLink offers a generous free tier with up to 10 payment links per month and basic analytics. Upgrade to Pro for unlimited links, advanced reporting, and priority support."
  }
];

export default function Home() {
  const [counters, setCounters] = useState({
    links: 0,
    countries: 0,
    volume: 0,
    uptime: 0
  });

  useState(() => {
    const targets = { links: 10000, countries: 120, volume: 2000000, uptime: 99.9 };
    let current = { links: 0, countries: 0, volume: 0, uptime: 0 };
    
    const interval = setInterval(() => {
      setCounters(prev => ({
        links: Math.min(prev.links + 200, targets.links),
        countries: Math.min(prev.countries + 3, targets.countries),
        volume: Math.min(prev.volume + 50000, targets.volume),
        uptime: Math.min(prev.uptime + 0.3, targets.uptime)
      }));
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page-content">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-container fade-in">
            <div className="hero-content">
              <p className="eyebrow">Accept crypto payments</p>
              <h1 className="hero-title">Accept Crypto Payments Instantly with a Simple Link</h1>
              <p className="hero-subtitle">
                Create, share, and receive payments globally in seconds — no setup, no friction.
              </p>
              <div className="hero-ctas">
                <Link to="/create" className="primary-button">
                  Create PayLink
                </Link>
                <Link to="/dashboard" className="secondary-button">
                  View Demo
                </Link>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-card">
                <div className="mock-dashboard">
                  <div className="mock-header">
                    <h3>Dashboard Preview</h3>
                    <div className="status-pill">Live</div>
                  </div>
                  <div className="mock-stats">
                    <div className="mock-stat">
                      <div className="mock-stat-value">$2,847</div>
                      <div className="mock-stat-label">Total Received</div>
                    </div>
                    <div className="mock-stat">
                      <div className="mock-stat-value">23</div>
                      <div className="mock-stat-label">Payments</div>
                    </div>
                    <div className="mock-stat">
                      <div className="mock-stat-value">98%</div>
                      <div className="mock-stat-label">Success Rate</div>
                    </div>
                  </div>
                  <div className="mock-chart"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="trust-section">
            <div className="trust-grid">
              <span className="logo-pill">Pulse</span>
              <span className="logo-pill">Mint</span>
              <span className="logo-pill">Flow</span>
              <span className="logo-pill">Wave</span>
              <span className="logo-pill">Forge</span>
              <span className="logo-pill">Nova</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Why Choose PayLink?</h2>
            <p>Simple, secure, and instant crypto payments for modern businesses</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Zap size={24} />
              </div>
              <h3 className="feature-title">Lightning Fast</h3>
              <p className="feature-desc">Receive payments instantly with blockchain speed. No waiting for confirmations or bank transfers.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Share2 size={24} />
              </div>
              <h3 className="feature-title">Share Anywhere</h3>
              <p className="feature-desc">Send your PayLink via WhatsApp, email, or social media. Works on any device, anywhere in the world.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Shield size={24} />
              </div>
              <h3 className="feature-title">Bank-Level Security</h3>
              <p className="feature-desc">Military-grade encryption and blockchain security. Your payments are protected by cryptography.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Globe size={24} />
              </div>
              <h3 className="feature-title">Borderless Payments</h3>
              <p className="feature-desc">Accept payments from anywhere in the world. No currency conversion fees or international restrictions.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Clock size={24} />
              </div>
              <h3 className="feature-title">Zero Setup Time</h3>
              <p className="feature-desc">Get started in under 60 seconds. No wallets to configure, no integrations required.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <CheckCircle size={24} />
              </div>
              <h3 className="feature-title">Creator Friendly</h3>
              <p className="feature-desc">Perfect for freelancers, content creators, and small businesses. Start accepting crypto today.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works-section section">
        <div className="container">
          <div className="section-header text-center">
            <h2>How It Works</h2>
            <p>Three simple steps to start accepting crypto payments</p>
          </div>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3 className="step-title">Create Your Link</h3>
              <p className="step-desc">Enter the amount and description. Generate your unique PayLink in seconds.</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3 className="step-title">Share with Customers</h3>
              <p className="step-desc">Send the link via email, WhatsApp, or any messaging app. No app downloads needed.</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3 className="step-title">Receive Instantly</h3>
              <p className="step-desc">Customers pay directly from their wallet. Funds arrive in your account immediately.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Activity Feed Section */}
      <section className="activity-feed-section section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Real-Time Payment Activity</h2>
            <p>See how creators and businesses are using PayLink right now</p>
          </div>
          <div className="activity-feed-panel" style={{ marginTop: '40px' }}>
            <div className="activity-feed-content">
              <h2>Live Activity Feed</h2>
              <p>Thousands of transactions happening every day. Real-time notifications keep you updated.</p>
              <div className="activity-feed-list">
                {activityFeed.map((item, idx) => (
                  <div key={idx} className="activity-item" style={{ animationDelay: `${idx * 0.1}s` }}>
                    <div className={`activity-dot ${!item.active ? 'opacity-50' : ''}`}></div>
                    <div className="activity-text">
                      <p>{item.text}</p>
                    </div>
                    <div className="activity-time">{item.time}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="activity-visual">
              <div className="activity-visual-chart"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Metrics Section */}
      <section className="trust-metrics-section section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Trusted by Thousands</h2>
            <p>PayLink's proven track record across the creator economy</p>
          </div>
          <div className="trust-metrics-grid">
            <div className="metric-card">
              <div className="metric-value">{counters.links.toLocaleString()}+</div>
              <p className="metric-label">Payment Links Created</p>
            </div>
            <div className="metric-card">
              <div className="metric-value">{counters.countries}+</div>
              <p className="metric-label">Countries Supported</p>
            </div>
            <div className="metric-card">
              <div className="metric-value">${(counters.volume / 1000000).toFixed(1)}M+</div>
              <p className="metric-label">Payment Volume</p>
            </div>
            <div className="metric-card">
              <div className="metric-value">{counters.uptime.toFixed(1)}%</div>
              <p className="metric-label">Uptime Reliability</p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="security-section section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Enterprise-Grade Security</h2>
            <p>Your payments are protected by military-grade encryption and blockchain technology</p>
          </div>
          <div className="security-grid">
            <div className="security-card">
              <div className="security-icon">
                <Lock size={28} />
              </div>
              <h3>Encrypted Transactions</h3>
              <p>End-to-end encryption ensures payment details remain confidential and secure throughout the process.</p>
            </div>
            <div className="security-card">
              <div className="security-icon">
                <Shield size={28} />
              </div>
              <h3>Secure Infrastructure</h3>
              <p>Built on industry-standard security protocols with continuous monitoring and threat detection.</p>
            </div>
            <div className="security-card">
              <div className="security-icon">
                <CheckCircle size={28} />
              </div>
              <h3>Fraud Protection</h3>
              <p>Advanced fraud detection systems keep your account and funds safe from unauthorized access.</p>
            </div>
            <div className="security-card">
              <div className="security-icon">
                <Globe size={28} />
              </div>
              <h3>Global Reliability</h3>
              <p>Distributed infrastructure ensures 99.9% uptime and fast payment processing worldwide.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="integrations-section section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Connect Your Tools</h2>
            <p>Integrate PayLink with the platforms you already use</p>
          </div>
          <div className="integrations-grid">
            <div className="integration-card">
              <span style={{ fontSize: '32px' }}>💬</span>
              <div className="integration-name">Discord</div>
            </div>
            <div className="integration-card">
              <span style={{ fontSize: '32px' }}>✈️</span>
              <div className="integration-name">Telegram</div>
            </div>
            <div className="integration-card">
              <span style={{ fontSize: '32px' }}>💳</span>
              <div className="integration-name">Stripe</div>
            </div>
            <div className="integration-card">
              <span style={{ fontSize: '32px' }}>📝</span>
              <div className="integration-name">Notion</div>
            </div>
            <div className="integration-card">
              <span style={{ fontSize: '32px' }}>💼</span>
              <div className="integration-name">Slack</div>
            </div>
            <div className="integration-card">
              <span style={{ fontSize: '32px' }}>⚡</span>
              <div className="integration-name">Zapier</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why PayLink */}
      <section className="why-section section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Why PayLink Stands Out</h2>
            <p>Built for the future of payments</p>
          </div>
          <div className="advantages-grid">
            <div className="advantage-card">
              <div className="advantage-icon">
                <Zap size={32} />
              </div>
              <h3 className="advantage-title">Instant Settlement</h3>
              <p className="advantage-desc">Unlike traditional payments that take days, crypto settles in minutes with PayLink.</p>
            </div>
            <div className="advantage-card">
              <div className="advantage-icon">
                <Globe size={32} />
              </div>
              <h3 className="advantage-title">Global Reach</h3>
              <p className="advantage-desc">Accept payments from 200+ countries without worrying about currency conversion.</p>
            </div>
            <div className="advantage-card">
              <div className="advantage-icon">
                <Shield size={32} />
              </div>
              <h3 className="advantage-title">Secure by Design</h3>
              <p className="advantage-desc">Blockchain security with no chargebacks or fraud. Payments are final and immutable.</p>
            </div>
            <div className="advantage-card">
              <div className="advantage-icon">
                <Users size={32} />
              </div>
              <h3 className="advantage-title">Creator Focused</h3>
              <p className="advantage-desc">Designed for freelancers, artists, and small businesses who need simple payment solutions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="dashboard-preview-section section">
        <div className="container">
          <div className="preview-card">
            <div className="preview-header">
              <h2 className="preview-title">Real-Time Dashboard</h2>
              <p className="preview-desc">Track payments, view analytics, and manage your business from one place</p>
            </div>
            <div className="mock-dashboard">
              <div className="mock-header">
                <h3>PayLink Dashboard</h3>
                <div className="status-pill">Live</div>
              </div>
              <div className="mock-stats">
                <div className="mock-stat">
                  <div className="mock-stat-value">$12,847</div>
                  <div className="mock-stat-label">Total Received</div>
                </div>
                <div className="mock-stat">
                  <div className="mock-stat-value">156</div>
                  <div className="mock-stat-label">Payments</div>
                </div>
                <div className="mock-stat">
                  <div className="mock-stat-value">99.2%</div>
                  <div className="mock-stat-label">Success Rate</div>
                </div>
                <div className="mock-stat">
                  <div className="mock-stat-value">$82</div>
                  <div className="mock-stat-label">Avg Payment</div>
                </div>
              </div>
              <div className="mock-chart"></div>
              <div className="mock-table">
                <div className="mock-table-header">
                  <span>Description</span>
                  <span>Amount</span>
                  <span>Status</span>
                </div>
                <div className="mock-table-row">
                  <span>Website Design</span>
                  <span>$500</span>
                  <span className="status-pill">Paid</span>
                </div>
                <div className="mock-table-row">
                  <span>Consulting Session</span>
                  <span>$200</span>
                  <span className="status-pill">Paid</span>
                </div>
                <div className="mock-table-row">
                  <span>Logo Design</span>
                  <span>$350</span>
                  <span className="status-pill">Pending</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section section">
        <div className="container">
          <div className="section-header text-center">
            <h2>What Our Users Say</h2>
            <p>Join thousands of creators and businesses using PayLink</p>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" color="var(--accent-green)" />)}
              </div>
              <p className="testimonial-quote">"PayLink transformed how I get paid. No more waiting 30 days for checks — clients pay instantly and I get notified immediately."</p>
              <div className="testimonial-author">
                <div className="author-avatar"></div>
                <div className="author-info">
                  <h4>Sarah Chen</h4>
                  <p>Freelance Designer</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" color="var(--accent-green)" />)}
              </div>
              <p className="testimonial-quote">"As a content creator, PayLink makes it so easy to accept donations. My fans love the simplicity and I love the instant payouts."</p>
              <div className="testimonial-author">
                <div className="author-avatar"></div>
                <div className="author-info">
                  <h4>Marcus Rodriguez</h4>
                  <p>YouTube Creator</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" color="var(--accent-green)" />)}
              </div>
              <p className="testimonial-quote">"Finally, a payment solution that works globally. I have clients in 15 countries and PayLink handles everything seamlessly."</p>
              <div className="testimonial-author">
                <div className="author-avatar"></div>
                <div className="author-info">
                  <h4>Emma Thompson</h4>
                  <p>Digital Agency Owner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section section hide-on-desktop">
        <div className="container">
          <div className="section-header text-center">
            <h2>Frequently Asked Questions</h2>
            <p>Everything you need to know about accepting crypto payments</p>
          </div>
          <FAQAccordion faqData={faqData} />
        </div>
      </section>

      {/* Newsletter Waitlist */}
      <section className="newsletter-section section">
        <div className="container newsletter-card card">
          <div className="newsletter-copy">
            <p className="eyebrow">Stay in the loop</p>
            <h2>Get early access to new product updates and features</h2>
            <p className="subtext">Join the PayLink waitlist and be the first to know when new payment tools and creator features launch.</p>
          </div>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" aria-label="Email address" />
            <button type="submit" className="primary-button">Join the waitlist</button>
          </form>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Start Accepting Crypto Payments Today</h2>
            <p className="cta-subtitle">Join thousands of creators and businesses already using PayLink to streamline their payments</p>
            <Link to="/create" className="cta-button">
              Create Your First PayLink
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-content">
            <div>
              <div className="footer-brand">⚡ PayLink</div>
              <p className="footer-desc">The simplest way to accept crypto payments. Built for creators, freelancers, and modern businesses worldwide.</p>
            </div>
            <div className="footer-links">
              <h4>Product</h4>
              <ul>
                <li><Link to="/features">Features</Link></li>
                <li><Link to="/pricing">Pricing</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
              </ul>
            </div>
            <div className="footer-links">
              <h4>Company</h4>
              <ul>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/careers">Careers</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
            <div className="footer-links">
              <h4>Resources</h4>
              <ul>
                <li><Link to="/documentation">Documentation</Link></li>
                <li><Link to="/help">Help Center</Link></li>
                <li><Link to="/api-docs">API Docs</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
              </ul>
            </div>
            <div className="footer-links">
              <h4>Legal</h4>
              <ul>
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms of Service</Link></li>
                <li><Link to="/security">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 PayLink. All rights reserved. Building the future of payments for creators.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

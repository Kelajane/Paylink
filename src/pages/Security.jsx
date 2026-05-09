import { Shield, Lock, Eye, Key, Server, AlertTriangle, CheckCircle, Zap } from 'lucide-react';

export default function Security() {
  const securityFeatures = [
    {
      icon: <Lock size={24} />,
      title: "End-to-End Encryption",
      description: "All data is encrypted in transit and at rest using industry-standard AES-256 encryption.",
      details: "We use TLS 1.3 for data in transit and AES-256-GCM for data at rest."
    },
    {
      icon: <Key size={24} />,
      title: "API Key Security",
      description: "Secure API key generation and management with automatic rotation capabilities.",
      details: "Keys are hashed using bcrypt and never stored in plain text."
    },
    {
      icon: <Shield size={24} />,
      title: "Blockchain Security",
      description: "Leverage the inherent security of the Solana blockchain for all transactions.",
      details: "All payments are secured by Solana's cryptographic protocols and consensus mechanism."
    },
    {
      icon: <Eye size={24} />,
      title: "Privacy by Design",
      description: "Built with privacy-first principles, collecting only essential user data.",
      details: "Zero-knowledge architecture for sensitive payment information."
    },
    {
      icon: <Server size={24} />,
      title: "Infrastructure Security",
      description: "Enterprise-grade cloud infrastructure with multi-layer security controls.",
      details: "SOC 2 Type II compliant with regular security audits and penetration testing."
    },
    {
      icon: <AlertTriangle size={24} />,
      title: "Fraud Detection",
      description: "Advanced AI-powered fraud detection and prevention systems.",
      details: "Real-time monitoring and automated response to suspicious activities."
    }
  ];

  const complianceStandards = [
    { name: "SOC 2 Type II", status: "Certified", description: "Security, availability, and confidentiality" },
    { name: "GDPR", status: "Compliant", description: "European data protection regulations" },
    { name: "CCPA", status: "Compliant", description: "California consumer privacy laws" },
    { name: "PCI DSS", status: "Level 1", description: "Payment card industry security standards" }
  ];

  const securityPractices = [
    "Regular security audits and penetration testing",
    "Employee background checks and security training",
    "Multi-factor authentication for all accounts",
    "Automated security monitoring 24/7",
    "Incident response plan with defined procedures",
    "Regular security updates and patch management"
  ];

  return (
    <div className="page-content">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-container fade-in">
            <div className="hero-content">
              <p className="eyebrow">Security First</p>
              <h1 className="hero-title">Your security is our priority</h1>
              <p className="hero-subtitle">
                PayLink employs enterprise-grade security measures to protect your data, transactions, and privacy.
                Built on blockchain technology with privacy-first principles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Overview */}
      <section className="security-overview-section section">
        <div className="container">
          <div className="security-overview-card card">
            <div className="security-overview-content">
              <Shield size={32} />
              <h2>Security at Every Layer</h2>
              <p>
                Security isn't just a feature—it's the foundation of PayLink. We implement multiple layers of protection
                to ensure your data and transactions are secure from the moment you sign up until your payments are complete.
              </p>
              <p>
                Our security approach combines cutting-edge technology with proven best practices, ensuring that
                your financial information remains private and your transactions are protected against threats.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="security-features-section section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Security Features</h2>
            <p>Comprehensive protection for your payments and data</p>
          </div>
          <div className="security-features-grid">
            {securityFeatures.map((feature, index) => (
              <div key={index} className="security-feature-card card">
                <div className="security-feature-header">
                  <div className="security-feature-icon">
                    {feature.icon}
                  </div>
                  <h3>{feature.title}</h3>
                </div>
                <p>{feature.description}</p>
                <div className="security-feature-details">
                  <small>{feature.details}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="compliance-section section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Compliance & Certifications</h2>
            <p>Meeting the highest industry standards</p>
          </div>
          <div className="compliance-grid">
            {complianceStandards.map((standard, index) => (
              <div key={index} className="compliance-card">
                <div className="compliance-status">
                  <CheckCircle size={20} />
                  <span>{standard.status}</span>
                </div>
                <h3>{standard.name}</h3>
                <p>{standard.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Practices */}
      <section className="practices-section section">
        <div className="container">
          <div className="practices-card card">
            <div className="practices-header">
              <Zap size={32} />
              <h2>Security Practices</h2>
            </div>
            <p>
              Our security practices go beyond technology. We maintain rigorous operational security procedures
              to ensure continuous protection of our platform and your data.
            </p>
            <div className="practices-list">
              {securityPractices.map((practice, index) => (
                <div key={index} className="practice-item">
                  <CheckCircle size={16} />
                  <span>{practice}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Incident Response */}
      <section className="incident-response-section section">
        <div className="container">
          <div className="incident-response-card card">
            <h2>Incident Response</h2>
            <p>
              In the unlikely event of a security incident, we have a comprehensive incident response plan
              designed to minimize impact and ensure rapid recovery. Our team is trained to respond quickly
              and transparently, keeping you informed throughout the process.
            </p>
            <div className="response-steps">
              <div className="response-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4>Detection</h4>
                  <p>Automated monitoring systems detect potential incidents 24/7</p>
                </div>
              </div>
              <div className="response-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4>Assessment</h4>
                  <p>Security team evaluates the incident scope and potential impact</p>
                </div>
              </div>
              <div className="response-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4>Response</h4>
                  <p>Implement containment measures and begin remediation</p>
                </div>
              </div>
              <div className="response-step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h4>Communication</h4>
                  <p>Notify affected users and provide regular updates</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Security */}
      <section className="contact-security-section section">
        <div className="container">
          <div className="contact-security-card card">
            <div className="contact-security-content">
              <h2>Report a Security Issue</h2>
              <p>
                If you discover a security vulnerability or have concerns about our security practices,
                please contact our security team immediately. We appreciate responsible disclosure and
                work quickly to address any issues.
              </p>
              <div className="contact-methods">
                <div className="contact-method">
                  <strong>Security Team:</strong> security@paylink.com
                </div>
                <div className="contact-method">
                  <strong>PGP Key:</strong> Available upon request
                </div>
                <div className="contact-method">
                  <strong>Bug Bounty:</strong> Up to $10,000 for critical vulnerabilities
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
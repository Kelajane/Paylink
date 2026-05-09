import { Shield, Eye, Lock, Users, Database, Cookie } from 'lucide-react';

export default function PrivacyPolicy() {
  const sections = [
    {
      icon: <Eye size={24} />,
      title: "Information We Collect",
      content: [
        "Personal information you provide (name, email, wallet addresses)",
        "Transaction data and payment information",
        "Usage data and analytics from our platform",
        "Device and browser information for security",
        "Communication records when you contact support"
      ]
    },
    {
      icon: <Lock size={24} />,
      title: "How We Use Your Information",
      content: [
        "Process payments and maintain your account",
        "Provide customer support and respond to inquiries",
        "Improve our services and develop new features",
        "Ensure platform security and prevent fraud",
        "Comply with legal obligations and regulations"
      ]
    },
    {
      icon: <Database size={24} />,
      title: "Data Storage & Security",
      content: [
        "All data is encrypted in transit and at rest",
        "Blockchain transactions are publicly visible by nature",
        "Personal data is stored securely in encrypted databases",
        "Regular security audits and compliance checks",
        "Data retention policies aligned with regulatory requirements"
      ]
    },
    {
      icon: <Users size={24} />,
      title: "Information Sharing",
      content: [
        "We do not sell your personal information to third parties",
        "Limited sharing with service providers for essential functions",
        "Legal compliance may require disclosure in specific cases",
        "Aggregated, anonymized data may be used for analytics",
        "You control sharing of your transaction data on blockchain"
      ]
    },
    {
      icon: <Cookie size={24} />,
      title: "Cookies & Tracking",
      content: [
        "Essential cookies for platform functionality",
        "Analytics cookies to improve user experience",
        "Preference cookies to remember your settings",
        "No tracking for advertising or marketing purposes",
        "Clear options to manage cookie preferences"
      ]
    }
  ];

  return (
    <div className="page-content">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-container fade-in">
            <div className="hero-content">
              <p className="eyebrow">Legal</p>
              <h1 className="hero-title">Privacy Policy</h1>
              <p className="hero-subtitle">
                Your privacy is important to us. This policy explains how we collect, use, and protect your information.
              </p>
              <div className="policy-meta">
                <span>Last updated: January 15, 2024</span>
                <span>Effective: January 1, 2024</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="overview-section section">
        <div className="container">
          <div className="overview-card card">
            <div className="overview-content">
              <Shield size={32} />
              <h2>Our Commitment to Privacy</h2>
              <p>
                PayLink is committed to protecting your privacy and being transparent about our data practices.
                We collect only the information necessary to provide our payment services and comply with applicable laws.
                Your financial data and personal information are secured using industry-standard encryption and security measures.
              </p>
              <p>
                As a blockchain-based payment platform, some transaction information is inherently public on the Solana network.
                However, we never share your personal details or link them to your public wallet addresses without your explicit consent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Sections */}
      <section className="privacy-sections section">
        <div className="container">
          <div className="privacy-grid">
            {sections.map((section, index) => (
              <div key={index} className="privacy-card card">
                <div className="privacy-header">
                  <div className="privacy-icon">
                    {section.icon}
                  </div>
                  <h3>{section.title}</h3>
                </div>
                <ul className="privacy-list">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Rights */}
      <section className="data-rights-section section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Your Data Rights</h2>
            <p>You have control over your personal information</p>
          </div>
          <div className="rights-grid">
            <div className="right-card">
              <h3>Access Your Data</h3>
              <p>Request a copy of all personal information we have about you.</p>
            </div>
            <div className="right-card">
              <h3>Correct Information</h3>
              <p>Update or correct any inaccurate personal information.</p>
            </div>
            <div className="right-card">
              <h3>Delete Your Data</h3>
              <p>Request deletion of your personal information (subject to legal requirements).</p>
            </div>
            <div className="right-card">
              <h3>Data Portability</h3>
              <p>Export your data in a structured, machine-readable format.</p>
            </div>
            <div className="right-card">
              <h3>Withdraw Consent</h3>
              <p>Opt-out of non-essential data processing at any time.</p>
            </div>
            <div className="right-card">
              <h3>Lodge a Complaint</h3>
              <p>Contact us if you have concerns about our data practices.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="contact-privacy-section section">
        <div className="container">
          <div className="contact-privacy-card card">
            <div className="contact-privacy-content">
              <h2>Questions About Privacy?</h2>
              <p>
                If you have any questions about this Privacy Policy or our data practices,
                please don't hesitate to contact our privacy team.
              </p>
              <div className="contact-methods">
                <div className="contact-method">
                  <strong>Email:</strong> privacy@paylink.com
                </div>
                <div className="contact-method">
                  <strong>Address:</strong> 123 Payment Street, Suite 456, New York, NY 10001
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Updates */}
      <section className="updates-section section">
        <div className="container">
          <div className="updates-card card">
            <h2>Policy Updates</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements.
              We will notify you of any material changes via email or through our platform.
              Your continued use of PayLink after any changes indicates your acceptance of the updated policy.
            </p>
            <p>
              We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
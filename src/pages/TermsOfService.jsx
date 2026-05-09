import { FileText, Scale, AlertTriangle, Users, CreditCard, Shield } from 'lucide-react';

export default function TermsOfService() {
  const sections = [
    {
      icon: <Users size={24} />,
      title: "Acceptance of Terms",
      content: "By accessing and using PayLink, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service."
    },
    {
      icon: <CreditCard size={24} />,
      title: "Payment Services",
      content: "PayLink provides payment link generation services for Solana blockchain transactions. We facilitate the creation of payment links but do not hold or process funds directly. All transactions occur on the Solana network."
    },
    {
      icon: <Shield size={24} />,
      title: "User Responsibilities",
      content: "Users are responsible for maintaining the security of their accounts, wallets, and API keys. You agree to provide accurate information and use the service in compliance with applicable laws and regulations."
    },
    {
      icon: <Scale size={24} />,
      title: "Service Availability",
      content: "While we strive for high availability, PayLink does not guarantee uninterrupted service. We reserve the right to modify or discontinue services with reasonable notice to maintain platform integrity."
    },
    {
      icon: <AlertTriangle size={24} />,
      title: "Prohibited Activities",
      content: "Users may not use PayLink for illegal activities, fraud, money laundering, or any transactions that violate applicable laws. We reserve the right to suspend accounts engaged in prohibited activities."
    }
  ];

  const paymentTerms = [
    "Transaction fees are deducted from payments as specified in your plan",
    "Refunds are processed according to our refund policy",
    "Payment links expire after 7 days by default",
    "Users are responsible for transaction fees on the Solana network",
    "All payments are final once confirmed on the blockchain"
  ];

  const liabilityTerms = [
    "PayLink is not liable for losses due to blockchain volatility",
    "We are not responsible for third-party wallet or exchange issues",
    "Service interruptions due to network issues are not covered",
    "Users assume responsibility for tax compliance",
    "Maximum liability is limited to fees paid in the preceding 3 months"
  ];

  return (
    <div className="page-content">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-container fade-in">
            <div className="hero-content">
              <p className="eyebrow">Legal</p>
              <h1 className="hero-title">Terms of Service</h1>
              <p className="hero-subtitle">
                These terms govern your use of PayLink services. Please read them carefully before using our platform.
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
              <FileText size={32} />
              <h2>Agreement Overview</h2>
              <p>
                These Terms of Service ("Terms") constitute a legally binding agreement between you and PayLink Inc.
                ("PayLink", "we", "us", or "our") governing your access to and use of our payment link generation services,
                website, and any related applications or services (collectively, the "Service").
              </p>
              <p>
                By using PayLink, you acknowledge that you have read, understood, and agree to be bound by these Terms.
                If you do not agree to these Terms, you must not access or use our Service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Terms */}
      <section className="terms-sections section">
        <div className="container">
          <div className="terms-grid">
            {sections.map((section, index) => (
              <div key={index} className="terms-card card">
                <div className="terms-header">
                  <div className="terms-icon">
                    {section.icon}
                  </div>
                  <h3>{section.title}</h3>
                </div>
                <p>{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Terms */}
      <section className="payment-terms-section section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Payment Terms</h2>
            <p>Understanding our payment processing and fees</p>
          </div>
          <div className="payment-terms-card card">
            <ul className="terms-list">
              {paymentTerms.map((term, index) => (
                <li key={index}>{term}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Liability */}
      <section className="liability-section section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Limitation of Liability</h2>
            <p>Understanding our liability and your responsibilities</p>
          </div>
          <div className="liability-card card">
            <ul className="terms-list">
              {liabilityTerms.map((term, index) => (
                <li key={index}>{term}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Termination */}
      <section className="termination-section section">
        <div className="container">
          <div className="termination-card card">
            <h2>Account Termination</h2>
            <p>
              Either party may terminate this agreement at any time. PayLink may suspend or terminate your account
              immediately for violations of these Terms, illegal activity, or at our discretion.
            </p>
            <p>
              Upon termination, your right to use the Service ceases immediately. We may delete your account data
              after a reasonable period, except as required by law or for legitimate business purposes.
            </p>
          </div>
        </div>
      </section>

      {/* Governing Law */}
      <section className="governing-law-section section">
        <div className="container">
          <div className="governing-law-card card">
            <h2>Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the State of Delaware,
              United States, without regard to its conflict of law provisions.
            </p>
            <p>
              Any disputes arising from these Terms or your use of the Service shall be resolved through binding
              arbitration in accordance with the rules of the American Arbitration Association.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="contact-terms-section section">
        <div className="container">
          <div className="contact-terms-card card">
            <div className="contact-terms-content">
              <h2>Questions About These Terms?</h2>
              <p>
                If you have any questions about these Terms of Service, please contact our legal team.
              </p>
              <div className="contact-methods">
                <div className="contact-method">
                  <strong>Email:</strong> legal@paylink.com
                </div>
                <div className="contact-method">
                  <strong>Address:</strong> 123 Payment Street, Suite 456, New York, NY 10001
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
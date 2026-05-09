import { Link } from 'react-router-dom';
import { HelpCircle, ArrowRight } from 'lucide-react';
import FAQAccordion from '../components/FAQAccordion.jsx';

const faqData = [
  // Payments Category
  {
    category: 'payments',
    question: "How do PayLinks work?",
    answer: "PayLinks create secure payment links that you can share with customers. They click the link, enter their payment details, and the transaction completes instantly on the Solana blockchain. No apps or accounts needed for payers."
  },
  {
    category: 'payments',
    question: "How fast are transactions?",
    answer: "Lightning fast! Most transactions confirm within 3-5 seconds on the Solana network. You'll receive instant notifications, and funds are available immediately in your wallet."
  },
  {
    category: 'payments',
    question: "Can I receive payments globally?",
    answer: "Yes! PayLink works worldwide. Since it's built on Solana, there are no geographic restrictions or currency conversion fees. Customers from any country can pay you instantly."
  },
  {
    category: 'payments',
    question: "What currencies are supported?",
    answer: "PayLink supports SOL and all Solana-compatible tokens. Customers can pay with any Solana wallet or through integrated payment partners that accept credit cards and other cryptocurrencies."
  },
  {
    category: 'payments',
    question: "Can I customize payment pages?",
    answer: "Absolutely! You can customize the payment page with your branding, logo, colors, and add custom messages. Pro plans include advanced customization options and white-label solutions."
  },

  // Security Category
  {
    category: 'security',
    question: "Are payments secure?",
    answer: "Absolutely. PayLink uses blockchain technology for immutable, fraud-proof transactions. Payments are processed on Solana's secure network with no chargebacks or intermediaries. Your funds go directly to your wallet."
  },
  {
    category: 'security',
    question: "How is my data protected?",
    answer: "We use end-to-end encryption and never store payment details. All transactions are recorded on the blockchain, ensuring complete transparency and security. We comply with industry security standards."
  },
  {
    category: 'security',
    question: "Is PayLink PCI compliant?",
    answer: "PayLink leverages blockchain security which provides superior protection compared to traditional PCI compliance. Since we don't store payment information, we eliminate common security vulnerabilities."
  },
  {
    category: 'security',
    question: "Can I reverse or refund payments?",
    answer: "Blockchain transactions are final and cannot be reversed. However, you can manually process refunds by sending funds back to customers. We recommend clear refund policies in your terms of service."
  },

  // Pricing Category
  {
    category: 'pricing',
    question: "Is there a free plan?",
    answer: "Yes! PayLink offers a generous free tier with up to 10 payment links per month and basic analytics. Upgrade to Pro for unlimited links, advanced reporting, and priority support."
  },
  {
    category: 'pricing',
    question: "What are the pricing plans?",
    answer: "Free: 10 links/month, basic features. Pro: $9/month - unlimited links, advanced analytics, custom branding. Enterprise: Custom pricing for high-volume businesses with dedicated support."
  },
  {
    category: 'pricing',
    question: "Are there setup fees?",
    answer: "No setup fees! PayLink is completely free to start. You only pay for premium features if you choose to upgrade. All you need is a Solana wallet address."
  },
  {
    category: 'pricing',
    question: "Can I change plans anytime?",
    answer: "Yes, you can upgrade, downgrade, or cancel your plan at any time. Changes take effect at the next billing cycle. No long-term contracts or hidden fees."
  },

  // Integrations Category
  {
    category: 'integrations',
    question: "Can businesses use PayLink?",
    answer: "Definitely! PayLink is perfect for businesses of all sizes. From freelancers to enterprise companies, our scalable solution handles everything from small invoices to high-volume transactions."
  },
  {
    category: 'integrations',
    question: "Does PayLink integrate with other tools?",
    answer: "Yes! PayLink integrates with popular tools like Zapier, Discord, Telegram, Notion, Slack, and Stripe. We're constantly adding new integrations based on user requests."
  },
  {
    category: 'integrations',
    question: "Is setup required?",
    answer: "Minimal setup! Just connect your Solana wallet and you're ready to create payment links. No complex integrations or development work required."
  },
  {
    category: 'integrations',
    question: "Can I use PayLink with my existing website?",
    answer: "Absolutely! You can embed PayLink buttons on your website, send payment links via email, or integrate our API for custom implementations. Works with any website or platform."
  },

  // Support Category
  {
    category: 'support',
    question: "Do I need crypto experience?",
    answer: "Not at all! PayLink is designed for everyone. You just need a Solana wallet address to receive payments. Customers can pay with any Solana-compatible wallet or even credit cards through our integrated partners."
  },
  {
    category: 'support',
    question: "How do I contact support?",
    answer: "You can reach our support team through the contact form, email us at support@paylink.com, or join our Discord community for real-time help. Pro and Enterprise customers get priority support."
  },
  {
    category: 'support',
    question: "Is there a mobile app?",
    answer: "Currently, PayLink works through web browsers on all devices. We're working on mobile apps, but the web experience is fully optimized for mobile use."
  },
  {
    category: 'support',
    question: "What if I need help getting started?",
    answer: "We have comprehensive documentation, video tutorials, and a helpful community. New users can schedule a free onboarding call with our success team."
  }
];

export default function FAQ() {
  return (
    <div className="page-content">
      {/* Hero Section */}
      <section className="faq-hero-section section">
        <div className="container">
          <div className="hero-content text-center">
            <div className="hero-icon">
              <HelpCircle size={64} />
            </div>
            <p className="eyebrow">Frequently Asked Questions</p>
            <h1>Frequently Asked Questions</h1>
            <p className="hero-subtitle">
              Everything you need to know about accepting crypto payments with PayLink.
              Can't find what you're looking for? <Link to="/contact">Contact our support team</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-main-section section">
        <div className="container">
          <FAQAccordion
            faqData={faqData}
            showSearch={true}
            showContactCTA={true}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="faq-cta-section section">
        <div className="container">
          <div className="cta-card card">
            <div className="cta-content">
              <h2>Ready to Start Accepting Payments?</h2>
              <p>Join thousands of creators and businesses already using PayLink</p>
              <div className="cta-actions">
                <Link to="/create" className="primary-button">
                  Create Your First PayLink
                  <ArrowRight size={16} />
                </Link>
                <Link to="/features" className="secondary-button">
                  View Features
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
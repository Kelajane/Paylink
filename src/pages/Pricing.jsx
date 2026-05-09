import { Link } from 'react-router-dom';
import { Sparkles, Shield, Globe, Users } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    description: 'Basic payment links for individuals and early creators.',
    features: ['Unlimited PayLink creation', 'Basic analytics dashboard', 'Email support', 'Limited transaction volume'],
    popular: false,
    buttonText: 'Current Plan',
    buttonAction: 'navigate',
    buttonPath: '/'
  },
  {
    name: 'Pro',
    price: '$29/mo',
    description: 'Advanced growth tools for founders and creators.',
    features: ['Unlimited links', 'Advanced analytics', 'Custom branding', 'Performance insights'],
    popular: true,
    buttonText: 'Upgrade to Pro',
    buttonAction: 'hover'
  },
  {
    name: 'Business',
    price: 'Custom',
    description: 'Enterprise-ready features for teams and agencies.',
    features: ['Priority support', 'Team management', 'API access (mock)', 'Dedicated onboarding'],
    popular: false,
    buttonText: 'Contact Sales Team',
    buttonAction: 'hover'
  }
];

export default function Pricing() {
  return (
    <div className="pricing-page container fade-in">
      <section className="pricing-hero section">
        <div className="pricing-copy">
          <p className="eyebrow">Pricing</p>
          <h1>Plans designed for creators, teams, and growing businesses</h1>
          <p className="subtext">Choose the plan that meets your needs—whether you’re just launching, scaling, or managing a distributed business.</p>
        </div>
      </section>

      <section className="pricing-grid section">
        {plans.map((plan) => (
          <article key={plan.name} className={`pricing-card card ${plan.popular ? 'popular' : ''}`}>
            {plan.popular && <div className="pricing-badge">Most popular</div>}
            <div className="plan-header">
              <h2>{plan.name}</h2>
              <p className="plan-price">{plan.price}</p>
            </div>
            <p className="plan-description">{plan.description}</p>
            <ul className="plan-features">
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            {plan.buttonAction === 'navigate' ? (
              <Link
                to={plan.buttonPath}
                className={`plan-button ${plan.popular ? 'primary-button filled' : 'ghost-button'}`}
              >
                {plan.buttonText}
              </Link>
            ) : (
              <button
                type="button"
                className={`plan-button ${plan.popular ? 'primary-button filled' : 'ghost-button'} hover-only`}
              >
                {plan.buttonText}
              </button>
            )}
          </article>
        ))}
      </section>

      <section className="pricing-details section">
        <div className="section-header text-center">
          <p className="eyebrow">Flexible billing</p>
          <h2>Everything you need to launch with confidence</h2>
          <p>PayLink keeps the experience simple with transparent pricing and clear plan benefits so your team can move faster.</p>
        </div>

        <div className="pricing-info-grid">
          <div className="info-card">
            <Sparkles size={28} />
            <h3>Simple setup</h3>
            <p>Get started with no backend, no integration, and zero friction required.</p>
          </div>
          <div className="info-card">
            <Shield size={28} />
            <h3>Secure by design</h3>
            <p>Every plan includes secure link delivery and encrypted transaction summaries.</p>
          </div>
          <div className="info-card">
            <Globe size={28} />
            <h3>Global accessibility</h3>
            <p>Accept payments anywhere with a modern checkout experience built for global customers.</p>
          </div>
          <div className="info-card">
            <Users size={28} />
            <h3>Creator-first support</h3>
            <p>We support founders and creators with product-first tools and thoughtful onboarding.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

import { useMemo } from 'react';
import { ArrowRight, Shield, Sparkles, Users } from 'lucide-react';
import { subscriptionPlans, getPlanByKey } from '../lib/subscriptions.js';

export default function UpgradeModal({ open, currentTier, onClose, onUpgrade, loading }) {
  const currentPlan = getPlanByKey(currentTier);

  const planCards = useMemo(
    () =>
      subscriptionPlans.map((plan) => {
        const isCurrent = plan.key === currentPlan.key;
        return (
          <article key={plan.key} className={`upgrade-plan-card ${isCurrent ? 'current-plan' : ''}`}>
            <div className="plan-badge-row">
              <div className="plan-icon">
                {plan.key === 'Starter' && <Sparkles size={20} />}
                {plan.key === 'Pro' && <Shield size={20} />}
                {plan.key === 'Business' && <Users size={20} />}
              </div>
              {plan.key === 'Pro' && <span className="plan-pill">Most popular</span>}
            </div>
            <h3>{plan.name}</h3>
            <p className="plan-price">{plan.priceLabel}</p>
            <p className="plan-description">{plan.description}</p>
            <ul className="plan-benefits">
              {plan.benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
            <button
              type="button"
              className={`primary-button upgrade-action ${isCurrent ? 'disabled' : ''}`}
              onClick={() => !isCurrent && onUpgrade(plan.key)}
              disabled={isCurrent || loading}
            >
              {isCurrent ? 'Current plan' : `Upgrade to ${plan.name}`}
              {!isCurrent && <ArrowRight size={18} />}
            </button>
          </article>
        );
      }),
    [currentPlan.key, loading, onUpgrade]
  );

  if (!open) {
    return null;
  }

  return (
    <div className="upgrade-modal-backdrop" role="dialog" aria-modal="true">
      <div className="upgrade-modal-content">
        <div className="upgrade-modal-header">
          <div>
            <p className="eyebrow">Subscription</p>
            <h2>Choose the right plan for your growth</h2>
            <p className="subtext">Upgrade to unlock premium PayLink features and priority support.</p>
          </div>
          <button type="button" className="ghost-button modal-close" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="upgrade-plans-grid">{planCards}</div>
      </div>
    </div>
  );
}

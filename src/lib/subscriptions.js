export const subscriptionPlans = [
  {
    key: 'Starter',
    name: 'Starter',
    priceLabel: 'Free',
    description: 'Basic payment link creation and dashboard access for new creators.',
    benefits: ['Unlimited PayLink creation', 'Basic analytics overview', 'Saved links', 'Email support'],
    level: 0,
  },
  {
    key: 'Pro',
    name: 'Pro',
    priceLabel: '$29/mo',
    description: 'Unlock advanced reporting, custom branding, and export tools.',
    benefits: ['Advanced analytics', 'Custom branding options', 'Export history', 'Priority email support'],
    level: 1,
  },
  {
    key: 'Business',
    name: 'Business',
    priceLabel: 'Custom',
    description: 'Enterprise-ready controls for teams, workflows, and priority assistance.',
    benefits: ['Team-ready workflows', 'Dedicated onboarding', 'API access', 'Priority support'],
    level: 2,
  },
];

export function getPlanByKey(key) {
  return subscriptionPlans.find((plan) => plan.key === key) || subscriptionPlans[0];
}

export function isProOrHigher(key) {
  return key === 'Pro' || key === 'Business';
}

export function isBusinessTier(key) {
  return key === 'Business';
}

export function normalizeTier(key) {
  if (!key) return 'Starter';
  const normalized = String(key).trim();
  if (subscriptionPlans.some((plan) => plan.key === normalized)) {
    return normalized;
  }
  return 'Starter';
}

import { useEffect, useState } from 'react';
import { ShieldCheck, Mail, User, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext.jsx';
import UpgradeModal from '../components/UpgradeModal.jsx';

export default function Settings() {
  const { user, profile, updateProfile, upgradeSubscription } = useAuth();
  const [fullName, setFullName] = useState(profile?.full_name || user?.user_metadata?.full_name || 'Member');
  const [company, setCompany] = useState(profile?.company_name || '');
  const [website, setWebsite] = useState(profile?.website_url || '');
  const [saving, setSaving] = useState(false);
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);
  const [planLoading, setPlanLoading] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [billingEmail, setBillingEmail] = useState('');
  const [apiKey, setApiKey] = useState('sk_live_************');

  useEffect(() => {
    setFullName(profile?.full_name || user?.user_metadata?.full_name || 'Member');
    setCompany(profile?.company_name || '');
    setWebsite(profile?.website_url || '');
    setBillingEmail(user?.email || '');
  }, [profile, user]);

  const email = user?.email || '—';
  const createdAt = user?.created_at ? new Date(user.created_at).toLocaleDateString() : null;
  const tier = profile?.subscription_tier || 'Starter';

  const openUpgradeModal = () => setIsUpgradeOpen(true);
  const closeUpgradeModal = () => setIsUpgradeOpen(false);

  const handlePlanUpgrade = async (selectedTier) => {
    setPlanLoading(true);
    try {
      await upgradeSubscription(selectedTier);
      toast.success(`Subscription updated to ${selectedTier}.`);
      closeUpgradeModal();
    } catch (error) {
      console.error(error);
      toast.error('Unable to update plan at this time.');
    } finally {
      setPlanLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      await updateProfile({
        fullName,
        companyName: company,
        websiteUrl: website,
      });
      toast.success('Profile updated successfully.');
    } catch (error) {
      console.error('Profile update failed', error);
      toast.error('Unable to save profile changes.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '72px' }}>
      <div className="settings-shell fade-in-up">
        <div className="settings-card">
          <div className="settings-header">
            <p className="eyebrow">Account settings</p>
            <h1>Profile and preferences</h1>
            <p className="subtext">Manage your PayLink account details and keep your profile information up to date.</p>
          </div>

          <div className="settings-grid">
            <section className="profile-panel">
              <div className="profile-preview">
                <div className="avatar-placeholder">{fullName.charAt(0).toUpperCase()}</div>
                <div>
                  <p className="label">Profile</p>
                  <h2>{fullName}</h2>
                </div>
              </div>

              <div className="profile-details">
                <div className="detail-row">
                  <span>Email</span>
                  <strong>{email}</strong>
                </div>
                {createdAt && (
                  <div className="detail-row">
                    <span>Member since</span>
                    <strong>{createdAt}</strong>
                  </div>
                )}
                <div className="detail-row">
                  <span>Company</span>
                  <strong>{company || 'Not set'}</strong>
                </div>
                <div className="detail-row">
                  <span>Website</span>
                  <strong>{website || 'Not set'}</strong>
                </div>
                <div className="detail-row subscription-row">
                  <span>Subscription tier</span>
                  <div className="subscription-summary">
                    <strong>{tier}</strong>
                    <button type="button" className="ghost-button small" onClick={openUpgradeModal}>
                      {tier === 'Starter' ? 'Upgrade' : 'Change plan'}
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <section className="preference-panel">
              <div className="panel-heading">
                <div className="panel-title">
                  <Sparkles size={24} />
                  <div>
                    <p className="label">Profile details</p>
                    <h2>Update your account</h2>
                  </div>
                </div>
                <p className="panel-copy">Save your profile information and improve your PayLink experience.</p>
              </div>

              <form className="profile-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <label>
                    <span>Full name</span>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(event) => setFullName(event.target.value)}
                      placeholder="Jane Doe"
                    />
                  </label>
                </div>

                <div className="form-row">
                  <label>
                    <span>Company</span>
                    <input
                      type="text"
                      value={company}
                      onChange={(event) => setCompany(event.target.value)}
                      placeholder="Acme Corp"
                    />
                  </label>
                </div>

                <div className="form-row">
                  <label>
                    <span>Website</span>
                    <input
                      type="url"
                      value={website}
                      onChange={(event) => setWebsite(event.target.value)}
                      placeholder="https://your-site.com"
                    />
                  </label>
                </div>

                <button className="primary-button form-action" type="submit" disabled={saving}>
                  {saving ? 'Saving…' : 'Save profile'}
                </button>
              </form>
            </section>

            <section className="preference-panel">
              <div className="panel-heading">
                <div className="panel-title">
                  <Mail size={24} />
                  <div>
                    <p className="label">Notifications</p>
                    <h2>Email preferences</h2>
                  </div>
                </div>
                <p className="panel-copy">Keep informed about payment activity, subscriptions, and security updates.</p>
              </div>

              <div className="notification-settings">
                <label className="toggle-row">
                  <span>Payment alerts</span>
                  <input
                    type="checkbox"
                    checked={notificationsEnabled}
                    onChange={() => setNotificationsEnabled((prev) => !prev)}
                  />
                </label>
                <div className="form-row">
                  <label>
                    <span>Billing email</span>
                    <input
                      type="email"
                      value={billingEmail}
                      onChange={(event) => setBillingEmail(event.target.value)}
                      placeholder="billing@company.com"
                    />
                  </label>
                </div>
                <button
                  className="secondary-button form-action"
                  type="button"
                  onClick={() => toast.success('Notification settings saved.')}
                >
                  Save notification settings
                </button>
              </div>
            </section>
          </div>

          <div className="security-panel">
            <div className="panel-heading">
              <div className="panel-title">
                <ShieldCheck size={24} />
                <div>
                  <p className="label">Security</p>
                  <h2>Authentication status</h2>
                </div>
              </div>
              <p className="panel-copy">Your account is protected with Supabase auth and secure session handling.</p>
            </div>

            <div className="security-list">
              <div className="security-item">
                <Mail size={20} />
                <div>
                  <p>Email</p>
                  <strong>{email}</strong>
                </div>
              </div>
              <div className="security-item">
                <User size={20} />
                <div>
                  <p>Member</p>
                  <strong>{fullName}</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="security-panel">
            <div className="panel-heading">
              <div className="panel-title">
                <Sparkles size={24} />
                <div>
                  <p className="label">Billing</p>
                  <h2>Plan overview</h2>
                </div>
              </div>
              <p className="panel-copy">Review your current package, billing contact, and API access details.</p>
            </div>

            <div className="billing-list">
              <div className="security-item">
                <span>Plan</span>
                <strong>{tier}</strong>
              </div>
              <div className="security-item">
                <span>Next payment</span>
                <strong>In 30 days</strong>
              </div>
              <div className="security-item">
                <span>Billing contact</span>
                <strong>{billingEmail || 'Not set'}</strong>
              </div>
              <div className="security-item">
                <span>API key</span>
                <strong className="break-word">{apiKey}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
      <UpgradeModal
        open={isUpgradeOpen}
        currentTier={tier}
        onClose={closeUpgradeModal}
        onUpgrade={handlePlanUpgrade}
        loading={planLoading}
      />
    </div>
  );
}

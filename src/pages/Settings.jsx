import { ShieldCheck, Mail, User, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Settings() {
  const { user } = useAuth();
  const fullName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Member';
  const email = user?.email || '—';
  const createdAt = user?.created_at ? new Date(user.created_at).toLocaleDateString() : null;

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '72px' }}>
      <div className="settings-shell fade-in-up">
        <div className="settings-card">
          <div className="settings-header">
            <p className="eyebrow">Account settings</p>
            <h1>Profile and preferences</h1>
            <p className="subtext">Manage your PayLink account details and review your profile with safe fintech defaults.</p>
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
              </div>
            </section>

            <section className="preference-panel">
              <div className="panel-heading">
                <div className="panel-title">
                  <Sparkles size={24} />
                  <div>
                    <p className="label">Preferences</p>
                    <h2>Platform defaults</h2>
                  </div>
                </div>
                <p className="panel-copy">These options are placeholders while core authentication is in place.</p>
              </div>

              <div className="preference-list">
                <div className="preference-item">
                  <div>
                    <p className="item-title">Email updates</p>
                    <p className="item-copy">Receive occasional product and security updates.</p>
                  </div>
                  <span className="status-badge active">Enabled</span>
                </div>

                <div className="preference-item">
                  <div>
                    <p className="item-title">Account protection</p>
                    <p className="item-copy">Your connection is secured with Supabase authentication.</p>
                  </div>
                  <span className="status-badge">Configured</span>
                </div>

                <div className="preference-item">
                  <div>
                    <p className="item-title">Support access</p>
                    <p className="item-copy">Reach out when you need help with your links or dashboard.</p>
                  </div>
                  <span className="status-badge">Ready</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

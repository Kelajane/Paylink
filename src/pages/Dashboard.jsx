import { useMemo } from 'react';
import { BarChart3, TrendingUp, DollarSign, Users, Calendar, Download, ArrowUpRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

const sampleTransactions = [
  { id: '5Jxabc123', amount: 0.5, label: 'Coffee', status: 'Completed', date: '2024-01-15', customer: 'Alice Johnson' },
  { id: '5Jxdef456', amount: 1.2, label: 'Subscription', status: 'Completed', date: '2024-01-14', customer: 'Bob Smith' },
  { id: '5Jxghi789', amount: 0.3, label: 'Snack', status: 'Completed', date: '2024-01-13', customer: 'Carol Davis' },
  { id: '5Jxklm012', amount: 2.0, label: 'Consulting', status: 'Completed', date: '2024-01-12', customer: 'David Wilson' },
  { id: '5Jxnop345', amount: 0.75, label: 'Design Work', status: 'Pending', date: '2024-01-11', customer: 'Eva Brown' }
];

export default function Dashboard() {
  const { profile, links, transactions, loading, profileLoading } = useAuth();
  const displayName = profile?.full_name || 'PayLink user';
  const tier = profile?.subscription_tier || 'Starter';
  const hasData = transactions.length > 0;

  const displayTransactions = useMemo(() => (hasData ? transactions : sampleTransactions), [hasData, transactions]);
  const totalReceived = useMemo(() => {
    const source = hasData ? transactions : sampleTransactions;
    return source
      .filter((tx) => tx.status === 'Completed')
      .reduce((sum, tx) => sum + Number(tx.amount), 0)
      .toFixed(2);
  }, [hasData, transactions]);

  const totalTransactions = displayTransactions.filter((tx) => tx.status === 'Completed').length;
  const pendingTransactions = displayTransactions.filter((tx) => tx.status === 'Pending').length;
  const avgTransaction = totalTransactions > 0 ? (Number(totalReceived) / totalTransactions).toFixed(2) : '0.00';

  const recentLinks = links.slice(0, 4);

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '60px' }}>
      <div className="dashboard-card card fade-in">
        <div className="card-heading">
          <div className="dashboard-topline">
            <p className="eyebrow">Dashboard</p>
            <span className="subscription-pill">{tier}</span>
          </div>
          <h1>Welcome back, {displayName}</h1>
          <p className="subtext">Your dashboard is personalized to your payment activity and saved PayLinks.</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card" style={{ '--stat-delay': '0s' }}>
            <div className="stat-icon">
              <DollarSign size={24} />
            </div>
            <span>Total Received</span>
            <strong>{totalReceived} SOL</strong>
            <small className="stat-change positive">
              <ArrowUpRight size={14} /> +12.5% from last month
            </small>
          </div>
          <div className="stat-card" style={{ '--stat-delay': '0.1s' }}>
            <div className="stat-icon">
              <BarChart3 size={24} />
            </div>
            <span>Transactions</span>
            <strong>{totalTransactions}</strong>
            <small className="stat-change positive">
              <ArrowUpRight size={14} /> +8.2% from last month
            </small>
          </div>
          <div className="stat-card" style={{ '--stat-delay': '0.2s' }}>
            <div className="stat-icon">
              <TrendingUp size={24} />
            </div>
            <span>Avg Transaction</span>
            <strong>{avgTransaction} SOL</strong>
            <small className="stat-change positive">
              <ArrowUpRight size={14} /> +5.1% from last month
            </small>
          </div>
          <div className="stat-card" style={{ '--stat-delay': '0.3s' }}>
            <div className="stat-icon">
              <Users size={24} />
            </div>
            <span>Saved PayLinks</span>
            <strong>{links.length}</strong>
            <small className="stat-change positive">
              <ArrowUpRight size={14} /> {links.length > 0 ? 'Updated recently' : 'Create a new link'}
            </small>
          </div>
        </div>

        <div className="chart-section">
          <div className="chart-header">
            <h3>Revenue Trend</h3>
            <div className="chart-controls">
              <select className="chart-select">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 3 months</option>
              </select>
            </div>
          </div>
          <div className="chart-container">
            <div className="mock-chart-full">
              <div className="chart-bars">
                <div className="chart-bar" style={{ height: '40%' }} />
                <div className="chart-bar" style={{ height: '60%' }} />
                <div className="chart-bar" style={{ height: '80%' }} />
                <div className="chart-bar" style={{ height: '50%' }} />
                <div className="chart-bar" style={{ height: '70%' }} />
                <div className="chart-bar" style={{ height: '90%' }} />
                <div className="chart-bar" style={{ height: '65%' }} />
              </div>
            </div>
          </div>
        </div>

        <div className="recent-panel">
          <div className="recent-header">
            <h2>Recent Transactions</h2>
            <div className="panel-actions">
              <button className="ghost-button small">
                <Download size={16} />
                Export
              </button>
              <select className="filter-select">
                <option>All</option>
                <option>Completed</option>
                <option>Pending</option>
              </select>
            </div>
          </div>

          <div className="table-card">
            <div className="table-head">
              <span>Transaction ID</span>
              <span>Customer</span>
              <span>Amount</span>
              <span>Status</span>
              <span>Date</span>
            </div>
            {(displayTransactions.length > 0) ? (
              <ul className="transaction-list">
                {displayTransactions.map((tx) => (
                  <li key={tx.id} className="transaction-item">
                    <span className="tx-id">{tx.id}</span>
                    <span className="tx-customer">{tx.customer || tx.label}</span>
                    <span className="tx-amount">{typeof tx.amount === 'number' ? `${tx.amount.toFixed(2)} SOL` : tx.amount}</span>
                    <span className={`status-pill ${tx.status.toLowerCase()}`}>{tx.status}</span>
                    <span className="tx-date">
                      <Calendar size={14} />
                      {new Date(tx.date).toLocaleDateString()}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="empty-state">
                <p>No transactions yet. Create your first PayLink to start receiving payments.</p>
              </div>
            )}
          </div>

          {pendingTransactions > 0 && (
            <div className="pending-notice">
              <p>You have {pendingTransactions} pending transaction{pendingTransactions > 1 ? 's' : ''} awaiting payment.</p>
            </div>
          )}
        </div>

        <div className="link-panel">
          <div className="recent-header">
            <h2>Your saved PayLinks</h2>
          </div>
          {links.length > 0 ? (
            <div className="table-card">
              <div className="table-head">
                <span>Wallet</span>
                <span>Amount</span>
                <span>Label</span>
                <span>Created</span>
              </div>
              <ul className="transaction-list">
                {links.map((link) => (
                  <li key={link.id} className="transaction-item">
                    <span className="tx-id">{link.wallet_address}</span>
                    <span className="tx-customer">{Number(link.amount).toFixed(2)} SOL</span>
                    <span className="tx-amount">{link.label}</span>
                    <span className="tx-date">{new Date(link.created_at).toLocaleDateString()}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="empty-state">
              <p>No saved PayLinks yet. Use the Create page to generate and persist a link for your account.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

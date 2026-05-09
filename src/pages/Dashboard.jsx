import { BarChart3, TrendingUp, DollarSign, Users, Calendar, Download, ArrowUpRight } from 'lucide-react';

const transactions = [
  { id: '5Jxabc123', amount: '0.50 SOL', label: 'Coffee', status: 'Completed', date: '2024-01-15', customer: 'Alice Johnson' },
  { id: '5Jxdef456', amount: '1.20 SOL', label: 'Subscription', status: 'Completed', date: '2024-01-14', customer: 'Bob Smith' },
  { id: '5Jxghi789', amount: '0.30 SOL', label: 'Snack', status: 'Completed', date: '2024-01-13', customer: 'Carol Davis' },
  { id: '5Jxklm012', amount: '2.00 SOL', label: 'Consulting', status: 'Completed', date: '2024-01-12', customer: 'David Wilson' },
  { id: '5Jxnop345', amount: '0.75 SOL', label: 'Design Work', status: 'Pending', date: '2024-01-11', customer: 'Eva Brown' }
];

export default function Dashboard() {
  const totalReceived = transactions
    .filter(tx => tx.status === 'Completed')
    .reduce((sum, tx) => sum + Number(tx.amount.replace(' SOL', '')), 0)
    .toFixed(2);

  const totalTransactions = transactions.filter(tx => tx.status === 'Completed').length;
  const pendingTransactions = transactions.filter(tx => tx.status === 'Pending').length;
  const avgTransaction = totalTransactions > 0 ? (parseFloat(totalReceived) / totalTransactions).toFixed(2) : '0.00';

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '60px' }}>
      <div className="dashboard-card card fade-in">
        <div className="card-heading">
          <p className="eyebrow">Dashboard</p>
          <h1>Payment Analytics</h1>
          <p className="subtext">Track your revenue, monitor transactions, and grow your business with real-time insights.</p>
        </div>

        {/* Stats Grid */}
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
            <span>Unique Customers</span>
            <strong>{transactions.length}</strong>
            <small className="stat-change positive">
              <ArrowUpRight size={14} /> +15.3% from last month
            </small>
          </div>
        </div>

        {/* Chart Placeholder */}
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
                <div className="chart-bar" style={{height: '40%'}}></div>
                <div className="chart-bar" style={{height: '60%'}}></div>
                <div className="chart-bar" style={{height: '80%'}}></div>
                <div className="chart-bar" style={{height: '50%'}}></div>
                <div className="chart-bar" style={{height: '70%'}}></div>
                <div className="chart-bar" style={{height: '90%'}}></div>
                <div className="chart-bar" style={{height: '65%'}}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
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
            {transactions.length > 0 ? (
              <ul className="transaction-list">
                {transactions.map((tx) => (
                  <li key={tx.id} className="transaction-item">
                    <span className="tx-id">{tx.id}</span>
                    <span className="tx-customer">{tx.customer}</span>
                    <span className="tx-amount">{tx.amount}</span>
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
      </div>
    </div>
  );
}

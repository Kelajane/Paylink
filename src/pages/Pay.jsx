import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Clock, Download, Shield } from 'lucide-react';

function formatDate(value) {
  return new Date(value).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short'
  });
}

export default function Pay() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const amount = params.get('amount') || '0.00';
  const label = params.get('label') || 'Payment receipt';
  const wallet = params.get('wallet') || 'Not provided';
  const note = params.get('note') || 'No note included';
  const txId = params.get('txId') || 'PAY-00000000';
  const createdAt = params.get('createdAt') || new Date().toISOString();
  const receiptDate = formatDate(createdAt);

  const handleDownloadReceipt = () => {
    const receiptText = `PayLink Receipt\n\nLabel: ${label}\nAmount: ${amount} SOL\nWallet: ${wallet}\nTransaction ID: ${txId}\nDate: ${receiptDate}\nStatus: Completed\nNote: ${note}`;
    const blob = new Blob([receiptText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'paylink-receipt.txt';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="receipt-page container fade-in">
      <div className="receipt-topbar">
        <button className="ghost-button back-button" onClick={() => navigate(-1)} type="button">
          <ArrowLeft size={18} /> Back
        </button>
      </div>

      <div className="receipt-grid">
        <main className="receipt-card card">
          <div className="receipt-header">
            <div>
              <p className="eyebrow">Receipt</p>
              <h1>Payment receipt</h1>
            </div>
            <div className="receipt-status">
              <CheckCircle2 size={20} />
              Completed
            </div>
          </div>

          <div className="receipt-summary">
            <div className="receipt-value">
              <span>Amount paid</span>
              <strong>{amount} SOL</strong>
            </div>
            <div className="receipt-detail">
              <span>Label</span>
              <strong>{label}</strong>
            </div>
            <div className="receipt-detail">
              <span>Wallet address</span>
              <strong className="break-word">{wallet}</strong>
            </div>
            <div className="receipt-detail">
              <span>Transaction ID</span>
              <strong>{txId}</strong>
            </div>
            <div className="receipt-detail">
              <span>Date</span>
              <strong>{receiptDate}</strong>
            </div>
            <div className="receipt-detail">
              <span>Note</span>
              <strong>{note}</strong>
            </div>
          </div>

          <div className="receipt-meta">
            <div className="meta-item">
              <Shield size={18} />
              <span>Secure link delivery with encrypted payment details.</span>
            </div>
            <div className="meta-item">
              <Clock size={18} />
              <span>Instant receipt generation for fast reconciliation.</span>
            </div>
          </div>

          <div className="receipt-actions">
            <button className="primary-button" type="button" onClick={handleDownloadReceipt}>
              <Download size={18} /> Download receipt
            </button>
            <button className="secondary-button" type="button" onClick={() => navigate('/')}>
              Return home
            </button>
          </div>
        </main>

        <aside className="receipt-sidebar card">
          <div className="sidebar-panel">
            <p className="eyebrow">Payment status</p>
            <div className="timeline-list">
              {[
                { label: 'Link created', active: true },
                { label: 'Payment shared', active: true },
                { label: 'Payment completed', active: true }
              ].map((item) => (
                <div key={item.label} className={`timeline-item ${item.active ? 'active' : ''}`}>
                  <span className="timeline-dot" />
                  <p>{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="sidebar-panel">
            <p className="eyebrow">Next steps</p>
            <p className="sidebar-copy">Share the receipt, archive the payment, or create a new PayLink with one click.</p>
            <button className="ghost-button full-width" type="button" onClick={() => navigate('/create')}>
              Create another payment
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

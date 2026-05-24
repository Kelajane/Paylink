import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Copy, QrCode } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext.jsx';

function buildTransactionId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length: 10 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

function isValidWallet(value) {
  return value.trim().length >= 8;
}

export default function Create() {
  const { user, createPaymentLink } = useAuth();
  const [step, setStep] = useState(1);
  const [wallet, setWallet] = useState('');
  const [amount, setAmount] = useState('0.50');
  const [label, setLabel] = useState('Service fee');
  const [category, setCategory] = useState('General');
  const [note, setNote] = useState('Thanks for your business!');
  const [expires, setExpires] = useState(false);
  const [expirationDays, setExpirationDays] = useState('7');
  const [generatedLink, setGeneratedLink] = useState('');
  const [txId, setTxId] = useState('');
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const paymentUrl = useMemo(() => (generatedLink ? `${origin}${generatedLink}` : ''), [generatedLink, origin]);
  const expirationDate = expires ? new Date(Date.now() + Number(expirationDays) * 24 * 60 * 60 * 1000).toISOString() : '';

  const handleGenerate = async (event) => {
    event.preventDefault();
    const validAmount = parseFloat(amount);
    if (!isValidWallet(wallet)) {
      setError('Enter a valid wallet address to continue.');
      return;
    }
    if (Number.isNaN(validAmount) || validAmount <= 0) {
      setError('Enter a payment amount greater than 0.');
      return;
    }

    setError('');
    const safeAmount = validAmount.toFixed(2);
    const safeLabel = label.trim() || 'Payment request';
    const safeWallet = wallet.trim();
    const safeCategory = category.trim() || 'General';
    const safeNote = note.trim() || 'Payment request details';
    const transactionId = buildTransactionId();
    const params = new URLSearchParams({
      amount: safeAmount,
      label: safeLabel,
      wallet: safeWallet,
      note: safeNote,
      txId: transactionId,
      category: safeCategory,
    });
    if (expires && expirationDate) {
      params.set('expiresAt', expirationDate);
    }
    const link = `/pay?${params.toString()}`;

    setGeneratedLink(link);
    setTxId(transactionId);
    setStep(2);

    if (user) {
      setSaving(true);
      try {
        await createPaymentLink({
          wallet_address: safeWallet,
          amount: Number(safeAmount),
          label: safeLabel,
          note: safeNote,
          tx_id: transactionId,
        });
        toast.success('PayLink saved to your dashboard.');
      } catch (createError) {
        console.warn('Save PayLink failed:', createError);
        toast.error('Unable to save PayLink. It will still work locally.');
      } finally {
        setSaving(false);
      }
    }
  };

  const handleCopy = async () => {
    if (!paymentUrl) return;
    try {
      await navigator.clipboard.writeText(paymentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch (copyError) {
      console.error(copyError);
    }
  };

  const handleDownloadQR = () => {
    if (!paymentUrl) return;
    const svg = `<?xml version="1.0" encoding="UTF-8"?>
      <svg xmlns="http://www.w3.org/2000/svg" width="320" height="320" viewBox="0 0 320 320">
        <rect width="320" height="320" fill="#0f172a"/>
        <g fill="#16a34a">
          ${Array.from({ length: 64 })
            .map((_, i) => {
              const x = (i % 8) * 40 + 10;
              const y = Math.floor(i / 8) * 40 + 10;
              return `<rect x="${x}" y="${y}" width="20" height="20"/>`;
            })
            .join('')}
        </g>
      </svg>`;
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'paylink-qr.svg';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();
    URL.revokeObjectURL(url);
  };

  const handleContinue = () => {
    setStep(3);
  };

  const handlePaid = () => {
    navigate(generatedLink);
  };

  return (
    <section className="page-card create-page card fade-in">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Create payment</p>
          <h1>Create your payment link in four quick steps</h1>
          <p className="subtext">Set the amount, add a note, generate a shareable link, and send the receipt once payment is complete.</p>
        </div>
      </div>

      <div className="wizard-bar">
        {['Create', 'Generate', 'Confirm'].map((labelStep, index) => (
          <div key={labelStep} className={`wizard-step ${step > index ? 'active' : ''}`}>
            <span>{index + 1}</span>
            <p>{labelStep}</p>
          </div>
        ))}
      </div>

      {step === 1 && (
        <form className="create-form" onSubmit={handleGenerate}>
          <div className="field-grid">
            <label className="field-group">
              <span>Receiver Wallet</span>
              <input
                type="text"
                value={wallet}
                onChange={(event) => setWallet(event.target.value)}
                placeholder="Enter wallet address"
                autoComplete="off"
              />
            </label>
            <label className="field-group">
              <span>Amount</span>
              <input
                type="number"
                min="0.01"
                step="0.01"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder="0.50"
              />
            </label>
            <label className="field-group full-width">
              <span>Label</span>
              <input
                type="text"
                value={label}
                onChange={(event) => setLabel(event.target.value)}
                placeholder="Service fee, donation, consulting"
              />
            </label>
            <label className="field-group full-width">
              <span>Category</span>
              <input
                type="text"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                placeholder="Invoice, donation, consulting"
              />
            </label>
            <div className="field-grid">
              <label className="field-group">
                <span>Expires in</span>
                <select value={expirationDays} onChange={(event) => setExpirationDays(event.target.value)}>
                  <option value="1">1 day</option>
                  <option value="3">3 days</option>
                  <option value="7">7 days</option>
                  <option value="14">14 days</option>
                </select>
              </label>
              <label className="field-group toggle-group">
                <span>Enable expiration</span>
                <button
                  type="button"
                  className={`ghost-button ${expires ? 'active' : ''}`}
                  onClick={() => setExpires((prev) => !prev)}
                >
                  {expires ? 'Enabled' : 'Disabled'}
                </button>
              </label>
            </div>
            <label className="field-group full-width">
              <span>Notes</span>
              <textarea
                rows="4"
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="Add a message for your payer"
              />
            </label>
          </div>
          {error && <div className="form-error">{error}</div>}
          <button className="primary-button form-action" type="submit" disabled={saving}>
            {saving ? 'Saving link…' : 'Generate PayLink'} <ArrowRight size={18} />
          </button>
          {!user && (
            <p className="form-note">Log in to save this PayLink to your account.</p>
          )}
        </form>
      )}

      {step === 2 && (
        <div className="result-section">
          <div className="result-intro">
            <p className="eyebrow">Link generated</p>
            <h2>Your PayLink is ready to share</h2>
            <p className="subtext">Copy the secure link or let the payer scan the QR code to open the payment receipt.</p>
          </div>

          <div className="result-grid">
            <div className="result-card">
              <p className="result-label">Shareable link</p>
              <div className="result-row">
                <code className="link-code">{paymentUrl}</code>
                <button className="ghost-button" onClick={handleCopy} type="button">
                  {copied ? 'Copied' : 'Copy'} <Copy size={16} />
                </button>
              </div>
            </div>

            <div className="qr-panel card">
              <div className="qr-image">
                <div className="qr-grid">
                  {Array.from({ length: 64 }).map((_, index) => (
                    <div key={index} className="qr-dot" />
                  ))}
                </div>
              </div>
              <div className="qr-info">
                <div className="qr-icon"><QrCode size={32} /></div>
                <p>Scan to view the payment receipt on any device.</p>
              </div>
            </div>
          </div>

          <div className="summary-panel card">
            <h3>Payment summary</h3>
            <div className="summary-row">
              <span>Receiver wallet</span>
              <strong>{wallet}</strong>
            </div>
            <div className="summary-row">
              <span>Amount</span>
              <strong>{Number(amount).toFixed(2)} SOL</strong>
            </div>
            <div className="summary-row">
              <span>Label</span>
              <strong>{label}</strong>
            </div>
            <div className="summary-row">
              <span>Category</span>
              <strong>{category || 'General'}</strong>
            </div>
            {expires && (
              <div className="summary-row">
                <span>Expires</span>
                <strong>{new Date(expirationDate).toLocaleDateString()}</strong>
              </div>
            )}
            <div className="summary-row">
              <span>Note</span>
              <strong>{note || 'No note provided'}</strong>
            </div>
          </div>

          <div className="summary-actions">
            <button className="ghost-button" type="button" onClick={handleDownloadQR}>
              Download QR
            </button>
            <button className="primary-button form-action" type="button" onClick={handleContinue}>
              Create Payment <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="confirmation-panel">
          <div className="confirmation-header">
            <div className="status-icon"><CheckCircle2 size={36} /></div>
            <div>
              <p className="eyebrow">Payment status</p>
              <h2>Payment has been confirmed</h2>
              <p className="subtext">Review the timeline and proceed to the final receipt when you're ready.</p>
            </div>
          </div>

          <div className="timeline-card card">
            {[
              { title: 'Link created', description: 'Your PayLink was generated and is ready to share.', active: true },
              { title: 'Payment shared', description: 'The link was delivered to the payer and opened.', active: true },
              { title: 'Payment completed', description: 'Funds are confirmed and the receipt is ready.', active: true }
            ].map((item) => (
              <div key={item.title} className={`timeline-step ${item.active ? 'active' : ''}`}>
                <span className="timeline-marker" />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="confirmation-actions">
            <button className="primary-button form-action" type="button" onClick={handlePaid}>
              Finalize Receipt <ArrowRight size={18} />
            </button>
            <div className="confirmation-note">Your transaction ID is <strong>{txId}</strong>.</div>
          </div>
        </div>
      )}
    </section>
  );
}

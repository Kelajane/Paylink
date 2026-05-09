import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Copy, Link as LinkIcon, QrCode } from 'lucide-react';

function buildTransactionId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length: 10 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

function isValidWallet(value) {
  return value.trim().length >= 8;
}

export default function Create() {
  const [step, setStep] = useState(1);
  const [wallet, setWallet] = useState('');
  const [amount, setAmount] = useState('0.50');
  const [label, setLabel] = useState('Service fee');
  const [note, setNote] = useState('Thanks for your business!');
  const [generatedLink, setGeneratedLink] = useState('');
  const [txId, setTxId] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const paymentUrl = useMemo(() => (generatedLink ? `${origin}${generatedLink}` : ''), [generatedLink, origin]);

  const handleGenerate = (event) => {
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
    const link = `/pay?amount=${encodeURIComponent(safeAmount)}&label=${encodeURIComponent(safeLabel)}&wallet=${encodeURIComponent(safeWallet)}&note=${encodeURIComponent(note.trim())}&txId=${encodeURIComponent(buildTransactionId())}`;
    setGeneratedLink(link);
    setTxId(link.split('txId=')[1] || buildTransactionId());
    setStep(2);
  };

  const handleCopy = async () => {
    if (!paymentUrl) return;
    try {
      await navigator.clipboard.writeText(paymentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch (error) {
      console.error(error);
    }
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
          <button className="primary-button form-action" type="submit">
            Generate PayLink <ArrowRight size={18} />
          </button>
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
              <span>Note</span>
              <strong>{note || 'No note provided'}</strong>
            </div>
          </div>

          <button className="primary-button form-action" type="button" onClick={handleContinue}>
            Create Payment <ArrowRight size={18} />
          </button>
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

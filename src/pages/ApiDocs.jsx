import { useState } from 'react';
import { Code, Zap, Shield, ArrowRight, Copy, Play, CheckCircle } from 'lucide-react';

export default function ApiDocs() {
  const [selectedEndpoint, setSelectedEndpoint] = useState('create-link');

  const endpoints = [
    {
      id: 'create-link',
      method: 'POST',
      path: '/v1/links',
      title: 'Create Payment Link',
      description: 'Generate a new payment link with custom amount and details'
    },
    {
      id: 'get-link',
      method: 'GET',
      path: '/v1/links/{id}',
      title: 'Get Link Details',
      description: 'Retrieve information about a specific payment link'
    },
    {
      id: 'list-payments',
      method: 'GET',
      path: '/v1/payments',
      title: 'List Payments',
      description: 'Get a list of all payments with filtering and pagination'
    },
    {
      id: 'webhook-config',
      method: 'POST',
      path: '/v1/webhooks',
      title: 'Configure Webhook',
      description: 'Set up webhook endpoints for payment notifications'
    }
  ];

  const selectedEndpointData = endpoints.find(ep => ep.id === selectedEndpoint);

  const exampleRequest = {
    'create-link': {
      method: 'POST',
      url: 'https://api.paylink.com/v1/links',
      headers: {
        'Authorization': 'Bearer sk_live_...',
        'Content-Type': 'application/json'
      },
      body: `{
  "amount": 25.00,
  "currency": "USD",
  "description": "Consulting services",
  "customer_email": "client@example.com",
  "success_url": "https://yoursite.com/success",
  "cancel_url": "https://yoursite.com/cancel"
}`
    },
    'get-link': {
      method: 'GET',
      url: 'https://api.paylink.com/v1/links/pl_abc123',
      headers: {
        'Authorization': 'Bearer sk_live_...'
      }
    },
    'list-payments': {
      method: 'GET',
      url: 'https://api.paylink.com/v1/payments?limit=10&status=completed',
      headers: {
        'Authorization': 'Bearer sk_live_...'
      }
    },
    'webhook-config': {
      method: 'POST',
      url: 'https://api.paylink.com/v1/webhooks',
      headers: {
        'Authorization': 'Bearer sk_live_...',
        'Content-Type': 'application/json'
      },
      body: `{
  "url": "https://yoursite.com/webhooks/paylink",
  "events": ["payment.succeeded", "payment.failed"],
  "secret": "whsec_your_webhook_secret"
}`
    }
  };

  const exampleResponse = {
    'create-link': `{
  "id": "pl_abc123def456",
  "url": "https://pay.paylink.com/pl_abc123def456",
  "amount": 25.00,
  "currency": "USD",
  "description": "Consulting services",
  "status": "active",
  "created_at": "2024-01-15T10:30:00Z",
  "expires_at": "2024-01-22T10:30:00Z"
}`,
    'get-link': `{
  "id": "pl_abc123def456",
  "url": "https://pay.paylink.com/pl_abc123def456",
  "amount": 25.00,
  "currency": "USD",
  "description": "Consulting services",
  "status": "active",
  "payments": [
    {
      "id": "pay_xyz789",
      "amount": 25.00,
      "status": "completed",
      "customer_wallet": "7xKXtg2CW99i...JhQ",
      "tx_hash": "5LxKXtg2CW99i...JhQ",
      "completed_at": "2024-01-15T11:45:00Z"
    }
  ],
  "created_at": "2024-01-15T10:30:00Z"
}`,
    'list-payments': `{
  "data": [
    {
      "id": "pay_xyz789",
      "link_id": "pl_abc123",
      "amount": 25.00,
      "currency": "USD",
      "status": "completed",
      "customer_wallet": "7xKXtg2CW99i...JhQ",
      "tx_hash": "5LxKXtg2CW99i...JhQ",
      "created_at": "2024-01-15T10:30:00Z",
      "completed_at": "2024-01-15T11:45:00Z"
    }
  ],
  "pagination": {
    "has_more": false,
    "total_count": 1
  }
}`,
    'webhook-config': `{
  "id": "wh_abc123",
  "url": "https://yoursite.com/webhooks/paylink",
  "events": ["payment.succeeded", "payment.failed"],
  "status": "active",
  "created_at": "2024-01-15T10:30:00Z"
}`
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="page-content">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-container fade-in">
            <div className="hero-content">
              <p className="eyebrow">API Reference</p>
              <h1 className="hero-title">Integrate PayLink into your application</h1>
              <p className="hero-subtitle">
                Complete API documentation with examples, authentication, and webhook guides.
              </p>
              <div className="hero-ctas">
                <a href="#endpoints" className="primary-button">
                  Browse Endpoints <ArrowRight size={18} />
                </a>
                <button className="secondary-button">
                  <Play size={16} />
                  Get API Key
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* API Overview */}
      <section className="api-overview-section section">
        <div className="container">
          <div className="api-overview-grid">
            <div className="api-info-card">
              <div className="api-info-header">
                <Code size={32} />
                <h2>Getting Started</h2>
              </div>
              <div className="api-info-content">
                <div className="api-feature">
                  <Shield size={20} />
                  <div>
                    <strong>Authentication</strong>
                    <p>Use API keys for secure access</p>
                  </div>
                </div>
                <div className="api-feature">
                  <Zap size={20} />
                  <div>
                    <strong>Real-time</strong>
                    <p>Instant payment confirmations</p>
                  </div>
                </div>
                <div className="api-feature">
                  <CheckCircle size={20} />
                  <div>
                    <strong>Reliable</strong>
                    <p>99.9% uptime guarantee</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="api-quick-start">
              <h3>Quick Start</h3>
              <div className="code-block">
                <div className="code-header">
                  <span>Install SDK</span>
                  <button onClick={() => copyToClipboard('npm install @paylink/sdk')} className="copy-button">
                    <Copy size={14} />
                  </button>
                </div>
                <pre><code>npm install @paylink/sdk</code></pre>
              </div>
              <div className="code-block">
                <div className="code-header">
                  <span>Initialize</span>
                  <button onClick={() => copyToClipboard("import { PayLink } from '@paylink/sdk';\n\nconst paylink = new PayLink({\n  apiKey: 'sk_live_...'\n});")} className="copy-button">
                    <Copy size={14} />
                  </button>
                </div>
                <pre><code>{`import { PayLink } from '@paylink/sdk';

const paylink = new PayLink({
  apiKey: 'sk_live_...'
});`}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Endpoints */}
      <section id="endpoints" className="endpoints-section section">
        <div className="container">
          <div className="endpoints-container">
            <div className="endpoints-sidebar">
              <h3>Endpoints</h3>
              <div className="endpoints-list">
                {endpoints.map((endpoint) => (
                  <button
                    key={endpoint.id}
                    className={`endpoint-item ${selectedEndpoint === endpoint.id ? 'active' : ''}`}
                    onClick={() => setSelectedEndpoint(endpoint.id)}
                  >
                    <span className={`method ${endpoint.method.toLowerCase()}`}>
                      {endpoint.method}
                    </span>
                    <span className="endpoint-path">{endpoint.path}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="endpoint-details">
              {selectedEndpointData && (
                <>
                  <div className="endpoint-header">
                    <span className={`method ${selectedEndpointData.method.toLowerCase()}`}>
                      {selectedEndpointData.method}
                    </span>
                    <h2>{selectedEndpointData.title}</h2>
                    <p>{selectedEndpointData.description}</p>
                  </div>

                  <div className="endpoint-content">
                    <div className="request-section">
                      <h3>Request</h3>
                      <div className="code-block">
                        <div className="code-header">
                          <span>Example Request</span>
                          <button onClick={() => copyToClipboard(JSON.stringify(exampleRequest[selectedEndpoint], null, 2))} className="copy-button">
                            <Copy size={14} />
                          </button>
                        </div>
                        <pre><code>{JSON.stringify(exampleRequest[selectedEndpoint], null, 2)}</code></pre>
                      </div>
                    </div>

                    <div className="response-section">
                      <h3>Response</h3>
                      <div className="code-block">
                        <div className="code-header">
                          <span>Example Response</span>
                          <button onClick={() => copyToClipboard(exampleResponse[selectedEndpoint])} className="copy-button">
                            <Copy size={14} />
                          </button>
                        </div>
                        <pre><code>{exampleResponse[selectedEndpoint]}</code></pre>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
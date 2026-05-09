import { Link } from 'react-router-dom';
import { Book, Code, Zap, Shield, ArrowRight, Play, FileText, Settings, CreditCard } from 'lucide-react';

export default function Documentation() {
  const gettingStarted = [
    {
      icon: <Zap size={24} />,
      title: "Quick Start Guide",
      description: "Get up and running in under 5 minutes",
      time: "5 min read"
    },
    {
      icon: <CreditCard size={24} />,
      title: "Creating Your First PayLink",
      description: "Step-by-step guide to generate payment links",
      time: "3 min read"
    },
    {
      icon: <Settings size={24} />,
      title: "Account Setup",
      description: "Configure your wallet and preferences",
      time: "4 min read"
    }
  ];

  const integrationGuides = [
    {
      title: "Web Integration",
      description: "Add PayLink to your website or web application",
      difficulty: "Beginner",
      code: `// Initialize PayLink
const paylink = new PayLink({
  apiKey: 'your-api-key',
  wallet: 'your-solana-wallet'
});

// Create payment link
const link = await paylink.create({
  amount: 10.00,
  currency: 'USD',
  description: 'Service payment'
});`
    },
    {
      title: "API Integration",
      description: "Build custom integrations with our REST API",
      difficulty: "Advanced",
      code: `curl -X POST https://api.paylink.com/v1/links \\
  -H "Authorization: Bearer your-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 25.00,
    "description": "Consulting services"
  }'`
    },
    {
      title: "Mobile SDK",
      description: "Integrate PayLink into mobile applications",
      difficulty: "Intermediate",
      code: `import { PayLinkSDK } from '@paylink/mobile-sdk';

const sdk = new PayLinkSDK({
  apiKey: 'your-api-key'
});

const payment = await sdk.createPayment({
  amount: 15.99,
  description: 'Mobile app purchase'
});`
    }
  ];

  const apiEndpoints = [
    { method: "POST", path: "/v1/links", description: "Create payment link" },
    { method: "GET", path: "/v1/links/{id}", description: "Get link details" },
    { method: "GET", path: "/v1/payments", description: "List payments" },
    { method: "GET", path: "/v1/webhooks", description: "Manage webhooks" }
  ];

  return (
    <div className="page-content">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-container fade-in">
            <div className="hero-content">
              <p className="eyebrow">Developer Documentation</p>
              <h1 className="hero-title">Build with PayLink</h1>
              <p className="hero-subtitle">
                Comprehensive guides, API references, and integration examples to help you build amazing payment experiences.
              </p>
              <div className="hero-ctas">
                <Link to="/api-docs" className="primary-button">
                  API Reference <ArrowRight size={18} />
                </Link>
                <a href="#getting-started" className="secondary-button">
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section id="getting-started" className="getting-started-section section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Getting Started</h2>
            <p>Everything you need to start accepting payments</p>
          </div>
          <div className="getting-started-grid">
            {gettingStarted.map((guide, index) => (
              <div key={index} className="getting-started-card">
                <div className="getting-started-icon">
                  {guide.icon}
                </div>
                <h3>{guide.title}</h3>
                <p>{guide.description}</p>
                <div className="guide-meta">
                  <span className="read-time">{guide.time}</span>
                  <ArrowRight size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Guides */}
      <section className="integration-section section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Integration Guides</h2>
            <p>Step-by-step tutorials for different platforms</p>
          </div>
          <div className="integration-grid">
            {integrationGuides.map((guide, index) => (
              <div key={index} className="integration-card">
                <div className="integration-header">
                  <h3>{guide.title}</h3>
                  <span className={`difficulty ${guide.difficulty.toLowerCase()}`}>
                    {guide.difficulty}
                  </span>
                </div>
                <p>{guide.description}</p>
                <div className="code-preview">
                  <pre><code>{guide.code}</code></pre>
                </div>
                <button className="ghost-button">
                  Read Full Guide <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API Overview */}
      <section className="api-overview-section section">
        <div className="container">
          <div className="api-overview-container">
            <div className="api-overview-content">
              <div className="api-header">
                <Code size={32} />
                <h2>API Overview</h2>
              </div>
              <p>
                Our REST API provides programmatic access to all PayLink features.
                Create payment links, track payments, and manage webhooks with simple HTTP requests.
              </p>
              <div className="api-features">
                <div className="api-feature">
                  <Shield size={20} />
                  <span>Secure & Encrypted</span>
                </div>
                <div className="api-feature">
                  <Zap size={20} />
                  <span>Real-time Updates</span>
                </div>
                <div className="api-feature">
                  <Book size={20} />
                  <span>Comprehensive Docs</span>
                </div>
              </div>
              <Link to="/api-docs" className="primary-button">
                View Full API Reference <ArrowRight size={18} />
              </Link>
            </div>
            <div className="api-endpoints">
              <h3>Popular Endpoints</h3>
              <div className="endpoints-list">
                {apiEndpoints.map((endpoint, index) => (
                  <div key={index} className="endpoint-item">
                    <span className={`method ${endpoint.method.toLowerCase()}`}>
                      {endpoint.method}
                    </span>
                    <code>{endpoint.path}</code>
                    <span className="endpoint-desc">{endpoint.description}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="resources-section section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Additional Resources</h2>
            <p>More ways to learn and get help</p>
          </div>
          <div className="resources-grid">
            <div className="resource-card">
              <div className="resource-icon">
                <Play size={32} />
              </div>
              <h3>Video Tutorials</h3>
              <p>Watch step-by-step video guides for common integrations and use cases.</p>
              <button className="ghost-button">Watch Videos</button>
            </div>
            <div className="resource-card">
              <div className="resource-icon">
                <FileText size={32} />
              </div>
              <h3>SDK Libraries</h3>
              <p>Official SDKs for JavaScript, Python, PHP, and mobile platforms.</p>
              <button className="ghost-button">Download SDKs</button>
            </div>
            <div className="resource-card">
              <div className="resource-icon">
                <Book size={32} />
              </div>
              <h3>Community Forum</h3>
              <p>Get help from our community of developers and share your integrations.</p>
              <button className="ghost-button">Join Community</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
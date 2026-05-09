import { useState } from 'react';
import { Search, HelpCircle, CreditCard, Shield, Zap, Users, ChevronRight, MessageSquare, Phone, Mail } from 'lucide-react';

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Topics', icon: <HelpCircle size={20} />, count: 24 },
    { id: 'getting-started', name: 'Getting Started', icon: <Zap size={20} />, count: 6 },
    { id: 'payments', name: 'Payments', icon: <CreditCard size={20} />, count: 8 },
    { id: 'security', name: 'Security', icon: <Shield size={20} />, count: 5 },
    { id: 'account', name: 'Account', icon: <Users size={20} />, count: 5 }
  ];

  const articles = [
    {
      id: 1,
      title: "How do I create my first PayLink?",
      category: "getting-started",
      excerpt: "Learn how to generate your first payment link in under 2 minutes.",
      readTime: "2 min read",
      popular: true
    },
    {
      id: 2,
      title: "Setting up your Solana wallet",
      category: "getting-started",
      excerpt: "Connect your wallet to start receiving payments securely.",
      readTime: "3 min read",
      popular: true
    },
    {
      id: 3,
      title: "Understanding payment statuses",
      category: "payments",
      excerpt: "What do 'Pending', 'Completed', and 'Failed' mean?",
      readTime: "1 min read",
      popular: true
    },
    {
      id: 4,
      title: "How do refunds work?",
      category: "payments",
      excerpt: "Learn about our refund policy and how to process refunds.",
      readTime: "4 min read",
      popular: false
    },
    {
      id: 5,
      title: "Two-factor authentication setup",
      category: "security",
      excerpt: "Add an extra layer of security to your PayLink account.",
      readTime: "2 min read",
      popular: false
    },
    {
      id: 6,
      title: "API rate limits and quotas",
      category: "account",
      excerpt: "Understanding your API usage limits and how to upgrade.",
      readTime: "3 min read",
      popular: false
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const contactOptions = [
    {
      icon: <MessageSquare size={24} />,
      title: "Live Chat",
      description: "Chat with our support team",
      availability: "Available now",
      action: "Start Chat"
    },
    {
      icon: <Mail size={24} />,
      title: "Email Support",
      description: "Send us a detailed message",
      availability: "24-48 hour response",
      action: "Send Email"
    },
    {
      icon: <Phone size={24} />,
      title: "Phone Support",
      description: "Speak with an expert",
      availability: "Mon-Fri, 9AM-6PM EST",
      action: "Call Now"
    }
  ];

  return (
    <div className="page-content">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-container fade-in">
            <div className="hero-content">
              <p className="eyebrow">Help Center</p>
              <h1 className="hero-title">How can we help you?</h1>
              <p className="hero-subtitle">
                Find answers to common questions, browse our knowledge base, or get in touch with our support team.
              </p>
              <div className="search-container">
                <div className="search-input-wrapper">
                  <Search size={20} />
                  <input
                    type="text"
                    placeholder="Search for help..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section section">
        <div className="container">
          <div className="categories-grid">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-card ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className="category-icon">
                  {category.icon}
                </div>
                <div className="category-info">
                  <h3>{category.name}</h3>
                  <span>{category.count} articles</span>
                </div>
                <ChevronRight size={16} />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="articles-section section">
        <div className="container">
          <div className="articles-header">
            <h2>
              {selectedCategory === 'all' ? 'All Articles' :
               categories.find(cat => cat.id === selectedCategory)?.name}
            </h2>
            <span>{filteredArticles.length} articles</span>
          </div>
          <div className="articles-grid">
            {filteredArticles.map((article) => (
              <div key={article.id} className="article-card">
                <div className="article-content">
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                  <div className="article-meta">
                    <span className="read-time">{article.readTime}</span>
                    {article.popular && <span className="popular-badge">Popular</span>}
                  </div>
                </div>
                <ChevronRight size={16} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="contact-support-section section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Still need help?</h2>
            <p>Our support team is here to assist you</p>
          </div>
          <div className="contact-options-grid">
            {contactOptions.map((option, index) => (
              <div key={index} className="contact-option-card">
                <div className="contact-option-icon">
                  {option.icon}
                </div>
                <h3>{option.title}</h3>
                <p>{option.description}</p>
                <div className="availability">
                  {option.availability}
                </div>
                <button className="primary-button">
                  {option.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="faq-preview-section section">
        <div className="container">
          <div className="faq-preview-card card">
            <div className="faq-preview-content">
              <HelpCircle size={32} />
              <h2>Check out our FAQ</h2>
              <p>Find quick answers to the most common questions about PayLink.</p>
              <a href="/#faq" className="primary-button">
                View FAQ <ChevronRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
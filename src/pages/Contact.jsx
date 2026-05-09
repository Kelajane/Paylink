import { useState } from 'react';
import { Mail, MessageSquare, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send the form data
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactMethods = [
    {
      icon: <Mail size={24} />,
      title: "Email Support",
      description: "Get help with your account, payments, or technical issues",
      contact: "support@paylink.com",
      response: "Within 24 hours"
    },
    {
      icon: <MessageSquare size={24} />,
      title: "Live Chat",
      description: "Chat with our support team for instant assistance",
      contact: "Available 9 AM - 6 PM EST",
      response: "Instant"
    },
    {
      icon: <Phone size={24} />,
      title: "Phone Support",
      description: "Speak directly with our customer success team",
      contact: "+1 (555) 123-PAYLINK",
      response: "Mon-Fri, 9 AM - 6 PM EST"
    }
  ];

  const offices = [
    {
      city: "New York",
      address: "123 Payment Street, Suite 456\nNew York, NY 10001",
      phone: "+1 (555) 123-4567"
    },
    {
      city: "San Francisco",
      address: "789 Crypto Avenue, Floor 12\nSan Francisco, CA 94105",
      phone: "+1 (555) 987-6543"
    },
    {
      city: "London",
      address: "456 Blockchain Road\nLondon, EC2A 1PQ\nUnited Kingdom",
      phone: "+44 20 7946 0123"
    }
  ];

  return (
    <div className="page-content">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-container fade-in">
            <div className="hero-content">
              <p className="eyebrow">Get in Touch</p>
              <h1 className="hero-title">We're here to help</h1>
              <p className="hero-subtitle">
                Have a question about PayLink? Need help with your account? Our team is ready to assist you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="contact-methods-section section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Contact Us</h2>
            <p>Choose the best way to reach our team</p>
          </div>
          <div className="contact-methods-grid">
            {contactMethods.map((method, index) => (
              <div key={index} className="contact-method-card">
                <div className="contact-method-icon">
                  {method.icon}
                </div>
                <h3>{method.title}</h3>
                <p>{method.description}</p>
                <div className="contact-info">
                  <strong>{method.contact}</strong>
                  <small>Response time: {method.response}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="contact-form-section section">
        <div className="container">
          <div className="contact-form-container">
            <div className="contact-form-content">
              <h2>Send us a message</h2>
              <p>Fill out the form below and we'll get back to you as soon as possible.</p>

              {submitted ? (
                <div className="success-message">
                  <CheckCircle size={48} />
                  <h3>Message Sent!</h3>
                  <p>Thank you for contacting us. We'll respond within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="inquiryType">Inquiry Type</label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                    >
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="business">Business Partnership</option>
                      <option value="billing">Billing Question</option>
                      <option value="press">Press/Media</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="6"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help you..."
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="primary-button form-submit">
                    Send Message <Send size={18} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Offices */}
      <section className="offices-section section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Our Offices</h2>
            <p>Visit us in person or connect with our global team</p>
          </div>
          <div className="offices-grid">
            {offices.map((office, index) => (
              <div key={index} className="office-card">
                <div className="office-header">
                  <MapPin size={24} />
                  <h3>{office.city}</h3>
                </div>
                <address className="office-address">
                  {office.address.split('\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < office.address.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </address>
                <div className="office-contact">
                  <Phone size={16} />
                  <span>{office.phone}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
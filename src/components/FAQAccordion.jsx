import { useState } from 'react';
import { ChevronDown, ChevronUp, Search, MessageCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQAccordion = ({ faqData, showSearch = false, showContactCTA = false }) => {
  const [openFaq, setOpenFaq] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Filter FAQs based on search and category
  const filteredFaqs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = ['all', ...new Set(faqData.map(faq => faq.category))];

  return (
    <div className="faq-section-wrapper">
      {showSearch && (
        <div className="faq-controls">
          <div className="search-container">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="faq-search-input"
            />
          </div>
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category}
                className={`category-filter ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="faq-container">
        {filteredFaqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <button
              className="faq-question"
              onClick={() => toggleFaq(index)}
              aria-expanded={openFaq === index}
            >
              <span>{faq.question}</span>
              {openFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            <div className={`faq-answer ${openFaq === index ? 'open' : ''}`}>
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>

      {showContactCTA && (
        <div className="faq-contact-cta">
          <div className="cta-content">
            <MessageCircle size={48} />
            <h3>Still have questions?</h3>
            <p>Our support team is here to help you get the most out of PayLink.</p>
            <Link to="/contact" className="primary-button">
              Contact Support
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQAccordion;
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Create from './pages/Create.jsx';
import Pay from './pages/Pay.jsx';
import Dashboard from './pages/Dashboard.jsx';
import About from './pages/About.jsx';
import Pricing from './pages/Pricing.jsx';

// Product Pages
import Features from './pages/Features.jsx';

// Company Pages
import Careers from './pages/Careers.jsx';
import Contact from './pages/Contact.jsx';

// Resources Pages
import Documentation from './pages/Documentation.jsx';
import HelpCenter from './pages/HelpCenter.jsx';
import ApiDocs from './pages/ApiDocs.jsx';
import FAQ from './pages/FAQ.jsx';

// Legal Pages
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import TermsOfService from './pages/TermsOfService.jsx';
import Security from './pages/Security.jsx';

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />

          {/* Product Pages */}
          <Route path="/features" element={<Features />} />

          {/* Company Pages */}
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />

          {/* Resources Pages */}
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/api-docs" element={<ApiDocs />} />
          <Route path="/faq" element={<FAQ />} />

          {/* Legal Pages */}
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/security" element={<Security />} />

          <Route path="/pay" element={<Pay />} />
        </Routes>
      </main>
    </div>
  );
}

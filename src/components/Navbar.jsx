import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    closeMenu();
  };

  const initials = user
    ? user.user_metadata?.full_name
      ? user.user_metadata.full_name
          .split(' ')
          .map((segment) => segment[0])
          .join('')
          .slice(0, 2)
          .toUpperCase()
      : user.email?.charAt(0).toUpperCase() || 'U'
    : '';

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') closeMenu();
    };
    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="site-header">
        <div className="nav-inner">
          <NavLink to="/" className="brand" onClick={closeMenu}>
            ⚡ PayLink
          </NavLink>

          <nav className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              onClick={closeMenu}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              onClick={closeMenu}
            >
              About
            </NavLink>
            <NavLink
              to="/create"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              onClick={closeMenu}
            >
              Create
            </NavLink>
            <NavLink
              to="/pricing"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              onClick={closeMenu}
            >
              Pricing
            </NavLink>
            {user ? (
              <>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                  onClick={closeMenu}
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/settings"
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                  onClick={closeMenu}
                >
                  Settings
                </NavLink>
                <button type="button" className="nav-link logout-link" onClick={handleLogout}>
                  Logout
                </button>
                <div className="user-pill" onClick={closeMenu}>
                  {initials}
                </div>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                  onClick={closeMenu}
                >
                  Login
                </NavLink>
                <NavLink to="/signup" className="button-link desktop-cta" onClick={closeMenu}>
                  Get Started
                </NavLink>
              </>
            )}
          </nav>

          <button
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>
      {isMobileMenuOpen && <div className="mobile-menu-backdrop" onClick={closeMenu} />}
    </>
  );
}

import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../../store/hooks';
import LanguageToggle from '../../../../shared/components/LanguageToggle/LanguageToggle';

function Navbar() {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const isUser = isAuthenticated && user?.role === 'user';
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: t('nav_home'), path: '/' },
    { name: t('nav_explore'), path: '/explore' },
  ];

  if (isUser) {
    navLinks.push({ name: t('nav_favorites'), path: '/favorites' });
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/60 backdrop-blur-md transition-all duration-300 px-6">
      <div className="container mx-auto flex items-center justify-between h-16">

        {/* Logo - fixed width to prevent shifting */}
        <Link
          to="/"
          className="text-3xl font-extrabold tracking-tighter text-gray-900 flex items-center gap-1 hover:opacity-80 transition flex-shrink-0"
        >
          <span className="text-[var(--color-adminMainColor)]">Stay</span>
          cation.
        </Link>

      

        {/* Right side - fixed width to prevent shifting */}
        <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-semibold text-[15px] transition-colors duration-300 whitespace-nowrap ${isActive(link.path)
                  ? 'text-[var(--color-adminMainColor)]'
                  : 'text-gray-500 hover:text-gray-900'
                }`}
            >
              {link.name}
            </Link>
          ))}
          <LanguageToggle variant="pill" />

          {isAuthenticated ? (
            <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
              <div className="w-8 h-8 rounded-full bg-[var(--color-adminMainColor)] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span className="font-semibold text-gray-700 text-sm whitespace-nowrap">
                {user?.name || 'User'}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/register"
                className="bg-[var(--color-adminMainColor)] text-white px-5 py-2 rounded-full font-bold shadow-md hover:shadow-lg hover:bg-blue-700 transition-all text-sm whitespace-nowrap"
              >
                {t('nav_signUp')}
              </Link>
              <Link
                to="/login"
                className="text-black px-5 py-2 rounded-full font-bold hover:bg-gray-100 transition-all text-sm whitespace-nowrap"
              >
                {t('nav_logIn')}
              </Link>
            </div>
          )}
        </div>

        {/* Mobile: Language toggle + Menu button */}
        <div className="md:hidden flex items-center gap-3 flex-shrink-0">
          <LanguageToggle variant="pill" />
          <button
            className="text-gray-600 text-2xl p-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-6 flex flex-col gap-4 shadow-lg absolute w-full left-0 top-full">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`font-semibold text-lg ${isActive(link.path)
                  ? 'text-[var(--color-adminMainColor)]'
                  : 'text-gray-600'
                }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="h-px w-full bg-gray-100 my-2"></div>
          {isAuthenticated ? (
            <div className="font-semibold text-gray-700 text-lg">
              {t('nav_hello')}, {user?.name || 'User'}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-semibold text-gray-600 text-lg"
              >
                {t('nav_logIn')}
              </Link>
              <Link
                to="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-[var(--color-adminMainColor)] text-white text-center py-3 rounded-xl font-bold"
              >
                {t('nav_signUp')}
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;

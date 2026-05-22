import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../../store/hooks';

function Navbar() {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const isUser = isAuthenticated && user?.role === 'user';
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore', path: '/explore' },
  ];

  if (isUser) {
    navLinks.push({ name: 'Favorites', path: '/favorites' });
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/60  transition-all duration-300 px-6 ">
      <div className="container mx-auto  flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold tracking-tighter text-gray-900 flex items-center gap-1 hover:opacity-80 transition"
        >
          <span className="text-[var(--color-adminMainColor)]">Stay</span>
          cation.
        </Link>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-10">
          {/* Desktop Links */}
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-semibold text-[15px] transition-colors duration-300 ${
                  isActive(link.path)
                    ? 'text-[var(--color-adminMainColor)]'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Right Side */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
                <div className="w-8 h-8 rounded-full bg-[var(--color-adminMainColor)] text-white flex items-center justify-center font-bold text-sm">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <span className="font-semibold text-gray-700 text-sm">
                  {user?.name || 'User'}
                </span>
              </div>
            ) : (
              <>
                <Link
                  to="/register"
                  className="bg-[var(--color-adminMainColor)] text-white px-6 py-2.5 rounded-full font-bold shadow-md hover:shadow-lg hover:bg-blue-700 transition-all"
                >
                  Sign up
                </Link>
                <Link
                  to="/login"
                  className=" text-black px-6 py-2.5 rounded-full font-bold shadow-md hover:shadow-lg hover:bg-blue-700 transition-all"
                >
                  Log in
                </Link>

              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-600 text-2xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-6 flex flex-col gap-4 shadow-lg absolute w-full left-0 top-full">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`font-semibold text-lg ${
                isActive(link.path)
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
              Hello, {user?.name || 'User'}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-semibold text-gray-600 text-lg"
              >
                Log in
              </Link>
              <Link
                to="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-[var(--color-adminMainColor)] text-white text-center py-3 rounded-xl font-bold"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;

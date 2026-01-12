import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useEffect, useState } from 'react';

export function PublicLayout() {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/how-it-works', label: 'How It Works' },
    { path: '/case-studies', label: 'Case Studies' },
    { path: '/about', label: 'About' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md border-b border-zinc-200 shadow-sm' : 'bg-white/80 backdrop-blur-sm border-b border-zinc-200/50'
      }`}>
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-sm">RT</span>
              </div>
              <span className="text-xl font-bold text-brand-dark">Randhawa & Tomar Digital</span>
            </Link>
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive(item.path)
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-4">
              {isAuthenticated() ? (
                <Link to="/app" className="text-sm font-medium text-zinc-700 hover:text-zinc-900 transition-colors">
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/login" className="hidden md:block text-sm font-medium text-zinc-700 hover:text-zinc-900 transition-colors">
                    Login
                  </Link>
                  <Link to="/contact">
                    <button className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                      Get Started
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="transition-opacity duration-300">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-zinc-50 border-t border-zinc-200 mt-24">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">RT</span>
                </div>
                <span className="text-lg font-bold text-zinc-900">Randhawa & Tomar Digital</span>
              </div>
              <p className="text-body-sm text-zinc-600">Websites. Systems. Growth.</p>
            </div>
            <div>
              <h3 className="text-body-sm font-semibold text-zinc-900 mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-body-sm text-zinc-600 hover:text-zinc-900 transition-colors">About</Link></li>
                <li><Link to="/services" className="text-body-sm text-zinc-600 hover:text-zinc-900 transition-colors">Services</Link></li>
                <li><Link to="/case-studies" className="text-body-sm text-zinc-600 hover:text-zinc-900 transition-colors">Case Studies</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-body-sm font-semibold text-zinc-900 mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link to="/how-it-works" className="text-body-sm text-zinc-600 hover:text-zinc-900 transition-colors">How It Works</Link></li>
                <li><Link to="/pricing" className="text-body-sm text-zinc-600 hover:text-zinc-900 transition-colors">Pricing</Link></li>
                <li><Link to="/contact" className="text-body-sm text-zinc-600 hover:text-zinc-900 transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-body-sm font-semibold text-zinc-900 mb-4">Contact</h3>
              <p className="text-body-sm text-zinc-600 mb-2">support@rt.digital</p>
              <p className="text-body-sm text-zinc-600">+1 (234) 567-8900</p>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-zinc-200 text-center text-body-sm text-zinc-600">
            © 2024 Randhawa & Tomar Digital. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

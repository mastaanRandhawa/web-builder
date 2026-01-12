import { Outlet, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export function PublicLayout() {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-zinc-200">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">RT</span>
              </div>
              <span className="text-xl font-bold text-zinc-900">Randhawa & Tomar Digital</span>
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-sm font-medium text-zinc-700 hover:text-zinc-900 transition-colors">
                Home
              </Link>
              <Link to="/pricing" className="text-sm font-medium text-zinc-700 hover:text-zinc-900 transition-colors">
                Pricing
              </Link>
              {isAuthenticated() ? (
                <Link to="/app" className="text-sm font-medium text-zinc-700 hover:text-zinc-900 transition-colors">
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/login" className="text-sm font-medium text-zinc-700 hover:text-zinc-900 transition-colors">
                    Login
                  </Link>
                  <Link to="/signup">
                    <button className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors">
                      Get Started
                    </button>
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-zinc-50 border-t border-zinc-200 mt-24">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">RT</span>
                </div>
                <span className="text-lg font-bold text-zinc-900">Randhawa & Tomar Digital</span>
              </div>
              <p className="text-sm text-zinc-600">Websites. Systems. Growth.</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-zinc-900 mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-sm text-zinc-600 hover:text-zinc-900">About</Link></li>
                <li><Link to="/pricing" className="text-sm text-zinc-600 hover:text-zinc-900">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-zinc-900 mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link to="/login" className="text-sm text-zinc-600 hover:text-zinc-900">Login</Link></li>
                <li><Link to="/signup" className="text-sm text-zinc-600 hover:text-zinc-900">Sign Up</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-zinc-900 mb-4">Contact</h3>
              <p className="text-sm text-zinc-600">support@rt.digital</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-zinc-200 text-center text-sm text-zinc-600">
            © 2024 Randhawa & Tomar Digital. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}


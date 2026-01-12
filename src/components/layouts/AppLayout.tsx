import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { UserRole } from '../../types';
import { LogOut, LayoutDashboard, Globe, Users, CheckSquare, Receipt } from 'lucide-react';

export function AppLayout() {
  const { user, logout, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated() || !user) {
    return null;
  }

  const isAdmin = user.role === UserRole.ADMIN;

  const clientNavItems = [
    { path: '/app/client', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/app/client/websites', label: 'Websites', icon: Globe },
  ];

  const adminNavItems = [
    { path: '/app/admin', label: 'Overview', icon: LayoutDashboard },
    { path: '/app/admin/clients', label: 'Clients', icon: Users },
    { path: '/app/admin/requests', label: 'Requests', icon: CheckSquare },
    { path: '/app/admin/invoices', label: 'Invoices', icon: Receipt },
  ];

  const navItems = isAdmin ? adminNavItems : clientNavItems;

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Top Bar */}
      <header className="bg-white border-b border-zinc-200 sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Link to="/app" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">RT</span>
                </div>
                <span className="text-lg font-bold text-zinc-900">Randhawa & Tomar Digital</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <span className="text-sm text-zinc-700">{user.name}</span>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  isAdmin ? 'bg-blue-100 text-blue-800' : 'bg-zinc-100 text-zinc-800'
                }`}>
                  {isAdmin ? 'Admin' : 'Client'}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-zinc-200 min-h-[calc(100vh-4rem)]">
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || 
                (item.path !== '/app/client' && item.path !== '/app/admin' && location.pathname.startsWith(item.path));
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}


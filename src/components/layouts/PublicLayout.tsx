import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "../ui/Button";
import { MobileMenu } from "../ui/MobileMenu";
import { Container } from "../ui/Container";

export function PublicLayout() {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Update scrolled state for styling
      setScrolled(currentScrollY > 20);

      // Show/hide navbar based on scroll direction
      if (currentScrollY < 10) {
        // Always show at the top
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down - hide navbar
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show navbar
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { path: "/", label: "HOME" },
    { path: "/services", label: "SERVICES" },
    { path: "/how-it-works", label: "HOW IT WORKS" },
    { path: "/case-studies", label: "TESTIMONIALS" },
    { path: "/about", label: "ABOUT" },
    { path: "/pricing", label: "PRICING" },
    { path: "/contact", label: "CONTACT" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Sticky Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-zinc-200 shadow-sm"
            : "bg-white/80 backdrop-blur-sm border-b border-zinc-200/50"
        } ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
      >
        <Container>
          <div className="flex justify-between items-center h-16 md:h-20">
            <Link
              to="/"
              className="flex items-center gap-2 group flex-shrink-0"
            >
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-sm">RT</span>
              </div>
              <span className="text-lg md:text-xl font-bold text-brand-dark font-heading">
                Randhawa & Tomar Digital
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive(item.path)
                      ? "text-primary-600 bg-primary-50"
                      : "text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
              {isAuthenticated() ? (
                <Link to="/app">
                  <Button variant="outline" size="sm">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost" size="sm">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/pricing">
                    <Button size="sm">View Pricing</Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 hover:bg-zinc-100 rounded-lg transition-colors flex-shrink-0"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6 text-zinc-700" />
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={navItems}
      />

      <main className="overflow-x-hidden pt-16 md:pt-20">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-brand-light border-t border-zinc-200 mt-24 overflow-x-hidden">
        <Container>
          <div className="py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">RT</span>
                  </div>
                  <span className="text-lg font-bold text-brand-dark">
                    Randhawa & Tomar Digital
                  </span>
                </div>
                <p className="text-body-sm text-zinc-600">
                  Monthly website management for local businesses.
                </p>
              </div>
              <div>
                <h3 className="text-body-sm font-semibold text-zinc-900 mb-4">
                  Company
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/about"
                      className="text-body-sm text-zinc-600 hover:text-zinc-900 transition-colors"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/services"
                      className="text-body-sm text-zinc-600 hover:text-zinc-900 transition-colors"
                    >
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/case-studies"
                      className="text-body-sm text-zinc-600 hover:text-zinc-900 transition-colors"
                    >
                      Case Studies
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-body-sm font-semibold text-zinc-900 mb-4">
                  Resources
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/how-it-works"
                      className="text-body-sm text-zinc-600 hover:text-zinc-900 transition-colors"
                    >
                      How It Works
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/pricing"
                      className="text-body-sm text-zinc-600 hover:text-zinc-900 transition-colors"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className="text-body-sm text-zinc-600 hover:text-zinc-900 transition-colors"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-body-sm font-semibold text-zinc-900 mb-4">
                  Contact
                </h3>
                <p className="text-body-sm text-zinc-600 mb-2">
                  support@rt.digital
                </p>
                <p className="text-body-sm text-zinc-600">+1 (234) 567-8900</p>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-zinc-200 text-center text-body-sm text-zinc-600">
              © 2024 Randhawa & Tomar Digital. All rights reserved.
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}

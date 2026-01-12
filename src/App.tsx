import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PublicLayout } from "./components/layouts/PublicLayout";
import { AppLayout } from "./components/layouts/AppLayout";
import { UserRole } from "./types";

// Public pages
import { Landing } from "./pages/Landing";
import { Pricing } from "./pages/Pricing";
import { Services } from "./pages/Services";
import { HowItWorks } from "./pages/HowItWorks";
import { CaseStudies } from "./pages/CaseStudies";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { NotFound } from "./pages/NotFound";

// Client pages
import { ClientDashboard } from "./pages/client/Dashboard";
import { WebsiteDetail } from "./pages/client/WebsiteDetail";

// Admin pages
import { AdminDashboard } from "./pages/admin/Dashboard";
import { ClientsList } from "./pages/admin/ClientsList";
import { ClientDetail } from "./pages/admin/ClientDetail";
import { RequestsQueue } from "./pages/admin/RequestsQueue";
import { Invoices } from "./pages/admin/Invoices";

function App() {
  const { checkAuth, isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/services" element={<Services />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/login"
            element={
              isAuthenticated() ? <Navigate to="/app" replace /> : <Login />
            }
          />
          <Route
            path="/signup"
            element={
              isAuthenticated() ? <Navigate to="/app" replace /> : <Signup />
            }
          />
        </Route>

        {/* App routes - requires auth */}
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          {/* Redirect based on role */}
          <Route
            index
            element={
              user?.role === UserRole.ADMIN ? (
                <Navigate to="/app/admin" replace />
              ) : (
                <Navigate to="/app/client" replace />
              )
            }
          />

          {/* Client routes */}
          <Route path="client">
            <Route index element={<ClientDashboard />} />
            <Route path="websites/:websiteId" element={<WebsiteDetail />} />
          </Route>

          {/* Admin routes */}
          <Route
            path="admin"
            element={
              <ProtectedRoute requireRole={UserRole.ADMIN}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/clients"
            element={
              <ProtectedRoute requireRole={UserRole.ADMIN}>
                <ClientsList />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/clients/:clientId"
            element={
              <ProtectedRoute requireRole={UserRole.ADMIN}>
                <ClientDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/requests"
            element={
              <ProtectedRoute requireRole={UserRole.ADMIN}>
                <RequestsQueue />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/invoices"
            element={
              <ProtectedRoute requireRole={UserRole.ADMIN}>
                <Invoices />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

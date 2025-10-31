import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

// Frontend Pages
import Navbar from "./components/client/Navbar.jsx";
import Footer from "./components/client/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ProjectsPage from "./pages/ProjectsPage.jsx";
import ProjectDetailsPage from "./pages/ProjectDetailsPage.jsx";
import BlogPage from "./pages/BlogPage.jsx";
import GalleryPage from "./pages/GalleryPage.jsx";
import ContactForm from "./components/client/ContactForm.jsx";

// Admin Pages
import LoginPage from "./components/admin/src/components/LoginPage.jsx";
import DashboardHome from "./components/admin/src/components/DashboardHome.jsx";
import AchievementsPage from "./components/admin/src/components/AchievementsPage.jsx";
import InsightsPage from "./components/admin/src/components/InsightsPage.jsx";
import ProjectsPageAdmin from "./components/admin/src/components/ProjectsPage.jsx";
import ServicesPage from "./components/admin/src/components/ServicesPage.jsx";
import TestimonialsPage from "./components/admin/src/components/TestimonialsPage.jsx";
import ProtectedRoute from "./components/admin/src/components/ProtectedRoute.jsx";

import { Toaster } from "sonner";

// ===== ScrollToTop Component (keeps your original logic) =====
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// ===== Layouts =====
const FrontendLayout = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <div className="flex-1 overflow-y-auto">{children}</div>
    <Footer />
  </div>
);

const AdminLayout = ({ children }) => (
  <div className="min-h-screen bg-gray-50">{children}</div>
);

// ===== Main App =====
export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Toaster />

      <Routes>
        {/* === Frontend Routes === */}
        <Route path="/" element={<FrontendLayout><HomePage /></FrontendLayout>} />
        <Route path="/about" element={<FrontendLayout><AboutPage /></FrontendLayout>} />
        <Route path="/projects" element={<FrontendLayout><ProjectsPage /></FrontendLayout>} />
        <Route path="/project/:id" element={<FrontendLayout><ProjectDetailsPage /></FrontendLayout>} />
        <Route path="/blog" element={<FrontendLayout><BlogPage /></FrontendLayout>} />
        <Route path="/gallery" element={<FrontendLayout><GalleryPage /></FrontendLayout>} />
        <Route path="/enquiry" element={<FrontendLayout><ContactForm /></FrontendLayout>} />
        <Route path="/preview_page.html" element={<Navigate to="/" replace />} />

        {/* === Admin Routes === */}
        <Route path="/admin" element={<AdminLayout><LoginPage /></AdminLayout>} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminLayout>
              <ProtectedRoute>
                <DashboardHome />
              </ProtectedRoute>
            </AdminLayout>
          }
        />
        <Route
          path="/admin/projects"
          element={
            <AdminLayout>
              <ProtectedRoute>
                <ProjectsPageAdmin />
              </ProtectedRoute>
            </AdminLayout>
          }
        />
        <Route
          path="/admin/achievements"
          element={
            <AdminLayout>
              <ProtectedRoute>
                <AchievementsPage />
              </ProtectedRoute>
            </AdminLayout>
          }
        />
        <Route
          path="/admin/testimonials"
          element={
            <AdminLayout>
              <ProtectedRoute>
                <TestimonialsPage />
              </ProtectedRoute>
            </AdminLayout>
          }
        />
        <Route
          path="/admin/services"
          element={
            <AdminLayout>
              <ProtectedRoute>
                <ServicesPage />
              </ProtectedRoute>
            </AdminLayout>
          }
        />
        <Route
          path="/admin/insights"
          element={
            <AdminLayout>
              <ProtectedRoute>
                <InsightsPage />
              </ProtectedRoute>
            </AdminLayout>
          }
        />

        {/* Fallback: catch-all */}
        <Route path="*" element={<FrontendLayout><HomePage /></FrontendLayout>} />
      </Routes>
    </Router>
  );
}

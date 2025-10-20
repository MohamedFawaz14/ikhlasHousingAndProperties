import React ,{useEffect}from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

// Frontend Pages
import Navbar from './components/client/Navbar.jsx';
import Footer from './components/client/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import ProjectDetailsPage from './pages/ProjectDetailsPage.jsx';
import BlogPage from './pages/BlogPage.jsx';
import GalleryPage from './pages/GalleryPage.jsx';
import ContactForm from './components/client/ContactForm.jsx';

// Admin Pages
import LoginPage from './components/admin/src/components/LoginPage.jsx';
import DashboardHome from './components/admin/src/components/DashboardHome.jsx';
import AchievementsPage from './components/admin/src/components/AchievementsPage.jsx';
import InsightsPage from './components/admin/src/components/InsightsPage.jsx';
import ProjectsPageAdmin from './components/admin/src/components/ProjectsPage.jsx';
import ServicesPage from './components/admin/src/components/ServicesPage.jsx';
import TestimonialsPage from './components/admin/src/components/TestimonialsPage.jsx';
import ProtectedRoute from './components/admin/src/components/ProtectedRoute.jsx';

import { Toaster } from "sonner";
function AppWrapper() {
  const { pathname } = useLocation();
    
      useEffect(() => {
        window.scrollTo(0, 0);
      }, [pathname]);
      
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Toaster/>
        <Routes>
          {/* Public Admin Route */}
          <Route path="/admin" element={<LoginPage />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <DashboardHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/projects"
            element={
              <ProtectedRoute>
                <ProjectsPageAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/achievements"
            element={
              <ProtectedRoute>
                <AchievementsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/testimonials"
            element={
              <ProtectedRoute>
                <TestimonialsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/services"
            element={
              <ProtectedRoute>
                <ServicesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/insights"
            element={
              <ProtectedRoute>
                <InsightsPage />
              </ProtectedRoute>
            }
          />

          {/* Fallback: redirect unknown /admin/* routes to login */}
          <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </div>
    );
  }

  // --- Frontend routes ---
  return (
    <div className="flex flex-col min-h-screen">
      <Toaster/>
      <Navbar />
      <div className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/project/:id" element={<ProjectDetailsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/enquiry" element={<ContactForm />} />
          <Route path="/preview_page.html" element={<Navigate to="/" replace />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

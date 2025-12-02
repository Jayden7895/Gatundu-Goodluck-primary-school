import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/ui/Layout';
import { Home } from './pages/Home';
import { Admissions } from './pages/Admissions';
import { AdminLayout } from './pages/admin/AdminLayout';
import { Dashboard } from './pages/admin/Dashboard';
import { ManageAdmissions } from './pages/admin/ManageAdmissions';
import { AIChatBot } from './components/AIChatBot';

// Placeholder components for brevity
const About = () => <div className="p-20 text-center text-2xl">About Page Placeholder</div>;
const Academics = () => <div className="p-20 text-center text-2xl">Academics Page Placeholder</div>;
const Gallery = () => <div className="p-20 text-center text-2xl">Gallery Page Placeholder</div>;
const Contact = () => <div className="p-20 text-center text-2xl">Contact Page Placeholder</div>;
const Events = () => <div className="p-20 text-center text-2xl">Events Page Placeholder</div>;
const News = () => <div className="p-20 text-center text-2xl">News Page Placeholder</div>;
const Messages = () => <div className="p-20 text-center text-2xl">Messages Admin Placeholder</div>;

// Admin Guard
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // In a real app, check auth token properly
  const isAdmin = true; // Simulating logged in admin for demo purposes
  return isAdmin ? <>{children}</> : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout><Home /><AIChatBot /></Layout>} />
        <Route path="/about" element={<Layout><About /><AIChatBot /></Layout>} />
        <Route path="/academics" element={<Layout><Academics /><AIChatBot /></Layout>} />
        <Route path="/admissions" element={<Layout><Admissions /><AIChatBot /></Layout>} />
        <Route path="/gallery" element={<Layout><Gallery /><AIChatBot /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /><AIChatBot /></Layout>} />
        <Route path="/events" element={<Layout><Events /><AIChatBot /></Layout>} />
        <Route path="/news" element={<Layout><News /><AIChatBot /></Layout>} />

        {/* Admin Routes */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
        <Route path="/admin/dashboard" element={
          <AdminRoute>
            <AdminLayout><Dashboard /></AdminLayout>
          </AdminRoute>
        } />
        <Route path="/admin/admissions" element={
          <AdminRoute>
            <AdminLayout><ManageAdmissions /></AdminLayout>
          </AdminRoute>
        } />
        <Route path="/admin/events" element={
          <AdminRoute>
            <AdminLayout><Events /></AdminLayout>
          </AdminRoute>
        } />
        <Route path="/admin/gallery" element={
          <AdminRoute>
            <AdminLayout><Gallery /></AdminLayout>
          </AdminRoute>
        } />
        <Route path="/admin/messages" element={
          <AdminRoute>
            <AdminLayout><Messages /></AdminLayout>
          </AdminRoute>
        } />
        <Route path="/admin/announcements" element={
          <AdminRoute>
            <AdminLayout><News /></AdminLayout>
          </AdminRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
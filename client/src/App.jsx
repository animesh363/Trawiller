import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LandingPage from './pages/public/LandingPage';
import ExplorePage from './pages/public/ExplorePage';
import HotelsPage from './pages/public/HotelsPage';
import RestaurantsPage from './pages/public/RestaurantsPage';
import ActivitiesPage from './pages/public/ActivitiesPage';
import TaxisPage from './pages/public/TaxisPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import UnauthorizedPage from './pages/public/UnauthorizedPage';
import ProtectedRoute from './routes/ProtectedRoute';
import RoleRoute from './routes/RoleRoute';

// Role Dashboards
import TouristDashboard from './pages/tourist/TouristDashboard';
import HotelDashboard from './pages/hotel/HotelDashboard';
import RestaurantDashboard from './pages/restaurant/RestaurantDashboard';
import TaxiDashboard from './pages/taxi/TaxiDashboard';
import ActivityDashboard from './pages/activity/ActivityDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import { ROLES } from './utils/constants';

export default function App() {
  return (
    <Router>
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/hotels" element={<HotelsPage />} />
        <Route path="/restaurants" element={<RestaurantsPage />} />
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/taxis" element={<TaxisPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* Authenticated Protected Routes */}
        <Route element={<ProtectedRoute />}>
          {/* Tourist Role Dashboard */}
          <Route element={<RoleRoute allowedRoles={[ROLES.TOURIST]} />}>
            <Route path="/dashboard/tourist" element={<TouristDashboard />} />
          </Route>

          {/* Hotel Owner Role Dashboard */}
          <Route element={<RoleRoute allowedRoles={[ROLES.HOTEL]} />}>
            <Route path="/dashboard/hotel" element={<HotelDashboard />} />
          </Route>

          {/* Restaurant Owner Role Dashboard */}
          <Route element={<RoleRoute allowedRoles={[ROLES.RESTAURANT]} />}>
            <Route path="/dashboard/restaurant" element={<RestaurantDashboard />} />
          </Route>

          {/* Taxi Driver Role Dashboard */}
          <Route element={<RoleRoute allowedRoles={[ROLES.TAXI]} />}>
            <Route path="/dashboard/taxi" element={<TaxiDashboard />} />
          </Route>

          {/* Activity Operator Role Dashboard */}
          <Route element={<RoleRoute allowedRoles={[ROLES.ACTIVITY]} />}>
            <Route path="/dashboard/activity" element={<ActivityDashboard />} />
          </Route>

          {/* Admin Role Dashboard */}
          <Route element={<RoleRoute allowedRoles={[ROLES.ADMIN]} />}>
            <Route path="/dashboard/admin" element={<AdminDashboard />} />
          </Route>
        </Route>

        {/* Fallback 404 Route */}
        <Route path="*" element={<UnauthorizedPage />} />
      </Routes>
    </Router>
  );
}

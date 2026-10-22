import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../../features/auth/authApi';
import { logout as logoutAction } from '../../features/auth/authSlice';
import Button from '../ui/Button';
import toast from 'react-hot-toast';
import { Mountain, Search, User, LogOut, LayoutDashboard, Menu, X, Hotel, Utensils, Sparkles, Car } from 'lucide-react';

export default function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApi] = useLogoutMutation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logoutAction());
      toast.success('Logged out successfully');
      navigate('/');
    } catch (err) {
      toast.error('Logout failed');
    }
  };

  const getDashboardPath = () => {
    if (!user) return '/login';
    return `/dashboard/${user.role}`;
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-700 to-brand-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Mountain className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-black text-slate-900 tracking-tight font-sans">
                TRAWILLER<span className="text-brand-600">.</span>
              </span>
              <span className="block text-[10px] uppercase font-bold tracking-widest text-accent-600 -mt-1">
                Himalayan Tourism
              </span>
            </div>
          </Link>

          {/* Center Navigation Links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
            <Link to="/explore" className="hover:text-brand-600 transition-colors flex items-center gap-1.5">
              <Search className="w-4 h-4 text-brand-600" />
              <span>Explore All</span>
            </Link>
            <Link to="/hotels" className="hover:text-brand-600 transition-colors flex items-center gap-1.5">
              <Hotel className="w-4 h-4 text-brand-600" />
              <span>Hotels</span>
            </Link>
            <Link to="/restaurants" className="hover:text-brand-600 transition-colors flex items-center gap-1.5">
              <Utensils className="w-4 h-4 text-amber-600" />
              <span>Restaurants</span>
            </Link>
            <Link to="/activities" className="hover:text-brand-600 transition-colors flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Yoga & Activities</span>
            </Link>
            <Link to="/taxis" className="hover:text-brand-600 transition-colors flex items-center gap-1.5">
              <Car className="w-4 h-4 text-blue-600" />
              <span>Taxis</span>
            </Link>
          </div>

          {/* Right User Actions */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <Link to={getDashboardPath()}>
                  <Button variant="outline" size="sm" icon={LayoutDashboard}>
                    Dashboard ({user.role.toUpperCase()})
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" icon={LogOut} onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Log In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary" size="sm">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3">
          <Link
            to="/explore"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-semibold text-slate-700 hover:bg-brand-50"
          >
            Explore All Listings
          </Link>
          <Link
            to="/hotels"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-semibold text-slate-700 hover:bg-brand-50"
          >
            Hotels & Resorts
          </Link>
          <Link
            to="/restaurants"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-semibold text-slate-700 hover:bg-brand-50"
          >
            Restaurants & Organic Cafes
          </Link>
          <Link
            to="/activities"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-semibold text-slate-700 hover:bg-brand-50"
          >
            Yoga & Activity Centers
          </Link>
          <Link
            to="/taxis"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-semibold text-slate-700 hover:bg-brand-50"
          >
            Taxi & Cab Routes
          </Link>

          <div className="pt-4 border-t border-slate-100">
            {user ? (
              <div className="space-y-2">
                <Link to={getDashboardPath()} onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" className="w-full" icon={LayoutDashboard}>
                    Dashboard
                  </Button>
                </Link>
                <Button variant="ghost" className="w-full" icon={LogOut} onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Log In
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" className="w-full">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

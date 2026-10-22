import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { useLogoutMutation } from '../../features/auth/authApi';
import { logout as logoutAction } from '../../features/auth/authSlice';
import Button from '../ui/Button';
import toast from 'react-hot-toast';
import {
  Mountain,
  LayoutDashboard,
  CalendarCheck,
  Building2,
  Utensils,
  Sparkles,
  Car,
  ShieldAlert,
  LogOut,
  User,
  Menu,
  X,
  ChevronRight,
  PlusCircle,
} from 'lucide-react';

export default function DashboardShell({ children }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApi] = useLogoutMutation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const roleColors = {
    tourist: 'bg-emerald-600',
    hotel: 'bg-teal-600',
    restaurant: 'bg-amber-600',
    activity: 'bg-purple-600',
    taxi: 'bg-blue-600',
    admin: 'bg-rose-600',
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 bg-slate-900 text-white shadow-md border-b border-slate-800">
        <div className="px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white">
                <Mountain className="w-5 h-5" />
              </div>
              <span className="font-extrabold tracking-tight text-lg text-white">TRAWILLER</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/explore" className="text-xs text-slate-300 hover:text-white font-medium hidden sm:block">
              ← Back to Main Marketplace
            </Link>

            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full ${roleColors[user?.role] || 'bg-brand-600'} flex items-center justify-center text-white font-bold text-xs`}>
                {user?.name?.[0] || 'U'}
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold text-white">{user?.name}</div>
                <div className="text-[10px] text-emerald-400 capitalize font-medium">{user?.role} Account</div>
              </div>
            </div>

            <Button variant="ghost" size="sm" icon={LogOut} onClick={handleLogout} className="text-slate-300 hover:text-white">
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Layout Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className="hidden md:flex w-64 bg-white border-r border-slate-200 flex-col justify-between p-4">
          <div className="space-y-6">
            <div className="px-3 py-2 bg-slate-50 rounded-xl border border-slate-100">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Active Workspace</div>
              <div className="text-sm font-extrabold text-slate-800 capitalize mt-0.5">{user?.role} Portal</div>
            </div>

            <nav className="space-y-1">
              <Link
                to={`/dashboard/${user?.role}`}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold bg-brand-50 text-brand-700"
              >
                <LayoutDashboard className="w-4 h-4 text-brand-600" />
                <span>Overview & Management</span>
              </Link>

              <Link
                to="/explore"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100"
              >
                <CalendarCheck className="w-4 h-4 text-slate-500" />
                <span>Browse All Listings</span>
              </Link>
            </nav>
          </div>

          <div className="p-3 bg-brand-900 text-white rounded-2xl space-y-2">
            <div className="text-xs font-bold text-emerald-400">Need Vendor Assistance?</div>
            <p className="text-[11px] text-slate-300 leading-tight">
              Contact our 24/7 mountain support line at support@trawiller.com
            </p>
          </div>
        </aside>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">{children || <Outlet />}</main>
      </div>
    </div>
  );
}

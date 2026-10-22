import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../features/auth/authSlice';
import { getDashboardPathForRole } from '../../lib/roleConfig';

export default function UnauthorizedPage() {
  const user = useSelector(selectCurrentUser);
  const homePath = user ? getDashboardPathForRole(user.role) : '/';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 text-center">
      <div className="w-20 h-20 bg-rose-100 text-rose-600 rounded-3xl flex items-center justify-center mb-6 shadow-sm">
        <ShieldAlert className="w-10 h-10" />
      </div>

      <span className="text-xs font-bold text-rose-600 uppercase tracking-widest bg-rose-50 px-3.5 py-1 rounded-full border border-rose-200">
        403 Forbidden Access
      </span>

      <h1 className="mt-4 text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
        Role Authorization Required
      </h1>

      <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-md">
        You do not have permission to view this page. You are currently logged in as{' '}
        <span className="font-bold text-slate-900">{user?.role || 'Guest'}</span>.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
        <Link
          to={homePath}
          className="w-full sm:w-auto px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
        >
          <Home className="w-4 h-4" />
          <span>Return to Dashboard</span>
        </Link>
        <Link
          to="/"
          className="w-full sm:w-auto px-6 py-3 border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
}

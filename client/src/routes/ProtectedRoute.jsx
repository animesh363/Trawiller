import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectIsAuthenticated,
  selectIsInitialized,
  setInitialized,
} from '../features/auth/authSlice';
import { useGetCurrentUserQuery } from '../features/auth/authApi';
import { Loader2 } from 'lucide-react';

export default function ProtectedRoute() {
  const location = useLocation();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isInitialized = useSelector(selectIsInitialized);

  // Fetch current user if not initialized
  const { isLoading, isError } = useGetCurrentUserQuery(undefined, {
    skip: isInitialized,
  });

  useEffect(() => {
    if ((isError || !isLoading) && !isInitialized) {
      dispatch(setInitialized());
    }
  }, [isError, isLoading, isInitialized, dispatch]);

  if (!isInitialized && isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-brand-600 animate-spin" />
          <span className="text-sm font-medium text-slate-600">
            Authenticating session...
          </span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

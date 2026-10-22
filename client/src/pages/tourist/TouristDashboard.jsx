import React from 'react';
import DashboardShell from '../../components/layout/DashboardShell';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { useGetMyBookingsQuery } from '../../features/bookings/bookingApi';
import { useSelector } from 'react-redux';
import { CalendarCheck, MapPin, IndianRupee, Clock, CheckCircle2, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TouristDashboard() {
  const { user } = useSelector((state) => state.auth);
  const { data: response, isLoading } = useGetMyBookingsQuery();
  const bookings = response?.data || [];

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-slate-900 to-brand-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <Badge variant="amber" className="mb-2">
              Tourist Account
            </Badge>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">Welcome back, {user?.name}!</h1>
            <p className="text-slate-300 text-sm mt-1">
              Manage your mountain trips, hotel reservations, yoga sessions, and cab bookings.
            </p>
          </div>
          <Link to="/explore">
            <Button variant="accent" size="lg" icon={Search}>
              Explore More Places
            </Button>
          </Link>
        </div>

        {/* Bookings Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <CalendarCheck className="w-5 h-5 text-brand-600" />
              <span>My Confirmed Bookings ({bookings.length})</span>
            </h2>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-4 border-brand-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : bookings.length === 0 ? (
            <Card className="p-8 text-center space-y-4">
              <CalendarCheck className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-lg font-bold text-slate-700">No Active Bookings Yet</h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                Explore our curated hotels, restaurants, yoga centers, and taxi routes in Manali, Rishikesh, and Dharamshala.
              </p>
              <Link to="/explore">
                <Button variant="primary">Start Exploring</Button>
              </Link>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bookings.map((b) => (
                <Card key={b._id} className="p-5 flex flex-col justify-between space-y-4 border-l-4 border-l-brand-600">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="emerald" className="uppercase tracking-wider">
                        {b.itemType} • {b.status}
                      </Badge>
                      <div className="text-xs text-slate-400 font-medium">
                        Booked on {new Date(b.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{b.itemTitle}</h3>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <MapPin className="w-4 h-4 text-brand-600" />
                      <span>{b.destination}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-400">Total Paid</div>
                      <div className="text-lg font-extrabold text-brand-700 flex items-center">
                        <IndianRupee className="w-4 h-4" />
                        <span>{b.totalAmount.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold bg-emerald-50 px-3 py-1.5 rounded-xl">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirmed</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}

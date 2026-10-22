import React from 'react';
import DashboardShell from '../../components/layout/DashboardShell';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { ShieldAlert, Users, Building2, CalendarCheck, CheckCircle2 } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-rose-600" />
            <span>Platform Administration & Moderation</span>
          </h1>
          <p className="text-sm text-slate-500">
            Overview of registered vendors, tourist bookings, platform verification, and system status.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-5 border-l-4 border-l-brand-600">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase">Verified Vendors</div>
                <div className="text-2xl font-black text-slate-900 mt-1">48</div>
              </div>
              <Building2 className="w-8 h-8 text-brand-600" />
            </div>
          </Card>

          <Card className="p-5 border-l-4 border-l-purple-600">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase">Yoga & Activity Centers</div>
                <div className="text-2xl font-black text-slate-900 mt-1">32</div>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </Card>

          <Card className="p-5 border-l-4 border-l-amber-600">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase">Total Bookings</div>
                <div className="text-2xl font-black text-slate-900 mt-1">154</div>
              </div>
              <CalendarCheck className="w-8 h-8 text-amber-600" />
            </div>
          </Card>

          <Card className="p-5 border-l-4 border-l-emerald-600">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase">System Status</div>
                <div className="text-lg font-black text-emerald-600 mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-5 h-5" /> Operational
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Registrations Queue */}
        <Card className="p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Pending Vendor Moderation Queue</h2>
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-slate-50 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900">Ananda Sacred Yoga & Adventure Hub</div>
                <div className="text-xs text-slate-500">Tapovan, Rishikesh • Category: Yoga & Activity</div>
              </div>
              <Badge variant="emerald">Verified & Approved</Badge>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900">The Grand Himalayan Sanctuary</div>
                <div className="text-xs text-slate-500">Old Manali • Category: Hotel</div>
              </div>
              <Badge variant="emerald">Verified & Approved</Badge>
            </div>
          </div>
        </Card>
      </div>
    </DashboardShell>
  );
}

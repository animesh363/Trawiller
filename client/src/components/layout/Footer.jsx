import React from 'react';
import { Mountain, Heart, ShieldCheck, PhoneCall, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center text-white">
                <Mountain className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">TRAWILLER</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              India's premier multi-role tourism platform connecting travelers with verified Hotels, Restaurants, Yoga & Meditation Centers, Adventure Activities, and Taxis across the Himalayas.
            </p>
          </div>

          {/* Top Destinations */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Himalayan Hubs</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/explore?destination=Rishikesh" className="hover:text-emerald-400">Rishikesh Yoga & Ganges</Link></li>
              <li><Link to="/explore?destination=Manali" className="hover:text-emerald-400">Manali & Solang Valley</Link></li>
              <li><Link to="/explore?destination=Dharamshala" className="hover:text-emerald-400">Dharamshala & McLeod Ganj</Link></li>
              <li><Link to="/explore?destination=Goa" className="hover:text-emerald-400">Goa Coastal Escapes</Link></li>
              <li><Link to="/explore?destination=Jaipur" className="hover:text-emerald-400">Jaipur Heritage Hub</Link></li>
            </ul>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Categories</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/hotels" className="hover:text-emerald-400">Hotels & Eco Resorts</Link></li>
              <li><Link to="/restaurants" className="hover:text-emerald-400">Organic Cafes & Dining</Link></li>
              <li><Link to="/activities" className="hover:text-emerald-400">Yoga & Meditation Retreats</Link></li>
              <li><Link to="/activities" className="hover:text-emerald-400">Adventure Paragliding & Rafting</Link></li>
              <li><Link to="/taxis" className="hover:text-emerald-400">4x4 Cabs & Airport Transfers</Link></li>
            </ul>
          </div>

          {/* Trust & Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Verified Security</h4>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Government Verified Vendors</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <PhoneCall className="w-4 h-4 text-amber-400 shrink-0" />
              <span>24/7 Tourist Support: +91 1800-TRAWILLER</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Mail className="w-4 h-4 text-blue-400 shrink-0" />
              <span>support@trawiller.com</span>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Trawiller Tourism Platform. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Indian Tourism
          </p>
        </div>
      </div>
    </footer>
  );
}

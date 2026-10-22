import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../features/auth/authSlice';
import { getDashboardPathForRole } from '../../lib/roleConfig';
import {
  Mountain, Search, Hotel, UtensilsCrossed, Car, Compass,
  CheckCircle2, ShieldCheck, MapPin, Menu, X, ArrowRight,
  Building2, LayoutDashboard, Star, ChevronDown, Zap,
  Users, Globe, Award, TrendingUp, Play
} from 'lucide-react';
import { DESTINATIONS } from '../../utils/constants';
import TravelBhaiyaChat from '../../components/ui/TravelBhaiyaChat';

// ── Hero background images (cinematic landscape shots) ────────────────────────
const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2400&q=85',
  'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=2400&q=85',
  'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=2400&q=85',
  'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=2400&q=85',
];

// ── Destination showcase data ──────────────────────────────────────────────────
const DEST_SHOWCASE = [
  { name: 'Manali', state: 'Himachal Pradesh', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80', tag: '🏔️ Mountains', color: 'from-blue-900' },
  { name: 'Rishikesh', state: 'Uttarakhand', img: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=600&q=80', tag: '🧘 Yoga', color: 'from-emerald-900' },
  { name: 'Goa', state: 'Goa', img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80', tag: '🌊 Beaches', color: 'from-cyan-900' },
  { name: 'Jaipur', state: 'Rajasthan', img: 'https://images.unsplash.com/photo-1477587458883-47145ed31459?auto=format&fit=crop&w=600&q=80', tag: '🏰 Heritage', color: 'from-orange-900' },
  { name: 'Munnar', state: 'Kerala', img: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80', tag: '🌿 Tea Estates', color: 'from-green-900' },
  { name: 'Varanasi', state: 'Uttar Pradesh', img: 'https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=600&q=80', tag: '🪔 Spiritual', color: 'from-amber-900' },
];

// ── Stats ──────────────────────────────────────────────────────────────────────
const STATS = [
  { value: '10K+', label: 'Happy Travelers', icon: Users },
  { value: '300+', label: 'Verified Vendors', icon: Award },
  { value: '15+', label: 'Destinations', icon: Globe },
  { value: '4.9', label: 'Avg Rating', icon: Star },
];

// ── Features ──────────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: ShieldCheck,
    color: 'from-teal-500 to-emerald-600',
    title: 'Verified Local Trust',
    desc: 'Every hotel owner, dhaba & driver is admin-verified for safe, authentic trips.',
  },
  {
    icon: Zap,
    color: 'from-violet-500 to-purple-600',
    title: 'AI Travel Planner',
    desc: 'Chat with Travel Bhaiya — our AI instantly creates personalized itineraries.',
  },
  {
    icon: Compass,
    color: 'from-blue-500 to-cyan-600',
    title: 'All-in-One Platform',
    desc: 'Book stays, reserve tables, hire verified taxis, and adventure activities.',
  },
  {
    icon: CheckCircle2,
    color: 'from-amber-500 to-orange-600',
    title: 'Zero Hidden Fees',
    desc: 'Direct booking with local operators — no inflated middleman prices.',
  },
];

// ── useScrollReveal Hook ──────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ── Parallax hero scroll ──────────────────────────────────────────────────────
function useParallax() {
  useEffect(() => {
    const handleScroll = () => {
      const bg = document.querySelector('.hero-bg-parallax');
      if (bg) {
        const y = window.scrollY;
        bg.style.transform = `scale(1.15) translateY(${y * 0.4}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}

// ─────────────────────────────────────────────────────────────────────────────
export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState('');
  const [activeCategory, setActiveCategory] = useState('hotel');
  const [heroIdx, setHeroIdx] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const currentUser = useSelector(selectCurrentUser);
  const dashboardPath = currentUser ? getDashboardPathForRole(currentUser.role) : null;

  useScrollReveal();
  useParallax();

  // Cycle hero images
  useEffect(() => {
    const t = setInterval(() => setHeroIdx(i => (i + 1) % HERO_IMAGES.length), 5000);
    return () => clearInterval(t);
  }, []);

  // Navbar scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const categories = [
    { id: 'hotel', label: 'Hotels & Homestays', icon: Hotel, path: '/hotels', count: '120+' },
    { id: 'restaurant', label: 'Dhabas & Cafes', icon: UtensilsCrossed, path: '/restaurants', count: '85+' },
    { id: 'activity', label: 'Yoga & Adventures', icon: Compass, path: '/activities', count: '40+' },
    { id: 'taxi', label: 'Taxi & Transport', icon: Car, path: '/taxis', count: '50+' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/explore?category=${activeCategory}&destination=${selectedDestination}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 font-sans">
      {/* ── Navbar ──────────────────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-slate-950/95 backdrop-blur-xl border-b border-white/8 shadow-2xl'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
              <Mountain className="w-6 h-6" />
            </div>
            <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
              Trawiller
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {['Destinations', 'Services', 'Why Us', 'List Business'].map((item, i) => (
              <a
                key={item}
                href={['#destinations', '#services', '#why', '#vendor'][i]}
                className="text-sm font-medium text-slate-300 hover:text-teal-400 transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            {currentUser ? (
              <Link
                to={dashboardPath}
                className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl hover:opacity-90 transition-all shadow-lg flex items-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl hover:opacity-90 transition-all shadow-lg"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-950/98 backdrop-blur-xl border-t border-white/10 px-4 py-5 space-y-3">
            {['Destinations', 'Services', 'Why Us', 'List Business'].map((item, i) => (
              <a
                key={item}
                href={['#destinations', '#services', '#why', '#vendor'][i]}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-medium text-slate-200 hover:text-teal-400 py-1.5"
              >
                {item}
              </a>
            ))}
            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              {currentUser ? (
                <Link to={dashboardPath} onClick={() => setMobileMenuOpen(false)}
                  className="py-3 text-center text-sm font-bold bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl">
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}
                    className="py-3 text-center text-sm font-medium text-white border border-white/20 rounded-xl">
                    Log in
                  </Link>
                  <Link to="/signup" onClick={() => setMobileMenuOpen(false)}
                    className="py-3 text-center text-sm font-bold bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* ── CINEMATIC HERO ───────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background image with parallax */}
        <div className="hero-bg-parallax absolute inset-0" style={{ transform: 'scale(1.15)' }}>
          {HERO_IMAGES.map((img, i) => (
            <div
              key={i}
              className="absolute inset-0 transition-opacity duration-1500"
              style={{
                backgroundImage: `url(${img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: i === heroIdx ? 1 : 0,
              }}
            />
          ))}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-950/50 to-slate-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-transparent to-slate-950/30" />

        {/* Noise texture */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.08\'/%3E%3C/svg%3E")',
        }} />

        {/* Floating destination mini-cards (desktop) */}
        <div className="absolute left-6 top-1/3 hidden lg:flex flex-col gap-4 z-10">
          {DEST_SHOWCASE.slice(0, 3).map((d, i) => (
            <div key={d.name} className={`float-card bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 flex items-center gap-3 w-44 cursor-pointer hover:bg-white/20 transition-all`}
              style={{ animationDelay: `${i * -2}s` }}
              onClick={() => navigate(`/explore?destination=${d.name}`)}>
              <img src={d.img} alt={d.name} className="w-10 h-10 rounded-xl object-cover" />
              <div>
                <p className="text-white text-xs font-bold">{d.name}</p>
                <p className="text-teal-300 text-[10px]">{d.tag}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute right-6 top-1/3 hidden lg:flex flex-col gap-4 z-10">
          {DEST_SHOWCASE.slice(3).map((d, i) => (
            <div key={d.name} className={`float-card bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 flex items-center gap-3 w-44 cursor-pointer hover:bg-white/20 transition-all`}
              style={{ animationDelay: `${-i * 2 - 1}s` }}
              onClick={() => navigate(`/explore?destination=${d.name}`)}>
              <img src={d.img} alt={d.name} className="w-10 h-10 rounded-xl object-cover" />
              <div>
                <p className="text-white text-xs font-bold">{d.name}</p>
                <p className="text-teal-300 text-[10px]">{d.tag}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs sm:text-sm font-semibold mb-6 backdrop-blur-sm">
            <Zap className="w-3.5 h-3.5 text-teal-400" />
            AI-Powered India Travel Platform • 300+ Verified Vendors
          </div>

          {/* Main Heading */}
          <h1 className="font-playfair text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-tight mb-4">
            Discover India's{' '}
            <span className="gradient-text">Hidden Gems</span>
            <br />
            with Local Experts
          </h1>

          <p className="text-slate-300 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
            From Himalayan peaks to coastal shores — book authentic homestays, local dhabas,
            mountain taxis & adventure activities. Verified. Trusted. Unforgettable.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <button
              onClick={() => navigate('/explore')}
              className="group flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold rounded-2xl hover:opacity-90 transition-all shadow-xl shadow-teal-900/40 hover:scale-105"
            >
              <Compass className="w-5 h-5 group-hover:rotate-45 transition-transform" />
              Explore Destinations
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => document.getElementById('ai-chat-trigger')?.click()}
              className="flex items-center gap-2.5 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-2xl border border-white/20 hover:bg-white/20 transition-all"
            >
              <span className="text-lg">🧳</span>
              Chat with Travel Bhaiya
            </button>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-3 flex flex-col sm:flex-row gap-3">
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white flex-1">
                <MapPin className="w-5 h-5 text-teal-600 shrink-0" />
                <select
                  value={selectedDestination}
                  onChange={(e) => setSelectedDestination(e.target.value)}
                  className="w-full bg-transparent text-slate-800 text-sm font-semibold focus:outline-none cursor-pointer"
                >
                  <option value="">All Destinations</option>
                  {DESTINATIONS.map((d) => (
                    <option key={d.id} value={d.id}>{d.name}, {d.state}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white sm:w-52">
                <Compass className="w-5 h-5 text-teal-600 shrink-0" />
                <select
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value)}
                  className="w-full bg-transparent text-slate-800 text-sm font-semibold focus:outline-none cursor-pointer"
                >
                  <option value="hotel">Hotels & Stays</option>
                  <option value="restaurant">Restaurants</option>
                  <option value="taxi">Taxis & Cabs</option>
                  <option value="activity">Activities</option>
                </select>
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold rounded-2xl hover:opacity-90 transition-all shadow-lg sm:min-w-[140px]"
              >
                <Search className="w-5 h-5" />
                Search
              </button>
            </div>
          </form>

          {/* Image dot indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {HERO_IMAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => setHeroIdx(i)}
                className={`h-1.5 rounded-full transition-all ${i === heroIdx ? 'w-8 bg-teal-400' : 'w-2 bg-white/30'}`}
              />
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 scroll-indicator">
          <p className="text-xs uppercase tracking-widest">Scroll to explore</p>
          <ChevronDown className="w-5 h-5" />
        </div>
      </section>

      {/* ── MARQUEE TICKER ──────────────────────────────────────────────────── */}
      <div className="bg-slate-900 border-y border-white/5 py-3 overflow-hidden">
        <div className="ticker-content flex gap-12 items-center text-xs font-semibold text-slate-400 uppercase tracking-widest">
          {['🏔️ Manali', '🌊 Goa', '🧘 Rishikesh', '🏰 Jaipur', '🌿 Munnar', '🪔 Varanasi', '🐪 Jaisalmer', '❄️ Dharamshala', '🌄 Shimla', '🏔️ Manali', '🌊 Goa', '🧘 Rishikesh', '🏰 Jaipur', '🌿 Munnar', '🪔 Varanasi', '🐪 Jaisalmer', '❄️ Dharamshala', '🌄 Shimla'].map((item, i) => (
            <span key={i} className="shrink-0 hover:text-teal-400 transition-colors cursor-default">{item}</span>
          ))}
        </div>
      </div>

      {/* ── STATS BAND ──────────────────────────────────────────────────────── */}
      <section className="bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className={`text-center reveal`} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="w-12 h-12 rounded-2xl bg-teal-500/15 border border-teal-500/25 flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6 text-teal-400" />
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white stat-number">{s.value}</div>
                <div className="text-slate-400 text-sm mt-1">{s.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── DESTINATIONS MOSAIC ─────────────────────────────────────────────── */}
      <section id="destinations" className="bg-slate-950 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="reveal inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/15 border border-amber-500/25 text-amber-400 text-sm font-semibold mb-4">
              <Globe className="w-4 h-4" />
              8+ Curated Destinations
            </div>
            <h2 className="reveal font-playfair text-3xl sm:text-5xl font-black text-white mb-3">
              Where Do You Want to Go?
            </h2>
            <p className="reveal text-slate-400 max-w-xl mx-auto">
              From snow-capped Himalayas to tropical coasts — every destination has verified local experiences waiting for you.
            </p>
          </div>

          {/* Mosaic Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {DEST_SHOWCASE.map((dest, i) => (
              <div
                key={dest.name}
                onClick={() => navigate(`/explore?destination=${dest.name}`)}
                className={`reveal-scale relative rounded-3xl overflow-hidden cursor-pointer group ${i === 0 ? 'md:row-span-2' : ''}`}
                style={{ transitionDelay: `${i * 0.08}s`, minHeight: i === 0 ? '320px' : '160px' }}
              >
                <img
                  src={dest.img}
                  alt={dest.name}
                  className="absolute inset-0 w-full h-full object-cover dest-img group-hover:scale-105 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${dest.color}/80 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="inline-block text-xs font-semibold text-white/80 bg-white/15 backdrop-blur-sm px-2 py-1 rounded-lg mb-1">
                    {dest.tag}
                  </span>
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="text-xl font-black text-white">{dest.name}</h3>
                      <p className="text-white/70 text-xs">{dest.state}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/15 border border-white/25 flex items-center justify-center group-hover:bg-teal-500 group-hover:border-teal-500 transition-all">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES SECTION ──────────────────────────────────────────────────── */}
      <section id="services" className="bg-slate-900 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="reveal inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/15 border border-teal-500/25 text-teal-400 text-sm font-semibold mb-4">
              <Compass className="w-4 h-4" />
              Everything In One App
            </div>
            <h2 className="reveal font-playfair text-3xl sm:text-5xl font-black text-white mb-3">
              Your Complete Travel Stack
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.id}
                  onClick={() => navigate(cat.path)}
                  className="reveal-scale group relative cursor-pointer bg-slate-800/50 border border-white/8 rounded-3xl p-6 hover:bg-slate-800 hover:border-teal-500/30 transition-all duration-300 overflow-hidden"
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  {/* Glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20 border border-teal-500/25 flex items-center justify-center mb-4 group-hover:from-teal-500 group-hover:to-cyan-600 transition-all">
                    <Icon className="w-7 h-7 text-teal-400 group-hover:text-white transition-colors" />
                  </div>

                  <div className="text-xs font-bold text-teal-400 mb-1">{cat.count} listings</div>
                  <h3 className="text-lg font-bold text-white mb-2">{cat.label}</h3>

                  <div className="flex items-center text-sm font-semibold text-slate-400 group-hover:text-teal-400 gap-1 transition-colors mt-4">
                    Browse All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── AI TRAVEL BHAIYA PROMO ────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-teal-950 via-slate-950 to-cyan-950 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Decorative orbs */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto relative">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left: text */}
            <div className="flex-1 text-center lg:text-left">
              <div className="reveal inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/15 border border-teal-400/25 text-teal-300 text-sm font-semibold mb-6">
                <Zap className="w-4 h-4" />
                New Feature — AI Travel Planner
              </div>
              <h2 className="reveal font-playfair text-3xl sm:text-5xl font-black text-white mb-4 lg:mb-6">
                Meet Travel Bhaiya 🧳<br />
                <span className="gradient-text">Your AI Travel Bestie</span>
              </h2>
              <p className="reveal text-slate-300 text-base sm:text-lg mb-6 max-w-lg">
                Just tell Travel Bhaiya where you're from and where you want to go.
                Get a <strong className="text-white">complete personalized itinerary</strong> with real hotel
                recommendations, activities, food spots, and transport options — instantly!
              </p>
              <div className="reveal flex flex-col sm:flex-row gap-3 items-center lg:items-start justify-center lg:justify-start">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" /> Day-by-day itinerary
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" /> Real verified listings
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" /> Direct booking links
                </div>
              </div>
            </div>

            {/* Right: chat preview card */}
            <div className="reveal-right flex-1 w-full max-w-md">
              <div className="bg-slate-900 rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                {/* Chat header */}
                <div className="bg-gradient-to-r from-teal-700 to-cyan-700 p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-xl">🧳</span>
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">Travel Bhaiya</p>
                    <p className="text-teal-200 text-xs">AI Travel Planner • Online</p>
                  </div>
                  <div className="ml-auto w-2 h-2 bg-green-400 rounded-full" />
                </div>

                {/* Chat preview messages */}
                <div className="p-4 space-y-3">
                  <div className="bg-slate-800 rounded-2xl rounded-tl-sm p-3 text-sm text-slate-200 max-w-[85%]">
                    🙏 Namaste! Main Travel Bhaiya — where do you want to go?
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-teal-600 rounded-2xl rounded-br-sm p-3 text-sm text-white max-w-[85%]">
                      I'm in Delhi, want to go Manali for 4 days 🏔️
                    </div>
                  </div>
                  <div className="bg-slate-800 rounded-2xl rounded-tl-sm p-3 text-sm text-slate-200 max-w-[90%]">
                    ✨ Wah! Manali is perfect right now! Here's your 4-day plan...
                    <div className="mt-2 flex gap-2">
                      <span className="px-2 py-1 bg-teal-900 text-teal-300 text-xs rounded-lg">🏨 Hotels</span>
                      <span className="px-2 py-1 bg-purple-900 text-purple-300 text-xs rounded-lg">🎿 Activities</span>
                      <span className="px-2 py-1 bg-amber-900 text-amber-300 text-xs rounded-lg">🍛 Food</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 border-t border-white/8">
                  <div className="bg-slate-800 rounded-xl px-4 py-2.5 flex items-center gap-2">
                    <span className="text-slate-500 text-sm flex-1">Describe your dream trip...</span>
                    <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center">
                      <Send className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY TRAWILLER ────────────────────────────────────────────────────── */}
      <section id="why" className="bg-slate-950 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="reveal inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/15 border border-violet-500/25 text-violet-400 text-sm font-semibold mb-4">
              <Award className="w-4 h-4" />
              Why 10,000+ Travelers Choose Us
            </div>
            <h2 className="reveal font-playfair text-3xl sm:text-5xl font-black text-white">
              The Smarter Way to Travel India
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className={`reveal-scale bg-slate-900 border border-white/8 rounded-3xl p-6 hover:border-white/15 transition-all`}
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── VENDOR CTA ────────────────────────────────────────────────────────── */}
      <section id="vendor" className="bg-slate-900 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="reveal bg-gradient-to-br from-teal-900/60 via-slate-900 to-cyan-900/40 border border-teal-700/30 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl" />

            <div className="max-w-2xl relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
                <Building2 className="w-3.5 h-3.5" /> For Local Business Owners
              </div>
              <h2 className="font-playfair text-2xl sm:text-4xl font-black text-white mb-3">
                Are you a local hotel, dhaba, driver, or activity operator?
              </h2>
              <p className="text-slate-300 text-sm sm:text-base">
                Join Trawiller today. List your business in minutes and reach thousands of travelers — zero middleman commissions.
              </p>
            </div>

            <div className="shrink-0 relative">
              <Link
                to="/signup"
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold rounded-2xl hover:opacity-90 transition-all shadow-xl hover:scale-105 whitespace-nowrap"
              >
                <TrendingUp className="w-5 h-5" />
                Register Your Business
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────────── */}
      <footer className="bg-slate-950 border-t border-white/5 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white">
              <Mountain className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold text-white">Trawiller</span>
          </Link>

          <p className="text-xs text-slate-500 text-center">
            © {new Date().getFullYear()} Trawiller Tourism Platform. Built with ❤️ for Indian travelers.
          </p>

          <div className="flex items-center gap-6 text-xs text-slate-500">
            <a href="#" className="hover:text-teal-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-teal-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-teal-400 transition-colors">Contact</a>
          </div>
        </div>
      </footer>

      {/* ── Travel Bhaiya Floating Widget ──────────────────────────────────────── */}
      <TravelBhaiyaChat />
    </div>
  );
}

// Missing Send import fix
function Send({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
    </svg>
  );
}

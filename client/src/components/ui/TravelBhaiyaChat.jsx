import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MessageCircle, X, Send, Bot, User, Hotel, Utensils,
  MapPin, Star, IndianRupee, Car, Zap, ChevronRight, Compass
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

// ── Suggestion chips shown before first message ────────────────────────────────
const SUGGESTIONS = [
  '🏔️ Plan my 3-day Manali trip',
  '🌊 Best things to do in Goa',
  '🧘 Yoga retreat in Rishikesh',
  '🐪 Jaisalmer desert safari plan',
  '🍛 Jaipur food & culture trip',
  '🌿 Kerala Munnar nature escape',
];

// ── Message type component ─────────────────────────────────────────────────────
function ChatMessage({ msg, onBookCard }) {
  if (msg.role === 'user') {
    return (
      <div className="flex justify-end mb-3">
        <div className="flex items-end gap-2 max-w-[80%]">
          <div className="bg-teal-600 text-white px-4 py-2.5 rounded-2xl rounded-br-sm text-sm leading-relaxed chat-bubble-enter">
            {msg.text}
          </div>
          <div className="w-7 h-7 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
            <User className="w-4 h-4 text-teal-700" />
          </div>
        </div>
      </div>
    );
  }

  if (msg.role === 'typing') {
    return (
      <div className="flex items-end gap-2 mb-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shrink-0 shadow-md">
          <Bot className="w-4 h-4 text-white" />
        </div>
        <div className="bg-white border border-slate-100 px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm">
          <div className="flex gap-1.5 items-center">
            <div className="typing-dot" />
            <div className="typing-dot" />
            <div className="typing-dot" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2 mb-4">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shrink-0 shadow-md mt-1">
        <Bot className="w-4 h-4 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        {/* AI plan text */}
        <div className="bg-white border border-slate-100 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm chat-bubble-enter">
          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{msg.text}</p>
        </div>

        {/* Listings cards */}
        {msg.data && (
          <div className="mt-3 space-y-2">
            {/* Hotels */}
            {msg.data.hotels?.length > 0 && (
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Hotel className="w-3.5 h-3.5" /> Recommended Hotels
                </p>
                {msg.data.hotels.map(hotel => (
                  <div
                    key={hotel._id}
                    onClick={() => onBookCard('hotel', hotel, msg.data.destination)}
                    className="flex gap-3 p-2.5 bg-white border border-slate-100 rounded-xl mb-2 cursor-pointer hover:border-teal-300 hover:shadow-md transition-all group"
                  >
                    <img
                      src={hotel.images?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=80&q=60'}
                      alt={hotel.name}
                      className="w-14 h-14 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-800 line-clamp-1">{hotel.name}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="text-xs text-slate-600">{hotel.rating}</span>
                        <span className="text-slate-300">•</span>
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span className="text-xs text-slate-500">{hotel.destination}</span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs font-bold text-teal-700 flex items-center">
                          <IndianRupee className="w-3 h-3" />{hotel.pricePerNight}<span className="font-normal text-slate-500">/night</span>
                        </span>
                        <span className="text-xs text-teal-600 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center">
                          Book <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Activities */}
            {msg.data.activities?.length > 0 && (
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5" /> Must-Do Experiences
                </p>
                {msg.data.activities.slice(0, 2).map(act => (
                  <div
                    key={act._id}
                    onClick={() => onBookCard('activity', act, msg.data.destination)}
                    className="flex gap-3 p-2.5 bg-white border border-slate-100 rounded-xl mb-2 cursor-pointer hover:border-purple-300 hover:shadow-md transition-all group"
                  >
                    <img
                      src={act.images?.[0] || 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=80&q=60'}
                      alt={act.title}
                      className="w-14 h-14 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-800 line-clamp-1">{act.title}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="text-xs text-slate-600">{act.rating}</span>
                        <span className="text-slate-300">•</span>
                        <span className="text-xs text-slate-500">{act.duration}</span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs font-bold text-purple-700 flex items-center">
                          <IndianRupee className="w-3 h-3" />{act.pricePerPerson}<span className="font-normal text-slate-500">/person</span>
                        </span>
                        <span className="text-xs text-purple-600 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center">
                          Book <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Restaurants */}
            {msg.data.restaurants?.length > 0 && (
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Utensils className="w-3.5 h-3.5" /> Where to Eat
                </p>
                {msg.data.restaurants.slice(0, 2).map(r => (
                  <div
                    key={r._id}
                    onClick={() => onBookCard('restaurant', r, msg.data.destination)}
                    className="flex gap-3 p-2.5 bg-white border border-slate-100 rounded-xl mb-2 cursor-pointer hover:border-amber-300 hover:shadow-md transition-all group"
                  >
                    <img
                      src={r.images?.[0] || 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=80&q=60'}
                      alt={r.name}
                      className="w-14 h-14 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-800 line-clamp-1">{r.name}</p>
                      <div className="flex flex-wrap gap-1 mt-0.5">
                        {r.cuisine?.slice(0, 2).map((c, i) => (
                          <span key={i} className="text-[10px] bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded-md font-medium">{c}</span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-slate-500">{r.priceRange} • {r.openingHours?.split(' - ')[0]}</span>
                        <span className="text-xs text-amber-600 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center">
                          Reserve <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Explore More Button */}
            <button
              onClick={() => onBookCard('explore', null, msg.data.destination)}
              className="w-full mt-1 py-2.5 bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-xs font-bold rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <Zap className="w-3.5 h-3.5" />
              Explore All in {msg.data.destination}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main Travel Bhaiya Widget ──────────────────────────────────────────────────
export default function TravelBhaiyaChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: '🙏 Namaste! Main hoon **Travel Bhaiya** — your personal India travel planner!\n\nBas bolo — aap kahan se ho aur kahan jaana chahte ho? I\'ll create a complete plan with hotels, food, activities, and transport! 🏔️✨',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [hasNewMsg, setHasNewMsg] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Show notification dot after 3s if not opened
  useEffect(() => {
    const t = setTimeout(() => setHasNewMsg(true), 3000);
    return () => clearTimeout(t);
  }, []);

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText) return;

    setInput('');
    setShowSuggestions(false);
    setHasNewMsg(false);
    setMessages(prev => [...prev, { role: 'user', text: userText }, { role: 'typing' }]);
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/ai/travel-plan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText }),
      });
      const data = await res.json();

      setMessages(prev => [
        ...prev.filter(m => m.role !== 'typing'),
        {
          role: 'bot',
          text: data.data?.planText || '🙏 Kuch technical issue hua. Please try again!',
          data: data.success ? data.data : null,
        },
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev.filter(m => m.role !== 'typing'),
        { role: 'bot', text: '❌ Server se connect nahi ho paya. Please make sure the server is running!' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleBookCard = (type, item, destination) => {
    if (type === 'explore') {
      navigate(`/explore?destination=${destination}`);
      setOpen(false);
      return;
    }
    navigate(`/explore?category=${type}&destination=${destination}`);
    setOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-widget">
      {/* ── Chat Panel ── */}
      {open && (
        <div className="chat-panel bg-slate-50" style={{ maxHeight: '580px' }}>
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-700 to-cyan-700 p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border-2 border-white/30">
              <span className="text-lg">🧳</span>
            </div>
            <div className="flex-1">
              <p className="font-bold text-white text-sm">Travel Bhaiya</p>
              <p className="text-teal-200 text-xs flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full inline-block" />
                AI Travel Planner • Always Available
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-1" style={{ height: '380px' }}>
            {messages.map((msg, i) => (
              <ChatMessage key={i} msg={msg} onBookCard={handleBookCard} />
            ))}

            {/* Suggestion chips */}
            {showSuggestions && messages.length <= 1 && (
              <div className="mt-2">
                <p className="text-xs text-slate-400 mb-2 text-center">✨ Try asking:</p>
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="text-xs bg-white border border-teal-200 text-teal-700 px-3 py-1.5 rounded-full hover:bg-teal-50 hover:border-teal-400 transition-all font-medium"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-slate-200 p-3 bg-white">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Where do you want to go? Describe your trip..."
                disabled={loading}
                className="flex-1 resize-none text-sm border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-slate-50 disabled:opacity-50"
                style={{ maxHeight: '80px' }}
              />
              <button
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-600 to-cyan-600 text-white flex items-center justify-center hover:opacity-90 disabled:opacity-40 transition-all shadow-md shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-center text-[10px] text-slate-400 mt-1.5">
              Powered by Gemini AI • Trawiller
            </p>
          </div>
        </div>
      )}

      {/* ── FAB Button ── */}
      <button
        onClick={() => { setOpen(o => !o); setHasNewMsg(false); }}
        className="relative fab-pulse w-16 h-16 rounded-full bg-gradient-to-br from-teal-600 to-cyan-600 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
        title="Chat with Travel Bhaiya"
      >
        {open ? (
          <X className="w-6 h-6" />
        ) : (
          <span className="text-2xl">🧳</span>
        )}

        {/* Notification dot */}
        {!open && hasNewMsg && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
            <span className="text-[8px] text-white font-bold">1</span>
          </span>
        )}
      </button>
    </div>
  );
}

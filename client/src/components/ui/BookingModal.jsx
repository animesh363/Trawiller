import React, { useState } from 'react';
import Modal from './Modal';
import Button from './Button';
import { useCreateBookingMutation } from '../../features/bookings/bookingApi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Calendar, Users, MapPin, IndianRupee, CreditCard } from 'lucide-react';

export default function BookingModal({ isOpen, onClose, item, itemType }) {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [createBooking, { isLoading }] = useCreateBookingMutation();

  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [notes, setNotes] = useState('');

  if (!item) return null;

  // Calculate default price
  let unitPrice = 0;
  let titleName = item.name || item.title || item.vehicleName || 'Listing';

  if (itemType === 'hotel') unitPrice = item.rooms?.[0]?.pricePerNight || 3500;
  if (itemType === 'restaurant') unitPrice = 500; // estimated reservation deposit
  if (itemType === 'activity') unitPrice = item.pricePerPerson || 1200;
  if (itemType === 'taxi') unitPrice = item.dayPackageRate || item.pricePerKm * 50 || 3000;

  const totalAmount = unitPrice * Math.max(1, Number(guests));

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to place a booking');
      navigate('/login');
      return;
    }

    try {
      await createBooking({
        itemType,
        itemId: item._id,
        itemTitle: titleName,
        destination: item.destination || 'Himalayas',
        vendor: item.vendor?._id || item.vendor,
        startDate,
        endDate: endDate || undefined,
        guests: Number(guests),
        totalAmount,
        notes,
      }).unwrap();

      toast.success('🎉 Booking Confirmed Successfully!');
      onClose();
      navigate('/dashboard/tourist');
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to complete booking');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Reserve ${titleName}`}>
      <form onSubmit={handleBooking} className="space-y-5">
        {/* Item Summary Card */}
        <div className="p-4 rounded-2xl bg-brand-50/60 border border-brand-100 flex items-start gap-4">
          <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-200 shrink-0">
            <img
              src={item.images?.[0] || 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=300&q=80'}
              alt={titleName}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 leading-snug">{titleName}</h4>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
              <MapPin className="w-3.5 h-3.5 text-brand-600" />
              <span>{item.destination}</span>
            </div>
            <div className="mt-2 text-sm font-semibold text-brand-700">
              ₹{unitPrice.toLocaleString('en-IN')} {itemType === 'hotel' ? '/ night' : itemType === 'activity' ? '/ person' : ''}
            </div>
          </div>
        </div>

        {/* Date Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Check-in / Activity Date
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="date"
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Check-out Date (Optional)
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>
        </div>

        {/* Guests Count */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            Number of Guests / Seats
          </label>
          <div className="relative">
            <Users className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="number"
              min="1"
              max="20"
              required
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>

        {/* Special Requests */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            Special Requests / Notes (Optional)
          </label>
          <textarea
            rows="2"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. Early check-in, dietary restrictions, airport pickup request..."
            className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
          />
        </div>

        {/* Total Price & Payment Method */}
        <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 uppercase tracking-wider">Total Booking Amount</div>
            <div className="text-xl font-bold flex items-center gap-1 text-emerald-400 mt-0.5">
              <IndianRupee className="w-5 h-5" />
              <span>{totalAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
            <CreditCard className="w-4 h-4 text-emerald-400" />
            <span>Instant Confirmation</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isLoading}>
            Confirm & Reserve Now
          </Button>
        </div>
      </form>
    </Modal>
  );
}

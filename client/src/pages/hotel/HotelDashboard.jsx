import React, { useState } from 'react';
import DashboardShell from '../../components/layout/DashboardShell';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { useGetVendorBookingsQuery } from '../../features/bookings/bookingApi';
import { useCreateHotelMutation, useGetMyHotelsQuery } from '../../features/listings/listingsApi';
import toast from 'react-hot-toast';
import { Hotel, Plus, CalendarCheck, IndianRupee, MapPin, Image as ImageIcon, Star } from 'lucide-react';

export default function HotelDashboard() {
  const { data: bookingResp } = useGetVendorBookingsQuery();
  const { data: hotelsResp, isLoading: isHotelsLoading } = useGetMyHotelsQuery();
  const bookings = bookingResp?.data || [];
  const myHotels = hotelsResp?.data || [];

  const [createHotel, { isLoading: isCreating }] = useCreateHotelMutation();

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    destination: 'Manali',
    address: '',
    description: '',
    starRating: 4,
    pricePerNight: 3500,
    imageUrl: '',
  });

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createHotel({
        ...formData,
        rooms: [{ title: 'Standard Room', type: 'double', pricePerNight: Number(formData.pricePerNight) }],
      }).unwrap();
      toast.success('Hotel property listed successfully in database!');
      setShowForm(false);
      setFormData({
        name: '',
        destination: 'Manali',
        address: '',
        description: '',
        starRating: 4,
        pricePerNight: 3500,
        imageUrl: '',
      });
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to list hotel');
    }
  };

  return (
    <DashboardShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
              <Hotel className="w-7 h-7 text-teal-600" />
              <span>Hotel & Resort Management</span>
            </h1>
            <p className="text-sm text-slate-500">
              Manage your hotel properties, descriptions, image URLs, and guest reservations.
            </p>
          </div>
          <Button variant="primary" icon={Plus} onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel Form' : 'Add New Property'}
          </Button>
        </div>

        {/* Form Modal / Section */}
        {showForm && (
          <Card className="p-6 bg-slate-50 border-teal-200 shadow-lg">
            <h3 className="text-lg font-bold text-slate-900 mb-4">List a New Hotel Property</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Hotel Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                    placeholder="e.g. Pine Wood Resort & Spa"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Destination Region</label>
                  <select
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                  >
                    <option value="Manali">Manali</option>
                    <option value="Rishikesh">Rishikesh</option>
                    <option value="Dharamshala">Dharamshala</option>
                    <option value="Goa">Goa</option>
                    <option value="Jaipur">Jaipur</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                    placeholder="e.g. Mall Road, Near Circuit House"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Starting Price per Night (₹)</label>
                  <input
                    type="number"
                    required
                    value={formData.pricePerNight}
                    onChange={(e) => setFormData({ ...formData, pricePerNight: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                    placeholder="3500"
                  />
                </div>
              </div>

              {/* Image URL Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1 flex items-center gap-1">
                  <ImageIcon className="w-3.5 h-3.5 text-teal-600" />
                  <span>Property Image URL</span>
                </label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                  placeholder="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
                />
                {formData.imageUrl && (
                  <div className="mt-2 w-32 h-20 rounded-xl overflow-hidden border border-slate-200">
                    <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* Description Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Full Property Description</label>
                <textarea
                  rows="3"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white resize-none"
                  placeholder="Describe mountain views, eco amenities, dining, and stay features..."
                />
              </div>

              <Button type="submit" variant="primary" isLoading={isCreating}>
                Publish Property to Database
              </Button>
            </form>
          </Card>
        )}

        {/* Listed Properties Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Hotel className="w-5 h-5 text-teal-600" />
            <span>My Listed Properties ({myHotels.length})</span>
          </h2>

          {isHotelsLoading ? (
            <div className="py-8 text-center text-slate-500">Loading properties...</div>
          ) : myHotels.length === 0 ? (
            <Card className="p-8 text-center text-slate-500 space-y-2">
              <Hotel className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="font-semibold text-slate-700">No properties listed yet.</p>
              <p className="text-xs text-slate-500">Click "Add New Property" to add your hotel or resort.</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myHotels.map((hotel) => (
                <Card key={hotel._id} className="flex flex-col">
                  <div className="relative h-44 bg-slate-200">
                    <img
                      src={hotel.images?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80'}
                      alt={hotel.name}
                      className="w-full h-full object-cover"
                    />
                    <Badge variant="emerald" className="absolute top-3 left-3 shadow">
                      {hotel.destination}
                    </Badge>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">{hotel.name}</h3>
                      <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-teal-600" />
                        <span>{hotel.address}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-2 line-clamp-2">{hotel.description}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div className="text-sm font-extrabold text-teal-700 flex items-center">
                        <IndianRupee className="w-4 h-4" />
                        <span>{hotel.rooms?.[0]?.pricePerNight || 3500} / night</span>
                      </div>
                      <Badge variant="emerald">Live in DB</Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Received Bookings */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <CalendarCheck className="w-5 h-5 text-teal-600" />
            <span>Received Guest Bookings ({bookings.length})</span>
          </h2>

          {bookings.length === 0 ? (
            <Card className="p-6 text-center text-slate-500">No guest bookings received yet.</Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bookings.map((b) => (
                <Card key={b._id} className="p-4 space-y-2 border-l-4 border-l-teal-600">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-slate-900">{b.itemTitle}</h3>
                    <Badge variant="emerald">{b.status}</Badge>
                  </div>
                  <div className="text-xs text-slate-600">
                    Guest: <span className="font-bold">{b.tourist?.name || 'Tourist'}</span> ({b.guests} Guests)
                  </div>
                  <div className="text-sm font-bold text-teal-700">₹{b.totalAmount} Paid</div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}

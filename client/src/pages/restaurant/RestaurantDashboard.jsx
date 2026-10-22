import React, { useState } from 'react';
import DashboardShell from '../../components/layout/DashboardShell';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { useGetVendorBookingsQuery } from '../../features/bookings/bookingApi';
import { useCreateRestaurantMutation, useGetMyRestaurantsQuery } from '../../features/listings/listingsApi';
import toast from 'react-hot-toast';
import { Utensils, Plus, CalendarCheck, MapPin, Image as ImageIcon } from 'lucide-react';

export default function RestaurantDashboard() {
  const { data: bookingResp } = useGetVendorBookingsQuery();
  const { data: restResp, isLoading: isRestLoading } = useGetMyRestaurantsQuery();
  const bookings = bookingResp?.data || [];
  const myRestaurants = restResp?.data || [];

  const [createRestaurant, { isLoading: isCreating }] = useCreateRestaurantMutation();

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    destination: 'Rishikesh',
    address: '',
    description: '',
    priceRange: '$$',
    imageUrl: '',
    openingHours: '08:00 AM - 10:00 PM',
  });

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createRestaurant({
        ...formData,
        cuisine: ['Organic Cafe', 'Himachali', 'North Indian'],
      }).unwrap();
      toast.success('Restaurant listed successfully in database!');
      setShowForm(false);
      setFormData({
        name: '',
        destination: 'Rishikesh',
        address: '',
        description: '',
        priceRange: '$$',
        imageUrl: '',
        openingHours: '08:00 AM - 10:00 PM',
      });
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to list restaurant');
    }
  };

  return (
    <DashboardShell>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
              <Utensils className="w-7 h-7 text-amber-600" />
              <span>Restaurant & Cafe Management</span>
            </h1>
            <p className="text-sm text-slate-500">Manage cafe listings, descriptions, image URLs, and table bookings.</p>
          </div>
          <Button variant="accent" icon={Plus} onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel Form' : 'Add New Restaurant / Cafe'}
          </Button>
        </div>

        {showForm && (
          <Card className="p-6 bg-amber-50/40 border-amber-200 shadow-lg">
            <h3 className="text-lg font-bold text-slate-900 mb-4">List a New Dining Spot</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Restaurant Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                    placeholder="e.g. Sacred Riverfront Bistro"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Destination Region</label>
                  <select
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                  >
                    <option value="Rishikesh">Rishikesh</option>
                    <option value="Manali">Manali</option>
                    <option value="Dharamshala">Dharamshala</option>
                    <option value="Goa">Goa</option>
                    <option value="Jaipur">Jaipur</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Full Address</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                    placeholder="e.g. Laxman Jhula Main Road"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Opening Hours</label>
                  <input
                    type="text"
                    required
                    value={formData.openingHours}
                    onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                    placeholder="08:00 AM - 10:00 PM"
                  />
                </div>
              </div>

              {/* Image URL Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1 flex items-center gap-1">
                  <ImageIcon className="w-3.5 h-3.5 text-amber-600" />
                  <span>Cafe / Restaurant Image URL</span>
                </label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                  placeholder="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80"
                />
                {formData.imageUrl && (
                  <div className="mt-2 w-32 h-20 rounded-xl overflow-hidden border border-slate-200">
                    <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* Description Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Description</label>
                <textarea
                  rows="3"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white resize-none"
                  placeholder="Describe your organic dishes, woodfired pizzas, specialty coffee, and ambiance..."
                />
              </div>

              <Button type="submit" variant="accent" isLoading={isCreating}>
                Publish Dining Spot to Database
              </Button>
            </form>
          </Card>
        )}

        {/* Listed Restaurants Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Utensils className="w-5 h-5 text-amber-600" />
            <span>My Listed Restaurants ({myRestaurants.length})</span>
          </h2>

          {isRestLoading ? (
            <div className="py-8 text-center text-slate-500">Loading dining spots...</div>
          ) : myRestaurants.length === 0 ? (
            <Card className="p-8 text-center text-slate-500 space-y-2">
              <Utensils className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="font-semibold text-slate-700">No restaurants listed yet.</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myRestaurants.map((rest) => (
                <Card key={rest._id} className="flex flex-col">
                  <div className="relative h-44 bg-slate-200">
                    <img
                      src={rest.images?.[0] || 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80'}
                      alt={rest.name}
                      className="w-full h-full object-cover"
                    />
                    <Badge variant="amber" className="absolute top-3 left-3 shadow">
                      {rest.destination}
                    </Badge>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">{rest.name}</h3>
                      <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-amber-600" />
                        <span>{rest.address}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-2 line-clamp-2">{rest.description}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">{rest.openingHours}</span>
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
            <CalendarCheck className="w-5 h-5 text-amber-600" />
            <span>Table Reservations ({bookings.length})</span>
          </h2>

          {bookings.length === 0 ? (
            <Card className="p-6 text-center text-slate-500">No table reservations received yet.</Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bookings.map((b) => (
                <Card key={b._id} className="p-4 space-y-2 border-l-4 border-l-amber-600">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-slate-900">{b.itemTitle}</h3>
                    <Badge variant="amber">{b.status}</Badge>
                  </div>
                  <div className="text-xs text-slate-600">
                    Guest: <span className="font-bold">{b.tourist?.name || 'Customer'}</span> ({b.guests} Guests)
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

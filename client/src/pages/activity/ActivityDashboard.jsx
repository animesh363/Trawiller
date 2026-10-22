import React, { useState } from 'react';
import DashboardShell from '../../components/layout/DashboardShell';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { useGetVendorBookingsQuery } from '../../features/bookings/bookingApi';
import { useCreateActivityMutation, useGetMyActivitiesQuery } from '../../features/listings/listingsApi';
import toast from 'react-hot-toast';
import { Sparkles, Plus, CalendarCheck, MapPin, Image as ImageIcon, IndianRupee } from 'lucide-react';

export default function ActivityDashboard() {
  const { data: bookingResp } = useGetVendorBookingsQuery();
  const { data: actResp, isLoading: isActLoading } = useGetMyActivitiesQuery();
  const bookings = bookingResp?.data || [];
  const myActivities = actResp?.data || [];

  const [createActivity, { isLoading: isCreating }] = useCreateActivityMutation();

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'yoga',
    destination: 'Rishikesh',
    location: '',
    description: '',
    pricePerPerson: 1200,
    duration: '2 Hours',
    imageUrl: '',
  });

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createActivity({
        ...formData,
        pricePerPerson: Number(formData.pricePerPerson),
      }).unwrap();
      toast.success('Yoga / Activity session published in database!');
      setShowForm(false);
      setFormData({
        title: '',
        category: 'yoga',
        destination: 'Rishikesh',
        location: '',
        description: '',
        pricePerPerson: 1200,
        duration: '2 Hours',
        imageUrl: '',
      });
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to list session');
    }
  };

  return (
    <DashboardShell>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-7 h-7 text-purple-600" />
              <span>Yoga & Activity Management</span>
            </h1>
            <p className="text-sm text-slate-500">
              Publish yoga retreats, meditation programs, sound healing, paragliding, rafting, and trekking sessions.
            </p>
          </div>
          <Button variant="primary" icon={Plus} onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel Form' : 'Add New Yoga / Activity Center'}
          </Button>
        </div>

        {showForm && (
          <Card className="p-6 bg-purple-50/40 border-purple-200 shadow-lg">
            <h3 className="text-lg font-bold text-slate-900 mb-4">List New Yoga Retreat or Adventure Program</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                    placeholder="e.g. Kundalini Yoga & Sacred Sound Meditation"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                  >
                    <option value="yoga">Yoga Center</option>
                    <option value="wellness">Wellness Retreat</option>
                    <option value="adventure">Outdoor Adventure</option>
                    <option value="water_sports">Water Sports / Rafting</option>
                    <option value="trekking">Trekking</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Destination Region</label>
                  <select
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                  >
                    <option value="Rishikesh">Rishikesh</option>
                    <option value="Dharamshala">Dharamshala</option>
                    <option value="Manali">Manali</option>
                    <option value="Goa">Goa</option>
                    <option value="Jaipur">Jaipur</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Duration</label>
                  <input
                    type="text"
                    required
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                    placeholder="e.g. 2 Hours or 3 Days"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Price / Person (₹)</label>
                  <input
                    type="number"
                    required
                    value={formData.pricePerPerson}
                    onChange={(e) => setFormData({ ...formData, pricePerPerson: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Location Details</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                  placeholder="e.g. Tapovan High Bank Shala, Rishikesh"
                />
              </div>

              {/* Image URL Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1 flex items-center gap-1">
                  <ImageIcon className="w-3.5 h-3.5 text-purple-600" />
                  <span>Activity / Yoga Shala Image URL</span>
                </label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                  placeholder="https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80"
                />
                {formData.imageUrl && (
                  <div className="mt-2 w-32 h-20 rounded-xl overflow-hidden border border-slate-200">
                    <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* Description Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Full Description</label>
                <textarea
                  rows="3"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white resize-none"
                  placeholder="Explain session benefits, instructors, schedule, inclusions..."
                />
              </div>

              <Button type="submit" variant="primary" isLoading={isCreating}>
                Publish Session / Center to Database
              </Button>
            </form>
          </Card>
        )}

        {/* Listed Activities Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <span>My Published Yoga & Activity Centers ({myActivities.length})</span>
          </h2>

          {isActLoading ? (
            <div className="py-8 text-center text-slate-500">Loading centers...</div>
          ) : myActivities.length === 0 ? (
            <Card className="p-8 text-center text-slate-500 space-y-2">
              <Sparkles className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="font-semibold text-slate-700">No centers or activities published yet.</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myActivities.map((act) => (
                <Card key={act._id} className="flex flex-col">
                  <div className="relative h-44 bg-slate-200">
                    <img
                      src={act.images?.[0] || 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=600&q=80'}
                      alt={act.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge variant="purple" className="absolute top-3 left-3 shadow">
                      {act.destination} • {act.category}
                    </Badge>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">{act.title}</h3>
                      <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-purple-600" />
                        <span>{act.location}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-2 line-clamp-2">{act.description}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div className="text-sm font-extrabold text-purple-700 flex items-center">
                        <IndianRupee className="w-4 h-4" />
                        <span>{act.pricePerPerson} / person</span>
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
            <CalendarCheck className="w-5 h-5 text-purple-600" />
            <span>Session Bookings ({bookings.length})</span>
          </h2>

          {bookings.length === 0 ? (
            <Card className="p-6 text-center text-slate-500">No session bookings received yet.</Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bookings.map((b) => (
                <Card key={b._id} className="p-4 space-y-2 border-l-4 border-l-purple-600">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-slate-900">{b.itemTitle}</h3>
                    <Badge variant="purple">{b.status}</Badge>
                  </div>
                  <div className="text-xs text-slate-600">
                    Participant: <span className="font-bold">{b.tourist?.name || 'Participant'}</span> ({b.guests} Guests)
                  </div>
                  <div className="text-sm font-bold text-purple-700">₹{b.totalAmount} Paid</div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}

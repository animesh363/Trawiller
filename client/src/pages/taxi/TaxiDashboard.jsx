import React, { useState } from 'react';
import DashboardShell from '../../components/layout/DashboardShell';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { useGetVendorBookingsQuery } from '../../features/bookings/bookingApi';
import { useCreateTaxiMutation, useGetMyTaxisQuery } from '../../features/listings/listingsApi';
import toast from 'react-hot-toast';
import { Car, Plus, CalendarCheck, MapPin, Image as ImageIcon, IndianRupee } from 'lucide-react';

export default function TaxiDashboard() {
  const { data: bookingResp } = useGetVendorBookingsQuery();
  const { data: taxiResp, isLoading: isTaxiLoading } = useGetMyTaxisQuery();
  const bookings = bookingResp?.data || [];
  const myTaxis = taxiResp?.data || [];

  const [createTaxi, { isLoading: isCreating }] = useCreateTaxiMutation();

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    driverName: '',
    vehicleName: '',
    vehicleType: 'SUV',
    capacity: 6,
    destination: 'Manali',
    dayPackageRate: 3800,
    imageUrl: '',
  });

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createTaxi({
        ...formData,
        capacity: Number(formData.capacity),
        dayPackageRate: Number(formData.dayPackageRate),
      }).unwrap();
      toast.success('Taxi service published in database!');
      setShowForm(false);
      setFormData({
        driverName: '',
        vehicleName: '',
        vehicleType: 'SUV',
        capacity: 6,
        destination: 'Manali',
        dayPackageRate: 3800,
        imageUrl: '',
      });
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to list cab service');
    }
  };

  return (
    <DashboardShell>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
              <Car className="w-7 h-7 text-blue-600" />
              <span>Taxi & Driver Management</span>
            </h1>
            <p className="text-sm text-slate-500">Manage 4x4 cabs, airport transfers, vehicle images, and passenger bookings.</p>
          </div>
          <Button variant="primary" icon={Plus} onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel Form' : 'Add New Taxi / Cab'}
          </Button>
        </div>

        {showForm && (
          <Card className="p-6 bg-blue-50/40 border-blue-200 shadow-lg">
            <h3 className="text-lg font-bold text-slate-900 mb-4">List New Taxi / Cab Vehicle</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Driver Name</label>
                  <input
                    type="text"
                    required
                    value={formData.driverName}
                    onChange={(e) => setFormData({ ...formData, driverName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                    placeholder="e.g. Vikram Singh"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Vehicle Model & Title</label>
                  <input
                    type="text"
                    required
                    value={formData.vehicleName}
                    onChange={(e) => setFormData({ ...formData, vehicleName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                    placeholder="e.g. Mahindra Scorpio 4x4"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Vehicle Type</label>
                  <select
                    value={formData.vehicleType}
                    onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                  >
                    <option value="SUV">SUV</option>
                    <option value="4x4 Offroader">4x4 Offroader</option>
                    <option value="Sedan">Sedan</option>
                    <option value="Mini Bus">Tempo Traveller / Mini Bus</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Base Destination Region</label>
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
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Day Package Rate (₹)</label>
                  <input
                    type="number"
                    required
                    value={formData.dayPackageRate}
                    onChange={(e) => setFormData({ ...formData, dayPackageRate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                  />
                </div>
              </div>

              {/* Image URL Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1 flex items-center gap-1">
                  <ImageIcon className="w-3.5 h-3.5 text-blue-600" />
                  <span>Vehicle Image URL</span>
                </label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                  placeholder="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80"
                />
                {formData.imageUrl && (
                  <div className="mt-2 w-32 h-20 rounded-xl overflow-hidden border border-slate-200">
                    <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <Button type="submit" variant="primary" isLoading={isCreating}>
                Publish Taxi Fleet to Database
              </Button>
            </form>
          </Card>
        )}

        {/* Listed Fleet Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Car className="w-5 h-5 text-blue-600" />
            <span>My Published Taxi Fleet ({myTaxis.length})</span>
          </h2>

          {isTaxiLoading ? (
            <div className="py-8 text-center text-slate-500">Loading vehicles...</div>
          ) : myTaxis.length === 0 ? (
            <Card className="p-8 text-center text-slate-500 space-y-2">
              <Car className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="font-semibold text-slate-700">No vehicles listed yet.</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myTaxis.map((taxi) => (
                <Card key={taxi._id} className="flex flex-col">
                  <div className="relative h-44 bg-slate-200">
                    <img
                      src={taxi.images?.[0] || 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80'}
                      alt={taxi.vehicleName}
                      className="w-full h-full object-cover"
                    />
                    <Badge variant="blue" className="absolute top-3 left-3 shadow">
                      {taxi.destination} • {taxi.vehicleType}
                    </Badge>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">{taxi.vehicleName}</h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Driver: {taxi.driverName} • Capacity: {taxi.capacity} Seats
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div className="text-sm font-extrabold text-blue-700 flex items-center">
                        <IndianRupee className="w-4 h-4" />
                        <span>{taxi.dayPackageRate} / day</span>
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
            <CalendarCheck className="w-5 h-5 text-blue-600" />
            <span>Passenger Ride Bookings ({bookings.length})</span>
          </h2>

          {bookings.length === 0 ? (
            <Card className="p-6 text-center text-slate-500">No ride bookings received yet.</Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bookings.map((b) => (
                <Card key={b._id} className="p-4 space-y-2 border-l-4 border-l-blue-600">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-slate-900">{b.itemTitle}</h3>
                    <Badge variant="blue">{b.status}</Badge>
                  </div>
                  <div className="text-xs text-slate-600">
                    Passenger: <span className="font-bold">{b.tourist?.name || 'Passenger'}</span> ({b.guests} Seats)
                  </div>
                  <div className="text-sm font-bold text-blue-700">₹{b.totalAmount} Paid</div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}

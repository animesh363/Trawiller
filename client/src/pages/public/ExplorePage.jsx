import React, { useState, useEffect } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import BookingModal from '../../components/ui/BookingModal';
import { useGetExploreListingsQuery } from '../../features/listings/listingsApi';
import { Search, MapPin, Star, Utensils, Hotel, Sparkles, Car, IndianRupee, Filter, RotateCcw, Frown } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const MOCK_LISTINGS = {
  hotels: [
    // Manali
    {
      _id: 'mock_h1',
      name: 'The Grand Himalayan Resort & Spa',
      destination: 'Manali',
      address: 'Old Manali, Near Beas River, HP',
      description: 'Luxury eco-resort nestled amidst pine forests with panoramic views of snow-capped peaks.',
      starRating: 5,
      rating: 4.9,
      numReviews: 48,
      amenities: ['Free High-Speed WiFi', 'Heated Outdoor Pool', 'Spiritual Spa', 'Fireplace'],
      images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80'],
      rooms: [{ title: 'Himalayan View Deluxe Suite', pricePerNight: 4500 }],
    },
    {
      _id: 'mock_h2',
      name: 'Solang Valley Snow Crest Chalet',
      destination: 'Manali',
      address: 'Solang Village Road, Manali',
      description: 'Alpine wooden chalets with private balconies and direct mountain slope views.',
      starRating: 4,
      rating: 4.8,
      numReviews: 36,
      amenities: ['Snow View Balcony', 'Wood Heater', 'In-house Dining'],
      images: ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80'],
      rooms: [{ title: 'Alpine Wood Cottage', pricePerNight: 3800 }],
    },
    {
      _id: 'mock_h3',
      name: 'Old Manali Riverside Eco Cabins',
      destination: 'Manali',
      address: 'Club House Road, Old Manali',
      description: 'Tranquil riverside cabins surrounded by apple orchards.',
      starRating: 4,
      rating: 4.75,
      numReviews: 42,
      amenities: ['Beas River View', 'Apple Orchard Walk', 'Organic Breakfast'],
      images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80'],
      rooms: [{ title: 'Riverside Wooden Cabin', pricePerNight: 2600 }],
    },
    // Rishikesh
    {
      _id: 'mock_h4',
      name: 'Ganges View Yoga & Wellness Eco Lodge',
      destination: 'Rishikesh',
      address: 'Tapovan, Above Laxman Jhula, Rishikesh',
      description: 'Serene riverside retreat focused on yoga, organic vegetarian dining, and sound meditation.',
      starRating: 4,
      rating: 4.85,
      numReviews: 32,
      amenities: ['Yoga Shala', 'River View', 'Ayurvedic Spa', 'Organic Dining'],
      images: ['https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80'],
      rooms: [{ title: 'Riverside Sacred Meditation Suite', pricePerNight: 3500 }],
    },
    {
      _id: 'mock_h5',
      name: 'Divine Ganga Cottage & Wellness Spa',
      destination: 'Rishikesh',
      address: 'Badrinath Road, Tapovan, Rishikesh',
      description: 'Luxury spiritual boutique stay offering panoramic Ganges river views.',
      starRating: 5,
      rating: 4.9,
      numReviews: 55,
      amenities: ['Ganga View Deck', 'Rooftop Yoga', 'Ayurvedic Massage'],
      images: ['https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80'],
      rooms: [{ title: 'Divine River Executive Suite', pricePerNight: 4200 }],
    },
    {
      _id: 'mock_h6',
      name: 'Laxman Jhula Spiritual River Haven',
      destination: 'Rishikesh',
      address: 'Near Laxman Jhula Bridge, Rishikesh',
      description: 'Cozy eco-stay walking distance from Ganga Aarti and yoga shalas.',
      starRating: 4,
      rating: 4.7,
      numReviews: 28,
      amenities: ['Free Meditation Class', 'High-Speed WiFi', 'Vegan Cafe'],
      images: ['https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=600&q=80'],
      rooms: [{ title: 'Spiritual Riverfront Room', pricePerNight: 2900 }],
    },
    // Dharamshala & Goa
    {
      _id: 'mock_h7',
      name: 'McLeod Ganj Heritage Alpine Villa',
      destination: 'Dharamshala',
      address: 'Bhagsunag Road, Dharamshala',
      description: 'Boutique heritage homestay overlooking Dhauladhar mountain ranges.',
      starRating: 4,
      rating: 4.85,
      numReviews: 29,
      amenities: ['Mountain View', 'Tibetan Tea Shala', 'Free WiFi'],
      images: ['https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80'],
      rooms: [{ title: 'Dhauladhar Alpine Room', pricePerNight: 3200 }],
    },
    {
      _id: 'mock_h8',
      name: 'Anjuna Beachfront Palm Villa',
      destination: 'Goa',
      address: 'Anjuna Beach Road, North Goa',
      description: 'Luxury tropical villa with direct beach access and private infinity pool.',
      starRating: 5,
      rating: 4.92,
      numReviews: 64,
      amenities: ['Private Beach Access', 'Infinity Pool', 'Cocktail Lounge'],
      images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80'],
      rooms: [{ title: 'Sea View Infinity Suite', pricePerNight: 5500 }],
    },
  ],
  restaurants: [
    // Rishikesh
    {
      _id: 'mock_r1',
      name: 'The Organic Sacred Cafe & Bakehouse',
      destination: 'Rishikesh',
      cuisine: ['Vegan', 'Organic Cafe', 'Continental'],
      address: 'Laxman Jhula Road, Rishikesh',
      description: 'Famous riverfront cafe offering woodfired vegan pizzas, matcha lattes, and fresh organic salads.',
      openingHours: '07:30 AM - 10:00 PM',
      priceRange: '$$',
      rating: 4.9,
      numReviews: 89,
      images: ['https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80'],
    },
    {
      _id: 'mock_r2',
      name: 'Beatles Cafe & Ganges Rooftop Bistro',
      destination: 'Rishikesh',
      cuisine: ['Organic Cafe', 'Smoothies', 'Italian', 'Vegan'],
      address: 'Paidal Marg, Tapovan, Rishikesh',
      description: 'Iconic Beatles-themed rooftop cafe serving ACAI bowls, woodfired pizzas, and specialty coffee.',
      openingHours: '08:00 AM - 10:30 PM',
      priceRange: '$$',
      rating: 4.85,
      numReviews: 110,
      images: ['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80'],
    },
    {
      _id: 'mock_r3',
      name: 'Little Buddha Riverfront Eatery',
      destination: 'Rishikesh',
      cuisine: ['Israeli', 'Healthy Bowls', 'Continental'],
      address: 'Laxman Jhula, Rishikesh',
      description: 'Treehouse-style tree bistro overlooking the Ganges with Israeli Shakshuka and falafel.',
      openingHours: '08:00 AM - 10:00 PM',
      priceRange: '$$',
      rating: 4.75,
      numReviews: 76,
      images: ['https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80'],
    },
    {
      _id: 'mock_r4',
      name: 'Chotiwala Traditional Satvik Thali',
      destination: 'Rishikesh',
      cuisine: ['North Indian', 'Satvik Pure Veg', 'Thali'],
      address: 'Swarg Ashram, Rishikesh',
      description: 'Legendary 60-year-old vegetarian dining spot serving authentic North Indian thalis and fresh lassi.',
      openingHours: '09:00 AM - 10:00 PM',
      priceRange: '$',
      rating: 4.7,
      numReviews: 140,
      images: ['https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'],
    },
    // Manali
    {
      _id: 'mock_r5',
      name: 'Chopsticks Himachali Heritage Kitchen',
      destination: 'Manali',
      cuisine: ['Himachali', 'North Indian', 'Tibetan'],
      address: 'Mall Road, Manali, HP',
      description: 'Authentic local Himachali Dham food, fresh mountain trout fish, and steaming momos.',
      openingHours: '11:00 AM - 10:30 PM',
      priceRange: '$$',
      rating: 4.8,
      numReviews: 54,
      images: ['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80'],
    },
    {
      _id: 'mock_r6',
      name: 'Cafe 1947 Old Manali Riverside',
      destination: 'Manali',
      cuisine: ['Italian', 'Continental', 'Craft Coffee'],
      address: 'Old Manali Village, HP',
      description: 'The first music cafe in Old Manali situated right next to the gushing Manalsu river.',
      openingHours: '10:00 AM - 11:00 PM',
      priceRange: '$$$',
      rating: 4.9,
      numReviews: 125,
      images: ['https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80'],
    },
    {
      _id: 'mock_r7',
      name: 'Tibet Kitchen & Bakery',
      destination: 'Dharamshala',
      cuisine: ['Tibetan', 'Vegan', 'Organic Cafe'],
      address: 'Main Square, McLeod Ganj, Dharamshala',
      description: 'Cozy Tibetan bistro serving fresh thukpa, tingmo, herbal butter tea, and vegan pastries.',
      openingHours: '08:00 AM - 09:30 PM',
      priceRange: '$',
      rating: 4.8,
      numReviews: 62,
      images: ['https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80'],
    },
  ],
  yogaCenters: [
    // Rishikesh
    {
      _id: 'mock_y1',
      title: 'Sunrise Ganges Kundalini Yoga & Sound Healing',
      category: 'yoga',
      destination: 'Rishikesh',
      location: 'High Bank Yoga Shala, Tapovan, Rishikesh',
      description: 'Rejuvenating morning yoga session overlooking the holy Ganges with singing bowl meditation.',
      duration: '2 Hours',
      pricePerPerson: 850,
      rating: 4.98,
      numReviews: 67,
      images: ['https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=600&q=80'],
    },
    {
      _id: 'mock_y2',
      title: 'Sacred Tapovan Hatha Yoga & Pranayama Shala',
      category: 'yoga',
      destination: 'Rishikesh',
      location: 'Paidal Marg, Tapovan, Rishikesh',
      description: 'Traditional Indian Hatha alignment class led by Himalayan certified master yogis.',
      duration: '1.5 Hours',
      pricePerPerson: 600,
      rating: 4.9,
      numReviews: 45,
      images: ['https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80'],
    },
    {
      _id: 'mock_y3',
      title: 'Anand Prakash Yoga Ashram & Chakra Balance Retreat',
      category: 'wellness',
      destination: 'Rishikesh',
      location: 'Tapovan High Bank, Rishikesh',
      description: '3-day holistic spiritual retreat with sattvic meals, mantra chanting, and chakra balancing.',
      duration: '3 Days',
      pricePerPerson: 5500,
      rating: 4.96,
      numReviews: 82,
      images: ['https://images.unsplash.com/photo-1510894347713-fc3ed6fdf539?auto=format&fit=crop&w=600&q=80'],
    },
    {
      _id: 'mock_y4',
      title: 'Ganga Aarti Evening Meditation & Tibetan Singing Bowls',
      category: 'wellness',
      destination: 'Rishikesh',
      location: 'Shatrughan Ghat, Rishikesh',
      description: 'Peaceful evening meditation session harmonized with Tibetan sound healing and Ganga lights.',
      duration: '1 Hour',
      pricePerPerson: 500,
      rating: 4.92,
      numReviews: 53,
      images: ['https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=600&q=80'],
    },
    // Dharamshala & Manali
    {
      _id: 'mock_y5',
      title: '3-Day Himalayan Holistic Yoga & Meditation Retreat',
      category: 'wellness',
      destination: 'Dharamshala',
      location: 'Bhagsunag, McLeod Ganj, Dharamshala',
      description: 'Immersive multi-day retreat featuring pranayama, organic sattvic meals, and guided mountain walks.',
      duration: '3 Days',
      pricePerPerson: 6500,
      rating: 4.95,
      numReviews: 41,
      images: ['https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80'],
    },
    {
      _id: 'mock_y6',
      title: 'Pine Forest Mountain Yoga & Cold Water Breathwork',
      category: 'yoga',
      destination: 'Manali',
      location: 'Hadimba Pine Sanctuary, Old Manali',
      description: 'Outdoor breathwork & Wim-Hof inspired cold mountain stream immersion.',
      duration: '2.5 Hours',
      pricePerPerson: 1500,
      rating: 4.88,
      numReviews: 29,
      images: ['https://images.unsplash.com/photo-1510894347713-fc3ed6fdf539?auto=format&fit=crop&w=600&q=80'],
    },
  ],
  activities: [
    // Rishikesh
    {
      _id: 'mock_a1',
      title: 'Ganges White Water Rafting Expedition (16 KM)',
      category: 'water_sports',
      destination: 'Rishikesh',
      location: 'Shivpuri Beach to Laxman Jhula, Rishikesh',
      description: 'Exhilarating Grade 3+ river rafting through Roller Coaster and Golf Course rapids.',
      duration: '3.5 Hours',
      pricePerPerson: 1200,
      rating: 4.92,
      numReviews: 145,
      images: ['https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=600&q=80'],
    },
    {
      _id: 'mock_a2',
      title: 'Shivpuri 24 KM Extreme Rapid Rafting & Cliff Jump',
      category: 'water_sports',
      destination: 'Rishikesh',
      location: 'Marine Drive to Rishikesh Ghat',
      description: 'The ultimate long-distance Grade 4 rafting challenge with 25-ft cliff jumping.',
      duration: '4.5 Hours',
      pricePerPerson: 1800,
      rating: 4.95,
      numReviews: 98,
      images: ['https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=600&q=80'],
    },
    {
      _id: 'mock_a3',
      title: 'Rishikesh Bungee Jumping High Altitude Flight (83 Meters)',
      category: 'adventure',
      destination: 'Rishikesh',
      location: 'Mohanchatti Jump Zone, Rishikesh',
      description: 'India’s highest fixed platform bungee jump with cantilever bridge and safety certificate.',
      duration: '2 Hours',
      pricePerPerson: 3750,
      rating: 4.98,
      numReviews: 210,
      images: ['https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&w=600&q=80'],
    },
    {
      _id: 'mock_a4',
      title: 'Neer Garh Waterfall Trek & Cliff Jumping Expedition',
      category: 'trekking',
      destination: 'Rishikesh',
      location: 'Neer Waterfall Trail, Rishikesh',
      description: 'Guided jungle trek to turquoise natural waterfall pools with cliff swimming.',
      duration: '3 Hours',
      pricePerPerson: 900,
      rating: 4.8,
      numReviews: 64,
      images: ['https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80'],
    },
    // Manali & Dharamshala
    {
      _id: 'mock_a5',
      title: 'Solang Valley Tandem Paragliding High Altitude Flight',
      category: 'adventure',
      destination: 'Manali',
      location: 'Solang Valley Jump Site, Manali',
      description: 'Fly high over snow-covered valleys with licensed tandem paragliding pilots and HD GoPro video recording.',
      duration: '45 Mins',
      pricePerPerson: 2500,
      rating: 4.88,
      numReviews: 112,
      images: ['https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&w=600&q=80'],
    },
    {
      _id: 'mock_a6',
      title: 'Hampta Pass Day Trek & Snow Gliding',
      category: 'trekking',
      destination: 'Manali',
      location: 'Jobri Base Camp, Manali',
      description: 'Day trek through pine glades leading to snow slopes and glaciated valleys.',
      duration: 'Full Day',
      pricePerPerson: 2200,
      rating: 4.9,
      numReviews: 78,
      images: ['https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80'],
    },
    {
      _id: 'mock_a7',
      title: 'Triund Snow Peak Overnight Camping & Trek',
      category: 'trekking',
      destination: 'Dharamshala',
      location: 'McLeod Ganj Base, Dharamshala',
      description: 'Famous ridge trek offering breathtaking views of Dhauladhar snow walls and starry night camping.',
      duration: '2 Days',
      pricePerPerson: 2800,
      rating: 4.94,
      numReviews: 160,
      images: ['https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&w=600&q=80'],
    },
  ],
  taxis: [
    // Rishikesh
    {
      _id: 'mock_t1',
      driverName: 'Rajesh Sharma',
      vehicleName: 'Toyota Innova Crysta Luxury',
      vehicleType: 'SUV',
      capacity: 7,
      destination: 'Rishikesh',
      pricePerKm: 19,
      dayPackageRate: 3800,
      rating: 4.8,
      images: ['https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80'],
    },
    {
      _id: 'mock_t2',
      driverName: 'Suresh Kumar',
      vehicleName: 'Maruti Dzire Executive Sedan',
      vehicleType: 'Sedan',
      capacity: 4,
      destination: 'Rishikesh',
      pricePerKm: 14,
      dayPackageRate: 2600,
      rating: 4.75,
      images: ['https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80'],
    },
    {
      _id: 'mock_t3',
      driverName: 'Ganga Tour Cabs',
      vehicleName: 'Tempo Traveller 12-Seater Luxury',
      vehicleType: 'Mini Bus',
      capacity: 12,
      destination: 'Rishikesh',
      pricePerKm: 28,
      dayPackageRate: 5500,
      rating: 4.9,
      images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80'],
    },
    // Manali & Dharamshala
    {
      _id: 'mock_t4',
      driverName: 'Vikram Singh',
      vehicleName: 'Mahindra Scorpio 4x4 Offroader',
      vehicleType: '4x4 Offroader',
      capacity: 6,
      destination: 'Manali',
      pricePerKm: 22,
      dayPackageRate: 4200,
      rating: 4.9,
      images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80'],
    },
    {
      _id: 'mock_t5',
      driverName: 'Manali Snow Cabs',
      vehicleName: 'Mahindra Thar 4x4 Snow King',
      vehicleType: '4x4 Offroader',
      capacity: 4,
      destination: 'Manali',
      pricePerKm: 25,
      dayPackageRate: 4800,
      rating: 4.95,
      images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80'],
    },
    {
      _id: 'mock_t6',
      driverName: 'Tenzin Norbu',
      vehicleName: 'Hyundai Creta SUV',
      vehicleType: 'SUV',
      capacity: 5,
      destination: 'Dharamshala',
      pricePerKm: 18,
      dayPackageRate: 3500,
      rating: 4.85,
      images: ['https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80'],
    },
  ],
};

export default function ExplorePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const urlCategory = searchParams.get('category') || 'All';
  const urlDestination = searchParams.get('destination') || 'All';
  const urlQuery = searchParams.get('query') || '';

  const [category, setCategory] = useState(urlCategory);
  const [destination, setDestination] = useState(urlDestination || 'All');
  const [searchQuery, setSearchQuery] = useState(urlQuery);

  // Sync state when URL params change
  useEffect(() => {
    setCategory(searchParams.get('category') || 'All');
    setDestination(searchParams.get('destination') || 'All');
    setSearchQuery(searchParams.get('query') || '');
  }, [searchParams]);

  // Booking Modal State
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemType, setItemType] = useState('hotel');
  const [modalOpen, setModalOpen] = useState(false);

  const { data: response, isLoading } = useGetExploreListingsQuery({
    category: category === 'All' ? '' : category,
    destination: destination === 'All' ? '' : destination,
    search: searchQuery,
  });

  // Filter helper for fallback mock listings
  const filterMockList = (list) => {
    if (!list) return [];
    return list.filter((item) => {
      let matchDest = true;
      let matchQuery = true;
      if (destination && destination !== 'All') {
        matchDest = item.destination.toLowerCase() === destination.toLowerCase();
      }
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const name = (item.name || item.title || item.vehicleName || '').toLowerCase();
        const desc = (item.description || '').toLowerCase();
        matchQuery = name.includes(q) || desc.includes(q) || item.destination.toLowerCase().includes(q);
      }
      return matchDest && matchQuery;
    });
  };

  const rawData = response?.data;

  // Merge API data with mock fallback listings so every filter combination has multiple choices
  const combineListings = (apiList, mockListKey) => {
    const mockFiltered = filterMockList(MOCK_LISTINGS[mockListKey]);
    const apiFiltered = apiList || [];
    // Combine unique items by name / title / vehicleName
    const combined = [...apiFiltered];
    mockFiltered.forEach((mockItem) => {
      const mockName = mockItem.name || mockItem.title || mockItem.vehicleName;
      if (!combined.some((item) => (item.name || item.title || item.vehicleName) === mockName)) {
        combined.push(mockItem);
      }
    });
    return combined;
  };

  const listings = {
    hotels: combineListings(rawData?.hotels, 'hotels'),
    restaurants: combineListings(rawData?.restaurants, 'restaurants'),
    activities: combineListings(rawData?.activities, 'activities'),
    yogaCenters: combineListings(rawData?.yogaCenters, 'yogaCenters'),
    taxis: combineListings(rawData?.taxis, 'taxis'),
  };

  // Calculate total items matching current category filter
  let visibleHotels = (category === 'All' || category === 'hotel') ? listings.hotels : [];
  let visibleYoga = (category === 'All' || category === 'yoga') ? listings.yogaCenters : [];
  let visibleRestaurants = (category === 'All' || category === 'restaurant') ? listings.restaurants : [];
  let visibleActivities = (category === 'All' || category === 'activity') ? listings.activities : [];
  let visibleTaxis = (category === 'All' || category === 'taxi') ? listings.taxis : [];

  const totalItems =
    visibleHotels.length + visibleYoga.length + visibleRestaurants.length + visibleActivities.length + visibleTaxis.length;

  const updateFilters = (newCategory, newDestination, newQuery) => {
    setCategory(newCategory);
    setDestination(newDestination);
    setSearchQuery(newQuery);

    const params = {};
    if (newCategory && newCategory !== 'All') params.category = newCategory;
    if (newDestination && newDestination !== 'All') params.destination = newDestination;
    if (newQuery) params.query = newQuery;
    setSearchParams(params);
  };

  const handleResetFilters = () => {
    updateFilters('All', 'All', '');
  };

  const handleOpenBooking = (item, type) => {
    setSelectedItem(item);
    setItemType(type);
    setModalOpen(true);
  };

  const destinationsList = ['All', 'Manali', 'Rishikesh', 'Dharamshala', 'Goa', 'Jaipur'];
  const categoriesList = [
    { label: 'All Services', value: 'All', icon: Filter },
    { label: 'Hotels & Resorts', value: 'hotel', icon: Hotel },
    { label: 'Restaurants & Cafes', value: 'restaurant', icon: Utensils },
    { label: 'Yoga & Meditation', value: 'yoga', icon: Sparkles },
    { label: 'Outdoor Activities', value: 'activity', icon: Sparkles },
    { label: 'Taxi & Transport', value: 'taxi', icon: Car },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      {/* Hero Banner & Search Filter Header */}
      <section className="bg-gradient-to-br from-slate-900 via-brand-950 to-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 shadow-xl">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <Badge variant="amber" className="px-3 py-1 text-xs uppercase tracking-widest">
              Live Himalayan Directory
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Explore Hotels, Cafes, Yoga & Activity Centers
            </h1>
            <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
              Discover verified accommodations, organic dining spots, sacred yoga retreats, adventure sports, and 4x4 cabs.
            </p>
          </div>

          {/* Search Bar & Destination Filter */}
          <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md p-3 rounded-3xl border border-white/15 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => updateFilters(category, destination, e.target.value)}
                placeholder="Search hotels, yoga centers, cafes, paragliding..."
                className="w-full pl-12 pr-4 py-3 bg-white text-slate-900 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium text-sm"
              />
            </div>

            <div className="relative sm:w-56">
              <MapPin className="w-5 h-5 text-brand-600 absolute left-4 top-3.5 z-10" />
              <select
                value={destination}
                onChange={(e) => updateFilters(category, e.target.value, searchQuery)}
                className="w-full pl-12 pr-8 py-3 bg-white text-slate-900 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500 font-semibold text-sm appearance-none cursor-pointer"
              >
                {destinationsList.map((d) => (
                  <option key={d} value={d}>
                    {d === 'All' ? 'All Destinations' : d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categoriesList.map((cat) => {
              const Icon = cat.icon;
              const active = category === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => updateFilters(cat.value, destination, searchQuery)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    active
                      ? 'bg-brand-600 text-white shadow-lg shadow-brand-900/50 scale-105'
                      : 'bg-white/10 hover:bg-white/20 text-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content Listings Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-12">
        {isLoading ? (
          <div className="text-center py-20">
            <div className="inline-block w-10 h-10 border-4 border-brand-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-slate-500 font-medium">Fetching verified listings...</p>
          </div>
        ) : totalItems === 0 ? (
          /* Empty State Handler */
          <div className="max-w-md mx-auto my-12 text-center p-8 bg-white rounded-3xl border border-slate-200 shadow-md space-y-4">
            <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
              <Frown className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">No Listings Found</h3>
            <p className="text-slate-500 text-sm">
              We couldn't find any listings matching category <span className="font-bold text-slate-800">"{category}"</span> in destination <span className="font-bold text-slate-800">"{destination}"</span>.
            </p>
            <Button variant="primary" icon={RotateCcw} onClick={handleResetFilters} className="mx-auto">
              Clear All Filters & View All
            </Button>
          </div>
        ) : (
          <>
            {/* 1. HOTELS SECTION */}
            {visibleHotels.length > 0 && (
              <section className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2">
                    <Hotel className="w-6 h-6 text-brand-600" />
                    <h2 className="text-2xl font-bold text-slate-900">Hotels & Resorts</h2>
                  </div>
                  <Badge variant="emerald">{visibleHotels.length} Available</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {visibleHotels.map((hotel) => (
                    <Card key={hotel._id} className="flex flex-col">
                      <div className="relative h-48 bg-slate-200">
                        <img
                          src={hotel.images?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80'}
                          alt={hotel.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-slate-800 flex items-center gap-1 shadow">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{hotel.rating || 4.8}</span>
                        </div>
                        <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs text-white font-medium flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-brand-400" />
                          <span>{hotel.destination}</span>
                        </div>
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 line-clamp-1">{hotel.name}</h3>
                          <p className="text-xs text-slate-500 mt-1 line-clamp-2">{hotel.description}</p>

                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {hotel.amenities?.slice(0, 3).map((amenity, idx) => (
                              <Badge key={idx} variant="gray">
                                {amenity}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                          <div>
                            <span className="text-xs text-slate-400">Starting from</span>
                            <div className="text-lg font-extrabold text-brand-700 flex items-center">
                              <IndianRupee className="w-4 h-4" />
                              <span>{hotel.rooms?.[0]?.pricePerNight || 3500}</span>
                              <span className="text-xs text-slate-500 font-normal">/night</span>
                            </div>
                          </div>
                          <Button variant="primary" size="sm" onClick={() => handleOpenBooking(hotel, 'hotel')}>
                            Reserve Room
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* 2. YOGA & WELLNESS CENTERS SECTION */}
            {visibleYoga.length > 0 && (
              <section className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-purple-600" />
                    <h2 className="text-2xl font-bold text-slate-900">Yoga & Meditation Centers</h2>
                  </div>
                  <Badge variant="purple">{visibleYoga.length} Retreats</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {visibleYoga.map((item) => (
                    <Card key={item._id} className="flex flex-col border-purple-100 bg-gradient-to-b from-purple-50/20 to-white">
                      <div className="relative h-48 bg-slate-200">
                        <img
                          src={item.images?.[0] || 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=600&q=80'}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <Badge variant="purple" className="absolute top-3 left-3 shadow">
                          Yoga & Wellness
                        </Badge>
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-slate-800 flex items-center gap-1 shadow">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{item.rating || 4.9}</span>
                        </div>
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div>
                          <div className="flex items-center gap-1.5 text-xs text-purple-700 font-bold uppercase tracking-wider mb-1">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{item.destination} • {item.duration}</span>
                          </div>
                          <h3 className="text-lg font-bold text-slate-900 line-clamp-1">{item.title}</h3>
                          <p className="text-xs text-slate-500 mt-1 line-clamp-2">{item.description}</p>
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                          <div>
                            <span className="text-xs text-slate-400">Session Fee</span>
                            <div className="text-lg font-extrabold text-purple-700 flex items-center">
                              <IndianRupee className="w-4 h-4" />
                              <span>{item.pricePerPerson}</span>
                              <span className="text-xs text-slate-500 font-normal">/person</span>
                            </div>
                          </div>
                          <Button variant="accent" size="sm" onClick={() => handleOpenBooking(item, 'activity')}>
                            Join Session
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* 3. RESTAURANTS & CAFES SECTION */}
            {visibleRestaurants.length > 0 && (
              <section className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2">
                    <Utensils className="w-6 h-6 text-amber-600" />
                    <h2 className="text-2xl font-bold text-slate-900">Restaurants & Organic Cafes</h2>
                  </div>
                  <Badge variant="amber">{visibleRestaurants.length} Spot Listings</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {visibleRestaurants.map((rest) => (
                    <Card key={rest._id} className="flex flex-col">
                      <div className="relative h-48 bg-slate-200">
                        <img
                          src={rest.images?.[0] || 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80'}
                          alt={rest.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-slate-800 flex items-center gap-1 shadow">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{rest.rating || 4.7}</span>
                        </div>
                        <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs text-white font-medium flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-amber-400" />
                          <span>{rest.destination}</span>
                        </div>
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 line-clamp-1">{rest.name}</h3>
                          <p className="text-xs text-slate-500 mt-1 line-clamp-2">{rest.description}</p>
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {rest.cuisine?.map((c, idx) => (
                              <Badge key={idx} variant="amber">
                                {c}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                          <div>
                            <span className="text-xs text-slate-400">Timing</span>
                            <div className="text-xs font-bold text-slate-800">{rest.openingHours}</div>
                          </div>
                          <Button variant="outline" size="sm" onClick={() => handleOpenBooking(rest, 'restaurant')}>
                            Book Table
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* 4. ADVENTURE ACTIVITIES SECTION */}
            {visibleActivities.length > 0 && (
              <section className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-brand-600" />
                    <h2 className="text-2xl font-bold text-slate-900">Adventure Activity Centers</h2>
                  </div>
                  <Badge variant="emerald">{visibleActivities.length} Activities</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {visibleActivities.map((act) => (
                    <Card key={act._id} className="flex flex-col">
                      <div className="relative h-48 bg-slate-200">
                        <img
                          src={act.images?.[0] || 'https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&w=600&q=80'}
                          alt={act.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-slate-800 flex items-center gap-1 shadow">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{act.rating || 4.9}</span>
                        </div>
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div>
                          <div className="text-xs font-bold text-brand-600 uppercase tracking-wider mb-1">
                            {act.destination} • {act.duration}
                          </div>
                          <h3 className="text-lg font-bold text-slate-900 line-clamp-1">{act.title}</h3>
                          <p className="text-xs text-slate-500 mt-1 line-clamp-2">{act.description}</p>
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                          <div>
                            <span className="text-xs text-slate-400">Price per person</span>
                            <div className="text-lg font-extrabold text-brand-700 flex items-center">
                              <IndianRupee className="w-4 h-4" />
                              <span>{act.pricePerPerson}</span>
                            </div>
                          </div>
                          <Button variant="primary" size="sm" onClick={() => handleOpenBooking(act, 'activity')}>
                            Book Slot
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* 5. TAXIS SECTION */}
            {visibleTaxis.length > 0 && (
              <section className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2">
                    <Car className="w-6 h-6 text-blue-600" />
                    <h2 className="text-2xl font-bold text-slate-900">Taxi & Mountain Cabs</h2>
                  </div>
                  <Badge variant="blue">{visibleTaxis.length} Fleet Cabs</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {visibleTaxis.map((taxi) => (
                    <Card key={taxi._id} className="flex flex-col">
                      <div className="relative h-48 bg-slate-200">
                        <img
                          src={taxi.images?.[0] || 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80'}
                          alt={taxi.vehicleName}
                          className="w-full h-full object-cover"
                        />
                        <Badge variant="blue" className="absolute top-3 left-3 shadow">
                          {taxi.vehicleType}
                        </Badge>
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div>
                          <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
                            Driver: {taxi.driverName} ({taxi.destination})
                          </div>
                          <h3 className="text-lg font-bold text-slate-900">{taxi.vehicleName}</h3>
                          <p className="text-xs text-slate-500 mt-1">
                            Capacity: {taxi.capacity} Passengers • Rates: ₹{taxi.pricePerKm}/KM
                          </p>
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                          <div>
                            <span className="text-xs text-slate-400">Day Package</span>
                            <div className="text-lg font-extrabold text-blue-700 flex items-center">
                              <IndianRupee className="w-4 h-4" />
                              <span>{taxi.dayPackageRate}</span>
                            </div>
                          </div>
                          <Button variant="primary" size="sm" onClick={() => handleOpenBooking(taxi, 'taxi')}>
                            Book Ride
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>

      <Footer />

      {/* Booking Modal */}
      <BookingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        item={selectedItem}
        itemType={itemType}
      />
    </div>
  );
}

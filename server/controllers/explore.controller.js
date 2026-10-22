const Hotel = require('../models/Hotel');
const Restaurant = require('../models/Restaurant');
const Activity = require('../models/Activity');
const Taxi = require('../models/Taxi');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');

// Expanded Mock Listings Dataset
const MOCK_HOTELS = [
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
    images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'],
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
    images: ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80'],
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
    images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'],
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
    images: ['https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'],
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
    images: ['https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80'],
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
    images: ['https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80'],
    rooms: [{ title: 'Spiritual Riverfront Room', pricePerNight: 2900 }],
  },
  // Dharamshala
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
    images: ['https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80'],
    rooms: [{ title: 'Dhauladhar Alpine Room', pricePerNight: 3200 }],
  },
  {
    _id: 'mock_h8',
    name: 'Dhauladhar Snow Peak Retreat',
    destination: 'Dharamshala',
    address: 'Naddi Village, Dharamshala',
    description: 'Peaceful mountain resort located at Naddi sunset viewpoint.',
    starRating: 4,
    rating: 4.8,
    numReviews: 34,
    amenities: ['Sunset Terrace', 'Fireplace', 'Bonfire Dinners'],
    images: ['https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80'],
    rooms: [{ title: 'Sunset View Suite', pricePerNight: 3600 }],
  },
  // Goa & Jaipur
  {
    _id: 'mock_h9',
    name: 'Anjuna Beachfront Palm Villa',
    destination: 'Goa',
    address: 'Anjuna Beach Road, North Goa',
    description: 'Luxury tropical villa with direct beach access and private infinity pool.',
    starRating: 5,
    rating: 4.92,
    numReviews: 64,
    amenities: ['Private Beach Access', 'Infinity Pool', 'Cocktail Lounge'],
    images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'],
    rooms: [{ title: 'Sea View Infinity Suite', pricePerNight: 5500 }],
  },
  {
    _id: 'mock_h10',
    name: 'Jaipur Heritage Palace & Courtyard',
    destination: 'Jaipur',
    address: 'Amer Road, Jaipur, Rajasthan',
    description: 'Authentic 18th-century Rajputana palace hotel with royal courtyards.',
    starRating: 5,
    rating: 4.95,
    numReviews: 78,
    amenities: ['Royal Courtyard', 'Folk Music Dinners', 'Heritage Spa'],
    images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'],
    rooms: [{ title: 'Royal Rajputana Heritage Suite', pricePerNight: 5800 }],
  },
];

const MOCK_RESTAURANTS = [
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
    images: ['https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80'],
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
    images: ['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'],
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
    images: ['https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'],
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
    images: ['https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'],
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
    images: ['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'],
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
    images: ['https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80'],
  },
  {
    _id: 'mock_r7',
    name: 'Dylan’s Toasted & Roasted Coffee House',
    destination: 'Manali',
    cuisine: ['Bakery', 'Coffee', 'Continental'],
    address: 'Old Manali Road, Manali',
    description: 'World famous for freshly baked cinnamon rolls, cookies, and rich espresso coffee.',
    openingHours: '08:00 AM - 09:00 PM',
    priceRange: '$',
    rating: 4.88,
    numReviews: 94,
    images: ['https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80'],
  },
  // Dharamshala & Goa
  {
    _id: 'mock_r8',
    name: 'Tibet Kitchen & Bakery',
    destination: 'Dharamshala',
    cuisine: ['Tibetan', 'Vegan', 'Organic Cafe'],
    address: 'Main Square, McLeod Ganj, Dharamshala',
    description: 'Cozy Tibetan bistro serving fresh thukpa, tingmo, herbal butter tea, and vegan pastries.',
    openingHours: '08:00 AM - 09:30 PM',
    priceRange: '$',
    rating: 4.8,
    numReviews: 62,
    images: ['https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'],
  },
  {
    _id: 'mock_r9',
    name: 'Curlies Beach Shack & Seafood Grill',
    destination: 'Goa',
    cuisine: ['Seafood', 'Goan', 'Continental'],
    address: 'Anjuna Beach, North Goa',
    description: 'Iconic oceanfront beach shack famous for Goan fish curry, grilled lobsters, and sunset tunes.',
    openingHours: '08:30 AM - 02:00 AM',
    priceRange: '$$',
    rating: 4.75,
    numReviews: 180,
    images: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'],
  },
];

const MOCK_YOGA = [
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
    images: ['https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80'],
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
    images: ['https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80'],
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
    images: ['https://images.unsplash.com/photo-1510894347713-fc3ed6fdf539?auto=format&fit=crop&w=800&q=80'],
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
    images: ['https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80'],
  },
  // Dharamshala & Manali & Goa
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
    images: ['https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80'],
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
    images: ['https://images.unsplash.com/photo-1510894347713-fc3ed6fdf539?auto=format&fit=crop&w=800&q=80'],
  },
  {
    _id: 'mock_y7',
    title: 'Anjuna Sunset Beach Yoga & Sound Healing',
    category: 'wellness',
    destination: 'Goa',
    location: 'Anjuna Ocean Deck, North Goa',
    description: 'Gentle sunset Vinyasa flow listening to ocean waves followed by gong sound bath.',
    duration: '1.5 Hours',
    pricePerPerson: 1000,
    rating: 4.9,
    numReviews: 38,
    images: ['https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80'],
  },
];

const MOCK_ACTIVITIES = [
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
    images: ['https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=800&q=80'],
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
    images: ['https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=800&q=80'],
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
    images: ['https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&w=800&q=80'],
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
    images: ['https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80'],
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
    images: ['https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&w=800&q=80'],
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
    images: ['https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80'],
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
    images: ['https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&w=800&q=80'],
  },
];

const MOCK_TAXIS = [
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
    images: ['https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80'],
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
    images: ['https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80'],
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
    images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80'],
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
    images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80'],
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
    images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80'],
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
    images: ['https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80'],
  },
];

// GET /api/v1/explore - Unified listing & search endpoint
exports.getAllListings = asyncHandler(async (req, res) => {
  const { category, destination, search, limit = 50 } = req.query;

  let queryFilter = {};

  if (destination && destination !== 'All') {
    queryFilter.destination = new RegExp(destination, 'i');
  }

  if (search) {
    queryFilter.$or = [
      { name: new RegExp(search, 'i') },
      { title: new RegExp(search, 'i') },
      { vehicleName: new RegExp(search, 'i') },
      { destination: new RegExp(search, 'i') },
    ];
  }

  let hotels = [];
  let restaurants = [];
  let activities = [];
  let yogaCenters = [];
  let taxis = [];

  try {
    if (!category || category === 'All' || category === 'hotel') {
      hotels = await Hotel.find(queryFilter).limit(Number(limit));
    }

    if (!category || category === 'All' || category === 'restaurant') {
      restaurants = await Restaurant.find(queryFilter).limit(Number(limit));
    }

    if (!category || category === 'All' || category === 'activity') {
      const actFilter = { ...queryFilter, category: { $ne: 'yoga' } };
      activities = await Activity.find(actFilter).limit(Number(limit));
    }

    if (!category || category === 'All' || category === 'yoga') {
      const yogaFilter = { ...queryFilter, category: { $in: ['yoga', 'wellness'] } };
      yogaCenters = await Activity.find(yogaFilter).limit(Number(limit));
    }

    if (!category || category === 'All' || category === 'taxi') {
      taxis = await Taxi.find(queryFilter).limit(Number(limit));
    }
  } catch (err) {
    console.error('Database query error, using fallback mock listings:', err);
  }

  // Filter helper for fallback mock data
  const filterMock = (arr) => {
    return arr.filter((item) => {
      let matchesDest = true;
      let matchesSearch = true;

      if (destination && destination !== 'All') {
        matchesDest = item.destination.toLowerCase() === destination.toLowerCase();
      }

      if (search) {
        const s = search.toLowerCase();
        const name = (item.name || item.title || item.vehicleName || '').toLowerCase();
        const desc = (item.description || '').toLowerCase();
        matchesSearch = name.includes(s) || desc.includes(s) || item.destination.toLowerCase().includes(s);
      }

      return matchesDest && matchesSearch;
    });
  };

  // Merge fallback mock data so every category and destination has multiple rich options
  const mockHotelsFiltered = filterMock(MOCK_HOTELS);
  const mockRestaurantsFiltered = filterMock(MOCK_RESTAURANTS);
  const mockYogaFiltered = filterMock(MOCK_YOGA);
  const mockActivitiesFiltered = filterMock(MOCK_ACTIVITIES);
  const mockTaxisFiltered = filterMock(MOCK_TAXIS);

  if (hotels.length < mockHotelsFiltered.length && (!category || category === 'All' || category === 'hotel')) {
    hotels = [...hotels, ...mockHotelsFiltered.filter((m) => !hotels.some((h) => h.name === m.name))];
  }
  if (restaurants.length < mockRestaurantsFiltered.length && (!category || category === 'All' || category === 'restaurant')) {
    restaurants = [...restaurants, ...mockRestaurantsFiltered.filter((m) => !restaurants.some((r) => r.name === m.name))];
  }
  if (yogaCenters.length < mockYogaFiltered.length && (!category || category === 'All' || category === 'yoga')) {
    yogaCenters = [...yogaCenters, ...mockYogaFiltered.filter((m) => !yogaCenters.some((y) => y.title === m.title))];
  }
  if (activities.length < mockActivitiesFiltered.length && (!category || category === 'All' || category === 'activity')) {
    activities = [...activities, ...mockActivitiesFiltered.filter((m) => !activities.some((a) => a.title === m.title))];
  }
  if (taxis.length < mockTaxisFiltered.length && (!category || category === 'All' || category === 'taxi')) {
    taxis = [...taxis, ...mockTaxisFiltered.filter((m) => !taxis.some((t) => t.vehicleName === m.vehicleName))];
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        hotels,
        restaurants,
        activities,
        yogaCenters,
        taxis,
        summary: {
          totalHotels: hotels.length,
          totalRestaurants: restaurants.length,
          totalActivities: activities.length,
          totalYogaCenters: yogaCenters.length,
          totalTaxis: taxis.length,
        },
      },
      'All listings fetched successfully'
    )
  );
});

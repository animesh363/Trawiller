const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const User = require('../models/User');
const VendorProfile = require('../models/VendorProfile');
const Hotel = require('../models/Hotel');
const Restaurant = require('../models/Restaurant');
const Activity = require('../models/Activity');
const Taxi = require('../models/Taxi');
const Booking = require('../models/Booking');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/trawiller';

async function seedData() {
  try {
    console.log('Connecting to MongoDB:', MONGODB_URI);
    await mongoose.connect(MONGODB_URI);
    console.log('Connected! Clearing existing test data...');

    await User.deleteMany({});
    await VendorProfile.deleteMany({});
    await Hotel.deleteMany({});
    await Restaurant.deleteMany({});
    await Activity.deleteMany({});
    await Taxi.deleteMany({});
    await Booking.deleteMany({});

    console.log('Creating demo users...');

    // 1. Tourist User
    const tourist = await User.create({
      name: 'Aarav Sharma',
      email: 'tourist@trawiller.com',
      phone: '+919876543210',
      password: 'password123',
      role: 'tourist',
      isEmailVerified: true,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    });

    // 2. Hotel Vendor
    const hotelVendor = await User.create({
      name: 'Rohan Verma',
      email: 'hotel@trawiller.com',
      phone: '+919812345678',
      password: 'password123',
      role: 'hotel',
      isEmailVerified: true,
    });

    await VendorProfile.create({
      user: hotelVendor._id,
      businessName: 'The Grand Himalayan Sanctuary',
      registrationNumber: 'HP-HTL-2024-88',
      category: 'hotel',
      destination: 'Manali',
      address: 'Old Manali Village, Near Manu Temple, HP',
      verificationStatus: 'verified',
    });

    // 3. Restaurant Vendor
    const restaurantVendor = await User.create({
      name: 'Priya Nair',
      email: 'restaurant@trawiller.com',
      phone: '+919823456789',
      password: 'password123',
      role: 'restaurant',
      isEmailVerified: true,
    });

    await VendorProfile.create({
      user: restaurantVendor._id,
      businessName: 'Himalayan Organic Cafe & Bistro',
      registrationNumber: 'UK-RST-2024-42',
      category: 'restaurant',
      destination: 'Rishikesh',
      address: 'Laxman Jhula Main Road, Rishikesh, Uttarakhand',
      verificationStatus: 'verified',
    });

    // 3b. Second Restaurant Vendor (Goa / South India)
    const restaurantVendor2 = await User.create({
      name: 'Carlos Fernandes',
      email: 'restaurant2@trawiller.com',
      phone: '+919856781234',
      password: 'password123',
      role: 'restaurant',
      isEmailVerified: true,
    });

    await VendorProfile.create({
      user: restaurantVendor2._id,
      businessName: 'Spice & Sea Goa Coastal Kitchen',
      registrationNumber: 'GA-RST-2024-77',
      category: 'restaurant',
      destination: 'Goa',
      address: 'Baga Beach Road, North Goa',
      verificationStatus: 'verified',
    });

    // 4. Activity & Yoga Vendor
    const activityVendor = await User.create({
      name: 'Swami Dhyan Yogi',
      email: 'activity@trawiller.com',
      phone: '+919834567890',
      password: 'password123',
      role: 'activity',
      isEmailVerified: true,
    });

    await VendorProfile.create({
      user: activityVendor._id,
      businessName: 'Ananda Sacred Yoga & Adventure Hub',
      registrationNumber: 'UK-ACT-2024-101',
      category: 'activity',
      destination: 'Rishikesh',
      address: 'Tapovan High Bank, Rishikesh, Uttarakhand',
      verificationStatus: 'verified',
    });

    // 4b. Second Activity Vendor (Goa / Rajasthan)
    const activityVendor2 = await User.create({
      name: 'Arjun Mehta',
      email: 'activity2@trawiller.com',
      phone: '+919876123450',
      password: 'password123',
      role: 'activity',
      isEmailVerified: true,
    });

    await VendorProfile.create({
      user: activityVendor2._id,
      businessName: 'Rajasthan Desert & Goa Sea Adventures',
      registrationNumber: 'RJ-ACT-2024-55',
      category: 'activity',
      destination: 'Jaisalmer',
      address: 'Sam Sand Dunes Road, Jaisalmer, Rajasthan',
      verificationStatus: 'verified',
    });

    // 5. Taxi Driver Vendor
    const taxiVendor = await User.create({
      name: 'Vikram Singh',
      email: 'taxi@trawiller.com',
      phone: '+919845678901',
      password: 'password123',
      role: 'taxi',
      isEmailVerified: true,
    });

    await VendorProfile.create({
      user: taxiVendor._id,
      businessName: 'Himalayan 4x4 Mountain Express Cabs',
      registrationNumber: 'HP-TAX-2024-15',
      category: 'taxi',
      destination: 'Manali',
      address: 'Mall Road Taxi Stand, Manali, HP',
      verificationStatus: 'verified',
    });

    // 5b. Second Taxi Vendor (South / West India)
    const taxiVendor2 = await User.create({
      name: 'Suresh Nambiar',
      email: 'taxi2@trawiller.com',
      phone: '+919812349876',
      password: 'password123',
      role: 'taxi',
      isEmailVerified: true,
    });

    await VendorProfile.create({
      user: taxiVendor2._id,
      businessName: 'Kerala & Goa Coastal Cab Services',
      registrationNumber: 'KL-TAX-2024-33',
      category: 'taxi',
      destination: 'Munnar',
      address: 'Munnar Bus Stand, Kerala',
      verificationStatus: 'verified',
    });

    // 6. Admin User
    const admin = await User.create({
      name: 'Trawiller Admin',
      email: 'admin@trawiller.com',
      phone: '+919999999999',
      password: 'password123',
      role: 'admin',
      isEmailVerified: true,
    });

    console.log('Seeding Hotels...');
    await Hotel.create([
      // ── MANALI ──────────────────────────────────────────────────────────
      {
        vendor: hotelVendor._id,
        name: 'The Grand Himalayan Resort & Spa',
        destination: 'Manali',
        address: 'Old Manali, Near Beas River, HP',
        description: 'Luxury eco-resort nestled amidst pine forests with panoramic views of snow-capped peaks.',
        starRating: 5,
        rating: 4.9,
        numReviews: 48,
        amenities: ['Free High-Speed WiFi', 'Heated Outdoor Pool', 'Spiritual Spa', 'Fireplace', 'Mountain View Balcony', 'Free Breakfast'],
        images: [
          'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
        ],
        rooms: [
          {
            title: 'Himalayan View Deluxe Suite',
            type: 'suite',
            pricePerNight: 4500,
            capacity: 2,
            amenities: ['King Bed', 'Private Balcony', 'Jacuzzi', 'Fireplace'],
            images: ['https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80'],
          },
          {
            title: 'Pine Forest Standard Cottage',
            type: 'double',
            pricePerNight: 2800,
            capacity: 2,
            amenities: ['Queen Bed', 'Free WiFi', 'Tea Maker'],
            images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'],
          },
          {
            title: 'Snow Peak Family Chalet',
            type: 'family',
            pricePerNight: 5800,
            capacity: 4,
            amenities: ['2 Bedrooms', 'Living Area', 'Kitchenette', 'Mountain View', 'Fireplace'],
            images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80'],
          },
        ],
      },
      {
        vendor: hotelVendor._id,
        name: 'Snow Crest Boutique Inn',
        destination: 'Manali',
        address: 'Naggar Road, Near Hadimba Temple, Manali, HP',
        description: 'Charming boutique inn with cosy wooden interiors, valley views, and complimentary apple orchards strolls.',
        starRating: 3,
        rating: 4.6,
        numReviews: 61,
        amenities: ['Free WiFi', 'Bonfire Area', 'Home-cooked Meals', 'Orchard Garden', 'Parking'],
        images: [
          'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=800&q=80',
        ],
        rooms: [
          {
            title: 'Valley View Standard Room',
            type: 'single',
            pricePerNight: 1600,
            capacity: 1,
            amenities: ['Single Bed', 'Heater', 'Hot Water'],
            images: ['https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=800&q=80'],
          },
          {
            title: 'Apple Orchard Double Room',
            type: 'double',
            pricePerNight: 2400,
            capacity: 2,
            amenities: ['Queen Bed', 'Garden View', 'Free WiFi'],
            images: ['https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=800&q=80'],
          },
        ],
      },
      // ── RISHIKESH ───────────────────────────────────────────────────────
      {
        vendor: hotelVendor._id,
        name: 'Ganges View Yoga & Wellness Eco Lodge',
        destination: 'Rishikesh',
        address: 'Tapovan, Above Laxman Jhula, Rishikesh',
        description: 'Serene riverside retreat focused on yoga, organic vegetarian dining, and sound meditation.',
        starRating: 4,
        rating: 4.8,
        numReviews: 32,
        amenities: ['Yoga Shala', 'River View', 'Ayurvedic Spa', 'Organic Dining', 'Free Meditation Sessions'],
        images: [
          'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
        ],
        rooms: [
          {
            title: 'Riverside Sacred Meditation Suite',
            type: 'suite',
            pricePerNight: 3500,
            capacity: 2,
            amenities: ['Ganges View Balcony', 'Organic Linens', 'Aroma Diffuser'],
            images: ['https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80'],
          },
          {
            title: 'Forest Retreat Standard Room',
            type: 'single',
            pricePerNight: 1800,
            capacity: 1,
            amenities: ['Single Bed', 'Jungle View', 'Mosquito Net'],
            images: ['https://images.unsplash.com/photo-1549294413-26f195200c16?auto=format&fit=crop&w=800&q=80'],
          },
        ],
      },
      // ── GOA ─────────────────────────────────────────────────────────────
      {
        vendor: hotelVendor._id,
        name: 'Azure Beachfront Villas & Pool Resort',
        destination: 'Goa',
        address: 'Calangute–Candolim Beach Road, North Goa',
        description: 'Tropical beachfront resort with private pool villas, sunset deck dining, and watersports hub.',
        starRating: 5,
        rating: 4.85,
        numReviews: 103,
        amenities: ['Private Pool', 'Beach Access', 'Rooftop Bar', 'Waterfront Dining', 'Free Kayaking', 'Spa & Wellness'],
        images: [
          'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80',
        ],
        rooms: [
          {
            title: 'Garden Pool Villa',
            type: 'suite',
            pricePerNight: 8500,
            capacity: 2,
            amenities: ['Private Plunge Pool', 'King Bed', 'Outdoor Rain Shower', 'Minibar'],
            images: ['https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80'],
          },
          {
            title: 'Sea-Facing Deluxe Room',
            type: 'double',
            pricePerNight: 5200,
            capacity: 2,
            amenities: ['Ocean View Balcony', 'King Bed', 'Free Breakfast', 'Air Conditioning'],
            images: ['https://images.unsplash.com/photo-1631049552240-59c37f38802b?auto=format&fit=crop&w=800&q=80'],
          },
          {
            title: 'Beachside Family Suite',
            type: 'family',
            pricePerNight: 9800,
            capacity: 4,
            amenities: ['2 Bedrooms', 'Private Garden', 'Direct Beach Path', 'Kids Pool'],
            images: ['https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?auto=format&fit=crop&w=800&q=80'],
          },
        ],
      },
      // ── JAIPUR ──────────────────────────────────────────────────────────
      {
        vendor: hotelVendor._id,
        name: 'Regal Haveli Palace Hotel',
        destination: 'Jaipur',
        address: 'Civil Lines, Near Jal Mahal, Jaipur, Rajasthan',
        description: 'Heritage palace hotel blending Mughal architecture with modern luxury, featuring a rooftop pool and cultural performances.',
        starRating: 5,
        rating: 4.93,
        numReviews: 77,
        amenities: ['Rooftop Pool', 'Heritage Dining', 'Cultural Dance Shows', 'City Palace View', 'Elephant Rides', 'Spa'],
        images: [
          'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80',
        ],
        rooms: [
          {
            title: 'Maharaja Royal Suite',
            type: 'suite',
            pricePerNight: 12000,
            capacity: 2,
            amenities: ['Four-Poster King Bed', 'Private Courtyard', 'Rooftop Access', 'Butler Service'],
            images: ['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80'],
          },
          {
            title: 'Pink City Deluxe Room',
            type: 'double',
            pricePerNight: 5500,
            capacity: 2,
            amenities: ['Jharokha Window', 'Hand-carved Furniture', 'A/C', 'Free Breakfast'],
            images: ['https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80'],
          },
        ],
      },
      // ── SHIMLA ──────────────────────────────────────────────────────────
      {
        vendor: hotelVendor._id,
        name: 'Colonial Ridge Manor',
        destination: 'Shimla',
        address: 'The Ridge, Cart Road, Shimla, HP',
        description: 'Victorian-era colonial manor perched on Shimla Ridge, offering period furnishings, log fireplaces, and panoramic valley views.',
        starRating: 4,
        rating: 4.72,
        numReviews: 44,
        amenities: ['Ridge Walk Access', 'Fireplace Lounge', 'British Era Dining', 'Free WiFi', 'Mountain View Terrace'],
        images: [
          'https://images.unsplash.com/photo-1562790351-d273a961e0e9?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=800&q=80',
        ],
        rooms: [
          {
            title: 'Heritage Fireplace Suite',
            type: 'suite',
            pricePerNight: 6200,
            capacity: 2,
            amenities: ['Log Fireplace', 'Antique Furniture', 'Valley View', 'Claw-foot Bathtub'],
            images: ['https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=800&q=80'],
          },
          {
            title: 'Standard Colonial Room',
            type: 'single',
            pricePerNight: 2900,
            capacity: 1,
            amenities: ['Single Bed', 'Heritage Decor', 'Mountain View', 'Heater'],
            images: ['https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80'],
          },
        ],
      },
      // ── MUNNAR ──────────────────────────────────────────────────────────
      {
        vendor: hotelVendor._id,
        name: 'Tea Valley Plantation Retreat',
        destination: 'Munnar',
        address: 'Mattupetty Road, Near Kundaly Lake, Munnar, Kerala',
        description: 'Eco-friendly plantation retreat surrounded by lush tea estates with private cottages, spice garden tours, and Ayurvedic spa.',
        starRating: 4,
        rating: 4.81,
        numReviews: 58,
        amenities: ['Tea Plantation View', 'Spice Garden Tour', 'Ayurvedic Massage', 'Bonfire', 'Bird Watching', 'Organic Farm Meals'],
        images: [
          'https://images.unsplash.com/photo-1586611292717-f828b167408c?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=800&q=80',
        ],
        rooms: [
          {
            title: 'Tea Planter\'s Heritage Bungalow',
            type: 'suite',
            pricePerNight: 7500,
            capacity: 4,
            amenities: ['Full Private Bungalow', 'Tea Estate View', 'Sit-out Veranda', 'Butler Service'],
            images: ['https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=80'],
          },
          {
            title: 'Misty Hills Deluxe Cottage',
            type: 'double',
            pricePerNight: 3800,
            capacity: 2,
            amenities: ['King Bed', 'Valley View', 'Sit-out', 'Complimentary Tea Tasting'],
            images: ['https://images.unsplash.com/photo-1540541338537-1220059d4069?auto=format&fit=crop&w=800&q=80'],
          },
        ],
      },
      // ── VARANASI ────────────────────────────────────────────────────────
      {
        vendor: hotelVendor._id,
        name: 'Ganges Ghat Heritage Haveli',
        destination: 'Varanasi',
        address: 'Assi Ghat, Varanasi, Uttar Pradesh',
        description: 'Ancient haveli overlooking Assi Ghat with rooftop sunrise views of the sacred Ganges ghats and evening Ganga Aarti.',
        starRating: 3,
        rating: 4.65,
        numReviews: 93,
        amenities: ['Ghat View Rooftop', 'Sunrise Boat Ride', 'Ayurvedic Therapy', 'Organic Sattvic Meals', 'Free WiFi'],
        images: [
          'https://images.unsplash.com/photo-1549760055-18f9aca0be6b?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1561501900-3701fa6a0864?auto=format&fit=crop&w=800&q=80',
        ],
        rooms: [
          {
            title: 'Ghat View Premium Room',
            type: 'double',
            pricePerNight: 3200,
            capacity: 2,
            amenities: ['Ganges Ghat View', 'Rooftop Access', 'A/C', 'Traditional Decor'],
            images: ['https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80'],
          },
          {
            title: 'Budget Pilgrim Room',
            type: 'single',
            pricePerNight: 1200,
            capacity: 1,
            amenities: ['Single Bed', 'Shared Terrace', 'Fan', 'Hot Water'],
            images: ['https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80'],
          },
        ],
      },
    ]);

    console.log('Seeding Restaurants...');
    await Restaurant.create([
      // ── RISHIKESH ───────────────────────────────────────────────────────
      {
        vendor: restaurantVendor._id,
        name: 'The Organic Sacred Cafe & Bakehouse',
        destination: 'Rishikesh',
        cuisine: ['Vegan', 'Organic Cafe', 'Continental', 'Fresh Juices'],
        address: 'Laxman Jhula Road, Rishikesh',
        description: 'Famous riverfront cafe offering woodfired vegan pizzas, matcha lattes, and fresh organic salads.',
        openingHours: '07:30 AM - 10:00 PM',
        priceRange: '$$',
        rating: 4.9,
        numReviews: 89,
        images: ['https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80'],
        menu: [
          { name: 'Woodfired Truffle & Mushroom Pizza', category: 'Main Course', price: 420, isVeg: true },
          { name: 'Cold Pressed Himalayan Green Detox Juice', category: 'Beverage', price: 180, isVeg: true },
          { name: 'Avocado & Sourdough Toast with Seeds', category: 'Starter', price: 290, isVeg: true },
          { name: 'Quinoa & Roasted Veggie Buddha Bowl', category: 'Main Course', price: 380, isVeg: true },
          { name: 'Cinnamon Oat Banana Pancakes', category: 'Breakfast', price: 220, isVeg: true },
        ],
      },
      {
        vendor: restaurantVendor._id,
        name: 'Ganga Kinare River Dhaba & Chai House',
        destination: 'Rishikesh',
        cuisine: ['North Indian', 'Street Food', 'Chai & Snacks'],
        address: 'Ram Jhula Road, Muni Ki Reti, Rishikesh',
        description: 'Authentic riverside dhaba serving piping-hot pakoras, masala chai, and hearty North Indian thalis.',
        openingHours: '08:00 AM - 11:00 PM',
        priceRange: '$',
        rating: 4.75,
        numReviews: 121,
        images: ['https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=800&q=80'],
        menu: [
          { name: 'Dal Makhani with Garlic Naan', category: 'Main Course', price: 220, isVeg: true },
          { name: 'Mixed Pakora Platter with Chutneys', category: 'Starter', price: 150, isVeg: true },
          { name: 'Masala Cutting Chai (2 Cups)', category: 'Beverage', price: 60, isVeg: true },
          { name: 'Paneer Butter Masala', category: 'Main Course', price: 260, isVeg: true },
        ],
      },
      // ── MANALI ──────────────────────────────────────────────────────────
      {
        vendor: restaurantVendor._id,
        name: 'Chopsticks Himachali Heritage Kitchen',
        destination: 'Manali',
        cuisine: ['Himachali', 'North Indian', 'Tibetan'],
        address: 'Mall Road, Manali, HP',
        description: 'Authentic local Himachali Dham food, fresh mountain trout fish, and steaming momos.',
        openingHours: '11:00 AM - 10:30 PM',
        priceRange: '$$',
        rating: 4.7,
        numReviews: 54,
        images: ['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'],
        menu: [
          { name: 'Traditional Himachali Dham Thali', category: 'Main Course', price: 350, isVeg: true },
          { name: 'Pan-Seared Fresh River Trout Fish', category: 'Main Course', price: 550, isVeg: false },
          { name: 'Steamed Tibetan Butter Momos', category: 'Starter', price: 190, isVeg: true },
          { name: 'Thenthuk Noodle Soup', category: 'Main Course', price: 240, isVeg: true },
          { name: 'Siddu with Ghee & Chutney', category: 'Starter', price: 130, isVeg: true },
        ],
      },
      // ── GOA ─────────────────────────────────────────────────────────────
      {
        vendor: restaurantVendor2._id,
        name: 'Thalassa Sunset Greek & Seafood Bar',
        destination: 'Goa',
        cuisine: ['Seafood', 'Mediterranean', 'Cocktails', 'Grill'],
        address: 'Small Vagator Beach Hilltop, North Goa',
        description: 'Award-winning cliff-top restaurant with 270° sunset views, grilled seafood platters, and premium cocktails.',
        openingHours: '12:00 PM - 12:00 AM',
        priceRange: '$$$',
        rating: 4.85,
        numReviews: 203,
        images: ['https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80'],
        menu: [
          { name: 'Grilled Tiger Prawns with Garlic Butter', category: 'Main Course', price: 780, isVeg: false },
          { name: 'Thalassa Fish & Chips with Dill Aioli', category: 'Main Course', price: 620, isVeg: false },
          { name: 'Mediterranean Mezze Platter', category: 'Starter', price: 480, isVeg: true },
          { name: 'Sunset Sangria Jug', category: 'Beverage', price: 850, isVeg: true },
          { name: 'Mango & Coconut Panna Cotta', category: 'Dessert', price: 290, isVeg: true },
        ],
      },
      {
        vendor: restaurantVendor2._id,
        name: 'Viva Panjim Authentic Goan Kitchen',
        destination: 'Goa',
        cuisine: ['Goan', 'Konkani', 'Seafood', 'Portuguese'],
        address: '31 January Road, Fontainhas Latin Quarter, Panjim',
        description: 'Family-run restaurant in the heritage Fontainhas quarter serving traditional Goan Xacuti, Sorpotel, and Fish Curry Rice.',
        openingHours: '11:30 AM - 03:30 PM | 07:00 PM - 11:00 PM',
        priceRange: '$$',
        rating: 4.8,
        numReviews: 147,
        images: ['https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'],
        menu: [
          { name: 'Goan Fish Curry with Steamed Rice', category: 'Main Course', price: 380, isVeg: false },
          { name: 'Pork Sorpotel with Sanna Bread', category: 'Main Course', price: 420, isVeg: false },
          { name: 'Prawn Balchão on Pão', category: 'Starter', price: 310, isVeg: false },
          { name: 'Bebinca Goan Layered Pudding', category: 'Dessert', price: 180, isVeg: true },
          { name: 'Fenni Cocktail (Cashew Spirit)', category: 'Beverage', price: 220, isVeg: true },
        ],
      },
      // ── JAIPUR ──────────────────────────────────────────────────────────
      {
        vendor: restaurantVendor2._id,
        name: 'Suvarna Palace Rajasthani Thali & Dining',
        destination: 'Jaipur',
        cuisine: ['Rajasthani', 'North Indian', 'Mughlai', 'Royal Cuisine'],
        address: 'MI Road, Near Ajmeri Gate, Jaipur',
        description: 'Royal dining experience with unlimited Rajasthani Thali, live folk music, and Rajput-era decor.',
        openingHours: '12:00 PM - 11:00 PM',
        priceRange: '$$',
        rating: 4.82,
        numReviews: 178,
        images: ['https://images.unsplash.com/photo-1530062845289-9109b2c9c868?auto=format&fit=crop&w=800&q=80'],
        menu: [
          { name: 'Royal Unlimited Rajasthani Thali', category: 'Main Course', price: 550, isVeg: true },
          { name: 'Dal Baati Churma', category: 'Main Course', price: 340, isVeg: true },
          { name: 'Laal Maas (Spicy Lamb Curry)', category: 'Main Course', price: 480, isVeg: false },
          { name: 'Pyaaz Kachori with Tamarind Chutney', category: 'Starter', price: 120, isVeg: true },
          { name: 'Gulab Jamun with Rabri', category: 'Dessert', price: 140, isVeg: true },
        ],
      },
      // ── MUNNAR ──────────────────────────────────────────────────────────
      {
        vendor: restaurantVendor2._id,
        name: 'Spice Garden Kerala Sadya House',
        destination: 'Munnar',
        cuisine: ['Kerala', 'South Indian', 'Seafood', 'Ayurvedic'],
        address: 'Market Road, Munnar Town, Kerala',
        description: 'Authentic Kerala Sadya served on banana leaf with 20+ vegetarian dishes, fish moilee, and karimeen pollichathu.',
        openingHours: '07:00 AM - 09:30 PM',
        priceRange: '$',
        rating: 4.77,
        numReviews: 95,
        images: ['https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'],
        menu: [
          { name: 'Kerala Vegetarian Sadya (Banana Leaf)', category: 'Main Course', price: 280, isVeg: true },
          { name: 'Karimeen Pollichathu (Pearl Spot Fish)', category: 'Main Course', price: 460, isVeg: false },
          { name: 'Kerala Prawn Curry with Appam', category: 'Main Course', price: 420, isVeg: false },
          { name: 'Masala Dosa with Coconut Chutney', category: 'Breakfast', price: 110, isVeg: true },
          { name: 'Fresh Cardamom Tea', category: 'Beverage', price: 60, isVeg: true },
        ],
      },
      // ── VARANASI ────────────────────────────────────────────────────────
      {
        vendor: restaurantVendor._id,
        name: 'Kashi Chaat Bhandar & Heritage Sweets',
        destination: 'Varanasi',
        cuisine: ['Street Food', 'Chaat', 'Indian Sweets', 'North Indian'],
        address: 'Dashashwamedh Ghat Road, Varanasi',
        description: 'Iconic Varanasi street-food joint famous for tamatar chaat, banarasi paan, and melt-in-mouth malaiyyo.',
        openingHours: '06:00 AM - 10:00 PM',
        priceRange: '$',
        rating: 4.71,
        numReviews: 209,
        images: ['https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80'],
        menu: [
          { name: 'Tamatar Chaat (Varanasi Specialty)', category: 'Starter', price: 80, isVeg: true },
          { name: 'Kachori Sabzi', category: 'Breakfast', price: 70, isVeg: true },
          { name: 'Malaiyyo (Winter Sweet Cream Dessert)', category: 'Dessert', price: 90, isVeg: true },
          { name: 'Banarasi Thandai (Spiced Milk)', category: 'Beverage', price: 100, isVeg: true },
          { name: 'Sweet Paan with Gulkand', category: 'Dessert', price: 50, isVeg: true },
        ],
      },
    ]);

    console.log('Seeding Activity Centers & Yoga Centers...');
    await Activity.create([
      // ── RISHIKESH ───────────────────────────────────────────────────────
      {
        vendor: activityVendor._id,
        title: 'Sunrise Ganges Kundalini Yoga & Sound Healing',
        category: 'yoga',
        destination: 'Rishikesh',
        location: 'High Bank Yoga Shala, Tapovan, Rishikesh',
        description: 'Rejuvenating morning yoga session overlooking the holy Ganges with singing bowl meditation.',
        duration: '2 Hours',
        pricePerPerson: 850,
        maxGroupSize: 20,
        difficulty: 'Easy',
        inclusions: ['Yoga Mat provided', 'Herbal Detox Tea', 'Sound Healing Session', 'Certified Yoga Instructor'],
        rating: 4.98,
        numReviews: 67,
        featured: true,
        images: ['https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80'],
      },
      {
        vendor: activityVendor._id,
        title: 'Ganges White Water Rafting Expedition (16 KM)',
        category: 'water_sports',
        destination: 'Rishikesh',
        location: 'Shivpuri Beach to Laxman Jhula, Rishikesh',
        description: 'Exhilarating Grade 3+ river rafting through Roller Coaster and Golf Course rapids.',
        duration: '3.5 Hours',
        pricePerPerson: 1200,
        maxGroupSize: 8,
        difficulty: 'Moderate',
        inclusions: ['Life Jacket & Helmet', 'Professional River Guide', 'Cliff Jumping Session', 'Safety Kayaker'],
        rating: 4.92,
        numReviews: 145,
        featured: true,
        images: ['https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=800&q=80'],
      },
      {
        vendor: activityVendor._id,
        title: 'Bungee Jumping at Mohan Chatti (83m)',
        category: 'adventure',
        destination: 'Rishikesh',
        location: 'Mohan Chatti Village, 15 km from Rishikesh',
        description: 'India\'s highest fixed platform bungee jump at 83 metres above the Ganges river gorge.',
        duration: '2 Hours',
        pricePerPerson: 3500,
        maxGroupSize: 6,
        difficulty: 'Challenging',
        inclusions: ['Safety Harness', 'Professional Jump Masters', 'Video Recording', 'T-shirt Certificate'],
        rating: 4.95,
        numReviews: 88,
        featured: true,
        images: ['https://images.unsplash.com/photo-1601024445121-e5b82f020549?auto=format&fit=crop&w=800&q=80'],
      },
      // ── DHARAMSHALA ─────────────────────────────────────────────────────
      {
        vendor: activityVendor._id,
        title: '3-Day Himalayan Holistic Yoga & Meditation Retreat',
        category: 'wellness',
        destination: 'Dharamshala',
        location: 'Bhagsunag, McLeod Ganj, Dharamshala',
        description: 'Immersive multi-day retreat featuring pranayama, organic sattvic meals, and guided mountain walks.',
        duration: '3 Days',
        pricePerPerson: 6500,
        maxGroupSize: 12,
        difficulty: 'Easy',
        inclusions: ['3 Days Accommodation', 'All Organic Meals', 'Daily 2x Yoga Classes', 'Meditation Workshop'],
        rating: 4.95,
        numReviews: 41,
        featured: true,
        images: ['https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80'],
      },
      {
        vendor: activityVendor._id,
        title: 'Triund Trek & Overnight Camping',
        category: 'trekking',
        destination: 'Dharamshala',
        location: 'McLeod Ganj Trailhead, Dharamshala',
        description: 'Scenic day trek to Triund Ridge (2,875m) with stunning Dhauladhar range views and overnight bonfire camping.',
        duration: '2 Days / 1 Night',
        pricePerPerson: 2200,
        maxGroupSize: 15,
        difficulty: 'Moderate',
        inclusions: ['Camping Tent & Sleeping Bag', 'Bonfire', 'Guide', 'Dinner & Breakfast', 'Emergency First Aid'],
        rating: 4.88,
        numReviews: 73,
        featured: false,
        images: ['https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80'],
      },
      // ── MANALI ──────────────────────────────────────────────────────────
      {
        vendor: activityVendor._id,
        title: 'Solang Valley Tandem Paragliding High Altitude Flight',
        category: 'adventure',
        destination: 'Manali',
        location: 'Solang Valley Jump Site, Manali',
        description: 'Fly high over snow-covered valleys with licensed tandem paragliding pilots and HD GoPro video recording.',
        duration: '45 Mins',
        pricePerPerson: 2500,
        maxGroupSize: 10,
        difficulty: 'Moderate',
        inclusions: ['Safety Gear & Helmet', 'Certified Tandem Pilot', 'GoPro 4K Video Recording', 'Valley Transport'],
        rating: 4.88,
        numReviews: 112,
        featured: true,
        images: ['https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&w=800&q=80'],
      },
      {
        vendor: activityVendor._id,
        title: 'Rohtang Pass Snow Adventure Day Tour',
        category: 'adventure',
        destination: 'Manali',
        location: 'Rohtang La Pass (3,978m), Manali',
        description: 'Full-day excursion to Rohtang Pass with snow activities including sledding, snowball fights, and yak rides.',
        duration: '8 Hours',
        pricePerPerson: 1800,
        maxGroupSize: 20,
        difficulty: 'Easy',
        inclusions: ['4x4 Transport', 'Snow Gear Rental', 'Packed Lunch', 'Guide', 'Rohtang Permit'],
        rating: 4.76,
        numReviews: 96,
        featured: false,
        images: ['https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80'],
      },
      // ── GOA ─────────────────────────────────────────────────────────────
      {
        vendor: activityVendor2._id,
        title: 'Dolphin Watching & Snorkelling at Grand Island',
        category: 'water_sports',
        destination: 'Goa',
        location: 'Mormugao Harbour Jetty, South Goa',
        description: 'Half-day boat tour to spot wild dolphins, snorkel over vibrant coral reefs, and swim at secluded beaches.',
        duration: '4 Hours',
        pricePerPerson: 1500,
        maxGroupSize: 25,
        difficulty: 'Easy',
        inclusions: ['Speedboat Transfer', 'Snorkelling Gear', 'Life Jacket', 'Light Refreshments', 'Certified Guide'],
        rating: 4.83,
        numReviews: 234,
        featured: true,
        images: ['https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80'],
      },
      {
        vendor: activityVendor2._id,
        title: 'Goa Spice Plantation Tour & Elephant Bath',
        category: 'cultural',
        destination: 'Goa',
        location: 'Sahakari Spice Farm, Ponda, Goa',
        description: 'Guided tour through a working spice farm learning about Goan spices, followed by elephant bathing and traditional Goan lunch.',
        duration: '4 Hours',
        pricePerPerson: 1200,
        maxGroupSize: 30,
        difficulty: 'Easy',
        inclusions: ['Guided Farm Walk', 'Elephant Bath Activity', 'Traditional Goan Lunch', 'Feni Tasting', 'Spice Souvenir'],
        rating: 4.69,
        numReviews: 161,
        featured: false,
        images: ['https://images.unsplash.com/photo-1585325701956-60dd9c8399f0?auto=format&fit=crop&w=800&q=80'],
      },
      // ── JAISALMER ────────────────────────────────────────────────────────
      {
        vendor: activityVendor2._id,
        title: 'Sam Sand Dunes Camel Safari & Desert Camp',
        category: 'adventure',
        destination: 'Jaisalmer',
        location: 'Sam Sand Dunes, 42 km from Jaisalmer Fort',
        description: 'Sunset camel safari across golden Thar Desert dunes followed by overnight luxury camp with Rajasthani folk music.',
        duration: '1 Night / 2 Days',
        pricePerPerson: 3800,
        maxGroupSize: 20,
        difficulty: 'Easy',
        inclusions: ['Camel Safari', 'Luxury Desert Camp', 'Dinner & Breakfast', 'Folk Music Show', 'Stargazing Session'],
        rating: 4.91,
        numReviews: 187,
        featured: true,
        images: ['https://images.unsplash.com/photo-1493962853295-0fd70327578a?auto=format&fit=crop&w=800&q=80'],
      },
      {
        vendor: activityVendor2._id,
        title: 'Jaipur Royal Heritage Walk & Cooking Class',
        category: 'cultural',
        destination: 'Jaipur',
        location: 'Amber Fort & Old City Bazaars, Jaipur',
        description: 'Walk through Jaipur\'s heritage lanes, visit Amber Fort, and learn to cook authentic Rajasthani dishes with a royal family chef.',
        duration: '6 Hours',
        pricePerPerson: 2800,
        maxGroupSize: 10,
        difficulty: 'Easy',
        inclusions: ['Heritage Walking Guide', 'Amber Fort Entry', 'Cooking Class', 'All Ingredients', 'Rajasthani Lunch', 'Recipe Card'],
        rating: 4.87,
        numReviews: 62,
        featured: false,
        images: ['https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80'],
      },
      // ── MUNNAR ──────────────────────────────────────────────────────────
      {
        vendor: activityVendor2._id,
        title: 'Munnar Tea Plantation Trek & Factory Tour',
        category: 'trekking',
        destination: 'Munnar',
        location: 'Kolukkumalai Tea Estate (highest in world), Munnar',
        description: 'Trek through high-altitude tea terraces to Kolukkumalai (8,000 ft), visit century-old tea factory, and enjoy fresh brew.',
        duration: '5 Hours',
        pricePerPerson: 1600,
        maxGroupSize: 18,
        difficulty: 'Moderate',
        inclusions: ['Trek Guide', 'Factory Tour', 'Tea Tasting Session', 'Packed Snacks', 'Jeep to Base Camp'],
        rating: 4.84,
        numReviews: 79,
        featured: false,
        images: ['https://images.unsplash.com/photo-1563911302283-d2bc129e7570?auto=format&fit=crop&w=800&q=80'],
      },
      // ── VARANASI ────────────────────────────────────────────────────────
      {
        vendor: activityVendor2._id,
        title: 'Ganga Aarti Ceremony & Sacred Boat Sunrise Tour',
        category: 'cultural',
        destination: 'Varanasi',
        location: 'Dashashwamedh Ghat, Varanasi',
        description: 'Witness the spectacular evening Ganga Aarti from a private boat, followed by sunrise ghats rowing tour with a Pandit guide.',
        duration: '3 Hours',
        pricePerPerson: 900,
        maxGroupSize: 12,
        difficulty: 'Easy',
        inclusions: ['Private Wooden Boat', 'Flower & Lamp Ritual Kit', 'Pandit Heritage Guide', 'Chai & Snacks', 'Photography Help'],
        rating: 4.97,
        numReviews: 312,
        featured: true,
        images: ['https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=800&q=80'],
      },
    ]);

    console.log('Seeding Taxis...');
    await Taxi.create([
      // ── MANALI ──────────────────────────────────────────────────────────
      {
        vendor: taxiVendor._id,
        driverName: 'Vikram Singh',
        vehicleName: 'Mahindra Scorpio 4x4 Offroader',
        vehicleType: '4x4 Offroader',
        capacity: 6,
        destination: 'Manali',
        pricePerKm: 22,
        dayPackageRate: 4200,
        rating: 4.9,
        numReviews: 38,
        contactPhone: '+919845678901',
        images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80'],
        routes: [
          { origin: 'Manali Mall Road', destination: 'Solang Valley & Atal Tunnel', price: 2500 },
          { origin: 'Manali', destination: 'Rohtang Pass Tour', price: 4500 },
          { origin: 'Manali', destination: 'Kasol & Manikaran', price: 3800 },
          { origin: 'Chandigarh', destination: 'Manali (One Way)', price: 5200 },
        ],
      },
      {
        vendor: taxiVendor._id,
        driverName: 'Gurpreet Thakur',
        vehicleName: 'Force Gurkha Mountain Edition',
        vehicleType: '4x4 Offroader',
        capacity: 4,
        destination: 'Manali',
        pricePerKm: 25,
        dayPackageRate: 4800,
        rating: 4.85,
        numReviews: 22,
        contactPhone: '+919812009876',
        images: ['https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80'],
        routes: [
          { origin: 'Manali', destination: 'Spiti Valley via Kunzum Pass', price: 9500 },
          { origin: 'Manali', destination: 'Lahaul Valley Full Day', price: 5500 },
          { origin: 'Kullu Airport', destination: 'Manali Hotel Drop', price: 1800 },
        ],
      },
      // ── RISHIKESH ───────────────────────────────────────────────────────
      {
        vendor: taxiVendor._id,
        driverName: 'Rajesh Sharma',
        vehicleName: 'Toyota Innova Crysta Luxury',
        vehicleType: 'SUV',
        capacity: 7,
        destination: 'Rishikesh',
        pricePerKm: 19,
        dayPackageRate: 3800,
        rating: 4.8,
        numReviews: 29,
        contactPhone: '+919811223344',
        images: ['https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80'],
        routes: [
          { origin: 'Dehradun Airport (DED)', destination: 'Rishikesh Hotel', price: 1800 },
          { origin: 'Rishikesh', destination: 'Neelkanth Mahadev Temple', price: 2200 },
          { origin: 'Rishikesh', destination: 'Haridwar Ganga Aarti Tour', price: 2000 },
          { origin: 'Rishikesh', destination: 'Jim Corbett National Park', price: 4200 },
        ],
      },
      {
        vendor: taxiVendor._id,
        driverName: 'Deepak Rawat',
        vehicleName: 'Maruti Suzuki Ertiga CNG',
        vehicleType: 'Mini Bus',
        capacity: 6,
        destination: 'Rishikesh',
        pricePerKm: 14,
        dayPackageRate: 2800,
        rating: 4.7,
        numReviews: 18,
        contactPhone: '+919834876543',
        images: ['https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&w=800&q=80'],
        routes: [
          { origin: 'Rishikesh', destination: 'Bungee Jump Site Mohan Chatti', price: 900 },
          { origin: 'Rishikesh', destination: 'Shivpuri Rafting Start Point', price: 600 },
          { origin: 'Haridwar Railway Station', destination: 'Rishikesh', price: 1200 },
        ],
      },
      // ── GOA ─────────────────────────────────────────────────────────────
      {
        vendor: taxiVendor2._id,
        driverName: 'Savio D\'Souza',
        vehicleName: 'Toyota Etios AC Sedan',
        vehicleType: 'Sedan',
        capacity: 4,
        destination: 'Goa',
        pricePerKm: 16,
        dayPackageRate: 3000,
        rating: 4.75,
        numReviews: 47,
        contactPhone: '+919823344556',
        images: ['https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&w=800&q=80'],
        routes: [
          { origin: 'Goa Airport (GOI)', destination: 'North Goa Beach Hotels', price: 1400 },
          { origin: 'Panjim', destination: 'Calangute, Baga, Anjuna Beach Strip', price: 1000 },
          { origin: 'Goa', destination: 'Hampi Heritage Day Trip', price: 7500 },
          { origin: 'Goa', destination: 'Dudhsagar Waterfalls Full Day', price: 3500 },
        ],
      },
      // ── JAIPUR ──────────────────────────────────────────────────────────
      {
        vendor: taxiVendor2._id,
        driverName: 'Ramchandra Gupta',
        vehicleName: 'Mahindra Marazzo Premium',
        vehicleType: 'Mini Bus',
        capacity: 7,
        destination: 'Jaipur',
        pricePerKm: 17,
        dayPackageRate: 3500,
        rating: 4.82,
        numReviews: 35,
        contactPhone: '+919829988776',
        images: ['https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80'],
        routes: [
          { origin: 'Jaipur Airport', destination: 'Hotel in Jaipur City', price: 1500 },
          { origin: 'Jaipur', destination: 'Amber Fort & Jaigarh Full Day', price: 2000 },
          { origin: 'Jaipur', destination: 'Ranthambore National Park', price: 4800 },
          { origin: 'Jaipur', destination: 'Pushkar Day Trip', price: 2800 },
        ],
      },
      // ── MUNNAR ──────────────────────────────────────────────────────────
      {
        vendor: taxiVendor2._id,
        driverName: 'Suresh Nambiar',
        vehicleName: 'Toyota Crysta Kerala Touring',
        vehicleType: 'SUV',
        capacity: 7,
        destination: 'Munnar',
        pricePerKm: 18,
        dayPackageRate: 3600,
        rating: 4.88,
        numReviews: 51,
        contactPhone: '+919812349876',
        images: ['https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=800&q=80'],
        routes: [
          { origin: 'Cochin Airport (COK)', destination: 'Munnar Hotels', price: 2800 },
          { origin: 'Munnar', destination: 'Eravikulam National Park', price: 1200 },
          { origin: 'Munnar', destination: 'Alleppey Houseboat (One Way)', price: 4500 },
          { origin: 'Munnar', destination: 'Thekkady Periyar Wildlife Sanctuary', price: 2200 },
        ],
      },
    ]);

    console.log('Seeding Sample Booking...');
    const sampleHotel = await Hotel.findOne({ name: 'The Grand Himalayan Resort & Spa' });
    if (sampleHotel) {
      await Booking.create({
        tourist: tourist._id,
        vendor: hotelVendor._id,
        itemType: 'hotel',
        itemId: sampleHotel._id,
        itemTitle: 'The Grand Himalayan Resort & Spa - Himalayan View Deluxe Suite',
        destination: 'Manali',
        startDate: new Date(),
        endDate: new Date(Date.now() + 86400000 * 2),
        guests: 2,
        totalAmount: 9000,
        status: 'confirmed',
        paymentStatus: 'paid',
        notes: 'Honeymoon couple, please decorate room with fresh flowers.',
      });
    }

    console.log('\n🎉 SUCCESS: Data seed completed successfully!');
    console.log('----------------------------------------------------');
    console.log('Demo Credentials for Login:');
    console.log('1.  Tourist User       : email: tourist@trawiller.com    | password: password123');
    console.log('2.  Hotel Vendor       : email: hotel@trawiller.com      | password: password123');
    console.log('3.  Restaurant Vendor  : email: restaurant@trawiller.com | password: password123');
    console.log('3b. Restaurant Vendor2 : email: restaurant2@trawiller.com| password: password123');
    console.log('4.  Activity/Yoga      : email: activity@trawiller.com   | password: password123');
    console.log('4b. Activity Vendor2   : email: activity2@trawiller.com  | password: password123');
    console.log('5.  Taxi Vendor        : email: taxi@trawiller.com       | password: password123');
    console.log('5b. Taxi Vendor2       : email: taxi2@trawiller.com      | password: password123');
    console.log('6.  Admin              : email: admin@trawiller.com      | password: password123');
    console.log('----------------------------------------------------');
    console.log('\n📊 Seed Summary:');
    console.log('  Hotels      : 8 (Manali x2, Rishikesh, Goa, Jaipur, Shimla, Munnar, Varanasi)');
    console.log('  Restaurants : 8 (Rishikesh x2, Manali, Goa x2, Jaipur, Munnar, Varanasi)');
    console.log('  Activities  : 12 (Rishikesh x3, Dharamshala x2, Manali x2, Goa x2, Jaisalmer x2, Munnar, Varanasi)');
    console.log('  Taxis       : 7 (Manali x2, Rishikesh x2, Goa, Jaipur, Munnar)');
    console.log('----------------------------------------------------');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error during database seed:', error);
    process.exit(1);
  }
}

seedData();

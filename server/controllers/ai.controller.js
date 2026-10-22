const { GoogleGenerativeAI } = require('@google/generative-ai');
const Hotel = require('../models/Hotel');
const Restaurant = require('../models/Restaurant');
const Activity = require('../models/Activity');
const Taxi = require('../models/Taxi');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

/**
 * POST /api/v1/ai/travel-plan
 * Body: { message: "I am in Delhi and want to go to Manali for 3 days" }
 * Returns: { plan: { text, hotels, restaurants, activities, taxis, destination } }
 */
exports.generateTravelPlan = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || message.trim().length < 5) {
      return res.status(400).json({ success: false, message: 'Please describe your travel request.' });
    }

    // ── 1. Detect destination from message using Gemini ──────────────────────
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const detectPrompt = `
You are a travel assistant for India. From the message below, extract ONLY the destination the user wants to VISIT (not where they are coming from).
Reply with JUST the city name, nothing else. Must be one of: Manali, Rishikesh, Dharamshala, Goa, Jaipur, Shimla, Munnar, Varanasi, Jaisalmer.
If none match, reply "Manali".
Message: "${message}"`;

    const destResult = await model.generateContent(detectPrompt);
    const destination = destResult.response.text().trim().replace(/[^a-zA-Z]/g, '');

    // ── 2. Fetch real DB listings for that destination ────────────────────────
    const [hotels, restaurants, activities, taxis] = await Promise.all([
      Hotel.find({ destination: { $regex: destination, $options: 'i' } }).limit(3).lean(),
      Restaurant.find({ destination: { $regex: destination, $options: 'i' } }).limit(3).lean(),
      Activity.find({ destination: { $regex: destination, $options: 'i' } }).limit(4).lean(),
      Taxi.find({ destination: { $regex: destination, $options: 'i' } }).limit(2).lean(),
    ]);

    // ── 3. Build context for Gemini ───────────────────────────────────────────
    const hotelContext = hotels.map(h =>
      `Hotel: ${h.name} (₹${h.rooms?.[0]?.pricePerNight || 3000}/night, Rating: ${h.rating})`
    ).join('\n') || 'Budget guesthouses available from ₹1500/night';

    const actContext = activities.map(a =>
      `Activity: ${a.title} (₹${a.pricePerPerson}/person, ${a.duration}, Difficulty: ${a.difficulty})`
    ).join('\n') || 'Popular local sightseeing available';

    const restContext = restaurants.map(r =>
      `Restaurant: ${r.name} (${r.priceRange}, Cuisine: ${r.cuisine?.join(', ')}, Hours: ${r.openingHours})`
    ).join('\n') || 'Local dhabas and cafes available';

    // ── 4. Generate the full travel plan ─────────────────────────────────────
    const planPrompt = `
You are "Travel Bhaiya" 🧳 — a fun, warm, knowledgeable Indian travel guide. A user asked:

"${message}"

You need to create a personalized travel plan for ${destination}. Use these REAL verified listings from Trawiller platform:

HOTELS:
${hotelContext}

ACTIVITIES:
${actContext}

RESTAURANTS:
${restContext}

Write a friendly, engaging travel plan in this exact format:
1. Start with a warm 1-2 line greeting and excitement about ${destination}
2. STAY section: recommend the hotel with why it's perfect
3. EXPERIENCE section: day-by-day activities (if they mentioned days, use them; else assume 3 days)
4. EAT section: best food spots
5. END with an encouraging closing line

Keep it conversational, use emojis (🏔️🍛🚗✨), mention approximate costs, and make it feel like advice from a local friend. Max 300 words.`;

    const planResult = await model.generateContent(planPrompt);
    const planText = planResult.response.text();

    // ── 5. Return everything ──────────────────────────────────────────────────
    return res.status(200).json({
      success: true,
      data: {
        destination,
        planText,
        hotels: hotels.map(h => ({
          _id: h._id,
          name: h.name,
          destination: h.destination,
          rating: h.rating,
          starRating: h.starRating,
          images: h.images,
          pricePerNight: h.rooms?.[0]?.pricePerNight || 3000,
          description: h.description,
          amenities: h.amenities?.slice(0, 3),
        })),
        restaurants: restaurants.map(r => ({
          _id: r._id,
          name: r.name,
          destination: r.destination,
          rating: r.rating,
          cuisine: r.cuisine,
          priceRange: r.priceRange,
          images: r.images,
          openingHours: r.openingHours,
        })),
        activities: activities.map(a => ({
          _id: a._id,
          title: a.title,
          destination: a.destination,
          category: a.category,
          pricePerPerson: a.pricePerPerson,
          duration: a.duration,
          difficulty: a.difficulty,
          rating: a.rating,
          images: a.images,
        })),
        taxis: taxis.map(t => ({
          _id: t._id,
          driverName: t.driverName,
          vehicleName: t.vehicleName,
          vehicleType: t.vehicleType,
          destination: t.destination,
          pricePerKm: t.pricePerKm,
          dayPackageRate: t.dayPackageRate,
          rating: t.rating,
          images: t.images,
        })),
      },
    });
  } catch (error) {
    console.error('Travel Bhaiya AI error:', error);
    // If Gemini key is not set, return a helpful mock response
    if (error.message?.includes('API_KEY') || error.message?.includes('quota')) {
      return res.status(200).json({
        success: true,
        data: {
          destination: 'Manali',
          planText: `🏔️ Namaste! I'm Travel Bhaiya and I'm so excited to help you plan your trip!\n\nIt looks like I need a valid Gemini API key to generate personalized plans. Please add your key to \`server/.env\` as GEMINI_API_KEY.\n\nGet it free at: https://aistudio.google.com/app/apikey\n\nOnce set up, I'll create amazing personalized travel itineraries just for you! 🧳✨`,
          hotels: [],
          restaurants: [],
          activities: [],
          taxis: [],
        },
      });
    }
    return res.status(500).json({ success: false, message: 'Travel Bhaiya had trouble planning. Please try again!' });
  }
};

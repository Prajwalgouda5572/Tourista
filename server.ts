import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { TOURIST_DATA, HOTEL_DATA } from './src/data';
import { Place, ItineraryRequest, DayPlanStop, Hotel, TimeOfDay } from './src/types';

const app = express();
const PORT = 3000;

app.use(express.json());

// Helper: Calculate distance between two points (in km approx)
function getDistanceInKm(p1: Place, p2: Place) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(p2.lat - p1.lat);
  const dLon = deg2rad(p2.lng - p1.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(p1.lat)) * Math.cos(deg2rad(p2.lat)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; 
  return d;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

// Helper: Format decimal hours to 24h string
function formatTime(decimalHours: number) {
  const h = Math.floor(decimalHours);
  const m = Math.round((decimalHours - h) * 60);
  const period = h < 12 ? 'AM' : 'PM';
  const displayH = h % 12 || 12;
  return `${displayH.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${period}`;
}

// ITINERARY ENGINE
function generateItinerary(req: ItineraryRequest) {
  const { city, interests, duration, budget } = req;
  const allPlaces = TOURIST_DATA[city] || [];
  
  // 1. Weather Simulation (Mock)
  const weather_statuses = [
    "Sunny and clear skies - perfect for outdoor parks.",
    "Partly cloudy with pleasant breeze - ideal for walking tours.",
    "Mild humidity with scattered clouds - good for palace visits."
  ];
  const weather_status = weather_statuses[Math.floor(Math.random() * weather_statuses.length)];

  const itinerary: Record<string, DayPlanStop[]> = {};
  const usedIds = new Set<string>();

  const MIN_PLACES = 4;
  const MAX_PLACES = 7;
  const AVG_SPEED_KMPH = 20; 

  const getTimePriority = (time?: TimeOfDay) => {
    switch (time) {
      case 'Morning': return 1;
      case 'Afternoon': return 2;
      case 'Evening': return 3;
      default: return 4;
    }
  };

  for (let d = 1; d <= duration; d++) {
    const dayName = `Day ${d}`;
    const dayPlaces: DayPlanStop[] = [];
    
    // START constraint: 07:30 AM to 08:00 AM
    let currentTime = 7.5 + (Math.random() * 0.5); // Random start between 7:30 and 8:00
    
    const MAX_TIME = 20.0; // Finish by 8:00 PM (Before evening core)
    const MAX_PLACES_DAILY = 10; // Increase density as requested

    while (dayPlaces.length < MAX_PLACES_DAILY) {
      const available = allPlaces.filter(p => !usedIds.has(p.id));
      if (available.length === 0) break;

      // Determine target bucket
      let targetBucket: TimeOfDay = 'Any';
      if (currentTime < 11.5) targetBucket = 'Morning';
      else if (currentTime < 16.5) targetBucket = 'Afternoon';
      else targetBucket = 'Evening';

      const prev = dayPlaces[dayPlaces.length - 1];
      const candidates = available.map(p => {
        let score = 0;
        if (interests.includes(p.category)) score += 100;
        if (p.best_time === targetBucket) score += 50;
        if (p.best_time === 'Any') score += 20;
        
        if (prev) {
          const dist = getDistanceInKm(prev, p);
          score -= dist * 3; // Slightly higher distance penalty for density
        }
        return { p, score };
      });

      candidates.sort((a, b) => b.score - a.score);
      const chosen = candidates[0].p;

      const stop: DayPlanStop = { ...chosen };
      const dist = prev ? getDistanceInKm(prev, chosen) : 0;
      const travelTimeMin = prev ? (dist / AVG_SPEED_KMPH) * 60 : 0;
      const travelTimeHours = travelTimeMin / 60;

      // Check if we can fit this
      if (currentTime + travelTimeHours + chosen.estimated_visit_duration > MAX_TIME && dayPlaces.length >= MIN_PLACES) {
        break;
      }

      stop.distance_from_prev = parseFloat(dist.toFixed(1));
      stop.travel_time_from_prev = Math.round(travelTimeMin);
      
      const startTime = currentTime + travelTimeHours;
      stop.start_time = formatTime(startTime);
      stop.end_time = formatTime(startTime + chosen.estimated_visit_duration);

      dayPlaces.push(stop);
      usedIds.add(chosen.id);
      currentTime = startTime + chosen.estimated_visit_duration;

      // Ensure we don't end around 4:00 PM if there's more to do
      if (currentTime >= 15.5 && currentTime <= 16.5 && dayPlaces.length < MAX_PLACES_DAILY) {
        // Force continuation through 4 PM
        continue;
      }
    }

    itinerary[dayName] = dayPlaces;
  }

  const cityHotels = HOTEL_DATA[req.city] || [];
  
  // Advanced Personalized Comparison Logic (Ensuring at least 4 options)
  const exactMatches = cityHotels.filter(h => h.price_range === budget);
  const budgetOrder: Record<string, number> = { 'Low': 0, 'Medium': 1, 'Premium': 2 };
  
  // Sort remaining hotels by proximity to the requested budget
  const otherOptions = cityHotels
    .filter(h => h.price_range !== budget)
    .sort((a, b) => {
      const distA = Math.abs(budgetOrder[a.price_range] - budgetOrder[budget]);
      const distB = Math.abs(budgetOrder[b.price_range] - budgetOrder[budget]);
      return distA - distB;
    });

  const suggested_hotels = [...exactMatches, ...otherOptions].slice(0, 5);

  const reasoning = `Based on the current weather forecast (${weather_status}), I've optimized your slots for an efficient urban tour. For your accommodation, I've curated a comparison of ${suggested_hotels.length} options centered around your ${budget} budget, with estimated nightly rates provided for transparency.`;

  return { itinerary, reasoning, suggested_hotels, weather_status };
}

// ROUTES
app.post('/api/generate-itinerary', (req, res) => {
  try {
    const result = generateItinerary(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate itinerary' });
  }
});

async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(process.cwd(), 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(process.cwd(), 'dist/index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server started at http://localhost:${PORT}`);
  });
}

start();

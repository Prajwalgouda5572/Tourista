export type Category = 'Nature' | 'Historical' | 'Food' | 'Spiritual';
export type Budget = 'Low' | 'Medium' | 'Premium';
export type TimeOfDay = 'Morning' | 'Afternoon' | 'Evening' | 'Any';

export interface Place {
  id: string;
  name: string;
  category: Category;
  description: string;
  lat: number;
  lng: number;
  estimated_visit_duration: number; // in hours
  fun_fact: string;
  why_visit: string;
  map_url: string;
  best_time?: TimeOfDay;
}

export interface Hotel {
  id: string;
  name: string;
  price_range: string;
  estimated_price: string;
  rating: number;
  description: string;
  why_suggested: string;
}

export interface DayPlanStop extends Place {
  distance_from_prev?: number; // in km
  travel_time_from_prev?: number; // in minutes
  start_time?: string;
  end_time?: string;
}

export interface ItineraryRequest {
  city: 'Bengaluru' | 'Chennai';
  interests: Category[];
  duration: number;
  budget: Budget;
}

export interface ItineraryResponse {
  itinerary: Record<string, DayPlanStop[]>;
  reasoning: string;
  suggested_hotels: Hotel[];
  weather_status?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

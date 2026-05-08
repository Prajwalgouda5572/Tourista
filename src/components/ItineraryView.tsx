import React from 'react';
import { Clock, MapPin, Navigation, Info, Zap, Bed, Star, Sparkles, Sun, CloudRain, SunMedium } from 'lucide-react';
import { ItineraryResponse, DayPlanStop, Hotel } from '../types';
import { motion } from 'motion/react';

interface ItineraryViewProps {
  data: ItineraryResponse;
}

const ItineraryView: React.FC<ItineraryViewProps> = ({ data }) => {
  const days = Object.keys(data.itinerary).sort();
  const city = days.length > 0 ? data.itinerary[days[0]][0].lat > 12.98 ? 'Chennai' : 'Bengaluru' : '';

  return (
    <div className="flex flex-col gap-16 pb-20">
      {/* Ecosystem Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[300px] w-full rounded-[40px] overflow-hidden group shadow-2xl bg-surface border border-border-dim"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 via-bg to-bg" />
        <div className="absolute bottom-12 left-12 right-12 flex flex-col items-start gap-4">
           {/* Weather Badge */}
           {data.weather_status && (
             <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-2 rounded-2xl flex items-center gap-2 text-xs font-bold backdrop-blur-md">
               <SunMedium className="w-4 h-4" />
               <span className="uppercase tracking-widest">{data.weather_status.split('-')[0]}</span>
             </div>
           )}

           <div className="flex flex-col items-start">
             <div className="flex items-center gap-2 mb-4 bg-accent/10 backdrop-blur-md px-4 py-2 rounded-full border border-accent/20 tracking-widest font-bold text-[10px] text-accent uppercase">
               <Sparkles className="w-3.5 h-3.5" />
               WEATHER-OPTIMIZED SCHEDULING
             </div>
             <h2 className="text-6xl font-black text-white tracking-tighter mb-4 italic uppercase leading-none">
               {city} <span className="text-accent underline decoration-4 underline-offset-8">Expedition</span>
             </h2>
             <p className="text-text-dim max-w-lg text-lg leading-relaxed">
               <span className="text-white font-bold">Tourista: Make Destinations More Familiar.</span> Discover local gems with dynamic time-slots synchronized by peak visiting hours and climate markers.
             </p>
           </div>
        </div>
      </motion.div>

      {/* Hotel Suggestions */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-accent/20 rounded-lg">
            <Bed className="w-5 h-5 text-accent" />
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">Accommodation Hubs</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.suggested_hotels.map((hotel: Hotel) => (
            <div key={hotel.id} className="bg-surface border border-border-dim p-6 rounded-2xl flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                  <h4 className="font-bold text-white leading-tight">{hotel.name}</h4>
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-wider">{hotel.estimated_price}</span>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-1 rounded-lg">
                  <Star className="w-3 h-3 fill-amber-500" />
                  {hotel.rating}
                </div>
              </div>
              <p className="text-xs text-text-dim leading-relaxed">{hotel.description}</p>
              <div className="mt-auto pt-4 border-t border-border-dim/50">
                <span className="text-[10px] font-bold uppercase tracking-widest text-accent mb-1 block">Travel Logic</span>
                <p className="text-[11px] text-text-main leading-tight italic">{hotel.why_suggested}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <div className="space-y-24">
        {days.map((day, idx) => (
          <motion.div
            key={day}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex flex-col gap-10"
          >
            <div className="flex items-baseline gap-4 border-b border-border-dim pb-4">
              <h3 className="text-4xl font-black text-white tracking-tighter uppercase italic">
                {day}
              </h3>
              <div className="px-3 py-1 bg-accent rounded font-bold text-[10px] text-white tracking-widest">
                {data.itinerary[day].length} TIME SLOTS ALLOCATED
              </div>
            </div>

            <div className="flex flex-col gap-0">
              {data.itinerary[day].map((place: DayPlanStop, pIdx: number) => (
                <div key={place.id} className="relative pl-12 pb-12 last:pb-0">
                  {/* Timeline logic */}
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-border-dim flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-surface border-2 border-border-dim flex items-center justify-center z-10 -ml-[15.5px] mt-2 group-hover:border-accent transition-colors">
                      <span className="text-[10px] font-bold text-text-dim">{pIdx + 1}</span>
                    </div>
                    {pIdx === data.itinerary[day].length - 1 && <div className="absolute bottom-0 w-3 h-3 rounded-full bg-border-dim -ml-1.5" />}
                  </div>

                  {/* Travel Stats Segment */}
                  {pIdx > 0 && (
                    <div className="absolute left-4 top-[-44px] w-full flex justify-start z-20">
                      <div className="bg-surface border border-border-dim px-3 py-1 rounded-full text-[9px] font-bold flex items-center gap-2 text-text-dim shadow-xl">
                        <Navigation className="w-2.5 h-2.5 text-accent rotate-45" />
                        <span>{place.distance_from_prev}km Transit</span>
                        <div className="w-1 h-1 rounded-full bg-border-dim" />
                        <Clock className="w-2.5 h-2.5" />
                        <span>Est. {place.travel_time_from_prev} mins</span>
                      </div>
                    </div>
                  )}

                  <div className="bg-surface rounded-3xl border border-border-dim hover:border-accent/40 transition-all duration-500 overflow-hidden group">
                    <div className="p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                      {/* Left: Basic Info & Time Slot */}
                      <div className="lg:col-span-5 flex flex-col">
                        <div className="flex items-center justify-between mb-8">
                           <div className="bg-bg/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-border-dim shadow-inner">
                              <div className="flex items-center gap-3">
                                <Clock className="w-4 h-4 text-accent" />
                                <div className="flex flex-col">
                                  <span className="text-[9px] font-bold text-text-dim uppercase tracking-widest">Reserved Slot</span>
                                  <span className="text-sm font-black text-white">{place.start_time} - {place.end_time}</span>
                                </div>
                              </div>
                           </div>
                           <div className="flex flex-col items-end">
                              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1">
                                <SunMedium className="w-3 h-3" />
                                {place.best_time || 'Anytime'}
                              </span>
                           </div>
                        </div>

                        <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-6 group-hover:scale-[1.02] transition-transform duration-500 bg-border-dim/20 flex flex-col items-center justify-center border border-border-dim">
                          <div className="flex flex-col items-center gap-4 text-center p-6">
                            <span className="text-[10px] font-bold px-2 py-0.5 bg-accent/90 text-white rounded uppercase tracking-wider mb-2">
                              {place.category}
                            </span>
                            <div className="flex flex-col gap-2">
                              <a 
                                href={`https://www.google.com/search?q=${encodeURIComponent(place.name + " " + city)}&tbm=isch`}
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="bg-accent hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-lg flex items-center gap-2"
                              >
                                View Gallery
                              </a>
                              <a 
                                href={place.map_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-text-dim hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-1"
                              >
                                <MapPin className="w-3 h-3" />
                                Google Maps
                              </a>
                            </div>
                          </div>
                        </div>
                        
                        <h4 className="text-2xl font-bold text-white mb-3 group-hover:text-accent transition-colors leading-tight">{place.name}</h4>
                        <p className="text-sm text-text-dim leading-relaxed mb-6 line-clamp-2">{place.description}</p>
                        
                        <div className="mt-auto pt-6 border-t border-border-dim/50 flex gap-6">
                          <div className="flex flex-col gap-1">
                            <span className="text-[9px] font-bold text-text-dim/50 tracking-widest uppercase">Visit Time</span>
                            <span className="text-xs font-bold text-white uppercase tracking-wider">~{place.estimated_visit_duration} Hours</span>
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="text-[9px] font-bold text-text-dim/50 tracking-widest uppercase">Preferred</span>
                            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">{place.best_time || 'Any'}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Facts & Reasoning */}
                      <div className="lg:col-span-7 flex flex-col gap-6">
                        <div className="bg-bg/40 rounded-2xl p-6 border border-border-dim/50 flex flex-col h-full">
                          <div className="flex items-center gap-2 mb-3 text-accent">
                            <Info className="w-4 h-4" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Insider Fact</span>
                          </div>
                          <p className="text-sm text-text-main/90 leading-relaxed italic border-l-2 border-accent/20 pl-4">"{place.fun_fact}"</p>
                        </div>
                        
                        <div className="bg-bg/40 rounded-2xl p-6 border border-border-dim/50 flex flex-col h-full">
                          <div className="flex items-center gap-2 mb-3 text-emerald-500">
                            <Zap className="w-4 h-4" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Selection Logic</span>
                          </div>
                          <p className="text-sm text-text-main/90 leading-relaxed">
                            <span className="font-bold text-emerald-500/80">Strategy:</span> {place.why_visit}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Global Reasoning */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-accent/5 rounded-3xl p-10 border-l-8 border-accent relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <Navigation className="w-40 h-40" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-accent rounded-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-accent">Climate & Time-Aware Summary</h4>
          </div>
          <p className="text-2xl text-text-main font-bold leading-tight max-w-4xl">
            "{data.reasoning}"
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ItineraryView;

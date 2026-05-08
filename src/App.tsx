import { useState } from 'react';
import { Compass, AlertCircle } from 'lucide-react';
import PlannerForm from './components/PlannerForm';
import ItineraryView from './components/ItineraryView';
import ChatAssistant from './components/ChatAssistant';
import { ItineraryRequest, ItineraryResponse } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [itinerary, setItinerary] = useState<ItineraryResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (data: ItineraryRequest) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/generate-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to generate itinerary');
      const result = await res.json();
      setItinerary(result);
      
      // Scroll to result
      setTimeout(() => {
        document.getElementById('itinerary-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      setError('Something went wrong while planning your trip. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg text-text-main h-screen overflow-hidden">
      {/* Header */}
      <header className="bg-bg border-b border-border-dim px-10 h-20 flex items-center justify-between shrink-0">
        <div className="flex flex-col">
          <div className="text-2xl font-black tracking-tighter text-white uppercase italic">
            TOUR<span className="text-accent underline decoration-2 underline-offset-4">ISTA</span>
          </div>
          <div className="text-[10px] font-bold text-text-dim tracking-tight">
            Make Destinations More Familiar.
          </div>
        </div>
        <div className="text-xs font-semibold text-text-dim uppercase tracking-widest">
          Prototype v1.1.2 • AI Core
        </div>
      </header>

      <main className="flex-1 grid grid-cols-[350px_1fr] bg-border-dim overflow-hidden">
        {/* Left Panel: Controls */}
        <div className="bg-bg overflow-y-auto custom-scrollbar border-r border-border-dim">
          <div className="p-8">
            <PlannerForm onGenerate={handleGenerate} loading={loading} />
          </div>
        </div>

        {/* Right Panel: Viewport */}
        <div className="bg-bg overflow-y-auto custom-scrollbar relative">
          <div className="p-10 max-w-5xl mx-auto min-h-full flex flex-col">
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-8 p-4 bg-red-950/30 border border-red-900/50 rounded-lg text-red-200 flex items-center gap-3 shadow-sm text-sm"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <p className="font-medium">{error}</p>
                </motion.div>
              )}

              {itinerary ? (
                <motion.section 
                  key="itinerary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex-1 flex flex-col"
                >
                  <ItineraryView data={itinerary} />
                </motion.section>
              ) : (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex-1 flex flex-col items-center justify-center text-center opacity-40 py-20"
                >
                  <Compass className="w-16 h-16 mb-4 text-text-dim" />
                  <p className="text-lg font-medium">Configure your trip to see your itinerary</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <ChatAssistant />
    </div>
  );
}


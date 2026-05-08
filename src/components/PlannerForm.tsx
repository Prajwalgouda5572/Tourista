import React, { useState } from 'react';
import { Calendar, MapPin, Search, Sparkles } from 'lucide-react';
import { ItineraryRequest, Category, Budget } from '../types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface PlannerFormProps {
  onGenerate: (data: ItineraryRequest) => void;
  loading: boolean;
}

const PlannerForm: React.FC<PlannerFormProps> = ({ onGenerate, loading }) => {
  const [formData, setFormData] = useState<ItineraryRequest>({
    city: 'Bengaluru',
    budget: 'Medium',
    duration: 2,
    interests: ['Nature', 'Historical'],
  });

  const categories: Category[] = ['Nature', 'Historical', 'Food', 'Spiritual'];
  const budgets: Budget[] = ['Low', 'Medium', 'Premium'];

  const toggleInterest = (cat: Category) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(cat)
        ? prev.interests.filter(i => i !== cat)
        : [...prev.interests, cat],
    }));
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-text-dim">Select City</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim" />
            <select
              title="City select"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value as any })}
              className="w-full pl-10 pr-4 py-3 bg-surface border border-border-dim rounded-lg focus:ring-1 focus:ring-accent focus:outline-none appearance-none text-sm text-white transition-all cursor-pointer"
            >
              <option value="Bengaluru">Bengaluru, KA</option>
              <option value="Chennai">Chennai, TN</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-text-dim">Budget</label>
            <select
              title="Budget select"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value as any })}
              className="w-full px-4 py-3 bg-surface border border-border-dim rounded-lg focus:ring-1 focus:ring-accent focus:outline-none appearance-none text-sm text-white transition-all cursor-pointer"
            >
              {budgets.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-text-dim">Duration</label>
            <select
              title="Duration select"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
              className="w-full px-4 py-3 bg-surface border border-border-dim rounded-lg focus:ring-1 focus:ring-accent focus:outline-none appearance-none text-sm text-white transition-all cursor-pointer"
            >
              {[1, 2, 3].map(d => (
                <option key={d} value={d}>{d} {d === 1 ? 'Day' : 'Days'}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-text-dim">Interests</label>
          <div className="grid grid-cols-2 gap-3">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => toggleInterest(cat)}
                className={cn(
                  "flex items-center gap-2 py-2 px-3 text-xs font-medium rounded-lg border transition-all",
                  formData.interests.includes(cat)
                    ? "bg-accent/10 border-accent text-accent"
                    : "bg-surface border-border-dim text-text-dim hover:border-text-dim"
                )}
              >
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  formData.interests.includes(cat) ? "bg-accent" : "bg-border-dim"
                )} />
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={() => onGenerate(formData)}
        disabled={loading || formData.interests.length === 0}
        className="w-full mt-auto bg-accent hover:bg-indigo-500 disabled:bg-surface disabled:text-text-dim disabled:border-border-dim border border-accent disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-xl shadow-accent/20 transition-all active:scale-95"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        ) : (
          "Update Itinerary"
        )}
      </button>
    </div>
  );
};

export default PlannerForm;

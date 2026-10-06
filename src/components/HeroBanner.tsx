import React from 'react';
import heroImg from '../assets/images/hero_cleaning_home_1791307237147.jpg';

interface HeroBannerProps {
  onShopClick: () => void;
  onExploreScience: () => void;
  heading?: string;
  subheading?: string;
  kicker?: string;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onShopClick,
  onExploreScience,
  heading = 'Small fixes for everyday home annoyances.',
  subheading = 'Smart electric spin scrubbers, magnetic cord organizers, and precision cleaning gadgets designed to cut chore time in half and keep your living spaces spotless.',
  kicker = 'VIRAL HOME PROBLEM SOLVERS · FREE SHIPPING ON $35+'
}) => {
  return (
    <section className="relative overflow-hidden bg-stone-900 text-stone-100 min-h-[540px] lg:min-h-[620px] flex items-center">
      {/* Background Photography & Scrim */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={heroImg}
          alt="Bright modern clean and organized kitchen and living room"
          className="w-full h-full object-cover object-center opacity-65 scale-102 transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent"></div>
        <div className="absolute inset-0 bg-stone-950/20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 w-full">
        <div className="max-w-2xl">
          {kicker && (
            <div className="text-xs uppercase tracking-widest text-orange-400 font-mono mb-4 flex items-center gap-1.5">
              <span className="text-orange-500">◆</span>
              <span>{kicker}</span>
            </div>
          )}

          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 leading-[1.18]"
            style={{ textWrap: 'balance' }}
          >
            {heading || 'Small fixes for everyday home annoyances.'}
          </h1>

          <p className="text-base sm:text-lg text-stone-300 font-normal leading-relaxed mb-8 max-w-xl">
            {subheading}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onShopClick}
              className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-stone-950 bg-white hover:bg-stone-100 rounded transition-colors duration-150 shadow-sm cursor-pointer whitespace-nowrap"
            >
              Shop Cleaning Gadgets
            </button>
            <button
              onClick={onExploreScience}
              className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-medium text-stone-200 hover:text-white border border-stone-600 hover:border-stone-400 rounded transition-colors duration-150 cursor-pointer whitespace-nowrap backdrop-blur-xs"
            >
              Browse Best Sellers
            </button>
          </div>

          {/* Social Proof & Benefit Metric Strip */}
          <div className="mt-12 pt-8 border-t border-stone-800/80 grid grid-cols-3 gap-6 text-stone-300">
            <div>
              <div className="text-xl sm:text-2xl font-bold text-white tabular-nums">420 RPM</div>
              <div className="text-xs text-stone-400 mt-0.5">High-Torque Scrubbing</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-white tabular-nums">70% Faster</div>
              <div className="text-xs text-stone-400 mt-0.5">Bathroom & Kitchen Clean</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-white tabular-nums">$35+</div>
              <div className="text-xs text-stone-400 mt-0.5">Free Express Shipping</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';

export const BenefitsSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-stone-900 text-stone-100 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="text-xs uppercase tracking-widest text-orange-400 font-mono mb-3 flex items-center justify-center gap-1.5">
            <span className="text-orange-500">◆</span>
            <span>CHORE ERADICATION TECHNOLOGY</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
            Why Manual Scrubbing & Cord Clutter Steal Your Weekends
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            The average homeowner spends 6+ hours every week scrubbing bathroom tile grout, searching for dropped charging cords, and wiping soapy kitchen counter puddles. Smallfix gadgets engineer away everyday friction points.
          </p>
        </div>

        {/* Quantitative Proof Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center border-t border-stone-800 pt-12">
          <div className="p-6">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tabular-nums mb-2">
              420 RPM
            </div>
            <p className="text-sm text-stone-300 max-w-xs mx-auto">
              Dual-speed motorized scrubbing eliminates bathroom grout and soap scum with zero knee or wrist strain.
            </p>
          </div>

          <div className="p-6 border-y md:border-y-0 md:border-x border-stone-800">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-orange-400 tabular-nums mb-2">
              0 Cords
            </div>
            <p className="text-sm text-stone-300 max-w-xs mx-auto">
              Weighted magnetic docking anchors keep charging cables firmly on your desk and nightstand forever.
            </p>
          </div>

          <div className="p-6">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tabular-nums mb-2">
              70%
            </div>
            <p className="text-sm text-stone-300 max-w-xs mx-auto">
              Reduction in weekly cleaning time reported by over 14,000 verified Smallfix households.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

import React from 'react';
import { Sparkles, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  return (
    <section className="border-b border-stone-200/80 bg-stone-100/70 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-stone-800">
          <div className="flex items-start space-x-3">
            <div className="text-orange-600 shrink-0 mt-0.5">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900">30-Day Clean Guarantee</h4>
              <p className="text-xs text-stone-600 mt-0.5">Test it in your home. Full refund if not 100% satisfied.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="text-orange-600 shrink-0 mt-0.5">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900">Free Shipping $35+</h4>
              <p className="text-xs text-stone-600 mt-0.5">Fast tracked delivery directly to your door.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="text-orange-600 shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900">IPX7 Waterproof Rated</h4>
              <p className="text-xs text-stone-600 mt-0.5">Submersible & safe for showers, tubs, and kitchen sinks.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="text-orange-600 shrink-0 mt-0.5">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900">1-Year Warranty</h4>
              <p className="text-xs text-stone-600 mt-0.5">Rigorous quality testing and free replacements included.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

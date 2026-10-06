import React from 'react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-stone-100/70 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-widest text-stone-500 font-mono mb-2">Verified Homeowners</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
            Real Fixes for Everyday Home Annoyances
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 border border-stone-200/80 rounded flex flex-col justify-between shadow-xs">
            <div>
              <div className="text-orange-500 text-sm mb-4">★★★★★</div>
              <p className="text-stone-700 text-sm leading-relaxed mb-6">
                "The SpinScrub Pro cleaned 5 years of hard water stain buildup on my shower glass in under 8 minutes. I didn't even have to bend over or get my knees wet."
              </p>
            </div>
            <div className="border-t border-stone-100 pt-4 text-xs">
              <div className="font-semibold text-stone-900">Sarah Jenkins</div>
              <div className="text-stone-500">Verified Buyer · Austin, TX</div>
            </div>
          </div>

          <div className="bg-white p-8 border border-stone-200/80 rounded flex flex-col justify-between shadow-xs">
            <div>
              <div className="text-orange-500 text-sm mb-4">★★★★★</div>
              <p className="text-stone-700 text-sm leading-relaxed mb-6">
                "I was skeptical about the magnetic cable organizer, but it genuinely stopped my phone and watch cords from sliding behind my nightstand every single night. 10/10."
              </p>
            </div>
            <div className="border-t border-stone-100 pt-4 text-xs">
              <div className="font-semibold text-stone-900">Marcus Thorne</div>
              <div className="text-stone-500">Verified Buyer · Denver, CO</div>
            </div>
          </div>

          <div className="bg-white p-8 border border-stone-200/80 rounded flex flex-col justify-between shadow-xs">
            <div>
              <div className="text-orange-500 text-sm mb-4">★★★★★</div>
              <p className="text-stone-700 text-sm leading-relaxed mb-6">
                "The 2-in-1 soap dispenser eliminated the messy puddle around my kitchen sink. One press with the sponge and you're good to wash. Simple and brilliant."
              </p>
            </div>
            <div className="border-t border-stone-100 pt-4 text-xs">
              <div className="font-semibold text-stone-900">Elena Rostova</div>
              <div className="text-stone-500">Verified Buyer · Seattle, WA</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

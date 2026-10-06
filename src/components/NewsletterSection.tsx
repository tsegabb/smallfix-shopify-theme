import React, { useState } from 'react';
import { Check } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="py-16 sm:py-20 bg-stone-900 text-stone-100 border-t border-stone-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="text-xs uppercase tracking-widest text-orange-400 font-mono mb-2 flex items-center justify-center gap-1.5">
          <span className="text-orange-500">◆</span>
          <span>THE SMALLFIX COMMUNITY</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Never Miss a Smarter Home Fix
        </h2>
        <p className="text-stone-300 text-sm max-w-xl mx-auto mb-8">
          Get weekly viral cleaning hacks, exclusive flash sale drops, and 10% off your first gadget order.
        </p>

        {submitted ? (
          <div className="inline-flex items-center gap-2 bg-stone-800 text-emerald-400 px-6 py-3 rounded text-sm font-medium">
            <Check className="w-4 h-4" />
            <span>You're subscribed! Check your inbox for your 10% discount code.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 bg-stone-800 border border-stone-700 text-white placeholder-stone-400 text-sm rounded focus:outline-hidden focus:border-orange-400"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded transition-colors whitespace-nowrap cursor-pointer shadow-sm"
              >
                Get 10% Off
              </button>
            </div>
            <p className="text-[11px] text-stone-400 mt-3">No spam. Only practical home gadgets. Unsubscribe anytime.</p>
          </form>
        )}
      </div>
    </section>
  );
};

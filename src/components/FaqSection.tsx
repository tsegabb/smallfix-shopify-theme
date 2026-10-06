import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';

export const FaqSection: React.FC = () => {
  // Let user open and close items, defaulting all open or first open
  const [openIndices, setOpenIndices] = useState<number[]>([0, 1, 2, 3]);

  const toggleIndex = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const faqs = [
    {
      q: 'How long does shipping take and how do I track my order?',
      a: 'All orders leave our fulfillment center within 2 business days. Standard tracked delivery takes 7 to 14 business days. You will receive an automated dispatch notification email with your direct tracking link as soon as your package ships.'
    },
    {
      q: 'Which payment cards and checkout methods do you accept?',
      a: 'We securely accept all major credit and debit cards including Visa, Mastercard, American Express, and Discover. We also support accelerated digital wallets including Shop Pay, Apple Pay, and Google Pay. All transactions are encrypted via 256-bit SSL certified Shopify payment gateways.'
    },
    {
      q: 'How do I qualify for Free Shipping?',
      a: 'All orders containing $35 or more automatically unlock 100% Free Tracked Express Shipping worldwide. No coupon code is required; the discount applies instantly at checkout.'
    },
    {
      q: 'Is the SpinScrub Pro waterproof and safe to use in wet showers?',
      a: 'Yes! The SpinScrub Pro motor head is IPX7 waterproof certified, meaning it can be safely used in running showers, full bathtubs, and wet kitchen sinks without risk of electrical damage.'
    },
    {
      q: 'What is your 30-Day Clean Guarantee and return policy?',
      a: 'We stand behind every gadget with our 30-Day Money-Back Guarantee. If any Smallfix gadget doesn’t drastically cut your cleaning time or simplify your home, simply email support with your order number within 30 days of delivery for a hassle-free return and full refund.'
    },
    {
      q: 'Will the MagLock cable dock damage my wooden furniture or desk surface?',
      a: 'Not at all. The MagLock base features an ultra-soft non-marking silicone pad combined with washable micro-suction technology that grips firmly to wood, marble, glass, and metal without leaving any sticky residue or scratches.'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-stone-50 border-t border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-xs uppercase tracking-widest text-orange-600 font-mono mb-2 flex items-center justify-center gap-1.5">
            <span className="text-orange-500">◆</span>
            <span>HELP & ANSWERS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
            Frequently Asked Questions
          </h2>
          <p className="text-stone-600 mt-2 text-sm sm:text-base">
            Everything you need to know about Smallfix orders, shipping times, and returns.
          </p>
        </div>

        <div className="divide-y divide-stone-200/80 border-y border-stone-200/80">
          {faqs.map((faq, index) => {
            const isOpen = openIndices.includes(index);
            return (
              <div key={index} className="py-5 transition-colors">
                <button
                  type="button"
                  onClick={() => toggleIndex(index)}
                  className="w-full flex justify-between items-center text-left text-base sm:text-lg font-semibold text-stone-900 cursor-pointer group"
                >
                  <span className="group-hover:text-stone-700 transition-colors pr-4">{faq.q}</span>
                  <span className="text-orange-500 shrink-0 font-bold text-lg select-none">
                    {isOpen ? (
                      <Minus className="w-5 h-5 text-orange-500 stroke-[2.5]" />
                    ) : (
                      <Plus className="w-5 h-5 text-orange-500 stroke-[2.5]" />
                    )}
                  </span>
                </button>
                {isOpen && (
                  <div className="pt-3 text-stone-600 text-sm sm:text-base leading-relaxed pr-8 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

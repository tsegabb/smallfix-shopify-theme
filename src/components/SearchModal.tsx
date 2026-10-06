import React, { useState } from 'react';
import { X, Search as SearchIcon, ArrowRight } from 'lucide-react';
import { Product, PRODUCTS } from '../data/products';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.shortDesc.toLowerCase().includes(query.toLowerCase())
      )
    : PRODUCTS.slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="flex min-h-full items-start justify-center pt-16 px-4">
        <div className="relative bg-white rounded-lg shadow-2xl max-w-xl w-full overflow-hidden border border-stone-200">
          
          {/* Search Input Bar */}
          <div className="p-4 border-b border-stone-200 flex items-center gap-3">
            <SearchIcon className="w-5 h-5 text-stone-400 shrink-0" />
            <input
              type="text"
              autoFocus
              placeholder="Search spin scrubbers, cable organizers, crevice cleaners, soap caddies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full text-sm text-stone-900 placeholder-stone-400 focus:outline-hidden"
            />
            <button onClick={onClose} className="text-stone-400 hover:text-stone-800 p-1 cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Instant Predictive Results */}
          <div className="p-4 max-h-96 overflow-y-auto">
            <div className="text-[11px] font-mono uppercase text-stone-400 mb-2">
              {query ? 'Predictive Results' : 'Suggested Home & Cleaning Gadgets'}
            </div>

            <div className="space-y-2">
              {results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="flex items-center gap-3 p-2 rounded hover:bg-stone-50 cursor-pointer transition-colors group"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-12 h-12 object-cover rounded bg-stone-100 border border-stone-200 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-stone-900 group-hover:text-stone-700 truncate">
                      {product.title}
                    </h4>
                    <span className="text-[11px] text-stone-500 font-mono">{product.category}</span>
                  </div>
                  <div className="text-xs font-semibold text-stone-900 tabular-nums">
                    ${product.price.toFixed(2)}
                  </div>
                  <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-stone-900 transition-colors" />
                </div>
              ))}

              {query && results.length === 0 && (
                <div className="py-8 text-center text-xs text-stone-500">
                  No products found for "{query}". Try "light", "red", or "diffuser".
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

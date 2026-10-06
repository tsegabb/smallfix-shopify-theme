import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { Product } from '../data/products';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, variant?: string) => void;
  onViewFullDetail: (product: Product) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onViewFullDetail
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants[0]?.options[0] || ''
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-stone-950/50 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-2xl max-w-2xl w-full overflow-hidden border border-stone-200">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-stone-400 hover:text-stone-800 p-1 z-10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="aspect-4/3 md:aspect-auto bg-stone-100 overflow-hidden relative">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-3 left-3 bg-stone-900 text-white text-[10px] font-semibold uppercase px-2 py-0.5 rounded">
                Batch 04
              </span>
            </div>

            <div className="p-6 flex flex-col justify-between space-y-4">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-stone-500">
                  {product.category}
                </div>
                <h3 className="text-lg font-serif font-medium text-stone-900 mt-1">
                  {product.title}
                </h3>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-xl font-serif font-semibold text-stone-900 tabular-nums">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.compareAtPrice > product.price && (
                    <span className="text-xs text-stone-400 line-through tabular-nums">
                      ${product.compareAtPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  {product.shortDesc}
                </p>

                {/* Variant Selector */}
                {product.variants.length > 0 && (
                  <div className="mt-4 space-y-1.5">
                    <span className="text-xs font-semibold text-stone-800">
                      Option: <span className="font-normal text-stone-600">{selectedVariant}</span>
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {product.variants[0].options.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setSelectedVariant(opt)}
                          className={`px-2.5 py-1 text-xs rounded border cursor-pointer ${
                            selectedVariant === opt
                              ? 'border-stone-900 bg-stone-900 text-white'
                              : 'border-stone-300 text-stone-700 hover:border-stone-600'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2 pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => {
                    onAddToCart(product, quantity, selectedVariant);
                    onClose();
                  }}
                  className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded cursor-pointer transition-colors shadow-sm"
                >
                  Add to Sanctuary (${(product.price * quantity).toFixed(2)})
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onViewFullDetail(product);
                  }}
                  className="w-full py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-medium rounded cursor-pointer transition-colors"
                >
                  View Full Specifications & Trial Terms &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

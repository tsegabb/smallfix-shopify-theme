import React from 'react';
import { Eye, Plus } from 'lucide-react';
import { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onQuickView,
  onQuickAdd
}) => {
  return (
    <div className="product-card group bg-white border border-stone-200/80 rounded overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      {/* Imagery (65-75% height) */}
      <div className="relative block aspect-4/3 bg-stone-100 overflow-hidden cursor-pointer" onClick={() => onSelectProduct(product)}>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {product.compareAtPrice > product.price && (
          <span className="absolute top-3 left-3 bg-stone-900 text-stone-100 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded">
            Save ${(product.compareAtPrice - product.price).toFixed(0)}
          </span>
        )}

        {/* Hover Action Badges */}
        <div className="absolute bottom-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="p-2 bg-white/90 hover:bg-white text-stone-800 rounded shadow-sm text-xs cursor-pointer"
            title="Quick Preview"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickAdd(product);
            }}
            className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded shadow-sm text-xs font-semibold flex items-center gap-1 cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Quick Add</span>
          </button>
        </div>
      </div>

      {/* Content & Metadata */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="text-[11px] font-mono uppercase tracking-wider text-stone-500 flex items-center justify-between">
            <span>{product.category}</span>
            <span className="text-amber-800 text-[10px] font-medium">{product.stockLeft} units left</span>
          </div>
          <h3
            className="text-sm font-semibold text-stone-900 mt-1 line-clamp-1 group-hover:text-stone-700 transition-colors cursor-pointer"
            onClick={() => onSelectProduct(product)}
          >
            {product.title}
          </h3>
          <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
            {product.shortDesc}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-stone-100">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-serif font-semibold text-stone-900 tabular-nums">
              ${product.price.toFixed(2)}
            </span>
            {product.compareAtPrice > product.price && (
              <span className="text-xs text-stone-400 line-through tabular-nums">
                ${product.compareAtPrice.toFixed(2)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-stone-600 font-medium">
            <span className="text-amber-500">★</span>
            <span className="tabular-nums">{product.rating}</span>
            <span className="text-stone-400 font-normal">({product.reviewCount})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

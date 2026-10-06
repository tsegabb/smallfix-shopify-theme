import React, { useState, useMemo, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { Product } from '../data/products';
import { SlidersHorizontal, Sparkles } from 'lucide-react';

interface CollectionPageProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  initialCategory?: string;
  onCategoryChange?: (category: string) => void;
}

export const CollectionPage: React.FC<CollectionPageProps> = ({
  products,
  onSelectProduct,
  onQuickView,
  onQuickAdd,
  initialCategory = 'All',
  onCategoryChange
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  const categories = [
    { label: 'Shop All', value: 'All' },
    { label: 'Cleaning', value: 'Cleaning' },
    { label: 'Power & cords', value: 'Power & cords' },
    { label: 'Organize', value: 'Organize' },
    { label: 'Kitchen', value: 'Kitchen' },
    { label: 'Best Sellers', value: 'Best Sellers' }
  ];

  const handleSelectCat = (val: string) => {
    setSelectedCategory(val);
    if (onCategoryChange) {
      onCategoryChange(val);
    }
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (selectedCategory === 'Best Sellers') {
          if (!p.isBestSeller) return false;
        } else if (selectedCategory !== 'All' && p.category !== selectedCategory) {
          return false;
        }
        if (inStockOnly && !p.inStock) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // featured
      });
  }, [products, selectedCategory, sortBy, inStockOnly]);

  return (
    <div className="py-12 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Collection Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <div className="text-xs uppercase tracking-widest text-orange-600 font-mono mb-2 flex items-center justify-center gap-1.5">
            <span className="text-orange-500">◆</span>
            <span>HOME & CLEANING GADGETS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-stone-900">
            {selectedCategory === 'All'
              ? 'Small Fixes for Everyday Home Annoyances'
              : `${selectedCategory} Gadgets`}
          </h1>
          <p className="text-stone-600 text-sm mt-3 leading-relaxed">
            {selectedCategory === 'Cleaning' && 'Electric spin scrubbers, crevice detailers, and grime-busting tools that cut weekly scrubbing time by 70%.'}
            {selectedCategory === 'Power & cords' && 'Magnetic cable management docks and weighted desk organizers that keep charger cords right at your fingertips.'}
            {selectedCategory === 'Kitchen' && 'One-handed soap dispensers, sponge caddies, and sink accessories designed to eliminate slippery counter messes.'}
            {selectedCategory === 'Organize' && 'Modular organizers and space-saving problem solvers designed for modern kitchens and workspaces.'}
            {selectedCategory === 'Best Sellers' && 'Our top-rated viral customer favorites backed by thousands of 5-star verified home reviews.'}
            {selectedCategory === 'All' && 'Smart, ergonomic gadgets that eradicate tedious chores, tame cord chaos, and keep your kitchen and bathroom looking effortlessly spotless.'}
          </p>
        </div>

        {/* Filter & Sort Bar */}
        <div className="bg-white border border-stone-200/80 rounded p-4 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
          
          {/* Categories Tab Bar */}
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => handleSelectCat(cat.value)}
                className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors cursor-pointer flex items-center gap-1 ${
                  selectedCategory === cat.value
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-950 hover:bg-stone-100'
                }`}
              >
                {cat.value === 'Best Sellers' && <Sparkles className="w-3 h-3 text-orange-400" />}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Controls: Stock Filter & Sort */}
          <div className="flex items-center gap-4 text-xs">
            <label className="flex items-center gap-1.5 cursor-pointer text-stone-700">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded text-orange-600 focus:ring-orange-600"
              />
              <span>In Stock Only</span>
            </label>

            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-stone-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border border-stone-300 rounded px-2.5 py-1.5 text-xs text-stone-800 focus:outline-hidden focus:border-stone-900 cursor-pointer"
              >
                <option value="featured">Best Sellers</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={onSelectProduct}
                onQuickView={onQuickView}
                onQuickAdd={onQuickAdd}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-white border border-stone-200 rounded">
            <p className="text-stone-600 text-sm">No gadgets match the selected category.</p>
            <button
              onClick={() => handleSelectCat('All')}
              className="mt-3 text-xs font-semibold text-orange-600 underline cursor-pointer"
            >
              Reset to All Gadgets
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

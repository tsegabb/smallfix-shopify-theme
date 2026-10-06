import React, { useState } from 'react';
import { Search, ShoppingBag, Menu, X, Sparkles } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  activeView: string;
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  onNavigate: (view: string) => void;
  brandName?: string;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenSearch,
  activeView,
  activeCategory,
  onSelectCategory,
  onNavigate,
  brandName = 'Smallfix'
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = [
    { label: 'Shop All', value: 'All' },
    { label: 'Cleaning', value: 'Cleaning' },
    { label: 'Power & cords', value: 'Power & cords' },
    { label: 'Organize', value: 'Organize' },
    { label: 'Kitchen', value: 'Kitchen' },
    { label: 'Best Sellers', value: 'Best Sellers' }
  ];

  const handleCategoryClick = (catValue: string) => {
    onSelectCategory(catValue);
    onNavigate('catalog');
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 transition-all duration-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Zone 1: Single Brand Wordmark with Orange Diamond */}
        <div className="flex items-center">
          <button
            onClick={() => {
              onNavigate('home');
              onSelectCategory('All');
            }}
            className="inline-flex items-center gap-2 text-xl sm:text-2xl font-bold tracking-tight text-stone-900 hover:text-stone-700 transition-colors cursor-pointer"
          >
            <span className="text-orange-500 text-lg sm:text-xl leading-none select-none">◆</span>
            <span>{brandName}</span>
          </button>
        </div>

        {/* Zone 2: Genuine High-Converting Navigation Bar for Home & Cleaning Gadgets */}
        <nav className="hidden md:flex items-center space-x-7 text-sm font-medium text-stone-700">
          {categories.map((cat) => {
            const isSelected = activeView === 'catalog' && activeCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => handleCategoryClick(cat.value)}
                className={`py-1.5 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'text-stone-950 border-orange-500 font-semibold'
                    : 'border-transparent hover:text-stone-950 hover:border-stone-300'
                }`}
              >
                {cat.value === 'Best Sellers' && (
                  <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                )}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions (Free Shipping Threshold, Search, Bag) */}
        <div className="flex items-center space-x-4 text-stone-800">
          <button
            onClick={onOpenSearch}
            className="p-1.5 hover:text-stone-950 transition-colors cursor-pointer"
            aria-label="Search"
            title="Search gadgets"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            onClick={() => handleCategoryClick('All')}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 bg-orange-50 border border-orange-200 text-orange-700 rounded transition-colors cursor-pointer"
            title="Free shipping on orders $35+"
          >
            <span>Free Shipping $35+</span>
          </button>

          <button
            onClick={onOpenCart}
            className="relative p-1.5 hover:text-stone-950 transition-colors cursor-pointer flex items-center gap-1.5"
            aria-label="Cart Bag"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="cart-count-badge bg-orange-500 text-white text-[11px] font-semibold min-w-5 h-5 px-1 rounded-full flex items-center justify-center tabular-nums shadow-2xs">
              {cartCount}
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 hover:text-stone-950 cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer with Category Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white px-4 py-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="text-[11px] font-mono uppercase tracking-wider text-stone-400 px-2 pb-1">
            Browse Collections
          </div>
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => handleCategoryClick(cat.value)}
              className={`w-full text-left px-3 py-2 rounded text-sm font-medium transition-colors flex items-center justify-between ${
                activeView === 'catalog' && activeCategory === cat.value
                  ? 'bg-orange-50 text-orange-700 font-semibold'
                  : 'text-stone-800 hover:bg-stone-50'
              }`}
            >
              <span>{cat.label}</span>
              {cat.value === 'Best Sellers' && (
                <span className="text-[10px] font-mono uppercase bg-orange-100 text-orange-800 px-1.5 py-0.5 rounded">
                  Hot
                </span>
              )}
            </button>
          ))}
          <div className="pt-2 border-t border-stone-100 flex items-center justify-between px-3 text-xs text-stone-500">
            <span>Free delivery on all orders $35+</span>
            <span className="font-semibold text-orange-600">30-Day Guarantee</span>
          </div>
        </div>
      )}
    </header>
  );
};

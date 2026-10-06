import React, { useState } from 'react';
import { ArrowLeft, Check, ShieldCheck, Truck, Moon, Star, Sparkles, ChevronDown } from 'lucide-react';
import { Product, PRODUCTS } from '../data/products';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number, selectedVariant?: string) => void;
  onBuyNow: (product: Product, quantity: number, selectedVariant?: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  onBack,
  onAddToCart,
  onBuyNow,
  onSelectProduct
}) => {
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants[0]?.options[0] || ''
  );
  const [activeTab, setActiveTab] = useState<'specs' | 'shipping' | 'reviews'>('specs');
  const [addedBundle, setAddedBundle] = useState(false);

  // Frequently bought together companion
  const companionProduct = PRODUCTS.find((p) => p.id !== product.id) || PRODUCTS[1];

  const handleAddToCart = () => {
    onAddToCart(product, quantity, selectedVariant);
    if (addedBundle) {
      onAddToCart(companionProduct, 1);
    }
  };

  const handleBuyNow = () => {
    onBuyNow(product, quantity, selectedVariant);
  };

  return (
    <div className="py-8 sm:py-12 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb / Back button */}
        <div className="mb-6">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Catalog</span>
          </button>
        </div>

        {/* 2-Column Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14">
          
          {/* Left Column: Gallery */}
          <div className="lg:col-span-7">
            <div className="sticky top-28 space-y-4">
              <div className="aspect-4/3 sm:aspect-square bg-stone-100 rounded overflow-hidden border border-stone-200/80 relative shadow-xs">
                <img
                  src={selectedImage}
                  alt={product.title}
                  className="w-full h-full object-cover object-center transition-all duration-300"
                  referrerPolicy="no-referrer"
                />

                {product.compareAtPrice > product.price && (
                  <span className="absolute top-4 left-4 bg-stone-900 text-stone-100 text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded">
                    Save ${(product.compareAtPrice - product.price).toFixed(0)}
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 shrink-0 border rounded overflow-hidden transition-all cursor-pointer ${
                      selectedImage === img
                        ? 'border-stone-900 ring-2 ring-stone-900/10'
                        : 'border-stone-200 hover:border-stone-400 opacity-75'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>

              {/* Biological Specs Quick Strip */}
              <div className="bg-stone-100/80 border border-stone-200/70 p-4 rounded text-xs text-stone-700 space-y-2">
                <div className="font-semibold text-stone-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  <span>Clinical Hardware Invariants</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-600">
                  <div>· Zero-EMF Shielded Constant DC Driver</div>
                  <div>· 0.00% Retinal Flicker Certified</div>
                  <div>· Precision CNC Aluminum Heat Sink</div>
                  <div>· Optical Grade Borosilicate Diffusion</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="lg:col-span-5">
            <div className="space-y-6">
              
              {/* Category, Rating, Stock */}
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span className="uppercase tracking-widest font-mono text-stone-600">{product.category}</span>
                <div className="flex items-center gap-1.5 text-stone-800 font-medium">
                  <div className="flex text-amber-500 text-xs">
                    {'★★★★★'}
                  </div>
                  <span className="tabular-nums">{product.rating}</span>
                  <span className="text-stone-400 font-normal">({product.reviewCount} reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-serif font-medium text-stone-900 leading-tight">
                {product.title}
              </h1>

              {/* Pricing */}
              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-serif font-semibold text-stone-900 tabular-nums">
                  ${product.price.toFixed(2)}
                </span>
                {product.compareAtPrice > product.price && (
                  <span className="text-base text-stone-400 line-through tabular-nums">
                    ${product.compareAtPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-xs text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded font-medium">
                  In Stock · Dispatches 24h
                </span>
              </div>

              {/* Dropshipping High-Conversion Urgency Indicator */}
              <div className="p-3 bg-amber-50/80 border border-amber-200/90 rounded text-xs text-amber-900 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse"></span>
                  <span className="font-medium">
                    Only <strong className="tabular-nums">{product.stockLeft} units</strong> remaining in {product.batch}
                  </span>
                </div>
                <span className="font-mono text-[11px] text-amber-800 uppercase">Express Dispatch</span>
              </div>

              {/* Variant Selector */}
              {product.variants.map((v, idx) => (
                <div key={idx} className="space-y-2 pt-1">
                  <div className="text-xs font-semibold uppercase tracking-wider text-stone-800 flex justify-between">
                    <span>{v.name}: <span className="font-normal text-stone-600">{selectedVariant}</span></span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {v.options.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setSelectedVariant(opt)}
                        className={`px-4 py-2 text-xs font-medium rounded transition-all cursor-pointer ${
                          selectedVariant === opt
                            ? 'bg-stone-900 text-white border border-stone-900 shadow-xs'
                            : 'bg-white text-stone-700 border border-stone-300 hover:border-stone-900'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {/* Quantity Stepper & Add to Cart */}
              <div className="flex items-center gap-3 pt-2">
                <div className="flex items-center border border-stone-300 rounded bg-white h-12 px-2 shadow-xs">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2 text-stone-600 hover:text-stone-950 font-semibold cursor-pointer text-base"
                  >
                    &minus;
                  </button>
                  <span className="w-10 text-center text-sm font-semibold tabular-nums text-stone-900">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-2 text-stone-600 hover:text-stone-950 font-semibold cursor-pointer text-base"
                  >
                    &plus;
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 h-12 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm rounded transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Add to Sanctuary</span>
                  <span className="text-stone-400 font-mono text-xs">·</span>
                  <span className="text-stone-200 text-xs tabular-nums">
                    ${(product.price * quantity).toFixed(2)}
                  </span>
                </button>
              </div>

              {/* Instant Checkout Button */}
              <button
                type="button"
                onClick={handleBuyNow}
                className="w-full h-12 bg-amber-800 hover:bg-amber-900 text-white font-medium text-sm rounded transition-colors shadow-sm flex items-center justify-center cursor-pointer"
              >
                Instant Express Checkout
              </button>

              {/* Frequently Bought Together Bundle Cross-Sell (High AOV Booster) */}
              <div className="p-4 bg-white border border-stone-200/90 rounded space-y-3 shadow-xs">
                <div className="text-xs font-semibold uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Frequently Paired Circadian Ritual (Save 15%)</span>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    src={companionProduct.image}
                    alt={companionProduct.title}
                    className="w-14 h-14 object-cover rounded border border-stone-200"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0 text-xs">
                    <div className="font-medium text-stone-900 truncate">{companionProduct.title}</div>
                    <div className="text-stone-500 tabular-nums">
                      +${companionProduct.price.toFixed(2)}{' '}
                      <span className="line-through text-stone-400">${companionProduct.compareAtPrice.toFixed(2)}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAddedBundle(!addedBundle)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded cursor-pointer transition-colors ${
                      addedBundle
                        ? 'bg-emerald-800 text-white'
                        : 'bg-stone-100 text-stone-800 hover:bg-stone-200'
                    }`}
                  >
                    {addedBundle ? '✓ Added' : '+ Add Bundle'}
                  </button>
                </div>
              </div>

              {/* Value Guarantees Strip */}
              <div className="border-t border-stone-200 pt-5 space-y-3 text-xs text-stone-600">
                <div className="flex items-center gap-2.5">
                  <Truck className="w-4 h-4 text-orange-600 shrink-0" />
                  <span>Free Tracked Express Delivery on all orders $35+ (3–5 business days)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Moon className="w-4 h-4 text-orange-600 shrink-0" />
                  <span>30-Day Clean Guarantee — 100% full money-back if it doesn't solve your chore</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-orange-600 shrink-0" />
                  <span>1-Year Quality Replacement Warranty included on all motors and hardware</span>
                </div>
              </div>

              {/* Accordion Tabs */}
              <div className="border-t border-stone-200 pt-4 space-y-3">
                <div className="flex border-b border-stone-200 text-xs font-semibold">
                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`pb-2.5 px-3 border-b-2 cursor-pointer transition-colors ${
                      activeTab === 'specs'
                        ? 'border-stone-900 text-stone-900'
                        : 'border-transparent text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    Specifications
                  </button>
                  <button
                    onClick={() => setActiveTab('shipping')}
                    className={`pb-2.5 px-3 border-b-2 cursor-pointer transition-colors ${
                      activeTab === 'shipping'
                        ? 'border-stone-900 text-stone-900'
                        : 'border-transparent text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    Shipping & Trial
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`pb-2.5 px-3 border-b-2 cursor-pointer transition-colors ${
                      activeTab === 'reviews'
                        ? 'border-stone-900 text-stone-900'
                        : 'border-transparent text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    Customer Reviews ({product.reviewCount})
                  </button>
                </div>

                <div className="pt-2 text-xs text-stone-700 leading-relaxed">
                  {activeTab === 'specs' && (
                    <div className="space-y-2">
                      <p className="text-stone-600 mb-3">{product.description}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 border-t border-stone-200 pt-2 font-mono text-[11px]">
                        {Object.entries(product.specs).map(([key, val]) => (
                          <div key={key} className="bg-stone-100/70 p-2 rounded">
                            <span className="text-stone-500 font-sans block text-[10px] uppercase">{key}</span>
                            <span className="text-stone-900 font-medium">{val}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'shipping' && (
                    <div className="space-y-3">
                      <p>
                        <strong>Global Express Fulfillment:</strong> Dispatched from our central logistics hubs within 24 hours with end-to-end tracking provided via email/SMS.
                      </p>
                      <p>
                        <strong>30-Night Risk-Free Rest Trial:</strong> Experience true biological circadian entrainment in your sanctuary. If you are unsatisfied for any reason, request a prepaid return label for a 100% full refund.
                      </p>
                    </div>
                  )}

                  {activeTab === 'reviews' && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 bg-stone-100 p-3 rounded">
                        <div className="text-2xl font-serif font-bold text-stone-900 tabular-nums">{product.rating}</div>
                        <div className="text-xs">
                          <div className="text-amber-500">★★★★★</div>
                          <span className="text-stone-600">Based on {product.reviewCount} verified restorative reviews</span>
                        </div>
                      </div>
                      <div className="space-y-2 divide-y divide-stone-100 pt-1">
                        <div className="pt-2">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-semibold text-stone-900">David M. — Verified Buyer</span>
                            <span className="text-stone-400">3 days ago</span>
                          </div>
                          <p className="text-stone-600 mt-1">
                            "The warm 1,800K light is magical. No more harsh blue light before bed. Sleep latency dropped from 40 mins to 10 mins."
                          </p>
                        </div>
                        <div className="pt-2">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-semibold text-stone-900">Dr. Sarah L. — Verified Buyer</span>
                            <span className="text-stone-400">1 week ago</span>
                          </div>
                          <p className="text-stone-600 mt-1">
                            "High grade machining. Truly zero flicker when recorded on 240fps slow-mo camera. Very impressed."
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Sticky Mobile Add to Cart (Fixed bar when scrolling on mobile) */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-stone-200 px-4 py-3 md:hidden flex items-center justify-between gap-4 shadow-lg">
        <div className="truncate">
          <div className="text-xs font-semibold text-stone-900 truncate">{product.title}</div>
          <div className="text-xs font-semibold text-stone-700 tabular-nums">${product.price.toFixed(2)}</div>
        </div>
        <button
          type="button"
          onClick={handleAddToCart}
          className="px-5 py-2.5 bg-stone-900 text-white text-xs font-semibold rounded shrink-0 shadow-sm cursor-pointer"
        >
          Add to Sanctuary
        </button>
      </div>
    </div>
  );
};

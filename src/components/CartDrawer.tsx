import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, Tag, ShieldCheck, Check } from 'lucide-react';
import { Product } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
  freeShippingThreshold?: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  freeShippingThreshold = 75
}) => {
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [cartNote, setCartNote] = useState('');
  const [showNote, setShowNote] = useState(false);

  if (!isOpen) return null;

  const rawSubtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = discountApplied ? rawSubtotal * 0.10 : 0;
  const total = rawSubtotal - discountAmount;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - rawSubtotal);
  const shippingProgress = Math.min(100, (rawSubtotal / freeShippingThreshold) * 100);

  const handleApplyDiscount = (e: React.FormEvent) => {
    e.preventDefault();
    if (discountCode.trim().toUpperCase() === 'SMALLFIX10' || discountCode.trim().length > 3) {
      setDiscountApplied(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-950/45 backdrop-blur-xs transition-opacity cursor-pointer"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-stone-50 border-l border-stone-200 shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="px-6 py-5 bg-white border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-stone-900">Your Smallfix Bag</h2>
              <span className="text-xs font-mono bg-stone-100 text-stone-700 px-2 py-0.5 rounded tabular-nums">
                {items.reduce((s, i) => s + i.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-stone-400 hover:text-stone-800 p-1 cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-6 py-3.5 bg-stone-100/90 border-b border-stone-200 space-y-1.5">
            <div className="flex justify-between text-xs text-stone-700 font-medium">
              {remainingForFreeShipping > 0 ? (
                <span>
                  Add <strong className="text-stone-900 font-semibold tabular-nums">${remainingForFreeShipping.toFixed(2)}</strong> for Free Express Delivery
                </span>
              ) : (
                <span className="text-emerald-800 font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Free Express Delivery Unlocked!
                </span>
              )}
              <span className="text-stone-500 tabular-nums">{Math.round(shippingProgress)}%</span>
            </div>
            <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-stone-900 h-full transition-all duration-300 ease-out"
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>

          {/* Line Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {items.length > 0 ? (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 py-3 border-b border-stone-200/60 items-center justify-between"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-16 h-16 object-cover rounded border border-stone-200 bg-stone-100 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0 pr-2">
                    <h4 className="text-xs font-semibold text-stone-900 truncate">
                      {item.product.title}
                    </h4>
                    {item.selectedVariant && (
                      <p className="text-[11px] text-stone-500 mt-0.5">{item.selectedVariant}</p>
                    )}
                    <div className="text-xs font-medium text-stone-900 mt-1 tabular-nums">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center border border-stone-300 rounded bg-white text-xs">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                        className="px-2 py-1 text-stone-500 hover:text-stone-900 cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 font-medium tabular-nums text-stone-900">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="px-2 py-1 text-stone-500 hover:text-stone-900 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-[11px] text-stone-400 hover:text-rose-600 transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-16 text-center text-stone-500">
                <p className="text-sm">Your Smallfix bag is currently empty.</p>
                <button
                  onClick={onClose}
                  className="mt-4 text-xs font-semibold text-stone-900 border-b border-stone-900 pb-0.5 cursor-pointer"
                >
                  Explore Home Gadgets &rarr;
                </button>
              </div>
            )}
          </div>

          {/* Drawer Footer */}
          {items.length > 0 && (
            <div className="px-6 py-5 bg-white border-t border-stone-200 space-y-4">
              
              {/* Discount Code Input */}
              <form onSubmit={handleApplyDiscount} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Discount code (try SMALLFIX10)"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-xs border border-stone-300 rounded focus:border-stone-900 focus:outline-hidden"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-900 text-xs font-semibold rounded cursor-pointer"
                >
                  Apply
                </button>
              </form>

              {discountApplied && (
                <div className="flex justify-between text-xs text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded">
                  <span>10% Restorative Discount</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              {/* Delivery Note Toggle */}
              <div>
                <button
                  type="button"
                  onClick={() => setShowNote(!showNote)}
                  className="text-[11px] text-stone-500 hover:text-stone-900 underline cursor-pointer"
                >
                  {showNote ? 'Hide delivery notes' : '+ Add gift note or delivery instructions'}
                </button>
                {showNote && (
                  <textarea
                    value={cartNote}
                    onChange={(e) => setCartNote(e.target.value)}
                    placeholder="Enter instructions for delivery..."
                    className="w-full mt-2 p-2 border border-stone-200 rounded text-xs text-stone-800"
                    rows={2}
                  />
                )}
              </div>

              {/* Summary */}
              <div className="space-y-1.5 pt-1 text-sm">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900 tabular-nums">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-stone-500">
                  <span>Insured Express Shipping</span>
                  <span className="tabular-nums">
                    {remainingForFreeShipping === 0 ? 'FREE' : '$6.50'}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={onCheckout}
                className="w-full flex items-center justify-center px-6 py-3.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm rounded shadow-sm transition-colors cursor-pointer gap-2"
              >
                <span>Proceed to Secure Checkout</span>
                <span className="tabular-nums">(${total.toFixed(2)})</span>
              </button>

              <div className="flex items-center justify-center gap-3 text-[11px] text-stone-500 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> 256-Bit SSL
                </span>
                <span>·</span>
                <span>30-Night Sleep Trial</span>
                <span>·</span>
                <span>Free Returns</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

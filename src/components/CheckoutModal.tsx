import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, CreditCard, Lock, Truck, ArrowLeft, Sparkles, Check } from 'lucide-react';
import { CartItem } from './CartDrawer';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'checkout' | 'success'>('checkout');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'shoppay' | 'applepay'>('card');
  const [selectedCardPreset, setSelectedCardPreset] = useState<'visa' | 'mastercard' | 'amex' | 'discover'>('visa');
  const [formData, setFormData] = useState({
    email: 'customer@example.com',
    firstName: 'Alex',
    lastName: 'Morgan',
    address: '742 Evergreen Terrace',
    city: 'Springfield',
    state: 'OR',
    zip: '97477',
    cardNumber: '4242 4242 4242 4242',
    cardExp: '12/28',
    cardCvc: '888'
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const freeShipping = subtotal >= 35;
  const shippingCost = freeShipping ? 0 : 4.95;
  const tax = Number((subtotal * 0.08).toFixed(2));
  const finalTotal = (subtotal + shippingCost + tax).toFixed(2);

  // Detect card brand from number or preset
  const detectBrand = (num: string): 'VISA' | 'MASTERCARD' | 'AMEX' | 'DISCOVER' | 'CARD' => {
    const clean = num.replace(/\D/g, '');
    if (clean.startsWith('4')) return 'VISA';
    if (clean.startsWith('5')) return 'MASTERCARD';
    if (clean.startsWith('34') || clean.startsWith('37')) return 'AMEX';
    if (clean.startsWith('6011') || clean.startsWith('65') || clean.startsWith('64')) return 'DISCOVER';
    return 'CARD';
  };

  const detectedBrand = detectBrand(formData.cardNumber);

  const handleSelectPresetCard = (preset: 'visa' | 'mastercard' | 'amex' | 'discover') => {
    setSelectedCardPreset(preset);
    setPaymentMethod('card');
    if (preset === 'visa') {
      setFormData((prev) => ({ ...prev, cardNumber: '4242 4242 4242 4242', cardExp: '12/28', cardCvc: '888' }));
    } else if (preset === 'mastercard') {
      setFormData((prev) => ({ ...prev, cardNumber: '5555 5555 5555 5555', cardExp: '10/27', cardCvc: '543' }));
    } else if (preset === 'amex') {
      setFormData((prev) => ({ ...prev, cardNumber: '3782 8224 6310 005', cardExp: '08/29', cardCvc: '4321' }));
    } else if (preset === 'discover') {
      setFormData((prev) => ({ ...prev, cardNumber: '6011 0000 0000 0000', cardExp: '05/28', cardCvc: '987' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
    }, 1100);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-stone-950/70 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden border border-stone-200">
          
          {/* Header */}
          <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50/80">
            <div className="flex items-center gap-2">
              <span className="text-orange-500 font-bold text-lg">◆</span>
              <span className="font-bold text-stone-900 text-base">Smallfix Secure Checkout</span>
            </div>
            <button onClick={onClose} className="text-stone-400 hover:text-stone-700 p-1 cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>

          {step === 'checkout' ? (
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Accepted Payment Cards Strip */}
                <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-1.5 font-medium text-stone-700">
                    <Lock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Accepted Payment Cards:</span>
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap font-mono text-[10px] font-bold">
                    <span className={`px-2 py-0.5 rounded border transition-colors ${
                      paymentMethod === 'card' && detectedBrand === 'VISA'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                        : 'bg-white text-stone-700 border-stone-200'
                    }`}>
                      VISA
                    </span>
                    <span className={`px-2 py-0.5 rounded border transition-colors ${
                      paymentMethod === 'card' && detectedBrand === 'MASTERCARD'
                        ? 'bg-amber-600 text-white border-amber-600 shadow-2xs'
                        : 'bg-white text-stone-700 border-stone-200'
                    }`}>
                      MASTERCARD
                    </span>
                    <span className={`px-2 py-0.5 rounded border transition-colors ${
                      paymentMethod === 'card' && detectedBrand === 'AMEX'
                        ? 'bg-cyan-700 text-white border-cyan-700 shadow-2xs'
                        : 'bg-white text-stone-700 border-stone-200'
                    }`}>
                      AMEX
                    </span>
                    <span className={`px-2 py-0.5 rounded border transition-colors ${
                      paymentMethod === 'card' && detectedBrand === 'DISCOVER'
                        ? 'bg-orange-600 text-white border-orange-600 shadow-2xs'
                        : 'bg-white text-stone-700 border-stone-200'
                    }`}>
                      DISCOVER
                    </span>
                    <span className={`px-2 py-0.5 rounded border transition-colors ${
                      paymentMethod === 'shoppay'
                        ? 'bg-purple-700 text-white border-purple-700 shadow-2xs'
                        : 'bg-white text-purple-700 border-stone-200'
                    }`}>
                      SHOP PAY
                    </span>
                    <span className={`px-2 py-0.5 rounded border transition-colors ${
                      paymentMethod === 'applepay'
                        ? 'bg-stone-900 text-white border-stone-900 shadow-2xs'
                        : 'bg-white text-stone-700 border-stone-200'
                    }`}>
                      APPLE PAY
                    </span>
                  </div>
                </div>

                {/* Express Checkout Options */}
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
                    Payment Method
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`py-2.5 rounded border text-xs font-semibold cursor-pointer transition-all ${
                        paymentMethod === 'card'
                          ? 'border-orange-500 bg-orange-50 text-orange-950 ring-2 ring-orange-500/20'
                          : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      Credit / Debit Card
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('shoppay')}
                      className={`py-2.5 rounded border text-xs font-semibold cursor-pointer transition-all ${
                        paymentMethod === 'shoppay'
                          ? 'border-purple-600 bg-purple-50 text-purple-900 ring-2 ring-purple-600/20'
                          : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      Shop Pay
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('applepay')}
                      className={`py-2.5 rounded border text-xs font-semibold cursor-pointer transition-all ${
                        paymentMethod === 'applepay'
                          ? 'border-stone-900 bg-stone-900 text-white'
                          : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      Apple / G-Pay
                    </button>
                  </div>
                </div>

                {/* Customer Contact & Shipping Address */}
                <div className="space-y-3">
                  <div className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                    Contact & Delivery Address
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Email address"
                      className="sm:col-span-2 px-3 py-2 border border-stone-300 rounded focus:border-stone-900 focus:outline-hidden"
                      required
                    />
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="First name"
                      className="px-3 py-2 border border-stone-300 rounded focus:border-stone-900 focus:outline-hidden"
                      required
                    />
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="Last name"
                      className="px-3 py-2 border border-stone-300 rounded focus:border-stone-900 focus:outline-hidden"
                      required
                    />
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Street Address"
                      className="sm:col-span-2 px-3 py-2 border border-stone-300 rounded focus:border-stone-900 focus:outline-hidden"
                      required
                    />
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="City"
                      className="px-3 py-2 border border-stone-300 rounded focus:border-stone-900 focus:outline-hidden"
                      required
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        placeholder="State"
                        className="px-3 py-2 border border-stone-300 rounded focus:border-stone-900 focus:outline-hidden"
                        required
                      />
                      <input
                        type="text"
                        value={formData.zip}
                        onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                        placeholder="ZIP"
                        className="px-3 py-2 border border-stone-300 rounded focus:border-stone-900 focus:outline-hidden"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Credit Card Input Details & 1-Click Card Brand Selector */}
                {paymentMethod === 'card' && (
                  <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg space-y-3">
                    <div className="flex items-center justify-between text-xs font-semibold text-stone-800">
                      <span className="flex items-center gap-1.5">
                        <CreditCard className="w-4 h-4 text-orange-600" />
                        <span>Credit / Debit Card Details</span>
                        <span className="ml-1 text-[11px] px-2 py-0.5 bg-orange-100 text-orange-800 rounded font-mono font-bold">
                          {detectedBrand}
                        </span>
                      </span>
                      <span className="text-[11px] text-stone-500 font-mono">Encrypted 256-Bit SSL</span>
                    </div>

                    {/* Quick Card Testing Selector */}
                    <div className="flex items-center gap-1.5 flex-wrap text-[11px]">
                      <span className="text-stone-500 text-[10px]">Test Card:</span>
                      <button
                        type="button"
                        onClick={() => handleSelectPresetCard('visa')}
                        className={`px-2 py-0.5 rounded border font-mono text-[10px] cursor-pointer ${
                          selectedCardPreset === 'visa' ? 'bg-stone-900 text-white border-stone-900' : 'bg-white text-stone-700 border-stone-200'
                        }`}
                      >
                        Visa (4242)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSelectPresetCard('mastercard')}
                        className={`px-2 py-0.5 rounded border font-mono text-[10px] cursor-pointer ${
                          selectedCardPreset === 'mastercard' ? 'bg-stone-900 text-white border-stone-900' : 'bg-white text-stone-700 border-stone-200'
                        }`}
                      >
                        Mastercard (5555)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSelectPresetCard('amex')}
                        className={`px-2 py-0.5 rounded border font-mono text-[10px] cursor-pointer ${
                          selectedCardPreset === 'amex' ? 'bg-stone-900 text-white border-stone-900' : 'bg-white text-stone-700 border-stone-200'
                        }`}
                      >
                        Amex (3782)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSelectPresetCard('discover')}
                        className={`px-2 py-0.5 rounded border font-mono text-[10px] cursor-pointer ${
                          selectedCardPreset === 'discover' ? 'bg-stone-900 text-white border-stone-900' : 'bg-white text-stone-700 border-stone-200'
                        }`}
                      >
                        Discover (6011)
                      </button>
                    </div>

                    <div className="space-y-2 text-xs">
                      <input
                        type="text"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        placeholder="Card number (Visa, Mastercard, Amex, Discover)"
                        className="w-full px-3 py-2 bg-white border border-stone-300 rounded focus:border-stone-900 focus:outline-hidden font-mono"
                        required
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={formData.cardExp}
                          onChange={(e) => setFormData({ ...formData, cardExp: e.target.value })}
                          placeholder="Expiration (MM/YY)"
                          className="px-3 py-2 bg-white border border-stone-300 rounded focus:border-stone-900 focus:outline-hidden font-mono"
                          required
                        />
                        <input
                          type="text"
                          value={formData.cardCvc}
                          onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                          placeholder="Security Code (CVV)"
                          className="px-3 py-2 bg-white border border-stone-300 rounded focus:border-stone-900 focus:outline-hidden font-mono"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Order Summary & Pricing Breakdown */}
                <div className="bg-stone-50 p-4 rounded-lg space-y-2 text-xs border border-stone-200">
                  <div className="flex justify-between text-stone-600">
                    <span>Gadgets Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                    <span className="tabular-nums font-mono font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Tracked Shipping</span>
                    <span className="tabular-nums font-mono">
                      {freeShipping ? <strong className="text-emerald-700">FREE ($35+ Unlocked)</strong> : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Estimated Sales Tax</span>
                    <span className="tabular-nums font-mono">${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-stone-200 pt-2 flex justify-between font-bold text-sm text-stone-900">
                    <span>Total Amount Charged</span>
                    <span className="tabular-nums font-mono">${finalTotal}</span>
                  </div>
                </div>

                {/* Pay Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-lg transition-colors shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <span>Processing Payment via Shopify Gateways...</span>
                  ) : (
                    <span>Complete Order (${finalTotal})</span>
                  )}
                </button>

                <div className="text-center text-[11px] text-stone-500 flex items-center justify-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Backed by Smallfix 30-Day Clean Guarantee & 1-Year Warranty</span>
                </div>
              </form>
            </div>
          ) : (
            /* Step 2: Order Placed Successfully */
            <div className="p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-stone-900">Order #SF-1048 Confirmed!</h2>
              <p className="text-sm text-stone-600 max-w-md mx-auto">
                Payment of <strong className="text-stone-900">${finalTotal}</strong> was processed successfully using{' '}
                <strong className="text-stone-900">
                  {paymentMethod === 'card'
                    ? `${detectedBrand} card (•••• ${formData.cardNumber.slice(-4)})`
                    : paymentMethod === 'shoppay'
                    ? 'Shop Pay'
                    : 'Apple Pay'}
                </strong>.
                We’ve sent a confirmation email with package tracking to <strong>{formData.email}</strong>.
              </p>

              <div className="bg-stone-50 p-4 rounded-lg border border-stone-200 text-left text-xs max-w-md mx-auto space-y-2">
                <div className="font-semibold text-stone-800 flex items-center justify-between">
                  <span>Dispatch Timing:</span>
                  <span className="text-emerald-700 font-bold">Leaves within 2 business days</span>
                </div>
                <div className="text-stone-600">
                  Shipping to: {formData.firstName} {formData.lastName}, {formData.address}, {formData.city}, {formData.state} {formData.zip}
                </div>
                <div className="border-t border-stone-200 pt-2 flex items-center justify-between text-stone-500">
                  <span>Payment Gateway:</span>
                  <span className="font-semibold text-stone-700">Shopify Payments (256-Bit SSL)</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => {
                    setStep('checkout');
                    onClose();
                  }}
                  className="px-6 py-3 bg-stone-900 text-white font-semibold text-xs rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  Continue Shopping Smallfix &rarr;
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PRODUCTS, Product } from './data/products';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { TrustBadges } from './components/TrustBadges';
import { ProductCard } from './components/ProductCard';
import { ProductDetail } from './components/ProductDetail';
import { CollectionPage } from './components/CollectionPage';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { BenefitsSection } from './components/BenefitsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';
import { QuickViewModal } from './components/QuickViewModal';
import { SearchModal } from './components/SearchModal';
import { CheckoutModal } from './components/CheckoutModal';
import { NicheStrategyDossier } from './components/NicheStrategyDossier';
import { ThemeCustomizer, ThemeSettingsState } from './components/ThemeCustomizer';
import { ThemeCodeInspector } from './components/ThemeCodeInspector';
import { SHOPIFY_THEME_FILES } from './data/themeFiles';
import JSZip from 'jszip';
import { ArrowRight } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<string>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [downloadingZip, setDownloadingZip] = useState(false);

  // Cart State (Initialized with 1 item for immediate realistic checkout experience)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0],
      quantity: 1,
      selectedVariant: 'Clean White & Slate Gray'
    }
  ]);

  // Shopify OS 2.0 Theme Settings State
  const defaultSettings: ThemeSettingsState = {
    brandName: 'Smallfix',
    showAnnouncement: true,
    announcementText: 'FREE SHIPPING ON ORDERS $35+ · SMALL FIXES FOR EVERYDAY HOME ANNOYANCES',
    freeShippingThreshold: 35,
    showUrgency: true,
    showStickyAtc: true,
    colorPreset: 'obsidian'
  };

  const [themeSettings, setThemeSettings] = useState<ThemeSettingsState>(defaultSettings);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');

  // Handlers
  const handleOpenProduct = (product: Product) => {
    setSelectedProduct(product);
    setActiveView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (product: Product, quantity = 1, selectedVariant?: string) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      }
      return [...prev, { product, quantity, selectedVariant }];
    });
    setCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleBuyNow = (product: Product, quantity = 1, selectedVariant?: string) => {
    handleAddToCart(product, quantity, selectedVariant);
    setCartOpen(false);
    setCheckoutModalOpen(true);
  };

  const handleDownloadZip = async () => {
    try {
      setDownloadingZip(true);
      const zip = new JSZip();
      SHOPIFY_THEME_FILES.forEach((file) => {
        zip.file(file.path, file.content);
      });
      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'smallfix-shopify-os2-theme.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to generate theme zip:', err);
    } finally {
      setDownloadingZip(false);
    }
  };

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, i) => acc + i.product.price * i.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans selection:bg-stone-900 selection:text-white">
      {/* 1. Global Announcement Bar */}
      <AnnouncementBar
        show={themeSettings.showAnnouncement}
        text={themeSettings.announcementText}
        onNavigateToCollection={() => setActiveView('catalog')}
      />

      {/* 2. Top Bar Navigation Contract — 100% Customer-Facing Home & Cleaning Niche Navigation */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        activeView={activeView}
        activeCategory={activeCategoryFilter}
        onSelectCategory={(cat) => {
          setActiveCategoryFilter(cat);
          setActiveView('catalog');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigate={(view) => {
          setActiveView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        brandName={themeSettings.brandName}
      />

      {/* 3. Main Route Views */}
      <main className="flex-1">
        {/* VIEW: HOME */}
        {activeView === 'home' && (
          <>
            <HeroBanner
              onShopClick={() => {
                setActiveView('catalog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onExploreScience={() => {
                setActiveCategoryFilter('Best Sellers');
                setActiveView('catalog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            <TrustBadges />

            {/* Featured Hardware Collection Section */}
            <section className="py-16 sm:py-24 bg-stone-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-orange-600 font-mono mb-2 flex items-center gap-1.5">
                      <span className="text-orange-500">◆</span>
                      <span>CHORE ELIMINATION CATALOG</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900">
                      Problem-Solving Home Gadgets
                    </h2>
                    <p className="text-stone-600 mt-2 max-w-xl text-sm sm:text-base">
                      Tested cleaning and organization gadgets engineered to save you hours of scrubbing and fix daily home annoyances.
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <button
                      onClick={() => setActiveView('catalog')}
                      className="text-sm font-semibold text-stone-900 hover:text-stone-600 inline-flex items-center gap-1.5 cursor-pointer group"
                    >
                      <span>Explore All Home Gadgets</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {PRODUCTS.map((prod) => (
                    <ProductCard
                      key={prod.id}
                      product={prod}
                      onSelectProduct={handleOpenProduct}
                      onQuickView={(p) => setQuickViewProduct(p)}
                      onQuickAdd={(p) => handleAddToCart(p, 1)}
                    />
                  ))}
                </div>
              </div>
            </section>

            <BenefitsSection />

            <TestimonialsSection />

            <FaqSection />

            <NewsletterSection />
          </>
        )}

        {/* VIEW: CATALOG / COLLECTION */}
        {activeView === 'catalog' && (
          <CollectionPage
            products={PRODUCTS}
            onSelectProduct={handleOpenProduct}
            onQuickView={(p) => setQuickViewProduct(p)}
            onQuickAdd={(p) => handleAddToCart(p, 1)}
            initialCategory={activeCategoryFilter}
          />
        )}

        {/* VIEW: PRODUCT DETAIL (PDP) */}
        {activeView === 'product' && selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onBack={() => setActiveView('catalog')}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onSelectProduct={handleOpenProduct}
          />
        )}

        {/* VIEW: NICHE & AUDIENCE STRATEGY DOSSIER */}
        {activeView === 'dossier' && <NicheStrategyDossier />}

        {/* VIEW: SHOPIFY THEME EDITOR (OS 2.0 CUSTOMIZER) */}
        {activeView === 'theme-editor' && (
          <ThemeCustomizer
            settings={themeSettings}
            onUpdateSettings={(newSettings) =>
              setThemeSettings((prev) => ({ ...prev, ...newSettings }))
            }
            onResetDefaults={() => setThemeSettings(defaultSettings)}
          />
        )}

        {/* VIEW: THEME CODE INSPECTOR & ZIP EXPORT */}
        {activeView === 'code-inspector' && <ThemeCodeInspector />}
      </main>

      {/* 4. Footer with uploaded image content and discrete 1-click theme export */}
      <Footer
        onNavigate={(v) => {
          setActiveView(v);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onFilterCategory={(cat) => {
          setActiveCategoryFilter(cat);
          setActiveView('catalog');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onDownloadZip={handleDownloadZip}
        isDownloading={downloadingZip}
      />

      {/* 5. Modals & Overlays */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutModalOpen(true);
        }}
        freeShippingThreshold={themeSettings.freeShippingThreshold}
      />

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onViewFullDetail={handleOpenProduct}
      />

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectProduct={handleOpenProduct}
      />

      {/* 6. Shopify Native Checkout & Payment Cards Modal */}
      <CheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        items={cartItems}
        subtotal={cartSubtotal}
      />
    </div>
  );
}

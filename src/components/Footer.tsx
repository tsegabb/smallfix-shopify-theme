import React from 'react';
import { Download } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
  onFilterCategory?: (category: string) => void;
  onDownloadZip?: () => void;
  isDownloading?: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onFilterCategory,
  onDownloadZip,
  isDownloading = false
}) => {
  const handleCategoryClick = (category: string) => {
    if (onFilterCategory) {
      onFilterCategory(category);
    }
    onNavigate('catalog');
  };

  return (
    <footer className="bg-stone-100/80 text-stone-700 text-sm border-t border-stone-200/80 pt-16 pb-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid matching uploaded image content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-12">
          
          {/* Column 1: Brand & Tagline */}
          <div className="md:col-span-5 space-y-3">
            <button
              onClick={() => onNavigate('home')}
              className="inline-flex items-center gap-2 text-xl font-bold tracking-tight text-stone-900 cursor-pointer"
            >
              <span className="text-orange-500 text-lg leading-none select-none">◆</span>
              <span>Smallfix</span>
            </button>
            <p className="text-stone-500 text-sm max-w-sm">
              Small fixes for everyday home annoyances.
            </p>
          </div>

          {/* Column 2: SHOP */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-stone-900">
              SHOP
            </div>
            <ul className="space-y-2 text-xs text-stone-600">
              <li>
                <button
                  onClick={() => handleCategoryClick('Cleaning')}
                  className="hover:text-stone-900 transition-colors cursor-pointer"
                >
                  Cleaning
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Power & cords')}
                  className="hover:text-stone-900 transition-colors cursor-pointer"
                >
                  Power & cords
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Organize')}
                  className="hover:text-stone-900 transition-colors cursor-pointer"
                >
                  Organize
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Kitchen')}
                  className="hover:text-stone-900 transition-colors cursor-pointer"
                >
                  Kitchen
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: HELP */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-stone-900">
              HELP
            </div>
            <ul className="space-y-2 text-xs text-stone-600">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-stone-900 transition-colors cursor-pointer"
                >
                  Shipping
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-stone-900 transition-colors cursor-pointer"
                >
                  Returns
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-stone-900 transition-colors cursor-pointer"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: LEGAL */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-stone-900">
              LEGAL
            </div>
            <ul className="space-y-2 text-xs text-stone-600">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-stone-900 transition-colors cursor-pointer"
                >
                  Privacy policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-stone-900 transition-colors cursor-pointer"
                >
                  Terms of service
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-stone-900 transition-colors cursor-pointer"
                >
                  Refund policy
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Sub-Footer Divider matching uploaded image with export action */}
        <div className="border-t border-dashed border-stone-300 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © 2026 Smallfix Home. Sample catalog: swap in your supplier listings, photos and policies before launch.
          </div>
          <div className="flex items-center gap-4">
            <span className="font-medium text-stone-700 whitespace-nowrap">
              Free shipping $35+
            </span>
            {onDownloadZip && (
              <button
                type="button"
                onClick={onDownloadZip}
                disabled={isDownloading}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-850 text-white rounded text-xs font-semibold transition-colors cursor-pointer shadow-xs shrink-0"
                title="Download real Shopify Online Store 2.0 theme (.zip) ready to upload to Shopify Admin"
              >
                <Download className="w-3.5 h-3.5 text-orange-400" />
                <span>{isDownloading ? 'Packing...' : 'Export Shopify Theme (.zip)'}</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
};

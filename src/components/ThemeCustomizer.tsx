import React from 'react';
import { Sliders, RotateCcw, Check, Sparkles } from 'lucide-react';

export interface ThemeSettingsState {
  brandName: string;
  showAnnouncement: boolean;
  announcementText: string;
  freeShippingThreshold: number;
  showUrgency: boolean;
  showStickyAtc: boolean;
  colorPreset: 'obsidian' | 'amber' | 'taupe';
}

interface ThemeCustomizerProps {
  settings: ThemeSettingsState;
  onUpdateSettings: (newSettings: Partial<ThemeSettingsState>) => void;
  onResetDefaults: () => void;
}

export const ThemeCustomizer: React.FC<ThemeCustomizerProps> = ({
  settings,
  onUpdateSettings,
  onResetDefaults
}) => {
  return (
    <div className="py-10 bg-stone-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-stone-500 mb-1">
              <Sliders className="w-3.5 h-3.5 text-stone-700" />
              <span>Shopify Online Store 2.0</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-medium text-stone-900">
              Live Theme Editor Simulator
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Test modifying section schemas and theme settings as you would in the native Shopify Admin theme customizer.
            </p>
          </div>

          <button
            onClick={onResetDefaults}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-700 bg-white border border-stone-300 rounded hover:bg-stone-100 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
        </div>

        {/* Section Settings Panels */}
        <div className="space-y-6">
          
          {/* Header & Brand Identity */}
          <div className="bg-white p-6 rounded border border-stone-200 shadow-xs space-y-4">
            <h3 className="text-sm font-serif font-semibold text-stone-900 border-b border-stone-100 pb-2">
              Brand Identity & Header
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-medium text-stone-700 mb-1">Store / Logo Name</label>
                <input
                  type="text"
                  value={settings.brandName}
                  onChange={(e) => onUpdateSettings({ brandName: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded text-stone-900 focus:outline-hidden focus:border-stone-900"
                />
              </div>

              <div>
                <label className="block font-medium text-stone-700 mb-1">Color Palette Preset</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => onUpdateSettings({ colorPreset: 'obsidian' })}
                    className={`flex-1 py-2 text-xs rounded border cursor-pointer ${
                      settings.colorPreset === 'obsidian'
                        ? 'border-stone-900 bg-stone-900 text-white font-medium'
                        : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    Obsidian Minimal
                  </button>
                  <button
                    type="button"
                    onClick={() => onUpdateSettings({ colorPreset: 'amber' })}
                    className={`flex-1 py-2 text-xs rounded border cursor-pointer ${
                      settings.colorPreset === 'amber'
                        ? 'border-orange-600 bg-orange-600 text-white font-medium'
                        : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    Smallfix Orange
                  </button>
                  <button
                    type="button"
                    onClick={() => onUpdateSettings({ colorPreset: 'taupe' })}
                    className={`flex-1 py-2 text-xs rounded border cursor-pointer ${
                      settings.colorPreset === 'taupe'
                        ? 'border-stone-700 bg-stone-700 text-white font-medium'
                        : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    Nordic Slate
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Announcement Bar Section */}
          <div className="bg-white p-6 rounded border border-stone-200 shadow-xs space-y-4">
            <h3 className="text-sm font-serif font-semibold text-stone-900 border-b border-stone-100 pb-2">
              Announcement Bar Section
            </h3>
            <div className="space-y-4 text-xs">
              <label className="flex items-center gap-2 cursor-pointer font-medium text-stone-800">
                <input
                  type="checkbox"
                  checked={settings.showAnnouncement}
                  onChange={(e) => onUpdateSettings({ showAnnouncement: e.target.checked })}
                  className="rounded text-stone-900 focus:ring-stone-900"
                />
                <span>Enable Announcement Bar</span>
              </label>

              {settings.showAnnouncement && (
                <div>
                  <label className="block font-medium text-stone-700 mb-1">Announcement Copy</label>
                  <input
                    type="text"
                    value={settings.announcementText}
                    onChange={(e) => onUpdateSettings({ announcementText: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded text-stone-900 focus:outline-hidden focus:border-stone-900"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Conversion & Dropshipping Features */}
          <div className="bg-white p-6 rounded border border-stone-200 shadow-xs space-y-4">
            <h3 className="text-sm font-serif font-semibold text-stone-900 border-b border-stone-100 pb-2">
              Conversion Optimization Settings
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div>
                <label className="block font-medium text-stone-700 mb-1">
                  Free Shipping Threshold ($)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={settings.freeShippingThreshold}
                    onChange={(e) => onUpdateSettings({ freeShippingThreshold: Number(e.target.value) || 0 })}
                    className="w-32 px-3 py-2 border border-stone-300 rounded text-stone-900 tabular-nums focus:outline-hidden focus:border-stone-900"
                  />
                  <span className="text-stone-500">USD (Triggers progress bar in cart)</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-medium text-stone-800">
                  <input
                    type="checkbox"
                    checked={settings.showUrgency}
                    onChange={(e) => onUpdateSettings({ showUrgency: e.target.checked })}
                    className="rounded text-stone-900 focus:ring-stone-900"
                  />
                  <span>Show Low Stock Urgency Counter ("Batch 04")</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-medium text-stone-800">
                  <input
                    type="checkbox"
                    checked={settings.showStickyAtc}
                    onChange={(e) => onUpdateSettings({ showStickyAtc: e.target.checked })}
                    className="rounded text-stone-900 focus:ring-stone-900"
                  />
                  <span>Show Sticky Mobile Add to Cart Bar</span>
                </label>
              </div>
            </div>
          </div>

          {/* Integration Status Notice */}
          <div className="p-4 bg-emerald-50 border border-emerald-200/80 rounded flex items-center gap-3 text-xs text-emerald-900">
            <Check className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>
              All settings configured here map directly to variables declared in <code>config/settings_schema.json</code> and Liquid blocks in <code>layout/theme.liquid</code>.
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};

import React from 'react';
import { NICHE_ANALYSIS } from '../data/products';
import { TrendingUp, Users, DollarSign, Target, ShieldCheck, Zap, Award } from 'lucide-react';

export const NicheStrategyDossier: React.FC = () => {
  return (
    <div className="py-12 bg-stone-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="border-b border-stone-200 pb-8">
          <div className="inline-flex items-center gap-2 text-xs uppercase font-mono tracking-widest text-amber-800 bg-amber-50 px-3 py-1 rounded-full mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Executive E-Commerce Strategic Analysis</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-medium text-stone-900">
            Dropshipping Niche & Target Audience Strategy Dossier
          </h1>
          <p className="text-stone-600 text-sm sm:text-base mt-3 max-w-3xl leading-relaxed">
            {NICHE_ANALYSIS.summary}
          </p>
        </div>

        {/* 3 Pillars Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded border border-stone-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-900">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-base font-serif font-semibold text-stone-900">High-AOV Luxury Dropshipping</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Moving away from low-margin $19 gimmicks into $78–$189 average order value. Provides sufficient gross margin ($65–$139 per unit) to profitably sustain aggressive Meta and TikTok paid advertising at $25–$35 CPAs.
            </p>
          </div>

          <div className="bg-white p-6 rounded border border-stone-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-900">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-serif font-semibold text-stone-900">Biohacker & Creator Demographic</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Targeted at remote engineers, designers, and high-income knowledge workers suffering from screen eye fatigue and disrupted sleep latency. High purchasing power ($90k+ household income) with low price sensitivity.
            </p>
          </div>

          <div className="bg-white p-6 rounded border border-stone-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-900">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-serif font-semibold text-stone-900">Risk-Reversal Conversion Architecture</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Theme integrates native conversion mechanics: 30-night sleep trial, Batch 04 limited stock counter, $75 free shipping threshold bar, and clinical hardware specifications (10,000 Lux, 660nm, 0% flicker).
            </p>
          </div>
        </div>

        {/* Dropshipping Unit Economics Table */}
        <div className="bg-white rounded border border-stone-200/80 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-stone-200 bg-stone-50/50 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-serif font-semibold text-stone-900">Unit Economics & Margin Matrix</h2>
              <p className="text-xs text-stone-500 mt-0.5">Supplier factory cost vs retail pricing and estimated CPA profitability</p>
            </div>
            <span className="text-xs font-mono bg-emerald-100 text-emerald-900 px-2.5 py-1 rounded font-semibold">
              Average Margin: 75.2%
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-100/70 border-b border-stone-200 text-stone-600 uppercase tracking-wider font-mono text-[11px]">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">Hardware Instrument</th>
                  <th className="py-3.5 px-4 font-semibold">Factory Cost</th>
                  <th className="py-3.5 px-4 font-semibold">Tracked Freight</th>
                  <th className="py-3.5 px-4 font-semibold">Retail Price</th>
                  <th className="py-3.5 px-4 font-semibold">Gross Profit</th>
                  <th className="py-3.5 px-4 font-semibold">Gross Margin</th>
                  <th className="py-3.5 px-4 font-semibold">Target CPA</th>
                  <th className="py-3.5 px-4 font-semibold text-stone-900">Net Profit / Order</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {NICHE_ANALYSIS.economics.map((item, idx) => (
                  <tr key={idx} className="hover:bg-stone-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-medium text-stone-900">{item.product}</td>
                    <td className="py-3.5 px-4 font-mono tabular-nums">{item.supplierCost}</td>
                    <td className="py-3.5 px-4 font-mono tabular-nums">{item.shippingCost}</td>
                    <td className="py-3.5 px-4 font-mono tabular-nums font-semibold text-stone-900">{item.retailPrice}</td>
                    <td className="py-3.5 px-4 font-mono tabular-nums text-emerald-700 font-semibold">{item.grossProfit}</td>
                    <td className="py-3.5 px-4 font-mono tabular-nums text-emerald-800">{item.grossMargin}</td>
                    <td className="py-3.5 px-4 font-mono tabular-nums">{item.targetCPA}</td>
                    <td className="py-3.5 px-4 font-mono tabular-nums font-bold text-stone-900 bg-stone-50/60">
                      {item.netProfitPerOrder}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Target Audience Profile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded border border-stone-200/80 shadow-xs space-y-4">
            <h3 className="text-base font-serif font-semibold text-stone-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-800" />
              <span>Target Persona & Pain Points</span>
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              <strong>Demographic:</strong> {NICHE_ANALYSIS.targetAudience.demographics}
            </p>
            <div className="space-y-2 pt-2 border-t border-stone-100 text-xs">
              <div className="font-semibold text-stone-800">Primary Frustrations:</div>
              <ul className="space-y-1.5 text-stone-600 list-disc list-inside">
                {NICHE_ANALYSIS.targetAudience.corePainPoints.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white p-6 rounded border border-stone-200/80 shadow-xs space-y-4">
            <h3 className="text-base font-serif font-semibold text-stone-900 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-800" />
              <span>Conversion Triggers & Ad Hooks</span>
            </h3>
            <div className="space-y-3 text-xs">
              {NICHE_ANALYSIS.adStrategies.map((ad, idx) => (
                <div key={idx} className="p-3 bg-stone-50 rounded border border-stone-200/60">
                  <div className="font-semibold text-stone-900">{ad.hook}</div>
                  <div className="text-[11px] font-mono text-amber-800 mt-0.5">{ad.format}</div>
                  <p className="text-stone-600 mt-1.5 leading-relaxed">{ad.script}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

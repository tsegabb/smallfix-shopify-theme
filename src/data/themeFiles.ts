export interface ThemeFile {
  path: string;
  name: string;
  category: 'layout' | 'templates' | 'sections' | 'snippets' | 'config' | 'locales' | 'assets';
  type: 'liquid' | 'json' | 'css' | 'js';
  content: string;
}

export const SHOPIFY_THEME_FILES: ThemeFile[] = [
  // 1. Layout
  {
    path: 'layout/theme.liquid',
    name: 'theme.liquid',
    category: 'layout',
    type: 'liquid',
    content: `<!doctype html>
<html class="no-js" lang="{{ request.locale.iso_code }}">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="theme-color" content="{{ settings.color_accent | default: '#F97316' }}">
    <link rel="canonical" href="{{ canonical_url }}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
    <title>{{ page_title }} - {{ shop.name }}</title>
    {% if page_description %}<meta name="description" content="{{ page_description | escape }}">{% endif %}
    {% render 'social-meta-tags' %}
    {{ content_for_header }}
    {{ 'base.css' | asset_url | stylesheet_tag }}
  </head>
  <body class="template-{{ template.name | handle }} antialiased bg-stone-50 text-stone-900">
    {% section 'announcement-bar' %}
    {% section 'header' %}
    <main id="MainContent" role="main">
      {{ content_for_layout }}
    </main>
    {% section 'footer' %}
    {% section 'cart-drawer' %}
    {{ 'theme.js' | asset_url | script_tag }}
    {{ 'cart.js' | asset_url | script_tag }}
  </body>
</html>`
  },

  // 2. Config
  {
    path: 'config/settings_schema.json',
    name: 'settings_schema.json',
    category: 'config',
    type: 'json',
    content: `[
  {
    "name": "theme_info",
    "theme_name": "Smallfix Home OS 2.0",
    "theme_version": "2.4.0",
    "theme_author": "Smallfix Studio",
    "theme_documentation_url": "https://help.shopify.com",
    "theme_support_url": "https://help.shopify.com"
  },
  {
    "name": "Colors & Style",
    "settings": [
      { "type": "color", "id": "color_bg", "label": "Background Color", "default": "#FAFAF9" },
      { "type": "color", "id": "color_surface", "label": "Surface Card Color", "default": "#FFFFFF" },
      { "type": "color", "id": "color_text", "label": "Text Color", "default": "#1C1917" },
      { "type": "color", "id": "color_accent", "label": "Primary Accent (Orange)", "default": "#F97316" },
      { "type": "color", "id": "color_secondary_accent", "label": "Secondary Accent", "default": "#EA580C" }
    ]
  },
  {
    "name": "Dropshipping & Conversion",
    "settings": [
      { "type": "number", "id": "free_shipping_threshold", "label": "Free Shipping Threshold (cents)", "default": 3500 },
      { "type": "checkbox", "id": "enable_cart_drawer", "label": "Enable Slide-Out Cart Drawer", "default": true },
      { "type": "checkbox", "id": "show_inventory_urgency", "label": "Show Low Stock Urgency Alert", "default": true },
      { "type": "checkbox", "id": "show_sticky_atc", "label": "Show Sticky Add to Cart on Mobile", "default": true },
      { "type": "text", "id": "trust_badge_text", "label": "Trust Guarantee Highlight", "default": "30-Day Clean Guarantee · Free Tracked Shipping on $35+ · 1-Year Warranty" }
    ]
  }
]`
  },
  {
    path: 'config/settings_data.json',
    name: 'settings_data.json',
    category: 'config',
    type: 'json',
    content: `{
  "current": {
    "color_bg": "#FAFAF9",
    "color_surface": "#FFFFFF",
    "color_text": "#1C1917",
    "color_accent": "#F97316",
    "free_shipping_threshold": 3500,
    "enable_cart_drawer": true,
    "show_inventory_urgency": true,
    "show_sticky_atc": true,
    "trust_badge_text": "30-Day Clean Guarantee · Free Tracked Shipping $35+ · 1-Year Hardware Warranty",
    "sections": {
      "announcement-bar": {
        "type": "announcement-bar",
        "settings": {
          "text": "FREE SHIPPING ON ORDERS $35+ · SMALL FIXES FOR EVERYDAY HOME ANNOYANCES",
          "link": "/collections/all"
        }
      },
      "header": {
        "type": "header",
        "settings": { "logo_text": "Smallfix", "enable_sticky": true }
      },
      "footer": {
        "type": "footer",
        "settings": {
          "brand_name": "Smallfix",
          "tagline": "Small fixes for everyday home annoyances."
        }
      }
    }
  }
}`
  },

  // 3. Locales
  {
    path: 'locales/en.default.json',
    name: 'en.default.json',
    category: 'locales',
    type: 'json',
    content: `{
  "general": {
    "search": {
      "placeholder": "Search spin scrubbers, cable organizers, crevice cleaners...",
      "results_title": "Search Results",
      "no_results": "No home gadgets found matching your search."
    },
    "cart": {
      "title": "Your Smallfix Bag",
      "empty": "Your cart is currently empty",
      "continue_shopping": "Explore Cleaning Gadgets",
      "subtotal": "Subtotal",
      "checkout": "Proceed to Secure Checkout",
      "note": "Special delivery instructions or order notes",
      "free_shipping_reached": "You have unlocked Free Tracked Delivery!",
      "free_shipping_remaining": "Add {{ amount }} more to unlock Free Express Delivery ($35+)"
    }
  },
  "products": {
    "product": {
      "add_to_cart": "Add to Cart",
      "sold_out": "Sold Out — Restocking Soon",
      "buy_now": "Instant Express Checkout",
      "in_stock": "In Stock — Dispatches within 24 hours",
      "low_stock": "Low Stock: Few units remaining in Batch 06",
      "frequently_bought_together": "Frequently Paired Problem Solvers",
      "reviews": "Verified Customer Reviews"
    }
  }
}`
  },

  // 4. Templates
  {
    path: 'templates/index.json',
    name: 'index.json',
    category: 'templates',
    type: 'json',
    content: `{
  "sections": {
    "hero": {
      "type": "hero-banner",
      "settings": {
        "heading": "Small fixes for everyday home annoyances.",
        "subheading": "Smart electric spin scrubbers, magnetic cord organizers, and precision cleaning gadgets designed to cut chore time in half.",
        "primary_button_label": "Shop Cleaning Gadgets",
        "primary_button_link": "/collections/all",
        "secondary_button_label": "Browse Best Sellers",
        "secondary_button_link": "/collections/best-sellers",
        "kicker": "VIRAL HOME PROBLEM SOLVERS · FREE SHIPPING ON $35+"
      }
    },
    "trust_badges": { "type": "trust-badges", "settings": {} },
    "featured_products": { "type": "featured-products", "settings": { "products_to_show": 4 } },
    "benefits_features": { "type": "benefits-features", "settings": {} },
    "testimonials": { "type": "testimonials", "settings": {} },
    "faq": { "type": "faq", "settings": {} },
    "newsletter": { "type": "newsletter", "settings": {} }
  },
  "order": ["hero", "trust_badges", "featured_products", "benefits_features", "testimonials", "faq", "newsletter"]
}`
  },
  {
    path: 'templates/product.json',
    name: 'product.json',
    category: 'templates',
    type: 'json',
    content: `{
  "sections": {
    "main_product": {
      "type": "main-product",
      "settings": { "show_dynamic_checkout": true }
    },
    "recommendations": { "type": "product-recommendations", "settings": {} }
  },
  "order": ["main_product", "recommendations"]
}`
  },
  {
    path: 'templates/collection.json',
    name: 'collection.json',
    category: 'templates',
    type: 'json',
    content: `{
  "sections": {
    "collection_grid": {
      "type": "collection-grid",
      "settings": { "products_per_page": 12 }
    }
  },
  "order": ["collection_grid"]
}`
  },
  {
    path: 'templates/cart.json',
    name: 'cart.json',
    category: 'templates',
    type: 'json',
    content: `{
  "sections": {
    "main_cart": {
      "type": "main-cart",
      "settings": { "show_notes": true }
    }
  },
  "order": ["main_cart"]
}`
  },
  {
    path: 'templates/search.json',
    name: 'search.json',
    category: 'templates',
    type: 'json',
    content: `{
  "sections": {
    "main_search": { "type": "main-search", "settings": {} }
  },
  "order": ["main_search"]
}`
  },
  {
    path: 'templates/404.json',
    name: '404.json',
    category: 'templates',
    type: 'json',
    content: `{
  "sections": {
    "main_404": { "type": "main-404", "settings": {} }
  },
  "order": ["main_404"]
}`
  },
  {
    path: 'templates/page.json',
    name: 'page.json',
    category: 'templates',
    type: 'json',
    content: `{
  "sections": {
    "main_page": {
      "type": "benefits-features",
      "settings": {
        "heading": "Smallfix Home Gadgets",
        "subheading": "Small fixes for everyday home annoyances."
      }
    }
  },
  "order": ["main_page"]
}`
  },
  {
    path: 'templates/page.about.json',
    name: 'page.about.json',
    category: 'templates',
    type: 'json',
    content: `{
  "sections": {
    "main_about": {
      "type": "benefits-features",
      "settings": {
        "heading": "Small Fixes for Everyday Home Annoyances",
        "subheading": "We believe you shouldn't have to spend your precious weekends kneeling on bathroom tile or fishing dropped charger cords from behind your desk. Smallfix creates high-torque, ergonomic gadgets that eradicate tedious chores in minutes."
      }
    },
    "faq": { "type": "faq", "settings": {} }
  },
  "order": ["main_about", "faq"]
}`
  },
  {
    path: 'templates/page.contact.json',
    name: 'page.contact.json',
    category: 'templates',
    type: 'json',
    content: `{
  "sections": {
    "contact_form": {
      "type": "newsletter",
      "settings": {
        "heading": "Contact Smallfix Support",
        "subheading": "Have questions regarding gadget compatibility, order tracking, or returns? Reach our team directly at support@smallfixhome.com"
      }
    }
  },
  "order": ["contact_form"]
}`
  },
  {
    path: 'templates/page.faq.json',
    name: 'page.faq.json',
    category: 'templates',
    type: 'json',
    content: `{
  "sections": {
    "faq_section": {
      "type": "faq",
      "settings": {
        "heading": "Frequently Asked Questions",
        "subheading": "Comprehensive answers regarding our 30-Day Clean Guarantee, tracked shipping times, accepted payment cards, and product specifications."
      }
    }
  },
  "order": ["faq_section"]
}`
  },

  // 5. Sections
  {
    path: 'sections/announcement-bar.liquid',
    name: 'announcement-bar.liquid',
    category: 'sections',
    type: 'liquid',
    content: `{%- if section.settings.show_announcement -%}
  <div class="announcement-bar bg-stone-900 text-stone-200 text-xs py-2 px-4 text-center tracking-wider uppercase font-medium border-b border-stone-800 transition-colors">
    <div class="max-w-7xl mx-auto flex items-center justify-center gap-3">
      {%- if section.settings.link != blank -%}
        <a href="{{ section.settings.link }}" class="hover:text-amber-400 transition-colors flex items-center gap-2">
          <span>{{ section.settings.text | escape }}</span>
          <span aria-hidden="true">&rarr;</span>
        </a>
      {%- else -%}
        <span>{{ section.settings.text | escape }}</span>
      {%- endif -%}
    </div>
  </div>
{%- endif -%}

{% schema %}
{
  "name": "Announcement Bar",
  "settings": [
    { "type": "checkbox", "id": "show_announcement", "label": "Show announcement", "default": true },
    { "type": "text", "id": "text", "label": "Announcement Text", "default": "FREE SHIPPING ON ORDERS $35+ · SMALL FIXES FOR EVERYDAY HOME ANNOYANCES" },
    { "type": "url", "id": "link", "label": "Announcement Link" }
  ]
}
{% endschema %}`
  },
  {
    path: 'sections/header.liquid',
    name: 'header.liquid',
    category: 'sections',
    type: 'liquid',
    content: `<header class="site-header sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 transition-all duration-200" id="site-header">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
    <div class="flex items-center">
      <a href="{{ routes.root_url }}" class="inline-flex items-center gap-2 text-xl sm:text-2xl font-bold tracking-tight text-stone-900 hover:text-stone-700 transition-colors">
        <span class="text-orange-500 text-lg sm:text-xl leading-none select-none">◆</span>
        <span>{{ section.settings.logo_text | default: 'Smallfix' }}</span>
      </a>
    </div>

    <nav class="hidden md:flex items-center space-x-8 text-sm font-medium text-stone-700">
      {%- for link in linklists.main-menu.links -%}
        <a href="{{ link.url }}" class="hover:text-stone-950 transition-colors py-1 border-b border-transparent hover:border-stone-900">
          {{ link.title }}
        </a>
      {%- else -%}
        <a href="/collections/all" class="hover:text-stone-950 transition-colors py-1">Shop All</a>
        <a href="/collections/cleaning" class="hover:text-stone-950 transition-colors py-1">Cleaning</a>
        <a href="/collections/power-cords" class="hover:text-stone-950 transition-colors py-1">Power & cords</a>
        <a href="/collections/organize" class="hover:text-stone-950 transition-colors py-1">Organize</a>
        <a href="/collections/kitchen" class="hover:text-stone-950 transition-colors py-1">Kitchen</a>
        <a href="/collections/best-sellers" class="hover:text-stone-950 transition-colors py-1 font-semibold text-orange-600">Best Sellers</a>
      {%- endfor -%}
    </nav>

    <div class="flex items-center space-x-5 text-stone-800">
      <button type="button" class="search-trigger hover:text-stone-950 p-1.5 transition-colors" aria-label="Open Search" data-action="toggle-search">
        {% render 'icon', name: 'search', class: 'w-5 h-5' %}
      </button>

      <a href="/collections/all" class="hidden sm:inline-flex items-center text-xs font-semibold px-2.5 py-1 bg-orange-50 border border-orange-200 text-orange-700 rounded">
        Free shipping $35+
      </a>

      <button type="button" class="cart-trigger relative hover:text-stone-950 p-1.5 transition-colors" aria-label="Shopping Bag" data-action="toggle-cart">
        {% render 'icon', name: 'bag', class: 'w-5 h-5' %}
        <span class="cart-count-badge absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center tabular-nums">
          {{ cart.item_count }}
        </span>
      </button>

      <button type="button" class="md:hidden hover:text-stone-950 p-1.5 transition-colors" aria-label="Open Menu" data-action="toggle-mobile-menu">
        {% render 'icon', name: 'menu', class: 'w-6 h-6' %}
      </button>
    </div>
  </div>
</header>

{% schema %}
{
  "name": "Header",
  "settings": [
    { "type": "text", "id": "logo_text", "label": "Brand Logo Text", "default": "Smallfix" }
  ]
}
{% endschema %}`
  },
  {
    path: 'sections/hero-banner.liquid',
    name: 'hero-banner.liquid',
    category: 'sections',
    type: 'liquid',
    content: `<section class="relative overflow-hidden bg-stone-900 text-stone-100 min-h-[540px] lg:min-h-[620px] flex items-center">
  <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 w-full">
    <div class="max-w-2xl">
      {%- if section.settings.kicker != blank -%}
        <div class="text-xs uppercase tracking-widest text-orange-400 font-mono mb-4 flex items-center gap-1.5">
          <span class="text-orange-500">◆</span>
          <span>{{ section.settings.kicker }}</span>
        </div>
      {%- endif -%}

      <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 leading-tight" style="text-wrap: balance;">
        {{ section.settings.heading | default: 'Small fixes for everyday home annoyances.' }}
      </h1>

      <p class="text-base sm:text-lg text-stone-300 font-normal leading-relaxed mb-8 max-w-xl">
        {{ section.settings.subheading | default: 'Smart electric spin scrubbers, magnetic cord organizers, and precision cleaning gadgets designed to cut chore time in half.' }}
      </p>

      <div class="flex flex-wrap items-center gap-4">
        {%- if section.settings.primary_button_label != blank -%}
          <a href="{{ section.settings.primary_button_link | default: '/collections/all' }}" class="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-stone-950 bg-white hover:bg-stone-100 rounded transition-colors duration-150 shadow-sm whitespace-nowrap">
            {{ section.settings.primary_button_label }}
          </a>
        {%- endif -%}

        {%- if section.settings.secondary_button_label != blank -%}
          <a href="{{ section.settings.secondary_button_link | default: '/collections/best-sellers' }}" class="inline-flex items-center justify-center px-6 py-3.5 text-sm font-medium text-stone-200 hover:text-white border border-stone-600 hover:border-stone-400 rounded transition-colors duration-150 whitespace-nowrap backdrop-blur-xs">
            {{ section.settings.secondary_button_label }}
          </a>
        {%- endif -%}
      </div>

      <div class="mt-12 pt-8 border-t border-stone-800/80 grid grid-cols-3 gap-6 text-stone-300">
        <div>
          <div class="text-xl sm:text-2xl font-bold text-white tabular-nums">420 RPM</div>
          <div class="text-xs text-stone-400 mt-0.5">High-Torque Scrubbing</div>
        </div>
        <div>
          <div class="text-xl sm:text-2xl font-bold text-white tabular-nums">70% Faster</div>
          <div class="text-xs text-stone-400 mt-0.5">Deep Cleaning Time</div>
        </div>
        <div>
          <div class="text-xl sm:text-2xl font-bold text-white tabular-nums">$35+</div>
          <div class="text-xs text-stone-400 mt-0.5">Free Express Shipping</div>
        </div>
      </div>
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Hero Banner",
  "settings": [
    { "type": "text", "id": "kicker", "label": "Kicker / Eyebrow Text", "default": "VIRAL HOME PROBLEM SOLVERS · FREE SHIPPING $35+" },
    { "type": "text", "id": "heading", "label": "Main Heading", "default": "Small fixes for everyday home annoyances." },
    { "type": "textarea", "id": "subheading", "label": "Subheading", "default": "Smart electric spin scrubbers, magnetic cord organizers, and precision cleaning gadgets designed to cut chore time in half." },
    { "type": "text", "id": "primary_button_label", "label": "Primary Button Label", "default": "Shop Cleaning Gadgets" },
    { "type": "url", "id": "primary_button_link", "label": "Primary Button Link" },
    { "type": "text", "id": "secondary_button_label", "label": "Secondary Button Label", "default": "Browse Best Sellers" },
    { "type": "url", "id": "secondary_button_link", "label": "Secondary Button Link" }
  ],
  "presets": [{ "name": "Hero Banner" }]
}
{% endschema %}`
  },
  {
    path: 'sections/trust-badges.liquid',
    name: 'trust-badges.liquid',
    category: 'sections',
    type: 'liquid',
    content: `<section class="border-b border-stone-200/80 bg-stone-100/60 py-6">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-stone-800">
      <div class="flex items-start space-x-3">
        <div class="text-orange-600 shrink-0 mt-0.5">{% render 'icon', name: 'shield', class: 'w-5 h-5' %}</div>
        <div>
          <h4 class="text-xs font-semibold uppercase tracking-wider text-stone-900">{{ section.settings.badge_1_title | default: '30-Day Clean Guarantee' }}</h4>
          <p class="text-xs text-stone-600 mt-0.5">{{ section.settings.badge_1_desc | default: 'Love your chore-free home or return within 30 days for 100% refund.' }}</p>
        </div>
      </div>
      <div class="flex items-start space-x-3">
        <div class="text-orange-600 shrink-0 mt-0.5">{% render 'icon', name: 'truck', class: 'w-5 h-5' %}</div>
        <div>
          <h4 class="text-xs font-semibold uppercase tracking-wider text-stone-900">{{ section.settings.badge_2_title | default: 'Fast 2-Day Dispatch' }}</h4>
          <p class="text-xs text-stone-600 mt-0.5">{{ section.settings.badge_2_desc | default: 'Quick warehouse fulfillment with direct package tracking links.' }}</p>
        </div>
      </div>
      <div class="flex items-start space-x-3">
        <div class="text-orange-600 shrink-0 mt-0.5">{% render 'icon', name: 'check', class: 'w-5 h-5' %}</div>
        <div>
          <h4 class="text-xs font-semibold uppercase tracking-wider text-stone-900">{{ section.settings.badge_3_title | default: 'Free Shipping $35+' }}</h4>
          <p class="text-xs text-stone-600 mt-0.5">{{ section.settings.badge_3_desc | default: 'Unlocked automatically for all qualifying orders during checkout.' }}</p>
        </div>
      </div>
      <div class="flex items-start space-x-3">
        <div class="text-orange-600 shrink-0 mt-0.5">{% render 'icon', name: 'lock', class: 'w-5 h-5' %}</div>
        <div>
          <h4 class="text-xs font-semibold uppercase tracking-wider text-stone-900">{{ section.settings.badge_4_title | default: '1-Year Quality Warranty' }}</h4>
          <p class="text-xs text-stone-600 mt-0.5">{{ section.settings.badge_4_desc | default: 'Tested high-torque motors, IPX7 waterproof seals, and durable build.' }}</p>
        </div>
      </div>
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Trust Badges Strip",
  "settings": [
    { "type": "text", "id": "badge_1_title", "label": "Badge 1 Title", "default": "30-Day Clean Guarantee" },
    { "type": "text", "id": "badge_1_desc", "label": "Badge 1 Desc", "default": "Love your chore-free home or return within 30 days for 100% refund." },
    { "type": "text", "id": "badge_2_title", "label": "Badge 2 Title", "default": "Fast 2-Day Dispatch" },
    { "type": "text", "id": "badge_2_desc", "label": "Badge 2 Desc", "default": "Quick warehouse fulfillment with direct package tracking links." },
    { "type": "text", "id": "badge_3_title", "label": "Badge 3 Title", "default": "Free Shipping $35+" },
    { "type": "text", "id": "badge_3_desc", "label": "Badge 3 Desc", "default": "Unlocked automatically for all qualifying orders during checkout." },
    { "type": "text", "id": "badge_4_title", "label": "Badge 4 Title", "default": "1-Year Quality Warranty" },
    { "type": "text", "id": "badge_4_desc", "label": "Badge 4 Desc", "default": "Tested high-torque motors, IPX7 waterproof seals, and durable build." }
  ],
  "presets": [{ "name": "Trust Badges Strip" }]
}
{% endschema %}`
  },
  {
    path: 'sections/featured-products.liquid',
    name: 'featured-products.liquid',
    category: 'sections',
    type: 'liquid',
    content: `<section class="py-16 sm:py-24 bg-stone-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col md:flex-row md:items-end justify-between mb-12">
      <div>
        <div class="text-xs uppercase tracking-widest text-orange-600 font-mono mb-2 flex items-center gap-1.5">
          <span class="text-orange-500">◆</span>
          <span>CHORE ELIMINATION CATALOG</span>
        </div>
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900">
          {{ section.settings.title | default: 'Problem-Solving Home Gadgets' }}
        </h2>
        {%- if section.settings.subtitle != blank -%}
          <p class="text-stone-600 mt-2 max-w-xl text-sm sm:text-base">
            {{ section.settings.subtitle }}
          </p>
        {%- endif -%}
      </div>
      <div class="mt-4 md:mt-0">
        <a href="/collections/all" class="text-sm font-semibold text-stone-900 hover:text-stone-600 inline-flex items-center gap-1 group">
          <span>Explore All Gadgets</span>
          <span class="group-hover:translate-x-1 transition-transform" aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {%- assign collection = collections[section.settings.collection] -%}
      {%- for product in collection.products limit: section.settings.products_to_show -%}
        {% render 'product-card', product: product %}
      {%- else -%}
        {%- for product in collections.all.products limit: section.settings.products_to_show -%}
          {% render 'product-card', product: product %}
        {%- endfor -%}
      {%- endfor -%}
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Featured Products",
  "settings": [
    { "type": "text", "id": "title", "label": "Heading", "default": "Problem-Solving Home Gadgets" },
    { "type": "text", "id": "subtitle", "label": "Subheading", "default": "Tested cleaning and organization gadgets engineered to save you hours of scrubbing and fix daily home annoyances." },
    { "type": "collection", "id": "collection", "label": "Collection" },
    { "type": "range", "id": "products_to_show", "min": 2, "max": 12, "step": 1, "default": 4, "label": "Products to show" }
  ],
  "presets": [{ "name": "Featured Products" }]
}
{% endschema %}`
  },
  {
    path: 'sections/benefits-features.liquid',
    name: 'benefits-features.liquid',
    category: 'sections',
    type: 'liquid',
    content: `<section class="py-16 sm:py-24 bg-stone-900 text-stone-100 border-t border-stone-800">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto text-center mb-16">
      <div class="text-xs uppercase tracking-widest text-orange-400 font-mono mb-3">Chore Elimination Engineering</div>
      <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
        {{ section.settings.heading | default: 'Eliminate Back-Breaking Scrubbing & Daily Home Clutter' }}
      </h2>
      <p class="text-stone-300 text-sm sm:text-base leading-relaxed">
        {{ section.settings.subheading | default: 'Traditional manual cleaning causes knee strain, sore wrists, and wasted weekends. Smallfix motor-driven gadgets cut scrubbing time by 70% and keep your home effortlessly organized.' }}
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center border-t border-stone-800 pt-12">
      <div class="p-6">
        <div class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tabular-nums mb-2">
          {{ section.settings.metric_1 | default: '70% Faster' }}
        </div>
        <p class="text-sm text-stone-300 max-w-xs mx-auto">
          {{ section.settings.metric_1_label | default: 'Average cleaning time reduction across bathrooms, showers, and kitchen tile' }}
        </p>
      </div>

      <div class="p-6 border-y md:border-y-0 md:border-x border-stone-800">
        <div class="text-3xl sm:text-4xl lg:text-5xl font-bold text-orange-400 tabular-nums mb-2">
          {{ section.settings.metric_2 | default: '420 RPM' }}
        </div>
        <p class="text-sm text-stone-300 max-w-xs mx-auto">
          {{ section.settings.metric_2_label | default: 'Dual-speed motorized torque eliminates stubborn limescale without bending or joint strain' }}
        </p>
      </div>

      <div class="p-6">
        <div class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tabular-nums mb-2">
          {{ section.settings.metric_3 | default: '30-Day' }}
        </div>
        <p class="text-sm text-stone-300 max-w-xs mx-auto">
          {{ section.settings.metric_3_label | default: 'Risk-free in-home trial backed by our 100% money-back clean guarantee' }}
        </p>
      </div>
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Benefits & Features",
  "settings": [
    { "type": "text", "id": "heading", "label": "Heading", "default": "Eliminate Back-Breaking Scrubbing & Daily Home Clutter" },
    { "type": "textarea", "id": "subheading", "label": "Subheading", "default": "Traditional manual cleaning causes knee strain, sore wrists, and wasted weekends. Smallfix motor-driven gadgets cut scrubbing time by 70% and keep your home effortlessly organized." }
  ],
  "presets": [{ "name": "Benefits & Features" }]
}
{% endschema %}`
  },
  {
    path: 'sections/testimonials.liquid',
    name: 'testimonials.liquid',
    category: 'sections',
    type: 'liquid',
    content: `<section class="py-16 sm:py-24 bg-stone-100/70 border-t border-stone-200">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center max-w-2xl mx-auto mb-14">
      <div class="text-xs uppercase tracking-widest text-orange-600 font-mono mb-2 flex items-center justify-center gap-1.5">
        <span class="text-orange-500">◆</span>
        <span>VERIFIED CUSTOMER REVIEWS</span>
      </div>
      <h2 class="text-2xl sm:text-3xl text-stone-900 font-bold">
        {{ section.settings.heading | default: 'Tested and Loved by 12,000+ Homeowners' }}
      </h2>
      <p class="text-stone-600 mt-2 text-sm sm:text-base">
        Real feedback from busy homeowners who cut their cleaning time and reclaimed their weekends.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="bg-white p-8 border border-stone-200/80 rounded-lg shadow-2xs flex flex-col justify-between">
        <div>
          <div class="text-orange-500 text-sm mb-4">★★★★★</div>
          <p class="text-stone-700 text-sm leading-relaxed mb-6">
            "The SpinScrub Pro cleaned 5 years of hard water stain and shower grout in under 20 minutes without me having to kneel down once. My bad back is so grateful."
          </p>
        </div>
        <div class="border-t border-stone-100 pt-4 text-xs">
          <div class="font-semibold text-stone-900">Sarah Jenkins</div>
          <div class="text-stone-500">Verified Buyer · Austin, TX</div>
        </div>
      </div>

      <div class="bg-white p-8 border border-stone-200/80 rounded-lg shadow-2xs flex flex-col justify-between">
        <div>
          <div class="text-orange-500 text-sm mb-4">★★★★★</div>
          <p class="text-stone-700 text-sm leading-relaxed mb-6">
            "MagLock solved the most annoying daily frustration on my nightstand. No more crawling under the bed to fish out my dropped phone charger cord every night."
          </p>
        </div>
        <div class="border-t border-stone-100 pt-4 text-xs">
          <div class="font-semibold text-stone-900">David Miller</div>
          <div class="text-stone-500">Verified Buyer · Seattle, WA</div>
        </div>
      </div>

      <div class="bg-white p-8 border border-stone-200/80 rounded-lg shadow-2xs flex flex-col justify-between">
        <div>
          <div class="text-orange-500 text-sm mb-4">★★★★★</div>
          <p class="text-stone-700 text-sm leading-relaxed mb-6">
            "Shipped promptly in 2 days and arrived with tracking. The window track cleaner got dust and grime out of sliding door tracks that my vacuum could never reach."
          </p>
        </div>
        <div class="border-t border-stone-100 pt-4 text-xs">
          <div class="font-semibold text-stone-900">Rachel Torres</div>
          <div class="text-stone-500">Verified Buyer · Chicago, IL</div>
        </div>
      </div>
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Customer Testimonials",
  "settings": [
    { "type": "text", "id": "heading", "label": "Heading", "default": "Tested and Loved by 12,000+ Homeowners" }
  ],
  "presets": [{ "name": "Customer Testimonials" }]
}
{% endschema %}`
  },
  {
    path: 'sections/faq.liquid',
    name: 'faq.liquid',
    category: 'sections',
    type: 'liquid',
    content: `<section class="py-16 sm:py-24 bg-stone-50 border-t border-stone-200">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <div class="text-xs uppercase tracking-widest text-orange-600 font-mono mb-2 flex items-center justify-center gap-1.5">
        <span class="text-orange-500">◆</span>
        <span>HELP & ANSWERS</span>
      </div>
      <h2 class="text-2xl sm:text-3xl font-bold text-stone-900">
        {{ section.settings.heading | default: 'Frequently Asked Questions' }}
      </h2>
      <p class="text-stone-600 mt-2 text-sm sm:text-base">
        {{ section.settings.subheading | default: 'Everything you need to know about Smallfix orders, shipping times, and returns.' }}
      </p>
    </div>

    <div class="divide-y divide-stone-200 border-y border-stone-200">
      <details class="group py-5" open>
        <summary class="flex justify-between items-center cursor-pointer text-base sm:text-lg font-semibold text-stone-900 list-none">
          <span>How long does shipping take and how do I track my order?</span>
          <span class="text-orange-500 font-bold text-xl leading-none shrink-0 group-open:hidden">+</span>
          <span class="text-orange-500 font-bold text-xl leading-none shrink-0 hidden group-open:inline">&minus;</span>
        </summary>
        <div class="pt-3 text-stone-600 text-sm sm:text-base leading-relaxed pr-6">
          All orders leave our fulfillment center within 2 business days. Standard tracked delivery takes 7 to 14 business days. You will receive an automated dispatch notification email with your direct tracking link as soon as your package ships.
        </div>
      </details>

      <details class="group py-5" open>
        <summary class="flex justify-between items-center cursor-pointer text-base sm:text-lg font-semibold text-stone-900 list-none">
          <span>Which payment cards and checkout methods do you accept?</span>
          <span class="text-orange-500 font-bold text-xl leading-none shrink-0 group-open:hidden">+</span>
          <span class="text-orange-500 font-bold text-xl leading-none shrink-0 hidden group-open:inline">&minus;</span>
        </summary>
        <div class="pt-3 text-stone-600 text-sm sm:text-base leading-relaxed pr-6">
          We securely accept all major credit and debit cards including Visa, Mastercard, American Express, and Discover. We also support accelerated digital wallets including Shop Pay, Apple Pay, and Google Pay. All transactions are encrypted via 256-bit SSL certified Shopify payment gateways.
        </div>
      </details>

      <details class="group py-5">
        <summary class="flex justify-between items-center cursor-pointer text-base sm:text-lg font-semibold text-stone-900 list-none">
          <span>How do I qualify for Free Shipping?</span>
          <span class="text-orange-500 font-bold text-xl leading-none shrink-0 group-open:hidden">+</span>
          <span class="text-orange-500 font-bold text-xl leading-none shrink-0 hidden group-open:inline">&minus;</span>
        </summary>
        <div class="pt-3 text-stone-600 text-sm sm:text-base leading-relaxed pr-6">
          All orders containing $35 or more automatically unlock 100% Free Tracked Express Shipping worldwide. No coupon code is required; the discount applies instantly at checkout.
        </div>
      </details>

      <details class="group py-5">
        <summary class="flex justify-between items-center cursor-pointer text-base sm:text-lg font-semibold text-stone-900 list-none">
          <span>Is the SpinScrub Pro waterproof and safe to use in wet showers?</span>
          <span class="text-orange-500 font-bold text-xl leading-none shrink-0 group-open:hidden">+</span>
          <span class="text-orange-500 font-bold text-xl leading-none shrink-0 hidden group-open:inline">&minus;</span>
        </summary>
        <div class="pt-3 text-stone-600 text-sm sm:text-base leading-relaxed pr-6">
          Yes! The SpinScrub Pro motor head is IPX7 waterproof certified, meaning it can be safely used in running showers, full bathtubs, and wet kitchen sinks without risk of electrical damage.
        </div>
      </details>

      <details class="group py-5">
        <summary class="flex justify-between items-center cursor-pointer text-base sm:text-lg font-semibold text-stone-900 list-none">
          <span>What is your 30-Day Clean Guarantee and return policy?</span>
          <span class="text-orange-500 font-bold text-xl leading-none shrink-0 group-open:hidden">+</span>
          <span class="text-orange-500 font-bold text-xl leading-none shrink-0 hidden group-open:inline">&minus;</span>
        </summary>
        <div class="pt-3 text-stone-600 text-sm sm:text-base leading-relaxed pr-6">
          We stand behind every gadget with our 30-Day Money-Back Guarantee. If any Smallfix gadget doesn’t drastically cut your cleaning time or simplify your home, simply email support with your order number within 30 days of delivery for a hassle-free return and full refund.
        </div>
      </details>

      <details class="group py-5">
        <summary class="flex justify-between items-center cursor-pointer text-base sm:text-lg font-semibold text-stone-900 list-none">
          <span>Will the MagLock cable dock damage my wooden furniture or desk surface?</span>
          <span class="text-orange-500 font-bold text-xl leading-none shrink-0 group-open:hidden">+</span>
          <span class="text-orange-500 font-bold text-xl leading-none shrink-0 hidden group-open:inline">&minus;</span>
        </summary>
        <div class="pt-3 text-stone-600 text-sm sm:text-base leading-relaxed pr-6">
          Not at all. The MagLock base features an ultra-soft non-marking silicone pad combined with washable micro-suction technology that grips firmly to wood, marble, glass, and metal without leaving any sticky residue or scratches.
        </div>
      </details>
    </div>
  </div>
</section>

{% schema %}
{
  "name": "FAQ Accordion",
  "settings": [
    { "type": "text", "id": "heading", "label": "Heading", "default": "Frequently Asked Questions" },
    { "type": "text", "id": "subheading", "label": "Subheading", "default": "Everything you need to know about Smallfix orders, shipping times, and returns." }
  ],
  "presets": [{ "name": "FAQ Accordion" }]
}
{% endschema %}`
  },
  {
    path: 'sections/newsletter.liquid',
    name: 'newsletter.liquid',
    category: 'sections',
    type: 'liquid',
    content: `<section class="py-16 sm:py-20 bg-stone-900 text-stone-100 border-t border-stone-800">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <div class="text-xs uppercase tracking-widest text-orange-400 font-mono mb-2">Exclusive VIP Offers</div>
    <h2 class="text-2xl sm:text-3xl font-bold text-white mb-3">
      {{ section.settings.heading | default: 'Get $10 Off Your First Smallfix Order' }}
    </h2>
    <p class="text-stone-300 text-sm max-w-xl mx-auto mb-8">
      {{ section.settings.subheading | default: 'Join 25,000+ homeowners receiving our weekly chore-saving gadget drops, cleaning hacks, and private restock discounts.' }}
    </p>

    {%- form 'customer', class: 'max-w-md mx-auto' -%}
      <input type="hidden" name="contact[tags]" value="newsletter">
      <div class="flex flex-col sm:flex-row gap-3">
        <input type="email" name="contact[email]" placeholder="Enter your email address" required class="flex-1 px-4 py-3 bg-stone-800 border border-stone-700 text-white placeholder-stone-400 text-sm rounded focus:outline-hidden focus:border-stone-400">
        <button type="submit" class="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded transition-colors whitespace-nowrap">
          Claim $10 Off
        </button>
      </div>
      <p class="text-[11px] text-stone-400 mt-3">We respect your privacy. No spam. Unsubscribe anytime with 1 click.</p>
    {%- endform -%}
  </div>
</section>

{% schema %}
{
  "name": "Newsletter",
  "settings": [
    { "type": "text", "id": "heading", "label": "Heading", "default": "Get $10 Off Your First Smallfix Order" },
    { "type": "textarea", "id": "subheading", "label": "Subheading", "default": "Join 25,000+ homeowners receiving our weekly chore-saving gadget drops, cleaning hacks, and private restock discounts." }
  ],
  "presets": [{ "name": "Newsletter" }]
}
{% endschema %}`
  },
  {
    path: 'sections/main-product.liquid',
    name: 'main-product.liquid',
    category: 'sections',
    type: 'liquid',
    content: `<section class="py-10 sm:py-16 bg-stone-50" id="MainProduct-{{ product.id }}">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14">
      <div class="lg:col-span-7">
        <div class="sticky top-28 space-y-4">
          <div class="main-gallery-image aspect-4/3 bg-stone-100 overflow-hidden border border-stone-200/80 rounded relative">
            {%- if product.featured_image != blank -%}
              <img src="{{ product.featured_image | image_url: width: 1200 }}" alt="{{ product.title | escape }}" class="w-full h-full object-cover object-center" id="ProductMainImage">
            {%- else -%}
              <div class="w-full h-full flex items-center justify-center text-stone-400">Product Image</div>
            {%- endif -%}
            {%- if product.compare_at_price > product.price -%}
              <span class="absolute top-4 left-4 bg-orange-600 text-white text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded">
                Save {{ product.compare_at_price | minus: product.price | money }}
              </span>
            {%- endif -%}
          </div>
        </div>
      </div>

      <div class="lg:col-span-5 space-y-6">
        <div class="flex items-center justify-between text-xs text-stone-500">
          <span class="uppercase tracking-widest font-mono text-orange-600 font-semibold">{{ product.type | default: 'Cleaning Gadgets' }}</span>
          <div class="flex items-center gap-1.5 text-stone-800 font-medium">
            <span class="text-orange-500">★★★★★</span>
            <span>4.9 (Verified)</span>
          </div>
        </div>

        <h1 class="text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">{{ product.title }}</h1>
        <div class="flex items-baseline gap-3">
          <span class="text-2xl font-bold text-stone-900 tabular-nums">{{ product.price | money }}</span>
          {%- if product.compare_at_price > product.price -%}
            <span class="text-base text-stone-400 line-through tabular-nums">{{ product.compare_at_price | money }}</span>
          {%- endif -%}
          <span class="text-xs text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-medium">In Stock · Dispatches in 24h</span>
        </div>

        {%- form 'product', product, id: 'product-form' -%}
          <input type="hidden" name="id" value="{{ product.selected_or_first_available_variant.id }}">
          <div class="space-y-4 pt-2">
            <div class="flex items-center gap-3">
              <div class="flex items-center border border-stone-300 rounded bg-white h-12 px-2">
                <button type="button" class="px-2 text-stone-600 font-semibold cursor-pointer" data-qty-action="minus">&minus;</button>
                <input type="number" name="quantity" value="1" min="1" class="w-12 text-center text-sm font-semibold border-0 tabular-nums bg-transparent" id="QuantityInput">
                <button type="button" class="px-2 text-stone-600 font-semibold cursor-pointer" data-qty-action="plus">&plus;</button>
              </div>
              <button type="submit" name="add" class="flex-1 h-12 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm rounded transition-colors shadow-sm cursor-pointer">
                Add to Cart · {{ product.price | money }}
              </button>
            </div>
            <div class="shopify-payment-button-container">
              {{ form | payment_button }}
            </div>
            <div class="pt-2 flex flex-col items-center gap-1.5 text-center">
              <span class="text-[11px] text-stone-500 font-medium">Guaranteed Safe & Secure Checkout</span>
              {% render 'payment-icons' %}
            </div>
          </div>
        {%- endform -%}

        <div class="border-t border-stone-200 pt-5 space-y-2.5 text-xs text-stone-600">
          <div class="flex items-center gap-2">{% render 'icon', name: 'truck', class: 'w-4 h-4 text-orange-600 shrink-0' %}<span>Free Tracked Delivery on all orders $35+</span></div>
          <div class="flex items-center gap-2">{% render 'icon', name: 'check', class: 'w-4 h-4 text-orange-600 shrink-0' %}<span>30-Day Clean Guarantee — 100% full money-back if not delighted</span></div>
          <div class="flex items-center gap-2">{% render 'icon', name: 'shield', class: 'w-4 h-4 text-orange-600 shrink-0' %}<span>1-Year Hardware & Motor Replacement Warranty included</span></div>
        </div>
      </div>
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Main Product",
  "settings": [
    { "type": "checkbox", "id": "show_dynamic_checkout", "label": "Show dynamic checkout buttons", "default": true }
  ]
}
{% endschema %}`
  },
  {
    path: 'sections/collection-grid.liquid',
    name: 'collection-grid.liquid',
    category: 'sections',
    type: 'liquid',
    content: `<section class="py-12 bg-stone-50 min-h-screen">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="mb-10 text-center max-w-2xl mx-auto">
      <div class="text-xs uppercase tracking-widest text-orange-600 font-mono mb-2 flex items-center justify-center gap-1.5">
        <span class="text-orange-500">◆</span>
        <span>HOME & CLEANING GADGETS</span>
      </div>
      <h1 class="text-3xl sm:text-4xl font-bold text-stone-900">{{ collection.title | default: 'Small Fixes for Everyday Home Annoyances' }}</h1>
      <p class="text-stone-600 text-sm mt-3 leading-relaxed">{{ collection.description | default: 'Smart, ergonomic gadgets that eradicate tedious chores, tame cord chaos, and keep your home effortlessly spotless.' }}</p>
    </div>

    {%- paginate collection.products by section.settings.products_per_page -%}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {%- for product in collection.products -%}
          {% render 'product-card', product: product %}
        {%- else -%}
          {%- for product in collections.all.products limit: section.settings.products_per_page -%}
            {% render 'product-card', product: product %}
          {%- endfor -%}
        {%- endfor -%}
      </div>
      {%- if paginate.pages > 1 -%}
        <div class="mt-12 flex justify-center">{{ paginate | default_pagination }}</div>
      {%- endif -%}
    {%- endpaginate -%}
  </div>
</section>

{% schema %}
{
  "name": "Collection Grid",
  "settings": [
    { "type": "range", "id": "products_per_page", "min": 4, "max": 24, "step": 4, "default": 12, "label": "Products per page" }
  ]
}
{% endschema %}`
  },
  {
    path: 'sections/main-cart.liquid',
    name: 'main-cart.liquid',
    category: 'sections',
    type: 'liquid',
    content: `<section class="py-12 bg-stone-50 min-h-[60vh]">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 class="text-3xl font-bold text-stone-900 mb-8">Your Cart</h1>
    {%- if cart.item_count > 0 -%}
      <form action="{{ routes.cart_url }}" method="post" id="cart" class="space-y-8">
        <div class="p-4 bg-stone-100 rounded border border-stone-200">
          {% render 'free-shipping-bar' %}
        </div>
        <div class="bg-white rounded border border-stone-200 divide-y divide-stone-200 overflow-hidden">
          {%- for item in cart.items -%}
            <div class="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div class="flex items-center gap-4">
                <img src="{{ item.image | image_url: width: 160 }}" alt="{{ item.title | escape }}" class="w-18 h-18 object-cover rounded bg-stone-100 border border-stone-200 shrink-0">
                <div>
                  <h3 class="text-sm font-semibold text-stone-900"><a href="{{ item.url }}">{{ item.product.title }}</a></h3>
                  <div class="text-sm font-medium text-stone-900 mt-1 tabular-nums">{{ item.final_price | money }}</div>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <input type="number" name="updates[]" value="{{ item.quantity }}" min="0" class="w-14 text-center py-1 text-sm border border-stone-300 rounded">
                <a href="{{ routes.cart_change_url }}?line={{ forloop.index }}&quantity=0" class="text-xs text-stone-400 hover:text-rose-600">Remove</a>
              </div>
            </div>
          {%- endfor -%}
        </div>
        <div class="bg-white p-6 rounded border border-stone-200 space-y-4">
          <div class="flex justify-between text-lg font-bold"><span>Subtotal</span><span>{{ cart.total_price | money }}</span></div>
          <button type="submit" name="checkout" class="w-full py-4 bg-stone-900 hover:bg-stone-850 text-white font-semibold text-sm rounded cursor-pointer">
            Proceed to Secure Checkout
          </button>
          <div class="pt-2 text-center">{% render 'payment-icons' %}</div>
        </div>
      </form>
    {%- else -%}
      <div class="py-16 text-center bg-white rounded border border-stone-200 p-8">
        <p class="text-base text-stone-600 mb-4">Your cart is currently empty.</p>
        <a href="/collections/all" class="inline-block px-6 py-3 bg-stone-900 text-white text-xs font-semibold rounded">Browse Cleaning Gadgets &rarr;</a>
      </div>
    {%- endif -%}
  </div>
</section>

{% schema %}
{
  "name": "Main Cart",
  "settings": [{ "type": "checkbox", "id": "show_notes", "label": "Enable Cart Notes", "default": true }]
}
{% endschema %}`
  },
  {
    path: 'sections/cart-drawer.liquid',
    name: 'cart-drawer.liquid',
    category: 'sections',
    type: 'liquid',
    content: `<div id="cart-drawer-modal" class="fixed inset-0 z-50 overflow-hidden pointer-events-none" aria-modal="true" role="dialog">
  <div class="cart-drawer-backdrop fixed inset-0 bg-stone-950/40 backdrop-blur-xs opacity-0 transition-opacity duration-300 pointer-events-none" data-action="close-cart"></div>
  <div class="fixed inset-y-0 right-0 max-w-full flex pl-10 pointer-events-none">
    <div class="cart-drawer-panel pointer-events-auto w-screen max-w-md bg-stone-50 border-l border-stone-200 shadow-2xl flex flex-col transform translate-x-full transition-transform duration-300 ease-out">
      <div class="p-5 border-b border-stone-200 flex justify-between items-center bg-white">
        <h3 class="font-bold text-base text-stone-900">Your Smallfix Bag ({{ cart.item_count }})</h3>
        <button type="button" class="p-1 text-stone-400 hover:text-stone-900 text-xl font-bold cursor-pointer" data-action="close-cart">&times;</button>
      </div>

      <div class="p-4 bg-stone-100 border-b border-stone-200">
        {% render 'free-shipping-bar' %}
      </div>

      <div class="flex-1 overflow-y-auto p-5 space-y-4">
        {%- for item in cart.items -%}
          {% render 'cart-item', item: item %}
        {%- else -%}
          <div class="py-16 text-center text-stone-500 text-sm">
            Your bag is currently empty.
          </div>
        {%- endfor -%}
      </div>

      <div class="p-5 border-t border-stone-200 bg-white space-y-3">
        <div class="flex justify-between font-bold text-stone-900">
          <span>Subtotal</span>
          <span>{{ cart.total_price | money }}</span>
        </div>
        <a href="/checkout" class="w-full block text-center py-4 bg-stone-900 text-white font-bold rounded text-sm hover:bg-stone-850 cursor-pointer">
          Proceed to Secure Checkout
        </a>
        <div class="pt-1 text-center">
          {% render 'payment-icons' %}
        </div>
      </div>
    </div>
  </div>
</div>`
  },
  {
    path: 'sections/main-search.liquid',
    name: 'main-search.liquid',
    category: 'sections',
    type: 'liquid',
    content: `<section class="py-12 bg-stone-50 min-h-[60vh]">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="max-w-2xl mx-auto text-center mb-8">
      <h1 class="text-3xl font-bold text-stone-900 mb-4">Search Gadgets</h1>
      <form action="{{ routes.search_url }}" method="get" class="flex gap-2">
        <input type="text" name="q" value="{{ search.terms | escape }}" placeholder="Search cleaning gadgets, spin scrubbers, cords..." class="flex-1 px-4 py-3 bg-white border border-stone-300 rounded text-sm">
        <button type="submit" class="px-6 py-3 bg-stone-900 text-white font-semibold text-sm rounded">Search</button>
      </form>
    </div>
    {%- if search.performed -%}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {%- for item in search.results -%}
          {%- if item.object_type == 'product' -%}
            {% render 'product-card', product: item %}
          {%- endif -%}
        {%- endfor -%}
      </div>
    {%- endif -%}
  </div>
</section>

{% schema %}
{ "name": "Main Search", "settings": [] }
{% endschema %}`
  },
  {
    path: 'sections/main-404.liquid',
    name: 'main-404.liquid',
    category: 'sections',
    type: 'liquid',
    content: `<section class="py-24 bg-stone-50 min-h-[60vh] flex items-center justify-center text-center">
  <div class="max-w-md mx-auto px-4">
    <div class="text-4xl font-bold text-orange-500 mb-2">404</div>
    <h1 class="text-2xl font-bold text-stone-900 mb-3">Page Not Found</h1>
    <p class="text-sm text-stone-600 mb-6">The page you were looking for doesn't exist or has moved.</p>
    <a href="{{ routes.root_url }}" class="inline-block px-6 py-3 bg-stone-900 text-white font-semibold text-xs rounded hover:bg-stone-850">
      Return to Smallfix Home &rarr;
    </a>
  </div>
</section>

{% schema %}
{ "name": "404 Page", "settings": [] }
{% endschema %}`
  },
  {
    path: 'sections/product-recommendations.liquid',
    name: 'product-recommendations.liquid',
    category: 'sections',
    type: 'liquid',
    content: `<section class="py-16 bg-stone-50 border-t border-stone-200">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="mb-8">
      <div class="text-xs uppercase tracking-widest text-orange-600 font-mono mb-1">Frequently Paired</div>
      <h2 class="text-2xl font-bold text-stone-900">{{ section.settings.heading | default: 'More Small Fixes You May Like' }}</h2>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {%- for product in recommendations.products limit: section.settings.products_to_show -%}
        {% render 'product-card', product: product %}
      {%- else -%}
        {%- for product in collections.all.products limit: section.settings.products_to_show -%}
          {% render 'product-card', product: product %}
        {%- endfor -%}
      {%- endfor -%}
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Product Recommendations",
  "settings": [
    { "type": "text", "id": "heading", "label": "Heading", "default": "More Small Fixes You May Like" },
    { "type": "range", "id": "products_to_show", "min": 2, "max": 8, "step": 1, "default": 4, "label": "Products to show" }
  ]
}
{% endschema %}`
  },
  {
    path: 'sections/footer.liquid',
    name: 'footer.liquid',
    category: 'sections',
    type: 'liquid',
    content: `<footer class="bg-stone-100/80 text-stone-700 text-sm border-t border-stone-200/80 pt-16 pb-12 mt-auto">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-12">
      <div class="md:col-span-5 space-y-3">
        <a href="{{ routes.root_url }}" class="inline-flex items-center gap-2 text-xl font-bold tracking-tight text-stone-900">
          <span class="text-orange-500 text-lg leading-none select-none">◆</span>
          <span>{{ section.settings.brand_name | default: 'Smallfix' }}</span>
        </a>
        <p class="text-stone-500 text-sm max-w-sm">
          {{ section.settings.tagline | default: 'Small fixes for everyday home annoyances.' }}
        </p>
      </div>

      <div class="md:col-span-2 space-y-3">
        <div class="text-xs font-semibold uppercase tracking-wider text-stone-900">SHOP</div>
        <ul class="space-y-2 text-xs text-stone-600">
          <li><a href="/collections/cleaning" class="hover:text-stone-900 transition-colors">Cleaning</a></li>
          <li><a href="/collections/power-cords" class="hover:text-stone-900 transition-colors">Power & cords</a></li>
          <li><a href="/collections/organize" class="hover:text-stone-900 transition-colors">Organize</a></li>
          <li><a href="/collections/kitchen" class="hover:text-stone-900 transition-colors">Kitchen</a></li>
        </ul>
      </div>

      <div class="md:col-span-2 space-y-3">
        <div class="text-xs font-semibold uppercase tracking-wider text-stone-900">HELP</div>
        <ul class="space-y-2 text-xs text-stone-600">
          <li><a href="/policies/shipping-policy" class="hover:text-stone-900 transition-colors">Shipping</a></li>
          <li><a href="/policies/refund-policy" class="hover:text-stone-900 transition-colors">Returns</a></li>
          <li><a href="/pages/contact" class="hover:text-stone-900 transition-colors">Contact</a></li>
        </ul>
      </div>

      <div class="md:col-span-3 space-y-3">
        <div class="text-xs font-semibold uppercase tracking-wider text-stone-900">LEGAL</div>
        <ul class="space-y-2 text-xs text-stone-600">
          <li><a href="/policies/privacy-policy" class="hover:text-stone-900 transition-colors">Privacy policy</a></li>
          <li><a href="/policies/terms-of-service" class="hover:text-stone-900 transition-colors">Terms of service</a></li>
          <li><a href="/policies/refund-policy" class="hover:text-stone-900 transition-colors">Refund policy</a></li>
        </ul>
      </div>
    </div>

    <div class="border-t border-dashed border-stone-300 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-stone-500">
      <div>
        &copy; {{ 'now' | date: '%Y' }} Smallfix Home. Sample catalog: swap in your supplier listings, photos and policies before launch.
      </div>
      <div class="font-medium text-stone-700 whitespace-nowrap">
        Free shipping $35+
      </div>
    </div>
  </div>
</footer>

{% schema %}
{
  "name": "Footer",
  "settings": [
    { "type": "text", "id": "brand_name", "label": "Brand Name", "default": "Smallfix" },
    { "type": "text", "id": "tagline", "label": "Brand Tagline", "default": "Small fixes for everyday home annoyances." }
  ]
}
{% endschema %}`
  },

  // 6. Snippets
  {
    path: 'snippets/product-card.liquid',
    name: 'product-card.liquid',
    category: 'snippets',
    type: 'liquid',
    content: `<div class="product-card group bg-white border border-stone-200/80 rounded overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
  <a href="{{ product.url }}" class="relative block aspect-4/3 bg-stone-100 overflow-hidden">
    {%- if product.featured_image != blank -%}
      <img src="{{ product.featured_image | image_url: width: 800 }}" alt="{{ product.title | escape }}" class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out" loading="lazy">
    {%- else -%}
      <div class="w-full h-full flex items-center justify-center text-stone-400 bg-stone-100 text-xs font-mono">SMALLFIX GADGET</div>
    {%- endif -%}

    {%- if product.compare_at_price > product.price -%}
      <span class="absolute top-3 left-3 bg-stone-900 text-stone-100 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded">
        Save {{ product.compare_at_price | minus: product.price | money_without_trailing_zeros }}
      </span>
    {%- endif -%}

    <button type="button" class="quick-add-btn absolute bottom-3 right-3 bg-stone-900/90 hover:bg-stone-900 text-white text-xs font-medium px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm flex items-center gap-1.5" data-product-id="{{ product.id }}" data-variant-id="{{ product.selected_or_first_available_variant.id }}">
      <span>Quick Add</span>
      <span>+</span>
    </button>
  </a>

  <div class="p-5 flex-1 flex flex-col justify-between space-y-3">
    <div>
      <div class="text-[11px] font-mono uppercase tracking-wider text-stone-500">{{ product.type | default: 'Home Gadget' }}</div>
      <h3 class="text-sm font-semibold text-stone-900 mt-1 line-clamp-1 group-hover:text-stone-700 transition-colors">
        <a href="{{ product.url }}">{{ product.title }}</a>
      </h3>
    </div>

    <div class="flex items-center justify-between pt-1 border-t border-stone-100">
      <div class="flex items-baseline gap-2">
        <span class="text-sm font-semibold text-stone-900 tabular-nums">{{ product.price | money }}</span>
        {%- if product.compare_at_price > product.price -%}
          <span class="text-xs text-stone-400 line-through tabular-nums">{{ product.compare_at_price | money }}</span>
        {%- endif -%}
      </div>
      <span class="text-[11px] text-stone-500">★ 4.9</span>
    </div>
  </div>
</div>`
  },
  {
    path: 'snippets/free-shipping-bar.liquid',
    name: 'free-shipping-bar.liquid',
    category: 'snippets',
    type: 'liquid',
    content: `{%- assign threshold = settings.free_shipping_threshold | default: 3500 -%}
{%- assign current = cart.total_price -%}
{%- assign remaining = threshold | minus: current -%}
{%- assign percentage = current | times: 100.0 | divided_by: threshold | at_most: 100 -%}

<div class="free-shipping-container space-y-1.5" data-threshold="{{ threshold }}">
  <div class="text-xs text-stone-700 flex justify-between font-medium">
    {%- if remaining > 0 -%}
      <span>Add <strong class="tabular-nums font-semibold text-stone-900">{{ remaining | money }}</strong> for Free Express Delivery</span>
    {%- else -%}
      <span class="text-emerald-800 font-semibold flex items-center gap-1">
        <span>✓</span> You unlocked Free Express Tracked Delivery!
      </span>
    {%- endif -%}
    <span class="text-stone-500 tabular-nums text-[11px]">{{ percentage | round }}%</span>
  </div>

  <div class="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
    <div class="bg-orange-500 h-full transition-all duration-300 ease-out" style="width: {{ percentage }}%;"></div>
  </div>
</div>`
  },
  {
    path: 'snippets/payment-icons.liquid',
    name: 'payment-icons.liquid',
    category: 'snippets',
    type: 'liquid',
    content: `<div class="payment-icons flex flex-wrap items-center justify-center gap-2">
  {%- if shop.enabled_payment_types != empty -%}
    {%- for type in shop.enabled_payment_types -%}
      <span class="payment-icon inline-flex items-center">
        {{ type | payment_type_svg_tag: class: 'h-6 w-auto' }}
      </span>
    {%- endfor -%}
  {%- else -%}
    <span class="px-2 py-0.5 bg-stone-100 border border-stone-200 rounded text-[10px] font-bold text-stone-700 tracking-wider">VISA</span>
    <span class="px-2 py-0.5 bg-stone-100 border border-stone-200 rounded text-[10px] font-bold text-stone-700 tracking-wider">MASTERCARD</span>
    <span class="px-2 py-0.5 bg-stone-100 border border-stone-200 rounded text-[10px] font-bold text-stone-700 tracking-wider">AMEX</span>
    <span class="px-2 py-0.5 bg-stone-100 border border-stone-200 rounded text-[10px] font-bold text-stone-700 tracking-wider">DISCOVER</span>
    <span class="px-2 py-0.5 bg-stone-100 border border-stone-200 rounded text-[10px] font-bold text-stone-700 tracking-wider">APPLE PAY</span>
    <span class="px-2 py-0.5 bg-stone-100 border border-stone-200 rounded text-[10px] font-bold text-stone-700 tracking-wider">GOOGLE PAY</span>
    <span class="px-2 py-0.5 bg-stone-100 border border-stone-200 rounded text-[10px] font-bold text-stone-700 tracking-wider">SHOP PAY</span>
  {%- endif -%}
</div>`
  },
  {
    path: 'snippets/icon.liquid',
    name: 'icon.liquid',
    category: 'snippets',
    type: 'liquid',
    content: `{%- case name -%}
  {%- when 'search' -%}
    <svg class="{{ class | default: 'w-5 h-5' }}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75">
      <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  {%- when 'bag' -%}
    <svg class="{{ class | default: 'w-5 h-5' }}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75">
      <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  {%- when 'user' -%}
    <svg class="{{ class | default: 'w-5 h-5' }}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75">
      <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  {%- when 'menu' -%}
    <svg class="{{ class | default: 'w-5 h-5' }}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75">
      <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  {%- when 'truck' -%}
    <svg class="{{ class | default: 'w-5 h-5' }}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
      <path stroke-linecap="round" stroke-linejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8h4.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
    </svg>
  {%- when 'shield' -%}
    <svg class="{{ class | default: 'w-5 h-5' }}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  {%- when 'check' -%}
    <svg class="{{ class | default: 'w-5 h-5' }}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  {%- when 'lock' -%}
    <svg class="{{ class | default: 'w-5 h-5' }}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
{%- endcase -%}`
  },
  {
    path: 'snippets/cart-item.liquid',
    name: 'cart-item.liquid',
    category: 'snippets',
    type: 'liquid',
    content: `<div class="cart-item flex gap-4 py-3 border-b border-stone-200/60" data-line-item-key="{{ item.key }}">
  <div class="w-18 h-18 bg-stone-100 rounded overflow-hidden shrink-0 border border-stone-200">
    <img src="{{ item.image | image_url: width: 140 }}" alt="{{ item.title }}" class="w-full h-full object-cover">
  </div>
  <div class="flex-1 min-w-0 flex flex-col justify-between">
    <div>
      <div class="flex justify-between items-start">
        <h4 class="text-xs font-semibold text-stone-900 truncate pr-2">
          <a href="{{ item.url }}">{{ item.product.title }}</a>
        </h4>
        <span class="text-xs font-semibold text-stone-900 tabular-nums">{{ item.final_line_price | money }}</span>
      </div>
      {%- unless item.product.has_only_default_variant -%}
        <p class="text-[11px] text-stone-500 mt-0.5">{{ item.variant.title }}</p>
      {%- endunless -%}
    </div>
    <div class="flex items-center justify-between pt-2">
      <div class="flex items-center border border-stone-200 rounded bg-white text-xs">
        <button type="button" class="px-2 py-0.5 text-stone-500 hover:text-stone-900" data-qty-change="-1" data-key="{{ item.key }}">&minus;</button>
        <span class="px-2 py-0.5 font-medium tabular-nums">{{ item.quantity }}</span>
        <button type="button" class="px-2 py-0.5 text-stone-500 hover:text-stone-900" data-qty-change="1" data-key="{{ item.key }}">&plus;</button>
      </div>
      <button type="button" class="text-[11px] text-stone-400 hover:text-rose-600 underline" data-remove-key="{{ item.key }}">Remove</button>
    </div>
  </div>
</div>`
  },
  {
    path: 'snippets/social-meta-tags.liquid',
    name: 'social-meta-tags.liquid',
    category: 'snippets',
    type: 'liquid',
    content: `<meta property="og:site_name" content="{{ shop.name }}">
<meta property="og:url" content="{{ canonical_url }}">
<meta property="og:title" content="{{ page_title | default: shop.name }}">
<meta property="og:type" content="website">
<meta property="og:description" content="{{ page_description | default: shop.description | escape }}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{{ page_title | default: shop.name }}">
<meta name="twitter:description" content="{{ page_description | default: shop.description | escape }}">`
  },

  // 7. Assets
  {
    path: 'assets/base.css',
    name: 'base.css',
    category: 'assets',
    type: 'css',
    content: `:root {
  --color-bg: #FAFAF9;
  --color-surface: #FFFFFF;
  --color-text: #1C1917;
  --color-accent: #F97316;
  --color-secondary-accent: #EA580C;
  --color-border: rgba(0,0,0,0.08);
  --font-body: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
body {
  font-family: var(--font-body);
  background-color: var(--color-bg);
  color: var(--color-text);
  overflow-x: hidden;
}
.font-mono { font-family: var(--font-mono); }
.aspect-4\\/3 { aspect-ratio: 4 / 3; }
#cart-drawer-modal.open { pointer-events: auto; }
#cart-drawer-modal.open .cart-drawer-backdrop { opacity: 1; pointer-events: auto; }
#cart-drawer-modal.open .cart-drawer-panel { transform: translateX(0); }
.site-header { transition: transform 0.25s ease, background-color 0.25s ease; }`
  },
  {
    path: 'assets/theme.js',
    name: 'theme.js',
    category: 'assets',
    type: 'js',
    content: `/**
 * Smallfix OS 2.0 Theme Core JavaScript
 * Handles navigation, mobile drawers, search overlays, and product gallery zooms.
 */
document.addEventListener('DOMContentLoaded', () => {
  const mainImage = document.getElementById('ProductMainImage');
  const thumbnails = document.querySelectorAll('[data-thumbnail-src]');
  thumbnails.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const newSrc = thumb.getAttribute('data-thumbnail-src');
      if (mainImage && newSrc) mainImage.src = newSrc;
    });
  });

  const qtyInput = document.getElementById('QuantityInput');
  const plusBtn = document.querySelector('[data-qty-action="plus"]');
  const minusBtn = document.querySelector('[data-qty-action="minus"]');
  if (qtyInput && plusBtn && minusBtn) {
    plusBtn.addEventListener('click', () => {
      qtyInput.value = parseInt(qtyInput.value || '1', 10) + 1;
    });
    minusBtn.addEventListener('click', () => {
      const val = parseInt(qtyInput.value || '1', 10);
      if (val > 1) qtyInput.value = val - 1;
    });
  }
});`
  },
  {
    path: 'assets/cart.js',
    name: 'cart.js',
    category: 'assets',
    type: 'js',
    content: `/**
 * Smallfix Shopify Cart Drawer & Ajax API Handler
 */
class CartDrawer {
  constructor() {
    this.drawer = document.getElementById('cart-drawer-modal');
    this.triggers = document.querySelectorAll('[data-action="toggle-cart"]');
    this.closeTriggers = document.querySelectorAll('[data-action="close-cart"]');
    this.init();
  }
  init() {
    this.triggers.forEach(t => t.addEventListener('click', () => this.open()));
    this.closeTriggers.forEach(t => t.addEventListener('click', () => this.close()));
  }
  open() {
    if (this.drawer) {
      this.drawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }
  close() {
    if (this.drawer) {
      this.drawer.classList.remove('open');
      document.body.style.overflow = '';
    }
  }
}
document.addEventListener('DOMContentLoaded', () => {
  window.cartDrawer = new CartDrawer();
});`
  }
];

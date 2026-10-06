import heroImg from '../assets/images/hero_cleaning_home_1791307237147.jpg';
import scrubberImg from '../assets/images/product_spin_scrubber_1791307249149.jpg';
import cableHubImg from '../assets/images/product_cable_hub_1791307262033.jpg';
import creviceImg from '../assets/images/product_crevice_cleaner_1791307271567.jpg';
import soapCaddyImg from '../assets/images/product_soap_caddy_1791307281341.jpg';

export interface Product {
  id: string;
  handle: string;
  title: string;
  category: string;
  price: number;
  compareAtPrice: number;
  costPrice: number;
  margin: number;
  image: string;
  gallery: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockLeft: number;
  batch: string;
  shortDesc: string;
  description: string;
  features: string[];
  specs: { [key: string]: string };
  variants: {
    name: string;
    options: string[];
  }[];
  isBestSeller?: boolean;
  isNewArrival?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    handle: 'spinscrub-pro-electric-scrubber',
    title: 'SpinScrub Pro 8-in-1 Cordless Electric Spin Scrubber',
    category: 'Cleaning',
    price: 49.00,
    compareAtPrice: 75.00,
    costPrice: 11.50,
    margin: 76.5,
    image: scrubberImg,
    gallery: [scrubberImg, heroImg],
    rating: 4.94,
    reviewCount: 328,
    inStock: true,
    stockLeft: 14,
    batch: 'Batch 06',
    shortDesc: 'High-torque 420 RPM motorized spin scrubber that eliminates tile grout, shower scum, and stove grime without bending or hand strain.',
    description: 'Tired of kneeling on hard floors and scrubbing stubborn bathroom grime by hand? SpinScrub Pro delivers 420 RPM dual-speed scrubbing power with an adjustable 52-inch telescoping extension wand and 8 interchangeable brush heads. Cuts bathroom and kitchen cleaning time by over 70%.',
    features: [
      'Dual-speed high-torque motor (350 RPM gentle / 420 RPM deep scrub)',
      '8 interchangeable heads: dome, flat, corner grout, scour pad, and microfiber',
      'IPX7 waterproof rating for safe use in shower stalls and submerged sinks',
      '2,500mAh USB-C fast-charging lithium battery delivers 90 minutes runtime',
      'Ergonomic extendable aluminum wand reaches baseboards and ceilings without bending'
    ],
    specs: {
      'Motor Speed': '350 RPM (Standard) / 420 RPM (Turbo Power)',
      'Battery Runtime': 'Up to 90 minutes continuous use',
      'Waterproof Grade': 'IPX7 Certified Submersible Head',
      'Extension Reach': '25 inches to 52 inches adjustable wand',
      'Charging': 'USB-C Quick Charge (2.5 hours full charge)',
      'Weight': '1.8 lbs ultra-lightweight balanced handle'
    },
    variants: [
      {
        name: 'Color',
        options: ['Clean White & Slate Gray', 'Matte Sage Green']
      }
    ],
    isBestSeller: true
  },
  {
    id: 'prod-002',
    handle: 'maglock-desktop-cable-organizer',
    title: 'MagLock 5-Slot Desktop & Nightstand Cable Organizer Dock',
    category: 'Power & cords',
    price: 24.00,
    compareAtPrice: 36.00,
    costPrice: 4.80,
    margin: 80.0,
    image: cableHubImg,
    gallery: [cableHubImg, heroImg],
    rating: 4.96,
    reviewCount: 215,
    inStock: true,
    stockLeft: 22,
    batch: 'Batch 06',
    shortDesc: 'Weighted magnetic dock that keeps charging cables from falling behind your desk or nightstand forever.',
    description: 'Stop fishing dropped phone and laptop charger cables from behind your nightstand and desk. MagLock features a solid weighted base with ultra-strong neodymium magnetic collars that snap onto any cable (USB-C, Lightning, braided, thick power cords) and hold them securely at your fingertips.',
    features: [
      '5 magnetic cable collars fit cables up to 7mm diameter',
      'Heavy weighted non-slip silicone base anchors firmly without damaging wood surfaces',
      'Washable adhesive micro-suction pad provides permanent or repositionable placement',
      'Eliminates cord tangles and prevents tripping hazards across your workspace',
      'Minimalist sleek design complements modern desks and bedside tables'
    ],
    specs: {
      'Cable Capacity': 'Holds up to 5 cables simultaneously',
      'Compatible Cord Sizes': 'Fits all cords 2.5mm to 7mm thickness',
      'Material': 'Weighted Zinc Alloy Core with Soft-Touch Silicone Exterior',
      'Base Attachment': 'Washable Resuable Nano-Gel Grip Base',
      'Dimensions': '9.5 cm × 2.2 cm × 1.6 cm'
    },
    variants: [
      {
        name: 'Finish',
        options: ['Midnight Charcoal', 'Pure Off-White', 'Nordic Walnut Woodgrain']
      }
    ],
    isBestSeller: true
  },
  {
    id: 'prod-003',
    handle: 'sonicgroove-crevice-cleaner',
    title: 'SonicGroove High-Speed Electric Crevice & Track Detail Cleaner',
    category: 'Cleaning',
    price: 32.00,
    compareAtPrice: 48.00,
    costPrice: 7.20,
    margin: 77.5,
    image: creviceImg,
    gallery: [creviceImg, heroImg],
    rating: 4.92,
    reviewCount: 148,
    inStock: true,
    stockLeft: 18,
    batch: 'Batch 06',
    shortDesc: 'Vibrating precision detail cleaning tool for sliding window tracks, stove knobs, and tight corners.',
    description: 'The areas regular sponges and brushes can never reach: grime-caked window tracks, sink faucet rims, shower door runners, and kitchen appliance crevices. SonicGroove pulses at 8,000 vibrations per minute to dislodge stubborn build-up in seconds.',
    features: [
      '8,000 micro-oscillations per minute dissolve dried gunk effortlessly',
      'Ultra-slim 3mm interchangeable nylon brush tips for razor-thin gaps',
      'Waterproof IPX5 sealed ergonomic grip for wet sink and bathroom cleaning',
      'USB-C rechargeable with 120-minute continuous battery life',
      'Includes 4 specialized detailing attachments (chisel, angled, soft bristle, cone)'
    ],
    specs: {
      'Oscillation Rate': '8,000 micro-pulses / minute',
      'Battery Life': '120 minutes continuous detailing',
      'Water Resistance': 'IPX5 Splashproof Sealed',
      'Attachments Included': '4 Quick-Snap Heads',
      'Weight': '115 grams'
    },
    variants: [
      {
        name: 'Color',
        options: ['Matte White', 'Cool Slate']
      }
    ]
  },
  {
    id: 'prod-004',
    handle: 'pressflow-2in1-soap-dispenser-caddy',
    title: 'PressFlow 2-in-1 Instant Soap Dispenser & Sponge Caddy',
    category: 'Kitchen',
    price: 22.00,
    compareAtPrice: 32.00,
    costPrice: 4.50,
    margin: 79.5,
    image: soapCaddyImg,
    gallery: [soapCaddyImg, heroImg],
    rating: 4.95,
    reviewCount: 284,
    inStock: true,
    stockLeft: 27,
    batch: 'Batch 06',
    shortDesc: 'One-handed press-to-dispense kitchen soap pump that dispenses the exact soap amount onto your sponge.',
    description: 'No more messy soap bottles cluttering your kitchen counter or wasting dish soap. Press down with your sponge with one hand, and PressFlow dispenses the exact measured volume of soap directly onto the sponge surface. The integrated drip tray keeps sponges aerated and dry.',
    features: [
      'One-handed instant press pump operation saves time and eliminates slippery bottle handling',
      'Precision valve dispenses exact volume without drips or wasted liquid soap',
      'Large 13 oz transparent reservoir shows when it is time to refill',
      'Ventilated top tray dries sponges fast to prevent bacterial mildew odors',
      'BPA-free food-safe acrylic with brushed stainless steel accents'
    ],
    specs: {
      'Reservoir Capacity': '380 ml (13 fl oz) liquid dish soap',
      'Operation': 'Single-handed gravity-return pump mechanism',
      'Material': 'BPA-Free Clear ABS & Stainless Steel Accent',
      'Drainage': 'Elevated slant slotted ventilation tray',
      'Dimensions': '14 cm × 10 cm × 9 cm'
    },
    variants: [
      {
        name: 'Accent Finish',
        options: ['Brushed Stainless & Clear', 'Matte Black Edition']
      }
    ],
    isNewArrival: true
  }
];

export const NICHE_ANALYSIS = {
  nicheTitle: 'Home & Cleaning Gadgets Dropshipping Niche',
  brandName: 'Smallfix',
  tagline: 'Small fixes for everyday home annoyances.',
  summary: 'Home & Cleaning Gadgets is one of the highest-converting dropshipping niches in e-commerce. Driven by viral TikTok (#CleanTok, #HomeHacks, #AmazonMustHaves) with over 80 billion views, these problem-solving home gadgets solve universal daily annoyances (grout scrubbing, cable tangles, dirty window tracks, sink clutter). They feature impulse-friendly price points ($22–$49), high perceived utility, 75%+ gross margins, and low return rates.',
  targetAudience: {
    demographics: 'Ages 24–55, Homeowners, Renters, Busy Parents, and Remote Workers looking to save time on household chores and maintain a clean, organized sanctuary.',
    corePainPoints: [
      'Physical exhaustion and back/knee pain from scrubbing bathtubs, tile grout, and shower glass.',
      'Frustration with cords and chargers constantly falling behind nightstands and desks.',
      'Inaccessible grime in narrow window tracks, sliding door rails, and stove crevices.',
      'Soggy sponges and dripping soap bottles creating water rings around the kitchen sink.'
    ],
    buyingPsychology: [
      'Instant "Aha!" moment: The before/after contrast is instantly satisfying in video ads.',
      'High impulse buyability: Under $50 price tags trigger quick purchase decisions without second-guessing.',
      'Bundle friendly: Adding a cable organizer ($24) to a spin scrubber ($49) easily passes the $35 free shipping threshold, pushing average order value (AOV) to $60–$75.'
    ]
  },
  economics: [
    {
      product: 'SpinScrub Pro Electric Scrubber',
      supplierCost: '$11.50',
      shippingCost: '$4.50',
      totalCost: '$16.00',
      retailPrice: '$49.00',
      grossProfit: '$33.00',
      grossMargin: '67.3%',
      targetCPA: '$14.00',
      netProfitPerOrder: '$19.00'
    },
    {
      product: 'MagLock Desktop Cable Organizer',
      supplierCost: '$4.80',
      shippingCost: '$2.50',
      totalCost: '$7.30',
      retailPrice: '$24.00',
      grossProfit: '$16.70',
      grossMargin: '69.6%',
      targetCPA: '$7.00',
      netProfitPerOrder: '$9.70'
    },
    {
      product: 'SonicGroove Crevice Cleaner',
      supplierCost: '$7.20',
      shippingCost: '$3.00',
      totalCost: '$10.20',
      retailPrice: '$32.00',
      grossProfit: '$21.80',
      grossMargin: '68.1%',
      targetCPA: '$9.00',
      netProfitPerOrder: '$12.80'
    },
    {
      product: 'PressFlow 2-in-1 Soap Dispenser',
      supplierCost: '$4.50',
      shippingCost: '$2.50',
      totalCost: '$7.00',
      retailPrice: '$22.00',
      grossProfit: '$15.00',
      grossMargin: '68.2%',
      targetCPA: '$6.50',
      netProfitPerOrder: '$8.50'
    }
  ],
  adStrategies: [
    {
      hook: 'The "Satisfying Deep Clean" Before & After',
      format: 'TikTok / Instagram Reels (10s–15s)',
      script: 'Close-up macro shot of filthy brown shower tile grout. SpinScrub Pro touches the tile, and with zero pressure, a bright white clean line appears in 1 second with ASMR sound. "If you hate scrubbing on your knees, this gadget changed my life."'
    },
    {
      hook: 'The "Dropped Cable Nightmare" Solution',
      format: 'Meta Feed / TikTok UGC Problem-Agitation',
      script: 'Person goes to plug in their phone in bed at night, cable slips and falls behind the bed. Frustrated sigh. Cut to MagLock magnetic dock snapping the cable effortlessly into place. "Never crawl under your nightstand again."'
    },
    {
      hook: 'Amazon Home Finds You Actually Need',
      format: 'Shorts / Reels Curated Listicle (3 Items)',
      script: '"3 home gadgets that fix annoying daily problems: 1) The one-handed dish soap dispenser that stops sink mess, 2) The magnetic cord dock, 3) The electric window track cleaner."'
    }
  ]
};

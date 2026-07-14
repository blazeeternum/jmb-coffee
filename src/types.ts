/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ActiveView = 'home' | 'menu' | 'customizer' | 'about' | 'contact';

export interface MenuItem {
  id: string;
  name: string;
  category: 'espresso' | 'signature' | 'frappe' | 'tea-others' | 'pastries';
  price: number; // base price in USD
  description: string;
  image: string; // we'll use beautiful stylized SVGs or clean background gradients with icon overlay
  rating: number;
  reviewsCount: number;
  calories: number;
  tags: string[];
  isBestSeller?: boolean;
  isNew?: boolean;
}

export interface CoffeeCustomization {
  base: 'espresso-single' | 'espresso-double' | 'cold-brew' | 'matcha' | 'decaf';
  milk: 'none' | 'whole' | 'oat' | 'almond' | 'coconut';
  sweetness: 'none' | 'less' | 'normal' | 'extra';
  temperature: 'hot' | 'iced' | 'frappe';
  syrup: 'none' | 'caramel' | 'vanilla' | 'hazelnut';
  toppings: string[]; // ['whipped-cream', 'cocoa-powder', 'caramel-drizzle', 'cinnamon']
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  hours: string;
  phone: string;
  gmapsMock: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export const MENU_ITEMS: MenuItem[] = [
  // Espresso
  {
    id: 'e1',
    name: 'Classic Caffe Latte',
    category: 'espresso',
    price: 4.80,
    description: 'Our signature rich espresso balanced with steamed milk and a light layer of velvety microfoam.',
    image: 'latte',
    rating: 4.8,
    reviewsCount: 142,
    calories: 120,
    tags: ['Popular', 'Classic'],
    isBestSeller: true
  },
  {
    id: 'e2',
    name: 'Spiced Flat White',
    category: 'espresso',
    price: 5.20,
    description: 'Smooth, ristretto shots of espresso infused with a delicate dash of cinnamon, combined with velvety whole milk.',
    image: 'flatwhite',
    rating: 4.9,
    reviewsCount: 96,
    calories: 140,
    tags: ['Warm', 'Barista Pick'],
    isBestSeller: false
  },
  {
    id: 'e3',
    name: 'Madagascar Vanilla Cappuccino',
    category: 'espresso',
    price: 5.50,
    description: 'Dark, rich espresso beneath a smooth and thick layer of milk foam, sweetened with natural Madagascar vanilla caviar.',
    image: 'cappuccino',
    rating: 4.7,
    reviewsCount: 115,
    calories: 150,
    tags: ['Aromatic'],
    isNew: true
  },
  {
    id: 'e4',
    name: 'Velvet Americano',
    category: 'espresso',
    price: 3.80,
    description: 'Espresso shots topped with hot water to produce a light layer of crema, using our premium roasted single-origin Ethiopian beans.',
    image: 'americano',
    rating: 4.6,
    reviewsCount: 88,
    calories: 5,
    tags: ['Bold', 'Low Calorie'],
  },

  // Signature Brews
  {
    id: 's1',
    name: 'JMB Salted Cloud Macchiato',
    category: 'signature',
    price: 6.50,
    description: 'An ethereal combination of rich espresso, sweet vanilla syrup, and cold milk, topped with a dense layer of salted caramel cold foam.',
    image: 'salted-cloud',
    rating: 5.0,
    reviewsCount: 340,
    calories: 250,
    tags: ['Signature', 'Cold Foam'],
    isBestSeller: true
  },
  {
    id: 's2',
    name: 'Golden Honey Oat Latte',
    category: 'signature',
    price: 6.20,
    description: 'Creamy barista-grade oat milk steamed with raw local organic honey and poured over our signature double-shot espresso.',
    image: 'honey-oat',
    rating: 4.9,
    reviewsCount: 215,
    calories: 180,
    tags: ['Oat Milk', 'Natural Sweetener'],
    isBestSeller: true
  },
  {
    id: 's3',
    name: 'Toasted Hazelnut Shakerato',
    category: 'signature',
    price: 5.80,
    description: 'Fresh double espresso shaken over ice with roasted hazelnut syrup and cream, served chilled and perfectly aerated.',
    image: 'shakerato',
    rating: 4.8,
    reviewsCount: 74,
    calories: 160,
    tags: ['Iced', 'Nutty'],
    isNew: true
  },

  // Frappes
  {
    id: 'f1',
    name: 'Double Chocolate Fudge Mocha Frappe',
    category: 'frappe',
    price: 6.80,
    description: 'Rich dark Belgian cocoa and espresso blended with milk and ice, loaded with luxurious chocolate fudge drizzle and whipped cream.',
    image: 'mocha-frappe',
    rating: 4.8,
    reviewsCount: 189,
    calories: 380,
    tags: ['Sweet Tooth', 'Blended'],
    isBestSeller: true
  },
  {
    id: 'f2',
    name: 'Uji Matcha Cream Frappe',
    category: 'frappe',
    price: 6.90,
    description: 'Authentic stone-ground Japanese Uji matcha blended with creamy vanilla base, ice, and whole milk, finished with fresh whipped cream.',
    image: 'matcha-frappe',
    rating: 4.9,
    reviewsCount: 154,
    calories: 310,
    tags: ['Matcha', 'Best Selling Tea'],
  },

  // Tea & Others
  {
    id: 't1',
    name: 'Artisanal Matcha Oat Latte',
    category: 'tea-others',
    price: 5.90,
    description: 'Pure ceremonial Uji matcha whisked to perfection and served over steamed oat milk for a rich, earthy, antioxidant-packed cup.',
    image: 'matcha-latte',
    rating: 4.9,
    reviewsCount: 202,
    calories: 130,
    tags: ['Ceremonial', 'Dairy Free'],
    isBestSeller: true
  },
  {
    id: 't2',
    name: 'Lavender Hibiscus Chilled Tea',
    category: 'tea-others',
    price: 5.00,
    description: 'A vibrant herbal infusion of dried hibiscus flowers, lavender petals, and citrus peel, served cold over ice with a slice of fresh lemon.',
    image: 'hibiscus-tea',
    rating: 4.7,
    reviewsCount: 65,
    calories: 45,
    tags: ['Refreshing', 'Caffeine Free'],
    isNew: true
  },

  // Pastries
  {
    id: 'p1',
    name: 'French Butter Croissant',
    category: 'pastries',
    price: 4.20,
    description: 'Classic flaky, golden pastry made with 100% French AOP butter, baked fresh in-house every morning.',
    image: 'croissant',
    rating: 4.9,
    reviewsCount: 280,
    calories: 260,
    tags: ['Fresh Daily', 'Classic'],
    isBestSeller: true
  },
  {
    id: 'p2',
    name: 'Dark Chocolate Pain au Chocolat',
    category: 'pastries',
    price: 4.50,
    description: 'Buttery, layered laminated dough wrapping around two rich, melty bars of premium 70% Valrhona dark chocolate.',
    image: 'pain-choc',
    rating: 4.8,
    reviewsCount: 167,
    calories: 290,
    tags: ['Fresh Daily', 'Indulgent'],
  },
  {
    id: 'p3',
    name: 'Wild Blueberry Scone',
    category: 'pastries',
    price: 3.90,
    description: 'Crumbly, soft-baked buttermilk scone packed with juicy wild blueberries, served warm with clotted cream and jam.',
    image: 'scone',
    rating: 4.6,
    reviewsCount: 92,
    calories: 210,
    tags: ['Warm', 'Fruit'],
    isNew: true
  },
  {
    id: 'p4',
    name: 'Burnt Basque Cheesecake',
    category: 'pastries',
    price: 6.50,
    description: 'Rich, caramelized crust outside with a super-creamy, custard-like center that melts beautifully in your mouth.',
    image: 'cheesecake',
    rating: 4.9,
    reviewsCount: 145,
    calories: 340,
    tags: ['Signature Dessert'],
    isBestSeller: true
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Sophia Carter',
    role: 'Specialty Coffee Connoisseur',
    avatar: 'SC',
    rating: 5,
    comment: 'The JMB Salted Cloud Macchiato is hands down the best signature drink I have ever had. The creaminess of the foam perfectly cuts the espresso. Simply stunning!',
    date: 'July 2, 2026'
  },
  {
    id: 't2',
    name: 'Marcus Chen',
    role: 'Local Freelancer',
    avatar: 'MC',
    rating: 5,
    comment: 'JMB Coffee has become my absolute favorite workspace. The atmosphere is warm, the baristas are extremely knowledgeable, and the French Butter Croissant is unmatched!',
    date: 'June 28, 2026'
  },
  {
    id: 't3',
    name: 'Hannah Lim',
    role: 'Food Blogger',
    avatar: 'HL',
    rating: 5,
    comment: 'I love their Interactive Coffee Customizer on the website! Being able to build my cup before going to the shop is such an elegant touch. Highly recommend JMB Coffee.',
    date: 'June 15, 2026'
  }
];

export const STORE_LOCATIONS: StoreLocation[] = [
  {
    id: 'l1',
    name: 'JMB Coffee — Downtown flagship',
    address: '102 Grand Avenue, Downtown Core, Suite 400',
    hours: 'Mon - Sun: 7:00 AM - 10:00 PM',
    phone: '+1 (555) 234-5678',
    gmapsMock: 'https://maps.google.com/maps?q=downtown+cafe&t=&z=13&ie=UTF8&iwloc=&output=embed'
  },
  {
    id: 'l2',
    name: 'JMB Coffee — The Roastery & Garden',
    address: '45 Orchard Boulevard, Botanical District',
    hours: 'Mon - Sun: 8:00 AM - 9:00 PM',
    phone: '+1 (555) 876-5432',
    gmapsMock: 'https://maps.google.com/maps?q=botanical+cafe&t=&z=13&ie=UTF8&iwloc=&output=embed'
  },
  {
    id: 'l3',
    name: 'JMB Coffee — Financial Hub',
    address: '18 Plaza Towers, Level 1 Business Atrium',
    hours: 'Mon - Fri: 6:30 AM - 8:00 PM, Sat: 8:00 AM - 4:00 PM',
    phone: '+1 (555) 345-6789',
    gmapsMock: 'https://maps.google.com/maps?q=office+cafe&t=&z=13&ie=UTF8&iwloc=&output=embed'
  }
];

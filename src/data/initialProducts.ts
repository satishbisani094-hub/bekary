import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Belgian Chocolate Fudge Cake',
    price: 850,
    description: 'Decadent, rich chocolate cake layered with silky Belgian chocolate ganache and finished with cocoa dusting. Perfect for chocolate purists.',
    category: 'Cakes',
    images: [
      'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80'
    ],
    availabilityStatus: 'In Stock',
    stock: 15,
    rating: 4.9,
    reviews: [
      {
        id: 'rev-1',
        userName: 'Aanya Sharma',
        rating: 5,
        comment: 'Absolutely heavenly! The richest chocolate cake in town.',
        date: '2026-05-20',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80'
      },
      {
        id: 'rev-2',
        userName: 'Rohan Gupta',
        rating: 5,
        comment: 'So moist and rich. Highly recommended for birthdays!',
        date: '2026-05-18'
      }
    ],
    ingredients: ['Belgian Cocoa', 'Dark Chocolate Callets', 'Butter', 'Organic Vanilla', 'Flour', 'Brown Sugar'],
    weights: ['0.5kg', '1kg', '2kg'],
    isBestSeller: true,
    isPopular: true
  },
  {
    id: 'prod-2',
    name: 'Butter Croissant (Box of 4)',
    price: 320,
    description: 'Authentic French flaky pastry crafted with 100% fine Normandy butter. Crispy on the outside, light and layered on the inside.',
    category: 'Pastries',
    images: [
      'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=600&auto=format&fit=crop&q=80'
    ],
    availabilityStatus: 'In Stock',
    stock: 25,
    rating: 4.8,
    reviews: [
      {
        id: 'rev-3',
        userName: 'Vikram Singh',
        rating: 5,
        comment: 'Reminds me of Paris! Best when warmed up in an oven for 2 minutes.',
        date: '2026-05-25'
      }
    ],
    ingredients: ['French Butter', 'Leaven', 'Unbleached Wheat Flour', 'Sea Salt', 'Organic Sugar'],
    weights: ['Box of 4', 'Box of 8'],
    isBestSeller: true
  },
  {
    id: 'prod-3',
    name: 'Gourmet Red Velvet Cupcake',
    price: 90,
    description: 'Traditional southern light cocoa cupcake topped with our signature silky vanilla-bean cream cheese frosting.',
    category: 'Cupcakes',
    images: [
      'https://images.unsplash.com/photo-1586985289688-ca9cf4993ec0?w=600&auto=format&fit=crop&q=80'
    ],
    availabilityStatus: 'In Stock',
    stock: 30,
    rating: 4.7,
    reviews: [],
    ingredients: ['Buttermilk', 'Cocoa Powder', 'Cream Cheese', 'Vanilla Bean', 'Flour'],
    weights: ['1 piece', 'Box of 6', 'Box of 12'],
    isNewArrival: true
  },
  {
    id: 'prod-4',
    name: 'French Almond Macarons (Pack of 6)',
    price: 450,
    description: 'Delicate Parisian almond meringue cookies with a soft chewy center and flavored chocolate ganache/buttercream fillings.',
    category: 'Cookies',
    images: [
      'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=600&auto=format&fit=crop&q=80'
    ],
    availabilityStatus: 'In Stock',
    stock: 20,
    rating: 4.6,
    reviews: [
      {
        id: 'rev-4',
        userName: 'Sneha Rao',
        rating: 4,
        comment: 'Beautiful colors and super tasty fillings. Little sweet but delicious.',
        date: '2026-05-24'
      }
    ],
    ingredients: ['Almond Flour', 'Egg Whites', 'Powdered Sugar', 'Vanilla Buttercream', 'Raspberry Jam'],
    weights: ['Pack of 6', 'Pack of 12'],
    isPopular: true
  },
  {
    id: 'prod-5',
    name: 'Artisanal Sourdough Boule',
    price: 180,
    description: 'Wild yeast naturally leavened bread with a blistered crust and an ultra-soft, airy crumb. 36-hour slow fermentation process.',
    category: 'Bread',
    images: [
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80'
    ],
    availabilityStatus: 'In Stock',
    stock: 12,
    rating: 4.9,
    reviews: [
      {
        id: 'rev-5',
        userName: 'Meera Deshmukh',
        rating: 5,
        comment: 'Perfect tanginess and crust. Makes the absolute best morning toast!',
        date: '2026-05-27'
      }
    ],
    ingredients: ['Stoneground Wheat Flour', 'Water', 'Wild Sourdough Culture', 'Himalayan Pink Salt'],
    weights: ['500g loaf', '750g loaf'],
    isBestSeller: true
  },
  {
    id: 'prod-6',
    name: 'Classic Glazed Donuts (Box of 4)',
    price: 240,
    description: 'Fluffy, pillowy raised yeast-raised donuts dipped in our secret sugarcane glaze that melts in your mouth.',
    category: 'Donuts',
    images: [
      'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&auto=format&fit=crop&q=80'
    ],
    availabilityStatus: 'In Stock',
    stock: 40,
    rating: 4.8,
    reviews: [],
    ingredients: ['Yeast Dough', 'Milk', 'Vanilla Extract', 'Glaze Sugar', 'Butter'],
    weights: ['Box of 4', 'Box of 8'],
    isNewArrival: true
  },
  {
    id: 'prod-7',
    name: 'Elegant Trio Wedding Cake',
    price: 4900,
    description: 'A spectacular 3-tier custom royal wedding cake decorated with edible sugar florals and delicate gold leaf brushing. Vanilla raspberry sponge.',
    category: 'Wedding Cakes',
    images: [
      'https://images.unsplash.com/photo-1527525428012-7173729ff1d1?w=600&auto=format&fit=crop&q=80'
    ],
    availabilityStatus: 'In Stock',
    stock: 5,
    rating: 5.0,
    reviews: [
      {
        id: 'rev-6',
        userName: 'Karan & Pooja',
        rating: 5,
        comment: 'Made our wedding day absolutely stunning. It tasted even better than it looked!',
        date: '2026-05-15'
      }
    ],
    ingredients: ['Madagascar Vanilla Bean', 'Raspberry Coulis', 'Egg Whites', 'Satin Ice Fondant', 'Gold Leaf Sheets'],
    weights: ['3kg (3-tier)', '5kg (3-tier)'],
    isPopular: true
  },
  {
    id: 'prod-8',
    name: 'Premium Dark Chocolate Pralines',
    price: 600,
    description: 'Crafted box of 12 intense dark chocolates infused with premium single-origin hazelnut, orange zest, and sea-salt caramel fillings.',
    category: 'Chocolates',
    images: [
      'https://images.unsplash.com/photo-1548907040-4d42b52125f0?w=600&auto=format&fit=crop&q=80'
    ],
    availabilityStatus: 'In Stock',
    stock: 18,
    rating: 4.8,
    reviews: [],
    ingredients: ['Single Origin Cocoa 70%', 'Hazelnut Paste', 'Orange Extract', 'Caramel Syrup', 'Heavy Cream'],
    weights: ['Box of 12', 'Box of 24'],
    isPopular: true
  },
  {
    id: 'prod-9',
    name: 'Multi-Flavor Birthday Confetti Cake',
    price: 1200,
    description: 'Bright celebratory birthday cake filled with delicious rainbow sprinkles and frosted with thick, lush, vanilla buttercream.',
    category: 'Birthday Cakes',
    images: [
      'https://images.unsplash.com/photo-1535141192574-5d4897c13636?w=600&auto=format&fit=crop&q=80'
    ],
    availabilityStatus: 'In Stock',
    stock: 10,
    rating: 4.9,
    reviews: [
      {
        id: 'rev-7',
        userName: 'Deepak Sharma',
        rating: 5,
        comment: 'Kids loved it! Spreads happiness and laughter, amazing taste.',
        date: '2026-05-28'
      }
    ],
    ingredients: ['Confectioners Sprinkles', 'Cake Flour', 'Sugar', 'Pure Vanilla Butter', 'Buttermilk'],
    weights: ['1.0kg', '2.0kg'],
    isBestSeller: true
  },
  {
    id: 'prod-10',
    name: 'Cold Brew Macchiato Latte',
    price: 150,
    description: 'Chilled cold brew made with light roast Arabica beans, milk, and sweet dark caramel drizzle over ice.',
    category: 'Beverages',
    images: [
      'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600&auto=format&fit=crop&q=80'
    ],
    availabilityStatus: 'In Stock',
    stock: 50,
    rating: 4.7,
    reviews: [],
    ingredients: ['Arabica Espresso', 'Whole Milk', 'Homemade Caramel', 'Vanilla Creamer', 'Ice Cubes'],
    weights: ['350ml', '500ml']
  },
  {
    id: 'prod-11',
    name: 'Savory Chicken Puff Pastry',
    price: 80,
    description: 'Crispy flaky puff shell stuffed with juicy spiced cooked chicken breast chunks, bell peppers, and fine mozzarella cheese.',
    category: 'Puffs',
    images: [
      'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&auto=format&fit=crop&q=80'
    ],
    availabilityStatus: 'In Stock',
    stock: 35,
    rating: 4.5,
    reviews: [],
    ingredients: ['Premium Flaky Puff Pastry', 'Minced Chicken', 'Mozzarella', 'Mild Indian Spices'],
    weights: ['1 piece', 'Pack of 3'],
    isPopular: true
  },
  {
    id: 'prod-12',
    name: 'Baked Garlic Breadsticks',
    price: 160,
    description: 'Perfect accompaniment to tea/soups! Six golden oven-baked breadsticks seasoned with butter, pressed garlic, and dry oregano.',
    category: 'Snacks',
    images: [
      'https://images.unsplash.com/photo-1544982503-9f984c14501a?w=600&auto=format&fit=crop&q=80'
    ],
    availabilityStatus: 'In Stock',
    stock: 22,
    rating: 4.6,
    reviews: [],
    ingredients: ['Wheat Sourdough', 'Garlic Paste', 'Fresh Oregano', 'Salted Cream Butter', 'Olive Oil'],
    weights: ['Pack of 6']
  }
];

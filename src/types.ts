/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
  photos?: string[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'Cakes' | 'Pastries' | 'Cookies' | 'Bread' | 'Donuts' | 'Cupcakes' | 'Puffs' | 'Chocolates' | 'Snacks' | 'Beverages' | 'Birthday Cakes' | 'Wedding Cakes' | string;
  images: string[];
  availabilityStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
  stock: number;
  rating: number;
  reviews: Review[];
  ingredients: string[];
  weights: string[]; // e.g. ["0.5kg", "1kg", "2kg"] or ["6 pieces", "12 pieces"]
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isPopular?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedWeight: string;
}

export interface CustomCakeOrder {
  id: string;
  flavor: string;
  sponge: string;
  size: string; // e.g., "1kg", "2kg", "3kg"
  layers: number;
  frosting: string;
  toppings: string[];
  message: string;
  deliveryDate: string;
  deliveryTimeSlot: string;
  referenceImage?: string; // Base64 or Unsplash placeholder
  estimatedPrice: number;
}

export interface Order {
  id: string;
  customerName: string;
  mobile: string;
  email: string;
  deliveryAddress: string;
  landmark: string;
  pincode: string;
  specialInstructions?: string;
  items: {
    productId: string;
    name: string;
    quantity: number;
    price: number;
    selectedWeight: string;
    image: string;
  }[];
  customCake?: CustomCakeOrder;
  subtotal: number;
  discount: number;
  deliveryCharge: number;
  grandTotal: number;
  paymentMethod: 'UPI' | 'Card' | 'COD';
  paymentId?: string;
  status: 'Pending' | 'Confirmed' | 'Preparing' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  orderDate: string;
  deliveryDate: string;
  deliveryTimeSlot: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  landmark?: string;
  pincode?: string;
  role: 'customer' | 'admin';
}

export interface Subscription {
  id: string;
  userId: string;
  planName: 'Daily Bread' | 'Weekly Cake Box' | 'Monthly Celebration';
  frequency: 'daily' | 'weekly' | 'monthly';
  itemsDescription: string;
  price: number;
  status: 'Active' | 'Paused' | 'Cancelled';
  startDate: string;
  deliveryTimeSlot: string;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  minOrderValue: number;
  description: string;
}

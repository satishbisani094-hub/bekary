import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, ArrowRight, Tag } from 'lucide-react';
import { CartItem, Coupon } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, weight: string, newQuantity: number) => void;
  onRemoveItem: (productId: string, weight: string) => void;
  onCheckout: () => void;
  activeCoupon: Coupon | null;
  onApplyCoupon: (code: string) => boolean;
  onRemoveCoupon: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  activeCoupon,
  onApplyCoupon,
  onRemoveCoupon
}: CartDrawerProps) {
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  
  // Calculate discounts
  const discountAmount = activeCoupon 
    ? Math.round((subtotal * activeCoupon.discountPercent) / 100)
    : 0;

  const deliveryCharge = subtotal > 500 || subtotal === 0 ? 0 : 50;
  const grandTotal = subtotal - discountAmount + deliveryCharge;

  const handleApplyCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput.trim()) return;

    if (subtotal === 0) {
      setCouponError('Cart is empty.');
      return;
    }

    const success = onApplyCoupon(couponInput.trim().toUpperCase());
    if (success) {
      setCouponInput('');
    } else {
      setCouponError('Invalid code or order value too low.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      <div className="absolute inset-0 bg-stone-900/50 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFDF9] shadow-2xl flex flex-col border-l border-orange-100">
          
          {/* CART HEADER */}
          <div className="p-5 border-b border-orange-100 flex items-center justify-between bg-white z-10">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5.5 w-5.5 text-orange-500" />
              <h2 className="font-serif text-lg font-bold text-amber-950">Your Bakery Basket</h2>
              <span className="text-xs bg-orange-100 text-orange-850 px-2.5 py-0.5 rounded-full font-bold">
                {cart.length} items
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-stone-100 text-stone-500 hover:text-stone-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* BASKET CONTENT LIST */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-20">
                <ShoppingBag className="h-12 w-12 text-stone-300 mx-auto mb-3" />
                <p className="font-bold text-stone-850 text-sm">Your basket is currently empty</p>
                <p className="text-stone-500 text-xs mt-1">Explore our delicious categories and add something tasty.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedWeight}`}
                    className="flex gap-3 bg-white p-3 rounded-2xl border border-orange-50/50 shadow-2xs relative group"
                  >
                    
                    {/* Thumbnail */}
                    <div className="h-16 w-20 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Meta details */}
                    <div className="grow min-w-0 pr-6">
                      <h4 className="text-xs font-bold text-amber-950 truncate leading-tight">
                        {item.product.name}
                      </h4>
                      <p className="text-[10px] text-orange-500 font-extrabold uppercase tracking-wide mt-0.5">
                        Size: {item.selectedWeight}
                      </p>
                      
                      <div className="flex items-center justify-between mt-2.5">
                        <span className="font-mono text-xs font-bold text-stone-800">
                          ₹{item.product.price} <span className="text-stone-400 font-normal">x {item.quantity}</span>
                        </span>

                        {/* Controls */}
                        <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50 overflow-hidden shrink-0 scale-90">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.selectedWeight, item.quantity - 1)}
                            className="px-2.5 py-0.5 text-stone-600 hover:bg-stone-200 font-bold text-xs"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-bold text-stone-800">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.selectedWeight, item.quantity + 1)}
                            className="px-2.5 py-0.5 text-stone-600 hover:bg-stone-200 font-bold text-xs"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Trash Delete */}
                    <button
                      onClick={() => onRemoveItem(item.product.id, item.selectedWeight)}
                      className="absolute top-3 right-3 text-stone-300 hover:text-red-500 transition-colors"
                      title="Remove product"
                    >
                      <Trash2 className="h-4.5 w-4.5" />
                    </button>

                  </div>
                ))}
              </div>
            )}
          </div>

          {/* COUPON & TOTAL DETAILS BAR */}
          <div className="border-t border-orange-100 bg-white p-5 space-y-4">
            
            {/* Coupon Widget */}
            {cart.length > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] tracking-wide uppercase font-extrabold text-stone-500">
                  <span>Coupons & Offers</span>
                  <span className="text-orange-600 lowercase font-medium">try: WELCOME10, FESTIVE25</span>
                </div>

                {activeCoupon ? (
                  <div className="flex items-center justify-between rounded-xl bg-orange-50 border border-orange-200 p-2.5">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-orange-600 fill-orange-200" />
                      <div>
                        <p className="text-xs font-extrabold text-orange-950 uppercase">{activeCoupon.code}</p>
                        <p className="text-[9px] text-orange-700 font-semibold">{activeCoupon.description}</p>
                      </div>
                    </div>
                    <button onClick={onRemoveCoupon} className="text-xs font-bold text-red-505 hover:underline">
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCouponSubmit} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter Coupon Code"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="grow text-xs rounded-xl border border-stone-200 px-3 py-2 outline-none focus:border-orange-500 uppercase font-bold placeholder:normal-case placeholder:font-normal"
                    />
                    <button
                      type="submit"
                      className="bg-amber-950 hover:bg-stone-850 text-[#FFFDF9] text-xs font-bold px-4 py-2 rounded-xl transition-colors shrink-0"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && <p className="text-[10px] text-red-500 font-semibold">{couponError}</p>}
              </div>
            )}

            {/* Total Pricing Sheets */}
            <div className="space-y-2.5 text-xs text-stone-650 font-medium">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-stone-850">₹{subtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-orange-600">
                  <span>Coupon Discount</span>
                  <span className="font-mono">-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Standard Delivery</span>
                <span className="font-mono text-stone-850">
                  {deliveryCharge === 0 ? <span className="text-[#3E7D3E] font-bold">FREE</span> : `₹${deliveryCharge}`}
                </span>
              </div>
              <div className="h-px bg-stone-100 my-2" />
              <div className="flex justify-between text-base font-extrabold text-[#5C3D2E]">
                <span>Grand Total</span>
                <span className="font-mono text-xl">₹{grandTotal}</span>
              </div>
            </div>

            {/* Checkout Trigger */}
            <button
              onClick={onCheckout}
              disabled={cart.length === 0}
              className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-stone-200 disabled:text-stone-300 disabled:cursor-not-allowed disabled:shadow-none text-white font-bold py-3.5 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Place Bakery Order</span>
              <ArrowRight className="h-4.5 w-4.5" />
            </button>

            <p className="text-[10px] text-center text-stone-400 font-medium italic">
              Order over ₹500 qualifying for Free Delivery!
            </p>

          </div>

        </div>
      </div>
    </div>
  );
}

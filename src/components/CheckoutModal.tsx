import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { CartItem, Coupon } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  activeCoupon: Coupon | null;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  cart,
  activeCoupon
}: CheckoutModalProps) {
  const WHATSAPP_NUMBER = '917989245079';
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [pincode, setPincode] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discount = activeCoupon ? Math.round((subtotal * activeCoupon.discountPercent) / 100) : 0;
  const deliveryCharge = subtotal > 500 ? 0 : 50;
  const grandTotal = subtotal - discount + deliveryCharge;

  const handleOrderNow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address || !pincode || !deliveryDate) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    // Build cart items list
    const cartItems = cart
      .map((item) => `• ${item.product.name} (${item.selectedWeight}) x${item.quantity} - ₹${item.product.price * item.quantity}`)
      .join('\n');

    // Build WhatsApp message
    const message = `🥖 *New Order from Gayathri Bakery*

*Customer Details:*
Name: ${name}
Phone: ${phone}
Email: ${email || 'Not provided'}

*Delivery Address:*
${address}
${landmark ? `Landmark: ${landmark}` : ''}
Pincode: ${pincode}
Delivery Date: ${deliveryDate}

*Order Items:*
${cartItems}

*Price Breakdown:*
Subtotal: ₹${subtotal}
${discount > 0 ? `Discount (${activeCoupon?.discountPercent}%): -₹${discount}` : ''}
Delivery Charge: ${deliveryCharge > 0 ? `₹${deliveryCharge}` : 'Free'}

*Total Amount: ₹${grandTotal}*`;

    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');

    setTimeout(() => {
      setIsSubmitting(false);
      alert('✅ Opening WhatsApp! Send this message to confirm your order.');
      onClose();
      // Reset form
      setName('');
      setPhone('');
      setEmail('');
      setAddress('');
      setLandmark('');
      setPincode('');
      setDeliveryDate('');
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl border border-orange-50/50">
        
        {/* HEADER */}
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 border-b border-orange-100 sticky top-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-2xl font-bold text-amber-950">Order Now</h2>
              <p className="text-xs text-stone-500 mt-1">Enter your details to receive order via WhatsApp</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-stone-100 text-stone-700 hover:bg-stone-200 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleOrderNow} className="p-6 space-y-4">
          
          {/* Name and Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-stone-600 uppercase block mb-2">Full Name *</label>
              <input
                type="text"
                required
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-sm rounded-lg border border-stone-200 p-3 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200"
              />
            </div>
            
            <div>
              <label className="text-xs font-bold text-stone-600 uppercase block mb-2">Phone Number *</label>
              <input
                type="tel"
                required
                placeholder="+91 79892 45079"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full text-sm rounded-lg border border-stone-200 p-3 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-xs font-bold text-stone-600 uppercase block mb-2">Email Address</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-sm rounded-lg border border-stone-200 p-3 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200"
            />
          </div>

          {/* Address */}
          <div>
            <label className="text-xs font-bold text-stone-600 uppercase block mb-2">Delivery Address *</label>
            <textarea
              required
              rows={3}
              placeholder="Apartment number, building name, street address..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full text-sm rounded-lg border border-stone-200 p-3 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200"
            />
          </div>

          {/* Landmark */}
          <div>
            <label className="text-xs font-bold text-stone-600 uppercase block mb-2">Landmark (Optional)</label>
            <input
              type="text"
              placeholder="e.g. Near Central Park, Opposite Metro Station"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              className="w-full text-sm rounded-lg border border-stone-200 p-3 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200"
            />
          </div>

          {/* Pincode and Delivery Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-stone-600 uppercase block mb-2">Pincode *</label>
              <input
                type="text"
                required
                placeholder="560001"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-full text-sm rounded-lg border border-stone-200 p-3 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-600 uppercase block mb-2">Delivery Date *</label>
              <input
                type="date"
                required
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                className="w-full text-sm rounded-lg border border-stone-200 p-3 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200"
              />
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-stone-600">Subtotal:</span>
              <span className="font-bold text-stone-800">₹{subtotal}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-sm text-green-700">
                <span>Discount ({activeCoupon?.discountPercent}%):</span>
                <span className="font-bold">-₹{discount}</span>
              </div>
            )}
            {deliveryCharge > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-stone-600">Delivery:</span>
                <span className="font-bold text-stone-800">₹{deliveryCharge}</span>
              </div>
            )}
            {deliveryCharge === 0 && (
              <div className="flex justify-between text-sm text-green-700">
                <span>Delivery:</span>
                <span className="font-bold">Free</span>
              </div>
            )}
            <div className="border-t border-orange-200 pt-2 flex justify-between">
              <span className="text-sm font-bold text-amber-950">Total:</span>
              <span className="text-lg font-bold text-orange-600">₹{grandTotal}</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 disabled:from-stone-400 disabled:to-stone-400 text-white rounded-lg py-3 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95"
          >
            <Send className="h-4 w-4" />
            <span>{isSubmitting ? 'Opening WhatsApp...' : 'Send Order via WhatsApp'}</span>
          </button>

          <p className="text-center text-xs text-stone-500 mt-4">
            💬 You'll be taken to WhatsApp to send your order details to our team
          </p>
        </form>
      </div>
    </div>
  );
}

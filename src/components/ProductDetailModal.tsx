import React, { useState, useEffect } from 'react';
import { X, Star, ShoppingCart, ShieldCheck, Heart, User } from 'lucide-react';
import { Product, Review } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, weight: string) => void;
  allProducts: Product[];
  onOpenCart: () => void;
  onAddReview: (productId: string, review: Omit<Review, 'id' | 'date'>) => void;
}

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
  allProducts,
  onOpenCart,
  onAddReview
}: ProductDetailModalProps) {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedWeight, setSelectedWeight] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [newReviewRating, setNewReviewRating] = useState<number>(5);
  const [newReviewComment, setNewReviewComment] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    if (product) {
      setSelectedImage(product.images[0]);
      setSelectedWeight(product.weights[0] || '1 piece');
      setQuantity(1);
    }
  }, [product]);

  if (!product) return null;

  // Price adjustment multiplier based on weight description
  const getAdjustedPrice = () => {
    let multiplier = 1;
    if (selectedWeight.toLowerCase().includes('0.5kg') || selectedWeight.toLowerCase().includes('500g') || selectedWeight.toLowerCase().includes('350ml')) {
      multiplier = 0.6;
    } else if (selectedWeight.toLowerCase().includes('2kg') || selectedWeight.toLowerCase().includes('box of 8') || selectedWeight.toLowerCase().includes('pack of 12')) {
      multiplier = 1.8;
    } else if (selectedWeight.toLowerCase().includes('3kg') || selectedWeight.toLowerCase().includes('box of 24')) {
      multiplier = 2.6;
    } else if (selectedWeight.toLowerCase().includes('5kg')) {
      multiplier = 4;
    }
    return Math.round(product.price * multiplier);
  };

  const adjustedPrice = getAdjustedPrice();

  // Find related products
  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !newReviewComment.trim()) return;

    onAddReview(product.id, {
      userName: username,
      rating: newReviewRating,
      comment: newReviewComment
    });

    setUsername('');
    setNewReviewComment('');
    setNewReviewRating(5);
  };

  const handleAddToCart = () => {
    // We pass a modified product copy inside cart logic with adjusted weight & price as selected
    const finalizedProduct = {
      ...product,
      price: adjustedPrice
    };
    onAddToCart(finalizedProduct, quantity, selectedWeight);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    onClose();
    setTimeout(() => {
      onOpenCart();
    }, 150);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl border border-orange-50 mt-10">
        
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 text-stone-700 hover:bg-stone-200 transition-colors z-10"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
          
          {/* LEFT: GALLERY */}
          <div className="space-y-4">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-stone-50 border border-stone-100">
              <img
                src={selectedImage}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`h-16 w-20 rounded-xl overflow-hidden border-2 ${
                      selectedImage === img ? 'border-orange-500 bg-orange-50' : 'border-stone-150'
                    }`}
                  >
                    <img src={img} alt="thumbnail" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Ingredients Section */}
            <div className="bg-stone-50 rounded-2xl p-4 border border-stone-100/60">
              <h4 className="text-xs font-bold text-amber-950 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-orange-500" />
                <span>Major Ingredients</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {product.ingredients.map((ing) => (
                  <span
                    key={ing}
                    className="bg-white border border-stone-150 rounded-lg py-1 px-2.5 text-[11px] font-medium text-stone-700"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: BUY ACTIONS & DETAILS */}
          <div className="space-y-5">
            
            <div className="space-y-1">
              <span className="text-xs text-orange-600 font-extrabold uppercase tracking-widest">{product.category}</span>
              <h3 className="font-serif text-2xl font-bold text-amber-950">{product.name}</h3>
              <div className="flex items-center gap-1">
                <div className="flex text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-stone-300'}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-stone-500 font-semibold mt-0.5">({product.rating} / 5.0 Rating)</span>
              </div>
            </div>

            <p className="text-stone-600 text-sm leading-relaxed">{product.description}</p>

            {/* Weight / Pack Options */}
            <div className="space-y-2">
              <label className="text-[11px] font-extrabold text-stone-600 uppercase tracking-wider block">Select Offering Options</label>
              <div className="flex flex-wrap gap-2">
                {product.weights.map((w) => (
                  <button
                    key={w}
                    onClick={() => setSelectedWeight(w)}
                    className={`px-3 py-2 text-xs rounded-xl font-semibold border-2 transition-all ${
                      selectedWeight === w
                        ? 'border-orange-500 bg-orange-50 text-orange-950 font-bold'
                        : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            {/* Price & Quantity Setter */}
            <div className="flex items-center gap-6 py-2 border-y border-stone-100">
              <div>
                <p className="text-[10px] text-stone-400 font-bold uppercase">Estimated Price</p>
                <p className="text-2xl font-mono font-extrabold text-[#5C3D2E]">₹{adjustedPrice * quantity}</p>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] text-stone-400 font-bold uppercase text-center">Quantity</p>
                <div className="flex items-center border border-stone-200 rounded-xl bg-stone-50 overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-stone-600 hover:bg-stone-200 font-bold text-xs"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-xs font-bold text-stone-800">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(20, quantity + 1))}
                    className="px-3 py-1.5 text-stone-600 hover:bg-stone-200 font-bold text-xs"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* BUY ACTIONS */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleAddToCart}
                disabled={product.availabilityStatus === 'Out of Stock'}
                className="w-full bg-stone-50 border border-stone-200 hover:border-orange-400 text-stone-800 hover:text-orange-600 rounded-xl py-3.5 text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Add to Cart</span>
              </button>
              <button
                onClick={handleBuyNow}
                disabled={product.availabilityStatus === 'Out of Stock'}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-xl py-3.5 text-xs font-bold shadow-lg shadow-orange-100 hover:shadow-orange-200 transition-all flex items-center justify-center gap-2"
              >
                <span>Buy Now</span>
              </button>
            </div>

          </div>
        </div>

        {/* BOTTOM: REVIEWS & PERSISTENT WRITE REVIEW */}
        <div className="border-t border-stone-100 p-6 md:p-8 bg-[#FFFDF9]/60">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Review List */}
            <div className="space-y-4">
              <h4 className="font-serif text-lg font-bold text-amber-950">Customer Reviews ({product.reviews.length})</h4>
              {product.reviews.length === 0 ? (
                <p className="text-xs text-stone-400 italic">No reviews yet for this product. Be the first to share your thoughts!</p>
              ) : (
                <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1">
                  {product.reviews.map((rev) => (
                    <div key={rev.id} className="bg-white p-3.5 rounded-xl border border-stone-150/70 shadow-2xs space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-50 text-orange-700 text-[10px] font-bold">
                            {rev.userName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-stone-800 leading-none">{rev.userName}</p>
                            <p className="text-[9px] text-stone-400 mt-0.5">{rev.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-0.5">
                          <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                          <span className="text-[10px] font-bold text-stone-700">{rev.rating}.0</span>
                        </div>
                      </div>
                      <p className="text-stone-600 text-xs leading-relaxed font-normal italic">"{rev.comment}"</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* WRITE REVIEW FORM */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs space-y-3">
              <h4 className="font-serif text-sm font-bold text-amber-950 border-b border-stone-100 pb-2">Share Your Experience</h4>
              <form onSubmit={handleReviewSubmit} className="space-y-3">
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-stone-500">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full text-xs rounded-lg border border-stone-200 p-2 outline-none focus:border-orange-400 bg-stone-50/50"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-stone-500">Select Stars</label>
                    <select
                      value={newReviewRating}
                      onChange={(e) => setNewReviewRating(Number(e.target.value))}
                      className="w-full text-xs rounded-lg border border-stone-200 p-2 outline-none focus:border-orange-400 bg-stone-50/50 cursor-pointer"
                    >
                      <option value="5">5 Stars (Masterpiece)</option>
                      <option value="4">4 Stars (Good Taste)</option>
                      <option value="3">3 Stars (Average)</option>
                      <option value="2">2 Stars (Satisfactory)</option>
                      <option value="1">1 Star (Disappointed)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-stone-500">Your Comment</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="We loved the soft sponge texture and delicious buttercream!"
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    className="w-full text-xs rounded-lg border border-stone-200 p-2 outline-none focus:border-orange-400 bg-stone-50/50"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-950 text-white rounded-lg py-2 text-xs font-bold hover:bg-stone-850 transition-colors"
                >
                  Submit Bakery Review
                </button>
              </form>
            </div>

          </div>

          {/* RELATED PRODUCTS */}
          {relatedProducts.length > 0 && (
            <div className="border-t border-stone-100 mt-8 pt-6">
              <h4 className="font-serif text-sm font-bold text-amber-950 mb-4">You might also like...</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setSelectedImage(p.images[0]);
                      setSelectedWeight(p.weights[0]);
                      setQuantity(1);
                      // Switch product details view in the modal
                      // We can invoke parent state callbacks
                      // For now, let's just make it switch smoothly inside the modal
                      // by modifying product context outside. To do that elegantly:
                      product.id = p.id;
                      product.name = p.name;
                      product.price = p.price;
                      product.description = p.description;
                      product.category = p.category;
                      product.images = p.images;
                      product.ingredients = p.ingredients;
                      product.weights = p.weights;
                      product.rating = p.rating;
                      product.reviews = p.reviews;
                      setSelectedImage(p.images[0]);
                      setSelectedWeight(p.weights[0]);
                    }}
                    className="flex gap-2 p-2 rounded-xl hover:bg-stone-50 border border-stone-100/50 cursor-pointer group transition-colors bg-white shadow-2xs"
                  >
                    <div className="h-12 w-16 rounded-lg overflow-hidden shrink-0 bg-stone-50">
                      <img src={p.images[0]} alt={p.name} referrerPolicy="no-referrer" className="h-full w-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-stone-800 truncate group-hover:text-orange-500 transition-colors">
                        {p.name}
                      </p>
                      <p className="text-[10px] text-stone-400 font-semibold uppercase">{p.category}</p>
                      <p className="text-xs font-mono font-extrabold text-amber-950">₹{p.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

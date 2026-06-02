import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, ArrowUpDown, Star, Eye, Heart, ShoppingCart } from 'lucide-react';
import { Product } from '../types';

interface ShopViewProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number, weight: string) => void;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
}

export default function ShopView({
  products,
  onProductClick,
  onAddToCart,
  wishlist,
  onToggleWishlist
}: ShopViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<number>(5000);
  const [ratingFilter, setRatingFilter] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [showInStockOnly, setShowInStockOnly] = useState(false);

  const categories = useMemo(() => {
    const list = products.map((p) => p.category);
    return ['All', ...Array.from(new Set(list))];
  }, [products]);

  // Handle filtrations
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesSearch =
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        const matchesPrice = product.price <= priceRange;
        const matchesRating = product.rating >= ratingFilter;
        const matchesStock = !showInStockOnly || product.availabilityStatus === 'In Stock';

        return matchesSearch && matchesCategory && matchesPrice && matchesRating && matchesStock;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'best-selling') return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
        if (sortBy === 'new-arrivals') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // Default Featured
      });
  }, [products, searchTerm, selectedCategory, priceRange, ratingFilter, sortBy, showInStockOnly]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 font-sans">
      
      {/* HEADER BAR */}
      <div className="mb-8 text-center">
        <span className="text-xs font-bold tracking-widest text-orange-600 uppercase">Handcrafted Daily</span>
        <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-amber-950 mt-1">Our Bakehouse Menu</h2>
        <p className="text-stone-500 max-w-lg mx-auto text-sm mt-2">
          Explore delicious chocolate cakes, sourdough table breads, golden puffs, and custom confectionery treats made freshly with 100% organic ingredients.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        
        {/* SIDE BAR FILTERS */}
        <div className="lg:col-span-1 space-y-6 bg-white p-5 rounded-2xl border border-orange-50/60 shadow-sm">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <h3 className="flex items-center gap-1.5 font-bold text-amber-950 text-sm">
              <SlidersHorizontal className="h-4 w-4 text-orange-500" />
              <span>Filters & Sorting</span>
            </h3>
            {(searchTerm || selectedCategory !== 'All' || priceRange < 5000 || ratingFilter > 0 || showInStockOnly) && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                  setPriceRange(5000);
                  setRatingFilter(0);
                  setShowInStockOnly(false);
                }}
                className="text-[10px] text-orange-600 font-bold hover:underline"
              >
                Reset All
              </button>
            )}
          </div>

          {/* Search Box */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-extrabold text-stone-600 uppercase tracking-wider block">Search</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Chocolate, Croissant..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-xs rounded-xl border border-stone-200 pl-8.5 pr-4 py-2.5 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 placeholder:text-stone-400"
              />
              <Search className="absolute left-3 top-3 h-3.5 w-3.5 text-stone-400" />
            </div>
          </div>

          {/* Categories select */}
          <div className="space-y-2">
            <label className="text-[11px] font-extrabold text-stone-600 uppercase tracking-wider block">Categories</label>
            <div className="flex flex-wrap lg:flex-col gap-1.5 max-h-[300px] overflow-y-auto pr-1">
              {categories.map((cat) => {
                const count = products.filter((p) => cat === 'All' || p.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`flex items-center justify-between text-left px-3 py-2 rounded-xl text-xs font-medium w-full transition-all ${
                      selectedCategory === cat
                        ? 'bg-orange-500 text-[#FFFDF9] font-bold shadow-sm'
                        : 'bg-stone-50 hover:bg-stone-100/70 text-stone-800'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${selectedCategory === cat ? 'bg-orange-600 text-white' : 'bg-stone-200 text-stone-600'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[11px] font-extrabold text-stone-600 uppercase tracking-wider">
              <span>Max Price</span>
              <span className="text-orange-600 font-mono">₹{priceRange}</span>
            </div>
            <input
              type="range"
              min="80"
              max="5000"
              step="20"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full h-1.5 bg-stone-100 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
            <div className="flex justify-between text-[10px] text-stone-500 font-medium">
              <span>₹80</span>
              <span>₹5,000+</span>
            </div>
          </div>

          {/* Rating Filter */}
          <div className="space-y-2">
            <label className="text-[11px] font-extrabold text-stone-600 uppercase tracking-wider block">Minimum Rating</label>
            <div className="flex gap-1">
              {[0, 3, 4, 4.5, 4.8].map((stars) => (
                <button
                  key={stars}
                  onClick={() => setRatingFilter(stars)}
                  className={`flex-1 py-1 px-1.5 rounded-lg border text-[10px] font-semibold text-center transition-all ${
                    ratingFilter === stars
                      ? 'border-orange-500 bg-orange-50 text-orange-950 font-bold'
                      : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {stars === 0 ? 'All' : `${stars} ★`}
                </button>
              ))}
            </div>
          </div>

          {/* Sorting Box */}
          <div className="space-y-1.5 border-t border-stone-100 pt-4">
            <label className="text-[11px] font-extrabold text-stone-600 uppercase tracking-wider block">Sort By</label>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full text-xs rounded-xl border border-stone-200 pl-8.5 pr-4 py-2.5 outline-none appearance-none cursor-pointer focus:border-orange-400 placeholder:text-stone-400 bg-white"
              >
                <option value="featured">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="best-selling">Bestsellers First</option>
                <option value="new-arrivals">New Arrivals</option>
                <option value="rating">Top Rated</option>
              </select>
              <ArrowUpDown className="absolute left-3 top-3 h-3.5 w-3.5 text-stone-400 pointer-events-none" />
            </div>
          </div>

          {/* In Stock toggle */}
          <div className="flex items-center gap-2 border-t border-stone-100 pt-4">
            <input
              type="checkbox"
              id="instock-only"
              checked={showInStockOnly}
              onChange={(e) => setShowInStockOnly(e.target.checked)}
              className="h-4 w-4 text-orange-600 rounded focus:ring-orange-500 cursor-pointer accent-orange-600"
            />
            <label htmlFor="instock-only" className="text-xs font-medium text-stone-700 cursor-pointer select-none">
              In Stock Only
            </label>
          </div>

        </div>

        {/* PRODUCTS GRID */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex justify-between items-center bg-stone-50 p-4 rounded-xl text-xs font-semibold text-stone-700 border border-stone-100">
            <span>Showing <span className="text-orange-600 font-bold">{filteredProducts.length}</span> delicacies</span>
            <span>Category: <span className="text-amber-950 font-extrabold">{selectedCategory}</span></span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-stone-50 rounded-2xl border border-stone-100">
              <SlidersHorizontal className="h-10 w-10 text-stone-300 mx-auto mb-3" />
              <p className="text-stone-850 font-bold text-sm">We couldn't find any match</p>
              <p className="text-stone-550 text-xs mt-1">Try resetting the filters or adjusting your search term.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => {
                const isFavorite = wishlist.includes(product.id);
                return (
                  <div
                    key={product.id}
                    className="group relative flex flex-col justify-between bg-white rounded-2xl border border-orange-50/50 shadow-sm hover:shadow-md transition-all overflow-hidden h-full"
                  >
                    
                    {/* Tags & Action Icons overlay */}
                    <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
                      {product.isBestSeller && (
                        <span className="bg-amber-950 text-yellow-300 text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded-full shadow-sm">
                          Bestseller
                        </span>
                      )}
                      {product.isNewArrival && (
                        <span className="bg-orange-600 text-white text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded-full shadow-sm">
                          New
                        </span>
                      )}
                    </div>

                    {/* Wishlist Button top-right */}
                    <button
                      onClick={() => onToggleWishlist(product.id)}
                      className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white/90 backdrop-blur-xs text-stone-700 hover:text-red-500 transition-colors shadow-sm outline-none"
                    >
                      <Heart className={`h-4.5 w-4.5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                    </button>

                    {/* Image section */}
                    <div 
                      onClick={() => onProductClick(product)}
                      className="relative grow-0 shrink-0 aspect-[4/3] bg-stone-50 overflow-hidden cursor-pointer"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-stone-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="inline-flex items-center gap-1.5 bg-white scale-90 group-hover:scale-100 transition-all text-stone-900 font-bold text-xs py-2 px-3.5 rounded-xl shadow-lg">
                          <Eye className="h-4 w-4 text-orange-500" />
                          <span>Quick View</span>
                        </span>
                      </div>
                    </div>

                    {/* Specs / Info */}
                    <div className="p-4 flex flex-col justify-between grow">
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] text-orange-600 font-extrabold uppercase tracking-wide">
                            {product.category}
                          </span>
                          <div className="flex items-center gap-0.5 bg-amber-50 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                            <Star className="h-3 w-3 text-amber-500 fill-amber-500 shrink-0" />
                            <span>{product.rating}</span>
                          </div>
                        </div>

                        <h4 
                          onClick={() => onProductClick(product)}
                          className="font-serif text-base font-bold text-amber-950 group-hover:text-orange-500 transition-colors cursor-pointer line-clamp-1"
                        >
                          {product.name}
                        </h4>

                        <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>
                      </div>

                      {/* Prices & Action button */}
                      <div className="border-t border-stone-50 mt-4 pt-3 flex items-center justify-between">
                        <div>
                          <p className="text-[10px] text-stone-400 font-semibold uppercase leading-none">Starting from</p>
                          <p className="text-lg font-mono font-extrabold text-amber-950 mt-0.5">₹{product.price}</p>
                        </div>

                        {product.availabilityStatus === 'Out of Stock' ? (
                          <span className="text-[10px] font-extrabold text-red-500 uppercase tracking-widest bg-red-50 py-1.5 px-3 rounded-lg border border-red-100">
                            Sold Out
                          </span>
                        ) : (
                          <button
                            onClick={() => onAddToCart(product, 1, product.weights[0])}
                            className="inline-flex items-center gap-1.5 bg-orange-500 text-white hover:bg-orange-600 text-xs font-bold py-2 px-3 rounded-xl shadow-xs hover:shadow-sm transition-all border border-orange-500 active:scale-95"
                          >
                            <ShoppingCart className="h-4 w-4" />
                            <span>Add</span>
                          </button>
                        )}
                      </div>
                      
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}

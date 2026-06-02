import React, { useState, useMemo } from 'react';
import { Calendar, TrendingUp, DollarSign, Loader, ShoppingBag, ShieldAlert, Plus, Edit2, Trash2, Heart, Users, FileText, Check } from 'lucide-react';
import { Order, Product, User } from '../types';

interface AdminDashboardProps {
  orders: Order[];
  products: Product[];
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
  onAddProduct: (product: Omit<Product, 'id' | 'rating' | 'reviews'>) => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
}

export default function AdminDashboard({
  orders,
  products,
  onUpdateOrderStatus,
  onAddProduct,
  onEditProduct,
  onDeleteProduct
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'analytics' | 'orders' | 'inventory' | 'customers'>('analytics');
  
  // Inventory editor states
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form states for Add/Edit Product
  const [prodName, setProdName] = useState('');
  const [prodPrice, setProdPrice] = useState(150);
  const [prodDesc, setProdDesc] = useState('');
  const [prodCategory, setProdCategory] = useState('Cakes');
  const [prodImg, setProdImg] = useState('');
  const [prodStock, setProdStock] = useState(20);
  const [prodIngredients, setProdIngredients] = useState('');
  const [prodWeights, setProdWeights] = useState('1.0kg, 2.0kg');

  const CATEGORIES_LIST = [
    'Cakes', 'Pastries', 'Cookies', 'Bread', 'Donuts', 'Cupcakes', 
    'Puffs', 'Chocolates', 'Snacks', 'Beverages', 'Birthday Cakes', 'Wedding Cakes'
  ];

  // ANALYTICS COMPUTATIONS
  const totalRevenue = useMemo(() => {
    return orders
      .filter((o) => o.status !== 'Cancelled')
      .reduce((acc, o) => acc + o.grandTotal, 0);
  }, [orders]);

  const activeOrders = useMemo(() => {
    return orders.filter((o) => o.status !== 'Delivered' && o.status !== 'Cancelled').length;
  }, [orders]);

  const lowStockCount = useMemo(() => {
    return products.filter((p) => p.stock < 10 && p.availabilityStatus !== 'Out of Stock').length;
  }, [products]);

  // Unique Customers estimation
  const uniqueCustomers = useMemo(() => {
    const emails = orders.map((o) => o.email.toLowerCase());
    return Array.from(new Set(emails)).length;
  }, [orders]);

  const handleOpenAddForm = () => {
    setEditingProduct(null);
    setProdName('');
    setProdPrice(150);
    setProdDesc('');
    setProdCategory('Cakes');
    setProdImg('https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80');
    setProdStock(20);
    setProdIngredients('Flour, Organic Sugar, Butter, Milk');
    setProdWeights('1.0kg, 2.0kg');
    setShowAddForm(true);
  };

  const handleOpenEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setProdName(prod.name);
    setProdPrice(prod.price);
    setProdDesc(prod.description);
    setProdCategory(prod.category);
    setProdImg(prod.images[0]);
    setProdStock(prod.stock);
    setProdIngredients(prod.ingredients.join(', '));
    setProdWeights(prod.weights.join(', '));
    setShowAddForm(true);
  };

  const handleProductFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName || !prodPrice || !prodImg) return;

    const ingList = prodIngredients.split(',').map((i) => i.trim()).filter(Boolean);
    const wList = prodWeights.split(',').map((w) => w.trim()).filter(Boolean);

    if (editingProduct) {
      // Edit mode
      const updatedProduct: Product = {
        ...editingProduct,
        name: prodName,
        price: prodPrice,
        description: prodDesc,
        category: prodCategory,
        images: [prodImg],
        stock: prodStock,
        ingredients: ingList,
        weights: wList,
        availabilityStatus: prodStock === 0 ? 'Out of Stock' : prodStock < 10 ? 'Low Stock' : 'In Stock'
      };
      onEditProduct(updatedProduct);
      alert(`🍕 Store product "${prodName}" successfully saved in database!`);
    } else {
      // Add mode
      onAddProduct({
        name: prodName,
        price: prodPrice,
        description: prodDesc,
        category: prodCategory,
        images: [prodImg],
        stock: prodStock,
        ingredients: ingList,
        weights: wList,
        availabilityStatus: prodStock === 0 ? 'Out of Stock' : prodStock < 10 ? 'Low Stock' : 'In Stock'
      });
      alert(`🎉 New product "${prodName}" successfully baked and added to direct customer catalog!`);
    }

    setShowAddForm(false);
    setEditingProduct(null);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 font-sans">
      
      {/* SECTION BANNER */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-stone-900 text-[#FFFDF9] p-6 rounded-3xl border border-stone-850 shadow-xl relative overflow-hidden">
        <div className="absolute right-[-20px] bottom-[-20px] h-36 w-36 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />
        
        <div>
          <span className="text-[10px] uppercase tracking-widest font-bold text-orange-400 font-mono">Bakehouse HQ Secure Gate</span>
          <h2 className="font-serif text-2xl font-bold mt-1">Gayathri Administration Desk</h2>
          <p className="text-stone-400 text-xs mt-1">Manage baking queues, change product stock parameters, browse revenue stats, and dispatch orders.</p>
        </div>

        {/* Dynamic Navigation Tabs inside Banner */}
        <div className="flex flex-wrap gap-2 text-xs font-semibold z-10 shrink-0">
          {[
            { id: 'analytics', label: 'Overview Metrics', icon: TrendingUp },
            { id: 'orders', label: 'Baking Orders Desk', icon: ShoppingBag },
            { id: 'inventory', label: 'Store Catalog Admin', icon: ShieldAlert },
            { id: 'customers', label: 'Loyalty Clients', icon: Users }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setShowAddForm(false);
                }}
                className={`flex items-center gap-1.5 p-2 px-3.5 rounded-xl cursor-pointer transition-all border ${
                  activeTab === tab.id
                    ? 'bg-orange-500 text-white border-orange-500 font-bold shadow'
                    : 'bg-stone-850 hover:bg-stone-800 text-stone-300 border-stone-750'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0 text-orange-400" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. OVERVIEW METRICS TAB */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          
          {/* Quick Metrics grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white p-5 rounded-2xl border border-orange-50/50 shadow-sm flex items-center gap-4">
              <div className="h-11 w-11 rounded-xl bg-orange-100 flex items-center justify-center text-orange-700">
                <DollarSign className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-extrabold text-stone-400">Owner Income</p>
                <p className="text-xl font-mono font-extrabold text-[#5C3D2E] mt-0.5">₹{totalRevenue}</p>
                <p className="text-[9px] text-[#225c22] font-semibold mt-0.5">↑ 14% this month</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-orange-50/50 shadow-sm flex items-center gap-4">
              <div className="h-11 w-11 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800">
                <ShoppingBag className="h-5.5 w-5.5" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-extrabold text-stone-400">Total Bakes</p>
                <p className="text-xl font-mono font-extrabold text-[#5C3D2E] mt-0.5">{orders.length}</p>
                <p className="text-[9px] text-stone-400 font-semibold mt-0.5">Orders submitted overall</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-orange-50/50 shadow-sm flex items-center gap-4">
              <div className="h-11 w-11 rounded-xl bg-blue-100 flex items-center justify-center text-blue-800">
                <Loader className="h-5 w-5 text-blue-650 animate-spin" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-extrabold text-stone-400">In Oven (Active)</p>
                <p className="text-xl font-mono font-extrabold text-[#5C3D2E] mt-0.5">{activeOrders}</p>
                <p className="text-[9px] text-orange-650 font-bold mt-0.5">Preparing / Out now</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-orange-50/50 shadow-sm flex items-center gap-4">
              <div className="h-11 w-11 rounded-xl bg-red-105 flex items-center justify-center text-red-700">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-extrabold text-stone-400">Low Stock Indicators</p>
                <p className="text-xl font-mono font-extrabold text-red-650 mt-0.5">{lowStockCount}</p>
                <p className="text-[9px] text-red-600 font-bold mt-0.5">Items need replenishment</p>
              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* SVG GORGEOUS sales chart */}
            <div className="md:col-span-2 bg-white p-5 rounded-2xl border border-orange-50/50 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b border-stone-105 pb-3">
                <h4 className="font-serif text-sm font-bold text-amber-955 uppercase tracking-wide">Daily Bakery Sales Curve</h4>
                <span className="text-[10px] text-stone-400 flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-orange-500" />
                  <span>Jun 2026 Reports</span>
                </span>
              </div>

              {/* Responsive SVG Layout */}
              <div className="h-56 w-full relative flex items-end">
                
                {/* SVG path curve */}
                <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="0" y1="20" x2="100%" y2="20" stroke="#f5f5f5" strokeWidth="1" />
                  <line x1="0" y1="80" x2="100%" y2="80" stroke="#f5f5f5" strokeWidth="1" />
                  <line x1="0" y1="140" x2="100%" y2="140" stroke="#f5f5f5" strokeWidth="1" />
                  <line x1="0" y1="200" x2="100%" y2="200" stroke="#f5f5f5" strokeWidth="1" />

                  {/* Shaded Area */}
                  <path
                    d="M 10 210 L 10 160 Q 60 110 120 130 T 250 80 T 380 40 T 510 120 T 640 50 L 640 210 Z"
                    fill="url(#gradient)"
                    opacity="0.15"
                    className="w-full shrink"
                  />
                  
                  {/* Spline line */}
                  <path
                    d="M 10 160 Q 60 110 120 130 T 250 80 T 380 40 T 510 120 T 640 50"
                    fill="none"
                    stroke="#F37821"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  {/* Dot anchors */}
                  <circle cx="10" cy="160" r="5" fill="#5C3D2E" stroke="#FFFDF9" strokeWidth="2" />
                  <circle cx="120" cy="130" r="5" fill="#5C3D2E" stroke="#FFFDF9" strokeWidth="2" />
                  <circle cx="250" cy="80" r="5" fill="#5C3D2E" stroke="#FFFDF9" strokeWidth="2" />
                  <circle cx="380" cy="40" r="5" fill="#F37821" stroke="#FFFDF9" strokeWidth="2" />
                  <circle cx="510" cy="120" r="5" fill="#5C3D2E" stroke="#FFFDF9" strokeWidth="2" />
                  <circle cx="640" cy="50" r="5" fill="#F37821" stroke="#FFFDF9" strokeWidth="2" />

                  {/* Gradient blueprint */}
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#F37821" />
                      <stop offset="100%" stopColor="#FAF3E0" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* X labels */}
                <div className="absolute bottom-1 w-full flex justify-between text-[9px] font-bold text-stone-400 font-mono">
                  <span>Mon (₹4.2k)</span>
                  <span>Tue (₹6.5k)</span>
                  <span>Wed (₹8k)</span>
                  <span>Thu (₹12k)</span>
                  <span>Fri (₹7.6k)</span>
                  <span>Sat (₹14k)</span>
                </div>

              </div>
            </div>

            {/* Bestseller Items breakdown card */}
            <div className="bg-white p-5 rounded-2xl border border-orange-50/50 shadow-sm space-y-4">
              <h4 className="font-serif text-sm font-bold text-amber-955 uppercase tracking-wide border-b border-stone-105 pb-3">Popular Delicacies metrics</h4>
              <div className="space-y-3.5 text-xs font-semibold text-stone-705">
                {products.slice(0, 4).map((p, idx) => (
                  <div key={p.id} className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-stone-800 font-bold truncate max-w-[150px]">{p.name}</span>
                      <span className="font-mono text-stone-400">{32 - idx * 5} dispatches</span>
                    </div>
                    {/* Visual meter bar */}
                    <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-orange-500 h-1.5 rounded-full transition-all"
                        style={{ width: `${90 - idx * 15}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* 2. ORDER QUEUE DESK */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-2xl border border-orange-50/50 shadow-sm p-5 space-y-4">
          <div className="flex justify-between items-center border-b border-stone-100 pb-3">
            <h4 className="font-serif text-base font-bold text-amber-950">Active Customer Orders ({orders.length})</h4>
            <span className="text-xs text-stone-400">Click dropdown to update status live</span>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-20 text-stone-400 text-xs italic">
              No orders have been generated in the system yet. Please submit orders from checkout.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-stone-600 border-collapse">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[10px] font-bold">
                    <th className="p-3">Order key</th>
                    <th className="p-3">Recipient info</th>
                    <th className="p-3">Baked items</th>
                    <th className="p-3">Sum total</th>
                    <th className="p-3">Timeline preference</th>
                    <th className="p-3">State Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-stone-50/50 transition-colors">
                      
                      <td className="p-3 font-mono font-bold text-amber-955">{ord.id}</td>
                      
                      <td className="p-3 font-medium text-stone-850">
                        <p className="font-bold text-[#5C3D2E]">{ord.customerName}</p>
                        <p className="text-[10px] text-stone-450 mt-0.5">{ord.mobile}</p>
                        <p className="text-[10px] text-stone-400 font-normal">{ord.email}</p>
                      </td>

                      <td className="p-3">
                        <div className="max-w-[200px] text-[10px] space-y-0.5 font-bold text-stone-800">
                          {ord.items.map((it) => (
                            <p key={it.productId} className="truncate select-none">
                              • {it.name} <span className="text-orange-655 font-medium">({it.selectedWeight})</span> x {it.quantity}
                            </p>
                          ))}
                          {ord.customCake && (
                            <p className="text-[#704214] font-extrabold select-none">🎨 Hand-designed Layer Cake (x1)</p>
                          )}
                        </div>
                      </td>

                      <td className="p-3 font-mono font-extrabold text-[#5C3D2E] text-sm">₹{ord.grandTotal}</td>
                      
                      <td className="p-3">
                        <p className="font-bold text-stone-800 leading-none">{ord.deliveryDate}</p>
                        <p className="text-[10px] text-stone-400 mt-1">{ord.deliveryTimeSlot}</p>
                      </td>

                      <td className="p-3 shrink-0">
                        {/* Core dropdown state status editor! */}
                        <div className="relative">
                          <select
                            value={ord.status}
                            onChange={(e) => onUpdateOrderStatus(ord.id, e.target.value as any)}
                            className={`text-[10px] font-bold uppercase rounded-lg border-2 p-1.5 cursor-pointer outline-none transition-colors ${
                              ord.status === 'Delivered'
                                ? 'bg-green-50 border-green-200 text-[#225c22]'
                                : ord.status === 'Cancelled'
                                ? 'bg-red-50 border-red-200 text-red-505'
                                : ord.status === 'Preparing'
                                ? 'bg-yellow-50 border-yellow-200 text-yellow-800'
                                : 'bg-orange-50 border-orange-200 text-orange-950'
                            }`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Preparing">Preparing</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* 3. STORE CATALOG INVENTORY */}
      {activeTab === 'inventory' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-orange-50/50 shadow-sm">
            <span className="text-xs font-bold text-stone-650">Manage master menu catalog list. Stock parameters reflect on client shop instantly.</span>
            <button
              onClick={handleOpenAddForm}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs py-2 px-3.5 rounded-xl shadow transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Plus className="h-4.5 w-4.5" />
              <span>Bake New Product</span>
            </button>
          </div>

          {/* Product form slide section */}
          {showAddForm && (
            <div className="bg-white p-5 rounded-2xl border-2 border-orange-200/60 shadow-md space-y-4">
              <h4 className="font-serif text-sm font-bold text-amber-955 border-b pb-2 flex items-center justify-between">
                <span>{editingProduct ? `Edit Master Specifications: ${editingProduct.name}` : 'Bake New Master delicacy'}</span>
                <button onClick={() => setShowAddForm(false)} className="text-[10px] text-red-500 hover:underline font-bold">
                  Cancel
                </button>
              </h4>

              <form onSubmit={handleProductFormSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-stone-500">Delicacy Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Gourmet Walnut Brownie"
                      value={prodName}
                      onChange={(e) => setProdName(e.target.value)}
                      className="w-full text-xs rounded-xl border border-stone-200 p-2.5 outline-none focus:border-orange-505"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-stone-500">Base Price (INR) *</label>
                    <input
                      type="number"
                      required
                      value={prodPrice}
                      onChange={(e) => setProdPrice(Number(e.target.value))}
                      className="w-full text-xs rounded-xl border border-stone-200 p-2.5 outline-none focus:border-orange-505 font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-stone-500">Unsplash Wallpaper URL *</label>
                    <input
                      type="text"
                      required
                      value={prodImg}
                      onChange={(e) => setProdImg(e.target.value)}
                      className="w-full text-xs rounded-xl border border-stone-200 p-2.5 outline-none focus:border-orange-505"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-stone-500">Food Category *</label>
                    <select
                      value={prodCategory}
                      onChange={(e) => setProdCategory(e.target.value)}
                      className="w-full text-xs rounded-xl border border-stone-200 p-2.5 outline-none focus:border-orange-505 cursor-pointer bg-white"
                    >
                      {CATEGORIES_LIST.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-stone-500">Kitchen Stock Count *</label>
                    <input
                      type="number"
                      required
                      value={prodStock}
                      onChange={(e) => setProdStock(Number(e.target.value))}
                      className="w-full text-xs rounded-xl border border-stone-200 p-2.5 outline-none focus:border-orange-505 font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-stone-500">Weights/Counts (Comma Separated)</label>
                    <input
                      type="text"
                      placeholder="1 piece, Box of 6"
                      value={prodWeights}
                      onChange={(e) => setProdWeights(e.target.value)}
                      className="w-full text-xs rounded-xl border border-stone-200 p-2.5 outline-none focus:border-orange-505"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-stone-500">Flavor Ingredients (Comma Separated)</label>
                    <input
                      type="text"
                      placeholder="Eggless Cocoa, Milk, Pralines..."
                      value={prodIngredients}
                      onChange={(e) => setProdIngredients(e.target.value)}
                      className="w-full text-xs rounded-xl border border-stone-200 p-2.5 outline-none focus:border-orange-505"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-stone-500">Descriptive Summary</label>
                    <textarea
                      rows={2}
                      placeholder="Tasty chocolate baked dessert..."
                      value={prodDesc}
                      onChange={(e) => setProdDesc(e.target.value)}
                      className="w-full text-xs rounded-xl border border-stone-200 p-2.5 outline-none focus:border-orange-505"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#5C3D2E] hover:bg-stone-850 text-[#FFFDF9] font-bold text-xs py-3.5 rounded-xl shadow-md cursor-pointer text-center"
                  >
                    Confirm Baking Recipe Update
                  </button>
                </div>

              </form>
            </div>
          )}

          {/* Catalog grid database */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl border border-orange-50/55 p-4 flex gap-3 shadow-xs hover:shadow-xs justify-between group"
              >
                <div className="flex gap-3">
                  <div className="h-14 w-16 bg-stone-100 rounded-xl overflow-hidden shrink-0">
                    <img src={p.images[0]} alt={p.name} referrerPolicy="no-referrer" className="h-[100%] w-[100%] object-cover" />
                  </div>
                  
                  <div className="min-w-0">
                    <span className="text-[8px] bg-amber-100 text-amber-850 p-1 rounded font-bold uppercase select-none leading-none">
                      {p.category}
                    </span>
                    <h5 className="font-serif text-sm font-bold text-amber-955 truncate leading-tight mt-1.5">{p.name}</h5>
                    <p className="text-xs font-mono font-extrabold text-stone-800 tracking-tight mt-1">₹{p.price}</p>
                    <p className={`text-[10px] font-bold mt-1 uppercase ${p.stock < 10 ? 'text-red-500' : 'text-stone-450'}`}>
                      stock level: {p.stock}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 shrink-0 justify-center">
                  <button
                    onClick={() => handleOpenEditProduct(p)}
                    className="p-1.5 rounded-lg border border-stone-200 text-stone-605 bg-stone-50 hover:border-orange-400 hover:text-orange-655"
                    title="Edit Item"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => onDeleteProduct(p.id)}
                    className="p-1.5 rounded-lg border border-transparent text-red-404 bg-red-50 hover:bg-red-105"
                    title="Delete Item"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      )}

      {/* 4. CUSTOMER LOGS REGISTER INDEX */}
      {activeTab === 'customers' && (
        <div className="bg-white p-5 rounded-2xl border border-orange-50/50 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-stone-100 pb-3">
            <h4 className="font-serif text-base font-bold text-amber-955">Registered Customer Profiles directory</h4>
            <span className="text-xs text-stone-400">Total verified clients: {uniqueCustomers}</span>
          </div>

          {orders.length === 0 ? (
            <p className="text-xs italic text-stone-400">No active customer profiles to directory yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Array.from(new Set(orders.map((o) => o.email.toLowerCase()))).map((email) => {
                const clientOrder = orders.find((o) => o.email.toLowerCase() === email);
                const orderSumCount = orders.filter((o) => o.email.toLowerCase() === email).length;
                const spendSum = orders.filter((o) => o.email.toLowerCase() === email).reduce((sum, o) => sum + o.grandTotal, 0);

                return (
                  <div key={email} className="bg-stone-50 p-4 rounded-xl border border-stone-150 flex gap-3.5 items-center justify-between">
                    <div className="flex gap-3.5 items-center">
                      <div className="h-10 w-10 rounded-full bg-orange-100 text-orange-950 font-bold text-md flex items-center justify-center">
                        {clientOrder?.customerName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-amber-955 leading-none">{clientOrder?.customerName}</h5>
                        <p className="text-[10px] text-stone-400 mt-1 font-mono font-medium">{email}</p>
                        <p className="text-[10px] text-stone-500 mt-0.5 leading-tight font-medium">Zip: {clientOrder?.pincode} | Ph: {clientOrder?.mobile}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-stone-400 font-bold uppercase">Dispatches</p>
                      <p className="text-xs font-bold text-stone-800">{orderSumCount} orders</p>
                      <p className="text-[10px] font-mono font-bold text-[#3E7D3E] mt-0.5">₹{spendSum} Paid</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

    </div>
  );
}

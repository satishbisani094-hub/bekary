import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import ShopView from './components/ShopView';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import TrackerView from './components/TrackerView';
import ContactView from './components/ContactView';
import AuthModal from './components/AuthModal';

import { INITIAL_PRODUCTS } from './data/initialProducts';
import { Product, CartItem, Order, User, Subscription, Coupon, Review } from './types';

// Supported Coupons
const BAKERY_COUPONS: Coupon[] = [
  { code: 'WELCOME10', discountPercent: 10, minOrderValue: 200, description: '10% off for verified new users' },
  { code: 'FESTIVE25', discountPercent: 25, minOrderValue: 1000, description: 'Festive 25% off on orders over ₹1,000!' },
  { code: 'FIRSTBREAD', discountPercent: 15, minOrderValue: 400, description: 'Artisanal 15% off on first sourdoughs' }
];

export default function App() {
  // STATE MANAGEMENT
  const [activeView, setActiveView] = useState<'home' | 'shop' | 'contact' | 'tracking'>('home');
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  // ACTIVE PROJECTION MODALS
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [activeProductDetail, setActiveProductDetail] = useState<Product | null>(null);
  const [activeTrackingId, setActiveTrackingId] = useState('');
  
  // COUPONS
  const [activeCoupon, setActiveCoupon] = useState<Coupon | null>(null);

  // 1. INITIALIZE LOCAL STORAGE PERSISTENCE
  useEffect(() => {
    // Products
    const savedProds = localStorage.getItem('letoile_products');
    if (savedProds) {
      setProducts(JSON.parse(savedProds));
    } else {
      setProducts(INITIAL_PRODUCTS);
      localStorage.setItem('letoile_products', JSON.stringify(INITIAL_PRODUCTS));
    }

    // Cart
    const savedCart = localStorage.getItem('letoile_cart');
    if (savedCart) setCart(JSON.parse(savedCart));

    // Wishlist
    const savedWish = localStorage.getItem('letoile_wishlist');
    if (savedWish) setWishlist(JSON.parse(savedWish));

    // Orders Database (With pre-seeded active tracking for first-visit trial)
    const savedOrders = localStorage.getItem('letoile_orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    } else {
      const todayString = new Date().toISOString().split('T')[0];
      const initialOrders: Order[] = [
        {
          id: 'ORDER-2849',
          customerName: 'Satish Bysani',
          mobile: '+91 99999-88888',
          email: 'satishbysani83@gmail.com',
          deliveryAddress: 'Block 4B, Sector 2, Golden Ridge Apartments, Bangalore',
          landmark: 'Opposite Central Play Park',
          pincode: '560001',
          items: [
            {
              productId: 'prod-1',
              name: 'Belgian Chocolate Fudge Cake',
              quantity: 1,
              price: 850,
              selectedWeight: '1kg',
              image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80'
            },
            {
              productId: 'prod-5',
              name: 'Artisanal Sourdough Boule',
              quantity: 1,
              price: 180,
              selectedWeight: '500g loaf',
              image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80'
            }
          ],
          subtotal: 1030,
          discount: 103,
          deliveryCharge: 0,
          grandTotal: 927,
          paymentMethod: 'UPI',
          paymentId: 'TXN-UPI-8812',
          status: 'Preparing', // Shows active progress right away!
          orderDate: todayString + ' 10:45 AM',
          deliveryDate: todayString,
          deliveryTimeSlot: '02:00 PM - 05:00 PM'
        }
      ];
      setOrders(initialOrders);
      localStorage.setItem('letoile_orders', JSON.stringify(initialOrders));
    }

    // Auto load user profile satishbysani83@gmail.com on launch for custom branding
    const targetUser: User = {
      id: 'usr-999',
      name: 'Satish Bysani',
      email: 'satishbysani83@gmail.com',
      phone: '+91 99999-88888',
      address: 'Block 4B, Sector 2, Golden Ridge Apartments, Bangalore',
      pincode: '560001',
      role: 'customer'
    };
    setCurrentUser(targetUser);

  }, []);

  // Sync Cart changes
  const updateCartAndPersist = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('letoile_cart', JSON.stringify(newCart));
  };

  // 2. CARD ADD AND EDIT SERVICES
  const handleAddToCart = (product: Product, quantity: number, weight: string) => {
    const existingIdx = cart.findIndex(
      (item) => item.product.id === product.id && item.selectedWeight === weight
    );

    if (existingIdx > -1) {
      const copy = [...cart];
      copy[existingIdx].quantity += quantity;
      updateCartAndPersist(copy);
    } else {
      const newItem: CartItem = {
        product,
        quantity,
        selectedWeight: weight
      };
      updateCartAndPersist([...cart, newItem]);
    }

    // Visual trigger and message
    alert(`🥖 Added ${quantity}x "${product.name}" (${weight}) to your bakery basket!`);
  };

  const handleUpdateCartQuantity = (productId: string, weight: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveCartItem(productId, weight);
      return;
    }
    const updated = cart.map((item) =>
      item.product.id === productId && item.selectedWeight === weight
        ? { ...item, quantity: newQuantity }
        : item
    );
    updateCartAndPersist(updated);
  };

  const handleRemoveCartItem = (productId: string, weight: string) => {
    const updated = cart.filter(
      (item) => !(item.product.id === productId && item.selectedWeight === weight)
    );
    updateCartAndPersist(updated);
  };

  // 3. WISHLIST TOGGLE SERVICES
  const handleToggleWishlist = (productId: string) => {
    let nextWish: string[];
    if (wishlist.includes(productId)) {
      nextWish = wishlist.filter((id) => id !== productId);
    } else {
      nextWish = [...wishlist, productId];
    }
    setWishlist(nextWish);
    localStorage.setItem('letoile_wishlist', JSON.stringify(nextWish));
  };

  // 4. COUPON CONTROLLERS
  const handleApplyCoupon = (code: string): boolean => {
    const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const found = BAKERY_COUPONS.find((c) => c.code === code);

    if (found && subtotal >= found.minOrderValue) {
      setActiveCoupon(found);
      return true;
    }
    return false;
  };

  const handleRemoveCoupon = () => {
    setActiveCoupon(null);
  };

  // 5. CORE ORDER PLACEMENT
  const handlePlaceOrder = (deliveryData: any) => {
    const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const discount = activeCoupon ? Math.round((subtotal * activeCoupon.discountPercent) / 100) : 0;
    const deliveryCharge = subtotal > 500 ? 0 : 50;
    const grandTotal = subtotal - discount + deliveryCharge;
    const todayString = new Date().toISOString().split('T')[0];

    const generateId = 'ORDER-' + Math.floor(3000 + Math.random() * 6000);

    const newOrder: Order = {
      id: generateId,
      customerName: deliveryData.customerName,
      mobile: deliveryData.mobile,
      email: deliveryData.email,
      deliveryAddress: deliveryData.deliveryAddress,
      landmark: deliveryData.landmark,
      pincode: deliveryData.pincode,
      specialInstructions: deliveryData.specialInstructions,
      items: deliveryData.items,
      customCake: deliveryData.customCake,
      subtotal,
      discount,
      deliveryCharge,
      grandTotal,
      paymentMethod: deliveryData.paymentMethod,
      paymentId: deliveryData.paymentId,
      status: 'Pending',
      orderDate: todayString + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      deliveryDate: deliveryData.deliveryDate,
      deliveryTimeSlot: deliveryData.deliveryTimeSlot
    };

    // Update stock levels (Inventory management)
    const updatedProducts = products.map((prod) => {
      const purchased = deliveryData.items.find((it: any) => it.productId === prod.id);
      if (purchased) {
        const nextStock = Math.max(0, prod.stock - purchased.quantity);
        return {
          ...prod,
          stock: nextStock,
          availabilityStatus: nextStock === 0 ? 'Out of Stock' : nextStock < 10 ? 'Low Stock' : 'In Stock'
        } as Product;
      }
      return prod;
    });

    setProducts(updatedProducts);
    localStorage.setItem('letoile_products', JSON.stringify(updatedProducts));

    // Save order
    const nextOrders = [newOrder, ...orders];
    setOrders(nextOrders);
    localStorage.setItem('letoile_orders', JSON.stringify(nextOrders));

    // Clean up states
    updateCartAndPersist([]);
    setActiveCoupon(null);
    setCheckoutOpen(false);
    setCartOpen(false);

    // Direct tracking redirection
    setActiveTrackingId(generateId);
    setActiveView('tracking');

    alert(`🎉 Success! Your artisan order has been submitted. Tracking reference: ${generateId}. Dispatch staff is heating ovens!`);
  };

  // 6. ADD/EDIT/DELETE FROM ADMIN ACTIONS
  const handleAddProduct = (newProdData: any) => {
    const newId = 'prod-' + (products.length + 1);
    const product: Product = {
      id: newId,
      name: newProdData.name,
      price: newProdData.price,
      description: newProdData.description,
      category: newProdData.category,
      images: newProdData.images,
      availabilityStatus: newProdData.availabilityStatus,
      stock: newProdData.stock,
      rating: 4.8,
      reviews: [],
      ingredients: newProdData.ingredients,
      weights: newProdData.weights
    };

    const nextProds = [product, ...products];
    setProducts(nextProds);
    localStorage.setItem('letoile_products', JSON.stringify(nextProds));
  };

  const handleEditProduct = (editedProduct: Product) => {
    const nextProds = products.map((p) => (p.id === editedProduct.id ? editedProduct : p));
    setProducts(nextProds);
    localStorage.setItem('letoile_products', JSON.stringify(nextProds));
  };

  const handleDeleteProduct = (productId: string) => {
    const name = products.find((p) => p.id === productId)?.name || 'Item';
    if (confirm(`Are you sure you want to retire "${name}" from the store directory?`)) {
      const nextProds = products.filter((p) => p.id !== productId);
      setProducts(nextProds);
      localStorage.setItem('letoile_products', JSON.stringify(nextProds));
    }
  };

  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    const nextOrders = orders.map((o) => (o.id === orderId ? { ...o, status } : o));
    setOrders(nextOrders);
    localStorage.setItem('letoile_orders', JSON.stringify(nextOrders));
  };

  // 9. SUBMITTING PRODUCT REVIEWS FROM MODAL
  const handleAddReview = (productId: string, reviewData: Omit<Review, 'id' | 'date'>) => {
    const newReviewObj: Review = {
      id: 'rev-' + Math.floor(1000 + Math.random() * 9000),
      userName: reviewData.userName,
      rating: reviewData.rating,
      comment: reviewData.comment,
      date: new Date().toISOString().split('T')[0]
    };

    const nextProds = products.map((p) => {
      if (p.id === productId) {
        const nextReviews = [newReviewObj, ...p.reviews];
        const averageRating = parseFloat(
          (nextReviews.reduce((sum, r) => sum + r.rating, 0) / nextReviews.length).toFixed(1)
        );
        return {
          ...p,
          reviews: nextReviews,
          rating: averageRating
        };
      }
      return p;
    });

    setProducts(nextProds);
    localStorage.setItem('letoile_products', JSON.stringify(nextProds));

    // Dynamic modal update
    if (activeProductDetail && activeProductDetail.id === productId) {
      setActiveProductDetail({
        ...activeProductDetail,
        reviews: [newReviewObj, ...activeProductDetail.reviews],
        rating: parseFloat(
          (([newReviewObj, ...activeProductDetail.reviews].reduce((sum, r) => sum + r.rating, 0)) / ([newReviewObj, ...activeProductDetail.reviews].length)).toFixed(1)
        )
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-stone-800 flex flex-col justify-between font-sans selection:bg-orange-200">
      
      {/* HEADER SECTION */}
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        cartCount={cart.reduce((sum, it) => sum + it.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setCartOpen(true)}
        onOpenAuth={() => setAuthOpen(true)}
        currentUser={currentUser}
        onLogout={() => {
          setCurrentUser(null);
          alert('You have logged out of your account successfully.');
        }}
      />

      {/* RENDER VIEWS FRAMEWORK */}
      <main className="grow">
        {activeView === 'home' && (
          <HomeView
            products={products}
            setActiveView={setActiveView}
            onProductClick={setActiveProductDetail}
          />
        )}

        {activeView === 'shop' && (
          <ShopView
            products={products}
            onProductClick={setActiveProductDetail}
            onAddToCart={handleAddToCart}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {activeView === 'contact' && <ContactView />}

        {activeView === 'tracking' && (
          <TrackerView orders={orders} activeTrackingId={activeTrackingId} />
        )}
      </main>

      {/* FOOTER */}
      <Footer setActiveView={setActiveView} />

      {/* MODALS DRAWERS OVERLAYS */}
      
      {/* 1. Shopping Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
        activeCoupon={activeCoupon}
        onApplyCoupon={handleApplyCoupon}
        onRemoveCoupon={handleRemoveCoupon}
      />

      {/* 2. Customer Auth Modal */}
      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        currentUser={currentUser}
        onLogin={(usr) => {
          setCurrentUser(usr);
          alert(`Welcome back, ${usr.name}! Authorized securely.`);
        }}
        onLogout={() => {
          setCurrentUser(null);
          alert('Logged out from Boulangerie server.');
        }}
        orders={orders}
        onTrackOrder={(id) => {
          setActiveTrackingId(id);
          setActiveView('tracking');
        }}
      />

      {/* 3. Product Detail Popup */}
      <ProductDetailModal
        product={activeProductDetail}
        onClose={() => setActiveProductDetail(null)}
        onAddToCart={handleAddToCart}
        allProducts={products}
        onOpenCart={() => {
          setActiveProductDetail(null);
          setCartOpen(true);
        }}
        onAddReview={handleAddReview}
      />

      {/* 4. Checkout Scheduling Form */}
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cart={cart}
        activeCoupon={activeCoupon}
      />

    </div>
  );
}

import { ShoppingBag, Heart, User, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  activeView: 'home' | 'shop' | 'contact' | 'tracking';
  setActiveView: (view: 'home' | 'shop' | 'contact' | 'tracking') => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenAuth: () => void;
  currentUser: { name: string; role: 'customer' | 'admin' } | null;
  onLogout: () => void;
}

export default function Header({
  activeView,
  setActiveView,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenAuth,
  currentUser,
  onLogout
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Menu Catalog' },
    { id: 'contact', label: 'Visit Us' }
  ] as const;

  const handleNavClick = (view: typeof activeView) => {
    setActiveView(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-orange-100 bg-[#FFFDF9]/95 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* LOGO */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavClick('home')}>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white shadow-md shadow-orange-200">
            <span className="font-serif text-2xl font-bold leading-none">G</span>
          </div>
          <div>
            <h1 className="font-serif text-xl font-bold text-amber-950 tracking-tight">Gayathri</h1>
            <p className="text-[10px] font-sans text-orange-600 tracking-wider uppercase font-medium -mt-1">Artisanal Boulangerie</p>
          </div>
        </div>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`relative px-1 py-2 text-sm font-medium transition-colors hover:text-orange-500 ${
                activeView === item.id ? 'text-orange-600 font-semibold' : 'text-stone-600'
              }`}
            >
              {item.label}
              {activeView === item.id && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full bg-orange-500 rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* ACTION BUTTONS & USER */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Wishlist */}
          <button
            onClick={() => handleNavClick('shop')} // Leads to catalog
            className="group relative p-2 text-stone-600 hover:text-orange-500 transition-colors"
            title="Wishlist"
          >
            <Heart className="h-5.5 w-5.5 transition-transform group-hover:scale-105" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-amber-800 text-[10px] font-bold text-[#FFFDF9] animate-pulse">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Bag */}
          <button
            onClick={onOpenCart}
            className="group relative p-2 text-stone-600 hover:text-orange-500 transition-colors"
            title="Cart"
          >
            <ShoppingBag className="h-5.5 w-5.5 transition-transform group-hover:scale-105" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-orange-600 text-[10px] font-bold text-[#FFFDF9]">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Auth Info */}
          {currentUser ? (
            <div className="flex items-center gap-2">
              <div 
                className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 border border-amber-200 text-amber-800 font-semibold text-sm"
                title={`${currentUser.name} (${currentUser.role})`}
              >
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <div className="hidden sm:block text-left text-xs bg-stone-50 py-1 px-2 rounded-md border border-stone-100">
                <p className="font-bold text-stone-800 truncate max-w-[80px]">{currentUser.name}</p>
                <button onClick={onLogout} className="text-[10px] text-red-650 hover:underline font-medium block">
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-xl bg-orange-100 text-orange-950 transition-colors hover:bg-orange-200"
            >
              <User className="h-4 w-4 text-orange-600" />
              <span>Login</span>
            </button>
          )}

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-stone-600 hover:text-orange-500 md:hidden transition-colors"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

        </div>
      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-orange-100 bg-[#FFFDF9] py-4 px-4 shadow-xl">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full py-2.5 px-4 rounded-xl text-left text-sm font-semibold transition-all ${
                  activeView === item.id
                    ? 'bg-orange-50 text-orange-600 font-bold'
                    : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

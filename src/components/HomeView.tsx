import { Sparkles, CalendarRange, Cake, MapPin, Star, Flame, Eye } from 'lucide-react';
import { Product } from '../types';

interface HomeViewProps {
  products: Product[];
  setActiveView: (view: 'home' | 'shop' | 'contact' | 'tracking') => void;
  onProductClick: (product: Product) => void;
}

export default function HomeView({ products, setActiveView, onProductClick }: HomeViewProps) {
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 3);
  const newArrivals = products.filter((p) => p.isNewArrival).slice(0, 3);

  return (
    <div className="font-sans space-y-16 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-stone-900">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=1200&auto=format&fit=crop&q=80"
            alt="warm bread boutique oven"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-linear-to-r from-stone-950/80 via-stone-900/50 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-white space-y-6 z-10">
          <span className="inline-flex items-center gap-1 bg-orange-500/25 border border-orange-400 text-orange-300 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-widest animate-pulse select-none">
            <Flame className="h-4 w-4" />
            <span>Fired Fresh Since 2012</span>
          </span>

          <h1 className="font-serif text-4xl sm:text-6xl font-extrabold tracking-tight text-[#FFFDF9] max-w-3xl mx-auto leading-tight">
            Artisanal Baking <br />
            <span className="text-[#F7DB8A]">Poured with Love</span>
          </h1>

          <p className="max-w-xl mx-auto text-sm sm:text-base text-stone-300 leading-relaxed font-normal">
            Treat your family to golden flaky croissants, naturally wild leavened sourdough bread, and customized anniversary layer cakes formulated daily by our master French chefs.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setActiveView('shop')}
              className="bg-orange-600 hover:bg-orange-700 hover:scale-102 text-white font-bold text-xs sm:text-sm py-4 px-8 rounded-2xl transition-all shadow-lg active:scale-95 cursor-pointer"
            >
              Order Online Now
            </button>
          </div>

          {/* Quick promotion ticker */}
          <div className="pt-2 bg-black/25 inline-block p-1 px-4.5 rounded-lg text-[11px] font-semibold text-yellow-300 border border-yellow-500/20 max-w-xs sm:max-w-lg leading-normal">
            🔥 Festival Weekend Special: Use discount code <span className="font-mono bg-orange-500 text-white p-0.5 px-1 rounded">FESTIVE25</span> for 25% off (Orders over ₹1,000)!
          </div>
        </div>
      </section>

      {/* 2. THREE CORE VALUE BENTOS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-[#FFFDF9] p-6 rounded-2xl border border-orange-100 flex gap-4 items-start shadow-xs">
          <div className="h-10 w-10 text-[#FF9F29] bg-orange-100 rounded-xl flex items-center justify-center shrink-0">
            <Sparkles className="h-5.5 w-5.5" />
          </div>
          <div>
            <h4 className="font-serif text-sm font-bold text-amber-955 uppercase tracking-wide">100% Organic Flours</h4>
            <p className="text-xs text-stone-500 mt-1 leading-relaxed">
              We exclusively utilize stoneground heritage wheat berries and organic dairy options. Zero synthetic additives or artificial emulsifiers.
            </p>
          </div>
        </div>

        <div className="bg-[#FFFDF9] p-6 rounded-2xl border border-orange-100 flex gap-4 items-start shadow-xs">
          <div className="h-10 w-10 text-[#FF9F29] bg-orange-100 rounded-xl flex items-center justify-center shrink-0">
            <Cake className="h-5.5 w-5.5" />
          </div>
          <div>
            <h4 className="font-serif text-sm font-bold text-amber-955 uppercase tracking-wide">Custom Designing</h4>
            <p className="text-xs text-stone-500 mt-1 leading-relaxed">
              Construct your celebratory dream cakes layer-by-layer on our interactive portal or upload drawing reference blueprints for chef validation.
            </p>
          </div>
        </div>

        <div className="bg-[#FFFDF9] p-6 rounded-2xl border border-orange-100 flex gap-4 items-start shadow-xs">
          <div className="h-10 w-10 text-[#FF9F29] bg-orange-100 rounded-xl flex items-center justify-center shrink-0">
            <CalendarRange className="h-5.5 w-5.5" />
          </div>
          <div>
            <h4 className="font-serif text-sm font-bold text-[#704214] uppercase tracking-wide">Daily Breakfast Club</h4>
            <p className="text-xs text-stone-500 mt-1 leading-relaxed">
              Subscribe to get artisan sourdough loaves, croissants, or bagels delivered directly to your front porch every morning by 7:30 AM automatically.
            </p>
          </div>
        </div>

      </section>

      {/* 3. BEST SELLERS SECTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end border-b border-stone-105 pb-4 mb-6">
          <div>
            <span className="text-[10px] text-orange-600 font-bold uppercase tracking-wider block">Bespoke Recipes</span>
            <h3 className="font-serif text-2xl font-black text-amber-955 mt-0.5">Signature Bestsellers</h3>
          </div>
          <button
            onClick={() => setActiveView('shop')}
            className="text-xs font-bold text-orange-655 hover:underline"
          >
            See Entire Catalog →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {bestSellers.map((prod) => (
            <div
              key={prod.id}
              onClick={() => onProductClick(prod)}
              className="bg-white rounded-2xl border border-orange-50/60 shadow-xs hover:shadow-md transition-all overflow-hidden cursor-pointer group flex flex-col justify-between"
            >
              <div className="aspect-[4/3] bg-stone-50 overflow-hidden relative">
                <img
                  src={prod.images[0]}
                  alt={prod.name}
                  referrerPolicy="no-referrer"
                  className="w-[100%] h-[100%] object-cover transition-transform group-hover:scale-104 duration-300"
                />
                <span className="absolute top-2 left-2 bg-amber-950 text-white font-serif text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                  Bestseller
                </span>
              </div>
              <div className="p-4 space-y-1.5 grow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-orange-600 font-extrabold uppercase">{prod.category}</span>
                    <span className="flex items-center text-amber-500 font-bold">★ {prod.rating}</span>
                  </div>
                  <h4 className="font-serif text-sm font-extrabold text-amber-955 group-hover:text-orange-500 transition-colors truncate mt-1">
                    {prod.name}
                  </h4>
                  <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed mt-0.5">
                    {prod.description}
                  </p>
                </div>

                <div className="flex justify-between items-center border-t border-stone-50 pt-2.5 mt-3">
                  <span className="font-mono font-bold text-[#5C3D2E] text-sm">₹{prod.price}</span>
                  <span className="text-[10px] text-orange-655 font-bold flex items-center gap-1 group-hover:underline">
                    <Eye className="h-3.5 w-3.5" />
                    <span>Configure Offer</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. BRAND STORY SECTION */}
      <section className="bg-stone-50 py-16 border-y border-stone-150">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          
          <div className="space-y-4">
            <span className="text-xs font-bold text-orange-600 uppercase tracking-widest block">The Story of Gayathri</span>
            <h3 className="font-serif text-3xl font-extrabold text-[#3E2723] leading-tight">
              Slow Fermentation. <br />
              Fire, Flour & Devotion.
            </h3>
            
            <p className="text-xs sm:text-sm text-stone-605 leading-relaxed font-normal">
              Our journey started twelve years ago with nothing but a single brick fireplace and a naturally wild leaven culture carrying hints of Bangalore grapes. Deciding that artificial white bread options were insufficient, our founder set up an authentic wood-fire boutique bakehouse.
            </p>
            <p className="text-xs sm:text-sm text-stone-605 leading-relaxed font-normal">
              Every single sourdough boule undergoes a rigorous 36-hour slow fermentation cycle, allowing complex organic proteins to unfold, creating incredibly digestible, bubbly crumbs encased in blistered deep chocolate crusts.
            </p>

            <button
              onClick={() => setActiveView('contact')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5C3D2E] hover:text-orange-600 transition-colors uppercase mt-2.5 hover:underline"
            >
              <MapPin className="h-4.5 w-4.5" />
              <span>Locate our Flagship Sector 4 oven</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl overflow-hidden shadow-md">
              <img
                src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=450&auto=format&fit=crop&q=80"
                alt="baker dusting flour"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-md transform translate-y-6">
              <img
                src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=450&auto=format&fit=crop&q=80"
                alt="crisp soursough crusts"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 5. GUEST TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div>
          <span className="text-xs font-bold tracking-widest text-orange-600 uppercase">Real Feedback</span>
          <h3 className="font-serif text-2xl font-black text-[#5C3D2E] mt-1">Beloved by Bread Connoisseurs</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              quote: "The Swiss Almond croissants are flaky beyond belief. They pull apart into light buttery threads that practically sing. It is the highlight of my Saturday morning breakfast club!",
              author: "Nisha V.",
              tag: "Weekly Club Subscriber"
            },
            {
              quote: "We commissioned a 3-tier custom cream chocolate cake for our daughters wedding. The edible sugar petals were designed with extreme precision. Outstanding craftsmanship and delicious!",
              author: "Aditya S.",
              tag: "Cake Commissioner"
            },
            {
              quote: "Genuine 5-star artisanal sourdough. The wild tanginess is balanced perfectly. It has a beautiful open crumb structure. Best sandwich bread in Sector 4.",
              author: "Dr. Cyrus M.",
              tag: "Local Regular Client"
            }
          ].map((testi, idx) => (
            <div
              key={idx}
              className="bg-[#FFFDF9] p-5 rounded-2xl border border-orange-100/60 shadow-2xs space-y-4 text-center text-xs relative flex flex-col justify-between"
            >
              <span className="absolute top-4 left-4 text-2xl opacity-15 text-orange-500 select-none">“</span>
              <p className="text-stone-600 leading-relaxed font-normal italic font-serif">
                "{testi.quote}"
              </p>
              <div>
                <p className="font-bold text-amber-955">{testi.author}</p>
                <p className="text-[10px] text-orange-600 font-extrabold uppercase mt-0.5 tracking-wider">{testi.tag}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

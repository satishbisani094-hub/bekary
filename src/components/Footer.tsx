import { MapPin, Phone, Mail, Clock, ShieldCheck, Heart, Coffee } from 'lucide-react';

interface FooterProps {
  setActiveView: (view: 'home' | 'shop' | 'contact' | 'tracking') => void;
}

export default function Footer({ setActiveView }: FooterProps) {
  return (
    <footer className="bg-stone-900 text-stone-300 font-sans border-t border-stone-850">
      
      {/* BRAND & STATS SECTION */}
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 lg:grid-cols-4 border-b border-stone-800 pb-12">
          
          {/* About Column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500 text-white font-serif font-bold text-lg">
                G
              </div>
              <span className="font-serif text-lg font-bold text-[#FFFDF9]">Gayathri Bakery</span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed font-normal mb-4">
              Crafting authentic warm buttery experiences since 2012. Our master chefs combine secret traditional French formulas with locally grown fresh seasonal elements.
            </p>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-md bg-stone-850 px-2.5 py-1 text-xs font-semibold text-orange-400">
                <Coffee className="mr-1 h-3.5 w-3.5" />
                100% Eggless Options
              </span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="font-serif text-sm font-bold text-[#FFFDF9] tracking-wider uppercase mb-4">The Bakery Menu</h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => setActiveView('shop')} className="hover:text-orange-400 transition-colors">
                  Artisanal Loaf Sourdough
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('shop')} className="hover:text-orange-400 transition-colors">
                  Cream Cakes & Celebration
                </button>
              </li>
            </ul>
          </div>

          {/* Support / Service Hours */}
          <div>
            <h3 className="font-serif text-sm font-bold text-[#FFFDF9] tracking-wider uppercase mb-4">Service Hour</h3>
            <ul className="space-y-3 text-xs text-stone-400">
              <li className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 text-orange-500 shrink-0" />
                <div>
                  <p className="font-semibold text-stone-200">Mon - Sat</p>
                  <p className="text-[10px]">7:00 AM - 9:30 PM</p>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 text-orange-500 shrink-0" />
                <div>
                  <p className="font-semibold text-stone-200">Sunday</p>
                  <p className="text-[10px]">8:00 AM - 8:00 PM</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div>
            <h3 className="font-serif text-sm font-bold text-[#FFFDF9] tracking-wider uppercase mb-4">Bakehouse HQ</h3>
            <ul className="space-y-3 text-xs text-stone-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4.5 w-4.5 text-orange-500 shrink-0 mt-0.5" />
                <span>45 Avenue de la Gare, Sector 4, Bangalore, KA, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-orange-500 shrink-0" />
                <span>+91 79892-45079</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-orange-500 shrink-0" />
                <span>cheforders@letoilebakery.in</span>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM LEGAL SECTION */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-4.5 w-4.5 text-[#FFFDF9]" />
            <span>© 2026 Gayathri Bakery Shop. All Rights Reserved. Fully Certified Food Grade.</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="h-3.5 w-3.5 text-red-500 fill-current" />
            <span>fresh local cream & organic sugar</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

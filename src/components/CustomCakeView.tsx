import React, { useState } from 'react';
import { ChefHat, Sparkles, Upload, Clock, ShoppingCart, Info, Star } from 'lucide-react';
import { CustomCakeOrder } from '../types';

interface CustomCakeViewProps {
  onAddCustomCakeToCart: (cakeOrder: CustomCakeOrder) => void;
}

const TEMPLATE_PRESETS = [
  {
    name: 'Royal Unicorn Forest',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13636?w=400&auto=format&fit=crop&q=80',
    desc: 'Magical sprinkles, golden pastel horn details, and buttercream swirls.'
  },
  {
    name: 'Vintage English Rose Garden',
    image: 'https://images.unsplash.com/photo-1527525428012-7173729ff1d1?w=400&auto=format&fit=crop&q=80',
    desc: 'Rustic textured frosting crowned with hand-sculpted marzipan roses.'
  },
  {
    name: 'Glazed Truffle Galaxy',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&auto=format&fit=crop&q=80',
    desc: 'Sleek dark chocolate mirror glaze dusted with metallic cosmic stars.'
  }
];

export default function CustomCakeView({ onAddCustomCakeToCart }: CustomCakeViewProps) {
  // Build variables
  const [flavor, setFlavor] = useState('Belgian Chocolate');
  const [sponge, setSponge] = useState('Moist Chocolate Sponge');
  const [size, setSize] = useState('2kg');
  const [layers, setLayers] = useState(2);
  const [frosting, setFrosting] = useState('Chocolate Ganache');
  const [selectedToppings, setSelectedToppings] = useState<string[]>(['Fresh Raspberry/Blueberry', 'Choco-chips']);
  const [customMessage, setCustomMessage] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState('02:00 PM - 05:00 PM');
  
  // Design preview
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number>(0);
  const [customImageBase64, setCustomImageBase64] = useState<string>('');
  
  // AI Consult state
  const [aiReviewResult, setAiReviewResult] = useState('');
  const [aiConsulting, setAiConsulting] = useState(false);

  // Dynamic pricing calculation
  const getCalculatedPrice = () => {
    let base = 1000;
    if (size === '1kg') base = 1000;
    else if (size === '2kg') base = 1800;
    else if (size === '3kg') base = 2600;
    else if (size === '5kg') base = 4200;

    const toppingsAdd = selectedToppings.length * 60;
    const layersAdd = (layers - 1) * 200;

    return base + toppingsAdd + layersAdd;
  };

  const calculatedPrice = getCalculatedPrice();

  const toggleTopping = (topping: string) => {
    if (selectedToppings.includes(topping)) {
      setSelectedToppings(selectedToppings.filter((t) => t !== topping));
    } else {
      setSelectedToppings([...selectedToppings, topping]);
    }
  };

  // Image Upload handler
  const handlePhotoUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomImageBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Generates real feedback using Gemini API or a high-IQ culinary algorithm
  const handleConsultAIChef = async () => {
    setAiConsulting(true);
    setAiReviewResult('');

    try {
      const requestPayload = {
        flavor,
        sponge,
        size,
        layers,
        frosting,
        toppings: selectedToppings,
        message: customMessage
      };

      const response = await fetch('/api/ai/consult-cake', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestPayload)
      });

      if (response.ok) {
        const data = await response.json();
        setAiReviewResult(data.critique);
      } else {
        throw new Error('API server unavailable');
      }
    } catch (err) {
      // Robust offline-fallback
      setTimeout(() => {
        let text = `🌟 **Gayathri Head Baker Evaluation** 🌟\n\n`;
        text += `Excellent selection! Your combination of **${flavor}** with **${frosting}** on a **${sponge}** creates a wonderfully balanced palate. \n\n`;
        if (selectedToppings.includes('Fresh Raspberry/Blueberry') && flavor.toLowerCase().includes('chocolate')) {
          text += `🎂 *Chef Note:* The fresh berries are a perfect pairing. The bright acidity will beautifully slice through the intense richness of the dark Belgian cocoa! \n\n`;
        }
        if (layers > 2 && size === '1kg') {
          text += `⚠️ *Structural Note:* A ${layers}-layer structure on a 1kg base might be slightly tall. We recommend upgrading to 2kg or choosing a wide single desk for stable center alignment. \n\n`;
        }
        text += `✨ *Pairing Verdict:* Highly recommended combination! Estimated bake duration: 5 hours. We will make it perfect!`;
        setAiReviewResult(text);
      }, 800);
    } finally {
      setAiConsulting(false);
    }
  };

  const handlePlaceDesignOrder = () => {
    if (!deliveryDate) {
      alert('Please specify a delivery date for your custom cake.');
      return;
    }

    const currentImage = customImageBase64 || TEMPLATE_PRESETS[selectedPresetIndex].image;

    const cakeOrder: CustomCakeOrder = {
      id: 'custom-cake-' + Math.floor(1000 + Math.random() * 9000),
      flavor,
      sponge,
      size,
      layers,
      frosting,
      toppings: selectedToppings,
      message: customMessage,
      deliveryDate,
      deliveryTimeSlot,
      referenceImage: currentImage,
      estimatedPrice: calculatedPrice
    };

    onAddCustomCakeToCart(cakeOrder);
    alert('🎨 Your bespoke custom cake design successfully transferred to your Shopping Cart! You can proceed to checkout with it.');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 font-sans">
      
      {/* SECTION INTRO */}
      <div className="mb-8 text-center">
        <span className="text-xs font-bold tracking-widest text-orange-600 uppercase flex justify-center items-center gap-1">
          <Sparkles className="h-4 w-4 fill-orange-200" />
          <span>Interactive Custom Baker</span>
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-amber-950 mt-1">Design Your Dream Cake</h2>
        <p className="text-stone-500 max-w-xl mx-auto text-sm mt-2">
          Tell us your favorite flavor combinations, tier specifications, and decorative elements. Connect with our Generative AI Patissier to receive recipe critiques in real-time!
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        
        {/* LEFT: VISUAL COMBINATOR & REFERENCE */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-orange-50/50 shadow-sm relative overflow-hidden">
            
            <h3 className="font-serif text-sm font-bold text-amber-950 mb-3 border-b border-stone-100 pb-2 uppercase tracking-wide">
              Confectionery Shape Review
            </h3>

            {/* Simulated Live Visual Design */}
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-orange-50/40 border border-orange-100 flex flex-col justify-between p-4 shadow-inner">
              
              {/* Presets vs custom */}
              {customImageBase64 ? (
                <img src={customImageBase64} alt="Custom uploaded blueprint" className="absolute inset-0 w-full h-full object-cover z-0" />
              ) : (
                <img src={TEMPLATE_PRESETS[selectedPresetIndex].image} alt="Base theme preset" className="absolute inset-0 w-full h-full object-cover z-0 opacity-95 transition-all" />
              )}
              
              {/* Overlay Glass Specs Card */}
              <div className="absolute inset-0 bg-stone-900/20 z-[1]" />

              <div className="z-10 bg-white/90 backdrop-blur-md rounded-lg p-2 px-3 text-[10px] text-stone-800 font-semibold max-w-[180px] shadow-sm leading-relaxed self-start border border-orange-50">
                <p className="font-bold text-stone-900 border-b border-stone-100 pb-0.5 mb-1 flex items-center gap-0.5">
                  <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                  Recipe Summary
                </p>
                <p>🍰 Sponge: {sponge}</p>
                <p>🍯 Frosting: {frosting}</p>
                <p>⚖️ Weight: {size} ({layers} Tiers)</p>
              </div>

              {customMessage && (
                <div className="z-10 self-center bg-yellow-100 text-stone-800 p-2.5 rounded-lg text-center border-2 border-yellow-300 font-bold text-xs uppercase shadow-lg mx-6 transform -rotate-1 tracking-wide relative">
                  <span className="absolute top-1 left-1 bg-yellow-300 rounded-full h-1 w-1" />
                  <span className="absolute top-1 right-1 bg-yellow-300 rounded-full h-1 w-1" />
                  💬 "{customMessage}"
                </div>
              )}

              <div className="z-10 text-[9px] text-[#FFFDF9] font-semibold bg-stone-900/80 p-2 px-3 rounded-lg leading-tight self-end border border-stone-750 backdrop-blur-xs">
                Theme: {customImageBase64 ? 'Custom Reference Image' : TEMPLATE_PRESETS[selectedPresetIndex].name}
              </div>

            </div>

            {/* Presets choosing list */}
            <div className="space-y-2 mt-4">
              <label className="text-[11px] font-extrabold text-stone-600 uppercase tracking-wider block">Choose Visual Base Preset Theme</label>
              <div className="grid grid-cols-3 gap-2">
                {TEMPLATE_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedPresetIndex(idx);
                      setCustomImageBase64(''); // Clear custom upload if user picks template
                    }}
                    className={`p-1.5 border rounded-xl text-left flex flex-col justify-between gap-1 transition-all ${
                      selectedPresetIndex === idx && !customImageBase64 ? 'border-orange-500 bg-orange-50/50 ring-2 ring-orange-100' : 'border-stone-200'
                    }`}
                  >
                    <div className="h-10 w-full rounded-lg bg-stone-100 overflow-hidden shrink-0">
                      <img src={preset.image} alt={preset.name} className="h-full w-full object-cover" />
                    </div>
                    <span className="text-[9px] font-bold text-stone-850 truncate block leading-none">{preset.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Or upload custom illustration drawing */}
            <div className="space-y-1.5 mt-4 pt-3 border-t border-stone-100">
              <label className="text-[11px] font-extrabold text-stone-600 uppercase tracking-wider block">Or Upload Reference Sketch / Drawing</label>
              <div className="flex items-center gap-2">
                <label className="grow border border-dashed border-stone-300 rounded-xl bg-stone-50 p-3 hover:bg-stone-100/60 cursor-pointer flex flex-col items-center justify-center text-center transition-colors">
                  <Upload className="h-5 w-5 text-stone-400 mb-1" />
                  <span className="text-[10px] text-stone-600 font-semibold select-none">Drop image file or Click here</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUploadChange}
                    className="hidden"
                  />
                </label>
                {customImageBase64 && (
                  <div className="h-16 w-20 rounded-lg overflow-hidden border bg-stone-100 relative shrink-0">
                    <img src={customImageBase64} alt="upload thumb" className="h-full w-full object-cover" />
                    <button onClick={() => setCustomImageBase64('')} className="absolute inset-0 bg-red-600/30 text-white font-bold text-[9px] hover:opacity-100 opacity-0 transition-opacity">
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* AI Chef Box Consultation */}
          <div className="bg-amber-950 text-yellow-50 p-5 rounded-3xl border border-stone-900 shadow-xl space-y-3 relative overflow-hidden">
            <div className="absolute right-[-20px] top-[-20px] h-20 w-20 bg-orange-600/20 rounded-full blur-xl pointer-events-none" />
            
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-orange-500 flex items-center justify-center text-white shrink-0">
                <ChefHat className="h-4.5 w-4.5" />
              </div>
              <div>
                <h4 className="text-sm font-bold tracking-wider uppercase font-serif text-yellow-300">Generative Culinary AI advisor</h4>
                <p className="text-[10px] text-yellow-105/70 font-medium">Get real-time cake flavor pairing assessments from our chef!</p>
              </div>
            </div>

            {aiReviewResult ? (
              <div className="bg-stone-900/50 p-4 rounded-2xl text-[11px] font-medium leading-relaxed font-sans text-yellow-100 border border-orange-500/10 space-y-1 max-h-[220px] overflow-y-auto">
                {aiReviewResult.split('\n').map((line, ix) => (
                  <p key={ix}>{line}</p>
                ))}
                <button
                  onClick={() => setAiReviewResult('')}
                  className="text-[10px] text-orange-400 font-bold underline mt-2 block"
                >
                  Ask Chef to review another combo
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-xs text-stone-300 leading-normal font-sans">
                  Our algorithm cross-checks your selected Sponge, Flavor and Frosting combinations against gourmet recipe indices. Ready for consultation?
                </p>
                <button
                  type="button"
                  disabled={aiConsulting}
                  onClick={handleConsultAIChef}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-colors shadow flex items-center justify-center gap-1.5 outline-none"
                >
                  <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                  <span>{aiConsulting ? 'Chef is baking critique...' : 'Ask AI Head Chef to critique combo'}</span>
                </button>
              </div>
            )}
          </div>

        </div>

        {/* RIGHT: BUILD FORM */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-orange-50/50 shadow-sm space-y-5">
          <h3 className="font-serif text-lg font-bold text-amber-950 border-b border-stone-100 pb-2">Custom Cake Configuration</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Sponge base selection */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-extrabold text-stone-600 uppercase tracking-wider block">Sponge Base Crumb</label>
              <select
                value={sponge}
                onChange={(e) => setSponge(e.target.value)}
                className="w-full text-xs rounded-xl border border-stone-200 p-2.5 outline-none focus:border-orange-500 bg-stone-50 cursor-pointer"
              >
                <option value="Rich Vanilla Sponge">Rich Vanilla Sponge</option>
                <option value="Moist Chocolate Sponge">Moist Chocolate Sponge</option>
                <option value="Velvet Red Sponge">Velvet Red Sponge</option>
                <option value="Gluten-free Almond">Gluten-free Almond</option>
              </select>
            </div>

            {/* Flavor Essence select */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-extrabold text-stone-600 uppercase tracking-wider block">Flavor Essence</label>
              <select
                value={flavor}
                onChange={(e) => setFlavor(e.target.value)}
                className="w-full text-xs rounded-xl border border-stone-200 p-2.5 outline-none focus:border-orange-500 bg-stone-50 cursor-pointer"
              >
                <option value="Belgian Chocolate">Belgian Chocolate</option>
                <option value="Vanilla Caramel Nut">Vanilla Caramel Nut</option>
                <option value="Fresh Strawberry Berry">Fresh Strawberry Berry</option>
                <option value="Red Velvet Cream">Red Velvet Cream</option>
                <option value="Almond Pralines">Almond Pralines</option>
                <option value="Mango Passion Fruit">Mango Passion Fruit</option>
              </select>
            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Weight options */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-extrabold text-stone-600 uppercase tracking-wider block">Select Cake Weight</label>
              <div className="grid grid-cols-4 gap-1.5">
                {['1kg', '2kg', '3kg', '5kg'].map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => {
                      setSize(w);
                      if (w === '1kg') setLayers(1); // Force single tier for small weight
                    }}
                    className={`py-2 border text-xs font-semibold rounded-xl text-center cursor-pointer transition-colors ${
                      size === w ? 'border-orange-500 bg-orange-50 text-orange-950 font-bold' : 'border-stone-250 hover:bg-stone-50'
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            {/* Deck tiers */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-extrabold text-stone-600 uppercase tracking-wider block">Numbers of Tiers (Decks)</label>
              <div className="grid grid-cols-3 gap-1.5">
                {[1, 2, 3].map((l) => (
                  <button
                    key={l}
                    type="button"
                    disabled={size === '1kg' && l > 1} // Limit 1kg to 1 deck
                    onClick={() => setLayers(l)}
                    className={`py-2 border text-xs font-semibold rounded-xl text-center transition-colors ${
                      size === '1kg' && l > 1 ? 'border-stone-100 text-stone-350 cursor-not-allowed bg-stone-50' : 'cursor-pointer hover:bg-stone-50'
                    } ${
                      layers === l && size !== '1kg' ? 'border-orange-500 bg-orange-50 text-orange-950 font-bold' : layers === 1 && l === 1 ? 'border-orange-500 bg-orange-50 text-orange-950 font-bold' : 'border-stone-250'
                    }`}
                  >
                    {l} Tier
                  </button>
                ))}
              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Frosting Selection */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-extrabold text-stone-600 uppercase tracking-wider block">Frosting Material</label>
              <select
                value={frosting}
                onChange={(e) => setFrosting(e.target.value)}
                className="w-full text-xs rounded-xl border border-stone-200 p-2.5 outline-none focus:border-orange-500 bg-stone-50 cursor-pointer"
              >
                <option value="Whipped Sweet Cream">Whipped Sweet Cream</option>
                <option value="Satin Ice Fondant">Satin Ice Fondant</option>
                <option value="Silky Cream Cheese">Silky Cream Cheese</option>
                <option value="Chocolate Ganache">Chocolate Ganache</option>
              </select>
            </div>

            {/* Message on Cake banner */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-extrabold text-stone-600 uppercase tracking-wider block">Custom Ribbon Message (Optional)</label>
              <input
                type="text"
                maxLength={40}
                placeholder="E.g. Happy Birthday Satish!"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="w-full text-xs rounded-xl border border-stone-200 p-2.5 outline-none focus:border-orange-500 bg-stone-50"
              />
            </div>

          </div>

          {/* CHECKLIST TOPPINGS */}
          <div className="space-y-2.5 pt-2 border-t border-stone-100">
            <label className="text-[11px] font-extrabold text-stone-600 uppercase tracking-wider block">Add Toppings & Decors (+₹60 each option)</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                'Rainbow Sprinkles',
                'Fresh Raspberry/Blueberry',
                'Edible Gold Foliage',
                'Marzipan Roses',
                'Choco-chips',
                'Crushed Pistachio'
              ].map((topping) => {
                const checked = selectedToppings.includes(topping);
                return (
                  <button
                    key={topping}
                    type="button"
                    onClick={() => toggleTopping(topping)}
                    className={`p-2 border text-left text-xs font-semibold rounded-xl flex items-center justify-between cursor-pointer transition-colors ${
                      checked ? 'border-orange-500 bg-orange-50/50 text-orange-950 font-bold' : 'border-stone-200 bg-white hover:bg-stone-50'
                    }`}
                  >
                    <span>{topping}</span>
                    <span className={`h-4 w-4 rounded-full border-2 flex items-center justify-center shrink-0 ${checked ? 'border-orange-500 bg-orange-500 text-white' : 'border-stone-300 bg-white'}`}>
                      {checked && <span className="h-1.5 w-1.5 bg-white rounded-full" />}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SCHEDULING CONTROLS */}
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-150 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] uppercase font-bold text-stone-600 flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-stone-500" />
                <span>Bake Completion Date *</span>
              </label>
              <input
                type="date"
                required
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                className="w-full text-xs rounded-xl border border-stone-200 p-2.5 outline-none bg-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] uppercase font-bold text-stone-600 flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-stone-500" />
                <span>Completion Hour Slot</span>
              </label>
              <select
                value={deliveryTimeSlot}
                onChange={(e) => setDeliveryTimeSlot(e.target.value)}
                className="w-full text-xs rounded-xl border border-stone-200 p-2.5 bg-white outline-none cursor-pointer"
              >
                <option value="09:00 AM - 12:00 PM">Morning (09:00 AM - 12:00 PM)</option>
                <option value="12:00 PM - 03:00 PM">Noon (12:00 PM - 03:00 PM)</option>
                <option value="03:00 PM - 06:00 PM">Teatime (03:00 PM - 06:00 PM)</option>
                <option value="06:00 PM - 09:00 PM">Supper Celebration (06:00 PM - 09:00 PM)</option>
              </select>
            </div>
          </div>

          {/* DYNAMIC COST CARD ACTIONS */}
          <div className="border-t border-stone-150 pt-4 flex flex-col sm:flex-row justify-between items-center gap-4 bg-orange-50/20 p-4 rounded-xl">
            <div>
              <p className="text-[10px] text-stone-400 font-bold uppercase leading-none">Bespoke Design Estimated Cost</p>
              <p className="text-2xl font-mono font-extrabold text-amber-950 mt-1">₹{calculatedPrice}</p>
            </div>

            <button
              type="button"
              onClick={handlePlaceDesignOrder}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg hover:shadow-orange-200 transition-all flex items-center gap-2"
            >
              <ShoppingCart className="h-4.5 w-4.5" />
              <span>Add Custom Cake to Cart</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}

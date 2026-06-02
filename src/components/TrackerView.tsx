import React, { useState, useEffect } from 'react';
import { Search, MapPin, Truck, ShieldCheck, CheckCircle, PackageCheck, CookingPot, Loader } from 'lucide-react';
import { Order } from '../types';

interface TrackerViewProps {
  orders: Order[];
  activeTrackingId: string;
}

export default function TrackerView({ orders, activeTrackingId }: TrackerViewProps) {
  const [searchId, setSearchId] = useState(activeTrackingId || '');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (activeTrackingId) {
      setSearchId(activeTrackingId);
      const found = orders.find((o) => o.id === activeTrackingId);
      if (found) setSelectedOrder(found);
    } else if (orders.length > 0 && !selectedOrder) {
      // Auto-select latest order for demo tracking convenience!
      setSelectedOrder(orders[orders.length - 1]);
      setSearchId(orders[orders.length - 1].id);
    }
  }, [activeTrackingId, orders]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = orders.find((o) => o.id.trim().toUpperCase() === searchId.trim().toUpperCase());
    if (found) {
      setSelectedOrder(found);
    } else {
      alert('Order ID not found. Ensure the spelling is correct, or log in to view Order History.');
    }
  };

  const getStatusStepIndex = (status: Order['status']) => {
    const sequence: Order['status'][] = ['Pending', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered'];
    return sequence.indexOf(status);
  };

  const currentStep = selectedOrder ? getStatusStepIndex(selectedOrder.status) : 0;

  const stepper = [
    { label: 'Pending', desc: 'Awaiting baker acceptance', icon: Loader },
    { label: 'Confirmed', desc: 'Order verified by shop', icon: ShieldCheck },
    { label: 'Preparing', desc: 'Master chef baking items', icon: CookingPot },
    { label: 'Out for Delivery', desc: 'Warm box on route', icon: Truck },
    { label: 'Delivered', desc: 'Arrived at destination', icon: CheckCircle }
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 font-sans">
      
      {/* SECTION HEADER */}
      <div className="mb-8 text-center">
        <span className="text-xs font-bold tracking-widest text-orange-600 uppercase">Interactive Satellite Sync</span>
        <h2 className="font-serif text-3xl font-extrabold text-amber-950 mt-1">Real-Time Dispatch Tracker</h2>
        <p className="text-stone-500 max-w-md mx-auto text-sm mt-2">
          Monitor your freshly baked orders as they move from our wood-fired brick oven to your family room table.
        </p>
      </div>

      {/* SEARCH CARD BAR */}
      <div className="bg-white p-5 rounded-2xl border border-orange-50/55 shadow-sm mb-6">
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative grow">
            <input
              type="text"
              placeholder="Paste Order Reference ID (e.g. ORDER-7345)"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="w-full text-xs rounded-xl border border-stone-200 pl-8.5 pr-4 py-3 outline-none focus:border-orange-500 uppercase font-bold"
            />
            <Search className="absolute left-3 top-3.5 h-4 w-4 text-stone-450" />
          </div>
          <button
            type="submit"
            className="bg-amber-955 hover:bg-stone-850 text-[#FFFDF9] text-xs font-bold px-6 py-3 rounded-xl transition-colors"
          >
            Locate Shipment
          </button>
        </form>
        {orders.length > 0 && !selectedOrder && (
          <div className="mt-3.5 text-xs text-stone-500">
            <p className="font-semibold">Recent order keys to test track:</p>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {orders.slice(-4).map((o) => (
                <button
                  key={o.id}
                  onClick={() => {
                    setSelectedOrder(o);
                    setSearchId(o.id);
                  }}
                  className="bg-stone-50 hover:bg-stone-100 py-1 px-2.5 rounded-lg border font-mono font-bold text-amber-950"
                >
                  {o.id}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {selectedOrder ? (
        <div className="space-y-6">
          
          {/* TRACKING PATH GRID STEPPER */}
          <div className="bg-white p-6 rounded-2xl border border-orange-50/50 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-stone-100 pb-4 gap-2">
              <div>
                <p className="text-[10px] text-stone-400 font-bold uppercase">Shipment reference key</p>
                <p className="text-sm font-bold font-mono text-amber-950">{selectedOrder.id}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-stone-400 font-bold uppercase">Estimated Dispatch slot</p>
                <p className="text-xs font-bold text-orange-650">{selectedOrder.deliveryTimeSlot}</p>
              </div>
            </div>

            {/* Steps line */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
              {stepper.map((step, idx) => {
                const StepIcon = step.icon;
                const isCompleted = idx <= currentStep;
                const isActive = idx === currentStep;

                return (
                  <div key={idx} className="flex md:flex-col items-center gap-3 md:text-center md:relative">
                    
                    {/* Visual node */}
                    <div className="relative z-10 shrink-0">
                      <div
                        className={`h-11 w-11 rounded-full flex items-center justify-center border-2 transition-colors ${
                          isCompleted
                            ? 'border-orange-500 bg-orange-500 text-white shadow-md shadow-orange-100'
                            : 'border-stone-200 bg-[#FFFDF9] text-stone-350'
                        }`}
                      >
                        <StepIcon className={`h-5 w-5 ${isActive ? 'animate-none' : ''}`} />
                      </div>
                      {idx < 4 && (
                        <div
                          className={`hidden md:block absolute top-5.5 left-11.5 h-0.5 w-[calc(100vw/5-60px)] max-w-[124px] z-[-1] ${
                            idx < currentStep ? 'bg-orange-500' : 'bg-stone-200'
                          }`}
                        />
                      )}
                    </div>

                    {/* Step descriptions */}
                    <div>
                      <p className={`text-xs font-extrabold ${isCompleted ? 'text-stone-850' : 'text-stone-400'}`}>
                        {step.label}
                      </p>
                      <p className="text-[10px] text-stone-400 leading-tight mt-0.5 max-w-[120px] md:mx-auto">
                        {step.desc}
                      </p>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* DELIVERY SHIPMENT DETAILS */}
            <div className="bg-white p-6 rounded-2xl border border-orange-50/50 shadow-sm space-y-4">
              <h4 className="font-serif text-sm font-bold text-amber-900 border-b border-stone-105 pb-2 uppercase tracking-wide">
                Destination Log
              </h4>

              <div className="space-y-3.5 text-xs text-stone-650">
                <div>
                  <p className="text-[10px] text-stone-400 uppercase font-bold leading-none">Recipient Name</p>
                  <p className="text-stone-800 font-bold mt-0.5">{selectedOrder.customerName}</p>
                </div>
                
                <div>
                  <p className="text-[10px] text-stone-400 uppercase font-bold leading-none">Shipping Address</p>
                  <p className="text-stone-800 font-semibold mt-0.5 leading-relaxed">{selectedOrder.deliveryAddress}</p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-[10px] text-stone-400 uppercase font-bold leading-none">Landmark</p>
                    <p className="text-stone-805 font-medium mt-0.5">{selectedOrder.landmark || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-stone-400 uppercase font-bold leading-none">Pincode</p>
                    <p className="text-stone-805 font-mono mt-0.5">{selectedOrder.pincode}</p>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] text-stone-400 uppercase font-bold leading-none">Bags Summary</p>
                  <div className="space-y-1 mt-1.5 bg-stone-50 p-2.5 rounded-lg border border-stone-150">
                    {selectedOrder.items.map((it) => (
                      <p key={it.productId} className="text-[10px] text-stone-750 font-semibold">
                        • {it.name} <span className="text-orange-650">({it.selectedWeight})</span> x {it.quantity}
                      </p>
                    ))}
                    {selectedOrder.customCake && (
                      <p className="text-[10px] text-[#704214] font-bold">
                        🎨 Bespoke Custom Layer Cake Design (x1)
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* LIVE GPS POSITION BLUEPRINT MAPPING */}
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 flex flex-col justify-between h-full relative overflow-hidden">
              <div className="absolute inset-0 bg-radial bg-[size:16px_16px] pointer-events-none opacity-40" />

              <div className="flex justify-between items-center z-10">
                <span className="text-[10px] font-extrabold text-orange-650 tracking-widest uppercase flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-orange-500 animate-ping" />
                  <span>GPS SIMULATED TRACK</span>
                </span>
                <span className="text-[9px] bg-white border border-stone-200 p-1 px-2 rounded font-mono font-bold text-stone-700">
                  LAT: 12.9716 / LNG: 77.5946
                </span>
              </div>

              {/* Graphical Blueprint Map Simulation */}
              <div className="h-56 w-full border border-stone-300 rounded-xl relative overflow-hidden mt-3 z-10 bg-[#FAF3E0] shadow-inner flex items-center justify-center">
                
                {/* Roads lines */}
                <div className="absolute h-0.5 w-full bg-white top-1/2 left-0" />
                <div className="absolute w-0.5 h-full bg-white left-1/3 top-0" />
                <div className="absolute h-0.5 w-full bg-white top-1/4 transform -rotate-6 left-0" />

                {/* Baked Headquarters Pin */}
                <div className="absolute top-[20%] left-[30%] text-center">
                  <div className="h-6 w-6 rounded-full bg-amber-955 flex items-center justify-center text-white border-2 border-[#FAF3E0] shadow">
                    🍳
                  </div>
                  <span className="text-[8px] font-bold text-stone-600 uppercase tracking-tight block mt-0.5">Bakehouse</span>
                </div>

                {/* Delivery Boy Icon */}
                <div className={`absolute transition-all duration-3000 ${
                  currentStep <= 1 
                    ? 'top-[22%] left-[32%]' 
                    : currentStep === 2 
                    ? 'top-[40%] left-[45%]' 
                    : currentStep === 3 
                    ? 'top-[50%] left-[65%]' 
                    : 'top-[45%] left-[80%]'
                } text-center`}>
                  <div className="h-8 w-8 rounded-full bg-orange-500 border-2 border-white flex items-center justify-center text-white shadow-lg shadow-orange-200 animate-bounce">
                    <Truck className="h-4 w-4" />
                  </div>
                  <span className="text-[8px] font-extrabold text-orange-950 uppercase block mt-0.5 bg-white/80 p-0.5 rounded leading-none border border-orange-200">Carrier</span>
                </div>

                {/* Recipient Target Pin */}
                <div className="absolute top-[50%] left-[82%] text-center">
                  <div className="h-6 w-6 rounded-full bg-red-650 flex items-center justify-center text-white border-2 border-[#FAF3E0] shadow">
                    🏠
                  </div>
                  <span className="text-[8px] font-bold text-stone-600 uppercase tracking-tight block mt-0.5">Sweet Home</span>
                </div>

              </div>

              <div className="mt-3 text-[10px] text-stone-500 leading-tight z-10 bg-white/70 backdrop-blur-xs p-2.5 rounded-lg border border-stone-200 mt-2">
                <p className="font-semibold text-stone-800">Status Update:</p>
                {currentStep === 4 ? (
                  <p className="text-[#2a682a] font-bold mt-0.5">Your delicious order has reached! Bon Appétit! ❤️</p>
                ) : currentStep === 3 ? (
                  <p className="text-orange-950 font-bold mt-0.5">The shipping vehicle is negotiating Sector 4 traffic. ETA: ~12 mins.</p>
                ) : (
                  <p className="text-stone-650 mt-0.5">Bakehouse staff is processing ingredients in high-hygiene chamber.</p>
                )}
              </div>

            </div>

          </div>

        </div>
      ) : (
        <div className="text-center py-20 bg-stone-50 rounded-2xl border border-stone-100">
          <PackageCheck className="h-10 w-10 text-stone-300 mx-auto mb-3 animate-none" />
          <p className="text-stone-850 font-bold text-sm">Awaiting order locate...</p>
          <p className="text-stone-500 text-xs mt-1">Please enter an order ID above or submit a fresh order to track live.</p>
        </div>
      )}

    </div>
  );
}

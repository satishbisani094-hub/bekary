import React, { useState } from 'react';
import { CalendarRange, ShieldAlert, Sparkles, Check, Clock, CalendarCheck2 } from 'lucide-react';
import { Subscription } from '../types';

interface SubscriptionViewProps {
  activeSubscriptions: Subscription[];
  onAddSubscription: (planName: Subscription['planName'], price: number, itemsDescription: string, deliveryTimeSlot: string, frequency: Subscription['frequency']) => void;
  onUpdateSubscriptionStatus: (subId: string, status: Subscription['status']) => void;
}

const PLANS = [
  {
    name: 'Daily Bread',
    price: 999,
    frequency: 'daily',
    desc: 'Never run out of crisp mornings! Fresh sourdough boule, whole-wheat multi-seed loaf, or brioche table buns delivered directly to your doorstep by 7:30 AM.',
    bullets: [
      'Delivered daily before 7:30 AM',
      'Rotated bread items so you never get bored',
      'Pause deliveries anytime you travel',
      '100% freshly baked at 4 AM'
    ]
  },
  {
    name: 'Weekly Cake Box',
    price: 1499,
    frequency: 'weekly',
    desc: 'Lighten up your weekend brunches! A curated pastry package of 2 French butter croissants, 2 chocolate brioches, and 2 danish muffins every Saturday.',
    bullets: [
      'Delivered weekly on Saturday morning',
      'Handcrafted flaky laminated pastry',
      'Rotated baker special additions',
      'Includes complimentary herbal tea bags'
    ]
  },
  {
    name: 'Monthly Celebration',
    price: 2199,
    frequency: 'monthly',
    desc: 'Perfect for homes that love celebrations! One exquisite, custom-flavored 1.0kg chocolate or strawberry fresh cream cake of your choosing every month.',
    bullets: [
      'Choose delivery date every month',
      'Select any flavor (Chocolate, Red velvet etc)',
      'Free customized writing ribbon',
      'Saves over 30% compared to a-la-carte menu'
    ]
  }
] as const;

export default function SubscriptionView({
  activeSubscriptions,
  onAddSubscription,
  onUpdateSubscriptionStatus
}: SubscriptionViewProps) {
  const [selectedPlanIdx, setSelectedPlanIdx] = useState<number>(0);
  const [timeSlot, setTimeSlot] = useState('07:00 AM - 08:30 AM');
  const [address, setAddress] = useState('');
  const [subscribedMessage, setSubscribedMessage] = useState('');

  const handleSubscribeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const plan = PLANS[selectedPlanIdx];

    onAddSubscription(
      plan.name,
      plan.price,
      plan.desc,
      timeSlot,
      plan.frequency
    );

    setSubscribedMessage(`🎉 Golden Club Active! Your subscription to "${plan.name}" starts tomorrow morning. Manage it below!`);
    setAddress('');
    setTimeout(() => {
      setSubscribedMessage('');
    }, 5000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 font-sans">
      
      {/* HEADER SECTION LOGO */}
      <div className="mb-8 text-center animate-none">
        <span className="text-xs font-bold tracking-widest text-[#FF9F29] uppercase flex justify-center items-center gap-1">
          <CalendarRange className="h-4 w-4" />
          <span>Membership Bakery Packages</span>
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-amber-950 mt-1">Gayathri Membership Club</h2>
        <p className="text-stone-500 max-w-lg mx-auto text-sm mt-2">
          Subscribe for fresh table bread, pastries, and anniversary cakes delivered directly on schedule. No delivery fees, maximum priority baking.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
        
        {/* PLANS GRID */}
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANS.map((plan, idx) => (
              <div
                key={plan.name}
                onClick={() => setSelectedPlanIdx(idx)}
                className={`flex flex-col justify-between bg-white rounded-2xl border p-5 cursor-pointer relative transition-all ${
                  selectedPlanIdx === idx ? 'border-orange-500 bg-orange-50/10 ring-2 ring-orange-100 shadow-md' : 'border-stone-200 shadow-xs'
                }`}
              >
                {idx === 1 && (
                  <span className="absolute top-[-10px] right-4 bg-orange-500 text-white font-extrabold uppercase text-[9px] px-2 py-0.5 rounded-full shadow-sm">
                    Most Loved
                  </span>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="font-serif text-base font-extrabold text-amber-950">{plan.name} Plan</h3>
                    <p className="text-2xl font-mono font-extrabold text-[#704214] mt-1">
                      ₹{plan.price}
                      <span className="text-xs font-sans text-stone-550 font-normal"> / month</span>
                    </p>
                  </div>

                  <p className="text-stone-605 text-xs leading-relaxed font-semibold">
                    {plan.desc}
                  </p>

                  <ul className="space-y-1.5 text-xs text-stone-705">
                    {plan.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-1.5 font-normal">
                        <Check className="h-4 w-4 text-[#3E7D3E] shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  className={`w-full font-bold text-xs py-2 px-3 rounded-xl transition-all border mt-6 ${
                    selectedPlanIdx === idx
                      ? 'bg-orange-500 text-white border-orange-500'
                      : 'bg-stone-50 border-stone-250 text-stone-750'
                  }`}
                >
                  {selectedPlanIdx === idx ? 'Plan Selected' : 'Select Plan'}
                </button>

              </div>
            ))}
          </div>

          {/* ACTIVE MEMBERSHIPS */}
          <div className="bg-white p-5 rounded-2xl border border-orange-50/50 shadow-sm space-y-4">
            <h3 className="font-serif text-base font-bold text-amber-950 border-b border-stone-100 pb-2 flex items-center gap-2">
              <CalendarCheck2 className="h-5 w-5 text-[#3E7D3E]" />
              <span>Your Active Memberships ({activeSubscriptions.length})</span>
            </h3>

            {activeSubscriptions.length === 0 ? (
              <p className="text-xs text-stone-400 italic">No active subscriptions on file. Subscribe above to get started!</p>
            ) : (
              <div className="space-y-3.5">
                {activeSubscriptions.map((sub) => (
                  <div
                    key={sub.id}
                    className="flex flex-col sm:flex-row justify-between sm:items-center p-4 bg-stone-50 rounded-xl border border-stone-150 gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-amber-950 font-serif">{sub.planName} Club</span>
                        <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full ${sub.status === 'Active' ? 'bg-[#D2EBD2] text-[#225c22]' : 'bg-stone-200 text-stone-650'}`}>
                          {sub.status}
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 mt-1">Delivery Time Preference: <span className="font-bold text-orange-650">{sub.deliveryTimeSlot}</span></p>
                      <p className="text-[10px] text-stone-400 mt-0.5">Started: {sub.startDate}</p>
                    </div>

                    <div className="flex gap-2">
                      {sub.status === 'Active' ? (
                        <button
                          onClick={() => onUpdateSubscriptionStatus(sub.id, 'Paused')}
                          className="bg-stone-200 text-stone-700 hover:bg-stone-250 text-xs font-semibold py-1.5 px-3 rounded-lg border border-stone-300"
                        >
                          Pause Delivery
                        </button>
                      ) : (
                        <button
                          onClick={() => onUpdateSubscriptionStatus(sub.id, 'Active')}
                          className="bg-[#3E7D3E] hover:bg-[#326432] text-white text-xs font-semibold py-1.5 px-3 rounded-lg shadow-sm"
                        >
                          Resume Delivery
                        </button>
                      )}
                      
                      <button
                        onClick={() => onUpdateSubscriptionStatus(sub.id, 'Cancelled')}
                        className="text-red-600 hover:bg-red-50 text-xs font-semibold py-1.5 px-3 rounded-lg border border-red-100"
                      >
                        Cancel
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* RIGHT: REGISTRATION SUMMARY */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-orange-50/50 shadow-sm space-y-4">
          <h3 className="font-serif text-sm font-bold text-amber-950 border-b border-stone-100 pb-2 flex items-center gap-1">
            <Clock className="h-4.5 w-4.5 text-orange-500" />
            <span>Delivery Schedule Setup</span>
          </h3>

          <form onSubmit={handleSubscribeSubmit} className="space-y-4">
            
            <div className="space-y-1 bg-stone-50 p-3 rounded-xl border">
              <span className="text-[9px] uppercase font-bold text-stone-405 block">Selected Club</span>
              <p className="text-xs font-bold text-amber-955">{PLANS[selectedPlanIdx].name}</p>
              <p className="text-sm font-mono font-extrabold text-[#704214] mt-0.5">₹{PLANS[selectedPlanIdx].price}/month</p>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-stone-500 block">Morning Delivery Slot *</label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full text-xs rounded-xl border border-stone-200 p-2.5 outline-none focus:border-orange-500 bg-white cursor-pointer"
              >
                <option value="06:00 AM - 07:30 AM">Early Bird (6:00 AM - 7:30 AM)</option>
                <option value="07:30 AM - 09:00 AM">Breakfast Standard (7:30 AM - 9:00 AM)</option>
                <option value="09:00 AM - 10:30 AM">Late Risers (9:00 AM - 10:30 AM)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-stone-500 block">Delivery Address *</label>
              <textarea
                required
                rows={2}
                placeholder="Where should we drop the fresh bread daily?"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full text-xs rounded-xl border border-stone-200 p-2.5 outline-none focus:border-orange-500 bg-white"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#5C3D2E] hover:bg-stone-800 text-[#FFFDF9] font-bold py-3 px-4 rounded-xl shadow-lg transition-all text-xs flex items-center justify-center gap-1"
            >
              <Sparkles className="h-4.5 w-4.5 text-yellow-300" />
              <span>Confirm Bakery Club Membership</span>
            </button>

          </form>

          {subscribedMessage && (
            <div className="bg-[#D2EBD2] text-[#225c22] p-4 rounded-xl text-xs font-bold leading-normal border border-[#b4dfb4]">
              {subscribedMessage}
            </div>
          )}

          <div className="flex items-center gap-2 p-3 bg-stone-50 rounded-xl border border-stone-150">
            <ShieldAlert className="h-4 w-4 text-orange-500 shrink-0" />
            <p className="text-[10px] text-stone-500 leading-tight">
              Subscriptions auto-renew every 30 days. Pause deliveries dynamically anytime. No exit fees.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

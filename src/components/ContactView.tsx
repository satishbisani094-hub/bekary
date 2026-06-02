import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, ShieldCheck, Heart } from 'lucide-react';

export default function ContactView() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 4000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 font-sans">
      
      {/* HEADER SECTION */}
      <div className="mb-8 text-center animate-none">
        <span className="text-xs font-bold tracking-widest text-orange-600 uppercase">Say Hello</span>
        <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-amber-950 mt-1">Visit Our Bakehouse HQ</h2>
        <p className="text-stone-500 max-w-lg mx-auto text-sm mt-2">
          Drop by to smell the hot butter croissants, book custom celebration catering, or submit queries about wholesale partnerships. We love feedback!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        
        {/* CONTACT INFORMATION & HOURS */}
        <div className="space-y-6 flex flex-col justify-between">
          <div className="bg-white p-6 rounded-2xl border border-orange-50/50 shadow-sm space-y-5">
            <h3 className="font-serif text-lg font-bold text-amber-950 border-b border-stone-100 pb-2 uppercase tracking-wide">
              Direct Channels
            </h3>

            <div className="space-y-4">
              <a
                href="https://wa.me/917989245079"
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-stone-50 border border-transparent hover:border-orange-100 transition-all group"
              >
                <div className="h-9 w-9 rounded-lg bg-green-100 text-green-700 flex items-center justify-center shrink-0">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-800 leading-none">Instant WhatsApp Inquiry</p>
                  <p className="text-xs text-stone-500 mt-1 font-semibold group-hover:text-green-600 transition-colors">+91 79892-45079</p>
                  <p className="text-[10px] text-stone-400 mt-0.5">Click to chat live with our catering desk</p>
                </div>
              </a>

              <div className="flex items-start gap-3 p-3">
                <div className="h-9 w-9 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center shrink-0">
                  <Phone className="h-4.5 w-4.5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-800 leading-none">Bakery Hotline</p>
                  <p className="text-xs text-stone-600 mt-1 font-mono font-bold">+91 79892-45079</p>
                  <p className="text-[10px] text-stone-400 mt-0.5">Available during standard baking hours</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3">
                <div className="h-9 w-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <Mail className="h-4.5 w-4.5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-800 leading-none">Corporate Support Email</p>
                  <p className="text-xs text-stone-600 mt-1 font-mono font-bold">cheforders@letoilebakery.in</p>
                  <p className="text-[10px] text-stone-400 mt-0.5">We reply within 3 hours during day cycles</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3">
                <div className="h-9 w-9 rounded-lg bg-red-105 text-red-700 flex items-center justify-center shrink-0">
                  <MapPin className="h-4.5 w-4.5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-800 leading-none">Main Flagship Bakehouse Shop</p>
                  <p className="text-xs text-stone-600 mt-1">Bangalore, KA, India</p>
                  <p className="text-[10px] text-stone-400 mt-0.5">Free valet car parking available on premises</p>
                </div>
              </div>
            </div>

          </div>

          {/* HOURS OF OPERATIONS */}
          <div className="bg-[#FFFDF9] p-6 rounded-2xl border border-orange-100/70 shadow-sm relative overflow-hidden">
            <h3 className="font-serif text-sm font-bold text-amber-950 pb-2 border-b border-orange-100 uppercase tracking-widest flex items-center gap-2">
              <Clock className="h-4.5 w-4.5 text-orange-600" />
              <span>Oven Bake Timings</span>
            </h3>

            <div className="grid grid-cols-2 gap-4 mt-4 text-xs font-medium text-stone-650">
              <div className="space-y-1">
                <p className="font-bold text-stone-800">Monday - Saturday</p>
                <p className="text-xs text-orange-650 font-bold">07:00 AM - 09:30 PM</p>
                <p className="text-[10px] text-stone-400 leading-normal">First batch of freshly baked croissants emerges ready at 7:00 AM sharp.</p>
              </div>

              <div className="space-y-1">
                <p className="font-bold text-stone-800">Sunday Gala</p>
                <p className="text-xs text-orange-655 font-bold">08:00 AM - 08:00 PM</p>
                <p className="text-[10px] text-stone-400 leading-normal">Our Sunday special hazelnut macaron collections roll out by 9 AM.</p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-1 text-[10px] font-semibold text-[#704214]">
              <Heart className="h-4 w-4 text-orange-500 fill-orange-500 shrink-0" />
              <span>We remain closed on Major National Festivals only.</span>
            </div>
          </div>

        </div>

        {/* WRITE QUERY & SIMULATED MAP */}
        <div className="flex flex-col gap-6 justify-between">
          
          {/* Write form query */}
          <div className="bg-white p-6 rounded-2xl border border-orange-50/50 shadow-sm">
            <h4 className="font-serif text-sm font-bold text-amber-955 border-b border-stone-100 pb-2 uppercase tracking-wide">
              Leave a Private Note
            </h4>

            {submitted ? (
              <div className="bg-[#D2EBD2] text-[#225c22] p-6 rounded-xl text-center border font-bold text-xs leading-normal my-6">
                <p>📬 Note Submitted Successfully!</p>
                <p className="font-medium text-[10px] text-[#347c34] mt-1">Thank you. Gayathri catering team will reply back on your email soon.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-3 mt-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-stone-550">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Gemma Smith"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full text-xs rounded-xl border border-stone-200 p-2.5 outline-none focus:border-orange-500 bg-stone-50/50"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-stone-550">Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="gemma@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full text-xs rounded-xl border border-stone-200 p-2.5 outline-none focus:border-orange-500 bg-stone-50/50"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-stone-550">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    placeholder="+91 91234 56789"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full text-xs rounded-xl border border-stone-200 p-2.5 outline-none focus:border-orange-500 bg-stone-50/50"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-stone-550">Write Message *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Ask about corporate catering, bulk discount pricing, custom cake flavors..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full text-xs rounded-xl border border-stone-200 p-2.5 outline-none focus:border-orange-500 bg-stone-50/50"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#5C3D2E] hover:bg-stone-850 text-[#FFFDF9] font-bold text-xs py-3 rounded-xl transition-colors shadow-lg"
                >
                  Send Enquiry Letter
                </button>

              </form>
            )}
          </div>

          {/* SIMULATED MAP */}
          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 flex-1 relative overflow-hidden flex flex-col justify-between h-48 sm:h-auto">
            <div className="absolute inset-0 bg-radial bg-[size:12px_12px] opacity-35" />
            <div className="flex justify-between items-center text-[10px] z-10 font-bold text-stone-500 uppercase tracking-widest">
              <span>Flagship Location Map (Sector 4)</span>
              <span>2.1km from City Center</span>
            </div>

            {/* Custom stylized map canvas */}
            <div className="w-full h-32 border border-stone-300 rounded-xl relative overflow-hidden mt-3 z-10 bg-[#E6F4EA] flex items-center justify-center">
              
              {/* Greenery / block parks drawings */}
              <div className="absolute h-10 w-24 bg-[#DCEFE0] top-5 left-8 border border-white rounded-md" />
              <div className="absolute h-14 w-16 bg-[#DCEFE0] bottom-4 right-10 border border-white rounded-md" />
              
              {/* Roads cross */}
              <div className="absolute h-0.5 w-full bg-white top-1/2 left-0" />
              <div className="absolute w-0.5 h-full bg-white left-1/2 top-0" />

              {/* Gayathri Bakery Flag */}
              <div className="absolute top-[35%] left-[45%] text-center transform scale-110">
                <span className="absolute h-2 w-2 bg-orange-500 rounded-full animate-ping left-[14px]" />
                <div className="h-8 w-8 rounded-full bg-orange-500 border border-white flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-orange-250 animate-bounce">
                  🥐
                </div>
                <span className="text-[7.5px] font-extrabold uppercase bg-white px-1.5 py-0.5 rounded leading-none shadow mt-0.5 inline-block text-stone-850 border border-orange-100">Gayathri</span>
              </div>

              {/* Adjacent structures */}
              <div className="absolute top-[20%] left-[8%] bg-white p-1 text-[7px] text-stone-400 font-semibold rounded leading-none border">Metro Station</div>
              <div className="absolute bottom-[20%] right-[4%] bg-white p-1 text-[7px] text-stone-400 font-semibold rounded leading-none border">Central Mall</div>

            </div>

            <p className="text-[9.5px] text-stone-450 z-10 leading-snug mt-2 text-center bg-white/75 border border-stone-200 rounded p-1.5 font-medium">
              Open 7 days interactive. Google Address search keyword: <strong className="text-stone-700">"LEtoile Artisanal Boulangerie, Sector 4"</strong>
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

import React, { useState } from 'react';
import { X, User, LogIn, Lock, Mail, Phone, MapPin, Sparkles, Receipt } from 'lucide-react';
import { User as UserType, Order } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserType | null;
  onLogin: (user: UserType) => void;
  onLogout: () => void;
  orders: Order[];
  onTrackOrder: (orderId: string) => void;
}

export default function AuthModal({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout,
  orders,
  onTrackOrder
}: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'signin' | 'register' | 'forgot'>('signin');
  
  // Registration form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regAddress, setRegAddress] = useState('');
  const [regPincode, setRegPincode] = useState('');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Forgot password
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  if (!isOpen) return null;

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) return;

    // Simulate login
    const targetUser: UserType = {
      id: 'usr-' + Math.floor(100 + Math.random() * 900),
      name: loginEmail.split('@')[0],
      email: loginEmail,
      phone: regPhone || '+91 91234 56789',
      address: regAddress || '45 Baker Drive, Sector 2, Bangalore',
      pincode: regPincode || '560001',
      role: loginEmail === 'owner@letoile.com' || loginEmail === 'admin' ? 'admin' : 'customer'
    };

    onLogin(targetUser);
    onClose();
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPassword) return;

    // Simulate user creation
    const targetUser: UserType = {
      id: 'usr-' + Math.floor(100 + Math.random() * 900),
      name: regName,
      email: regEmail,
      phone: regPhone,
      address: regAddress,
      pincode: regPincode,
      role: 'customer'
    };

    onLogin(targetUser);
    alert(`🎉 Account successfully created for ${regName}! Welcoming you with a 10% first-order discount voucher: 'WELCOME10'.`);
    onClose();
  };

  const handleGoogleLogin = () => {
    // Simulate single-tap Google pop-up integration
    const targetUser: UserType = {
      id: 'usr-g' + Math.floor(100 + Math.random() * 900),
      name: 'Satish Bysani',
      email: 'satishbysani83@gmail.com',
      phone: '+91 99999-88888',
      role: 'customer'
    };
    onLogin(targetUser);
    onClose();
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setForgotSent(true);
    setTimeout(() => {
      setForgotSent(false);
      setActiveTab('signin');
      setForgotEmail('');
    }, 4500);
  };

  // Filter user orders
  const customerOrders = orders.filter((o) => o.email.toLowerCase() === currentUser?.email.toLowerCase());

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-xl max-h-[85vh] overflow-y-auto shadow-2xl border border-orange-50 relative">
        
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 text-stone-700 hover:bg-stone-200 transition-colors z-10"
        >
          <X className="h-5 w-5" />
        </button>

        {currentUser ? (
          /* USER PROFILE & COMPREHENSIVE ORDER HISTORY */
          <div className="p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-4 bg-orange-50/50 p-5 rounded-2xl border border-orange-100">
              <div className="h-14 w-14 rounded-full bg-orange-500 border-2 border-white text-[#FFFDF9] font-serif text-2xl font-bold flex items-center justify-center shadow-md">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-amber-955">{currentUser.name}</h3>
                <p className="text-xs text-stone-500">{currentUser.email}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-[10px] bg-amber-950 text-white font-bold uppercase rounded-md px-2 py-0.5 leading-none">
                    {currentUser.role === 'admin' ? 'SYSTEM OWNER' : 'GOLDEN MEMBER'}
                  </span>
                </div>
              </div>
            </div>

            {/* Profile Info fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-stone-600 bg-stone-50 p-4 rounded-xl border">
              <div>
                <p className="text-[10px] text-stone-400 font-bold uppercase block leading-none">Primary Mobile</p>
                <p className="text-stone-800 mt-1">{currentUser.phone || 'No phone recorded'}</p>
              </div>
              <div>
                <p className="text-[10px] text-stone-400 font-bold uppercase block leading-none">Shipping Zip code</p>
                <p className="text-stone-800 font-mono mt-1">{currentUser.pincode || 'No pincode'}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-[10px] text-stone-400 font-bold uppercase block leading-none font-medium">Saved Location</p>
                <p className="text-stone-800 font-normal mt-1 leading-normal">{currentUser.address || 'Click Checkout to enter default delivery instructions.'}</p>
              </div>
            </div>

            {/* Past orders History logs */}
            <div className="space-y-3.5">
              <h4 className="font-serif text-sm font-bold text-amber-950 flex items-center gap-1.5 border-b border-stone-100 pb-2">
                <Receipt className="h-4.5 w-4.5 text-orange-500" />
                <span>Historic Orders ({customerOrders.length})</span>
              </h4>

              {customerOrders.length === 0 ? (
                <div className="text-center py-6 text-stone-400 text-xs italic">
                  No orders have been submitted under this email address yet. Add items and place one today!
                </div>
              ) : (
                <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                  {customerOrders.map((ord) => (
                    <div
                      key={ord.id}
                      className="flex justify-between items-center bg-stone-50 p-3 rounded-lg border border-stone-150 text-xs leading-none"
                    >
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono font-bold text-amber-955">{ord.id}</span>
                          <span className={`text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded ${
                            ord.status === 'Delivered' ? 'bg-[#D2EBD2] text-[#225c22]' : ord.status === 'Cancelled' ? 'bg-red-50 text-red-505' : 'bg-orange-50 text-orange-850'
                          }`}>
                            {ord.status}
                          </span>
                        </div>
                        <p className="text-[9px] text-stone-400 mt-1">{ord.orderDate}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <p className="font-mono font-bold text-stone-800">₹{ord.grandTotal}</p>
                        <button
                          onClick={() => {
                            onTrackOrder(ord.id);
                            onClose();
                          }}
                          className="bg-white border text-orange-605 font-bold p-1 px-2.5 rounded hover:bg-stone-50 transition-colors"
                        >
                          Track
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={onLogout}
              className="w-full bg-red-650 hover:bg-red-700 text-white font-bold py-3.5 rounded-2xl transition-all text-xs"
            >
              Sign Out Securely
            </button>
          </div>
        ) : (
          /* REGISTRATION / LOGIN INTERFACES */
          <div className="p-6 md:p-8 space-y-5">
            <div className="text-center">
              <h3 className="font-serif text-xl font-bold text-amber-955">Gayathri Member Account</h3>
              <p className="text-xs text-stone-500 mt-1">Join the Golden Club to manage orders, customize cakes, and unlock vouchers.</p>
            </div>

            {/* TAB ACCORDION */}
            <div className="grid grid-cols-2 bg-stone-50 p-1.5 rounded-xl border border-stone-200">
              <button
                type="button"
                onClick={() => setActiveTab('signin')}
                className={`py-2 text-xs font-bold rounded-lg text-center cursor-pointer ${
                  activeTab === 'signin' ? 'bg-white text-orange-655 shadow-xs' : 'text-stone-550 hover:bg-white/40'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('register')}
                className={`py-2 text-xs font-bold rounded-lg text-center cursor-pointer ${
                  activeTab === 'register' ? 'bg-white text-orange-655 shadow-xs' : 'text-stone-550 hover:bg-white/40'
                }`}
              >
                New Registration
              </button>
            </div>

            {/* SUB SECTIONS */}
            {activeTab === 'signin' && (
              <form onSubmit={handleSignInSubmit} className="space-y-4">
                
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-stone-500">Email Address *</label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="Enter register email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full text-xs rounded-xl border border-stone-200 pl-8.5 py-2.5 outline-none focus:border-orange-500 bg-stone-50/50 font-medium"
                    />
                    <Mail className="absolute left-3 top-3.5 h-3.5 w-3.5 text-stone-400" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-stone-500">Password Code *</label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full text-xs rounded-xl border border-stone-200 pl-8.5 py-2.5 outline-none focus:border-orange-500 bg-stone-50/50 font-medium"
                    />
                    <Lock className="absolute left-3 top-3.5 h-3.5 w-3.5 text-stone-400" />
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('forgot')}
                    className="text-[10px] text-orange-600 font-bold hover:underline block mt-1"
                  >
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 text-xs rounded-xl shadow-lg shadow-orange-100 transition-all flex items-center justify-center gap-1.5"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Authenticate Membership</span>
                </button>

                {/* Google Single-Tap OAuth */}
                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-stone-200" />
                  <span className="flex-shrink mx-4 text-stone-400 text-[10px] uppercase font-bold">Or Single-Tap</span>
                  <div className="flex-grow border-t border-stone-200" />
                </div>

                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-full border border-stone-220 hover:border-blue-500 hover:bg-blue-50/20 text-stone-750 font-bold py-3 text-xs rounded-xl transition-all flex items-center justify-center gap-2 bg-white"
                >
                  <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  <span>Continue with Google Secure Login</span>
                </button>

                <p className="text-[10px] text-center text-stone-400">
                  Tip: Log in with <strong className="text-stone-605 select-all">owner@letoile.com</strong> to unlock the Admin Panel instantly!
                </p>

              </form>
            )}

            {activeTab === 'register' && (
              <form onSubmit={handleRegisterSubmit} className="space-y-3">
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-stone-500">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      className="w-full text-xs rounded-xl border border-stone-200 p-2.5 outline-none focus:border-orange-500 bg-stone-50/50 font-medium"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-stone-500">Contact Mobile *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 91234 56789"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      className="w-full text-xs rounded-xl border border-stone-200 p-2.5 outline-none focus:border-orange-500 bg-stone-50/50 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-stone-500">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="w-full text-xs rounded-xl border border-stone-200 p-2.5 outline-none focus:border-orange-500 bg-stone-50/50 font-medium"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-stone-500">Choose Password *</label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      className="w-full text-xs rounded-xl border border-stone-200 p-2.5 outline-none focus:border-orange-500 bg-stone-50/50 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2 space-y-1">
                    <label className="text-[10px] uppercase font-bold text-stone-500">Default Delivery Address</label>
                    <input
                      type="text"
                      placeholder="Apartment complexes, Floor..."
                      value={regAddress}
                      onChange={(e) => setRegAddress(e.target.value)}
                      className="w-full text-xs rounded-xl border border-stone-200 p-2.5 outline-none focus:border-orange-500 bg-stone-50/50 font-medium"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-stone-500">Zip Code</label>
                    <input
                      type="text"
                      placeholder="560001"
                      value={regPincode}
                      onChange={(e) => setRegPincode(e.target.value)}
                      className="w-full text-xs rounded-xl border border-stone-200 p-2.5 outline-none focus:border-orange-500 bg-stone-50/50 font-medium"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#5C3D2E] hover:bg-stone-850 text-white font-bold py-3 text-xs rounded-xl transition-all shadow-lg flex items-center justify-center gap-1.5 mt-2"
                >
                  <Sparkles className="h-4 w-4 text-yellow-300" />
                  <span>Register Golden Account</span>
                </button>

              </form>
            )}

            {activeTab === 'forgot' && (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-stone-500">Emergency Reset Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="Enter register email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="w-full text-xs rounded-xl border border-stone-200 p-2.5 outline-none focus:border-orange-500 bg-stone-50/50"
                  />
                </div>

                {forgotSent ? (
                  <div className="bg-[#D2EBD2] text-[#225c22] p-4 rounded-xl text-center text-[11px] font-bold border border-green-300 tracking-wide leading-normal">
                    <p>✉️ Recovery OTP Dispatched!</p>
                    <p className="font-normal text-[10px] mt-1">Please inspect your email inbox for private OTP links to reset credentials.</p>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('signin')}
                      className="w-1/3 border border-stone-200 rounded-xl py-2.5 text-xs font-bold hover:bg-stone-50 transition-colors cursor-pointer text-center"
                    >
                      Back to Login
                    </button>
                    <button
                      type="submit"
                      className="w-2/3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl py-2.5 text-xs font-bold transition-colors shadow-md text-center"
                    >
                      Dispatch Recovery Link
                    </button>
                  </div>
                )}
              </form>
            )}

          </div>
        )}

      </div>
    </div>
  );
}

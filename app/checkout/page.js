// app/checkout/page.js
'use client';

import { useState, useEffect, useRef } from 'react';
import { useCart } from '../../context/CartContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { FiShoppingBag, FiCheck, FiArrowLeft } from 'react-icons/fi';
import Image from 'next/image';
import { trackBeginCheckout, trackPurchase } from '../../utils/analytics';

export default function CheckoutPage() {
  const { cart, getTotalPrice, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderRef, setOrderRef] = useState('');
  const [mounted, setMounted] = useState(false);
  // Prevent double-firing begin_checkout if user came via Cart.js
  const checkoutTracked = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fire begin_checkout when user lands directly on the checkout page
  // (e.g., via direct URL or Buy Now button — Cart.js also fires this on "Proceed to Checkout")
  useEffect(() => {
    if (mounted && cart.length > 0 && !checkoutTracked.current) {
      trackBeginCheckout(cart, getTotalPrice());
      checkoutTracked.current = true;
    }
  }, [mounted, cart]); // eslint-disable-line react-hooks/exhaustive-deps

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    address: '',
    city: '',
    pincode: '',
    state: '',
  });

  const formattedPrice = (price) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Generate a unique order reference ID for GA4 purchase tracking
    const transactionId = `GZV-${Date.now()}`;

    const orderDetails = cart
      .map(
        (item) =>
          `${item.name} (Size: ${item.size}${item.color ? `, Color: ${item.color}` : ''}) x ${item.quantity} - ${formattedPrice(
            item.price * item.quantity
          )}`
      )
      .join('\n');

    const GOOGLE_FORM_URL =
      'https://docs.google.com/forms/d/e/1FAIpQLSeTHAG9ok1dZdLOAI6D95Vc3CbN6OQqqdnwkbvG6rEpkXv2Qg/formResponse';

    const FORM_ENTRY_IDS = {
      name: 'entry.177269583',
      email: 'entry.813093736',
      whatsapp: 'entry.557793667',
      address: 'entry.296257999',
      city: 'entry.1033840332',
      pincode: 'entry.751240157',
      state: 'entry.826179235',
      orderDetails: 'entry.774842190',
      totalAmount: 'entry.1962467478',
    };

    const formPayload = new URLSearchParams();
    Object.entries(formData).forEach(([key, value]) => {
      if (FORM_ENTRY_IDS[key]) {
        formPayload.append(FORM_ENTRY_IDS[key], value);
      }
    });
    formPayload.append(FORM_ENTRY_IDS.orderDetails, orderDetails);
    formPayload.append(FORM_ENTRY_IDS.totalAmount, getTotalPrice().toString());

    // Snapshot cart & total BEFORE clearing (needed for GA4 purchase event)
    const cartSnapshot = [...cart];
    const totalSnapshot = getTotalPrice();

    try {
      await fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        body: formPayload,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        mode: 'no-cors',
      });

      await new Promise((resolve) => setTimeout(resolve, 2000));

      // ✅ GA4 PURCHASE — Fire before clearing cart
      trackPurchase(cartSnapshot, totalSnapshot, transactionId);

      setOrderRef(transactionId);
      setOrderSuccess(true);
      clearCart();
    } catch (error) {
      console.error('Order Error:', error);
      // Still fire purchase — Google Forms 'no-cors' always returns opaque response
      // so errors here don't mean the order failed
      trackPurchase(cartSnapshot, totalSnapshot, transactionId);
      setOrderRef(transactionId);
      setOrderSuccess(true);
      clearCart();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) return <div className="min-h-screen bg-dark-500" />;

  if (orderSuccess) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F5F2EC]">
        <Header variant="dark" />
        <main className="flex-1 flex items-center justify-center px-4 py-20 pt-32">
          <div className="w-full max-w-lg">
            <div className="bg-[#0F172A] rounded-3xl border border-slate-800 shadow-xl shadow-slate-950/25 p-8 md:p-12 text-center relative overflow-hidden">
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-accent-purple/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-accent-pink/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative w-20 h-20 mx-auto mb-7 rounded-2xl bg-gradient-to-br from-accent-purple to-accent-pink flex items-center justify-center shadow-lg shadow-accent-purple/30">
                <FiCheck className="w-10 h-10 text-white" />
              </div>

              <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-white mb-3 tracking-tight">
                Order <span className="bg-gradient-to-r from-accent-purple to-accent-pink bg-clip-text text-transparent">Confirmed!</span>
              </h1>
              <p className="text-slate-300 text-base leading-relaxed mb-6 max-w-sm mx-auto">
                Thank you for your order! We&apos;ll contact you on WhatsApp within 24 hours
                with tracking details and shipping updates.
              </p>

              {orderRef && (
                <div className="inline-block bg-[#151f30] border border-slate-700/80 rounded-2xl px-6 py-3 mb-8">
                  <p className="text-[11px] text-slate-400 uppercase tracking-widest font-medium mb-1">Your Order Reference</p>
                  <p className="text-sm font-mono font-bold text-accent-purple">{orderRef}</p>
                </div>
              )}

              <div className="grid grid-cols-3 gap-3 mb-8">
                {[
                  { icon: '🚚', label: 'Free Shipping' },
                  { icon: '🛡️', label: 'Premium Quality' },
                  { icon: '📞', label: '24/7 Support' },
                ].map(({ icon, label }) => (
                  <div key={label} className="bg-[#151f30] border border-slate-700/80 rounded-xl py-4 px-2 text-center">
                    <div className="text-xl mb-1.5">{icon}</div>
                    <div className="text-[11px] text-slate-300 font-medium leading-snug">{label}</div>
                  </div>
                ))}
              </div>

              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-accent-purple to-accent-pink text-white font-heading font-bold text-sm px-8 py-3.5 rounded-xl shadow-md shadow-accent-purple/25 hover:opacity-90 transition-all duration-200"
              >
                <FiShoppingBag className="w-4 h-4" />
                Continue Shopping
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F5F2EC]">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4 py-20 pt-32">
          <div className="text-center">
            <div className="w-24 h-24 bg-white border border-[#e5ddd0] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
              <FiShoppingBag className="w-8 h-8 text-slate-400" />
            </div>
            <h1 className="text-3xl font-heading font-extrabold text-slate-900 mb-3 tracking-tight">
              Your Cart is <span className="bg-gradient-to-r from-accent-purple to-accent-pink bg-clip-text text-transparent">Empty</span>
            </h1>
            <p className="text-slate-500 mb-8 max-w-sm mx-auto">
              Looks like you haven&apos;t added any anime treasures to your collection yet.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-accent-purple to-accent-pink text-white font-heading font-bold text-sm px-8 py-3.5 rounded-xl shadow-md shadow-accent-purple/25 hover:opacity-90 transition-all duration-200"
            >
              Explore Collection
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F2EC]">
      <Header />

      {/* Page intro / Dark Image Banner Section */}
      <div className="relative pt-20 md:pt-24 bg-dark-500 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
          style={{ backgroundImage: "url('/checkout.webp')" }}
        />
        {/* Subtle dark gradient overlay so existing text remains highly readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark-500/95 via-dark-500/85 to-dark-500/75 pointer-events-none" />
        <div className="relative z-10 container-custom px-4 sm:px-6 md:px-8 py-8 md:py-10 border-b border-dark-300/80">
          <p className="text-[11px] uppercase tracking-widest font-bold text-purple-400 mb-1.5">Secure Checkout</p>
          <h1 className="text-2xl md:text-3xl font-heading font-extrabold text-white tracking-tight leading-tight">
            Complete Your Order
          </h1>
          <p className="text-slate-300 text-sm mt-1">Cash on Delivery · Free Shipping Across India</p>
        </div>
      </div>

      <main className="flex-1 container-custom px-4 sm:px-6 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">

          {/* LEFT — Order Summary (Deep Navy/Near-Black Dark Surface #0F172A) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="bg-[#0F172A] rounded-2xl border border-slate-800 shadow-sm overflow-hidden">

              <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between">
                <h2 className="text-xs font-heading font-extrabold uppercase tracking-widest text-slate-200">
                  Order Summary
                </h2>
                <span className="text-[11px] font-bold bg-slate-800/90 border border-slate-700/80 text-slate-300 px-3 py-1 rounded-full uppercase tracking-wider">
                  {cart.length} {cart.length === 1 ? 'item' : 'items'}
                </span>
              </div>

              <div className="divide-y divide-slate-800 max-h-72 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.cartId} className="flex gap-4 px-6 py-4 hover:bg-slate-800/30 transition-colors duration-150">
                    <div className="relative flex-shrink-0 rounded-xl overflow-hidden bg-slate-800 border border-slate-700" style={{ width: 56, height: 72 }}>
                      <Image
                        src={item.images?.[0] || '/logo_tras.png'}
                        alt={item.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                      <div className="absolute -top-1 -right-1 bg-gradient-to-br from-accent-purple to-accent-pink text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 py-0.5">
                      <h3 className="text-sm font-semibold text-white leading-snug mb-1 line-clamp-2">{item.name}</h3>
                      <p className="text-[11px] text-slate-400 mb-1.5">
                        Size: <span className="text-slate-300 font-medium">{item.size}</span>
                        {item.color && <> &bull; Color: <span className="text-slate-300 font-medium">{item.color}</span></>}
                      </p>
                      <p className="text-sm font-bold bg-gradient-to-r from-accent-purple to-accent-pink bg-clip-text text-transparent">
                        {formattedPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-6 py-5 bg-[#0B1120] border-t border-slate-800 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Subtotal</span>
                  <span className="text-slate-200 font-medium">{formattedPrice(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Shipping</span>
                  <span className="text-emerald-400 font-bold text-xs uppercase tracking-wider">FREE</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-slate-800">
                  <span className="text-base font-heading font-extrabold text-white">Total</span>
                  <div className="text-right">
                    <span className="text-xl font-extrabold bg-gradient-to-r from-accent-purple to-accent-pink bg-clip-text text-transparent">
                      {formattedPrice(getTotalPrice())}
                    </span>
                    <p className="text-[10px] text-slate-400 mt-0.5">Incl. all taxes</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 divide-x divide-slate-800 border-t border-slate-800">
                {[
                  { icon: '🚚', label: 'Free Shipping' },
                  { icon: '🛡️', label: 'Quality Guarantee' },
                  { icon: '↩️', label: 'Easy Returns' },
                ].map(({ icon, label }) => (
                  <div key={label} className="flex flex-col items-center py-4 px-2 text-center bg-[#0F172A]">
                    <span className="text-lg mb-1">{icon}</span>
                    <span className="text-[10px] text-slate-400 font-medium leading-tight">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Customer Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Personal Information */}
              <div className="bg-[#0F172A] rounded-2xl border border-slate-800 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-5 rounded-full bg-gradient-to-b from-accent-purple to-accent-pink flex-shrink-0" />
                    <h3 className="text-xs font-heading font-extrabold uppercase tracking-widest text-slate-200">Personal Information</h3>
                  </div>
                </div>
                <div className="px-6 py-6 space-y-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-300 mb-2">
                      Full Name <span className="text-accent-pink normal-case tracking-normal">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-[#151f30] border border-slate-700/80 rounded-xl px-4 py-3 text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:border-accent-purple focus:ring-2 focus:ring-accent-purple/20 transition-all duration-200"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-slate-300 mb-2">
                        Email Address <span className="text-accent-pink normal-case tracking-normal">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-[#151f30] border border-slate-700/80 rounded-xl px-4 py-3 text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:border-accent-purple focus:ring-2 focus:ring-accent-purple/20 transition-all duration-200"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-slate-300 mb-2">
                        WhatsApp Number <span className="text-accent-pink normal-case tracking-normal">*</span>
                      </label>
                      <input
                        type="tel"
                        name="whatsapp"
                        required
                        pattern="[0-9+\s\-]{10,15}"
                        value={formData.whatsapp}
                        onChange={handleInputChange}
                        className="w-full bg-[#151f30] border border-slate-700/80 rounded-xl px-4 py-3 text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:border-accent-purple focus:ring-2 focus:ring-accent-purple/20 transition-all duration-200"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-[#0F172A] rounded-2xl border border-slate-800 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-5 rounded-full bg-gradient-to-b from-accent-cyan to-accent-purple flex-shrink-0" />
                    <h3 className="text-xs font-heading font-extrabold uppercase tracking-widest text-slate-200">Shipping Address</h3>
                  </div>
                </div>
                <div className="px-6 py-6 space-y-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-300 mb-2">
                      Street Address <span className="text-accent-pink normal-case tracking-normal">*</span>
                    </label>
                    <textarea
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full bg-[#151f30] border border-slate-700/80 rounded-xl px-4 py-3 text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:border-accent-purple focus:ring-2 focus:ring-accent-purple/20 transition-all duration-200 resize-none"
                      placeholder="Flat / Building / Street / Landmark"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-slate-300 mb-2">
                        City <span className="text-accent-pink normal-case tracking-normal">*</span>
                      </label>
                      <input
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full bg-[#151f30] border border-slate-700/80 rounded-xl px-4 py-3 text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:border-accent-purple focus:ring-2 focus:ring-accent-purple/20 transition-all duration-200"
                        placeholder="Enter city"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-slate-300 mb-2">
                        State <span className="text-accent-pink normal-case tracking-normal">*</span>
                      </label>
                      <input
                        name="state"
                        required
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full bg-[#151f30] border border-slate-700/80 rounded-xl px-4 py-3 text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:border-accent-purple focus:ring-2 focus:ring-accent-purple/20 transition-all duration-200"
                        placeholder="Enter state"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-slate-300 mb-2">
                        Pincode <span className="text-accent-pink normal-case tracking-normal">*</span>
                      </label>
                      <input
                        name="pincode"
                        required
                        pattern="[0-9]{6}"
                        maxLength={6}
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className="w-full bg-[#151f30] border border-slate-700/80 rounded-xl px-4 py-3 text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:border-accent-purple focus:ring-2 focus:ring-accent-purple/20 transition-all duration-200"
                        placeholder="6-digit pincode"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-[#0F172A] rounded-2xl border border-slate-800 shadow-sm px-6 py-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-accent-purple via-purple-500 to-accent-pink text-white font-heading font-extrabold text-base py-4 rounded-xl shadow-lg shadow-accent-purple/25 hover:shadow-accent-purple/40 hover:opacity-90 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2.5"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Processing Your Order…</span>
                    </>
                  ) : (
                    <>
                      <FiCheck className="w-5 h-5" />
                      <span>Confirm Order — {formattedPrice(getTotalPrice())}</span>
                    </>
                  )}
                </button>
                <div className="text-center mt-4">
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-1.5 text-slate-400 hover:text-slate-200 transition-colors duration-200 text-sm"
                  >
                    <FiArrowLeft className="w-4 h-4" />
                    <span>Continue Shopping</span>
                  </Link>
                </div>
              </div>

            </form>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}


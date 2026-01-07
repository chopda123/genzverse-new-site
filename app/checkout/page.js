// app/checkout/page.js
'use client';

import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';  // Updated path
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { FiShoppingBag, FiCheck, FiArrowLeft } from 'react-icons/fi';

export default function CheckoutPage() {
  const { cart, getTotalPrice, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

    const orderDetails = cart
      .map(
        (item) =>
          `${item.name} (Size: ${item.size}) x ${item.quantity} - ${formattedPrice(
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
      setOrderSuccess(true);
      clearCart();
    } catch (error) {
      console.error('Order Error:', error);
      setOrderSuccess(true);
      clearCart();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) return <div className="min-h-screen bg-dark-500" />;

  if (orderSuccess) {
    return (
      <div className="min-h-screen flex flex-col bg-dark-500 text-white">
        <Header />
        <div className="flex-1 flex items-center justify-center p-4 pt-32">
          <div className="w-full max-w-2xl bg-dark-400 border border-accent-purple/20 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent-purple/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-accent-pink/10 rounded-full blur-xl"></div>
            
            <div className="w-24 h-24 bg-gradient-to-r from-accent-purple to-accent-pink flex items-center justify-center mx-auto mb-8 rounded-2xl shadow-lg shadow-accent-purple/25">
              <FiCheck className="w-12 h-12 text-white" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Order <span className="text-gradient">Confirmed!</span>
            </h1>
            <p className="text-gray-300 mb-8 text-lg leading-relaxed">
              Thank you for your order! We'll contact you on WhatsApp within 24 hours 
              with tracking details and shipping updates.
            </p>
            
            <div className="grid grid-cols-3 gap-4 mb-8 max-w-md mx-auto">
              <div className="text-center p-4 bg-dark-300 rounded-lg">
                <div className="text-2xl mb-2">🚚</div>
                <div className="text-xs text-gray-400">Free Shipping</div>
              </div>
              <div className="text-center p-4 bg-dark-300 rounded-lg">
                <div className="text-2xl mb-2">🛡️</div>
                <div className="text-xs text-gray-400">Premium Quality</div>
              </div>
              <div className="text-center p-4 bg-dark-300 rounded-lg">
                <div className="text-2xl mb-2">📞</div>
                <div className="text-xs text-gray-400">24/7 Support</div>
              </div>
            </div>
            
            <Link
              href="/products"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <FiShoppingBag className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-dark-500 text-white">
        <Header />
        <div className="flex-1 flex items-center justify-center p-4 pt-32">
          <div className="text-center">
            <div className="w-24 h-24 bg-dark-400 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-dark-300">
              <FiShoppingBag className="w-8 h-8 text-gray-400" />
            </div>
            <h1 className="text-3xl font-heading font-bold text-white mb-4">
              Your Cart is <span className="text-gradient">Empty</span>
            </h1>
            <p className="text-gray-400 mb-8 max-w-md">
              Looks like you haven't added any anime treasures to your collection yet.
            </p>
            <Link
              href="/products"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>Explore Collection</span>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-dark-500 text-white">
      <Header />

      <div className="flex-1 pt-32 pb-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Secure <span className="text-gradient">Checkout</span>
            </h1>
            <p className="text-gray-400 text-lg">
              Complete your order and join the GenZverse family
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5">
              <div className="bg-dark-400 rounded-2xl border border-dark-300 p-6 sticky top-32">
                <h2 className="text-xl font-heading font-bold mb-6 flex items-center justify-between">
                  <span>Order Summary</span>
                  <span className="text-sm font-normal text-gray-400 bg-dark-300 px-3 py-1 rounded-full">
                    {cart.length} {cart.length === 1 ? 'item' : 'items'}
                  </span>
                </h2>

                <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2">
                  {cart.map((item) => (
                    <div
                      key={item.cartId}
                      className="flex gap-4 p-3 bg-dark-300 rounded-lg group hover:bg-dark-300/80 transition-colors"
                    >
                      <div className="w-16 h-20 bg-dark-200 rounded-lg flex-shrink-0 overflow-hidden relative">
                        <img
                          src={item.images?.[0] || 'https://via.placeholder.com/400x400/6b7280/ffffff?text=Anime+Tee'}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute -top-1 -right-1 bg-accent-purple text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                          {item.quantity}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-white text-sm leading-tight mb-1 line-clamp-2">
                          {item.name}
                        </h3>
                        <p className="text-xs text-gray-400 mb-2">
                          Size: <span className="text-gray-300">{item.size}</span>
                        </p>
                        <p className="text-sm font-bold text-accent-purple">
                          {formattedPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 border-t border-dark-300 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="text-white">{formattedPrice(getTotalPrice())}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Shipping</span>
                    <span className="text-accent-cyan">FREE</span>
                  </div>
                  
                  <div className="flex justify-between items-center pt-3 border-t border-dark-300">
                    <span className="text-lg font-heading font-bold text-white">Total</span>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-gradient">
                        {formattedPrice(getTotalPrice())}
                      </span>
                      <p className="text-xs text-gray-400 mt-1">Including all taxes</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-dark-300">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-accent-purple/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <span className="text-sm">🚚</span>
                    </div>
                    <div className="text-xs text-gray-400">Free Shipping</div>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-accent-purple/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <span className="text-sm">🛡️</span>
                    </div>
                    <div className="text-xs text-gray-400">8 Years Quality</div>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-accent-purple/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <span className="text-sm">↩️</span>
                    </div>
                    <div className="text-xs text-gray-400">Easy Returns</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit} className="bg-dark-400 rounded-2xl border border-dark-300 p-6">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-heading font-bold mb-6 flex items-center">
                      <span className="w-2 h-2 bg-accent-purple rounded-full mr-3"></span>
                      Personal Information
                    </h3>
                    
                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full bg-dark-300 border border-dark-200 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-colors duration-200"
                          placeholder="Enter your full name"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full bg-dark-300 border border-dark-200 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-colors duration-200"
                            placeholder="Enter your email"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            WhatsApp Number *
                          </label>
                          <input
                            type="tel"
                            name="whatsapp"
                            required
                            value={formData.whatsapp}
                            onChange={handleInputChange}
                            className="w-full bg-dark-300 border border-dark-200 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-colors duration-200"
                            placeholder="+91 XXXXX XXXXX"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-heading font-bold mb-6 flex items-center">
                      <span className="w-2 h-2 bg-accent-cyan rounded-full mr-3"></span>
                      Shipping Address
                    </h3>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Street Address *
                        </label>
                        <textarea
                          name="address"
                          required
                          value={formData.address}
                          onChange={handleInputChange}
                          rows="3"
                          className="w-full bg-dark-300 border border-dark-200 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-colors duration-200 resize-none"
                          placeholder="Flat / Building / Street / Landmark"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            City *
                          </label>
                          <input
                            name="city"
                            required
                            value={formData.city}
                            onChange={handleInputChange}
                            className="w-full bg-dark-300 border border-dark-200 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-colors duration-200"
                            placeholder="Enter city"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            State *
                          </label>
                          <input
                            name="state"
                            required
                            value={formData.state}
                            onChange={handleInputChange}
                            className="w-full bg-dark-300 border border-dark-200 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-colors duration-200"
                            placeholder="Enter state"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Pincode *
                          </label>
                          <input
                            name="pincode"
                            required
                            value={formData.pincode}
                            onChange={handleInputChange}
                            className="w-full bg-dark-300 border border-dark-200 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-colors duration-200"
                            placeholder="Enter pincode"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-dark-300">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-primary text-lg py-4 font-heading font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Processing Your Order...</span>
                        </>
                      ) : (
                        <>
                          <FiCheck className="w-5 h-5" />
                          <span>Confirm Order - {formattedPrice(getTotalPrice())}</span>
                        </>
                      )}
                    </button>
                    
                    <div className="text-center mt-4">
                      <Link 
                        href="/products" 
                        className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors text-sm"
                      >
                        <FiArrowLeft className="w-4 h-4" />
                        <span>Continue Shopping</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
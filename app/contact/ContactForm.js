'use client'
import { useState } from 'react'
import { FiSend } from 'react-icons/fi'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Thank you for your message! We\'ll get back to you soon.')
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="bg-[#141F36] border border-[#22314E] rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl text-white">
      <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          <div>
            <label htmlFor="name" className="block text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-[#0F172A] border border-[#26354F] rounded-xl px-4 py-3 sm:py-3.5 text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-all duration-200"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[#0F172A] border border-[#26354F] rounded-xl px-4 py-3 sm:py-3.5 text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-all duration-200"
              placeholder="Where can we reply?"
            />
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="block text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-300 mb-2">
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            value={formData.subject}
            onChange={handleChange}
            className="w-full bg-[#0F172A] border border-[#26354F] rounded-xl px-4 py-3 sm:py-3.5 text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-all duration-200"
            placeholder="What's on your mind?"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-300 mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows="5"
            value={formData.message}
            onChange={handleChange}
            className="w-full bg-[#0F172A] border border-[#26354F] rounded-xl px-4 py-3 sm:py-3.5 text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-all duration-200 resize-none"
            placeholder="Tell us anything.&#10;Whether it's sizing, an order, a collaboration, feedback, or simply your favourite anime—we're listening."
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-accent-purple via-purple-600 to-accent-pink hover:from-accent-pink hover:to-accent-purple text-white py-3.5 sm:py-4 rounded-xl font-heading font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 flex items-center justify-center gap-2.5 active:scale-[0.99] cursor-pointer"
        >
          <FiSend className="w-4 h-4" />
          <span>Start the Conversation</span>
        </button>
      </form>

      {/* Supporting Brand Message */}
      <div className="mt-8 pt-8 border-t border-[#22314E] text-center space-y-1.5">
        <p className="text-slate-400 text-xs sm:text-sm italic font-serif">Not everything starts with an order.</p>
        <p className="text-slate-400 text-xs sm:text-sm italic font-serif">Sometimes it starts with a conversation.</p>
        <p className="text-slate-400 text-xs sm:text-sm italic font-serif">And sometimes...</p>
        <p className="text-slate-400 text-xs sm:text-sm italic font-serif">it starts because someone else recognized the symbol on your T-shirt.</p>
        <div className="pt-4">
          <p className="text-slate-300 font-heading font-bold text-sm sm:text-base">You know...</p>
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-pink font-heading font-bold text-sm sm:text-base">If you know.</p>
        </div>
      </div>
    </div>
  )
}

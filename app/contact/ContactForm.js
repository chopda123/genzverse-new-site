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
    <div className="bg-dark-300 rounded-2xl p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-dark-400 border border-dark-200 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent-purple transition-colors duration-200"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-dark-400 border border-dark-200 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent-purple transition-colors duration-200"
              placeholder="Where can we reply?"
            />
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            value={formData.subject}
            onChange={handleChange}
            className="w-full bg-dark-400 border border-dark-200 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent-purple transition-colors duration-200"
            placeholder="What's on your mind?"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows="6"
            value={formData.message}
            onChange={handleChange}
            className="w-full bg-dark-400 border border-dark-200 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent-purple transition-colors duration-200 resize-none"
            placeholder="Tell us anything.&#10;Whether it's sizing, an order, a collaboration, feedback, or simply your favourite anime—we're listening."
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full btn-primary flex items-center justify-center space-x-2"
        >
          <FiSend className="w-4 h-4" />
          <span>Start the Conversation</span>
        </button>
      </form>

      <div className="mt-12 text-center space-y-2">
        <p className="text-gray-400 text-sm italic">Not everything starts with an order.</p>
        <p className="text-gray-400 text-sm italic">Sometimes it starts with a conversation.</p>
        <p className="text-gray-400 text-sm italic">And sometimes...</p>
        <p className="text-gray-400 text-sm italic">it starts because someone else recognized the symbol on your T-shirt.</p>
        <p className="text-gray-300 font-heading font-bold mt-6">You know...</p>
        <p className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-pink font-heading font-bold">If you know.</p>
      </div>
    </div>
  )
}

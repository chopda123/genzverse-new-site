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
              placeholder="Enter your full name"
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
              placeholder="Enter your email"
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
            placeholder="What's this about?"
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
            placeholder="Tell us about your inquiry..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full btn-primary flex items-center justify-center space-x-2"
        >
          <FiSend className="w-4 h-4" />
          <span>Send Message</span>
        </button>
      </form>
    </div>
  )
}

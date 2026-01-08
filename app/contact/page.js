// app/contact/page.js
'use client'
import { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically integrate with your Google Form
    // For now, we'll just log the data
    console.log('Form submitted:', formData)
    
    // Show success message
    alert('Thank you for your message! We\'ll get back to you soon.')
    
    // Reset form
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
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-dark-500 via-dark-400 to-dark-300">
          <div className="container-custom text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Have questions about our limited edition collections? We'd love to hear from you!
            </p>
          </div>
        </section>

        <section className="section-padding bg-dark-400">
          <div className="container-custom max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-heading font-bold mb-6">
                  Let's Create <span className="text-gradient">Magic</span>
                </h2>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  Whether you have questions about our limited edition drops, need help with sizing, or just want to share your anime passion - we're here for you. Our team responds within 24 hours.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-accent-purple to-accent-pink rounded-lg flex items-center justify-center flex-shrink-0">
                      <FiMail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-white mb-1">Email Us</h3>
                      <p className="text-gray-400">genzverse.store@gmail.com</p>
                      <p className="text-gray-400 text-sm">We'll reply within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-accent-cyan to-accent-purple rounded-lg flex items-center justify-center flex-shrink-0">
                      <FiPhone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-white mb-1">Call Us</h3>
                      <p className="text-gray-400">+91 8668908299</p>
                      <p className="text-gray-400 text-sm">Mon-Fri from 10AM to 6PM</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-accent-pink to-accent-cyan rounded-lg flex items-center justify-center flex-shrink-0">
                      <FiMapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-white mb-1">Visit Us</h3>
                      <p className="text-gray-400">Akola, Maharashtra</p>
                      <p className="text-gray-400 text-sm">Our manufacturing heart since 2016</p>
                    </div>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="mt-8 p-6 bg-dark-300 rounded-2xl">
                  <h4 className="font-heading font-bold text-white mb-3">Why Choose GenZverse?</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-accent-cyan rounded-full"></span>
                      <span>2+ Years of Craftsmanship</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-accent-cyan rounded-full"></span>
                      <span>Premium Quality Materials</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-accent-cyan rounded-full"></span>
                      <span>Limited Edition Designs</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-accent-cyan rounded-full"></span>
                      <span>Fast Shipping Across India</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Contact Form */}
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
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
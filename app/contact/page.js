// app/contact/page.js
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import ContactForm from './ContactForm'

export const metadata = {
  title: 'Contact Us',
  description: 'Get in touch with GenZverse. Questions about anime t-shirts, sizing, orders, or collaborations? We respond within 24 hours.',
  openGraph: {
    title: 'Contact Us | GenZverse',
    description: 'Have questions about our limited edition anime collections? We\'d love to hear from you!',
    type: 'website',
  },
}

export default function Contact() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-dark-500 via-dark-400 to-dark-300">
          <div className="container-custom text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Let's Start a <span className="text-gradient">Conversation</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-4">
              Questions, ideas, collaborations, or just want to talk about anime? We'd love to hear from you.
            </p>
            <p className="text-gray-400">
              Every message is read by a real person, and we usually reply within 24 hours.
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

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-accent-purple to-accent-pink rounded-lg flex items-center justify-center flex-shrink-0">
                      <FiMail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-white mb-1">Email Us</h3>
                      <p className="text-gray-400">genzverse.store@gmail.com</p>
                      <p className="text-gray-400 text-sm mt-1">For orders, collaborations, custom requests, or anything else.</p>
                      <p className="text-gray-400 text-sm mt-1">Response within 24 hours.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-accent-cyan to-accent-purple rounded-lg flex items-center justify-center flex-shrink-0">
                      <FiPhone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-white mb-1">Call / WhatsApp</h3>
                      <p className="text-gray-400">+91 86689 08299</p>
                      <p className="text-gray-400 text-sm mt-1">Monday – Saturday</p>
                      <p className="text-gray-400 text-sm">10:00 AM – 7:00 PM (IST)</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-accent-pink to-accent-cyan rounded-lg flex items-center justify-center flex-shrink-0">
                      <FiMapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-white mb-1">Based In</h3>
                      <p className="text-gray-400">Akola, Maharashtra, India</p>
                      <p className="text-gray-400 text-sm mt-1">Designed in India.</p>
                      <p className="text-gray-400 text-sm">Shipping Nationwide.</p>
                    </div>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="mt-8 p-6 bg-dark-300 rounded-2xl">
                  <h4 className="font-heading font-bold text-white mb-3">Why GenZverse?</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li className="flex items-center space-x-2">
                      <span className="text-accent-cyan">✓</span>
                      <span>Premium Heavyweight Streetwear</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="text-accent-cyan">✓</span>
                      <span>Limited Edition Drops</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="text-accent-cyan">✓</span>
                      <span>Designed for Real Anime Fans</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="text-accent-cyan">✓</span>
                      <span>Made to Wear Every Day, Not Just Events</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Contact Form (Client Component) */}
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
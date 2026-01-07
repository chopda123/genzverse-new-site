// components/Testimonials.js
'use client'
import { useState, useEffect } from 'react'
import { FiStar } from 'react-icons/fi'

const testimonials = [
  {
    id: 1,
    name: "Rohan K.",
    location: "Mumbai",
    rating: 5,
    text: "The quality is insane! My Naruto tee feels premium and the print is so vibrant. Got so many compliments!",
    avatar: "RK"
  },
  {
    id: 2,
    name: "Priya S.",
    location: "Delhi",
    rating: 5,
    text: "Limited edition designs that nobody else has. The fabric is so comfortable and the fit is perfect!",
    avatar: "PS"
  },
  {
    id: 3,
    name: "Arjun M.",
    location: "Bangalore",
    rating: 5,
    text: "Fast shipping and amazing customer service. The Demon Slayer design looks even better in person!",
    avatar: "AM"
  }
]

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="section-padding bg-gradient-to-br from-dark-400 to-dark-300">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Loved by <span className="text-gradient">Anime Fans</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join 50,000+ happy customers who've found their perfect anime expression
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className={`bg-dark-400 rounded-2xl p-6 border transition-all duration-500 ${
                index === currentTestimonial 
                  ? 'border-accent-purple scale-105 shadow-lg' 
                  : 'border-dark-300'
              }`}
            >
              {/* Stars */}
              <div className="flex space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FiStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              
              {/* Testimonial Text */}
              <p className="text-gray-300 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>
              
              {/* Author */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-accent-purple to-accent-pink rounded-full flex items-center justify-center font-medium text-white">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-medium text-white">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentTestimonial ? 'bg-accent-purple w-6' : 'bg-dark-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
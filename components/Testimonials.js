


'use client'
import { useState, useEffect } from 'react'

const feedbacks = [
  {
    id: 1,
    text: "This doesn’t feel like anime merch at all. It feels intentional.",
    source: "Instagram DM"
  },
  {
    id: 2,
    text: "I didn’t get it at first, then it clicked. That’s rare.",
    source: "Website Visitor"
  },
  {
    id: 3,
    text: "Finally something subtle. Everything else is too loud.",
    source: "Anime Community Member"
  }
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % feedbacks.length)
    }, 4500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="section-padding bg-dark-400">
      <div className="container-custom max-w-5xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-xs tracking-widest uppercase text-gray-500 mb-4">
            Community
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Early <span className="text-gray-400">Feedback</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Thoughts from people who discovered Genzverse and understood the idea.
          </p>
        </div>

        {/* Feedback Card */}
        <div className="relative bg-dark-500 border border-white/10 rounded-2xl p-10 text-center transition-all duration-500">
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-8">
            “{feedbacks[current].text}”
          </p>

          <div className="text-sm text-gray-500">
            — {feedbacks[current].source}
          </div>
        </div>

        {/* Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {feedbacks.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === current
                  ? 'w-10 bg-gray-300'
                  : 'w-4 bg-dark-300'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  )
}














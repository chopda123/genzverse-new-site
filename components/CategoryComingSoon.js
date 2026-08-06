// components/CategoryComingSoon.js
'use client'

import { upcomingDrops } from '../data/upcomingDrops'

export default function CategoryComingSoon({ slug }) {
  const drops = upcomingDrops[slug]

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6">
      <div className="bg-dark-400 border border-dark-300 rounded-2xl p-8 md:p-12 max-w-lg w-full text-center">
        {/* Glow dot */}
        <div className="w-3 h-3 bg-accent-purple rounded-full mx-auto mb-6 animate-glow" />

        <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-2">
          Coming Soon
        </h2>
        <p className="text-gray-400 text-sm md:text-base mb-8">
          We&apos;re cooking something special for this collection.
        </p>

        {drops && drops.length > 0 && (
          <div className="text-left space-y-3">
            <h3 className="text-sm font-semibold text-accent-cyan uppercase tracking-wider mb-4">
              Upcoming Drops
            </h3>
            <ul className="space-y-2">
              {drops.map((name, index) => (
                <li
                  key={index}
                  className="flex items-center space-x-3 text-gray-300 text-sm md:text-base"
                >
                  <span className="w-1.5 h-1.5 bg-accent-purple rounded-full flex-shrink-0" />
                  <span>{name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

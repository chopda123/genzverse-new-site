


'use client'
import Link from 'next/link'
import Image from 'next/image'

export default function CollectionsGate() {
  const collections = [
    {
      title: "Hidden References",
      subtitle: "For True Fans",
      desc: "Numbers, symbols, and moments only real fans recognize.",
      image: "/hidden-reference.png",
      href: "/products?collection=archive"
    },
    {
      title: "Underrated Classic",
      subtitle: "Words That Stayed",
      desc: "Iconic silhouettes and poses, executed with restraint.",
      image: "/underrated-classic-2.png",
      href: "/products?collection=icons"
    },
    {
      title: "Recognizable Characters",
      subtitle: "Iconic Silhouettes",
      desc: "Famous anime lines turned into wearable statements.",
      image: "/character.png",
      href: "/products?collection=quotes"
    },
  ]

  return (
    <section className="py-12 md:py-20 bg-dark-500 relative overflow-hidden">
      {/* Optional: Background Ambience - adds depth behind the cards */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="container-custom relative z-10">

        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-heading font-black mb-6 tracking-tight">
            EXPLORE THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">GENZVERSE</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-transparent mx-auto rounded-full"></div>
        </div>

        {/* GRID: 3 Columns, Centered, Taller Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-[1200px] mx-auto px-4">
          {collections.map((c, i) => (
            <Link
              key={i}
              href={c.href}
              className="group relative h-[450px] rounded-3xl overflow-hidden border border-white/5 bg-dark-400"
            >
              
              {/* 1. IMAGE LAYER with Scale & Rotate Effect */}
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={c.image}
                  alt={c.title}
                  fill // Fits the card container
                  sizes="(max-width: 1024px) 100vw, 33vw" // Mobile: Full width, Desktop: 1/3 width
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
                />
              
                {/* Dark Gradient from bottom to top */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
              </div>

              {/* 2. HOVER BORDER GLOW */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-500/50 rounded-3xl transition-colors duration-500 z-20 pointer-events-none"></div>
              
              {/* 3. CONTENT LAYER - Glassmorphism Panel */}
              <div className="absolute inset-0 flex flex-col justify-end p-4">
                
                {/* Glass Box */}
                <div className="relative overflow-hidden rounded-2xl bg-black/1 backdrop-blur-md border border-white/10 p-6 transition-all duration-500 group-hover:bg-black/60 group-hover:border-purple-500/30 transform translate-y-4 group-hover:translate-y-0">
                  
                  {/* Decorative corner flash */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-purple-500/20 to-transparent -mr-8 -mt-8 rounded-full blur-xl group-hover:from-purple-500/40 transition-all"></div>

                  <p className="text-xs font-bold tracking-[0.2em] text-purple-400 uppercase mb-2">
                    {c.subtitle}
                  </p>
                  
                  <h3 className="text-2xl md:text-3xl font-black text-white uppercase leading-none mb-3 drop-shadow-lg">
                    {c.title}
                  </h3>

                  {/* Description - Slides in/Opacifies on hover */}
                  <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 ease-in-out delay-75">
                    <p className="text-sm text-gray-300 font-medium leading-relaxed pt-2 border-t border-white/10">
                      {c.desc}
                    </p>
                  </div>

                  {/* CTA Arrow */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                     <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </div>
                </div>
              </div>

            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
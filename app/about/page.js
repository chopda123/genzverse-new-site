

// app/about/page.js
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function About() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-dark-500 via-dark-400 to-dark-300">
          <div className="container-custom text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Our <span className="text-gradient">Story</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A 2-Year Journey of Independent Craftsmanship, Anime Obsession, and Relentless Quality
            </p>
          </div>
        </section>

        {/* Story Timeline */}
        <section className="section-padding bg-dark-400">
          <div className="container-custom max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-3xl font-heading font-bold mb-6">
                  From Akola to <span className="text-gradient">Anime Hearts</span>
                </h2>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  GenZverse was born just two years ago — not in a boardroom, but from countless late nights, sketchbooks filled with ideas, and an obsession with anime culture that went far beyond watching episodes.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  From sourcing fabric to printing, packing, and shipping — everything was done in-house. No shortcuts. No outsourcing the soul. Just a small, determined team learning the hard way what it truly means to build something from scratch.
                </p>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-accent-purple/20 to-accent-pink/20 rounded-2xl p-8 backdrop-blur-sm border border-accent-purple/30">
                  <div className="text-6xl mb-4"></div>
                  <h3 className="text-xl font-heading font-bold mb-2">The Independent Beginning</h3>
                  <p className="text-gray-300 text-sm">
                    Built from zero — driven by anime, discipline, and the courage to start
                  </p>
                </div>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent-purple rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">8</span>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-12">
              {/* Year 1-4 */}
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <div className="bg-dark-300 rounded-2xl p-6 border-l-4 border-accent-cyan">
                    <div className="text-accent-cyan font-bold text-lg mb-2">2023</div>
                    <h4 className="font-heading font-bold text-white mb-3">The First Drop</h4>
                    <p className="text-gray-400 text-sm">
                      Learning everything from scratch — fabric, fits, prints, failures, and feedback.
                    </p>
                  </div>
                </div>
                <div className="md:w-2/3 flex items-center">
                  <p className="text-gray-300 leading-relaxed">
                    Inspired by cult classics like <strong>Dorohedoro</strong> and <strong>Welcome to the N.H.K.</strong>, we didn't want loud merch. We wanted subtle references — designs that only true fans would recognize. Every mistake taught us something new, and every correction sharpened our vision.
                  </p>
                </div>
              </div>

              {/* Year 5-8 */}
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3 md:order-2">
                  <div className="bg-dark-300 rounded-2xl p-6 border-l-4 border-accent-purple">
                    <div className="text-accent-purple font-bold text-lg mb-2">2024</div>
                    <h4 className="font-heading font-bold text-white mb-3">Finding Our Tribe</h4>
                    <p className="text-gray-400 text-sm">
                      Connecting with anime fans who value quality, detail, and meaning.
                    </p>
                  </div>
                </div>
                <div className="md:w-2/3 flex items-center md:order-1">
                  <p className="text-gray-300 leading-relaxed">
                    From <strong>One Piece</strong> and <strong>Naruto</strong> to <strong>Dragon Ball Z</strong> — these weren't just shows, they were values: perseverance, loyalty, discipline. As newer stories like <strong>Solo Leveling</strong> emerged, they reflected our own journey — starting weak, learning fast, and leveling up with every challenge.
                  </p>
                </div>
              </div>

              {/* Present */}
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <div className="bg-dark-300 rounded-2xl p-6 border-l-4 border-accent-pink">
                    <div className="text-accent-pink font-bold text-lg mb-2">Present Day</div>
                    <h4 className="font-heading font-bold text-white mb-3">Still Independent. Still Obsessed.</h4>
                    <p className="text-gray-400 text-sm">
                      Designing, printing, and fulfilling every order ourselves — without compromise.
                    </p>
                  </div>
                </div>
                <div className="md:w-2/3 flex items-center">
                  <p className="text-gray-300 leading-relaxed">
                    Today, GenZverse stands as a fully independent anime apparel brand. No mass production. No diluted ideas. Just limited drops, obsessive attention to detail, and respect for the stories that shaped us. We don't chase trends — we build pieces that last.
                  </p>
                </div>
              </div>
            </div>

            {/* Mission Statement */}
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-accent-purple/10 to-accent-pink/10 rounded-2xl p-8 border border-accent-purple/20">
                <h3 className="text-2xl font-heading font-bold mb-4">
                  Our <span className="text-gradient">Mission</span>
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
                  To create anime-inspired apparel that respects the art, the fans, and the journey — crafted independently, worn proudly, and understood deeply by those who know.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        {/* <section className="section-padding bg-dark-500">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">2+</div>
                <div className="text-gray-400">Years Independent</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">1K+</div>
                <div className="text-gray-400">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">15+</div>
                <div className="text-gray-400">Unique Designs</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">70%</div>
                <div className="text-gray-400">In-House Crafted</div>
              </div>
            </div>
          </div>
        </section> */}
        
      </main>
      <Footer />
    </>
  )
}
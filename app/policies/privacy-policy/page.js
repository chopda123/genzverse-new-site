import Header from '../../../components/Header'
import Footer from '../../../components/Footer'

export const metadata = {
  title: 'Privacy Policy',
  description: 'Learn how GenZverse collects, uses, and protects your personal data.',
  robots: {
    index: false, // Legal pages usually don't need to be indexed high in search results
    follow: true,
  },
};

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-dark-500 text-white pt-32 pb-20">
        <div className="container-custom max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-8 text-accent-purple">Privacy Policy</h1>
          
          <div className="space-y-6 text-gray-300 leading-relaxed">
            <p>Last updated: January 10, 2026</p>
            
            <section>
              <h2 className="text-xl font-bold text-white mb-3">1. Information We Collect</h2>
              <p>We collect information you provide directly to us when you make a purchase, sign up for our newsletter, or contact us. This includes your name, email address, shipping address, and payment information.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">2. How We Use Your Information</h2>
              <p>We use your information to process your orders, send order confirmations, and provide customer support. We do not sell your personal data to third parties.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">3. Cookies</h2>
              <p>We use cookies to improve your browsing experience and analyze site traffic via Google Analytics.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">4. Contact Us</h2>
              <p>If you have questions about this policy, please contact us at <strong>genzverse.store@gmail.com</strong>.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
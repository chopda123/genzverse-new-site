import Header from '../../../components/Header'
import Footer from '../../../components/Footer'

export const metadata = {
  title: 'Refund & Return Policy',
  description: 'Our 7-day easy return and refund policy.',
  robots: { index: true, follow: true }, // Index this so customers trust you!
};

export default function RefundPolicy() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-dark-500 text-white pt-32 pb-20">
        <div className="container-custom max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-8 text-accent-pink">Refund & Return Policy</h1>
          
          <div className="space-y-6 text-gray-300 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-white mb-3">7-Day Easy Returns</h2>
              <p>We have a 7-day return policy, which means you have 7 days after receiving your item to request a return if the product is damaged or incorrect.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">Eligibility</h2>
              <p>To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">How to Start a Return</h2>
              <p>To start a return, you can contact us at <strong>genzverse.store@gmail.com</strong>. If your return is accepted, we will provide instructions on how and where to send your package.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">Refunds</h2>
              <p>We will notify you once we’ve received and inspected your return. If approved, you’ll be automatically refunded on your original payment method within 5-7 business days.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
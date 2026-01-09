export const metadata = {
  title: 'Terms of Service | GenZverse',
  description: 'Terms and conditions for using GenZverse.',
  robots: { index: false, follow: true },
};

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-dark-500 text-white pt-32 pb-20">
      <div className="container-custom max-w-4xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-8 text-accent-cyan">Terms of Service</h1>
        
        <div className="space-y-6 text-gray-300 leading-relaxed">
          <p>Last updated: January 10, 2026</p>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Acceptance of Terms</h2>
            <p>By accessing GenZverse.shop, you agree to be bound by these Terms of Service.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Products & Pricing</h2>
            <p>All products are subject to availability. Prices for our products are subject to change without notice. We reserve the right to discontinue any product at any time.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Shipping & Delivery</h2>
            <p>We ship across India. Delivery times are estimates and commence from the date of shipping, rather than the date of order.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Governing Law</h2>
            <p>These terms shall be governed by and defined following the laws of India. GenZverse and yourself irrevocably consent that the courts of India shall have exclusive jurisdiction to resolve any dispute.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
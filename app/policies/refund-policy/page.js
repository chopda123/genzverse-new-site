import Header from '../../../components/Header'
import Footer from '../../../components/Footer'

export const metadata = {
  title: 'Return & Exchange Policy | GenZverse',
  description: 'GenZverse offers a 7-day return and exchange policy. Returns and exchanges are free — no restocking fee, return label included. Applies to defective and non-defective products.',
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://www.genzverse.shop/policies/refund-policy',
  },
};

export default function RefundPolicy() {
  // MerchantReturnPolicy structured data — aligned with Google Merchant Center configuration
  const returnPolicyJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MerchantReturnPolicy',
    applicableCountry: 'IN',
    returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
    merchantReturnDays: 7,
    returnMethod: 'https://schema.org/ReturnByMail',
    returnFees: 'https://schema.org/FreeReturn',
    refundType: 'https://schema.org/FullRefund',
    merchantReturnLink: 'https://www.genzverse.shop/policies/refund-policy',
  };

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(returnPolicyJsonLd) }}
      />
      <main className="min-h-screen bg-dark-500 text-white pt-32 pb-20">
        <div className="container-custom max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-8 text-accent-pink">Return &amp; Exchange Policy</h1>

          <div className="space-y-6 text-gray-300 leading-relaxed">

            <section>
              <h2 className="text-xl font-bold text-white mb-3">7-Day Return &amp; Exchange Window</h2>
              <p>
                At GenZverse, we want you to be happy with your purchase. If you are not satisfied, you can request
                a return or exchange within <strong className="text-white">7 days</strong> of receiving your order.
                After the 7-day window has expired, return or exchange requests will not be accepted.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">Eligible Products</h2>
              <p className="mb-3">
                We accept returns and exchanges for <strong className="text-white">both defective and non-defective products</strong>.
                The policy applies to new and slightly used products. You can request a return or exchange for reasons such as:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>The size or fit is not right</li>
                <li>The colour is not what you expected</li>
                <li>You do not like how the product looks</li>
                <li>You are not satisfied with the product</li>
                <li>The product has a defect</li>
                <li>The wrong product was received</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">Return &amp; Exchange Cost</h2>
              <p>
                Returns and exchanges are <strong className="text-white">completely free</strong> for you.
                GenZverse will cover the return shipping cost — no restocking fee will be charged.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">Return Method</h2>
              <p>
                Returns and exchanges are handled <strong className="text-white">by mail</strong>. A prepaid return
                label is included as part of the return process at no additional cost to you.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">Exchange Policy</h2>
              <p>
                You may request an exchange within the 7-day window. If the requested replacement product or size
                is available, we will process the exchange promptly. If the replacement is unavailable, we will
                contact you and provide an appropriate alternative resolution.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">Refunds</h2>
              <p>
                Where a refund is applicable, GenZverse will process it after the returned product is received and
                reviewed. Refund processing time is <strong className="text-white">up to 7 days</strong>. Your
                payment provider or bank may require additional processing time before the refunded amount appears
                in your account.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">How to Start a Return or Exchange</h2>
              <p>
                To initiate a return or exchange, contact us at{' '}
                <strong className="text-white">genzverse.store@gmail.com</strong> within 7 days of receiving your
                order. Please include your order number and reason for the request. We will guide you through the
                next steps and provide your free return label.
              </p>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
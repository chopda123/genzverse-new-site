// app/products/[slug]/page.js
'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getProductBySlug } from '../../../data/products';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import ProductDetails from '../../../components/ProductDetails';
import { trackEvent } from '../../../utils/analytics';

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params?.slug) {
      const foundProduct = getProductBySlug(params.slug);
      setProduct(foundProduct);
      setLoading(false);
    }
  }, [params?.slug]);

  // Track product view analytics
  useEffect(() => {
    if (product) {
      trackEvent('product_view', {
        product_id: product.id,
        product_name: product.name,
        category: product.category,
      });
    }
  }, [product]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-500 text-white">
        <Header />
        <div className="pt-32 flex justify-center items-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-purple mx-auto"></div>
            <p className="mt-4 text-gray-400">Loading product...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-dark-500 text-white">
        <Header />
        <div className="pt-32 flex justify-center items-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Product Not Found</h1>
            <p className="text-gray-400">The product you're looking for doesn't exist.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-500 text-white">
      <Header />
      <ProductDetails product={product} />
      <Footer />
    </div>
  );
}
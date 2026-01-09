'use client';

import { useEffect } from 'react';
import { trackEvent } from '../../../utils/analytics';
import ProductDetails from '../../../components/ProductDetails';

export default function ProductView({ product }) {
  // Track product view analytics (Moved from original page)
  useEffect(() => {
    if (product) {
      trackEvent('product_view', {
        product_id: product.id,
        product_name: product.name,
        category: product.category,
      });
    }
  }, [product]);

  return <ProductDetails product={product} />;
}
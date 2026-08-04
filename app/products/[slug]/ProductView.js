'use client';

import { useEffect } from 'react';
import { trackViewItem } from '../../../utils/analytics';
import ProductDetails from '../../../components/ProductDetails';

export default function ProductView({ product }) {
  // GA4 Standard Ecommerce: view_item — fires when product detail page loads
  useEffect(() => {
    if (product) {
      trackViewItem(product);
    }
  }, [product]);

  return <ProductDetails product={product} />;
}
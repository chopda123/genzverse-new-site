



// data/products.js
export const products = [
  {
    id: 1,
    slug: "naruto-hokage-dreams",
    name: "Naruto Hokage Dreams",
    description: "Premium cotton t-shirt featuring Naruto's journey to become Hokage. Limited edition print with vibrant colors that last through countless washes.",
    price: 1299,
    originalPrice: 1599,
    images: [
      "/products/dan-1.png",
      "/products/dan-3.png",
      "/products/dan-2.png",
      "/products/dan-4.png"
    ],
    category: "Naruto",
    rating: 4.9,
    isNew: true,
    isLimited: true,
    stock: 8,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White", "Navy"],
    features: [
      "100% Premium Cotton",
      "DTG Printing Technology", 
      "Machine Wash Safe",
      "Limited Edition Design"
    ]
  },
  {
    id: 2,
    slug: "attack-on-titan-wings",
    name: "Attack on Titan Wings",
    description: "Limited edition Scout Regiment wings design on black premium tee. Show your allegiance to the Survey Corps with this exclusive design.",
    price: 1399,
    originalPrice: 1799,
    images: [
      "/products/man-1.png",
      "/products/man-3.png",
      "/products/man-2.png",
      "/products/man-4.png"
    ],
    category: "Attack on Titan",
    rating: 4.8,
    isNew: false,
    isLimited: true,
    stock: 5,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Charcoal"],
    features: [
      "Premium Black Cotton",
      "High-Detail Printing",
      "Oversized Fit Available",
      "Exclusive Design"
    ]
  },
  {
    id: 3,
    slug: "demon-slayer-water-style",
    name: "Demon Slayer Water Style",
    description: "Tanjiro's water breathing technique in vibrant colors. Experience the power of water breathing with this stunning design.",
    price: 1199,
    images: [
      "/products/zen-1.png",
      "/products/zen-2.png",
      
    ],
    category: "Demon Slayer",
    rating: 4.7,
    isNew: true,
    isLimited: false,
    stock: 15,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White", "Red"],
    features: [
      "Breathable Cotton",
      "Vibrant Color Print",
      "Regular Fit",
      "Machine Washable"
    ]
  },
  {
    id: 4,
    slug: "one-piece-straw-hat",
    name: "One Piece Straw Hat",
    description: "Luffy's iconic straw hat with the crew's jolly roger. Join the Straw Hat Pirates with this classic design.",
    price: 1249,
    originalPrice: 1499,
    images: [
     "/products/zoro1.png",
      "/products/zoro2.png",
      "/products/zoro3.png",
    ],
    category: "One Piece",
    rating: 4.9,
    isNew: false,
    isLimited: true,
    stock: 3,
    sizes: ["M", "L", "XL"],
    colors: ["Black", "Navy"],
    features: [
      "Classic Design",
      "Premium Fabric",
      "Crew Jolly Roger",
      "Limited Stock"
    ]
  },
  {
    id: 5,
    slug: "fift",
    name: "One Piece Straw Hat",
    description: "Luffy's iconic straw hat with the crew's jolly roger. Join the Straw Hat Pirates with this classic design.",
    price: 1249,
    originalPrice: 1499,
    images: [
     "/products/zenitsu-1.png",
      "/products/zenitsu-2.png",
      "/products/zenitsu-3.png",
    ],
    category: "Dragon Ball",
    rating: 4.9,
    isNew: false,
    isLimited: true,
    stock: 3,
    sizes: ["M", "L", "XL"],
    colors: ["Black", "Navy"],
    features: [
      "Classic Design",
      "Premium Fabric",
      "Crew Jolly Roger",
      "Limited Stock"
    ]
  }
];

export function getProductBySlug(slug) {
  return products.find(product => product.slug === slug);
}

export function getAllProducts() {
  return products;
}

export const categories = [
  'All',
  'Naruto',
  'Attack on Titan',
  'Demon Slayer',
  'One Piece',
  'Dragon Ball',
  'My Hero Academia',
  'Jujutsu Kaisen'
];
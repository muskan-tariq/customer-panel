export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  discount: number;
  rating: number;
  reviews: number;
  description: string;
  ingredients: string[];
  features: string[];
  images: string[];
  category: string;
  tag?: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Daily Duo Bundle",
    price: 2999,
    originalPrice: 3999,
    discount: 25,
    rating: 4.9,
    reviews: 128,
    description: "Our best-selling skincare duo for daily use. Perfect for all skin types. This bundle includes our gentle cleanser and hydrating moisturizer, everything you need for a basic daily skincare routine.",
    ingredients: [
      "Hyaluronic Acid",
      "Niacinamide",
      "Ceramides",
      "Vitamin E",
      "Natural Plant Extracts"
    ],
    features: [
      "24-Hour Hydration",
      "Suitable for All Skin Types",
      "Dermatologist Tested",
      "Cruelty-Free Formula"
    ],
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1374&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1576426863848-c21f53c60b19?q=80&w=1374&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1573461160327-b450ce3d8e7f?q=80&w=1374&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=1374&auto=format&fit=crop"
    ],
    category: "best-sellers"
  },
  {
    id: 2,
    name: "Complete Beauty Box",
    price: 3999,
    originalPrice: 4999,
    discount: 20,
    rating: 4.8,
    reviews: 156,
    description: "A complete skincare routine in one box. Everything you need for glowing skin. This comprehensive set includes cleanser, toner, serum, moisturizer, and sunscreen.",
    ingredients: [
      "Hyaluronic Acid",
      "Vitamin C",
      "Peptides",
      "Green Tea Extract",
      "Aloe Vera"
    ],
    features: [
      "Complete Skincare Solution",
      "Premium Ingredients",
      "Value for Money",
      "Perfect Gift Set"
    ],
    images: [
      "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?q=80&w=1374&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=1374&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?q=80&w=1374&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=1374&auto=format&fit=crop"
    ],
    category: "bundles"
  },
  {
    id: 3,
    name: "Intense Hydration Moisturizer",
    price: 899,
    originalPrice: 1299,
    discount: 30,
    rating: 4.8,
    reviews: 128,
    description: "Experience intense hydration with our premium moisturizer. This rich, non-greasy formula provides 24-hour hydration while strengthening your skin barrier.",
    ingredients: [
      "Hyaluronic Acid",
      "Ceramides",
      "Squalane",
      "Panthenol",
      "Glycerin"
    ],
    features: [
      "24-Hour Hydration",
      "Non-greasy Formula",
      "Suitable for All Skin Types",
      "Dermatologist Tested"
    ],
    images: [
      "https://www.tuffyorganics.com/cdn/shop/files/intense-hydration-bundle-2_1_400x.png?v=1699996289",
      "https://www.tuffyorganics.com/cdn/shop/products/SkinRescueBundle-web_400x.png?v=1675267403",
      "https://www.tuffyorganics.com/cdn/shop/products/rosaline---product-image2_1_400x.png?v=1676986731",
      "https://www.tuffyorganics.com/cdn/shop/files/Group1_400x.jpg?v=1690554340"
    ],
    category: "moisturizer"
  },
  {
    id: 4,
    name: "Vitamin C Brightening Serum",
    price: 1299,
    originalPrice: 1599,
    discount: 15,
    rating: 4.9,
    reviews: 245,
    description: "A powerful brightening serum that helps fade dark spots and even out skin tone. Formulated with stable Vitamin C and antioxidants for maximum efficacy.",
    ingredients: [
      "15% Vitamin C (L-Ascorbic Acid)",
      "Vitamin E",
      "Ferulic Acid",
      "Niacinamide",
      "Licorice Root Extract"
    ],
    features: [
      "Brightens Skin",
      "Fades Dark Spots",
      "Antioxidant Protection",
      "Stable Formula"
    ],
    images: [
      "https://www.tuffyorganics.com/cdn/shop/files/DSC6874_400x.png?v=1717482337",
      "https://www.tuffyorganics.com/cdn/shop/files/DSC6902_400x.png?v=1719389704",
      "https://www.tuffyorganics.com/cdn/shop/files/SPF-Power-Trio---product-image_400x.jpg?v=1682590509",
      "https://www.tuffyorganics.com/cdn/shop/products/001-WebImg_1_400x.png?v=1675257393"
    ],
    category: "serum",
    tag: "Best Seller"
  },
  {
    id: 5,
    name: "Hydrating Rose Toner",
    price: 899,
    originalPrice: 1199,
    discount: 25,
    rating: 5,
    reviews: 156,
    description: "A gentle, alcohol-free toner that balances skin's pH while hydrating and soothing.",
    ingredients: ["Rose Water", "Witch Hazel", "Aloe Vera", "Glycerin"],
    features: [
      "Balances pH",
      "Alcohol-Free",
      "Hydrating Formula",
      "Soothes Skin"
    ],
    images: [
      "https://www.tuffyorganics.com/cdn/shop/files/Group3_400x.jpg?v=1693310799",
      "https://www.tuffyorganics.com/cdn/shop/products/IMG_3058_400x.png?v=1661247380",
      "https://www.tuffyorganics.com/cdn/shop/products/IMG_3074_400x.png?v=1661247747",
      "https://m.media-amazon.com/images/S/mms-media-storage-prod/final/BrandPosts/brandPosts/f205d127-069d-4cd2-9184-8903a9f748c3/f620cf91-045f-4662-acd5-126ca90ef62c/media._SL480_.jpeg"
    ],
    category: "toner",
    tag: "Best Seller"
  },
  {
    id: 6,
    name: "Gentle Cleansing Face Wash",
    price: 799,
    originalPrice: 999,
    discount: 20,
    rating: 5,
    reviews: 156,
    description: "A gentle, non-stripping face wash that effectively removes impurities while maintaining skin's moisture.",
    ingredients: ["Glycerin", "Aloe Vera", "Chamomile Extract", "Green Tea"],
    features: [
      "Gentle Cleansing",
      "Non-Stripping",
      "pH Balanced",
      "Suitable for All Skin Types"
    ],
    images: [
      "https://ohlolly.com/cdn/shop/products/Urang_PurpleShieldEssence_Toner_7_1080x.jpg?v=1670464972",
      "https://images.pexels.com/photos/6223482/pexels-photo-6223482.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://i.pinimg.com/originals/ed/a9/6c/eda96c779e19e9ccd44bbf8954437e28.jpg",
      "https://mybrightbody.com/cdn/shop/products/Custom-Skin-Care-Ayurvedic-Skin-Care-Mask_1200x.jpg?v=1688654208"
    ],
    category: "face-wash",
    tag: "Best Seller"
  },
  {
    id: 7,
    name: "Daily Defense Sunscreen SPF 50",
    price: 999,
    originalPrice: 1299,
    discount: 23,
    rating: 4.9,
    reviews: 178,
    description: "A lightweight, non-greasy sunscreen that provides broad-spectrum protection against UVA and UVB rays while keeping your skin hydrated.",
    ingredients: [
      "Zinc Oxide",
      "Titanium Dioxide",
      "Hyaluronic Acid",
      "Vitamin E",
      "Green Tea Extract"
    ],
    features: [
      "SPF 50 Protection",
      "Non-greasy Formula",
      "Water-resistant",
      "No White Cast"
    ],
    images: [
      "https://www.tuffyorganics.com/cdn/shop/products/SPF-Power-Trio---product-image_400x.jpg?v=1682590509",
      "https://www.tuffyorganics.com/cdn/shop/products/001-WebImg_1_400x.png?v=1675257393",
      "https://www.tuffyorganics.com/cdn/shop/products/rosaline---product-image2_1_400x.png?v=1676986731",
      "https://www.tuffyorganics.com/cdn/shop/files/Group1_400x.jpg?v=1690554340"
    ],
    category: "sunscreen",
    tag: "Best Seller"
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === parseInt(id));
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getRelatedProducts = (category: string, currentProductId: number): Product[] => {
  return products
    .filter(product => product.category === category && product.id !== currentProductId)
    .slice(0, 4);
};

export default products; 
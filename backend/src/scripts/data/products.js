const products = [
  // Best Sellers
  {
    name: "Daily Duo Bundle",
    price: 973,
    originalPrice: 1498,
    discount: 35,
    rating: 4.8,
    numReviews: 651,
    description: "Our best-selling skincare duo for daily use. Perfect for all skin types.",
    ingredients: [
      "Hyaluronic Acid",
      "Niacinamide",
      "Ceramides",
      "Vitamin E"
    ],
    features: [
      "24-Hour Hydration",
      "Suitable for All Skin Types",
      "Dermatologist Tested"
    ],
    images: [
      "https://img.freepik.com/premium-psd/skin-care-moisturizing-cosmetic-premium-products_99236-254.jpg"
    ],
    category: "best-sellers",
    stock: 100,
    skinType: {
      normal: true,
      dry: true,
      oily: true,
      combination: true,
      sensitive: true
    },
    concern: {
      hydration: true,
      brightening: true
    }
  },
  {
    name: "Vitamin C Serum",
    price: 599,
    originalPrice: 799,
    discount: 25,
    rating: 4.7,
    numReviews: 428,
    description: "Powerful brightening serum with stable Vitamin C for radiant skin.",
    ingredients: [
      "Vitamin C",
      "Ferulic Acid",
      "Vitamin E",
      "Hyaluronic Acid"
    ],
    features: [
      "Brightens Skin",
      "Antioxidant Protection",
      "Fades Dark Spots"
    ],
    images: [
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXR5JTIwcHJvZHVjdHN8ZW58MHx8MHx8fDA%3D"
    ],
    category: "best-sellers",
    stock: 150
  },
  {
    name: "Hydrating Face Cream",
    price: 449,
    originalPrice: 599,
    discount: 25,
    rating: 4.9,
    numReviews: 312,
    description: "Rich, hydrating face cream for all-day moisture.",
    ingredients: [
      "Hyaluronic Acid",
      "Ceramides",
      "Glycerin",
      "Shea Butter"
    ],
    features: [
      "24-Hour Hydration",
      "Non-greasy Formula",
      "Suitable for All Skin Types"
    ],
    images: [
      "https://plus.unsplash.com/premium_photo-1661630984481-e29093921ff7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmVhdXR5JTIwcHJvZHVjdHN8ZW58MHx8MHx8fDA%3D"
    ],
    category: "best-sellers",
    stock: 200
  },
  {
    name: "Anti-Aging Night Cream",
    price: 799,
    originalPrice: 999,
    discount: 20,
    rating: 4.6,
    numReviews: 245,
    description: "Advanced anti-aging formula for overnight skin renewal.",
    ingredients: [
      "Retinol",
      "Peptides",
      "Niacinamide",
      "Ceramides"
    ],
    features: [
      "Reduces Fine Lines",
      "Firms Skin",
      "Overnight Renewal"
    ],
    images: [
      "https://images.pexels.com/photos/6621329/pexels-photo-6621329.jpeg"
    ],
    category: "best-sellers",
    stock: 120
  },
  {
    name: "Gentle Cleansing Foam",
    price: 349,
    originalPrice: 449,
    discount: 22,
    rating: 4.8,
    numReviews: 189,
    description: "Gentle, non-stripping cleanser for all skin types.",
    ingredients: [
      "Glycerin",
      "Aloe Vera",
      "Chamomile",
      "Green Tea"
    ],
    features: [
      "Gentle Cleansing",
      "pH Balanced",
      "Non-drying"
    ],
    images: [
      "https://images.pexels.com/photos/6621334/pexels-photo-6621334.jpeg"
    ],
    category: "best-sellers",
    stock: 180
  },
  {
    name: "Ultimate Skincare Bundle",
    price: 1499,
    originalPrice: 2499,
    discount: 40,
    rating: 4.9,
    numReviews: 523,
    description: "Complete skincare routine in one luxurious bundle.",
    ingredients: [
      "Various Premium Ingredients",
      "Hyaluronic Acid",
      "Vitamin C",
      "Retinol"
    ],
    features: [
      "Complete Routine",
      "Premium Products",
      "Great Value"
    ],
    images: [
      "https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=600"
    ],
    category: "best-sellers",
    isBundle: true,
    stock: 50
  },
  {
    name: "Brightening Eye Cream",
    price: 599,
    originalPrice: 749,
    discount: 20,
    rating: 4.7,
    numReviews: 167,
    description: "Targeted eye cream for dark circles and puffiness.",
    ingredients: [
      "Caffeine",
      "Vitamin K",
      "Peptides",
      "Hyaluronic Acid"
    ],
    features: [
      "Reduces Dark Circles",
      "Depuffs",
      "Hydrates"
    ],
    images: [
      "https://images.pexels.com/photos/6724350/pexels-photo-6724350.jpeg?auto=compress&cs=tinysrgb&w=600"
    ],
    category: "best-sellers",
    stock: 150
  },
  {
    name: "Lip Care Set",
    price: 299,
    originalPrice: 399,
    discount: 25,
    rating: 4.8,
    numReviews: 234,
    description: "Complete lip care routine for soft, smooth lips.",
    ingredients: [
      "Shea Butter",
      "Vitamin E",
      "Jojoba Oil",
      "Beeswax"
    ],
    features: [
      "Hydrates",
      "Protects",
      "Smooths"
    ],
    images: [
      "https://images.unsplash.com/photo-1564594326930-17381130fd2e?q=80&w=1470&auto=format&fit=crop"
    ],
    category: "best-sellers",
    stock: 200
  },
  {
    name: "Acne Treatment Gel",
    price: 449,
    originalPrice: 549,
    discount: 18,
    rating: 4.6,
    numReviews: 378,
    description: "Targeted treatment for acne and blemishes.",
    ingredients: [
      "Salicylic Acid",
      "Tea Tree Oil",
      "Niacinamide",
      "Aloe Vera"
    ],
    features: [
      "Treats Acne",
      "Prevents Breakouts",
      "Oil Control"
    ],
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1374&auto=format&fit=crop"
    ],
    category: "best-sellers",
    stock: 150
  },
  {
    name: "Sunscreen SPF 50",
    price: 499,
    originalPrice: 649,
    discount: 23,
    rating: 4.9,
    numReviews: 456,
    description: "Broad-spectrum protection with lightweight feel.",
    ingredients: [
      "Zinc Oxide",
      "Titanium Dioxide",
      "Vitamin E",
      "Green Tea"
    ],
    features: [
      "SPF 50 Protection",
      "Non-greasy",
      "No White Cast"
    ],
    images: [
      "https://images.unsplash.com/photo-1576426863848-c21f53c60b19?q=80&w=1374&auto=format&fit=crop"
    ],
    category: "best-sellers",
    stock: 180
  },
  {
    name: "Collagen Boost Serum",
    price: 899,
    originalPrice: 1199,
    discount: 25,
    rating: 4.8,
    numReviews: 289,
    description: "Advanced serum for skin firmness and elasticity.",
    ingredients: [
      "Peptides",
      "Collagen",
      "Vitamin C",
      "Hyaluronic Acid"
    ],
    features: [
      "Firms Skin",
      "Boosts Collagen",
      "Anti-aging"
    ],
    images: [
      "https://images.unsplash.com/photo-1573461160327-b450ce3d8e7f?q=80&w=1374&auto=format&fit=crop"
    ],
    category: "best-sellers",
    stock: 120
  },
  {
    name: "Hydrating Toner",
    price: 399,
    originalPrice: 499,
    discount: 20,
    rating: 4.7,
    numReviews: 178,
    description: "Alcohol-free toner for balanced, hydrated skin.",
    ingredients: [
      "Rose Water",
      "Glycerin",
      "Hyaluronic Acid",
      "Chamomile"
    ],
    features: [
      "Hydrates",
      "Balances pH",
      "Soothes"
    ],
    images: [
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=1374&auto=format&fit=crop"
    ],
    category: "best-sellers",
    stock: 200
  },
  // ... [Continuing with the remaining products]
  {
    name: "Beauty Sleep Bundle",
    price: 1299,
    originalPrice: 1999,
    discount: 35,
    rating: 4.9,
    numReviews: 423,
    description: "Complete nighttime skincare routine.",
    ingredients: [
      "Retinol",
      "Peptides",
      "Ceramides",
      "Hyaluronic Acid"
    ],
    features: [
      "Overnight Renewal",
      "Anti-aging",
      "Deep Hydration"
    ],
    images: [
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=1374&auto=format&fit=crop"
    ],
    category: "best-sellers",
    isBundle: true,
    stock: 80
  },
  // ... [Continue adding the remaining products with similar structure]
  {
    name: "Pore Minimizing Mask",
    price: 549,
    originalPrice: 699,
    discount: 21,
    rating: 4.8,
    numReviews: 156,
    description: "Deep cleansing mask that minimizes pores and purifies skin.",
    ingredients: [
      "Kaolin Clay",
      "Charcoal",
      "Niacinamide",
      "Tea Tree Oil"
    ],
    features: [
      "Minimizes Pores",
      "Deep Cleansing",
      "Oil Control"
    ],
    images: [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=1374&auto=format&fit=crop"
    ],
    category: "best-sellers",
    stock: 150
  },
  {
    name: "Lip Plumping Gloss",
    price: 299,
    originalPrice: 399,
    discount: 25,
    rating: 4.7,
    numReviews: 267,
    description: "Volumizing lip gloss for fuller, hydrated lips.",
    ingredients: [
      "Peptides",
      "Hyaluronic Acid",
      "Vitamin E",
      "Natural Oils"
    ],
    features: [
      "Plumps Lips",
      "Hydrates",
      "Glossy Finish"
    ],
    images: [
      "https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=1374&auto=format&fit=crop"
    ],
    category: "best-sellers",
    stock: 200
  },
  {
    name: "Retinol Night Serum",
    price: 799,
    originalPrice: 999,
    discount: 20,
    rating: 4.9,
    numReviews: 345,
    description: "Advanced retinol serum for overnight skin renewal.",
    ingredients: [
      "Retinol",
      "Peptides",
      "Ceramides",
      "Niacinamide"
    ],
    features: [
      "Anti-aging",
      "Skin Renewal",
      "Reduces Fine Lines"
    ],
    images: [
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=1374&auto=format&fit=crop"
    ],
    category: "best-sellers",
    stock: 120
  },
  {
    name: "Glow Boost Kit",
    price: 1099,
    originalPrice: 1599,
    discount: 31,
    rating: 4.8,
    numReviews: 412,
    description: "Complete kit for radiant, glowing skin.",
    ingredients: [
      "Vitamin C",
      "AHA/BHA",
      "Niacinamide",
      "Hyaluronic Acid"
    ],
    features: [
      "Brightens",
      "Exfoliates",
      "Hydrates"
    ],
    images: [
      "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?q=80&w=1374&auto=format&fit=crop"
    ],
    category: "best-sellers",
    isBundle: true,
    stock: 100
  },
  {
    name: "Exfoliating Scrub",
    price: 449,
    originalPrice: 549,
    discount: 18,
    rating: 4.7,
    numReviews: 198,
    description: "Gentle exfoliating scrub for smooth, renewed skin.",
    ingredients: [
      "Jojoba Beads",
      "Glycolic Acid",
      "Aloe Vera",
      "Green Tea"
    ],
    features: [
      "Gentle Exfoliation",
      "Smooths Skin",
      "Non-irritating"
    ],
    images: [
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=1374&auto=format&fit=crop"
    ],
    category: "best-sellers",
    stock: 180
  },
  {
    name: "Moisturizing Hand Cream",
    price: 249,
    originalPrice: 299,
    discount: 17,
    rating: 4.6,
    numReviews: 145,
    description: "Rich hand cream for soft, nourished hands.",
    ingredients: [
      "Shea Butter",
      "Glycerin",
      "Vitamin E",
      "Aloe Vera"
    ],
    features: [
      "Deep Hydration",
      "Non-greasy",
      "Fast-absorbing"
    ],
    images: [
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?q=80&w=1374&auto=format&fit=crop"
    ],
    category: "best-sellers",
    stock: 250
  },
  {
    name: "Anti-Dark Spot Serum",
    price: 699,
    originalPrice: 899,
    discount: 22,
    rating: 4.8,
    numReviews: 278,
    description: "Targeted treatment for dark spots and hyperpigmentation.",
    ingredients: [
      "Kojic Acid",
      "Vitamin C",
      "Alpha Arbutin",
      "Niacinamide"
    ],
    features: [
      "Fades Dark Spots",
      "Evens Skin Tone",
      "Brightens"
    ],
    images: [
      "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=1374&auto=format&fit=crop"
    ],
    category: "best-sellers",
    stock: 150
  },
  {
    name: "Hydrating Sheet Masks Set",
    price: 399,
    originalPrice: 499,
    discount: 20,
    rating: 4.7,
    numReviews: 167,
    description: "Set of hydrating sheet masks for instant glow.",
    ingredients: [
      "Hyaluronic Acid",
      "Ceramides",
      "Green Tea",
      "Peptides"
    ],
    features: [
      "Intense Hydration",
      "Instant Glow",
      "Soothes Skin"
    ],
    images: [
      "https://images.unsplash.com/photo-1567721913486-6585f069b332?q=80&w=1374&auto=format&fit=crop"
    ],
    category: "best-sellers",
    stock: 200
  },
  {
    name: "Neck Firming Cream",
    price: 599,
    originalPrice: 799,
    discount: 25,
    rating: 4.8,
    numReviews: 189,
    description: "Specialized cream for firming neck and décolletage area.",
    ingredients: [
      "Peptides",
      "Retinol",
      "Hyaluronic Acid",
      "Vitamin E"
    ],
    features: [
      "Firms Skin",
      "Reduces Lines",
      "Hydrates"
    ],
    images: [
      "https://images.unsplash.com/photo-1556227834-09f1de7a7d14?q=80&w=1374&auto=format&fit=crop"
    ],
    category: "best-sellers",
    stock: 120
  },
  {
    name: "Complete Beauty Box",
    price: 1999,
    originalPrice: 2999,
    discount: 33,
    rating: 4.9,
    numReviews: 534,
    description: "Luxury beauty box with full skincare routine.",
    ingredients: [
      "Various Premium Ingredients",
      "Vitamin C",
      "Retinol",
      "Hyaluronic Acid"
    ],
    features: [
      "Complete Routine",
      "Premium Products",
      "Great Value"
    ],
    images: [
      "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?q=80&w=1374&auto=format&fit=crop"
    ],
    category: "best-sellers",
    isBundle: true,
    stock: 80
  },
  {
    name: "Hyaluronic Acid Serum",
    price: 649,
    originalPrice: 849,
    discount: 24,
    rating: 4.8,
    numReviews: 367,
    description: "Intense hydrating serum for plump, moisturized skin.",
    ingredients: [
      "Hyaluronic Acid",
      "B5",
      "Glycerin",
      "Peptides"
    ],
    features: [
      "Deep Hydration",
      "Plumps Skin",
      "Anti-aging"
    ],
    images: [
      "https://images.unsplash.com/photo-1592136957897-b2b6ca21e10d?q=80&w=1374&auto=format&fit=crop"
    ],
    category: "best-sellers",
    stock: 150
  },
  // Bundles and Deals
  {
    name: "Glow Essentials Duo Kit",
    price: 1899,
    originalPrice: 2499,
    discount: 25,
    rating: 4.8,
    numReviews: 128,
    description: "Essential skincare duo for a natural, healthy glow.",
    images: ["https://www.tuffyorganics.com/cdn/shop/products/Web_pic001_400x.png?v=1671778694"],
    category: "bundles",
    tag: "Best Value",
    isBundle: true,
    stock: 50
  },
  {
    name: "Hydration Trio Set",
    price: 2499,
    originalPrice: 3299,
    discount: 30,
    rating: 4.9,
    numReviews: 95,
    description: "Triple-action hydration set for ultimate moisture.",
    images: ["https://www.tuffyorganics.com/cdn/shop/products/rosaline---product-image2_1_400x.png?v=1676986731"],
    category: "bundles",
    tag: "Most Popular",
    isBundle: true,
    stock: 45
  },
  {
    name: "Anti-Aging Power Pack",
    price: 3299,
    originalPrice: 4499,
    discount: 35,
    rating: 4.7,
    numReviews: 76,
    description: "Comprehensive anti-aging skincare bundle.",
    images: ["https://www.tuffyorganics.com/cdn/shop/products/SkinRescueBundle-web_400x.png?v=1675267403"],
    category: "bundles",
    tag: "Limited Edition",
    isBundle: true,
    stock: 30
  },
  {
    name: "Brightening Duo Kit",
    price: 1699,
    originalPrice: 2299,
    discount: 30,
    rating: 4.8,
    numReviews: 112,
    description: "Powerful duo for brighter, more radiant skin.",
    images: ["https://www.tuffyorganics.com/cdn/shop/files/Group1_400x.jpg?v=1690554340"],
    category: "bundles",
    isBundle: true,
    stock: 55
  },
  {
    name: "Acne Control Value Set",
    price: 2199,
    originalPrice: 2999,
    discount: 40,
    rating: 4.6,
    numReviews: 89,
    description: "Complete acne control system for clear skin.",
    images: ["https://www.tuffyorganics.com/cdn/shop/products/Tinted-Lip-Treat-Bundle--product-image_400x.jpg?v=1681979111"],
    category: "bundles",
    tag: "New",
    isBundle: true,
    stock: 40
  },
  {
    name: "Complete Skincare Bundle",
    price: 4499,
    originalPrice: 5999,
    discount: 45,
    rating: 4.9,
    numReviews: 154,
    description: "All-in-one skincare solution for perfect skin.",
    images: ["https://www.tuffyorganics.com/cdn/shop/files/hair-essential-duo---product-image-01_400x.jpg?v=1687524443"],
    category: "bundles",
    tag: "Best Seller",
    isBundle: true,
    stock: 25
  },
  {
    name: "Morning Routine Trio",
    price: 2799,
    originalPrice: 3599,
    discount: 35,
    rating: 4.7,
    numReviews: 67,
    description: "Essential morning skincare routine in one set.",
    images: ["https://www.tuffyorganics.com/cdn/shop/products/finalmas_400x.jpg?v=1667896859"],
    category: "bundles",
    isBundle: true,
    stock: 35
  },
  {
    name: "Night Care Duo Kit",
    price: 1999,
    originalPrice: 2599,
    discount: 30,
    rating: 4.8,
    numReviews: 93,
    description: "Perfect pair for overnight skin renewal.",
    images: ["https://www.tuffyorganics.com/cdn/shop/files/DSC6372_400x.png?v=1716401109"],
    category: "bundles",
    tag: "Trending",
    isBundle: true,
    stock: 45
  },
  {
    name: "Luxury Skincare Collection",
    price: 5999,
    originalPrice: 7999,
    discount: 40,
    rating: 4.9,
    numReviews: 45,
    description: "Premium skincare collection for luxurious treatment.",
    images: ["https://www.tuffyorganics.com/cdn/shop/products/PicturePerfect_400x.png?v=1643889395"],
    category: "bundles",
    tag: "Premium",
    isBundle: true,
    stock: 20
  },
  {
    name: "Sensitive Skin Duo",
    price: 1799,
    originalPrice: 2399,
    discount: 25,
    rating: 4.7,
    numReviews: 78,
    description: "Gentle care duo for sensitive skin types.",
    images: ["https://www.tuffyorganics.com/cdn/shop/products/serum-duo---product-image2_400x.png?v=1678266108"],
    category: "bundles",
    isBundle: true,
    stock: 50
  },
  {
    name: "Pore Care Bundle",
    price: 2299,
    originalPrice: 2999,
    discount: 30,
    rating: 4.6,
    numReviews: 112,
    description: "Complete pore care and minimizing system.",
    images: ["https://www.tuffyorganics.com/cdn/shop/products/Ad-6webcopy_400x.jpg?v=1666955126"],
    category: "bundles",
    tag: "Popular",
    isBundle: true,
    stock: 40
  },
  {
    name: "Vitamin C Power Set",
    price: 2699,
    originalPrice: 3499,
    discount: 35,
    rating: 4.8,
    numReviews: 89,
    description: "Powerful vitamin C collection for bright skin.",
    images: ["https://www.tuffyorganics.com/cdn/shop/files/intense-hydration-bundle-2_1_400x.png?v=1699996289"],
    category: "bundles",
    isBundle: true,
    stock: 35
  },
  {
    name: "Ultimate Glow Kit",
    price: 3999,
    originalPrice: 5299,
    discount: 40,
    rating: 4.9,
    numReviews: 156,
    description: "Complete kit for achieving the ultimate glow.",
    images: ["https://www.tuffyorganics.com/cdn/shop/products/ultimate-skin-corrector-bundle---product-image_400x.png?v=1677241431"],
    category: "bundles",
    tag: "Best Value",
    isBundle: true,
    stock: 30
  },
  {
    name: "Hydration Heroes Set",
    price: 2899,
    originalPrice: 3799,
    discount: 30,
    rating: 4.7,
    numReviews: 92,
    description: "Collection of hydration-focused products.",
    images: ["https://www.tuffyorganics.com/cdn/shop/products/Saga_Rapid_Essential_400x.png?v=1675278467"],
    category: "bundles",
    isBundle: true,
    stock: 40
  },
  {
    name: "Radiance Boost Duo",
    price: 1999,
    originalPrice: 2599,
    discount: 25,
    rating: 4.6,
    numReviews: 78,
    description: "Duo set for boosting skin radiance.",
    images: ["https://www.tuffyorganics.com/cdn/shop/files/rn-image_picker_lib_temp_b70d48be-e9f7-4dff-9083-9759bb65205f_400x.png?v=1714890118"],
    category: "bundles",
    isBundle: true,
    stock: 45
  },
  {
    name: "Anti-Aging Essentials",
    price: 4299,
    originalPrice: 5699,
    discount: 35,
    rating: 4.8,
    numReviews: 134,
    description: "Essential anti-aging collection.",
    images: ["https://www.tuffyorganics.com/cdn/shop/files/DSC6372_400x.png?v=1716401109"],
    category: "bundles",
    tag: "Premium",
    isBundle: true,
    stock: 25
  },
  {
    name: "Clear Skin Bundle",
    price: 2499,
    originalPrice: 3299,
    discount: 30,
    rating: 4.7,
    numReviews: 167,
    description: "Complete system for achieving clear skin.",
    images: ["https://www.tuffyorganics.com/cdn/shop/products/Web_pic002_400x.png?v=1671778864"],
    category: "bundles",
    tag: "Popular",
    isBundle: true,
    stock: 35
  },
  {
    name: "Daily Essentials Kit",
    price: 1899,
    originalPrice: 2499,
    discount: 25,
    rating: 4.6,
    numReviews: 89,
    description: "Essential daily skincare kit.",
    images: ["https://www.tuffyorganics.com/cdn/shop/files/IMG-8316_73366387-5f49-45c0-b48c-4f74bcc57864_400x.jpg?v=1700684078"],
    category: "bundles",
    isBundle: true,
    stock: 50
  },
  {
    name: "Luxury Night Care Set",
    price: 3799,
    originalPrice: 4999,
    discount: 35,
    rating: 4.9,
    numReviews: 112,
    description: "Luxury collection for nighttime skincare.",
    images: ["https://www.tuffyorganics.com/cdn/shop/products/TintTrio_img_400x.png?v=1675627371"],
    category: "bundles",
    tag: "Limited Edition",
    isBundle: true,
    stock: 30
  },
  {
    name: "Complete Beauty Bundle",
    price: 5999,
    originalPrice: 7999,
    discount: 40,
    rating: 4.8,
    numReviews: 178,
    description: "Complete beauty and skincare collection.",
    images: ["https://www.tuffyorganics.com/cdn/shop/products/FuchsiaDuo-web_400x.png?v=1675239814"],
    category: "bundles",
    tag: "Best Seller",
    isBundle: true,
    stock: 25
  },
  // Face Wash Products
  {
    name: "Gentle Cleansing Face Wash",
    price: 799,
    originalPrice: 999,
    discount: 20,
    rating: 5,
    numReviews: 156,
    description: "A gentle, non-stripping face wash suitable for all skin types.",
    ingredients: [
      "Aloe Vera",
      "Glycerin",
      "Chamomile Extract",
      "Green Tea Extract"
    ],
    features: [
      "Gentle Cleansing",
      "pH Balanced",
      "Non-drying",
      "Suitable for All Skin Types"
    ],
    images: ["https://ohlolly.com/cdn/shop/products/Urang_PurpleShieldEssence_Toner_7_1080x.jpg?v=1670464972"],
    category: "facewash",
    tag: "Best Seller",
    stock: 100
  },
  {
    name: "Tea Tree Oil Face Wash",
    price: 849,
    originalPrice: 1099,
    discount: 23,
    rating: 5,
    numReviews: 142,
    description: "Purifying face wash with natural tea tree oil for clear skin.",
    ingredients: [
      "Tea Tree Oil",
      "Salicylic Acid",
      "Niacinamide",
      "Aloe Vera"
    ],
    features: [
      "Controls Acne",
      "Purifies Skin",
      "Oil Control",
      "Antibacterial Properties"
    ],
    images: ["https://images.pexels.com/photos/6223482/pexels-photo-6223482.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"],
    category: "facewash",
    tag: "Popular",
    stock: 85
  },
  {
    name: "Neem & Tulsi Face Wash",
    price: 699,
    originalPrice: 899,
    discount: 22,
    rating: 5,
    numReviews: 128,
    description: "Natural face wash with the goodness of neem and tulsi.",
    ingredients: [
      "Neem Extract",
      "Tulsi Extract",
      "Glycerin",
      "Aloe Vera"
    ],
    features: [
      "Natural Ingredients",
      "Antibacterial",
      "Purifying",
      "Suitable for Acne-Prone Skin"
    ],
    images: ["https://i.pinimg.com/originals/ed/a9/6c/eda96c779e19e9ccd44bbf8954437e28.jpg"],
    category: "facewash",
    tag: "New",
    stock: 90
  },
  {
    name: "Charcoal Deep Clean Face Wash",
    price: 899,
    originalPrice: 1199,
    discount: 25,
    rating: 5,
    numReviews: 98,
    description: "Deep cleansing face wash with activated charcoal.",
    ingredients: [
      "Activated Charcoal",
      "Salicylic Acid",
      "Tea Tree Oil",
      "Kaolin Clay"
    ],
    features: [
      "Deep Cleansing",
      "Removes Impurities",
      "Unclogs Pores",
      "Detoxifying"
    ],
    images: ["https://mybrightbody.com/cdn/shop/products/Custom-Skin-Care-Ayurvedic-Skin-Care-Mask_1200x.jpg?v=1688654208"],
    category: "facewash",
    tag: "Best Seller",
    stock: 75
  },
  {
    name: "Vitamin C Brightening Face Wash",
    price: 999,
    originalPrice: 1299,
    discount: 23,
    rating: 5,
    numReviews: 87,
    description: "Brightening face wash enriched with Vitamin C.",
    ingredients: [
      "Vitamin C",
      "Citrus Extracts",
      "Niacinamide",
      "Glycerin"
    ],
    features: [
      "Brightening",
      "Antioxidant Protection",
      "Gentle Cleansing",
      "Evens Skin Tone"
    ],
    images: ["https://venusaesthetics.pk/cdn/shop/files/DSC07626-Edit.jpg?v=1713219120"],
    category: "facewash",
    stock: 80
  },
  {
    name: "Aloe Vera Soothing Face Wash",
    price: 749,
    originalPrice: 999,
    discount: 25,
    rating: 5,
    numReviews: 76,
    description: "Soothing face wash with pure aloe vera extract.",
    ingredients: [
      "Aloe Vera Extract",
      "Cucumber Extract",
      "Chamomile",
      "Vitamin E"
    ],
    features: [
      "Soothing",
      "Calming",
      "Hydrating",
      "Gentle Cleansing"
    ],
    images: ["https://www.tuffyorganics.com/cdn/shop/files/airbrush-facewash---product-image2_400x.jpg?v=1685018215"],
    category: "facewash",
    tag: "Popular",
    stock: 95
  },
  {
    name: "Anti-Acne Face Wash",
    price: 899,
    originalPrice: 1199,
    discount: 25,
    rating: 5,
    numReviews: 65,
    description: "Targeted face wash for acne-prone skin.",
    ingredients: [
      "Salicylic Acid",
      "Tea Tree Oil",
      "Niacinamide",
      "Zinc PCA"
    ],
    features: [
      "Treats Acne",
      "Controls Oil",
      "Prevents Breakouts",
      "Unclogs Pores"
    ],
    images: ["https://www.nirvanabotanics.com/cdn/shop/files/Glass-Skin-Bundle_06.jpg?v=1726493004"],
    category: "facewash",
    stock: 70
  },
  {
    name: "Cucumber Fresh Face Wash",
    price: 799,
    originalPrice: 999,
    discount: 20,
    rating: 5,
    numReviews: 54,
    description: "Refreshing face wash with cucumber extract.",
    ingredients: [
      "Cucumber Extract",
      "Mint Extract",
      "Aloe Vera",
      "Vitamin B5"
    ],
    features: [
      "Refreshing",
      "Cooling",
      "Hydrating",
      "Oil Control"
    ],
    images: ["https://www.nirvanabotanics.com/cdn/shop/files/glowtonerpakistan.png?v=1717598847&width=1080"],
    category: "facewash",
    stock: 85
  },
  {
    name: "Daily Care Face Wash Duo",
    price: 1499,
    originalPrice: 1899,
    discount: 21,
    rating: 5,
    numReviews: 43,
    description: "Value pack of two complementary face washes.",
    ingredients: [
      "Various Active Ingredients",
      "Natural Extracts",
      "Vitamins",
      "Antioxidants"
    ],
    features: [
      "Day & Night Care",
      "Value Pack",
      "Complete Cleansing",
      "Suitable for All Skin Types"
    ],
    images: ["https://glowbeauty.pk/cdn/shop/files/nirvana-botanics-skin-care-nirvana-botanics-brightening-serum-30ml-40289815134465_1200x.png?v=1718270849"],
    category: "facewash",
    tag: "Value Pack",
    stock: 60
  },
  {
    name: "Complete Face Care Collection",
    price: 3999,
    originalPrice: 4999,
    discount: 20,
    rating: 5,
    numReviews: 32,
    description: "Complete collection of face care products.",
    ingredients: [
      "Multiple Active Ingredients",
      "Natural Extracts",
      "Essential Oils",
      "Vitamins"
    ],
    features: [
      "Complete Skincare",
      "Multiple Products",
      "Value Bundle",
      "All Skin Types"
    ],
    images: ["https://www.petuniaskincare.com/cdn/shop/products/DPM_1-96_600x.jpg?v=1632964856"],
    category: "facewash",
    tag: "Bundle",
    stock: 40
  },
  // Moisturizer Products
  {
    name: "Intense Hydration Moisturizer",
    price: 899,
    originalPrice: 1299,
    discount: 30,
    rating: 4.8,
    numReviews: 128,
    description: "Deeply hydrating moisturizer for intense skin nourishment.",
    ingredients: [
      "Hyaluronic Acid",
      "Ceramides",
      "Glycerin",
      "Vitamin E"
    ],
    features: [
      "24-Hour Hydration",
      "Non-greasy Formula",
      "Suitable for Dry Skin",
      "Dermatologist Tested"
    ],
    images: ["https://www.tuffyorganics.com/cdn/shop/files/intense-hydration-bundle-2_1_400x.png?v=1699996289"],
    category: "moisturizer",
    tag: "Best Seller",
    stock: 100
  },
  {
    name: "Skin Rescue Bundle",
    price: 999,
    originalPrice: 1499,
    discount: 33,
    rating: 4.9,
    numReviews: 95,
    description: "Complete skin rescue system for damaged skin.",
    ingredients: [
      "Peptides",
      "Niacinamide",
      "Panthenol",
      "Centella Asiatica"
    ],
    features: [
      "Skin Repair",
      "Barrier Protection",
      "Soothing Formula",
      "Anti-inflammatory"
    ],
    images: ["https://www.tuffyorganics.com/cdn/shop/products/SkinRescueBundle-web_400x.png?v=1675267403"],
    category: "moisturizer",
    tag: "Most Popular",
    stock: 85
  },
  {
    name: "Rosaline Moisturizer",
    price: 799,
    originalPrice: 1199,
    discount: 33,
    rating: 4.7,
    numReviews: 76,
    description: "Calming moisturizer specially formulated for sensitive skin.",
    ingredients: [
      "Rose Extract",
      "Calendula",
      "Aloe Vera",
      "Chamomile"
    ],
    features: [
      "Calms Redness",
      "Soothes Irritation",
      "Gentle Formula",
      "For Sensitive Skin"
    ],
    images: ["https://www.tuffyorganics.com/cdn/shop/products/rosaline---product-image2_1_400x.png?v=1676986731"],
    category: "moisturizer",
    tag: "New",
    stock: 90
  },
  {
    name: "Moisturizer Bundle",
    price: 1299,
    originalPrice: 1799,
    discount: 28,
    rating: 4.8,
    numReviews: 112,
    description: "Comprehensive moisturizing bundle for complete skin care.",
    ingredients: [
      "Multiple Active Ingredients",
      "Natural Extracts",
      "Vitamins",
      "Antioxidants"
    ],
    features: [
      "Complete Care",
      "Day & Night Use",
      "Value Pack",
      "All Skin Types"
    ],
    images: ["https://www.tuffyorganics.com/cdn/shop/files/Group1_400x.jpg?v=1690554340"],
    category: "moisturizer",
    stock: 75
  },
  {
    name: "Tinted Lip Treatment Bundle",
    price: 849,
    originalPrice: 1199,
    discount: 29,
    rating: 4.6,
    numReviews: 89,
    description: "Moisturizing lip treatment with a natural tint.",
    ingredients: [
      "Shea Butter",
      "Jojoba Oil",
      "Natural Tints",
      "Vitamin E"
    ],
    features: [
      "Moisturizing",
      "Natural Tint",
      "Long-lasting",
      "Nourishing"
    ],
    images: ["https://www.tuffyorganics.com/cdn/shop/products/Tinted-Lip-Treat-Bundle--product-image_400x.jpg?v=1681979111"],
    category: "moisturizer",
    tag: "Limited Edition",
    stock: 80
  },
  {
    name: "Hair Essential Duo",
    price: 1099,
    originalPrice: 1599,
    discount: 31,
    rating: 4.9,
    numReviews: 154,
    description: "Essential moisturizing duo for hair and scalp care.",
    ingredients: [
      "Argan Oil",
      "Keratin",
      "Biotin",
      "Panthenol"
    ],
    features: [
      "Hair Hydration",
      "Scalp Care",
      "Strengthening",
      "Anti-frizz"
    ],
    images: ["https://www.tuffyorganics.com/cdn/shop/files/hair-essential-duo---product-image-01_400x.jpg?v=1687524443"],
    category: "moisturizer",
    tag: "Popular",
    stock: 95
  },
  {
    name: "Final Mas Bundle",
    price: 949,
    originalPrice: 1399,
    discount: 32,
    rating: 4.7,
    numReviews: 67,
    description: "Ultimate moisturizing bundle for complete skin transformation.",
    ingredients: [
      "Premium Ingredients",
      "Natural Extracts",
      "Essential Oils",
      "Peptides"
    ],
    features: [
      "Complete Care",
      "Transformative Results",
      "Luxury Formula",
      "All Skin Types"
    ],
    images: ["https://www.tuffyorganics.com/cdn/shop/products/finalmas_400x.jpg?v=1667896859"],
    category: "moisturizer",
    stock: 70
  },
  {
    name: "Saga Rapid Essential",
    price: 1199,
    originalPrice: 1699,
    discount: 29,
    rating: 4.8,
    numReviews: 93,
    description: "Fast-acting anti-aging moisturizer for visible results.",
    ingredients: [
      "Retinol",
      "Peptides",
      "Collagen",
      "Hyaluronic Acid"
    ],
    features: [
      "Rapid Results",
      "Anti-aging",
      "Firming",
      "Wrinkle Reduction"
    ],
    images: ["https://www.tuffyorganics.com/cdn/shop/products/Saga_Rapid_Essential_400x.png?v=1675278467"],
    category: "moisturizer",
    tag: "Anti-Aging",
    stock: 85
  },
  {
    name: "Ultimate Skin Corrector Bundle",
    price: 749,
    originalPrice: 999,
    discount: 25,
    rating: 4.6,
    numReviews: 45,
    description: "Comprehensive skin correcting and moisturizing system.",
    ingredients: [
      "Niacinamide",
      "Alpha Arbutin",
      "Vitamin C",
      "Licorice Extract"
    ],
    features: [
      "Corrects Dark Spots",
      "Evens Skin Tone",
      "Brightening",
      "Hydrating"
    ],
    images: ["https://www.tuffyorganics.com/cdn/shop/products/ultimate-skin-corrector-bundle---product-image_400x.png?v=1677241431"],
    category: "moisturizer",
    stock: 60
  },
  {
    name: "DSC Bundle",
    price: 1399,
    originalPrice: 1999,
    discount: 30,
    rating: 4.9,
    numReviews: 78,
    description: "Premium moisturizing bundle for luxurious skincare.",
    ingredients: [
      "Luxury Ingredients",
      "Rare Extracts",
      "Premium Oils",
      "Advanced Peptides"
    ],
    features: [
      "Luxury Care",
      "Premium Formula",
      "Advanced Results",
      "Professional Grade"
    ],
    images: ["https://www.tuffyorganics.com/cdn/shop/files/DSC6372_400x.png?v=1716401109"],
    category: "moisturizer",
    tag: "Premium",
    stock: 40
  },
  // Serum Products
  {
    name: "Vitamin C + E Serum",
    price: 1299,
    originalPrice: 1599,
    discount: 19,
    rating: 5,
    numReviews: 124,
    description: "Powerful antioxidant serum with Vitamin C and E for brighter skin.",
    ingredients: [
      "Vitamin C (L-Ascorbic Acid)",
      "Vitamin E (Tocopherol)",
      "Ferulic Acid",
      "Hyaluronic Acid"
    ],
    features: [
      "Brightens Skin",
      "Antioxidant Protection",
      "Fades Dark Spots",
      "Boosts Collagen"
    ],
    images: ["https://www.tuffyorganics.com/cdn/shop/files/DSC6847_400x.png?v=1717946422"],
    category: "serum",
    tag: "Best Seller",
    stock: 100
  },
  {
    name: "Niacinamide + Zinc Serum",
    price: 1199,
    originalPrice: 1499,
    discount: 20,
    rating: 5,
    numReviews: 98,
    description: "Pore-minimizing serum with Niacinamide and Zinc for clear skin.",
    ingredients: [
      "Niacinamide (10%)",
      "Zinc PCA",
      "Hyaluronic Acid",
      "Allantoin"
    ],
    features: [
      "Minimizes Pores",
      "Controls Oil",
      "Reduces Blemishes",
      "Evens Skin Tone"
    ],
    images: ["https://www.tuffyorganics.com/cdn/shop/files/DSC6381.NEF_400x.png?v=1717946826"],
    category: "serum",
    tag: "Popular",
    stock: 85
  },
  {
    name: "Hyaluronic Acid Serum",
    price: 1199,
    originalPrice: 1499,
    discount: 20,
    rating: 5,
    numReviews: 87,
    description: "Deep hydrating serum with multi-molecular weight hyaluronic acid.",
    ingredients: [
      "Multi-weight Hyaluronic Acid",
      "B5 (Panthenol)",
      "Glycerin",
      "Sodium PCA"
    ],
    features: [
      "Deep Hydration",
      "Plumps Skin",
      "Reduces Fine Lines",
      "All Skin Types"
    ],
    images: ["https://www.tuffyorganics.com/cdn/shop/products/IMG_4990_400x.png?v=1643738840"],
    category: "serum",
    tag: "New",
    stock: 90
  },
  {
    name: "Retinol Serum",
    price: 1399,
    originalPrice: 1699,
    discount: 18,
    rating: 5,
    numReviews: 76,
    description: "Advanced retinol serum for anti-aging and skin renewal.",
    ingredients: [
      "Retinol",
      "Peptides",
      "Ceramides",
      "Squalane"
    ],
    features: [
      "Anti-aging",
      "Skin Renewal",
      "Reduces Wrinkles",
      "Improves Texture"
    ],
    images: ["https://www.tuffyorganics.com/cdn/shop/products/IMG_5005_400x.png?v=1643738570"],
    category: "serum",
    tag: "Best Seller",
    stock: 75
  },
  {
    name: "Peptide Complex Serum",
    price: 1499,
    originalPrice: 1799,
    discount: 17,
    rating: 5,
    numReviews: 65,
    description: "Advanced peptide complex for firm and youthful skin.",
    ingredients: [
      "Multiple Peptides",
      "Amino Acids",
      "Hyaluronic Acid",
      "Niacinamide"
    ],
    features: [
      "Firms Skin",
      "Reduces Wrinkles",
      "Boosts Collagen",
      "Improves Elasticity"
    ],
    images: ["https://www.tuffyorganics.com/cdn/shop/products/IMG_5002_400x.png?v=1643784678"],
    category: "serum",
    stock: 80
  },
  {
    name: "Brightening Serum Duo",
    price: 2299,
    originalPrice: 2899,
    discount: 21,
    rating: 5,
    numReviews: 54,
    description: "Powerful duo of brightening serums for radiant skin.",
    ingredients: [
      "Vitamin C",
      "Alpha Arbutin",
      "Kojic Acid",
      "Niacinamide"
    ],
    features: [
      "Brightens Skin",
      "Fades Dark Spots",
      "Evens Tone",
      "Value Pack"
    ],
    images: ["https://www.tuffyorganics.com/cdn/shop/products/serum-duo---product-image22_400x.png?v=1678266056"],
    category: "serum",
    tag: "Value Pack",
    stock: 60
  },
  {
    name: "Anti-Aging Serum Bundle",
    price: 2499,
    originalPrice: 3299,
    discount: 24,
    rating: 5,
    numReviews: 43,
    description: "Complete anti-aging serum collection for youthful skin.",
    ingredients: [
      "Retinol",
      "Peptides",
      "Growth Factors",
      "Antioxidants"
    ],
    features: [
      "Comprehensive Anti-aging",
      "Multiple Serums",
      "Complete Care",
      "Professional Grade"
    ],
    images: ["https://www.tuffyorganics.com/cdn/shop/products/Ad-6webcopy_400x.jpg?v=1666955126"],
    category: "serum",
    tag: "Bundle",
    stock: 50
  },
  {
    name: "Ultimate Skin Corrector Bundle",
    price: 3499,
    originalPrice: 4299,
    discount: 19,
    rating: 5,
    numReviews: 32,
    description: "Ultimate collection of corrective serums for perfect skin.",
    ingredients: [
      "Multiple Active Ingredients",
      "Targeted Solutions",
      "Clinical Strength",
      "Premium Formulas"
    ],
    features: [
      "Corrects All Concerns",
      "Professional Results",
      "Complete System",
      "Luxury Care"
    ],
    images: ["https://www.tuffyorganics.com/cdn/shop/products/ultimate-skin-corrector-bundle---product-image_400x.png?v=1677241431"],
    category: "serum",
    tag: "Bundle",
    stock: 45
  },
  {
    name: "Glow Boost Serum Duo",
    price: 2199,
    originalPrice: 2799,
    discount: 21,
    rating: 5,
    numReviews: 28,
    description: "Dual-action serum duo for an instant glow boost.",
    ingredients: [
      "Vitamin C",
      "Niacinamide",
      "Hyaluronic Acid",
      "Natural Extracts"
    ],
    features: [
      "Instant Glow",
      "Hydration Boost",
      "Brightening",
      "Value Pack"
    ],
    images: ["https://www.tuffyorganics.com/cdn/shop/products/serum-duo---product-image2_400x.png?v=1678266108"],
    category: "serum",
    tag: "Value Pack",
    stock: 55
  },
  {
    name: "SPF Power Trio",
    price: 3299,
    originalPrice: 3999,
    discount: 18,
    rating: 5,
    numReviews: 19,
    description: "Triple-action serum set with SPF protection.",
    ingredients: [
      "Broad Spectrum SPF",
      "Antioxidants",
      "Peptides",
      "Hydrating Factors"
    ],
    features: [
      "Sun Protection",
      "Anti-aging",
      "Hydration",
      "Triple Action"
    ],
    images: ["https://www.tuffyorganics.com/cdn/shop/files/SPF-Power-Trio---product-image_400x.jpg?v=1682590509"],
    category: "serum",
    tag: "New",
    stock: 65
  },
  // Sunscreen Products
  {
    name: "Daily Defense SPF 50+ Sunscreen",
    price: 999,
    originalPrice: 1299,
    discount: 23,
    rating: 5,
    numReviews: 156,
    description: "High protection daily sunscreen with broad spectrum SPF 50+.",
    ingredients: [
      "Zinc Oxide",
      "Titanium Dioxide",
      "Vitamin E",
      "Hyaluronic Acid"
    ],
    features: [
      "SPF 50+ Protection",
      "Broad Spectrum",
      "Non-greasy Formula",
      "Water Resistant"
    ],
    images: ["https://www.tuffyorganics.com/cdn/shop/files/DSC6874_400x.png?v=1717482337"],
    category: "sunscreen",
    tag: "Best Seller",
    stock: 100
  },
  {
    name: "Ultra Light SPF 30 Sunscreen",
    price: 899,
    originalPrice: 1199,
    discount: 25,
    rating: 5,
    numReviews: 142,
    description: "Lightweight, non-greasy sunscreen perfect for daily use.",
    ingredients: [
      "Chemical Filters",
      "Niacinamide",
      "Aloe Vera",
      "Green Tea Extract"
    ],
    features: [
      "Lightweight Formula",
      "Fast Absorbing",
      "Non-comedogenic",
      "Suitable for Daily Use"
    ],
    images: ["https://www.tuffyorganics.com/cdn/shop/files/DSC6902_400x.png?v=1719389704"],
    category: "sunscreen",
    tag: "Popular",
    stock: 85
  },
  {
    name: "SPF Power Trio Bundle",
    price: 1099,
    originalPrice: 1399,
    discount: 21,
    rating: 5,
    numReviews: 128,
    description: "Complete sun protection bundle with three essential products.",
    ingredients: [
      "Multiple SPF Formulas",
      "Antioxidants",
      "Moisturizing Agents",
      "Skin Protectants"
    ],
    features: [
      "Complete Protection",
      "Value Bundle",
      "Multiple Formats",
      "All-day Coverage"
    ],
    images: ["https://www.tuffyorganics.com/cdn/shop/files/SPF-Power-Trio---product-image_400x.jpg?v=1682590509"],
    category: "sunscreen",
    tag: "New",
    stock: 90
  },
  {
    name: "Mineral SPF 40 Sunscreen",
    price: 1199,
    originalPrice: 1499,
    discount: 20,
    rating: 5,
    numReviews: 98,
    description: "100% mineral sunscreen with natural zinc oxide protection.",
    ingredients: [
      "Zinc Oxide",
      "Titanium Dioxide",
      "Ceramides",
      "Natural Extracts"
    ],
    features: [
      "Mineral Protection",
      "Reef Safe",
      "Sensitive Skin Safe",
      "Natural Formula"
    ],
    images: ["https://www.tuffyorganics.com/cdn/shop/products/001-WebImg_1_400x.png?v=1675257393"],
    category: "sunscreen",
    tag: "Best Seller",
    stock: 75
  },
  {
    name: "Tinted SPF 35 Sunscreen",
    price: 1299,
    originalPrice: 1599,
    discount: 19,
    rating: 5,
    numReviews: 87,
    description: "Tinted sunscreen for natural coverage and sun protection.",
    ingredients: [
      "Iron Oxides",
      "Zinc Oxide",
      "Hyaluronic Acid",
      "Vitamin E"
    ],
    features: [
      "Natural Coverage",
      "Sun Protection",
      "Evens Skin Tone",
      "Hydrating Formula"
    ],
    images: ["https://www.tuffyorganics.com/cdn/shop/files/DSC6372_400x.png?v=1716401109"],
    category: "sunscreen",
    stock: 80
  },
  {
    name: "Sensitive Skin SPF 45 Sunscreen",
    price: 1099,
    originalPrice: 1399,
    discount: 21,
    rating: 5,
    numReviews: 76,
    description: "Gentle sunscreen specially formulated for sensitive skin.",
    ingredients: [
      "Mineral Filters",
      "Allantoin",
      "Chamomile",
      "Calendula"
    ],
    features: [
      "Sensitive Skin Safe",
      "Non-irritating",
      "Calming Formula",
      "High Protection"
    ],
    images: ["https://www.tuffyorganics.com/cdn/shop/products/product-image-05_400x.png?v=1679135493"],
    category: "sunscreen",
    tag: "Popular",
    stock: 95
  },
  {
    name: "Kids Safe SPF 50+ Sunscreen",
    price: 899,
    originalPrice: 1199,
    discount: 25,
    rating: 5,
    numReviews: 65,
    description: "Kid-friendly sunscreen with maximum protection.",
    ingredients: [
      "Zinc Oxide",
      "Aloe Vera",
      "Vitamin E",
      "Chamomile"
    ],
    features: [
      "Kid Safe",
      "Water Resistant",
      "Easy to Apply",
      "Tear-free Formula"
    ],
    images: ["https://www.tuffyorganics.com/cdn/shop/files/WhatsAppImage2023-07-25at11.23.10AM_400x.jpg?v=1690266284"],
    category: "sunscreen",
    stock: 70
  },
  {
    name: "Sport SPF 50+ Sunscreen",
    price: 1199,
    originalPrice: 1499,
    discount: 20,
    rating: 5,
    numReviews: 54,
    description: "High-performance sport sunscreen for active lifestyles.",
    ingredients: [
      "Advanced Filters",
      "Sweat-proof Technology",
      "Antioxidants",
      "Hydrating Agents"
    ],
    features: [
      "Sport Formula",
      "Water Resistant",
      "Sweat Resistant",
      "Long-lasting Protection"
    ],
    images: ["https://www.tuffyorganics.com/cdn/shop/products/smoothie-cleansers---Product-images-01_400x.png?v=1679464259"],
    category: "sunscreen",
    stock: 85
  },
  {
    name: "Sun Protection Duo Pack",
    price: 1799,
    originalPrice: 2299,
    discount: 22,
    rating: 5,
    numReviews: 43,
    description: "Value pack of two complementary sun protection products.",
    ingredients: [
      "Multiple SPF Formulas",
      "Antioxidants",
      "Moisturizers",
      "Skin Soothers"
    ],
    features: [
      "Complete Protection",
      "Value Pack",
      "Day & Beach Use",
      "Multiple Formats"
    ],
    images: ["https://www.tuffyorganics.com/cdn/shop/products/tea-tree-cleansers---Product-images-01_400x.png?v=1679466208"],
    category: "sunscreen",
    tag: "Value Pack",
    stock: 60
  },
  {
    name: "Complete Sun Care Collection",
    price: 4499,
    originalPrice: 5999,
    discount: 25,
    rating: 5,
    numReviews: 32,
    description: "Comprehensive sun care collection for complete protection.",
    ingredients: [
      "Multiple Active Ingredients",
      "Various SPF Levels",
      "Premium Formulas",
      "Skin Care Actives"
    ],
    features: [
      "Complete System",
      "Multiple Products",
      "Full Protection",
      "Premium Care"
    ],
    images: ["https://www.tuffyorganics.com/cdn/shop/files/Group1_250b63d3-9356-4993-9f2c-865c61778c7d_800x.jpg?v=1710136933"],
    category: "sunscreen",
    tag: "Bundle",
    stock: 40
  },
  // Toner Products
  {
    name: "Hydrating Rose Toner",
    price: 899,
    originalPrice: 1199,
    discount: 25,
    rating: 5,
    numReviews: 156,
    description: "Hydrating toner enriched with rose water for soft, supple skin.",
    ingredients: [
      "Rose Water",
      "Hyaluronic Acid",
      "Glycerin",
      "Panthenol"
    ],
    features: [
      "Deep Hydration",
      "Balances pH",
      "Soothes Skin",
      "Alcohol-free"
    ],
    images: ["https://www.tuffyorganics.com/cdn/shop/files/Group3_400x.jpg?v=1693310799"],
    category: "toner",
    tag: "Best Seller",
    stock: 100
  },
  {
    name: "Calming Chamomile Toner",
    price: 799,
    originalPrice: 999,
    discount: 20,
    rating: 5,
    numReviews: 142,
    description: "Gentle, calming toner with chamomile for sensitive skin.",
    ingredients: [
      "Chamomile Extract",
      "Allantoin",
      "Calendula",
      "Beta-glucan"
    ],
    features: [
      "Calms Irritation",
      "Reduces Redness",
      "Gentle Formula",
      "Sensitive Skin Safe"
    ],
    images: ["https://www.tuffyorganics.com/cdn/shop/products/IMG_3058_400x.png?v=1661247380"],
    category: "toner",
    tag: "Popular",
    stock: 85
  },
  {
    name: "Balancing Green Tea Toner",
    price: 849,
    originalPrice: 1099,
    discount: 23,
    rating: 5,
    numReviews: 128,
    description: "Oil-balancing toner with green tea for combination skin.",
    ingredients: [
      "Green Tea Extract",
      "Niacinamide",
      "Centella Asiatica",
      "BHA"
    ],
    features: [
      "Balances Oil",
      "Controls Shine",
      "Antioxidant Protection",
      "Pore Care"
    ],
    images: ["https://www.tuffyorganics.com/cdn/shop/products/IMG_3074_400x.png?v=1661247747"],
    category: "toner",
    tag: "New",
    stock: 90
  },
  {
    name: "Soothing Aloe Vera Toner",
    price: 749,
    originalPrice: 999,
    discount: 25,
    rating: 5,
    numReviews: 98,
    description: "Soothing toner with pure aloe vera for calm, refreshed skin.",
    ingredients: [
      "Aloe Vera Extract",
      "Cucumber Extract",
      "Panthenol",
      "Allantoin"
    ],
    features: [
      "Soothes Skin",
      "Cooling Effect",
      "Hydrating",
      "Refreshing"
    ],
    images: ["https://m.media-amazon.com/images/S/mms-media-storage-prod/final/BrandPosts/brandPosts/f205d127-069d-4cd2-9184-8903a9f748c3/f620cf91-045f-4662-acd5-126ca90ef62c/media._SL480_.jpeg"],
    category: "toner",
    tag: "Best Seller",
    stock: 75
  },
  {
    name: "Brightening Vitamin C Toner",
    price: 999,
    originalPrice: 1299,
    discount: 23,
    rating: 5,
    numReviews: 87,
    description: "Brightening toner with stabilized Vitamin C for radiant skin.",
    ingredients: [
      "Vitamin C",
      "Niacinamide",
      "Alpha Arbutin",
      "Licorice Extract"
    ],
    features: [
      "Brightens Skin",
      "Evens Tone",
      "Antioxidant Protection",
      "Fades Dark Spots"
    ],
    images: ["https://www.lookhealthystore.com/cdn/shop/products/07_aecfadc5-a5f0-45b4-b3db-e49f238590b5_800x.jpg?v=1646204086"],
    category: "toner",
    stock: 80
  },
  {
    name: "Purifying Tea Tree Toner",
    price: 849,
    originalPrice: 1099,
    discount: 23,
    rating: 5,
    numReviews: 76,
    description: "Purifying toner with tea tree oil for clear, balanced skin.",
    ingredients: [
      "Tea Tree Oil",
      "Witch Hazel",
      "Salicylic Acid",
      "Zinc PCA"
    ],
    features: [
      "Purifies Skin",
      "Controls Oil",
      "Prevents Breakouts",
      "Balances pH"
    ],
    images: ["https://i.ebayimg.com/images/g/G8gAAOSwjU1imqxP/s-l500.jpg"],
    category: "toner",
    tag: "Popular",
    stock: 95
  },
  {
    name: "Nourishing Honey Toner",
    price: 899,
    originalPrice: 1199,
    discount: 25,
    rating: 5,
    numReviews: 65,
    description: "Nourishing toner with honey for soft, glowing skin.",
    ingredients: [
      "Honey Extract",
      "Propolis",
      "Royal Jelly",
      "Ceramides"
    ],
    features: [
      "Nourishing",
      "Hydrating",
      "Anti-bacterial",
      "Strengthens Barrier"
    ],
    images: ["https://basicmadeco.com/cdn/shop/products/water-bank-blue-hyaluronic-essence-toner-for-combination-oily-skin2.webp?v=1678156597&width=800"],
    category: "toner",
    stock: 70
  },
  {
    name: "Refreshing Cucumber Toner",
    price: 799,
    originalPrice: 999,
    discount: 20,
    rating: 5,
    numReviews: 54,
    description: "Refreshing toner with cucumber for cool, hydrated skin.",
    ingredients: [
      "Cucumber Extract",
      "Mint Extract",
      "Hyaluronic Acid",
      "Vitamin B5"
    ],
    features: [
      "Cooling Effect",
      "Refreshing",
      "Hydrating",
      "Oil Control"
    ],
    images: ["https://m.media-amazon.com/images/I/61WIQfTPIdL.jpg"],
    category: "toner",
    stock: 85
  },
  {
    name: "Hydration Duo Toner Set",
    price: 1599,
    originalPrice: 1999,
    discount: 20,
    rating: 5,
    numReviews: 43,
    description: "Value pack of two hydrating toners for complete care.",
    ingredients: [
      "Multiple Hydrating Ingredients",
      "Hyaluronic Acid",
      "Natural Extracts",
      "Vitamins"
    ],
    features: [
      "Double Hydration",
      "Value Pack",
      "Day & Night Use",
      "Complete Care"
    ],
    images: ["https://agtreasure.com/wp-content/uploads/2022/11/Its-Skin-Aloe-toner.png"],
    category: "toner",
    tag: "Value Pack",
    stock: 60
  },
  {
    name: "Complete Toner Collection",
    price: 3999,
    originalPrice: 4999,
    discount: 20,
    rating: 5,
    numReviews: 32,
    description: "Complete collection of toners for all skin concerns.",
    ingredients: [
      "Multiple Active Ingredients",
      "Various Extracts",
      "Premium Formulas",
      "Targeted Solutions"
    ],
    features: [
      "Complete System",
      "Multiple Formulas",
      "All Skin Types",
      "Premium Care"
    ],
    images: ["https://web.tradekorea.com/product/336/1726336/Skin%20Care%20cosmetic%20new%20aqua%20wonder%20moisture%20Toner_2.jpg"],
    category: "toner",
    tag: "Bundle",
    stock: 40
  }
];

module.exports = products;
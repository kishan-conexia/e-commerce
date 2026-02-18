export interface Product {
  id: string;
  slug: string;
  name: string;
  description?: string;
  shortDescription?: string;
  basePrice: number;
  compareAtPrice?: number;
  brand?: string;
  image?: string;
  images?: string[];
  isNew?: boolean;
  isFeatured?: boolean;
  colors?: string[];
  status: string;
  careInstructions?: string;
  tags?: string[];
  categories?: { name: string; slug: string }[];
}

export interface ProductVariant {
  id: string;
  sku: string;
  priceOverride?: number;
  costPrice?: number;
  weightGrams?: number;
  isActive: boolean;
  attributes: Record<string, string>;
}

// Demo products for initial scaffold
const demoProducts: Product[] = [
  {
    id: "1",
    slug: "ivory-embroidered-silk-saree",
    name: "Ivory Embroidered Silk Saree",
    shortDescription: "Handcrafted silk saree with intricate zari embroidery",
    basePrice: 89000,
    compareAtPrice: 120000,
    brand: "MAISON",
    image: "",
    isNew: true,
    isFeatured: true,
    colors: ["#FFFFF0", "#C9A96E", "#8B0000"],
    status: "active",
    tags: ["saree", "silk", "wedding"],
  },
  {
    id: "2",
    slug: "champagne-sequin-gown",
    name: "Champagne Sequin Evening Gown",
    shortDescription: "Floor-length gown with hand-applied sequin work",
    basePrice: 145000,
    brand: "MAISON",
    image: "",
    isFeatured: true,
    colors: ["#C9A96E", "#1A1A1A"],
    status: "active",
    tags: ["gown", "evening", "cocktail"],
  },
  {
    id: "3",
    slug: "midnight-velvet-blazer",
    name: "Midnight Velvet Blazer",
    shortDescription: "Italian velvet blazer with satin lapels",
    basePrice: 52000,
    compareAtPrice: 68000,
    brand: "MAISON",
    image: "",
    isNew: true,
    colors: ["#191970", "#2D2D2D"],
    status: "active",
    tags: ["blazer", "velvet", "men"],
  },
  {
    id: "4",
    slug: "rose-gold-silk-kurta",
    name: "Rose Gold Silk Kurta Set",
    shortDescription: "Lightweight silk kurta with matching palazzo",
    basePrice: 38000,
    brand: "MAISON",
    image: "",
    isFeatured: true,
    colors: ["#C4A882", "#FFFFF0"],
    status: "active",
    tags: ["kurta", "silk", "women"],
  },
  {
    id: "5",
    slug: "sage-linen-co-ord",
    name: "Sage Linen Co-Ord Set",
    shortDescription: "Relaxed-fit linen shirt and trouser set",
    basePrice: 28000,
    brand: "MAISON",
    image: "",
    colors: ["#A8B5A0", "#FAF7F2"],
    status: "active",
    tags: ["co-ord", "linen", "casual"],
  },
  {
    id: "6",
    slug: "pearl-benarasi-lehenga",
    name: "Pearl Benarasi Lehenga",
    shortDescription: "Handwoven Benarasi silk lehenga with pearl accents",
    basePrice: 275000,
    brand: "MAISON",
    image: "",
    isFeatured: true,
    isNew: true,
    colors: ["#FFFFF0", "#C9A96E"],
    status: "active",
    tags: ["lehenga", "benarasi", "bridal"],
  },
  {
    id: "7",
    slug: "charcoal-cashmere-overcoat",
    name: "Charcoal Cashmere Overcoat",
    shortDescription: "Double-breasted cashmere overcoat with horn buttons",
    basePrice: 95000,
    compareAtPrice: 125000,
    brand: "MAISON",
    image: "",
    colors: ["#2D2D2D", "#8B7D6B"],
    status: "active",
    tags: ["overcoat", "cashmere", "men"],
  },
  {
    id: "8",
    slug: "gold-tissue-dupatta",
    name: "Gold Tissue Dupatta",
    shortDescription: "Delicate gold tissue dupatta with scalloped edges",
    basePrice: 15000,
    brand: "MAISON",
    image: "",
    colors: ["#C9A96E", "#D4B87A"],
    status: "active",
    tags: ["dupatta", "accessory"],
  },
];

export function useProducts() {
  const products = useState<Product[]>("products", () => demoProducts);

  const featuredProducts = computed(() =>
    products.value.filter((p) => p.isFeatured),
  );

  const newArrivals = computed(() => products.value.filter((p) => p.isNew));

  function getProductBySlug(slug: string) {
    return products.value.find((p) => p.slug === slug) || null;
  }

  function getProductsByTag(tag: string) {
    return products.value.filter((p) => p.tags?.includes(tag));
  }

  return {
    products: readonly(products),
    featuredProducts,
    newArrivals,
    getProductBySlug,
    getProductsByTag,
  };
}

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
  features?: string[];
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

const demoProducts: Product[] = [
  {
    id: "1",
    slug: "gulnaar-pearl-suit-set-blush",
    name: "Gulnaar Pearl Suit Set",
    shortDescription:
      "Mal Cotton suit with pearl booti work & heavy fall front panel",
    features: [
      "Premium Mal Cotton fabric for a soft, breathable feel",
      "Elegant blush pink color",
      "All-over pearl booti work on the kurta",
      "Heavy fall work on the front panel",
      "Dupatta with delicate pea booti detailing",
      "Plain bottom for a balanced, sophisticated look",
      "Perfect for festive wear, day events, and casual elegance",
    ],
    basePrice: 6248,
    brand: "MANJASHAN",
    image: "/products/1/0A0A0051.JPG",
    images: [
      "/products/1/0A0A0051.JPG",
      "/products/1/0A0A0056.JPG",
      "/products/1/0A0A0058.JPG",
      "/products/1/0A0A1598.JPG",
      "/products/1/0A0A1604.JPG",
      "/products/1/0A0A1610.JPG",
    ],
    isNew: true,
    isFeatured: true,
    status: "active",
    careInstructions:
      "Premium Mal Cotton fabric. Dry clean recommended. Iron on low heat with a pressing cloth. Store flat to avoid creasing.",
    tags: ["unstitched", "cotton", "pearl", "suit"],
  },
  {
    id: "2",
    slug: "zariya-pearl-garden-suit",
    name: "Zariya Pearl Garden Suit",
    description:
      "This elegant suit set is crafted in fine Chanderi cotton fabric, known for its lightweight texture and subtle sheen. The kurta is beautifully adorned with intricate black and white thread work, creating a striking contrast against the soft base. The design is further enhanced with detailed border work on the dupatta, adding a touch of sophistication and grace. Paired with a complementing bottom featuring subtle thread detailing, this ensemble offers a perfect balance of simplicity and refined craftsmanship.",
    shortDescription:
      "Premium crush diamond fabric suit with cutdana embellishments",
    features: [
      "Fabric (Kurta & Dupatta): Premium crush diamond fabric with golden shaded finish",
      "Work: Fine cutdana embellishments for subtle shimmer",
      "Design: Elegant placement with scattered cutdana booti work",
      "Dupatta: Lightweight with all-over booti and detailed embroidered border",
      "Bottom: Plain silk bottom for a rich, polished look",
      "Color: Soft peach with golden undertones",
      "Occasion: Ideal for festive wear, day functions & elegant gatherings",
    ],
    basePrice: 3239,
    brand: "MANJASHAN",
    image: "/products/2/0A0A0064.JPG",
    images: [
      "/products/2/0A0A0064.JPG",
      "/products/2/0A0A0069.JPG",
      "/products/2/0A0A0074.JPG",
      "/products/2/0A0A2083.JPG",
      "/products/2/0A0A2091.JPG",
      "/products/2/0A0A2093.JPG",
    ],
    isFeatured: true,
    status: "active",
    careInstructions:
      "Chiffon and georgette blend. Dry clean only. Avoid wringing. Iron on lowest setting.",
    tags: ["unstitched", "chiffon", "floral", "suit"],
  },
  {
    id: "3",
    slug: "navy-floral-embroidered-suit",
    name: "Navy Floral Embroidered Suit",
    description:
      "A rich navy blue unstitched suit showcasing an all-over floral print with vibrant coral and peach blooms. The set features exquisite gold lace border detailing on the dupatta, a beautifully embellished neckline, and a solid navy blue bottom fabric for a regal finish.",
    shortDescription:
      "Navy suit with floral print & gold lace border detailing",
    basePrice: 5200,
    compareAtPrice: 6500,
    brand: "MANJASHAN",
    image: "/products/3/0A0A0077.JPG",
    images: [
      "/products/3/0A0A0077.JPG",
      "/products/3/0A0A0086.JPG",
      "/products/3/0A0A0090.JPG",
      "/products/3/0A0A2103.JPG",
      "/products/3/0A0A2112.JPG",
      "/products/3/0A0A2116.JPG",
    ],
    isNew: true,
    isFeatured: true,
    status: "active",
    careInstructions:
      "Premium georgette fabric. Dry clean recommended. Do not bleach. Iron on medium heat.",
    tags: ["unstitched", "georgette", "embroidered", "suit"],
  },
  {
    id: "4",
    slug: "coral-organza-applique-suit",
    name: "Coral Organza Appliqué Suit",
    description:
      "A vibrant coral pink unstitched suit crafted from shimmering organza with beautiful floral appliqué work in pink and green on the front panel. The dupatta features a striking scalloped border with pearl and sequin embellishments, paired with a matching coral bottom fabric.",
    shortDescription:
      "Coral organza suit with floral appliqué & scalloped border",
    basePrice: 4800,
    compareAtPrice: 6200,
    brand: "MANJASHAN",
    image: "/products/4/0A0A6215.JPG",
    images: [
      "/products/4/0A0A6215.JPG",
      "/products/4/0A0A6227.JPG",
      "/products/4/0A0A6264.JPG",
      "/products/4/0A0A6270.JPG",
      "/products/4/0A0A6272.JPG",
      "/products/4/0A0A6287.JPG",
    ],
    isNew: true,
    status: "active",
    careInstructions:
      "Organza tissue fabric. Dry clean only. Handle with care to protect appliqué work. Store in a muslin cover.",
    tags: ["unstitched", "organza", "applique", "suit"],
  },
  {
    id: "5",
    slug: "teal-embroidered-silk-suit",
    name: "Teal Embroidered Silk Suit",
    description:
      "An elegant teal unstitched suit featuring intricate silver and gold threadwork embroidery in a classic paisley pattern on the kurta panel. Complemented by a matching chiffon dupatta with delicate sequin scatter and embroidered border, along with a solid teal bottom fabric.",
    shortDescription:
      "Teal silk suit with silver-gold threadwork & sequin dupatta",
    basePrice: 5800,
    compareAtPrice: 7500,
    brand: "MANJASHAN",
    image: "/products/5/0A0A0131.JPG",
    images: [
      "/products/5/0A0A0131.JPG",
      "/products/5/0A0A0140.JPG",
      "/products/5/0A0A0143.JPG",
      "/products/5/0A0A1728.JPG",
      "/products/5/0A0A1733.JPG",
      "/products/5/0A0A1735.JPG",
    ],
    isFeatured: true,
    status: "active",
    careInstructions:
      "Pure silk blend. Dry clean only. Avoid direct sunlight for storage. Iron with pressing cloth on silk setting.",
    tags: ["unstitched", "silk", "embroidered", "suit"],
  },
  {
    id: "6",
    slug: "zariya-sky-luxe-set",
    name: "Zariya Sky Luxe Set",
    description:
      "This elegant suit set is crafted in fine Chanderi cotton fabric, known for its lightweight texture and subtle sheen. The kurta is beautifully adorned with intricate black and white thread work, creating a striking contrast against the soft base. The design is further enhanced with detailed border work on the dupatta, adding a touch of sophistication and grace. Paired with a complementing bottom featuring subtle thread detailing, this ensemble offers a perfect balance of simplicity and refined craftsmanship.",
    shortDescription:
      "Chanderi cotton suit with black & white thread embroidery, dupatta border work & coordinated bottom",
    features: [
      "Premium Chanderi cotton fabric with a soft, airy feel",
      "Elegant black and white thread embroidery on the kurta",
      "Intricate detailing for a refined, minimal look",
      "Dupatta with beautifully crafted lower border work",
      "Bottom with subtle thread work for a coordinated finish",
      "Lightweight and perfect for day wear, gatherings, and elegant outings",
    ],
    basePrice: 5168,
    brand: "MANJASHAN",
    image: "/products/9/0A0A0189.JPG",
    images: [
      "/products/9/0A0A0189.JPG",
      "/products/9/0A0A0199.JPG",
      "/products/9/0A0A0218.JPG",
      "/products/9/0A0A1894.JPG",
      "/products/9/0A0A1901.JPG",
      "/products/9/0A0A1906.JPG",
    ],
    isNew: true,
    isFeatured: true,
    status: "active",
    careInstructions:
      "Fine Chanderi cotton fabric. Dry clean recommended. Iron on low heat. Store in a cool, dry place.",
    tags: ["unstitched", "chanderi", "cotton", "suit"],
  },
  {
    id: "7",
    slug: "cream-banarasi-silk-suit",
    name: "Cream Banarasi Silk Suit",
    description:
      "A timeless expression of heritage and elegance, this exquisite ensemble from Label Manjashan is crafted in rich Banarasi silk, rendered in a soft cream hue that exudes understated opulence. The kurta is adorned with intricate Banarasi weaving and embroidery, reflecting fine craftsmanship and a regal aesthetic rooted in tradition.\n\nPaired with a complementing silk-cotton bottom in a clean, minimal finish, the silhouette remains effortlessly graceful. The look is elevated with a luxurious Banarasi silk dupatta, intricately woven with traditional motifs and detailed borders, adding depth, richness, and a statement of refined grandeur.\n\nDesigned for occasions that call for quiet luxury, this ensemble seamlessly blends tradition with modern sophistication.",
    shortDescription:
      "Cream Banarasi silk suit with intricate weaving and woven dupatta",
    features: [
      "Signature Label Manjashan aesthetic: heritage craftsmanship with modern elegance",
      "Premium Banarasi silk fabric in a soft cream tone",
      "Intricate Banarasi weaving and embroidery on the kurta",
      "Plain silk-cotton bottom for a balanced, polished look",
      "Banarasi silk dupatta with rich woven motifs and detailed borders",
      "Luxurious texture with a graceful, fluid drape",
      "Perfect for festive occasions, celebrations, and elegant gatherings",
    ],
    basePrice: 4678,
    brand: "MANJASHAN",
    image: "/products/6/0A0A0153.JPG",
    images: [
      "/products/6/0A0A0153.JPG",
      "/products/6/0A0A0160.JPG",
      "/products/6/0A0A0166.JPG",
      "/products/6/0A0A2026.JPG",
      "/products/6/0A0A2029.JPG",
      "/products/6/0A0A2033.JPG",
    ],
    isNew: true,
    isFeatured: true,
    status: "active",
    tags: ["unstitched", "silk", "banarasi", "suit"],
  },
  {
    id: "8",
    slug: "ivory-guff-cotton-floral-suit",
    name: "Ivory Guff Cotton Floral Suit",
    description:
      "A celebration of refined elegance, this exquisite ensemble from Label Manjashan is crafted in premium guff cotton, offering a soft, breathable feel with an effortlessly graceful fall. Rendered in a serene ivory base, the kurta is adorned with intricate green and yellow thread work, delicately placed to create a harmonious blend of freshness and sophistication. The highlight lies in the artistic floral motifs blooming along the lower panel, adding a touch of timeless charm.\n\nPaired with a pure cotton bottom in a clean, minimal finish, the silhouette remains poised and polished. The ensemble is elevated with a beautifully crafted dupatta, featuring intricate floral thread work along the borders and subtle booti detailing throughout—bringing depth, texture, and a signature Manjashan finesse to the look.\n\nDesigned for the modern woman who appreciates quiet luxury, this piece is perfect for daytime festivities, intimate gatherings, and elegant celebrations.",
    shortDescription: "Ivory guff cotton suit with artistic floral thread work",
    features: [
      "Signature Label Manjashan aesthetic: soft luxury with timeless appeal",
      "Premium guff cotton fabric for breathable comfort and fluid drape",
      "Elegant ivory base with green and yellow thread work detailing",
      "Artistic floral motifs enhancing the lower panel",
      "Plain pure cotton bottom for a clean, structured finish",
      "Dupatta with intricate floral thread work border and subtle booti accents",
      "Lightweight, graceful, and effortlessly sophisticated",
      "Ideal for refined daywear, festive brunches, and intimate occasions",
    ],
    basePrice: 5435,
    brand: "MANJASHAN",
    image: "/products/15/0A0A1914.JPG",
    images: [
      "/products/15/0A0A1914.JPG",
      "/products/15/0A0A1917.JPG",
      "/products/15/0A0A1924.JPG",
      "/products/15/0A0A2668.JPG",
      "/products/15/0A0A2681.JPG",
      "/products/15/0A0A2685.JPG",
    ],
    isNew: true,
    isFeatured: true,
    status: "active",
    tags: ["unstitched", "cotton", "guff-cotton", "suit", "floral"],
  },
  {
    id: "9",
    slug: "off-white-guff-cotton-suit",
    name: "Off-White Guff Cotton Suit",
    description:
      "An expression of serene elegance, this timeless ensemble from Label Manjashan is crafted in pure guff cotton, celebrated for its soft texture and breathable comfort. Drenched in a graceful off-white hue, the kurta is elevated with exquisite thread embroidery, delicately highlighting the lower border with intricate floral artistry—creating a look that is both refined and effortlessly captivating.\n\nThe ensemble is paired with a plain cotton bottom, keeping the silhouette clean and sophisticated. Completing the look is a beautifully crafted cotton dupatta, adorned with intricate thread embroidery and scattered booti work throughout, adding depth and a touch of artisanal charm.\n\nDesigned for those who appreciate subtle luxury, this piece is perfect for elegant daywear, intimate gatherings, and timeless festive moments.",
    shortDescription:
      "Off-white pure guff cotton suit with thread embroidery and booti work",
    features: [
      "Signature Label Manjashan aesthetic: understated luxury with timeless grace",
      "Pure guff cotton fabric for a soft, breathable, and airy feel",
      "Elegant off-white base for a classic, versatile look",
      "Intricate thread embroidery highlighting the lower border",
      "Plain cotton bottom for a clean and balanced silhouette",
      "Cotton dupatta with detailed thread embroidery and booti work",
      "Lightweight, graceful, and effortlessly refined",
      "Ideal for sophisticated daywear, festive brunches, and intimate occasions",
    ],
    basePrice: 5354,
    brand: "MANJASHAN",
    image: "/products/16/0A0A1840.JPG",
    images: [
      "/products/16/0A0A1840.JPG",
      "/products/16/0A0A1846.JPG",
      "/products/16/0A0A1848.JPG",
      "/products/16/0A0A2636.JPG",
      "/products/16/0A0A2646.JPG",
      "/products/16/0A0A2650.JPG",
    ],
    isNew: true,
    isFeatured: true,
    status: "active",
    tags: ["unstitched", "cotton", "guff-cotton", "suit"],
  },
  {
    id: "10",
    slug: "peach-pink-mull-cotton-suit",
    name: "Peach Pink Mull Cotton Suit",
    description:
      "Where subtlety meets statement, this graceful ensemble from Label Manjashan is crafted in airy mull cotton, drenched in a soothing peach pink tone that embodies effortless femininity. The kurta is adorned with delicate grey booti work, thoughtfully placed to create a look that is both minimal and captivating.\n\nPaired with a smooth grey silk bottom, the silhouette feels polished yet easy. The look is completed with a fluid chinon dupatta in a deep grey hue, edged with soft peach lace—adding a signature Manjashan touch of refined contrast and quiet luxury.\n\nDesigned for the woman who embraces elegance in its purest form, this piece transitions seamlessly from day celebrations to intimate gatherings.",
    shortDescription:
      "Peach pink mull cotton suit with grey booti work and chinon dupatta",
    features: [
      "Signature Label Manjashan aesthetic: minimal, elegant, and timeless",
      "Premium mull cotton in a soft peach pink tone",
      "Delicate grey booti work for subtle detailing",
      "Plain grey silk bottom for a clean, structured finish",
      "Lightweight chinon dupatta with contrast peach lace edging",
      "Effortless drape with a breathable, comfortable feel",
      "Perfect for intimate festivities, brunches, and refined daywear",
    ],
    basePrice: 5168,
    brand: "MANJASHAN",
    image: "/products/19/0A0A1751.JPG",
    images: [
      "/products/19/0A0A1751.JPG",
      "/products/19/0A0A1760.JPG",
      "/products/19/0A0A1761.JPG",
      "/products/19/0A0A2401.JPG",
      "/products/19/0A0A2412.JPG",
      "/products/19/0A0A2415.JPG",
    ],
    isNew: true,
    isFeatured: true,
    status: "active",
    tags: ["unstitched", "cotton", "mull-cotton", "suit"],
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

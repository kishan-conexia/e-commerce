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

const demoProducts: Product[] = [
  {
    id: '1',
    slug: 'lilac-organza-embroidered-suit',
    name: 'Lilac Organza Embroidered Suit',
    description: 'A graceful lilac organza unstitched suit featuring delicate floral embroidery on the neckline and body, complemented by white polka dot accents throughout. The set includes a beautifully embroidered kurta panel, matching bottom fabric, and a sheer organza dupatta with coordinating detailing.',
    shortDescription: 'Lilac organza suit with floral embroidery & polka dot accents',
    basePrice: 4500,
    compareAtPrice: 5800,
    brand: 'MANJASHAN',
    image: '/products/1/0A0A0051.JPG',
    images: [
      '/products/1/0A0A0051.JPG',
      '/products/1/0A0A0056.JPG',
      '/products/1/0A0A0058.JPG',
      '/products/1/0A0A1598.JPG',
      '/products/1/0A0A1604.JPG',
      '/products/1/0A0A1610.JPG',
    ],
    isNew: true,
    isFeatured: true,
    status: 'active',
    careInstructions: 'Premium organza fabric. Dry clean recommended. Iron on low heat with a pressing cloth. Store flat to avoid creasing.',
    tags: ['unstitched', 'organza', 'embroidered', 'suit'],
  },
  {
    id: '2',
    slug: 'olive-floral-print-chiffon-suit',
    name: 'Olive Floral Print Chiffon Suit',
    description: 'A stunning olive green unstitched suit with a vibrant floral print featuring pink lotus motifs. The kurta panel is adorned with intricate beadwork on the yoke, paired with a matching chiffon dupatta with delicate lace trim and a solid olive bottom fabric.',
    shortDescription: 'Olive chiffon suit with floral print & beadwork yoke',
    basePrice: 3800,
    brand: 'MANJASHAN',
    image: '/products/2/0A0A0064.JPG',
    images: [
      '/products/2/0A0A0064.JPG',
      '/products/2/0A0A0069.JPG',
      '/products/2/0A0A0074.JPG',
      '/products/2/0A0A2083.JPG',
      '/products/2/0A0A2091.JPG',
      '/products/2/0A0A2093.JPG',
    ],
    isFeatured: true,
    status: 'active',
    careInstructions: 'Chiffon and georgette blend. Dry clean only. Avoid wringing. Iron on lowest setting.',
    tags: ['unstitched', 'chiffon', 'floral', 'suit'],
  },
  {
    id: '3',
    slug: 'navy-floral-embroidered-suit',
    name: 'Navy Floral Embroidered Suit',
    description: 'A rich navy blue unstitched suit showcasing an all-over floral print with vibrant coral and peach blooms. The set features exquisite gold lace border detailing on the dupatta, a beautifully embellished neckline, and a solid navy blue bottom fabric for a regal finish.',
    shortDescription: 'Navy suit with floral print & gold lace border detailing',
    basePrice: 5200,
    compareAtPrice: 6500,
    brand: 'MANJASHAN',
    image: '/products/3/0A0A0077.JPG',
    images: [
      '/products/3/0A0A0077.JPG',
      '/products/3/0A0A0086.JPG',
      '/products/3/0A0A0090.JPG',
      '/products/3/0A0A2103.JPG',
      '/products/3/0A0A2112.JPG',
      '/products/3/0A0A2116.JPG',
    ],
    isNew: true,
    isFeatured: true,
    status: 'active',
    careInstructions: 'Premium georgette fabric. Dry clean recommended. Do not bleach. Iron on medium heat.',
    tags: ['unstitched', 'georgette', 'embroidered', 'suit'],
  },
  {
    id: '4',
    slug: 'coral-organza-applique-suit',
    name: 'Coral Organza Appliqué Suit',
    description: 'A vibrant coral pink unstitched suit crafted from shimmering organza with beautiful floral appliqué work in pink and green on the front panel. The dupatta features a striking scalloped border with pearl and sequin embellishments, paired with a matching coral bottom fabric.',
    shortDescription: 'Coral organza suit with floral appliqué & scalloped border',
    basePrice: 4800,
    compareAtPrice: 6200,
    brand: 'MANJASHAN',
    image: '/products/4/0A0A6215.JPG',
    images: [
      '/products/4/0A0A6215.JPG',
      '/products/4/0A0A6227.JPG',
      '/products/4/0A0A6264.JPG',
      '/products/4/0A0A6270.JPG',
      '/products/4/0A0A6272.JPG',
      '/products/4/0A0A6287.JPG',
    ],
    isNew: true,
    status: 'active',
    careInstructions: 'Organza tissue fabric. Dry clean only. Handle with care to protect appliqué work. Store in a muslin cover.',
    tags: ['unstitched', 'organza', 'applique', 'suit'],
  },
  {
    id: '5',
    slug: 'teal-embroidered-silk-suit',
    name: 'Teal Embroidered Silk Suit',
    description: 'An elegant teal unstitched suit featuring intricate silver and gold threadwork embroidery in a classic paisley pattern on the kurta panel. Complemented by a matching chiffon dupatta with delicate sequin scatter and embroidered border, along with a solid teal bottom fabric.',
    shortDescription: 'Teal silk suit with silver-gold threadwork & sequin dupatta',
    basePrice: 5800,
    compareAtPrice: 7500,
    brand: 'MANJASHAN',
    image: '/products/5/0A0A0131.JPG',
    images: [
      '/products/5/0A0A0131.JPG',
      '/products/5/0A0A0140.JPG',
      '/products/5/0A0A0143.JPG',
      '/products/5/0A0A1728.JPG',
      '/products/5/0A0A1733.JPG',
      '/products/5/0A0A1735.JPG',
    ],
    isFeatured: true,
    status: 'active',
    careInstructions: 'Pure silk blend. Dry clean only. Avoid direct sunlight for storage. Iron with pressing cloth on silk setting.',
    tags: ['unstitched', 'silk', 'embroidered', 'suit'],
  },
];

export function useProducts() {
  const products = useState<Product[]>('products', () => demoProducts);

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

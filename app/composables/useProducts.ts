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
  video?: string;
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
    video: "/products/1/video.mp4",
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
    slug: "verdant-lime-green-silk-suit",
    name: "Verdant Lime Green Silk Suit",
    description:
      "This ensemble is crafted in premium crape silk, celebrated for its smooth texture, fluid drape, and subtle sheen that enhances the richness of prints. The kurta features a digitally rendered floral composition, brought to life with intricate stone and pearl (purl) embellishments on the neckline, adding a refined shimmer and couture appeal.\n\nThe look is elevated with a sheer organza/chiffon dupatta in a matching verdant hue, delicately finished with fine lace edging that lends softness and graceful movement. The ensemble is completed with a solid crepe silk bottom, offering structure and a polished, luxurious finish.",
    shortDescription:
      "Premium crape silk suit with stone & pearl embellished neckline and lace dupatta",
    features: [
      "Kurta Fabric: Premium crape silk with fluid fall",
      "Embellishment: Hand-finished stone & pearl (purl) work",
      "Dupatta: Lightweight sheer organza/chiffon with lace detailing",
      "Bottom: Solid crepe silk for a sleek silhouette",
      "Texture Feel: Silky, airy, and elegantly flowy",
      "Look & Appeal: Fresh, radiant, and effortlessly couture",
    ],
    basePrice: 3875,
    brand: "MANJASHAN",
    image: "/products/2/0A0A0064.JPG",
    video: "/products/2/video.mp4",
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
    video: "/products/3/video.mp4",
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
    video: "/products/4/video.mp4",
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
    slug: "petroleum-blue-crush-silk-suit",
    name: "Petroleum Blue Crush Silk Suit",
    description:
      "Crafted in opulent crush silk, this elegant ensemble is presented in a rich petroleum blue hue, exuding depth and modern sophistication. The kurta is beautifully adorned with intricate kat dana work, adding a delicate shimmer and fine handcrafted detailing that enhances its regal appeal.\n\nThe look is complemented with a soft, sheer dupatta that drapes effortlessly, lending fluidity and grace to the silhouette. Paired with a plain solid bottom, the ensemble maintains a perfect balance between statement detailing and understated elegance—ideal for evening occasions and refined celebrations.",
    shortDescription:
      "Petroleum blue crush silk suit with intricate kat dana embellishments",
    features: [
      "Fabric (Kurta): Premium crush silk with soft textured finish",
      "Work: Intricate kat dana embellishment for subtle sparkle",
      "Color: Deep petroleum blue (rich, jewel-toned elegance)",
      "Dupatta: Lightweight, sheer dupatta with graceful fall",
      "Bottom: Plain solid bottom for a clean, polished look",
      "Texture Feel: Soft, slightly crinkled, and fluid",
      "Occasion: Perfect for evening wear, festive events & small functions",
      "Look & Feel: Regal, modern, and effortlessly sophisticated",
    ],
    basePrice: 3376,
    brand: "MANJASHAN",
    image: "/products/5/0A0A0131.JPG",
    video: "/products/5/video.mp4",
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
    video: "/products/9/video.mp4",
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
    video: "/products/6/video.mp4",
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
    video: "/products/15/video.mp4",
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
    video: "/products/16/video.mp4",
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
    video: "/products/19/video.mp4",
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
  {
    id: "11",
    slug: "ivory-gazri-pink-silk-suit",
    name: "Ivory & Gazri Pink Silk Suit",
    description: "An embodiment of timeless elegance, this exquisite ensemble is crafted in premium Chanderi silk, celebrated for its sheer texture and regal sheen. The kurta is delicately adorned with fine sequins and zari work, creating a soft, luminous shimmer that reflects refined craftsmanship. It is paired with a rich pure silk bottom, adding depth and a smooth, polished finish.\n\nThe highlight of the ensemble is the stunning Gazri pink dupatta, beautifully enhanced with intricate sequins booti work scattered gracefully all over and finished with an opulent sequins zari border. The blend of soft ivory and warm gazri pink tones creates a look that is both graceful and striking—perfect for elevated festive and celebratory occasions.",
    shortDescription: "Premium Chanderi silk suit with gazri pink dupatta and sequins zari work",
    features: [
      "Fabric (Kurta): Premium Chanderi silk",
      "Work: Fine sequins & zari embroidery",
      "Design: Elegant detailing with subtle texture and floral accents",
      "Dupatta: Gazri pink dupatta with sequins booti & zari border",
      "Bottom: Pure silk bottom",
      "Color Palette: Ivory base with gazri pink highlights",
      "Occasion: Festive wear, wedding functions & special occasions",
      "Look & Feel: Regal, soft, and luxuriously refined"
    ],
    basePrice: 5148,
    brand: "MANJASHAN",
    image: "/products/14/0A0A1871.JPG",
    video: "/products/14/video.mp4",
    images: [
      "/products/14/0A0A1871.JPG",
      "/products/14/0A0A1878.JPG",
      "/products/14/0A0A1879.JPG",
      "/products/14/0A0A2368.JPG",
      "/products/14/0A0A2374.JPG",
      "/products/14/0A0A2377.JPG",
    ],
    isNew: true,
    isFeatured: true,
    status: "active",
    tags: ["unstitched", "silk", "chanderi", "suit"],
  },
  {
    id: "12",
    slug: "mint-mirage-luxe-ensemble",
    name: "Mint Mirage Luxe Ensemble",
    description: "A soft pastel aqua with fresh, cool undertones, complemented by subtle ivory zig-zag patterns with multicolor floral hints. The fabric is a lightweight, sheer, and flowy Chiffon/Organza blend for the dupatta, paired with a Crepe/Chanderi-style blend for the kurta. It offers a smooth, airy, and breathable feel with a slightly glossy finish that gives a fresh, summery vibe. The digital floral print with geometric border detailing ensures you look effortlessly modern, while remaining comfortable and wrinkle-resistant.",
    shortDescription: "Soft pastel aqua printed suit with sheer zig-zag dupatta",
    features: [
      "Dupatta: Sheer aqua dupatta with zig-zag border print",
      "Kurta: Floral printed base with soft pastel blending",
      "Bottom: Plain solid matching bottom",
      "Occasion: Day wear, brunch, summer festive, casual elegance",
      "Vibe: Fresh, breezy, and modern luxury"
    ],
    basePrice: 3765,
    brand: "MANJASHAN",
    image: "/products/18/0A0A2053.JPG",
    video: "/products/18/video.mp4",
    images: [
      "/products/18/0A0A2053.JPG",
      "/products/18/0A0A2065.JPG",
      "/products/18/0A0A2070.JPG",
      "/products/18/0A0A2693.JPG",
      "/products/18/0A0A2699.JPG",
      "/products/18/0A0A2715.JPG",
    ],
    isNew: true,
    isFeatured: true,
    status: "active",
    tags: ["unstitched", "chiffon", "crepe", "suit"],
  },
  {
    id: "13",
    slug: "teal-aqua-mirror-work-silk-suit",
    name: "Teal Aqua Mirror Work Silk Suit",
    description:
      "Crafted in premium crape silk, this elegant ensemble is drenched in a rich teal aqua hue, radiating modern sophistication with a timeless appeal. The kurta is beautifully enhanced with intricate mirror work, delicately placed to create a subtle yet captivating shimmer. The textured base adds depth and dimension, elevating the overall richness of the outfit.\n\nPaired with a plain solid bottom, the look remains balanced and refined, allowing the detailed craftsmanship to stand out. The ensemble is completed with a sheer, flowy dupatta, gracefully finished with a golden border, adding a touch of regal charm and fluid elegance.",
    shortDescription:
      "Premium crape silk suit with mirror work detailing and golden border dupatta",
    features: [
      "Fabric (Kurta): Premium crape silk with soft textured finish",
      "Work: Elegant mirror work detailing for subtle shine",
      "Color: Teal aqua / ocean green tone",
      "Dupatta: Lightweight sheer dupatta with rich golden border",
      "Bottom: Plain solid bottom for a clean, polished look",
      "Texture Feel: Smooth, airy, and gracefully flowy",
      "Occasion: Perfect for festive wear, evening gatherings & celebrations",
      "Look & Feel: Regal, fresh, and effortlessly luxurious",
    ],
    basePrice: 3346,
    brand: "MANJASHAN",
    image: "/products/7/0A0A1620.JPG",
    video: "/products/7/video.mp4",
    images: [
      "/products/7/0A0A1620.JPG",
      "/products/7/0A0A1628.JPG",
      "/products/7/0A0A1629.JPG",
      "/products/7/0A0A2428.JPG",
      "/products/7/0A0A2435.JPG",
      "/products/7/0A0A2438.JPG",
    ],
    isNew: true,
    isFeatured: true,
    status: "active",
    tags: ["unstitched", "silk", "mirror-work", "suit"],
  },
  {
    id: "14",
    slug: "peach-golden-crush-diamond-suit",
    name: "Peach Golden Crush Diamond Suit",
    description:
      "Designed in exquisite crush diamond fabric with a subtle golden sheen, this elegant ensemble radiates soft luxury and festive charm. The kurta is beautifully adorned with intricate cutdana work, adding delicate sparkle and refined detailing across the surface. It is paired with a plain silk bottom that enhances the richness while keeping the look balanced. The highlight is the airy dupatta, featuring graceful cutdana booti work scattered all over and finished with an intricately detailed border, creating a perfect blend of elegance and sophistication.",
    shortDescription:
      "Crush diamond fabric suit with cutdana work and golden sheen",
    features: [
      "Fabric (Kurta & Dupatta): Premium crush diamond fabric with golden shaded finish",
      "Work: Fine cutdana embellishments for subtle shimmer",
      "Design: Elegant placement with scattered cutdana booti work",
      "Dupatta: Lightweight with all-over booti and detailed embroidered border",
      "Bottom: Plain silk bottom for a rich, polished look",
      "Color: Soft peach with golden undertones",
      "Occasion: Ideal for festive wear, day functions & elegant gatherings",
      "Look & Feel: Graceful, lightweight, and luxuriously radiant",
    ],
    basePrice: 5978,
    brand: "MANJASHAN",
    image: "/products/8/0A0A6234.JPG",
    video: "/products/8/video.mp4",
    images: [
      "/products/8/0A0A6234.JPG",
      "/products/8/0A0A6244.JPG",
      "/products/8/0A0A6247.JPG",
      "/products/8/0A0A6249.JPG",
      "/products/8/0A0A6260.JPG",
      "/products/8/0A0A6280.JPG",
    ],
    isNew: true,
    isFeatured: true,
    status: "active",
    tags: ["unstitched", "crush-diamond", "cutdana", "suit"],
  },
  {
    id: "15",
    slug: "red-swan-mull-cotton-suit",
    name: "Red Swan Mull Cotton Suit",
    description:
      "Crafted in soft and breathable mull cotton, this elegant ensemble blends comfort with subtle charm. The kurta features delicate thread work with graceful swan motifs, adding a unique and artistic touch. It is paired with a plain bottom that keeps the look clean and sophisticated. The highlight is the lightweight, airy dupatta, beautifully finished with intricate white thread work lace, enhancing the overall grace of the outfit. Perfect for effortless everyday elegance and light occasions.",
    shortDescription:
      "Soft mull cotton suit with swan motif thread work and lace dupatta",
    features: [
      "Fabric: Soft mull cotton (lightweight & breathable)",
      "Work: Elegant thread work with swan motifs",
      "Design: Minimal yet artistic detailing for a refined look",
      "Dupatta: Soft, flowy dupatta with white thread work lace border",
      "Bottom: Plain solid bottom for a neat finish",
      "Color: Rich red with subtle white accents",
      "Occasion: Ideal for casual wear, day outings & small gatherings",
      "Look & Feel: Comfortable, airy, and effortlessly graceful",
    ],
    basePrice: 5234,
    brand: "MANJASHAN",
    image: "/products/11/0A0A0221.JPG",
    video: "/products/11/video.mp4",
    images: [
      "/products/11/0A0A0221.JPG",
      "/products/11/0A0A0227.JPG",
      "/products/11/0A0A0231.JPG",
      "/products/11/0A0A1942.JPG",
      "/products/11/0A0A1948.JPG",
      "/products/11/0A0A1954.JPG",
    ],
    isNew: true,
    isFeatured: true,
    status: "active",
    tags: ["unstitched", "cotton", "thread-work", "suit"],
  },
  {
    id: "16",
    slug: "ivory-blossom-chanderi-ensemble",
    name: "Ivory Blossom Chanderi Ensemble",
    description:
      "An expression of subtle luxury and graceful artistry, this ensemble is crafted in premium Chanderi cotton in a serene ivory base, exuding timeless elegance with a soft, sophisticated charm.\n\nThe kurta is adorned with delicate multi-colour floral booti work scattered gracefully across the body, creating a light and refreshing aesthetic. The lower panel is beautifully enhanced with intricate floral detailing, adding depth and a rich visual appeal while maintaining an understated elegance.\n\nIt is paired with a minimal yet elegant plain bottom, allowing the intricate craftsmanship of the kurta and dupatta to stand out effortlessly.\n\nThe highlight of this ensemble is its ethereal dupatta, designed in sheer Chanderi fabric and enriched with multi-colour thread embroidered floral motifs. The dupatta is further elevated with a finely detailed embroidered border, lending it a soft, feminine flow and a luxurious finish.",
    shortDescription:
      "Premium Chanderi cotton ensemble with multi-colour floral booti work",
    features: [
      "Premium Chanderi cotton fabric in elegant ivory tone",
      "Delicate multi-colour floral booti work on kurta",
      "Enhanced floral detailing on the lower panel",
      "Lightweight, flowy dupatta with vibrant thread embroidery",
      "Intricate embroidered border for a refined finish",
      "Paired with a plain bottom for balanced sophistication",
    ],
    basePrice: 4954,
    brand: "MANJASHAN",
    image: "/products/12/0A0A0249.JPG",
    video: "/products/12/video.mp4",
    images: [
      "/products/12/0A0A0249.JPG",
      "/products/12/0A0A0256.JPG",
      "/products/12/0A0A0259.JPG",
      "/products/12/0A0A1974.JPG",
      "/products/12/0A0A1978.JPG",
      "/products/12/0A0A1984.JPG",
    ],
    isNew: true,
    isFeatured: true,
    status: "active",
    tags: ["unstitched", "chanderi", "floral", "suit"],
  },
  {
    id: "17",
    slug: "mustard-bloom-chanderi-elegance",
    name: "Mustard Bloom Chanderi Elegance",
    description:
      "Crafted in luxurious Chanderi cotton, this ensemble is a true reflection of refined elegance and timeless craftsmanship. The rich mustard hue brings a radiant warmth, perfectly complemented by intricate all-over thread embroidery that enhances its graceful appeal.\n\nThe kurta features delicate floral thread work scattered subtly across the body, creating a soft, sophisticated texture. The highlight lies in its heavily adorned lower border, showcasing exquisite floral thread embroidery that adds depth and a couture finish to the silhouette.\n\nPaired with a beautifully coordinated bottom, also enriched with intricate floral thread work, this set ensures a seamless and premium look from top to toe.\n\nThe look is elevated further with a sheer and airy dupatta, adorned with elegant floral booti thread work all over. The dupatta is framed with a finely detailed embroidered border, enhancing its flowy drape and lending an ethereal charm.",
    shortDescription:
      "Luxurious Chanderi cotton suit in rich mustard with all-over floral thread embroidery",
    features: [
      "Premium Chanderi cotton fabric",
      "Elegant mustard tone for a rich, festive appeal",
      "Intricate all-over floral thread embroidery",
      "Statement heavy embroidered lower border",
      "Matching embroidered bottom for a complete look",
      "Lightweight dupatta with floral booti and detailed border",
    ],
    basePrice: 6844,
    brand: "MANJASHAN",
    image: "/products/17/0A0A2002.JPG",
    video: "/products/17/video.mp4",
    images: [
      "/products/17/0A0A2002.JPG",
      "/products/17/0A0A2006.JPG",
      "/products/17/0A0A2011.JPG",
      "/products/17/0A0A9963.JPG",
      "/products/17/0A0A9966.JPG",
      "/products/17/0A0A9969.JPG",
    ],
    isNew: true,
    isFeatured: true,
    status: "active",
    tags: ["unstitched", "chanderi", "embroidery", "suit"],
  },
  {
    id: "18",
    slug: "aab-e-neel-serenity-mull-cotton-suit",
    name: "Aab-e-Neel Serenity Suit",
    description:
      "Step into effortless elegance with this exquisitely crafted ensemble in pure mull cotton, designed to embody softness, grace, and understated luxury. The soothing powder blue hue reflects serenity, making it a perfect choice for refined daywear and intimate occasions.\n\nThe kurta is delicately adorned with handcrafted pearl (purl) booti work, meticulously placed across the fabric, adding a subtle shimmer and artisanal charm without overpowering its minimal aesthetic.\n\nIt is paired with a luxurious pure Chanderi silk bottom, kept elegantly plain to balance the intricacy of the upper silhouette while enhancing comfort and richness.\n\nThe highlight of this ensemble is its beautifully shaded dupatta, flowing gracefully in soft tonal gradients. Finished with elegant moti lace detailing and delicate hanging accents, the dupatta adds movement, texture, and a couture-inspired finish to the look.",
    shortDescription:
      "Pure mull cotton suit in powder blue with pearl booti work and shaded dupatta",
    features: [
      "Pure mull cotton kurta – ultra-soft, breathable & premium",
      "Handcrafted pearl (purl) booti work for subtle elegance",
      "Soothing powder blue shade for a serene, luxe feel",
      "Pure Chanderi silk bottom in a clean, minimal finish",
      "Shaded dupatta with graceful tonal blend",
      "Detailed with moti lace border & hanging accents for a refined look",
      "Perfect blend of comfort + sophistication",
    ],
    basePrice: 6428,
    brand: "MANJASHAN",
    image: "/products/13/0A0A0265.JPG",
    video: "/products/13/video.mp4",
    images: [
      "/products/13/0A0A0265.JPG",
      "/products/13/0A0A0269.JPG",
      "/products/13/0A0A1678.JPG",
      "/products/13/0A0A1691.JPG",
      "/products/13/0A0A1696.JPG",
      "/products/13/0A0A2393.JPG",
    ],
    isNew: true,
    isFeatured: true,
    status: "active",
    tags: ["unstitched", "cotton", "pearl", "suit"],
  },
  {
    id: "19",
    slug: "peacock-teal-banarasi-silk-suit",
    name: "Peacock Teal Banarasi Silk Suit",
    description:
      "A masterpiece of regal artistry, this exquisite ensemble from Label Manjashan is crafted in lustrous Banarasi silk, rendered in a rich peacock teal hue that commands attention with its deep, jewel-toned brilliance. The kurta is graced with an intricately worked ornamental neckline panel — a centrepiece of fine silver-gold zari embroidery inspired by classic Mughal medallion motifs — that lends the piece an unmistakably couture presence.\n\nScattered golden floral booti work adorns the body of the kurta, creating a subtle shimmer against the silk canvas. The lower hem is finished with an opulent Banarasi woven border of intricate geometric and floral patterns, adding depth and grandeur to the silhouette. The ensemble is paired with a plain silk bottom in a matching teal tone, offering a sleek, polished finish.\n\nThe showpiece is the breathtaking dupatta — crafted in sheer organza with the same deep teal richness — featuring large-scale silver zari floral motifs woven along the body and a dramatically ornate Banarasi woven border, making it a statement drape of timeless elegance.",
    shortDescription:
      "Banarasi silk suit in peacock teal with ornate zari neckline and floral booti detailing",
    features: [
      "Fabric (Kurta): Premium Banarasi silk with a rich, lustrous finish",
      "Colour: Deep peacock teal — a jewel-toned statement hue",
      "Work: Intricate silver-gold zari Mughal medallion neckline panel",
      "Detailing: Scattered golden floral booti work across the kurta",
      "Border: Opulent Banarasi woven geometric floral hem border",
      "Bottom: Plain silk bottom in matching teal for a sleek finish",
      "Dupatta: Sheer organza with large silver zari floral motifs and heavy woven border",
      "Occasion: Ideal for weddings, festive celebrations & formal evening events",
      "Look & Feel: Regal, luminous, and timelessly luxurious",
    ],
    basePrice: 7248,
    brand: "MANJASHAN",
    image: "/products/10/0A0A0237.JPG",
    video: "/products/10/video.mp4",
    images: [
      "/products/10/0A0A0237.JPG",
      "/products/10/0A0A0241.JPG",
      "/products/10/0A0A0244.JPG",
      "/products/10/0A0A1654.JPG",
      "/products/10/0A0A1666.JPG",
      "/products/10/0A0A1671.JPG",
    ],
    isNew: true,
    isFeatured: true,
    status: "active",
    careInstructions:
      "Banarasi silk. Dry clean only. Handle with care to preserve the zari embroidery. Store folded in muslin cloth away from direct sunlight.",
    tags: ["unstitched", "banarasi", "silk", "zari", "suit"],
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

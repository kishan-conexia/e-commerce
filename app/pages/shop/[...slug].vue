<template>
  <div class="min-h-screen">
    <!-- Page Header -->
    <div class="bg-ivory/50 py-12 lg:py-16">
      <div class="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h1
          class="font-heading text-hero uppercase tracking-wider text-charcoal"
        >
          {{ pageTitle }}
        </h1>
        <p class="text-sm text-taupe mt-2">{{ productCount }} products</p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 lg:px-8 py-10 lg:py-14">
      <div class="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <!-- Filters Sidebar -->
        <aside class="lg:w-64 flex-shrink-0">
          <!-- Mobile filter toggle -->
          <button
            class="lg:hidden w-full flex items-center justify-between py-3 px-4 border border-charcoal/10 text-sm tracking-wider uppercase mb-4"
            @click="showFilters = !showFilters"
          >
            Filters
            <svg
              class="w-4 h-4 transition-transform"
              :class="showFilters && 'rotate-180'"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <div
            :class="showFilters ? 'block' : 'hidden lg:block'"
            class="space-y-8"
          >
            <!-- Sort -->
            <div>
              <h4
                class="text-xs font-semibold tracking-[0.15em] uppercase text-charcoal mb-3"
              >
                Sort By
              </h4>
              <select
                v-model="sortBy"
                class="w-full px-3 py-2 border border-charcoal/10 bg-transparent text-sm focus:outline-none focus:border-champagne/50"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

            <!-- Size Filter -->
            <div>
              <h4
                class="text-xs font-semibold tracking-[0.15em] uppercase text-charcoal mb-3"
              >
                Size
              </h4>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="size in sizes"
                  :key="size"
                  class="w-10 h-10 flex items-center justify-center text-xs border transition-all duration-200"
                  :class="
                    selectedSizes.includes(size)
                      ? 'border-charcoal bg-charcoal text-ivory'
                      : 'border-charcoal/15 text-charcoal/70 hover:border-charcoal/40'
                  "
                  @click="toggleSize(size)"
                >
                  {{ size }}
                </button>
              </div>
            </div>

            <!-- Color Filter -->
            <div>
              <h4
                class="text-xs font-semibold tracking-[0.15em] uppercase text-charcoal mb-3"
              >
                Color
              </h4>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="color in colorOptions"
                  :key="color.value"
                  class="w-7 h-7 rounded-full border-2 transition-all duration-200"
                  :class="
                    selectedColors.includes(color.value)
                      ? 'border-champagne scale-110'
                      : 'border-transparent hover:border-charcoal/20'
                  "
                  :style="{ backgroundColor: color.hex }"
                  :title="color.label"
                  @click="toggleColor(color.value)"
                />
              </div>
            </div>

            <!-- Price Range -->
            <div>
              <h4
                class="text-xs font-semibold tracking-[0.15em] uppercase text-charcoal mb-3"
              >
                Price Range
              </h4>
              <div class="space-y-2">
                <label
                  v-for="range in priceRanges"
                  :key="range.label"
                  class="flex items-center gap-2 text-sm text-charcoal/70 cursor-pointer hover:text-charcoal transition-colors"
                >
                  <input
                    type="checkbox"
                    :value="range.label"
                    v-model="selectedPriceRanges"
                    class="accent-champagne"
                  />
                  {{ range.label }}
                </label>
              </div>
            </div>

            <!-- Clear Filters -->
            <button
              class="text-xs tracking-wider uppercase text-taupe hover:text-champagne transition-colors underline underline-offset-4"
              @click="clearFilters"
            >
              Clear All Filters
            </button>
          </div>
        </aside>

        <!-- Product Grid -->
        <div class="flex-1">
          <div class="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            <ProductCard
              v-for="product in sortedProducts"
              :key="product.id"
              :product="{
                id: product.id,
                slug: product.slug,
                name: product.name,
                brand: product.brand,
                price: product.basePrice,
                compareAtPrice: product.compareAtPrice,
                image: product.image,
                isNew: product.isNew,
                colors: product.colors,
              }"
            />
          </div>

          <div v-if="sortedProducts.length === 0" class="text-center py-20">
            <p class="font-heading text-xl text-charcoal/60 mb-2">
              No products found
            </p>
            <p class="text-sm text-taupe">Try adjusting your filters</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { products } = useProducts();

const showFilters = ref(false);
const sortBy = ref("featured");
const selectedSizes = ref<string[]>([]);
const selectedColors = ref<string[]>([]);
const selectedPriceRanges = ref<string[]>([]);

const slugParts = computed(() => {
  const slugParam = route.params.slug;
  return Array.isArray(slugParam) ? slugParam : [slugParam];
});

const pageTitle = computed(() => {
  const last = slugParts.value[slugParts.value.length - 1] || "Shop";
  return last.replace(/-/g, " ");
});

const productCount = computed(() => sortedProducts.value.length);

const sortedProducts = computed(() => {
  let filtered = [...products.value] as Product[];

  // Filter by Category
  const currentSlug = slugParts.value[slugParts.value.length - 1];
  if (currentSlug && currentSlug !== "shop") {
    // 'shop' is base route
    // Simple tag matching for demo data (e.g. 'sarees' -> 'saree')
    const singularSlug = currentSlug.endsWith("s")
      ? currentSlug.slice(0, -1)
      : currentSlug;
    filtered = filtered.filter((p) =>
      p.tags?.some((t) => t.includes(singularSlug) || t === currentSlug),
    );
  }

  // Filter by Size
  if (selectedSizes.value.length > 0) {
    // ... (Size filtering logic would go here if attributes were populated)
  }

  // Filter by Color
  if (selectedColors.value.length > 0) {
    // ... (Color filtering logic)
  }

  // Filter by Price
  if (selectedPriceRanges.value.length > 0) {
    filtered = filtered.filter((p) => {
      return selectedPriceRanges.value.some((label) => {
        const range = priceRanges.find((r) => r.label === label);
        if (!range) return false;
        return p.basePrice >= range.min && p.basePrice <= range.max;
      });
    });
  }

  switch (sortBy.value) {
    case "newest":
      return filtered.reverse();
    case "price-asc":
      return filtered.sort((a, b) => a.basePrice - b.basePrice);
    case "price-desc":
      return filtered.sort((a, b) => b.basePrice - a.basePrice);
    default:
      return filtered;
  }
});

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

const colorOptions = [
  { label: "Ivory", value: "ivory", hex: "#FFFFF0" },
  { label: "Champagne", value: "champagne", hex: "#C9A96E" },
  { label: "Black", value: "black", hex: "#1A1A1A" },
  { label: "Navy", value: "navy", hex: "#191970" },
  { label: "Rose", value: "rose", hex: "#C4A882" },
  { label: "Sage", value: "sage", hex: "#A8B5A0" },
];

const priceRanges = [
  { label: "Under ₹25,000", min: 0, max: 25000 },
  { label: "₹25,000 – ₹50,000", min: 25000, max: 50000 },
  { label: "₹50,000 – ₹1,00,000", min: 50000, max: 100000 },
  { label: "Above ₹1,00,000", min: 100000, max: Infinity },
];

function toggleSize(size: string) {
  const idx = selectedSizes.value.indexOf(size);
  if (idx >= 0) selectedSizes.value.splice(idx, 1);
  else selectedSizes.value.push(size);
}

function toggleColor(color: string) {
  const idx = selectedColors.value.indexOf(color);
  if (idx >= 0) selectedColors.value.splice(idx, 1);
  else selectedColors.value.push(color);
}

function clearFilters() {
  selectedSizes.value = [];
  selectedColors.value = [];
  selectedPriceRanges.value = [];
  sortBy.value = "featured";
}

useHead({
  title: `${pageTitle.value} — MAISON`,
});
</script>

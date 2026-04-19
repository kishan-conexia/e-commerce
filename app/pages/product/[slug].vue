<template>
  <div class="min-h-screen">
    <div v-if="product" class="max-w-7xl mx-auto px-6 lg:px-8 py-8 lg:py-14">
      <!-- Breadcrumbs -->
      <nav class="flex items-center gap-2 text-xs text-taupe mb-8">
        <NuxtLink to="/" class="hover:text-champagne transition-colors">Home</NuxtLink>
        <span>/</span>
        <NuxtLink to="/shop/women" class="hover:text-champagne transition-colors">Shop</NuxtLink>
        <span>/</span>
        <span class="text-charcoal">{{ product.name }}</span>
      </nav>

      <div class="grid lg:grid-cols-2 gap-8 lg:gap-16">
        <!-- Image Gallery -->
        <div class="space-y-4">
          <!-- Main Image -->
          <div class="aspect-[3/4] rounded-lg overflow-hidden bg-ivory">
            <img
              :src="activeImage"
              :alt="product.name"
              class="w-full h-full object-cover transition-opacity duration-300"
            />
          </div>
          <!-- Thumbnails -->
          <div class="grid grid-cols-6 gap-2">
            <button
              v-for="(img, i) in product.images"
              :key="i"
              class="aspect-square rounded overflow-hidden border-2 transition-all duration-200"
              :class="activeImageIndex === i
                ? 'border-champagne ring-1 ring-champagne/30'
                : 'border-transparent hover:border-charcoal/20'"
              @click="activeImageIndex = i"
            >
              <img
                :src="img"
                :alt="`${product.name} view ${i + 1}`"
                class="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>

        <!-- Product Info -->
        <div class="lg:sticky lg:top-32 lg:self-start space-y-6">
          <!-- Brand & Name -->
          <div>
            <p v-if="product.brand" class="text-xs tracking-[0.2em] uppercase text-taupe mb-2">{{ product.brand }}</p>
            <h1 class="font-heading text-2xl lg:text-3xl text-charcoal tracking-wide">{{ product.name }}</h1>
          </div>

          <!-- Price -->
          <div class="flex items-baseline gap-3">
            <span class="text-xl font-heading text-charcoal">₹{{ product.basePrice.toLocaleString('en-IN') }}</span>
            <span v-if="product.compareAtPrice" class="text-sm text-taupe line-through">
              ₹{{ product.compareAtPrice.toLocaleString('en-IN') }}
            </span>
            <span v-if="product.compareAtPrice" class="text-xs font-semibold text-champagne uppercase">
              {{ Math.round((1 - product.basePrice / product.compareAtPrice) * 100) }}% off
            </span>
          </div>

          <div class="divider !mx-0 !w-full" />

          <!-- Description and Features -->
          <div v-if="product.description || (product.features && product.features.length)" class="space-y-4">
            <ul v-if="product.features && product.features.length" class="list-disc pl-5 text-sm text-taupe space-y-1.5 marker:text-champagne">
              <li v-for="feature in product.features" :key="feature">{{ feature }}</li>
            </ul>
            <p v-if="product.description" class="text-sm text-taupe leading-relaxed">{{ product.description }}</p>
          </div>

          <!-- Material Info Badge -->
          <div class="flex flex-wrap gap-2">
            <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-champagne/10 text-xs font-medium text-charcoal">
              <svg class="w-3.5 h-3.5 text-champagne" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              Unstitched Material
            </span>
            <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sage/10 text-xs font-medium text-charcoal">
              3-Piece Set
            </span>
          </div>

          <!-- Add to Cart -->
          <div class="flex gap-3 pt-2">
            <button class="btn-primary flex-1" @click="handleAddToCart">
              <span>Add to Bag</span>
            </button>
            <button
              class="w-12 h-12 flex items-center justify-center border border-charcoal/15 hover:border-champagne hover:text-champagne transition-all duration-300"
              @click="isWishlisted = !isWishlisted"
              aria-label="Add to wishlist"
            >
              <svg class="w-5 h-5" :fill="isWishlisted ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24"
                :class="isWishlisted ? 'text-champagne' : ''"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          <!-- Collapsible Details -->
          <div class="divide-y divide-charcoal/5 pt-4">
            <details v-for="detail in productDetails" :key="detail.title" class="group py-4">
              <summary class="flex items-center justify-between cursor-pointer text-xs font-semibold tracking-[0.12em] uppercase text-charcoal">
                {{ detail.title }}
                <svg class="w-4 h-4 text-taupe group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p class="mt-3 text-sm text-taupe leading-relaxed">{{ detail.content }}</p>
            </details>
          </div>
        </div>
      </div>
    </div>

    <!-- Not Found -->
    <div v-else class="max-w-7xl mx-auto px-6 lg:px-8 py-20 text-center">
      <p class="font-heading text-2xl text-charcoal/60 mb-4">Product Not Found</p>
      <NuxtLink to="/shop/women" class="btn-outline">Browse Collection</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { getProductBySlug } = useProducts()
const { addItem } = useCart()

const slug = computed(() => route.params.slug as string)
const product = computed(() => getProductBySlug(slug.value))

const activeImageIndex = ref(0)
const isWishlisted = ref(false)

const activeImage = computed(() => product.value?.images?.[activeImageIndex.value] || product.value?.image || '')

const productDetails = computed(() => [
  {
    title: 'Fabric & Care',
    content: product.value?.careInstructions || 'Premium fabric. Dry clean recommended. Iron on low heat with a pressing cloth.',
  },
  {
    title: 'What\'s Included',
    content: 'This set includes unstitched kurta fabric, bottom/trouser fabric, and dupatta. Ready for custom tailoring to your measurements.',
  },
  {
    title: 'Shipping',
    content: 'Complimentary shipping on orders above ₹10,000. Standard delivery: 5-7 business days. Express delivery available at checkout.',
  },
])

function handleAddToCart() {
  if (!product.value) return
  addItem({
    id: product.value.id,
    variantId: product.value.id,
    name: product.value.name,
    variant: 'Unstitched Material',
    price: product.value.basePrice,
    image: product.value.image,
  })
}

useHead({
  title: product.value ? `${product.value.name} — MANJASHAN` : 'Product Not Found — MANJASHAN',
})
</script>

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
          <div class="aspect-[3/4] rounded-lg overflow-hidden bg-gradient-to-br from-taupe-light/10 to-champagne/5">
            <div class="w-full h-full flex items-center justify-center">
              <div class="text-center">
                <div class="w-24 h-24 mx-auto mb-4 rounded-full bg-champagne/10 flex items-center justify-center">
                  <span class="text-champagne text-3xl">✦</span>
                </div>
                <p class="font-heading text-lg text-charcoal/40">Product Image</p>
                <p class="text-xs text-taupe mt-1">{{ product.name }}</p>
              </div>
            </div>
          </div>
          <!-- Thumbnails -->
          <div class="grid grid-cols-4 gap-2">
            <div
              v-for="i in 4"
              :key="i"
              class="aspect-square rounded bg-taupe-light/10 cursor-pointer hover:ring-1 hover:ring-champagne/50 transition-all"
            />
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

          <!-- Color Selection -->
          <div v-if="product.colors?.length">
            <h3 class="text-xs font-semibold tracking-[0.15em] uppercase text-charcoal mb-3">
              Color: <span class="font-normal text-taupe">{{ selectedColor || 'Select' }}</span>
            </h3>
            <div class="flex gap-2">
              <button
                v-for="(color, i) in product.colors"
                :key="color"
                class="w-9 h-9 rounded-full border-2 transition-all duration-200"
                :class="selectedColorIndex === i ? 'border-charcoal scale-110' : 'border-charcoal/10 hover:border-charcoal/30'"
                :style="{ backgroundColor: color }"
                @click="selectedColorIndex = i"
              />
            </div>
          </div>

          <!-- Size Selection -->
          <div>
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-xs font-semibold tracking-[0.15em] uppercase text-charcoal">
                Size: <span class="font-normal text-taupe">{{ selectedSize || 'Select' }}</span>
              </h3>
              <button class="text-xs text-taupe underline underline-offset-4 hover:text-champagne transition-colors">
                Size Guide
              </button>
            </div>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="size in availableSizes"
                :key="size"
                class="min-w-[3rem] h-11 px-3 flex items-center justify-center text-sm border transition-all duration-200"
                :class="selectedSize === size
                  ? 'border-charcoal bg-charcoal text-ivory'
                  : 'border-charcoal/15 text-charcoal hover:border-charcoal/40'"
                @click="selectedSize = size"
              >
                {{ size }}
              </button>
            </div>
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

const selectedSize = ref<string>('')
const selectedColorIndex = ref(0)
const isWishlisted = ref(false)

const availableSizes = ['XS', 'S', 'M', 'L', 'XL']
const selectedColor = computed(() => product.value?.colors?.[selectedColorIndex.value] ? `Color ${selectedColorIndex.value + 1}` : '')

const productDetails = computed(() => [
  {
    title: 'Description',
    content: product.value?.shortDescription || 'A meticulously crafted piece from the MAISON atelier, combining heritage techniques with contemporary design language.',
  },
  {
    title: 'Fabric & Care',
    content: product.value?.careInstructions || 'Premium natural fabric. Dry clean only. Store in a cool, dry place away from direct sunlight. Iron on low heat.',
  },
  {
    title: 'Shipping',
    content: 'Complimentary shipping on orders above ₹10,000. Standard delivery: 5-7 business days. Express delivery available at checkout.',
  },
])

function handleAddToCart() {
  if (!product.value) return
  addItem({
    id: `${product.value.id}-${selectedSize.value}`,
    variantId: `${product.value.id}-${selectedSize.value}`,
    name: product.value.name,
    variant: `${selectedColor.value} / ${selectedSize.value || 'One Size'}`,
    price: product.value.basePrice,
    image: product.value.image,
  })
}

useHead({
  title: product.value ? `${product.value.name} — MAISON` : 'Product Not Found — MAISON',
})
</script>

<template>
  <NuxtLink :to="`/product/${product.slug}`" class="product-card">
    <div class="product-image rounded-lg">
      <!-- Shimmer placeholder -->
      <div v-if="!imageLoaded" class="absolute inset-0 shimmer rounded-lg" />
      <img
        :src="product.image || '/images/placeholder.jpg'"
        :alt="product.name"
        class="rounded-lg"
        :class="{ loaded: imageLoaded }"
        loading="lazy"
        @load="imageLoaded = true"
      />
      <!-- Quick Actions Overlay -->
      <div class="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-300 rounded-lg flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
        <button
          class="px-6 py-2 bg-ivory/90 backdrop-blur-sm text-xs font-semibold tracking-[0.12em] uppercase text-charcoal hover:bg-ivory transition-all duration-200 shadow-lg"
          @click.prevent="addToCart"
        >
          Quick Add
        </button>
      </div>
      <!-- Wishlist -->
      <button
        class="absolute top-3 right-3 p-2 rounded-full bg-ivory/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-ivory"
        @click.prevent="toggleWishlist"
        aria-label="Add to wishlist"
      >
        <svg class="w-4 h-4" :fill="isWishlisted ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24"
          :class="isWishlisted ? 'text-champagne' : 'text-charcoal/60'"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
      <!-- Badges -->
      <div class="absolute top-3 left-3 flex flex-col gap-1">
        <span v-if="product.isNew" class="px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase bg-charcoal text-ivory">
          New
        </span>
        <span v-if="product.compareAtPrice" class="px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase bg-champagne text-ivory">
          Sale
        </span>
      </div>
    </div>

    <!-- Info -->
    <div class="mt-3 space-y-1">
      <p v-if="product.brand" class="text-[10px] tracking-[0.15em] uppercase text-taupe">
        {{ product.brand }}
      </p>
      <h3 class="font-heading text-sm lg:text-base text-charcoal group-hover:text-champagne transition-colors duration-300 line-clamp-2">
        {{ product.name }}
      </h3>
      <div class="flex items-center gap-2">
        <span class="text-sm font-medium text-charcoal">
          ₹{{ product.price.toLocaleString('en-IN') }}
        </span>
        <span v-if="product.compareAtPrice" class="text-xs text-taupe line-through">
          ₹{{ product.compareAtPrice.toLocaleString('en-IN') }}
        </span>
      </div>
      <!-- Color Swatches -->
      <div v-if="product.colors?.length" class="flex gap-1.5 pt-1">
        <span
          v-for="color in product.colors.slice(0, 4)"
          :key="color"
          class="w-3 h-3 rounded-full border border-charcoal/10"
          :style="{ backgroundColor: color }"
        />
        <span v-if="product.colors.length > 4" class="text-[10px] text-taupe ml-0.5">
          +{{ product.colors.length - 4 }}
        </span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
interface Product {
  id: string
  slug: string
  name: string
  brand?: string
  price: number
  compareAtPrice?: number
  image?: string
  isNew?: boolean
  colors?: string[]
}

const props = defineProps<{ product: Product }>()
const imageLoaded = ref(false)
const isWishlisted = ref(false)

function addToCart() {
  // TODO: open variant selection if needed
}

function toggleWishlist() {
  isWishlisted.value = !isWishlisted.value
}
</script>

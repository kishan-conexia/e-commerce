<template>
  <div class="min-h-screen">
    <!-- Page Header -->
    <div class="bg-ivory/50 py-12 lg:py-16">
      <div class="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h1
          class="font-heading text-hero uppercase tracking-wider text-charcoal"
        >
          Unstitched Collection
        </h1>
        <p class="text-sm text-taupe mt-2">
          {{ productCount }} pieces
        </p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 lg:px-8 py-10 lg:py-14">
      <!-- Sort Bar -->
      <div class="flex items-center justify-between mb-8">
        <p class="text-xs tracking-[0.12em] uppercase text-taupe">
          Showing {{ productCount }} results
        </p>
        <div class="flex items-center gap-3">
          <label
            class="text-xs tracking-[0.12em] uppercase text-charcoal/60"
            for="sort"
          >
            Sort by
          </label>
          <select
            id="sort"
            v-model="sortBy"
            class="px-3 py-2 border border-charcoal/10 bg-transparent text-sm focus:outline-none focus:border-champagne/50"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      <!-- Product Grid -->
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
          }"
        />
      </div>

      <div v-if="sortedProducts.length === 0" class="text-center py-20">
        <p class="font-heading text-xl text-charcoal/60 mb-2">
          No products found
        </p>
        <p class="text-sm text-taupe">Check back soon for new arrivals</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from "~/composables/useProducts";

const { products } = useProducts();

const sortBy = ref("featured");

const productCount = computed(() => sortedProducts.value.length);

const sortedProducts = computed(() => {
  let filtered = [...products.value] as Product[];

  switch (sortBy.value) {
    case "price-asc":
      return filtered.sort((a, b) => a.basePrice - b.basePrice);
    case "price-desc":
      return filtered.sort((a, b) => b.basePrice - a.basePrice);
    default:
      return filtered;
  }
});

useHead({
  title: "Shop — MANJASHAN | Unstitched Suit Materials",
});
</script>

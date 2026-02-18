<template>
  <div>
    <!-- Hero Section -->
    <section
      class="relative h-[85vh] min-h-[600px] overflow-hidden bg-charcoal"
    >
      <!-- Background gradient (placeholder for hero image) -->
      <div
        class="absolute inset-0 bg-gradient-to-br from-charcoal via-graphite to-charcoal"
      >
        <div
          class="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(201,169,110,0.15),transparent_70%)]"
        />
        <div
          class="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(168,181,160,0.1),transparent_60%)]"
        />
      </div>

      <!-- Decorative elements -->
      <div
        class="absolute top-20 right-10 w-96 h-96 border border-champagne/5 rounded-full animate-pulse"
        style="animation-duration: 4s"
      />
      <div
        class="absolute bottom-20 left-10 w-64 h-64 border border-champagne/5 rounded-full animate-pulse"
        style="animation-duration: 6s"
      />

      <!-- Content -->
      <div
        class="relative h-full max-w-7xl mx-auto px-6 lg:px-8 flex flex-col justify-center items-center text-center z-10"
      >
        <p
          v-reveal="50"
          class="text-champagne/70 text-xs tracking-[0.3em] uppercase mb-4"
        >
          Spring / Summer 2026
        </p>
        <h1 v-reveal="150" class="font-heading text-display text-ivory mb-6">
          The Art of<br />
          <span class="text-champagne">Refined Elegance</span>
        </h1>
        <p v-reveal="250" class="text-ivory/50 text-sm max-w-lg mx-auto mb-10">
          Where heritage craftsmanship meets contemporary design. Discover our
          latest collection of handcrafted luxury pieces.
        </p>
        <div
          v-reveal="350"
          class="flex flex-col sm:flex-row items-center gap-4 sm:gap-5"
        >
          <NuxtLink
            to="/shop/women"
            class="group relative inline-flex items-center justify-center px-10 py-3.5 text-[11px] font-semibold tracking-[0.2em] uppercase text-white overflow-hidden transition-all duration-500 hover:-translate-y-0.5"
          >
            <span
              class="absolute inset-0 bg-gradient-to-r from-champagne to-gold-dark transition-opacity duration-500"
            />
            <span
              class="absolute inset-0 bg-gradient-to-r from-gold-dark to-champagne opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
            <span
              class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_8px_30px_rgba(201,169,110,0.4)]"
            />
            <span class="relative z-10">Shop Women</span>
          </NuxtLink>
          <NuxtLink
            to="/shop/men"
            class="inline-flex items-center justify-center px-10 py-3.5 text-[11px] font-semibold tracking-[0.2em] uppercase text-ivory/80 border border-ivory/25 hover:border-ivory/60 hover:text-ivory hover:bg-ivory/5 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(255,255,240,0.08)]"
          >
            Shop Men
          </NuxtLink>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div
        class="absolute bottom-8 left-0 right-0 flex justify-center z-10 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce"
        style="animation-duration: 2s"
      >
        <span class="text-ivory/30 text-[10px] tracking-[0.2em] uppercase"
          >Scroll</span
        >
        <div class="w-px h-8 bg-gradient-to-b from-ivory/30 to-transparent" />
      </div>
    </section>

    <!-- Shop by Category -->
    <section class="py-20 lg:py-28">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div v-reveal class="text-center mb-14">
          <p class="section-subtitle mb-3">Explore</p>
          <h2 class="section-title">Shop by Category</h2>
          <div class="divider mt-5" />
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          <NuxtLink
            v-for="(cat, i) in categories"
            :key="cat.slug"
            :to="`/shop/${cat.slug}`"
            v-reveal="i * 100"
            class="group relative aspect-[3/4] overflow-hidden rounded-lg cursor-pointer"
          >
            <div class="absolute inset-0" :class="cat.bgClass" />

            <div
              class="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent pointer-events-none"
            />
            <div class="absolute bottom-0 left-0 right-0 p-5">
              <h3
                class="font-heading text-lg lg:text-xl text-ivory tracking-wider uppercase"
              >
                {{ cat.name }}
              </h3>
              <p
                class="text-ivory/50 text-xs mt-1 group-hover:text-champagne transition-colors"
              >
                Shop Now →
              </p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-16 lg:py-24 bg-ivory/50">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div v-reveal class="text-center mb-14">
          <p class="section-subtitle mb-3">Curated For You</p>
          <h2 class="section-title">In the Spotlight</h2>
          <div class="divider mt-5" />
        </div>

        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <div
            v-for="(product, i) in featuredProducts"
            :key="product.id"
            v-reveal="i * 80"
          >
            <ProductCard
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
        </div>

        <div v-reveal class="text-center mt-12">
          <NuxtLink to="/shop/new-arrivals" class="btn-outline">
            View All
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Collection Banner -->
    <section class="py-20 lg:py-28">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="grid md:grid-cols-2 gap-6 lg:gap-8">
          <!-- Left Banner -->
          <NuxtLink
            v-reveal
            to="/collections/summer-2026"
            class="group relative aspect-[4/5] md:aspect-auto overflow-hidden rounded-lg"
          >
            <div
              class="absolute inset-0 bg-gradient-to-br from-champagne/20 via-rose/10 to-sage/10"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent"
            />
            <div
              class="absolute inset-0 group-hover:scale-105 transition-transform duration-700 ease-luxury"
            />
            <div
              class="relative h-full min-h-[400px] flex flex-col justify-end p-8 lg:p-12"
            >
              <p class="text-ivory/70 text-xs tracking-[0.2em] uppercase mb-2">
                New Collection
              </p>
              <h3 class="font-heading text-3xl lg:text-4xl text-ivory mb-2">
                Summer<br />Solstice
              </h3>
              <p class="text-ivory/60 text-sm mb-6 max-w-xs">
                Ethereal silhouettes in sun-kissed hues
              </p>
              <span
                class="text-xs tracking-[0.15em] uppercase text-champagne group-hover:translate-x-2 transition-transform duration-300"
              >
                Discover →
              </span>
            </div>
          </NuxtLink>

          <!-- Right Banner -->
          <NuxtLink
            v-reveal="100"
            to="/collections/bridal-2026"
            class="group relative aspect-[4/5] md:aspect-auto overflow-hidden rounded-lg"
          >
            <div
              class="absolute inset-0 bg-gradient-to-br from-charcoal via-graphite to-charcoal"
            />
            <div
              class="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(201,169,110,0.15),transparent_70%)]"
            />
            <div
              class="absolute inset-0 group-hover:scale-105 transition-transform duration-700 ease-luxury"
            />
            <div
              class="relative h-full min-h-[400px] flex flex-col justify-end p-8 lg:p-12"
            >
              <p
                class="text-champagne/70 text-xs tracking-[0.2em] uppercase mb-2"
              >
                Bridal Edit
              </p>
              <h3 class="font-heading text-3xl lg:text-4xl text-ivory mb-2">
                Eternal<br />Romance
              </h3>
              <p class="text-ivory/50 text-sm mb-6 max-w-xs">
                Heirloom pieces for your most cherished moments
              </p>
              <span
                class="text-xs tracking-[0.15em] uppercase text-champagne group-hover:translate-x-2 transition-transform duration-300"
              >
                Explore →
              </span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Craftsmanship Section -->
    <section class="py-20 lg:py-28 bg-charcoal text-ivory">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="grid md:grid-cols-3 gap-12 lg:gap-16 text-center">
          <div
            v-for="(pillar, i) in pillars"
            :key="pillar.title"
            v-reveal="i * 120"
            class="space-y-4"
          >
            <div
              class="w-12 h-12 mx-auto flex items-center justify-center border border-champagne/20 rounded-full"
            >
              <span class="text-champagne text-lg" v-html="pillar.icon" />
            </div>
            <h3 class="font-heading text-xl tracking-wide uppercase">
              {{ pillar.title }}
            </h3>
            <p class="text-ivory/40 text-sm leading-relaxed">
              {{ pillar.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- New Arrivals -->
    <section v-if="newArrivals.length" class="py-16 lg:py-24">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div v-reveal class="flex items-end justify-between mb-10">
          <div>
            <p class="section-subtitle mb-2">Just In</p>
            <h2 class="section-title">New Arrivals</h2>
          </div>
          <NuxtLink
            to="/shop/new-arrivals"
            class="text-xs tracking-[0.12em] uppercase text-taupe hover:text-champagne transition-colors hidden sm:block"
          >
            View All →
          </NuxtLink>
        </div>

        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <div
            v-for="(product, i) in newArrivals"
            :key="product.id"
            v-reveal="i * 80"
          >
            <ProductCard
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
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { vReveal } from "~/composables/useReveal";

const { featuredProducts, newArrivals } = useProducts();

const categories = [
  {
    name: "Sarees",
    slug: "sarees",
    bgClass: "bg-gradient-to-br from-champagne/30 to-rose/20",
  },
  {
    name: "Dresses",
    slug: "dresses",
    bgClass: "bg-gradient-to-br from-sage/30 to-taupe/20",
  },
  {
    name: "Lehengas",
    slug: "lehengas",
    bgClass: "bg-gradient-to-br from-rose/25 to-champagne/15",
  },
  {
    name: "Co-Ords",
    slug: "co-ords",
    bgClass: "bg-gradient-to-br from-taupe/30 to-sage/15",
  },
];

const pillars = [
  {
    title: "Heritage Craft",
    icon: "✦",
    description:
      "Each piece is meticulously handcrafted by master artisans, preserving centuries-old techniques passed down through generations.",
  },
  {
    title: "Sustainable Luxury",
    icon: "❋",
    description:
      "We source the finest natural fabrics and employ eco-conscious processes, ensuring beauty that respects our planet.",
  },
  {
    title: "Timeless Design",
    icon: "◆",
    description:
      "Our designs transcend seasons, blending contemporary silhouettes with traditional motifs for enduring elegance.",
  },
];

useHead({
  title: "MAISON — Premium Fashion | Luxury Clothing & Accessories",
  meta: [
    {
      name: "description",
      content:
        "Discover curated luxury fashion at MAISON. Handcrafted elegance meets modern design in our collections of sarees, dresses, lehengas, and more.",
    },
  ],
});
</script>

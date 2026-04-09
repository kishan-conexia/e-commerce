<template>
  <div>
    <!-- Hero Section -->
    <section
      class="relative h-[85vh] min-h-[600px] overflow-hidden bg-charcoal"
    >
      <!-- Background gradient -->
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
          Premium Unstitched Collection
        </p>
        <h1 v-reveal="150" class="font-heading text-display text-ivory mb-6">
          Craft Your Own<br />
          <span class="text-champagne">Signature Style</span>
        </h1>
        <p v-reveal="250" class="text-ivory/50 text-sm max-w-lg mx-auto mb-10">
          Explore our curated collection of premium unstitched suit materials.
          Handpicked fabrics with exquisite embroidery, designed for your
          personal tailoring.
        </p>
        <div v-reveal="350" class="flex items-center gap-5">
          <NuxtLink
            to="/shop/all"
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
            <span class="relative z-10">Explore Collection</span>
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

    <!-- Our Collection -->
    <section class="py-16 lg:py-24 bg-ivory/50">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div v-reveal class="text-center mb-14">
          <p class="section-subtitle mb-3">Curated For You</p>
          <h2 class="section-title">Our Collection</h2>
          <p class="text-sm text-taupe max-w-lg mx-auto mt-4">
            Each piece is hand-selected for its exceptional fabric quality,
            intricate embroidery, and timeless design.
          </p>
          <div class="divider mt-5" />
        </div>

        <div class="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          <div
            v-for="(product, i) in products"
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
              }"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="py-20 lg:py-28 bg-charcoal text-ivory">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div v-reveal class="text-center mb-16">
          <p
            class="text-champagne/70 text-xs tracking-[0.25em] uppercase mb-3"
          >
            The MANJASHAN Promise
          </p>
          <h2 class="font-heading text-3xl lg:text-4xl tracking-wide">
            Why Choose Us
          </h2>
        </div>
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

    <!-- How It Works -->
    <section class="py-20 lg:py-28">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div v-reveal class="text-center mb-16">
          <p class="section-subtitle mb-3">Simple Process</p>
          <h2 class="section-title">How It Works</h2>
          <div class="divider mt-5" />
        </div>
        <div class="grid md:grid-cols-3 gap-10 lg:gap-14">
          <div
            v-for="(step, i) in steps"
            :key="step.title"
            v-reveal="i * 120"
            class="text-center space-y-4"
          >
            <div
              class="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-champagne/10 text-champagne font-heading text-xl"
            >
              {{ i + 1 }}
            </div>
            <h3
              class="font-heading text-lg tracking-wide uppercase text-charcoal"
            >
              {{ step.title }}
            </h3>
            <p class="text-sm text-taupe leading-relaxed">
              {{ step.description }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { vReveal } from "~/composables/useReveal";

const { products } = useProducts();

const pillars = [
  {
    title: "Premium Fabrics",
    icon: "✦",
    description:
      "We source the finest organza, chiffon, silk, and georgette from trusted mills, ensuring every yard meets our exacting standards.",
  },
  {
    title: "Artisan Embroidery",
    icon: "❋",
    description:
      "From delicate threadwork to intricate appliqué, each piece is embellished by skilled craftsmen with meticulous attention to detail.",
  },
  {
    title: "Custom Tailoring",
    icon: "◆",
    description:
      "Unstitched materials give you the freedom to create a perfect fit. Design your silhouette, your way.",
  },
];

const steps = [
  {
    title: "Choose Your Fabric",
    description:
      "Browse our curated collection of premium unstitched suit materials. Each set includes kurta, bottom, and dupatta fabric.",
  },
  {
    title: "Place Your Order",
    description:
      "Select your favourite piece and order online. We carefully package and ship your materials with complimentary shipping above ₹10,000.",
  },
  {
    title: "Get It Tailored",
    description:
      "Take it to your trusted tailor and get it stitched to your exact measurements for a perfect, personalised fit.",
  },
];

useHead({
  title: "MANJASHAN — Premium Unstitched Suit Materials",
  meta: [
    {
      name: "description",
      content:
        "Discover curated premium unstitched suit materials at MANJASHAN. Handpicked fabrics with exquisite embroidery — organza, chiffon, silk, and more.",
    },
  ],
});
</script>

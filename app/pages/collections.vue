<template>
  <div class="min-h-screen">
    <div class="max-w-7xl mx-auto px-6 lg:px-8 py-10 lg:py-16">
      <h1 class="font-heading text-hero uppercase tracking-wider text-charcoal text-center mb-4">Collections</h1>
      <p class="text-center text-sm text-taupe mb-14">Discover our curated seasonal and thematic collections</p>

      <div class="grid md:grid-cols-2 gap-6">
        <NuxtLink
          v-for="collection in collections"
          :key="collection.slug"
          :to="`/shop/${collection.slug}`"
          class="group relative aspect-[16/10] overflow-hidden rounded-lg cursor-pointer"
        >
          <div class="absolute inset-0" :class="collection.bgClass" />
          <div class="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent" />
          <div class="absolute inset-0 group-hover:scale-105 transition-transform duration-700 ease-luxury" />
          <div class="relative h-full flex flex-col justify-end p-8">
            <p class="text-ivory/60 text-xs tracking-[0.2em] uppercase mb-1">{{ collection.season }}</p>
            <h3 class="font-heading text-2xl lg:text-3xl text-ivory tracking-wide">{{ collection.name }}</h3>
            <p class="text-ivory/50 text-sm mt-2 max-w-xs">{{ collection.description }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const collections = [
  {
    name: 'Summer Solstice', slug: 'summer-2026', season: 'Spring/Summer 2026',
    description: 'Ethereal silhouettes in sun-kissed hues',
    bgClass: 'bg-gradient-to-br from-champagne/30 via-rose/15 to-sage/20',
  },
  {
    name: 'Eternal Romance', slug: 'bridal-2026', season: 'Bridal 2026',
    description: 'Heirloom pieces for cherished moments',
    bgClass: 'bg-gradient-to-br from-charcoal via-graphite to-charcoal',
  },
  {
    name: 'Benarasi Heritage', slug: 'benarasi', season: 'Perennial',
    description: 'Handwoven Benarasi silks from master weavers',
    bgClass: 'bg-gradient-to-br from-gold-dark/30 via-champagne/20 to-rose/15',
  },
  {
    name: 'The Cocktail Edit', slug: 'cocktail', season: 'Evening Wear',
    description: 'Glamorous evening and occasion wear',
    bgClass: 'bg-gradient-to-br from-graphite via-charcoal/80 to-taupe/30',
  },
]

useHead({ title: 'Collections — MAISON' })
</script>

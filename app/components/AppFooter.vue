<template>
  <footer class="bg-charcoal text-ivory/80 mt-auto">
    <!-- Newsletter Section -->
    <div class="border-b border-white/5">
      <div class="max-w-7xl mx-auto px-6 lg:px-8 py-16 text-center">
        <h3 class="font-heading text-2xl lg:text-3xl tracking-[0.1em] uppercase text-ivory mb-3">
          Join the Maison
        </h3>
        <p class="text-sm text-ivory/50 mb-8 max-w-md mx-auto">
          Be the first to discover new collections, exclusive offers, and curated style inspiration.
        </p>
        <form class="flex max-w-md mx-auto gap-0" @submit.prevent="handleSubscribe">
          <input
            v-model="email"
            type="email"
            placeholder="Enter your email"
            class="flex-1 px-5 py-3 bg-white/5 border border-white/10 text-ivory text-sm placeholder:text-ivory/30 focus:outline-none focus:border-champagne/50 transition-colors"
          />
          <button
            type="submit"
            class="px-6 py-3 bg-champagne text-charcoal text-xs font-semibold tracking-[0.15em] uppercase hover:bg-gold-light transition-colors duration-300"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>

    <!-- Footer Links -->
    <div class="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
        <!-- Brand -->
        <div class="col-span-2 md:col-span-1">
          <h4 class="font-heading text-xl tracking-[0.12em] uppercase text-ivory mb-4">MAISON</h4>
          <p class="text-xs leading-relaxed text-ivory/40 mb-6">
            Where heritage craftsmanship meets contemporary elegance.
            Each piece tells a story of artistry and timeless design.
          </p>
          <div class="flex gap-4">
            <a v-for="social in socials" :key="social.name" :href="social.url" target="_blank"
              class="w-9 h-9 flex items-center justify-center border border-white/10 hover:border-champagne/50 hover:text-champagne text-ivory/50 transition-all duration-300"
              :aria-label="social.name"
            >
              <span class="text-xs font-semibold">{{ social.icon }}</span>
            </a>
          </div>
        </div>

        <!-- Shop -->
        <div>
          <h5 class="text-xs font-semibold tracking-[0.2em] uppercase text-ivory/60 mb-5">Shop</h5>
          <ul class="space-y-3">
            <li v-for="link in shopLinks" :key="link.path">
              <NuxtLink :to="link.path" class="text-sm text-ivory/40 hover:text-champagne transition-colors duration-300">
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Customer Care -->
        <div>
          <h5 class="text-xs font-semibold tracking-[0.2em] uppercase text-ivory/60 mb-5">Customer Care</h5>
          <ul class="space-y-3">
            <li v-for="link in careLinks" :key="link.label">
              <NuxtLink :to="link.path" class="text-sm text-ivory/40 hover:text-champagne transition-colors duration-300">
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- About -->
        <div>
          <h5 class="text-xs font-semibold tracking-[0.2em] uppercase text-ivory/60 mb-5">About</h5>
          <ul class="space-y-3">
            <li v-for="link in aboutLinks" :key="link.label">
              <NuxtLink :to="link.path" class="text-sm text-ivory/40 hover:text-champagne transition-colors duration-300">
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="border-t border-white/5">
      <div class="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-xs text-ivory/30">
          © {{ new Date().getFullYear() }} MAISON. All rights reserved.
        </p>
        <div class="flex gap-6">
          <NuxtLink to="/privacy" class="text-xs text-ivory/30 hover:text-ivory/60 transition-colors">Privacy Policy</NuxtLink>
          <NuxtLink to="/terms" class="text-xs text-ivory/30 hover:text-ivory/60 transition-colors">Terms of Service</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const email = ref('')

const socials = [
  { name: 'Instagram', icon: 'IG', url: '#' },
  { name: 'Pinterest', icon: 'PI', url: '#' },
  { name: 'Facebook', icon: 'FB', url: '#' },
]

const shopLinks = [
  { label: 'New Arrivals', path: '/shop/new-arrivals' },
  { label: 'Women', path: '/shop/women' },
  { label: 'Men', path: '/shop/men' },
  { label: 'Collections', path: '/collections' },
  { label: 'Sale', path: '/shop/sale' },
]

const careLinks = [
  { label: 'Contact Us', path: '/contact' },
  { label: 'Shipping & Returns', path: '/shipping' },
  { label: 'Size Guide', path: '/size-guide' },
  { label: 'FAQs', path: '/faq' },
  { label: 'Track Order', path: '/account/orders' },
]

const aboutLinks = [
  { label: 'Our Story', path: '/about' },
  { label: 'Sustainability', path: '/sustainability' },
  { label: 'Craftsmanship', path: '/craftsmanship' },
  { label: 'Careers', path: '/careers' },
]

function handleSubscribe() {
  if (email.value) {
    // TODO: Integrate with newsletter service
    email.value = ''
  }
}
</script>

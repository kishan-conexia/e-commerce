<template>
  <div class="min-h-screen">
    <div class="max-w-3xl mx-auto px-6 lg:px-8 py-10 lg:py-16">
      <h1 class="font-heading text-hero uppercase tracking-wider text-charcoal text-center mb-12">My Account</h1>

      <!-- Guest View -->
      <div class="max-w-md mx-auto">
        <div class="bg-ivory/50 p-8 rounded-lg text-center">
          <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-champagne/10 flex items-center justify-center">
            <svg class="w-8 h-8 text-champagne" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 class="font-heading text-xl text-charcoal mb-2">Welcome to MAISON</h2>
          <p class="text-sm text-taupe mb-8">Sign in to view your orders, wishlist, and manage your account</p>

          <!-- Login Form -->
          <form class="space-y-4 text-left" @submit.prevent="handleLogin">
            <div>
              <label class="text-xs font-semibold tracking-wider uppercase text-charcoal/70 mb-1 block">Email</label>
              <input v-model="email" type="email" placeholder="you@example.com"
                class="w-full px-4 py-3 border border-charcoal/10 bg-transparent text-sm focus:outline-none focus:border-champagne/50" />
            </div>
            <div>
              <label class="text-xs font-semibold tracking-wider uppercase text-charcoal/70 mb-1 block">Password</label>
              <input v-model="password" type="password" placeholder="••••••••"
                class="w-full px-4 py-3 border border-charcoal/10 bg-transparent text-sm focus:outline-none focus:border-champagne/50" />
            </div>
            <button type="submit" class="btn-primary w-full">
              <span>Sign In</span>
            </button>
          </form>

          <div class="mt-6 pt-6 border-t border-charcoal/5">
            <p class="text-xs text-taupe">Don't have an account?
              <button class="text-champagne hover:underline">Create Account</button>
            </p>
          </div>
        </div>

        <!-- Account Features Preview -->
        <div class="grid grid-cols-2 gap-4 mt-8">
          <div v-for="feature in features" :key="feature.title" class="p-5 border border-charcoal/5 rounded-lg text-center">
            <span class="text-xl mb-2 block">{{ feature.icon }}</span>
            <h4 class="text-xs font-semibold tracking-wider uppercase text-charcoal mb-1">{{ feature.title }}</h4>
            <p class="text-xs text-taupe">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const email = ref('')
const password = ref('')

const features = [
  { icon: '📦', title: 'Order History', description: 'Track all your orders' },
  { icon: '❤️', title: 'Wishlist', description: 'Save your favorites' },
  { icon: '📍', title: 'Addresses', description: 'Manage shipping addresses' },
  { icon: '🎁', title: 'Loyalty Points', description: 'Earn rewards on purchases' },
]

function handleLogin() {
  // TODO: Integrate with Supabase Auth
}

useHead({ title: 'My Account — MAISON' })
</script>

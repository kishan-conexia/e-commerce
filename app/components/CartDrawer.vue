<template>
  <!-- Overlay -->
  <Transition name="fade">
    <div
      v-if="isCartOpen"
      class="fixed inset-0 bg-charcoal/40 z-[60] backdrop-blur-sm"
      @click="toggleCart"
    />
  </Transition>

  <!-- Drawer -->
  <Transition name="slide-right">
    <div
      v-if="isCartOpen"
      class="fixed top-0 right-0 bottom-0 w-full max-w-md bg-cream z-[70] flex flex-col shadow-2xl"
    >
      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-5 border-b border-charcoal/5">
        <h2 class="font-heading text-xl tracking-[0.1em] uppercase">Shopping Bag</h2>
        <button
          @click="toggleCart"
          class="p-2 text-charcoal/60 hover:text-charcoal transition-colors"
          aria-label="Close cart"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Items -->
      <div class="flex-1 overflow-y-auto px-6 py-4">
        <div v-if="items.length === 0" class="flex flex-col items-center justify-center h-full text-center">
          <svg class="w-16 h-16 text-taupe-light mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <p class="font-heading text-lg text-charcoal/60 mb-2">Your bag is empty</p>
          <p class="text-sm text-taupe mb-6">Discover our curated collections</p>
          <NuxtLink
            to="/shop/new-arrivals"
            class="btn-outline text-xs"
            @click="toggleCart"
          >
            <span>Continue Shopping</span>
          </NuxtLink>
        </div>

        <div v-else class="space-y-4">
          <div
            v-for="item in items"
            :key="item.id"
            class="flex gap-4 py-4 border-b border-charcoal/5 last:border-0"
          >
            <div class="w-20 h-24 bg-taupe-light/20 rounded overflow-hidden flex-shrink-0">
              <img
                v-if="item.image"
                :src="item.image"
                :alt="item.name"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="flex-1 min-w-0">
              <h4 class="font-heading text-sm text-charcoal truncate">{{ item.name }}</h4>
              <p class="text-xs text-taupe mt-0.5">{{ item.variant }}</p>
              <p class="text-sm font-medium text-charcoal mt-1">₹{{ item.price.toLocaleString('en-IN') }}</p>
              <div class="flex items-center gap-3 mt-2">
                <button
                  @click="updateQuantity(item.id, item.quantity - 1)"
                  class="w-6 h-6 flex items-center justify-center border border-charcoal/10 text-xs hover:border-champagne transition-colors"
                >-</button>
                <span class="text-xs font-medium w-4 text-center">{{ item.quantity }}</span>
                <button
                  @click="updateQuantity(item.id, item.quantity + 1)"
                  class="w-6 h-6 flex items-center justify-center border border-charcoal/10 text-xs hover:border-champagne transition-colors"
                >+</button>
              </div>
            </div>
            <button
              @click="removeItem(item.id)"
              class="text-taupe-light hover:text-charcoal transition-colors self-start"
              aria-label="Remove item"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div v-if="items.length > 0" class="border-t border-charcoal/5 px-6 py-5 space-y-4">
        <div class="flex justify-between items-center">
          <span class="text-sm text-taupe uppercase tracking-wider">Subtotal</span>
          <span class="text-lg font-heading text-charcoal">₹{{ cartTotal.toLocaleString('en-IN') }}</span>
        </div>
        <p class="text-xs text-taupe">Shipping & taxes calculated at checkout</p>
        <NuxtLink
          to="/checkout"
          class="btn-primary w-full text-center"
          @click="toggleCart"
        >
          <span>Proceed to Checkout</span>
        </NuxtLink>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const { isCartOpen, toggleCart, items, cartTotal, updateQuantity, removeItem } = useCart()
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.fade-enter-from, .fade-leave-to { opacity: 0; }

.slide-right-enter-active, .slide-right-leave-active {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-right-enter-from, .slide-right-leave-to {
  transform: translateX(100%);
}
</style>

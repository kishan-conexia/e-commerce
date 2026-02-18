<template>
  <div class="min-h-screen">
    <div class="max-w-7xl mx-auto px-6 lg:px-8 py-10 lg:py-16">
      <h1 class="font-heading text-hero uppercase tracking-wider text-charcoal text-center mb-12">Shopping Bag</h1>

      <div v-if="items.length === 0" class="text-center py-16">
        <svg class="w-20 h-20 mx-auto text-taupe-light mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <p class="font-heading text-xl text-charcoal/60 mb-2">Your bag is empty</p>
        <p class="text-sm text-taupe mb-8">Discover our curated collections</p>
        <NuxtLink to="/shop/new-arrivals" class="btn-primary">
          <span>Continue Shopping</span>
        </NuxtLink>
      </div>

      <div v-else class="grid lg:grid-cols-3 gap-10 lg:gap-14">
        <!-- Cart Items -->
        <div class="lg:col-span-2 space-y-0">
          <div
            v-for="item in items"
            :key="item.id"
            class="flex gap-6 py-6 border-b border-charcoal/5"
          >
            <div class="w-28 h-36 bg-taupe-light/10 rounded flex-shrink-0 flex items-center justify-center">
              <span class="text-taupe-light text-2xl">✦</span>
            </div>
            <div class="flex-1 flex flex-col justify-between">
              <div>
                <h3 class="font-heading text-base text-charcoal">{{ item.name }}</h3>
                <p class="text-xs text-taupe mt-1">{{ item.variant }}</p>
                <p class="text-sm font-medium text-charcoal mt-2">₹{{ item.price.toLocaleString('en-IN') }}</p>
              </div>
              <div class="flex items-center justify-between mt-4">
                <div class="flex items-center border border-charcoal/10">
                  <button
                    @click="updateQuantity(item.id, item.quantity - 1)"
                    class="w-9 h-9 flex items-center justify-center text-sm hover:bg-charcoal/5 transition-colors"
                  >−</button>
                  <span class="w-10 text-center text-sm font-medium">{{ item.quantity }}</span>
                  <button
                    @click="updateQuantity(item.id, item.quantity + 1)"
                    class="w-9 h-9 flex items-center justify-center text-sm hover:bg-charcoal/5 transition-colors"
                  >+</button>
                </div>
                <button
                  @click="removeItem(item.id)"
                  class="text-xs text-taupe underline underline-offset-4 hover:text-charcoal transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:sticky lg:top-32 lg:self-start">
          <div class="bg-ivory/60 p-6 lg:p-8 rounded-lg">
            <h3 class="font-heading text-lg tracking-wider uppercase text-charcoal mb-6">Order Summary</h3>
            <div class="space-y-3 text-sm">
              <div class="flex justify-between text-taupe">
                <span>Subtotal</span>
                <span>₹{{ cartTotal.toLocaleString('en-IN') }}</span>
              </div>
              <div class="flex justify-between text-taupe">
                <span>Shipping</span>
                <span class="text-champagne">Complimentary</span>
              </div>
              <div class="flex justify-between text-taupe">
                <span>Tax (GST)</span>
                <span>Calculated at checkout</span>
              </div>
            </div>

            <!-- Coupon -->
            <div class="mt-6 pt-6 border-t border-charcoal/5">
              <div class="flex gap-2">
                <input
                  v-model="couponCode"
                  type="text"
                  placeholder="Coupon code"
                  class="flex-1 px-3 py-2 border border-charcoal/10 bg-transparent text-sm placeholder:text-taupe-light focus:outline-none focus:border-champagne/50"
                />
                <button class="px-4 py-2 border border-charcoal text-xs font-semibold tracking-wider uppercase hover:bg-charcoal hover:text-ivory transition-colors">
                  Apply
                </button>
              </div>
            </div>

            <div class="mt-6 pt-6 border-t border-charcoal/5">
              <div class="flex justify-between text-charcoal font-medium mb-6">
                <span class="uppercase tracking-wider text-sm">Estimated Total</span>
                <span class="text-lg font-heading">₹{{ cartTotal.toLocaleString('en-IN') }}</span>
              </div>
              <NuxtLink to="/checkout" class="btn-primary w-full text-center">
                <span>Proceed to Checkout</span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { items, cartTotal, updateQuantity, removeItem } = useCart()

const couponCode = ref('')

useHead({ title: 'Shopping Bag — MAISON' })
</script>

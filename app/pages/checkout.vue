<template>
  <div class="min-h-screen">
    <div class="max-w-4xl mx-auto px-6 lg:px-8 py-10 lg:py-16">
      <h1 class="font-heading text-hero uppercase tracking-wider text-charcoal text-center mb-12">Checkout</h1>

      <!-- Steps -->
      <div class="flex items-center justify-center gap-0 mb-12">
        <template v-for="(s, i) in steps" :key="s">
          <div class="flex items-center gap-2">
            <div
              class="w-8 h-8 flex items-center justify-center rounded-full text-xs font-semibold transition-colors"
              :class="i <= currentStep
                ? 'bg-charcoal text-ivory'
                : 'border border-charcoal/15 text-taupe'"
            >
              {{ i + 1 }}
            </div>
            <span
              class="text-xs tracking-wider uppercase hidden sm:block"
              :class="i <= currentStep ? 'text-charcoal' : 'text-taupe'"
            >{{ s }}</span>
          </div>
          <div
            v-if="i < steps.length - 1"
            class="w-12 lg:w-20 h-px mx-2"
            :class="i < currentStep ? 'bg-charcoal' : 'bg-charcoal/10'"
          />
        </template>
      </div>

      <!-- Step 1: Shipping Address -->
      <div v-if="currentStep === 0" class="max-w-lg mx-auto space-y-6">
        <h2 class="font-heading text-xl tracking-wide text-charcoal">Shipping Address</h2>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-xs font-semibold tracking-wider uppercase text-charcoal/70 mb-1 block">First Name</label>
            <input v-model="form.firstName" type="text" class="w-full px-4 py-3 border border-charcoal/10 bg-transparent text-sm focus:outline-none focus:border-champagne/50" />
          </div>
          <div>
            <label class="text-xs font-semibold tracking-wider uppercase text-charcoal/70 mb-1 block">Last Name</label>
            <input v-model="form.lastName" type="text" class="w-full px-4 py-3 border border-charcoal/10 bg-transparent text-sm focus:outline-none focus:border-champagne/50" />
          </div>
        </div>
        <div>
          <label class="text-xs font-semibold tracking-wider uppercase text-charcoal/70 mb-1 block">Email</label>
          <input v-model="form.email" type="email" class="w-full px-4 py-3 border border-charcoal/10 bg-transparent text-sm focus:outline-none focus:border-champagne/50" />
        </div>
        <div>
          <label class="text-xs font-semibold tracking-wider uppercase text-charcoal/70 mb-1 block">Phone</label>
          <input v-model="form.phone" type="tel" class="w-full px-4 py-3 border border-charcoal/10 bg-transparent text-sm focus:outline-none focus:border-champagne/50" />
        </div>
        <div>
          <label class="text-xs font-semibold tracking-wider uppercase text-charcoal/70 mb-1 block">Address</label>
          <input v-model="form.address" type="text" class="w-full px-4 py-3 border border-charcoal/10 bg-transparent text-sm focus:outline-none focus:border-champagne/50" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-xs font-semibold tracking-wider uppercase text-charcoal/70 mb-1 block">City</label>
            <input v-model="form.city" type="text" class="w-full px-4 py-3 border border-charcoal/10 bg-transparent text-sm focus:outline-none focus:border-champagne/50" />
          </div>
          <div>
            <label class="text-xs font-semibold tracking-wider uppercase text-charcoal/70 mb-1 block">Pin Code</label>
            <input v-model="form.pinCode" type="text" class="w-full px-4 py-3 border border-charcoal/10 bg-transparent text-sm focus:outline-none focus:border-champagne/50" />
          </div>
        </div>
        <div>
          <label class="text-xs font-semibold tracking-wider uppercase text-charcoal/70 mb-1 block">State</label>
          <input v-model="form.state" type="text" class="w-full px-4 py-3 border border-charcoal/10 bg-transparent text-sm focus:outline-none focus:border-champagne/50" />
        </div>
        <button class="btn-primary w-full" @click="currentStep = 1">
          <span>Continue to Payment</span>
        </button>
      </div>

      <!-- Step 2: Payment -->
      <div v-if="currentStep === 1" class="max-w-lg mx-auto space-y-6">
        <h2 class="font-heading text-xl tracking-wide text-charcoal">Payment Method</h2>

        <div class="space-y-3">
          <label
            v-for="method in paymentMethods"
            :key="method.value"
            class="flex items-center gap-4 p-4 border cursor-pointer transition-all duration-200"
            :class="selectedPayment === method.value ? 'border-charcoal bg-ivory/50' : 'border-charcoal/10 hover:border-charcoal/30'"
          >
            <input type="radio" :value="method.value" v-model="selectedPayment" class="accent-champagne" />
            <div>
              <p class="text-sm font-medium text-charcoal">{{ method.label }}</p>
              <p class="text-xs text-taupe">{{ method.description }}</p>
            </div>
          </label>
        </div>

        <div class="flex gap-3 pt-4">
          <button class="btn-outline flex-1" @click="currentStep = 0">
            Back
          </button>
          <button class="btn-primary flex-1" @click="currentStep = 2">
            <span>Review Order</span>
          </button>
        </div>
      </div>

      <!-- Step 3: Review -->
      <div v-if="currentStep === 2" class="max-w-lg mx-auto space-y-6">
        <h2 class="font-heading text-xl tracking-wide text-charcoal">Review Your Order</h2>

        <div class="bg-ivory/50 p-6 rounded-lg space-y-4">
          <div class="flex justify-between text-sm">
            <span class="text-taupe">Shipping to</span>
            <span class="text-charcoal">{{ form.firstName }} {{ form.lastName }}, {{ form.city }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-taupe">Payment</span>
            <span class="text-charcoal capitalize">{{ selectedPayment.replace('_', ' ') }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-taupe">Items</span>
            <span class="text-charcoal">{{ cartCount }}</span>
          </div>
          <div class="divider !mx-0 !w-full" />
          <div class="flex justify-between font-medium">
            <span class="text-sm uppercase tracking-wider">Total</span>
            <span class="text-lg font-heading">₹{{ cartTotal.toLocaleString('en-IN') }}</span>
          </div>
        </div>

        <div class="flex gap-3 pt-4">
          <button class="btn-outline flex-1" @click="currentStep = 1">
            Back
          </button>
          <button class="btn-primary flex-1" @click="placeOrder">
            <span>Place Order</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { items, cartTotal, cartCount, clearCart } = useCart()
const router = useRouter()

const currentStep = ref(0)
const selectedPayment = ref('card')

const steps = ['Address', 'Payment', 'Review']

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  pinCode: '',
  state: '',
})

const paymentMethods = [
  { value: 'card', label: 'Credit / Debit Card', description: 'Visa, Mastercard, Amex, RuPay' },
  { value: 'upi', label: 'UPI', description: 'Google Pay, PhonePe, Paytm' },
  { value: 'netbanking', label: 'Net Banking', description: 'All major banks supported' },
  { value: 'cod', label: 'Cash on Delivery', description: 'Pay when you receive your order' },
]

function placeOrder() {
  clearCart()
  router.push('/')
}

useHead({ title: 'Checkout — MAISON' })
</script>

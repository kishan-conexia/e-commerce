<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-heading font-semibold text-charcoal">Settings</h1>
      <p class="text-sm text-taupe mt-1">Manage your store configuration</p>
    </div>

    <!-- Settings cards -->
    <div class="space-y-6">
      <!-- Store Info -->
      <div class="bg-white rounded-xl border border-[#e8e4de] p-6">
        <h2 class="text-base font-semibold text-charcoal mb-4 flex items-center gap-2">
          <svg class="w-5 h-5 text-taupe" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"/></svg>
          Store Information
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-charcoal mb-1">Store Name</label>
            <input v-model="settings.storeName" type="text" class="w-full px-3 py-2 rounded-lg border border-[#e8e4de] text-sm focus:outline-none focus:border-champagne" />
          </div>
          <div>
            <label class="block text-sm font-medium text-charcoal mb-1">Contact Email</label>
            <input v-model="settings.email" type="email" class="w-full px-3 py-2 rounded-lg border border-[#e8e4de] text-sm focus:outline-none focus:border-champagne" />
          </div>
          <div>
            <label class="block text-sm font-medium text-charcoal mb-1">Phone</label>
            <input v-model="settings.phone" type="text" class="w-full px-3 py-2 rounded-lg border border-[#e8e4de] text-sm focus:outline-none focus:border-champagne" />
          </div>
          <div>
            <label class="block text-sm font-medium text-charcoal mb-1">Currency</label>
            <select v-model="settings.currency" class="w-full px-3 py-2 rounded-lg border border-[#e8e4de] text-sm focus:outline-none focus:border-champagne">
              <option value="INR">₹ INR — Indian Rupee</option>
              <option value="USD">$ USD — US Dollar</option>
              <option value="EUR">€ EUR — Euro</option>
              <option value="GBP">£ GBP — British Pound</option>
            </select>
          </div>
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-charcoal mb-1">Store Address</label>
            <textarea v-model="settings.address" rows="2" class="w-full px-3 py-2 rounded-lg border border-[#e8e4de] text-sm focus:outline-none focus:border-champagne resize-none" />
          </div>
        </div>
      </div>

      <!-- Shipping -->
      <div class="bg-white rounded-xl border border-[#e8e4de] p-6">
        <h2 class="text-base font-semibold text-charcoal mb-4 flex items-center gap-2">
          <svg class="w-5 h-5 text-taupe" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/></svg>
          Shipping & Delivery
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-charcoal mb-1">Free Shipping Threshold (₹)</label>
            <input v-model.number="settings.freeShippingThreshold" type="number" class="w-full px-3 py-2 rounded-lg border border-[#e8e4de] text-sm focus:outline-none focus:border-champagne" />
          </div>
          <div>
            <label class="block text-sm font-medium text-charcoal mb-1">Default Shipping Cost (₹)</label>
            <input v-model.number="settings.defaultShippingCost" type="number" class="w-full px-3 py-2 rounded-lg border border-[#e8e4de] text-sm focus:outline-none focus:border-champagne" />
          </div>
        </div>
      </div>

      <!-- Tax -->
      <div class="bg-white rounded-xl border border-[#e8e4de] p-6">
        <h2 class="text-base font-semibold text-charcoal mb-4 flex items-center gap-2">
          <svg class="w-5 h-5 text-taupe" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"/></svg>
          Tax Configuration
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-charcoal mb-1">GST Rate (%)</label>
            <input v-model.number="settings.gstRate" type="number" step="0.01" class="w-full px-3 py-2 rounded-lg border border-[#e8e4de] text-sm focus:outline-none focus:border-champagne" />
          </div>
          <div>
            <label class="block text-sm font-medium text-charcoal mb-1">GSTIN</label>
            <input v-model="settings.gstin" type="text" placeholder="e.g. 22AAAAA0000A1Z5" class="w-full px-3 py-2 rounded-lg border border-[#e8e4de] text-sm focus:outline-none focus:border-champagne" />
          </div>
          <div class="flex items-center gap-2">
            <input v-model="settings.priceIncludesTax" type="checkbox" id="tax-inclusive" class="rounded border-[#e8e4de] text-champagne focus:ring-champagne" />
            <label for="tax-inclusive" class="text-sm text-charcoal">Prices include tax</label>
          </div>
        </div>
      </div>

      <!-- Notifications -->
      <div class="bg-white rounded-xl border border-[#e8e4de] p-6">
        <h2 class="text-base font-semibold text-charcoal mb-4 flex items-center gap-2">
          <svg class="w-5 h-5 text-taupe" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"/></svg>
          Notifications
        </h2>
        <div class="space-y-3">
          <div class="flex items-center justify-between py-2">
            <div>
              <p class="text-sm font-medium text-charcoal">New order notifications</p>
              <p class="text-xs text-taupe">Get notified when a new order is placed</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input v-model="settings.notifyNewOrder" type="checkbox" class="sr-only peer" />
              <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-champagne"></div>
            </label>
          </div>
          <div class="flex items-center justify-between py-2 border-t border-[#f0ece6]">
            <div>
              <p class="text-sm font-medium text-charcoal">Low stock alerts</p>
              <p class="text-xs text-taupe">Alert when inventory falls below reorder point</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input v-model="settings.notifyLowStock" type="checkbox" class="sr-only peer" />
              <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-champagne"></div>
            </label>
          </div>
        </div>
      </div>

      <!-- Save button -->
      <div class="flex justify-end pt-2">
        <button
          @click="saveSettings"
          :disabled="saving"
          class="px-6 py-2.5 bg-charcoal text-white text-sm font-medium rounded-lg hover:bg-graphite transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          <svg v-if="saving" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
          {{ saving ? 'Saving...' : 'Save Settings' }}
        </button>
      </div>
    </div>

    <!-- Toast -->
    <Teleport to="body">
      <Transition name="toast">
        <div v-if="toast" class="fixed bottom-6 right-6 z-[70] bg-charcoal text-white px-4 py-3 rounded-lg shadow-lg text-sm flex items-center gap-2">
          <svg class="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>
          {{ toast }}
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const saving = ref(false)
const toast = ref('')

const settings = ref({
  storeName: 'MAISON',
  email: '',
  phone: '',
  currency: 'INR',
  address: '',
  freeShippingThreshold: 999,
  defaultShippingCost: 99,
  gstRate: 18,
  gstin: '',
  priceIncludesTax: true,
  notifyNewOrder: true,
  notifyLowStock: true,
})

async function saveSettings() {
  saving.value = true
  // In a real app, persist to a `store_settings` table or key-value store
  await new Promise(resolve => setTimeout(resolve, 800))
  saving.value = false
  toast.value = 'Settings saved successfully'
  setTimeout(() => { toast.value = '' }, 3000)
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>

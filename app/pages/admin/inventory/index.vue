<template>
  <div>
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 class="text-2xl font-heading font-semibold text-charcoal">Inventory</h1>
        <p class="text-sm text-taupe mt-1">Stock levels across all locations</p>
      </div>
      <!-- Add stock location -->
      <button
        @click="showLocationModal = true"
        class="px-4 py-2.5 bg-charcoal text-white text-sm font-medium rounded-lg hover:bg-graphite transition-colors flex items-center gap-2"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>
        Add Location
      </button>
    </div>

    <!-- Stock summary cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div class="bg-white rounded-xl border border-[#e8e4de] p-5">
        <p class="text-xs font-semibold uppercase tracking-wider text-taupe">Total SKUs</p>
        <p class="text-2xl font-semibold text-charcoal mt-1">{{ inventory.length }}</p>
      </div>
      <div class="bg-white rounded-xl border border-[#e8e4de] p-5">
        <p class="text-xs font-semibold uppercase tracking-wider text-taupe">In Stock</p>
        <p class="text-2xl font-semibold text-emerald-600 mt-1">{{ inStockCount }}</p>
      </div>
      <div class="bg-white rounded-xl border border-[#e8e4de] p-5">
        <p class="text-xs font-semibold uppercase tracking-wider text-taupe">Low Stock</p>
        <p class="text-2xl font-semibold text-amber-600 mt-1">{{ lowStockCount }}</p>
      </div>
      <div class="bg-white rounded-xl border border-[#e8e4de] p-5">
        <p class="text-xs font-semibold uppercase tracking-wider text-taupe">Out of Stock</p>
        <p class="text-2xl font-semibold text-red-600 mt-1">{{ outOfStockCount }}</p>
      </div>
    </div>

    <!-- Filters -->
    <div class="flex flex-wrap items-center gap-3 mb-5">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by SKU or product..."
        class="px-3 py-2 rounded-lg border border-[#e8e4de] text-sm focus:outline-none focus:border-champagne focus:ring-1 focus:ring-champagne/30 transition-all w-64"
      />
      <select
        v-model="stockFilter"
        class="px-3 py-2 rounded-lg border border-[#e8e4de] text-sm focus:outline-none focus:border-champagne transition-all"
      >
        <option value="">All Stock</option>
        <option value="in_stock">In Stock</option>
        <option value="low_stock">Low Stock</option>
        <option value="out_of_stock">Out of Stock</option>
      </select>
      <select
        v-model="locationFilter"
        class="px-3 py-2 rounded-lg border border-[#e8e4de] text-sm focus:outline-none focus:border-champagne transition-all"
      >
        <option value="">All Locations</option>
        <option v-for="loc in locations" :key="loc.id" :value="loc.id">{{ loc.name }}</option>
      </select>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-xl border border-[#e8e4de] overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-[#e8e4de] bg-[#faf7f2]">
              <th class="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-taupe">SKU</th>
              <th class="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-taupe">Location</th>
              <th class="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-taupe">Quantity</th>
              <th class="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-taupe">Reserved</th>
              <th class="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-taupe">Available</th>
              <th class="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-taupe">Reorder At</th>
              <th class="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-taupe">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filteredInventory.length === 0">
              <td colspan="7" class="px-5 py-12 text-center">
                <div class="flex flex-col items-center gap-3">
                  <svg class="w-12 h-12 text-[#e8e4de]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375"/></svg>
                  <p class="text-sm text-taupe">No inventory records yet. Add stock locations and products first.</p>
                </div>
              </td>
            </tr>
            <tr
              v-for="item in filteredInventory"
              :key="item.id"
              class="border-b border-[#f0ece6] last:border-0 hover:bg-[#faf7f2]/50 transition-colors"
            >
              <td class="px-5 py-4">
                <p class="text-sm font-mono font-medium text-charcoal">{{ item.sku }}</p>
              </td>
              <td class="px-5 py-4 text-sm text-charcoal">{{ item.location_name }}</td>
              <td class="px-5 py-4 text-sm font-semibold text-charcoal">{{ item.quantity }}</td>
              <td class="px-5 py-4 text-sm text-taupe">{{ item.reserved }}</td>
              <td class="px-5 py-4 text-sm font-semibold text-charcoal">{{ item.quantity - item.reserved }}</td>
              <td class="px-5 py-4 text-sm text-taupe">{{ item.reorder_point }}</td>
              <td class="px-5 py-4">
                <span
                  :class="[
                    'text-[11px] font-medium px-2.5 py-1 rounded-full',
                    getStockStatus(item) === 'out' ? 'bg-red-100 text-red-600' :
                    getStockStatus(item) === 'low' ? 'bg-amber-100 text-amber-700' :
                    'bg-emerald-100 text-emerald-700'
                  ]"
                >
                  {{ getStockStatus(item) === 'out' ? 'Out of Stock' : getStockStatus(item) === 'low' ? 'Low Stock' : 'In Stock' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add Location Modal -->
    <Teleport to="body">
      <div v-if="showLocationModal" class="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-charcoal/30 backdrop-blur-sm" @click="showLocationModal = false" />
        <div class="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
          <h3 class="text-lg font-heading font-semibold text-charcoal mb-4">Add Stock Location</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-charcoal mb-1">Location Name *</label>
              <input v-model="newLocation.name" type="text" placeholder="e.g. Main Warehouse" class="w-full px-3 py-2 rounded-lg border border-[#e8e4de] text-sm focus:outline-none focus:border-champagne" />
            </div>
            <div>
              <label class="block text-sm font-medium text-charcoal mb-1">Address</label>
              <textarea v-model="newLocation.address" rows="2" placeholder="Full address" class="w-full px-3 py-2 rounded-lg border border-[#e8e4de] text-sm focus:outline-none focus:border-champagne resize-none" />
            </div>
            <div class="flex items-center gap-2">
              <input v-model="newLocation.is_active" type="checkbox" id="loc-active" class="rounded border-[#e8e4de] text-champagne focus:ring-champagne" />
              <label for="loc-active" class="text-sm text-charcoal">Active</label>
            </div>
          </div>
          <div class="flex justify-end gap-3 mt-6">
            <button @click="showLocationModal = false" class="px-4 py-2 text-sm text-taupe hover:text-charcoal transition-colors">Cancel</button>
            <button @click="saveLocation" class="px-4 py-2 bg-charcoal text-white text-sm font-medium rounded-lg hover:bg-graphite transition-colors">Save Location</button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const client = useSupabaseClient()

interface InventoryRow {
  id: string
  sku: string
  location_name: string
  location_id: string
  quantity: number
  reserved: number
  reorder_point: number
}

interface LocationRow {
  id: string
  name: string
}

const inventory = ref<InventoryRow[]>([])
const locations = ref<LocationRow[]>([])
const searchQuery = ref('')
const stockFilter = ref('')
const locationFilter = ref('')
const showLocationModal = ref(false)
const newLocation = ref({ name: '', address: '', is_active: true })

function getStockStatus(item: InventoryRow): 'in' | 'low' | 'out' {
  const available = item.quantity - item.reserved
  if (available <= 0) return 'out'
  if (available <= item.reorder_point) return 'low'
  return 'in'
}

const inStockCount = computed(() => inventory.value.filter(i => getStockStatus(i) === 'in').length)
const lowStockCount = computed(() => inventory.value.filter(i => getStockStatus(i) === 'low').length)
const outOfStockCount = computed(() => inventory.value.filter(i => getStockStatus(i) === 'out').length)

const filteredInventory = computed(() => {
  let result = inventory.value
  if (stockFilter.value) {
    const map: Record<string, 'in' | 'low' | 'out'> = { in_stock: 'in', low_stock: 'low', out_of_stock: 'out' }
    result = result.filter(i => getStockStatus(i) === map[stockFilter.value])
  }
  if (locationFilter.value) {
    result = result.filter(i => i.location_id === locationFilter.value)
  }
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(i => i.sku.toLowerCase().includes(q))
  }
  return result
})

async function fetchData() {
  // Fetch locations
  const { data: locData } = await client.from('stock_locations').select('id, name').order('name')
  locations.value = (locData as LocationRow[]) || []

  // Fetch inventory with joins
  const { data } = await client
    .from('inventory')
    .select(`
      id, quantity, reserved, reorder_point,
      product_variants(sku),
      stock_locations(id, name)
    `)
    .order('quantity', { ascending: true })

  inventory.value = ((data as any[]) || []).map(i => ({
    id: i.id,
    sku: i.product_variants?.sku || '—',
    location_name: i.stock_locations?.name || '—',
    location_id: i.stock_locations?.id || '',
    quantity: i.quantity,
    reserved: i.reserved,
    reorder_point: i.reorder_point,
  }))
}

async function saveLocation() {
  if (!newLocation.value.name.trim()) return
  await client.from('stock_locations').insert({
    name: newLocation.value.name.trim(),
    address: newLocation.value.address.trim() || null,
    is_active: newLocation.value.is_active,
  })
  showLocationModal.value = false
  newLocation.value = { name: '', address: '', is_active: true }
  await fetchData()
}

onMounted(fetchData)
</script>

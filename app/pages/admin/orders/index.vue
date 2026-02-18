<template>
  <div>
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 class="text-2xl font-heading font-semibold text-charcoal">Orders</h1>
        <p class="text-sm text-taupe mt-1">{{ orders.length }} order{{ orders.length !== 1 ? 's' : '' }}</p>
      </div>
    </div>

    <!-- Filters -->
    <div class="flex flex-wrap items-center gap-3 mb-5">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by order number..."
        class="px-3 py-2 rounded-lg border border-[#e8e4de] text-sm focus:outline-none focus:border-champagne focus:ring-1 focus:ring-champagne/30 transition-all w-64"
      />
      <select
        v-model="statusFilter"
        class="px-3 py-2 rounded-lg border border-[#e8e4de] text-sm focus:outline-none focus:border-champagne transition-all"
      >
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="confirmed">Confirmed</option>
        <option value="processing">Processing</option>
        <option value="shipped">Shipped</option>
        <option value="delivered">Delivered</option>
        <option value="cancelled">Cancelled</option>
      </select>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-xl border border-[#e8e4de] overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-[#e8e4de] bg-[#faf7f2]">
              <th class="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-taupe">Order</th>
              <th class="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-taupe">Customer</th>
              <th class="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-taupe">Status</th>
              <th class="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-taupe">Total</th>
              <th class="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-taupe">Date</th>
              <th class="text-right px-5 py-3 text-xs font-semibold uppercase tracking-wider text-taupe">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filteredOrders.length === 0">
              <td colspan="6" class="px-5 py-12 text-center">
                <div class="flex flex-col items-center gap-3">
                  <svg class="w-12 h-12 text-[#e8e4de]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z"/></svg>
                  <p class="text-sm text-taupe">No orders yet. Orders will appear here once customers start purchasing.</p>
                </div>
              </td>
            </tr>
            <tr
              v-for="order in filteredOrders"
              :key="order.id"
              class="border-b border-[#f0ece6] last:border-0 hover:bg-[#faf7f2]/50 transition-colors"
            >
              <td class="px-5 py-4">
                <p class="text-sm font-semibold text-charcoal font-mono">{{ order.order_number }}</p>
                <p class="text-xs text-taupe">{{ order.item_count }} item{{ order.item_count !== 1 ? 's' : '' }}</p>
              </td>
              <td class="px-5 py-4">
                <p class="text-sm text-charcoal">{{ order.customer_name || 'Guest' }}</p>
                <p class="text-xs text-taupe">{{ order.customer_email }}</p>
              </td>
              <td class="px-5 py-4">
                <span
                  :class="[
                    'text-[11px] font-medium px-2.5 py-1 rounded-full capitalize',
                    statusClasses[order.status] || 'bg-gray-100 text-gray-500'
                  ]"
                >
                  {{ order.status }}
                </span>
              </td>
              <td class="px-5 py-4 text-sm font-semibold text-charcoal">
                ₹{{ Number(order.total_amount).toLocaleString() }}
              </td>
              <td class="px-5 py-4 text-sm text-taupe">
                {{ new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) }}
              </td>
              <td class="px-5 py-4 text-right">
                <button
                  class="p-2 rounded-lg text-taupe hover:text-charcoal hover:bg-cream transition-all"
                  title="View Order"
                >
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/></svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const client = useSupabaseClient()

interface OrderRow {
  id: string
  order_number: string
  status: string
  total_amount: number
  item_count: number
  customer_name: string
  customer_email: string
  created_at: string
}

const orders = ref<OrderRow[]>([])
const searchQuery = ref('')
const statusFilter = ref('')

const statusClasses: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700',
  confirmed: 'bg-blue-100 text-blue-700',
  processing: 'bg-indigo-100 text-indigo-700',
  shipped: 'bg-purple-100 text-purple-700',
  delivered: 'bg-emerald-100 text-emerald-700',
  cancelled: 'bg-red-100 text-red-600',
  refunded: 'bg-gray-100 text-gray-600',
}

const filteredOrders = computed(() => {
  let result = orders.value
  if (statusFilter.value) {
    result = result.filter(o => o.status === statusFilter.value)
  }
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(o =>
      o.order_number.toLowerCase().includes(q) ||
      o.customer_name?.toLowerCase().includes(q) ||
      o.customer_email?.toLowerCase().includes(q)
    )
  }
  return result
})

async function fetchOrders() {
  const { data } = await client
    .from('orders')
    .select(`
      id, order_number, status, total_amount, created_at,
      order_items(id),
      shipping_address
    `)
    .order('created_at', { ascending: false })

  orders.value = ((data as any[]) || []).map(o => ({
    id: o.id,
    order_number: o.order_number,
    status: o.status,
    total_amount: o.total_amount,
    item_count: o.order_items?.length || 0,
    customer_name: o.shipping_address?.first_name
      ? `${o.shipping_address.first_name} ${o.shipping_address.last_name || ''}`
      : '',
    customer_email: o.shipping_address?.email || '',
    created_at: o.created_at,
  }))
}

onMounted(fetchOrders)
</script>

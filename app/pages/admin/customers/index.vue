<template>
  <div>
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 class="text-2xl font-heading font-semibold text-charcoal">Customers</h1>
        <p class="text-sm text-taupe mt-1">{{ customers.length }} customer{{ customers.length !== 1 ? 's' : '' }}</p>
      </div>
    </div>

    <!-- Search -->
    <div class="flex flex-wrap items-center gap-3 mb-5">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by name or email..."
        class="px-3 py-2 rounded-lg border border-[#e8e4de] text-sm focus:outline-none focus:border-champagne focus:ring-1 focus:ring-champagne/30 transition-all w-64"
      />
    </div>

    <!-- Table -->
    <div class="bg-white rounded-xl border border-[#e8e4de] overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-[#e8e4de] bg-[#faf7f2]">
              <th class="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-taupe">Customer</th>
              <th class="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-taupe">Role</th>
              <th class="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-taupe">Orders</th>
              <th class="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-taupe">Total Spent</th>
              <th class="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-taupe">Joined</th>
              <th class="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-taupe">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filteredCustomers.length === 0">
              <td colspan="6" class="px-5 py-12 text-center">
                <div class="flex flex-col items-center gap-3">
                  <svg class="w-12 h-12 text-[#e8e4de]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"/></svg>
                  <p class="text-sm text-taupe">No customers yet. They'll appear here once users sign up.</p>
                </div>
              </td>
            </tr>
            <tr
              v-for="customer in filteredCustomers"
              :key="customer.id"
              class="border-b border-[#f0ece6] last:border-0 hover:bg-[#faf7f2]/50 transition-colors"
            >
              <td class="px-5 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-full bg-champagne/15 flex items-center justify-center text-xs font-semibold text-champagne flex-shrink-0">
                    {{ getInitials(customer) }}
                  </div>
                  <div class="min-w-0">
                    <p class="text-sm font-medium text-charcoal truncate">{{ customer.display_name || customer.email?.split('@')[0] }}</p>
                    <p class="text-xs text-taupe truncate">{{ customer.email }}</p>
                  </div>
                </div>
              </td>
              <td class="px-5 py-4">
                <span
                  :class="[
                    'text-[11px] font-medium px-2.5 py-1 rounded-full capitalize',
                    customer.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                    customer.role === 'vendor' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-500'
                  ]"
                >
                  {{ customer.role }}
                </span>
              </td>
              <td class="px-5 py-4 text-sm text-charcoal">{{ customer.total_orders }}</td>
              <td class="px-5 py-4 text-sm font-semibold text-charcoal">₹{{ Number(customer.total_spent).toLocaleString() }}</td>
              <td class="px-5 py-4 text-sm text-taupe">
                {{ new Date(customer.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) }}
              </td>
              <td class="px-5 py-4">
                <span
                  :class="[
                    'text-[11px] font-medium px-2.5 py-1 rounded-full',
                    customer.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'
                  ]"
                >
                  {{ customer.is_active ? 'Active' : 'Inactive' }}
                </span>
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

interface CustomerRow {
  id: string
  display_name: string | null
  email: string
  role: string
  total_orders: number
  total_spent: number
  is_active: boolean
  created_at: string
}

const customers = ref<CustomerRow[]>([])
const searchQuery = ref('')

function getInitials(c: CustomerRow) {
  const name = c.display_name || c.email?.split('@')[0] || '?'
  return name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
}

const filteredCustomers = computed(() => {
  if (!searchQuery.value) return customers.value
  const q = searchQuery.value.toLowerCase()
  return customers.value.filter(c =>
    c.display_name?.toLowerCase().includes(q) ||
    c.email?.toLowerCase().includes(q)
  )
})

async function fetchCustomers() {
  const { data } = await client
    .from('profiles')
    .select('id, display_name, email, role, total_orders, total_spent, is_active, created_at')
    .order('created_at', { ascending: false })

  customers.value = (data as CustomerRow[]) || []
}

onMounted(fetchCustomers)
</script>

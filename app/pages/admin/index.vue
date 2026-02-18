<template>
  <div>
    <div class="mb-8">
      <h1 class="text-2xl font-['Cormorant_Garamond'] font-semibold text-[#2D2D2D]">Dashboard</h1>
      <p class="text-sm text-[#8B7D6B] mt-1">Welcome back. Here's what's happening today.</p>
    </div>

    <!-- Stat Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="bg-white rounded-xl border border-[#e8e4de] p-5 hover:shadow-lg hover:shadow-[#C9A96E]/5 transition-all duration-300"
      >
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-medium uppercase tracking-wider text-[#8B7D6B]">{{ stat.label }}</span>
          <span
            :class="[
              'w-9 h-9 rounded-lg flex items-center justify-center',
              stat.iconBg
            ]"
            v-html="stat.icon"
          />
        </div>
        <p class="text-2xl font-semibold text-[#2D2D2D]">{{ stat.value }}</p>
        <p class="text-xs text-[#8B7D6B] mt-1">
          <span :class="stat.trend > 0 ? 'text-emerald-600' : 'text-red-500'">
            {{ stat.trend > 0 ? '↑' : '↓' }} {{ Math.abs(stat.trend) }}%
          </span>
          vs last month
        </p>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Recent Orders -->
      <div class="bg-white rounded-xl border border-[#e8e4de] p-5">
        <h3 class="text-sm font-semibold text-[#2D2D2D] mb-4">Recent Orders</h3>
        <div class="space-y-3">
          <div
            v-for="order in recentOrders"
            :key="order.id"
            class="flex items-center justify-between p-3 rounded-lg bg-[#faf7f2] hover:bg-[#f0ece6] transition-colors"
          >
            <div>
              <p class="text-sm font-medium text-[#2D2D2D]">{{ order.id }}</p>
              <p class="text-xs text-[#8B7D6B]">{{ order.customer }}</p>
            </div>
            <div class="text-right">
              <p class="text-sm font-semibold text-[#2D2D2D]">₹{{ order.amount.toLocaleString() }}</p>
              <span
                :class="[
                  'text-[10px] font-medium px-2 py-0.5 rounded-full',
                  order.status === 'delivered' ? 'bg-emerald-100 text-emerald-700' :
                  order.status === 'processing' ? 'bg-amber-100 text-amber-700' :
                  'bg-blue-100 text-blue-700'
                ]"
              >
                {{ order.status }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Low Stock Alerts -->
      <div class="bg-white rounded-xl border border-[#e8e4de] p-5">
        <h3 class="text-sm font-semibold text-[#2D2D2D] mb-4">Low Stock Alerts</h3>
        <div class="space-y-3">
          <div
            v-for="item in lowStockItems"
            :key="item.sku"
            class="flex items-center justify-between p-3 rounded-lg bg-red-50/50 hover:bg-red-50 transition-colors"
          >
            <div>
              <p class="text-sm font-medium text-[#2D2D2D]">{{ item.name }}</p>
              <p class="text-xs text-[#8B7D6B]">SKU: {{ item.sku }}</p>
            </div>
            <div class="text-right">
              <p class="text-sm font-semibold text-red-600">{{ item.stock }} left</p>
              <p class="text-[10px] text-[#8B7D6B]">Reorder point: {{ item.reorder }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

const stats = [
  {
    label: 'Total Products',
    value: '0',
    trend: 0,
    iconBg: 'bg-violet-100',
    icon: '<svg class="w-5 h-5 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25"/></svg>'
  },
  {
    label: 'Orders This Month',
    value: '0',
    trend: 0,
    iconBg: 'bg-blue-100',
    icon: '<svg class="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"/></svg>'
  },
  {
    label: 'Revenue This Month',
    value: '₹0',
    trend: 0,
    iconBg: 'bg-emerald-100',
    icon: '<svg class="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>'
  },
  {
    label: 'Low Stock Alerts',
    value: '0',
    trend: 0,
    iconBg: 'bg-red-100',
    icon: '<svg class="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"/></svg>'
  }
]

const recentOrders = [
  { id: 'ORD-20260217-100001', customer: 'No orders yet', amount: 0, status: 'pending' },
]

const lowStockItems = [
  { name: 'No low stock items', sku: '—', stock: '—', reorder: '—' },
]
</script>

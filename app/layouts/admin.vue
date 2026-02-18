<template>
  <div class="min-h-screen bg-cream">
    <!-- Mobile overlay -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 z-40 bg-charcoal/30 backdrop-blur-sm lg:hidden"
      @click="sidebarOpen = false"
    />

    <!-- Sidebar -->
    <aside
      :class="[
        'fixed inset-y-0 left-0 z-50 w-60 flex flex-col transform transition-transform duration-300',
        'border-r border-[#e8e4de]',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      ]"
      style="background-color: #ffffff; box-shadow: 2px 0 8px rgba(0, 0, 0, 0.04);"
    >
      <!-- Logo -->
      <div class="flex items-center h-16 px-5 border-b border-[#e8e4de]">
        <NuxtLink to="/admin" class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-lg bg-charcoal flex items-center justify-center">
            <span class="text-white text-sm font-bold">M</span>
          </div>
          <span class="font-heading text-xl tracking-wider text-charcoal">MAISON</span>
        </NuxtLink>
        <span class="ml-auto px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase bg-champagne/15 text-champagne rounded-full">Admin</span>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        <NuxtLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          :class="[
            'flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-200',
            isActive(item.path)
              ? 'bg-champagne/10 text-champagne'
              : 'text-taupe hover:text-charcoal hover:bg-cream'
          ]"
          @click="sidebarOpen = false"
        >
          <span v-html="item.icon" class="w-[18px] h-[18px] flex-shrink-0" />
          <span>{{ item.label }}</span>
          <span
            v-if="item.badge"
            class="ml-auto px-1.5 py-0.5 text-[10px] font-semibold rounded-full bg-red-50 text-red-500"
          >
            {{ item.badge }}
          </span>
        </NuxtLink>

        <!-- Divider + Storefront link -->
        <div class="pt-3 mt-3 border-t border-[#e8e4de]">
          <NuxtLink
            to="/"
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium text-taupe hover:text-charcoal hover:bg-cream transition-all"
          >
            <svg class="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/></svg>
            <span>View Storefront</span>
          </NuxtLink>
        </div>
      </nav>

      <!-- User -->
      <div class="p-3 border-t border-[#e8e4de]">
        <div class="flex items-center gap-2.5 px-2 py-2">
          <div class="w-8 h-8 rounded-full bg-champagne/20 flex items-center justify-center text-champagne text-xs font-semibold">
            {{ userInitials }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-[13px] font-medium text-charcoal truncate">{{ userName }}</p>
            <p class="text-[11px] text-taupe truncate">Administrator</p>
          </div>
          <button
            @click="handleLogout"
            class="p-1.5 rounded-lg text-taupe-light hover:text-red-500 hover:bg-red-50 transition-all"
            title="Sign Out"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"/></svg>
          </button>
        </div>
      </div>
    </aside>

    <!-- Main content -->
    <div class="min-h-screen flex flex-col" :style="{ paddingLeft: isLargeScreen ? '240px' : '0' }">
      <!-- Top bar -->
      <header class="sticky top-0 z-30 h-14 border-b border-[#e8e4de] flex items-center px-6 gap-4" style="background-color: rgba(255, 255, 255, 0.92); backdrop-filter: blur(12px);">
        <button
          @click="sidebarOpen = true"
          class="lg:hidden p-2 -ml-2 rounded-lg text-charcoal hover:bg-cream transition-colors"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/></svg>
        </button>

        <div class="flex-1" />

        <!-- Search -->
        <div class="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cream text-sm text-taupe cursor-pointer hover:bg-[#f0ece6] transition-colors">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/></svg>
          <span>Search… ⌘K</span>
        </div>
      </header>

      <!-- Page content -->
      <main class="flex-1 p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'admin'
})

const route = useRoute()
const user = useSupabaseUser()
const client = useSupabaseClient()

const sidebarOpen = ref(false)
const isLargeScreen = ref(false)

function checkScreenSize() {
  isLargeScreen.value = typeof window !== 'undefined' && window.innerWidth >= 1024
}

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})

const userName = computed(() => {
  const meta = user.value?.user_metadata
  return meta?.full_name || meta?.name || user.value?.email?.split('@')[0] || 'Admin'
})

const userInitials = computed(() => {
  const name = userName.value
  return name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
})

const navItems = [
  {
    label: 'Dashboard',
    path: '/admin',
    icon: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z"/></svg>'
  },
  {
    label: 'Products',
    path: '/admin/products',
    icon: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"/></svg>'
  },
  {
    label: 'Brands',
    path: '/admin/brands',
    icon: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z"/></svg>'
  },
  {
    label: 'Categories',
    path: '/admin/categories',
    icon: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"/></svg>'
  },
  {
    label: 'Orders',
    path: '/admin/orders',
    icon: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"/></svg>'
  },
  {
    label: 'Customers',
    path: '/admin/customers',
    icon: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"/></svg>'
  },
  {
    label: 'Inventory',
    path: '/admin/inventory',
    icon: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"/></svg>'
  },
  {
    label: 'Settings',
    path: '/admin/settings',
    icon: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.432.992a7.723 7.723 0 0 1 0 .255c-.007.378.138.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/></svg>'
  }
]

function isActive(path: string) {
  if (path === '/admin') return route.path === '/admin'
  return route.path.startsWith(path)
}

async function handleLogout() {
  await client.auth.signOut()
  navigateTo('/')
}
</script>

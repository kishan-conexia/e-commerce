<template>
  <div>
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 class="text-2xl font-['Cormorant_Garamond'] font-semibold text-[#2D2D2D]">Products</h1>
        <p class="text-sm text-[#8B7D6B] mt-1">{{ products.length }} product{{ products.length !== 1 ? 's' : '' }}</p>
      </div>
      <NuxtLink
        to="/admin/products/create"
        class="px-4 py-2.5 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
        style="background-color: #2D2D2D;"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>
        Create Product
      </NuxtLink>
    </div>

    <!-- Filters -->
    <div class="flex flex-wrap items-center gap-3 mb-5">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search products..."
        class="px-3 py-2 rounded-lg border border-[#e8e4de] text-sm focus:outline-none focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E]/30 transition-all w-64"
      />
      <select
        v-model="statusFilter"
        class="px-3 py-2 rounded-lg border border-[#e8e4de] text-sm focus:outline-none focus:border-[#C9A96E] transition-all"
      >
        <option value="">All Status</option>
        <option value="draft">Draft</option>
        <option value="active">Published</option>
        <option value="archived">Archived</option>
      </select>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-xl border border-[#e8e4de] overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-[#e8e4de] bg-[#faf7f2]">
              <th class="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#8B7D6B]">Product</th>
              <th class="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#8B7D6B]">Price</th>
              <th class="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#8B7D6B]">Status</th>
              <th class="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#8B7D6B]">Variants</th>
              <th class="text-right px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#8B7D6B]">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filteredProducts.length === 0">
              <td colspan="5" class="px-5 py-12 text-center">
                <div class="flex flex-col items-center gap-3">
                  <svg class="w-12 h-12 text-[#e8e4de]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1"><path stroke-linecap="round" stroke-linejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25"/></svg>
                  <p class="text-sm text-[#8B7D6B]">No products found. Create your first product.</p>
                </div>
              </td>
            </tr>
            <tr
              v-for="product in filteredProducts"
              :key="product.id"
              class="border-b border-[#f0ece6] last:border-0 hover:bg-[#faf7f2]/50 transition-colors"
            >
              <td class="px-5 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-[#C9A96E]/15 to-[#C9A96E]/5 flex items-center justify-center text-sm font-semibold text-[#C9A96E] flex-shrink-0 overflow-hidden">
                    <img v-if="product.primaryImage" :src="product.primaryImage" :alt="product.name" class="w-full h-full object-cover" />
                    <span v-else>{{ product.name[0] }}</span>
                  </div>
                  <div class="min-w-0">
                    <p class="text-sm font-medium text-[#2D2D2D] truncate">{{ product.name }}</p>
                    <p class="text-xs text-[#8B7D6B] font-mono truncate">{{ product.slug }}</p>
                  </div>
                </div>
              </td>
              <td class="px-5 py-4">
                <p class="text-sm font-semibold text-[#2D2D2D]">₹{{ Number(product.base_price).toLocaleString() }}</p>
                <p v-if="product.compare_at_price" class="text-xs text-[#8B7D6B] line-through">₹{{ Number(product.compare_at_price).toLocaleString() }}</p>
              </td>
              <td class="px-5 py-4">
                <span
                  :class="[
                    'text-[11px] font-medium px-2.5 py-1 rounded-full',
                    product.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                    product.status === 'draft' ? 'bg-amber-100 text-amber-700' :
                    'bg-gray-100 text-gray-500'
                  ]"
                >
                  {{ product.status === 'active' ? 'Published' : product.status }}
                </span>
              </td>
              <td class="px-5 py-4 text-sm text-[#8B7D6B]">
                {{ product.variantCount || 0 }}
              </td>
              <td class="px-5 py-4 text-right">
                <div class="flex items-center justify-end gap-1">
                  <button
                    @click="deleteProduct(product.id)"
                    class="p-2 rounded-lg text-[#8B7D6B] hover:text-red-600 hover:bg-red-50 transition-all"
                    title="Delete"
                  >
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/></svg>
                  </button>
                </div>
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

interface ProductRow {
  id: string
  name: string
  slug: string
  base_price: number
  compare_at_price: number | null
  status: string
  primaryImage?: string
  variantCount?: number
}

const products = ref<ProductRow[]>([])
const searchQuery = ref('')
const statusFilter = ref('')

const filteredProducts = computed(() => {
  let result = products.value
  if (statusFilter.value) {
    result = result.filter(p => p.status === statusFilter.value)
  }
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(p =>
      p.name.toLowerCase().includes(q) || p.slug.includes(q)
    )
  }
  return result
})

async function fetchProducts() {
  const { data } = await client
    .from('products')
    .select(`
      id, name, slug, base_price, compare_at_price, status,
      product_images(url, is_primary),
      product_variants(id)
    `)
    .order('created_at', { ascending: false })

  products.value = ((data as any[]) || []).map(p => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    base_price: p.base_price,
    compare_at_price: p.compare_at_price,
    status: p.status,
    primaryImage: p.product_images?.find((img: any) => img.is_primary)?.url || p.product_images?.[0]?.url,
    variantCount: p.product_variants?.length || 0,
  }))
}

async function deleteProduct(id: string) {
  if (!confirm('Permanently delete this product and all its variants?')) return
  await client.from('products').delete().eq('id', id)
  await fetchProducts()
}

onMounted(fetchProducts)
</script>

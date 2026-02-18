<template>
  <div>
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 class="text-2xl font-['Cormorant_Garamond'] font-semibold text-[#2D2D2D]">Brands</h1>
        <p class="text-sm text-[#8B7D6B] mt-1">Manage your product brands</p>
      </div>
      <button
        @click="openModal()"
        class="px-4 py-2.5 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
        style="background-color: #2D2D2D;"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>
        Add Brand
      </button>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-xl border border-[#e8e4de] overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="border-b border-[#e8e4de] bg-[#faf7f2]">
            <th class="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#8B7D6B]">Brand</th>
            <th class="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#8B7D6B]">Slug</th>
            <th class="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#8B7D6B]">Status</th>
            <th class="text-right px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#8B7D6B]">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="brands.length === 0">
            <td colspan="4" class="px-5 py-12 text-center text-sm text-[#8B7D6B]">
              No brands yet. Click "Add Brand" to create your first brand.
            </td>
          </tr>
          <tr
            v-for="brand in brands"
            :key="brand.id"
            class="border-b border-[#f0ece6] last:border-0 hover:bg-[#faf7f2]/50 transition-colors"
          >
            <td class="px-5 py-4">
              <div class="flex items-center gap-3">
                <div
                  v-if="brand.logo_url"
                  class="w-10 h-10 rounded-lg bg-[#f0ece6] overflow-hidden"
                >
                  <img :src="brand.logo_url" :alt="brand.name" class="w-full h-full object-cover" />
                </div>
                <div v-else class="w-10 h-10 rounded-lg bg-gradient-to-br from-[#C9A96E]/20 to-[#C9A96E]/5 flex items-center justify-center text-sm font-semibold text-[#C9A96E]">
                  {{ brand.name[0] }}
                </div>
                <div>
                  <p class="text-sm font-medium text-[#2D2D2D]">{{ brand.name }}</p>
                  <p class="text-xs text-[#8B7D6B] line-clamp-1">{{ brand.description || '—' }}</p>
                </div>
              </div>
            </td>
            <td class="px-5 py-4 text-sm text-[#8B7D6B] font-mono">{{ brand.slug }}</td>
            <td class="px-5 py-4">
              <span
                :class="[
                  'text-[11px] font-medium px-2.5 py-1 rounded-full',
                  brand.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'
                ]"
              >
                {{ brand.is_active ? 'Active' : 'Inactive' }}
              </span>
            </td>
            <td class="px-5 py-4 text-right">
              <div class="flex items-center justify-end gap-1">
                <button
                  @click="openModal(brand)"
                  class="p-2 rounded-lg text-[#8B7D6B] hover:text-[#2D2D2D] hover:bg-[#f0ece6] transition-all"
                  title="Edit"
                >
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/></svg>
                </button>
                <button
                  @click="deleteBrand(brand.id)"
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

    <!-- Modal -->
    <Teleport to="body">
      <div v-if="showModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div class="fixed inset-0 bg-black/50 backdrop-blur-sm" @click="showModal = false" />
        <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 z-10">
          <h2 class="text-lg font-['Cormorant_Garamond'] font-semibold text-[#2D2D2D] mb-5">
            {{ editingBrand ? 'Edit Brand' : 'Create Brand' }}
          </h2>

          <form @submit.prevent="saveBrand" class="space-y-4">
            <div>
              <label class="block text-xs font-medium text-[#8B7D6B] mb-1.5">Name *</label>
              <input
                v-model="form.name"
                @input="autoSlug"
                type="text"
                required
                class="w-full px-3 py-2.5 rounded-lg border border-[#e8e4de] text-sm focus:outline-none focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E]/30 transition-all"
                placeholder="e.g. MAISON"
              />
            </div>

            <div>
              <label class="block text-xs font-medium text-[#8B7D6B] mb-1.5">Slug *</label>
              <input
                v-model="form.slug"
                type="text"
                required
                class="w-full px-3 py-2.5 rounded-lg border border-[#e8e4de] text-sm font-mono focus:outline-none focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E]/30 transition-all"
                placeholder="auto-generated"
              />
            </div>

            <div>
              <label class="block text-xs font-medium text-[#8B7D6B] mb-1.5">Description</label>
              <textarea
                v-model="form.description"
                rows="3"
                class="w-full px-3 py-2.5 rounded-lg border border-[#e8e4de] text-sm focus:outline-none focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E]/30 transition-all resize-none"
                placeholder="Brief brand description"
              />
            </div>

            <div class="flex items-center gap-2">
              <input v-model="form.is_active" type="checkbox" id="brand_active" class="accent-[#C9A96E]" />
              <label for="brand_active" class="text-sm text-[#2D2D2D]">Active</label>
            </div>

            <div class="flex justify-end gap-3 pt-2">
              <button
                type="button"
                @click="showModal = false"
                class="px-4 py-2.5 text-sm font-medium text-[#8B7D6B] hover:text-[#2D2D2D] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="saving"
                class="px-5 py-2.5 text-white text-sm font-medium rounded-lg disabled:opacity-50 transition-colors"
                style="background-color: #2D2D2D;"
              >
                {{ saving ? 'Saving...' : (editingBrand ? 'Update' : 'Create') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const client = useSupabaseClient()

interface Brand {
  id: string
  name: string
  slug: string
  description: string | null
  logo_url: string | null
  is_active: boolean
}

const brands = ref<Brand[]>([])
const showModal = ref(false)
const saving = ref(false)
const editingBrand = ref<Brand | null>(null)

const form = reactive({
  name: '',
  slug: '',
  description: '',
  is_active: true,
})

async function fetchBrands() {
  const { data } = await client
    .from('brands')
    .select('*')
    .order('created_at', { ascending: false })
  brands.value = (data as Brand[]) || []
}

function openModal(brand?: Brand) {
  if (brand) {
    editingBrand.value = brand
    form.name = brand.name
    form.slug = brand.slug
    form.description = brand.description || ''
    form.is_active = brand.is_active
  } else {
    editingBrand.value = null
    form.name = ''
    form.slug = ''
    form.description = ''
    form.is_active = true
  }
  showModal.value = true
}

function autoSlug() {
  if (!editingBrand.value) {
    form.slug = form.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }
}

async function saveBrand() {
  saving.value = true
  try {
    if (editingBrand.value) {
      await client
        .from('brands')
        .update({ name: form.name, slug: form.slug, description: form.description || null, is_active: form.is_active })
        .eq('id', editingBrand.value.id)
    } else {
      await client
        .from('brands')
        .insert({ name: form.name, slug: form.slug, description: form.description || null, is_active: form.is_active })
    }
    showModal.value = false
    await fetchBrands()
  } catch (e) {
    console.error('Error saving brand:', e)
  } finally {
    saving.value = false
  }
}

async function deleteBrand(id: string) {
  if (!confirm('Delete this brand? Products using it will have their brand unset.')) return
  await client.from('brands').delete().eq('id', id)
  await fetchBrands()
}

onMounted(fetchBrands)
</script>

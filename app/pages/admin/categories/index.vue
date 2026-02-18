<template>
  <div>
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 class="text-2xl font-['Cormorant_Garamond'] font-semibold text-[#2D2D2D]">Categories</h1>
        <p class="text-sm text-[#8B7D6B] mt-1">Manage your product category hierarchy</p>
      </div>
      <button
        @click="openModal()"
        class="px-4 py-2.5 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
        style="background-color: #2D2D2D;"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>
        Add Category
      </button>
    </div>

    <!-- Category Tree -->
    <div class="bg-white rounded-xl border border-[#e8e4de] overflow-hidden">
      <div v-if="categories.length === 0" class="px-5 py-12 text-center text-sm text-[#8B7D6B]">
        No categories yet. Click "Add Category" to create your first category.
      </div>
      <div v-else class="divide-y divide-[#f0ece6]">
        <template v-for="cat in categoryTree" :key="cat.id">
          <div
            :style="{ paddingLeft: `${(cat.depth * 24) + 20}px` }"
            class="flex items-center gap-3 py-3 pr-5 hover:bg-[#faf7f2]/50 transition-colors group"
          >
            <!-- Expand/collapse or leaf indicator -->
            <button
              v-if="hasChildren(cat.id)"
              @click="toggleExpand(cat.id)"
              class="w-5 h-5 rounded flex items-center justify-center text-[#8B7D6B] hover:bg-[#f0ece6] transition-colors"
            >
              <svg
                :class="['w-3.5 h-3.5 transition-transform', expanded.has(cat.id) ? 'rotate-90' : '']"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
              </svg>
            </button>
            <div v-else class="w-5 h-5 flex items-center justify-center">
              <div class="w-1.5 h-1.5 rounded-full bg-[#e8e4de]" />
            </div>

            <!-- Category info -->
            <div
              v-if="cat.image_url"
              class="w-8 h-8 rounded-lg bg-[#f0ece6] overflow-hidden flex-shrink-0"
            >
              <img :src="cat.image_url" :alt="cat.name" class="w-full h-full object-cover" />
            </div>
            <div v-else class="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C9A96E]/15 to-[#C9A96E]/5 flex items-center justify-center text-xs font-semibold text-[#C9A96E] flex-shrink-0">
              {{ cat.name[0] }}
            </div>

            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-[#2D2D2D]">{{ cat.name }}</p>
              <p class="text-xs text-[#8B7D6B] font-mono">{{ cat.slug }}</p>
            </div>

            <span class="text-[10px] font-mono text-[#8B7D6B] bg-[#f0ece6] px-2 py-0.5 rounded">
              depth: {{ cat.depth }}
            </span>

            <span
              :class="[
                'text-[11px] font-medium px-2 py-0.5 rounded-full',
                cat.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'
              ]"
            >
              {{ cat.is_active ? 'Active' : 'Inactive' }}
            </span>

            <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                @click="openModal(cat)"
                class="p-1.5 rounded-lg text-[#8B7D6B] hover:text-[#2D2D2D] hover:bg-[#f0ece6] transition-all"
                title="Edit"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/></svg>
              </button>
              <button
                @click="deleteCategory(cat.id)"
                class="p-1.5 rounded-lg text-[#8B7D6B] hover:text-red-600 hover:bg-red-50 transition-all"
                title="Delete"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/></svg>
              </button>
            </div>
          </div>

          <!-- Children (when expanded) -->
          <template v-if="expanded.has(cat.id)">
            <div
              v-for="child in getChildren(cat.id)"
              :key="child.id"
              :style="{ paddingLeft: `${(child.depth * 24) + 20}px` }"
              class="flex items-center gap-3 py-3 pr-5 hover:bg-[#faf7f2]/50 transition-colors group border-t border-[#f0ece6]"
            >
              <button
                v-if="hasChildren(child.id)"
                @click="toggleExpand(child.id)"
                class="w-5 h-5 rounded flex items-center justify-center text-[#8B7D6B] hover:bg-[#f0ece6] transition-colors"
              >
                <svg
                  :class="['w-3.5 h-3.5 transition-transform', expanded.has(child.id) ? 'rotate-90' : '']"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
                </svg>
              </button>
              <div v-else class="w-5 h-5 flex items-center justify-center">
                <div class="w-1.5 h-1.5 rounded-full bg-[#e8e4de]" />
              </div>

              <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C9A96E]/10 to-[#C9A96E]/5 flex items-center justify-center text-xs font-semibold text-[#C9A96E] flex-shrink-0">
                {{ child.name[0] }}
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-[#2D2D2D]">{{ child.name }}</p>
                <p class="text-xs text-[#8B7D6B] font-mono">{{ child.path }}</p>
              </div>
              <span
                :class="[
                  'text-[11px] font-medium px-2 py-0.5 rounded-full',
                  child.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'
                ]"
              >
                {{ child.is_active ? 'Active' : 'Inactive' }}
              </span>
              <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button @click="openModal(child)" class="p-1.5 rounded-lg text-[#8B7D6B] hover:text-[#2D2D2D] hover:bg-[#f0ece6] transition-all" title="Edit">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/></svg>
                </button>
                <button @click="deleteCategory(child.id)" class="p-1.5 rounded-lg text-[#8B7D6B] hover:text-red-600 hover:bg-red-50 transition-all" title="Delete">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/></svg>
                </button>
              </div>
            </div>
          </template>
        </template>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <Teleport to="body">
      <div v-if="showModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div class="fixed inset-0 bg-black/50 backdrop-blur-sm" @click="showModal = false" />
        <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 z-10">
          <h2 class="text-lg font-['Cormorant_Garamond'] font-semibold text-[#2D2D2D] mb-5">
            {{ editingCategory ? 'Edit Category' : 'Create Category' }}
          </h2>

          <form @submit.prevent="saveCategory" class="space-y-4">
            <div>
              <label class="block text-xs font-medium text-[#8B7D6B] mb-1.5">Name *</label>
              <input
                v-model="form.name"
                @input="autoSlug"
                type="text"
                required
                class="w-full px-3 py-2.5 rounded-lg border border-[#e8e4de] text-sm focus:outline-none focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E]/30 transition-all"
                placeholder="e.g. Sarees"
              />
            </div>

            <div>
              <label class="block text-xs font-medium text-[#8B7D6B] mb-1.5">Slug *</label>
              <input
                v-model="form.slug"
                type="text"
                required
                class="w-full px-3 py-2.5 rounded-lg border border-[#e8e4de] text-sm font-mono focus:outline-none focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E]/30 transition-all"
              />
            </div>

            <div>
              <label class="block text-xs font-medium text-[#8B7D6B] mb-1.5">Parent Category</label>
              <select
                v-model="form.parent_id"
                class="w-full px-3 py-2.5 rounded-lg border border-[#e8e4de] text-sm focus:outline-none focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E]/30 transition-all"
              >
                <option :value="null">— Root category —</option>
                <option
                  v-for="cat in categories.filter(c => c.id !== editingCategory?.id)"
                  :key="cat.id"
                  :value="cat.id"
                >
                  {{ '—'.repeat(cat.depth) }} {{ cat.name }}
                </option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-medium text-[#8B7D6B] mb-1.5">Description</label>
              <textarea
                v-model="form.description"
                rows="2"
                class="w-full px-3 py-2.5 rounded-lg border border-[#e8e4de] text-sm focus:outline-none focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E]/30 transition-all resize-none"
                placeholder="Category description"
              />
            </div>

            <div>
              <label class="block text-xs font-medium text-[#8B7D6B] mb-1.5">Sort Order</label>
              <input
                v-model.number="form.sort_order"
                type="number"
                min="0"
                class="w-full px-3 py-2.5 rounded-lg border border-[#e8e4de] text-sm focus:outline-none focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E]/30 transition-all"
              />
            </div>

            <div class="flex items-center gap-2">
              <input v-model="form.is_active" type="checkbox" id="cat_active" class="accent-[#C9A96E]" />
              <label for="cat_active" class="text-sm text-[#2D2D2D]">Active</label>
            </div>

            <div class="flex justify-end gap-3 pt-2">
              <button type="button" @click="showModal = false" class="px-4 py-2.5 text-sm font-medium text-[#8B7D6B] hover:text-[#2D2D2D] transition-colors">Cancel</button>
              <button
                type="submit"
                :disabled="saving"
                class="px-5 py-2.5 text-white text-sm font-medium rounded-lg disabled:opacity-50 transition-colors"
                style="background-color: #2D2D2D;"
              >
                {{ saving ? 'Saving...' : (editingCategory ? 'Update' : 'Create') }}
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

interface Category {
  id: string
  parent_id: string | null
  name: string
  slug: string
  description: string | null
  image_url: string | null
  sort_order: number
  depth: number
  path: string
  is_active: boolean
}

const categories = ref<Category[]>([])
const showModal = ref(false)
const saving = ref(false)
const editingCategory = ref<Category | null>(null)
const expanded = ref<Set<string>>(new Set())

const form = reactive({
  name: '',
  slug: '',
  parent_id: null as string | null,
  description: '',
  sort_order: 0,
  is_active: true,
})

// Top-level categories (roots)
const categoryTree = computed(() =>
  categories.value
    .filter(c => c.parent_id === null)
    .sort((a, b) => a.sort_order - b.sort_order)
)

function hasChildren(id: string) {
  return categories.value.some(c => c.parent_id === id)
}

function getChildren(id: string) {
  return categories.value
    .filter(c => c.parent_id === id)
    .sort((a, b) => a.sort_order - b.sort_order)
}

function toggleExpand(id: string) {
  if (expanded.value.has(id)) {
    expanded.value.delete(id)
  } else {
    expanded.value.add(id)
  }
}

async function fetchCategories() {
  const { data } = await client
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true })
  categories.value = (data as Category[]) || []
}

function openModal(cat?: Category) {
  if (cat) {
    editingCategory.value = cat
    form.name = cat.name
    form.slug = cat.slug
    form.parent_id = cat.parent_id
    form.description = cat.description || ''
    form.sort_order = cat.sort_order
    form.is_active = cat.is_active
  } else {
    editingCategory.value = null
    form.name = ''
    form.slug = ''
    form.parent_id = null
    form.description = ''
    form.sort_order = 0
    form.is_active = true
  }
  showModal.value = true
}

function autoSlug() {
  if (!editingCategory.value) {
    form.slug = form.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }
}

function computeDepthAndPath(parentId: string | null): { depth: number; path: string } {
  if (!parentId) return { depth: 0, path: form.slug }
  const parent = categories.value.find(c => c.id === parentId)
  if (!parent) return { depth: 0, path: form.slug }
  return {
    depth: parent.depth + 1,
    path: parent.path ? `${parent.path}/${form.slug}` : form.slug,
  }
}

async function saveCategory() {
  saving.value = true
  try {
    const { depth, path } = computeDepthAndPath(form.parent_id)

    const payload = {
      name: form.name,
      slug: form.slug,
      parent_id: form.parent_id,
      description: form.description || null,
      sort_order: form.sort_order,
      depth,
      path,
      is_active: form.is_active,
    }

    if (editingCategory.value) {
      await client.from('categories').update(payload).eq('id', editingCategory.value.id)
    } else {
      await client.from('categories').insert(payload)
    }
    showModal.value = false
    await fetchCategories()
  } catch (e) {
    console.error('Error saving category:', e)
  } finally {
    saving.value = false
  }
}

async function deleteCategory(id: string) {
  if (!confirm('Delete this category? Child categories will become roots.')) return
  await client.from('categories').delete().eq('id', id)
  await fetchCategories()
}

onMounted(fetchCategories)
</script>

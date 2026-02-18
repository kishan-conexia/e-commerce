<template>
  <div>
    <!-- Header -->
    <div class="flex items-center gap-4 mb-6">
      <NuxtLink to="/admin/products" class="p-2 rounded-lg text-[#8B7D6B] hover:text-[#2D2D2D] hover:bg-[#f0ece6] transition-all">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/></svg>
      </NuxtLink>
      <div>
        <h1 class="text-2xl font-['Cormorant_Garamond'] font-semibold text-[#2D2D2D]">Create Product</h1>
        <p class="text-sm text-[#8B7D6B] mt-0.5">Step {{ currentStep }} of {{ totalSteps }} — {{ stepLabels[currentStep - 1] }}</p>
      </div>
    </div>

    <!-- Step Indicator -->
    <div class="flex items-center gap-1 mb-8">
      <template v-for="(label, i) in stepLabels" :key="i">
        <button
          @click="goToStep(i + 1)"
          :class="[
            'flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all',
            currentStep === i + 1
              ? 'bg-[#2D2D2D] text-white'
              : currentStep > i + 1
              ? 'bg-emerald-100 text-emerald-700'
              : 'bg-[#f0ece6] text-[#8B7D6B]'
          ]"
        >
          <span class="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold" :class="currentStep > i + 1 ? 'bg-emerald-200' : 'bg-white/20'">
            <svg v-if="currentStep > i + 1" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>
            <span v-else>{{ i + 1 }}</span>
          </span>
          <span class="hidden sm:inline">{{ label }}</span>
        </button>
        <div v-if="i < stepLabels.length - 1" class="w-8 h-px bg-[#e8e4de]" />
      </template>
    </div>

    <!-- Step 1: Basic Information -->
    <div v-show="currentStep === 1" class="space-y-6">
      <div class="bg-white rounded-xl border border-[#e8e4de] p-6">
        <h3 class="text-sm font-semibold text-[#2D2D2D] mb-4">Product Details</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div class="lg:col-span-2">
            <label class="block text-xs font-medium text-[#8B7D6B] mb-1.5">Product Name *</label>
            <input v-model="form.name" @input="autoSlug" type="text" class="w-full px-3 py-2.5 rounded-lg border border-[#e8e4de] text-sm focus:outline-none focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E]/30" placeholder="e.g. Ivory Embroidered Silk Saree" />
            <p v-if="errors.name" class="text-xs text-red-500 mt-1">{{ errors.name }}</p>
          </div>
          <div>
            <label class="block text-xs font-medium text-[#8B7D6B] mb-1.5">Slug *</label>
            <input v-model="form.slug" type="text" class="w-full px-3 py-2.5 rounded-lg border border-[#e8e4de] text-sm font-mono focus:outline-none focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E]/30" />
            <p v-if="errors.slug" class="text-xs text-red-500 mt-1">{{ errors.slug }}</p>
          </div>
          <div>
            <label class="block text-xs font-medium text-[#8B7D6B] mb-1.5">Brand *</label>
            <select v-model="form.brand_id" class="w-full px-3 py-2.5 rounded-lg border border-[#e8e4de] text-sm focus:outline-none focus:border-[#C9A96E]">
              <option :value="null">Select brand</option>
              <option v-for="b in brands" :key="b.id" :value="b.id">{{ b.name }}</option>
            </select>
            <p v-if="errors.brand_id" class="text-xs text-red-500 mt-1">{{ errors.brand_id }}</p>
          </div>
          <div>
            <label class="block text-xs font-medium text-[#8B7D6B] mb-1.5">Base Price (₹) *</label>
            <input v-model.number="form.base_price" type="number" min="0" step="0.01" class="w-full px-3 py-2.5 rounded-lg border border-[#e8e4de] text-sm focus:outline-none focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E]/30" placeholder="0.00" />
            <p v-if="errors.base_price" class="text-xs text-red-500 mt-1">{{ errors.base_price }}</p>
          </div>
          <div>
            <label class="block text-xs font-medium text-[#8B7D6B] mb-1.5">Compare At Price (₹)</label>
            <input v-model.number="form.compare_at_price" type="number" min="0" step="0.01" class="w-full px-3 py-2.5 rounded-lg border border-[#e8e4de] text-sm focus:outline-none focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E]/30" placeholder="MRP / original price" />
          </div>
          <div>
            <label class="block text-xs font-medium text-[#8B7D6B] mb-1.5">Status</label>
            <select v-model="form.status" class="w-full px-3 py-2.5 rounded-lg border border-[#e8e4de] text-sm focus:outline-none focus:border-[#C9A96E]">
              <option value="draft">Draft</option>
              <option value="active">Published</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-medium text-[#8B7D6B] mb-1.5">Categories *</label>
            <div class="border border-[#e8e4de] rounded-lg p-3 max-h-40 overflow-y-auto space-y-1.5">
              <label v-for="cat in categories" :key="cat.id" class="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" :value="cat.id" v-model="form.category_ids" class="accent-[#C9A96E]" />
                <span>{{ '—'.repeat(cat.depth) }} {{ cat.name }}</span>
              </label>
              <p v-if="categories.length === 0" class="text-xs text-[#8B7D6B]">No categories. Create one first.</p>
            </div>
            <p v-if="errors.category_ids" class="text-xs text-red-500 mt-1">{{ errors.category_ids }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl border border-[#e8e4de] p-6">
        <h3 class="text-sm font-semibold text-[#2D2D2D] mb-4">Description & Meta</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-xs font-medium text-[#8B7D6B] mb-1.5">Short Description <span class="text-[#C9A96E]">({{ form.short_description.length }}/160)</span></label>
            <textarea v-model="form.short_description" rows="2" maxlength="160" class="w-full px-3 py-2.5 rounded-lg border border-[#e8e4de] text-sm focus:outline-none focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E]/30 resize-none" placeholder="Brief tagline for the product" />
          </div>
          <div>
            <label class="block text-xs font-medium text-[#8B7D6B] mb-1.5">Full Description</label>
            <textarea v-model="form.description" rows="4" class="w-full px-3 py-2.5 rounded-lg border border-[#e8e4de] text-sm focus:outline-none focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E]/30 resize-none" placeholder="Detailed product description" />
          </div>
          <div>
            <label class="block text-xs font-medium text-[#8B7D6B] mb-1.5">Care Instructions</label>
            <textarea v-model="form.care_instructions" rows="2" class="w-full px-3 py-2.5 rounded-lg border border-[#e8e4de] text-sm focus:outline-none focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E]/30 resize-none" placeholder="Dry clean only, hand wash cold, etc." />
          </div>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-medium text-[#8B7D6B] mb-1.5">Meta Title <span class="text-[#C9A96E]">({{ form.meta_title.length }}/60)</span></label>
              <input v-model="form.meta_title" type="text" maxlength="60" class="w-full px-3 py-2.5 rounded-lg border border-[#e8e4de] text-sm focus:outline-none focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E]/30" />
            </div>
            <div>
              <label class="block text-xs font-medium text-[#8B7D6B] mb-1.5">Meta Description <span class="text-[#C9A96E]">({{ form.meta_description.length }}/160)</span></label>
              <input v-model="form.meta_description" type="text" maxlength="160" class="w-full px-3 py-2.5 rounded-lg border border-[#e8e4de] text-sm focus:outline-none focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E]/30" />
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl border border-[#e8e4de] p-6">
        <h3 class="text-sm font-semibold text-[#2D2D2D] mb-4">Tags & Flags</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-xs font-medium text-[#8B7D6B] mb-1.5">Tags</label>
            <div class="flex flex-wrap gap-2 mb-2">
              <span v-for="(tag, i) in form.tags" :key="i" class="flex items-center gap-1 px-2.5 py-1 bg-[#f0ece6] rounded-full text-xs text-[#2D2D2D]">
                {{ tag }}
                <button @click="form.tags.splice(i, 1)" class="text-[#8B7D6B] hover:text-red-500">&times;</button>
              </span>
            </div>
            <div class="flex gap-2">
              <input v-model="tagInput" @keydown.enter.prevent="addTag" type="text" class="flex-1 px-3 py-2 rounded-lg border border-[#e8e4de] text-sm focus:outline-none focus:border-[#C9A96E]" placeholder="Type and press Enter" />
              <button @click="addTag" type="button" class="px-3 py-2 text-sm bg-[#f0ece6] rounded-lg hover:bg-[#e8e4de] transition-colors">Add</button>
            </div>
          </div>
          <div class="flex flex-wrap gap-6">
            <label class="flex items-center gap-2 text-sm cursor-pointer">
              <input v-model="form.is_featured" type="checkbox" class="accent-[#C9A96E]" /> Featured
            </label>
            <label class="flex items-center gap-2 text-sm cursor-pointer">
              <input v-model="form.is_new_arrival" type="checkbox" class="accent-[#C9A96E]" /> New Arrival
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 2: Image Management -->
    <div v-show="currentStep === 2" class="space-y-6">
      <div class="bg-white rounded-xl border border-[#e8e4de] p-6">
        <h3 class="text-sm font-semibold text-[#2D2D2D] mb-4">Product Images</h3>
        <p class="text-xs text-[#8B7D6B] mb-4">Upload up to 10 images. One must be set as primary.</p>
        <p v-if="errors.images" class="text-xs text-red-500 mb-4">{{ errors.images }}</p>

        <!-- Drop zone -->
        <div
          @dragover.prevent="dragActive = true"
          @dragleave.prevent="dragActive = false"
          @drop.prevent="handleDrop"
          :class="[
            'border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer',
            dragActive ? 'border-[#C9A96E] bg-[#C9A96E]/5' : 'border-[#e8e4de] hover:border-[#C9A96E]/50'
          ]"
          @click="fileInput?.click()"
        >
          <svg class="w-10 h-10 text-[#C9A96E]/50 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5a2.25 2.25 0 0 0 2.25-2.25V5.25a2.25 2.25 0 0 0-2.25-2.25H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"/></svg>
          <p class="text-sm text-[#8B7D6B]">Drag & drop images here, or <span class="text-[#C9A96E] font-medium">browse</span></p>
          <p class="text-xs text-[#8B7D6B]/60 mt-1">JPEG, PNG, WebP • Max 5MB each • Up to 10 images</p>
        </div>
        <input ref="fileInput" type="file" multiple accept="image/jpeg,image/png,image/webp" class="hidden" @change="handleFileSelect" />

        <!-- Upload progress -->
        <div v-if="uploading" class="mt-4 bg-[#faf7f2] rounded-lg p-4">
          <div class="flex items-center gap-3">
            <div class="w-5 h-5 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
            <span class="text-sm text-[#8B7D6B]">Uploading {{ uploadProgress }}...</span>
          </div>
        </div>

        <!-- Image grid -->
        <div v-if="form.images.length > 0" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
          <div
            v-for="(img, i) in form.images"
            :key="i"
            :class="[
              'relative group rounded-xl border-2 overflow-hidden aspect-square',
              img.is_primary ? 'border-[#C9A96E]' : 'border-[#e8e4de]'
            ]"
          >
            <img :src="img.url" :alt="img.alt_text" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
              <button
                @click="setPrimaryImage(i)"
                :class="[
                  'px-2.5 py-1 rounded-full text-[10px] font-medium transition-all',
                  img.is_primary ? 'bg-[#C9A96E] text-white' : 'bg-white/20 text-white hover:bg-white/30'
                ]"
              >
                {{ img.is_primary ? '★ Primary' : 'Set Primary' }}
              </button>
              <button
                @click="removeImage(i)"
                class="px-2.5 py-1 rounded-full text-[10px] font-medium bg-red-500/80 text-white hover:bg-red-600"
              >
                Remove
              </button>
            </div>
            <div v-if="img.is_primary" class="absolute top-2 left-2 px-2 py-0.5 bg-[#C9A96E] rounded-full text-[9px] font-bold text-white tracking-wider">
              PRIMARY
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 3: Product Attributes -->
    <div v-show="currentStep === 3" class="space-y-6">
      <div class="bg-white rounded-xl border border-[#e8e4de] p-6">
        <h3 class="text-sm font-semibold text-[#2D2D2D] mb-1">Product Attributes</h3>
        <p class="text-xs text-[#8B7D6B] mb-5">Set product-level attributes like Fabric, Fit, Wash Care, etc.</p>

        <div v-if="productLevelAttrs.length === 0" class="text-center py-8 text-sm text-[#8B7D6B]">
          No product-level attributes defined. Create them in the database first.
        </div>

        <div v-else class="space-y-4">
          <div v-for="attr in productLevelAttrs" :key="attr.id" class="grid grid-cols-1 sm:grid-cols-3 gap-3 items-start">
            <label class="text-sm font-medium text-[#2D2D2D] pt-2.5">
              {{ attr.name }}
              <span v-if="attr.is_required" class="text-red-500">*</span>
            </label>
            <div class="sm:col-span-2">
              <select
                v-if="attr.type === 'select'"
                v-model="form.attributes[attr.id]"
                class="w-full px-3 py-2.5 rounded-lg border border-[#e8e4de] text-sm focus:outline-none focus:border-[#C9A96E]"
              >
                <option value="">Select {{ attr.name }}</option>
                <option v-for="opt in attr.options" :key="opt.id" :value="opt.value">
                  {{ opt.label || opt.value }}
                </option>
              </select>
              <input
                v-else
                v-model="form.attributes[attr.id]"
                type="text"
                class="w-full px-3 py-2.5 rounded-lg border border-[#e8e4de] text-sm focus:outline-none focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E]/30"
                :placeholder="`Enter ${attr.name}`"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 4: Variant Matrix Builder -->
    <div v-show="currentStep === 4" class="space-y-6">
      <!-- Variant attribute selection -->
      <div class="bg-white rounded-xl border border-[#e8e4de] p-6">
        <h3 class="text-sm font-semibold text-[#2D2D2D] mb-1">Variant Attributes</h3>
        <p class="text-xs text-[#8B7D6B] mb-5">Select which attributes define your variants (e.g. Size, Color).</p>

        <div v-if="variantAttrs.length === 0" class="text-center py-8 text-sm text-[#8B7D6B]">
          No variant attributes defined. Create attribute definitions with <code>is_variant = true</code>.
        </div>

        <div v-for="attr in variantAttrs" :key="attr.id" class="mb-4 last:mb-0">
          <label class="flex items-center gap-2 text-sm font-medium text-[#2D2D2D] mb-2 cursor-pointer">
            <input
              type="checkbox"
              :checked="selectedVariantAttrs.has(attr.id)"
              @change="toggleVariantAttr(attr.id)"
              class="accent-[#C9A96E]"
            />
            {{ attr.name }}
          </label>

          <div v-if="selectedVariantAttrs.has(attr.id)" class="pl-6 flex flex-wrap gap-2">
            <label
              v-for="opt in attr.options"
              :key="opt.id"
              :class="[
                'flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm cursor-pointer transition-all',
                selectedVariantOptions[attr.id]?.has(opt.id)
                  ? 'border-[#C9A96E] bg-[#C9A96E]/10 text-[#2D2D2D]'
                  : 'border-[#e8e4de] text-[#8B7D6B] hover:border-[#C9A96E]/50'
              ]"
            >
              <input
                type="checkbox"
                :checked="selectedVariantOptions[attr.id]?.has(opt.id)"
                @change="toggleVariantOption(attr.id, opt.id)"
                class="accent-[#C9A96E]"
              />
              <span
                v-if="opt.color_hex"
                class="w-4 h-4 rounded-full border border-gray-200"
                :style="{ backgroundColor: opt.color_hex }"
              />
              {{ opt.label || opt.value }}
            </label>
          </div>
        </div>

        <button
          v-if="variantAttrs.length > 0"
          @click="generateMatrix"
          :disabled="!canGenerateMatrix"
          class="mt-4 px-4 py-2.5 bg-[#2D2D2D] text-white text-sm font-medium rounded-lg hover:bg-[#1a1a1a] disabled:opacity-30 transition-all flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"/></svg>
          Generate Variant Matrix
        </button>
      </div>

      <!-- Matrix table -->
      <div v-if="form.variants.length > 0" class="bg-white rounded-xl border border-[#e8e4de] p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-semibold text-[#2D2D2D]">Variant Matrix ({{ form.variants.length }} variants)</h3>
          <div class="flex gap-2">
            <button @click="autoGenerateSkus" class="px-3 py-1.5 text-xs font-medium bg-[#f0ece6] rounded-lg hover:bg-[#e8e4de] transition-colors">
              Auto-Generate SKUs
            </button>
            <button @click="showBulkModal = true" class="px-3 py-1.5 text-xs font-medium bg-[#f0ece6] rounded-lg hover:bg-[#e8e4de] transition-colors">
              Bulk Apply
            </button>
          </div>
        </div>

        <div class="overflow-x-auto -mx-6 px-6">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-[#e8e4de]">
                <th class="text-left py-2 pr-3 text-xs font-semibold uppercase text-[#8B7D6B] whitespace-nowrap">Variant</th>
                <th class="text-left py-2 px-2 text-xs font-semibold uppercase text-[#8B7D6B] whitespace-nowrap">SKU *</th>
                <th class="text-left py-2 px-2 text-xs font-semibold uppercase text-[#8B7D6B] whitespace-nowrap">Price Override</th>
                <th class="text-left py-2 px-2 text-xs font-semibold uppercase text-[#8B7D6B] whitespace-nowrap">Stock *</th>
                <th class="text-left py-2 px-2 text-xs font-semibold uppercase text-[#8B7D6B] whitespace-nowrap">Weight (g)</th>
                <th class="text-left py-2 px-2 text-xs font-semibold uppercase text-[#8B7D6B] whitespace-nowrap">Active</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(variant, i) in form.variants" :key="i" class="border-b border-[#f0ece6] last:border-0">
                <td class="py-2.5 pr-3 whitespace-nowrap">
                  <div class="flex items-center gap-1.5">
                    <span
                      v-for="(av, j) in variant.attribute_values"
                      :key="j"
                      class="px-2 py-0.5 bg-[#f0ece6] rounded text-xs font-medium text-[#2D2D2D]"
                    >
                      {{ av.label }}
                    </span>
                  </div>
                </td>
                <td class="py-2.5 px-2">
                  <input v-model="variant.sku" type="text" class="w-36 px-2 py-1.5 rounded border border-[#e8e4de] text-xs font-mono focus:outline-none focus:border-[#C9A96E]" placeholder="SKU" />
                </td>
                <td class="py-2.5 px-2">
                  <input v-model.number="variant.price_override" type="number" min="0" step="0.01" class="w-28 px-2 py-1.5 rounded border border-[#e8e4de] text-xs focus:outline-none focus:border-[#C9A96E]" :placeholder="String(form.base_price || 0)" />
                </td>
                <td class="py-2.5 px-2">
                  <input v-model.number="variant.stock_quantity" type="number" min="0" class="w-20 px-2 py-1.5 rounded border border-[#e8e4de] text-xs focus:outline-none focus:border-[#C9A96E]" placeholder="0" />
                </td>
                <td class="py-2.5 px-2">
                  <input v-model.number="variant.weight_grams" type="number" min="0" class="w-20 px-2 py-1.5 rounded border border-[#e8e4de] text-xs focus:outline-none focus:border-[#C9A96E]" placeholder="0" />
                </td>
                <td class="py-2.5 px-2">
                  <input v-model="variant.is_active" type="checkbox" class="accent-[#C9A96E]" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Bulk Apply Modal -->
      <Teleport to="body">
        <div v-if="showBulkModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div class="fixed inset-0 bg-black/50 backdrop-blur-sm" @click="showBulkModal = false" />
          <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 z-10">
            <h3 class="text-lg font-semibold text-[#2D2D2D] mb-4">Bulk Apply to All Variants</h3>
            <div class="space-y-3">
              <div>
                <label class="block text-xs font-medium text-[#8B7D6B] mb-1">Stock Quantity</label>
                <input v-model.number="bulkValues.stock_quantity" type="number" min="0" class="w-full px-3 py-2 rounded-lg border border-[#e8e4de] text-sm focus:outline-none focus:border-[#C9A96E]" />
              </div>
              <div>
                <label class="block text-xs font-medium text-[#8B7D6B] mb-1">Price Override</label>
                <input v-model.number="bulkValues.price_override" type="number" min="0" step="0.01" class="w-full px-3 py-2 rounded-lg border border-[#e8e4de] text-sm focus:outline-none focus:border-[#C9A96E]" />
              </div>
              <div>
                <label class="block text-xs font-medium text-[#8B7D6B] mb-1">Weight (g)</label>
                <input v-model.number="bulkValues.weight_grams" type="number" min="0" class="w-full px-3 py-2 rounded-lg border border-[#e8e4de] text-sm focus:outline-none focus:border-[#C9A96E]" />
              </div>
            </div>
            <div class="flex justify-end gap-3 mt-5">
              <button @click="showBulkModal = false" class="px-4 py-2 text-sm text-[#8B7D6B] hover:text-[#2D2D2D]">Cancel</button>
              <button @click="applyBulk" class="px-5 py-2 bg-[#2D2D2D] text-white text-sm rounded-lg hover:bg-[#1a1a1a]">Apply</button>
            </div>
          </div>
        </div>
      </Teleport>
    </div>

    <!-- Step 5: Review & Save -->
    <div v-show="currentStep === 5" class="space-y-6">
      <div class="bg-white rounded-xl border border-[#e8e4de] p-6">
        <h3 class="text-sm font-semibold text-[#2D2D2D] mb-4">Review Your Product</h3>

        <!-- Validation summary -->
        <div v-if="validationErrors.length > 0" class="mb-5 p-4 bg-red-50 rounded-lg border border-red-200">
          <p class="text-sm font-medium text-red-700 mb-2">Please fix the following before saving:</p>
          <ul class="list-disc list-inside space-y-1">
            <li v-for="(err, i) in validationErrors" :key="i" class="text-xs text-red-600">{{ err }}</li>
          </ul>
        </div>

        <!-- Summary -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="space-y-4">
            <div>
              <p class="text-xs font-medium uppercase text-[#8B7D6B] tracking-wider mb-1">Product</p>
              <p class="text-lg font-['Cormorant_Garamond'] font-semibold text-[#2D2D2D]">{{ form.name || '—' }}</p>
              <p class="text-xs text-[#8B7D6B] font-mono mt-0.5">{{ form.slug || '—' }}</p>
            </div>
            <div>
              <p class="text-xs font-medium uppercase text-[#8B7D6B] tracking-wider mb-1">Price</p>
              <p class="text-sm text-[#2D2D2D]">
                ₹{{ (form.base_price || 0).toLocaleString() }}
                <span v-if="form.compare_at_price" class="text-[#8B7D6B] line-through ml-2">₹{{ form.compare_at_price.toLocaleString() }}</span>
              </p>
            </div>
            <div>
              <p class="text-xs font-medium uppercase text-[#8B7D6B] tracking-wider mb-1">Status</p>
              <span :class="form.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'" class="text-[11px] font-medium px-2.5 py-1 rounded-full">
                {{ form.status === 'active' ? 'Published' : 'Draft' }}
              </span>
            </div>
            <div>
              <p class="text-xs font-medium uppercase text-[#8B7D6B] tracking-wider mb-1">Tags</p>
              <div class="flex flex-wrap gap-1">
                <span v-for="tag in form.tags" :key="tag" class="px-2 py-0.5 bg-[#f0ece6] rounded text-xs text-[#2D2D2D]">{{ tag }}</span>
                <span v-if="form.tags.length === 0" class="text-xs text-[#8B7D6B]">None</span>
              </div>
            </div>
          </div>
          <div class="space-y-4">
            <div>
              <p class="text-xs font-medium uppercase text-[#8B7D6B] tracking-wider mb-1">Images</p>
              <p class="text-sm text-[#2D2D2D]">{{ form.images.length }} image{{ form.images.length !== 1 ? 's' : '' }}</p>
            </div>
            <div>
              <p class="text-xs font-medium uppercase text-[#8B7D6B] tracking-wider mb-1">Categories</p>
              <p class="text-sm text-[#2D2D2D]">{{ form.category_ids.length }} selected</p>
            </div>
            <div>
              <p class="text-xs font-medium uppercase text-[#8B7D6B] tracking-wider mb-1">Variants</p>
              <p class="text-sm text-[#2D2D2D]">{{ form.variants.length }} variant{{ form.variants.length !== 1 ? 's' : '' }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <div class="flex items-center justify-between mt-8 pt-6 border-t border-[#e8e4de]">
      <button
        v-if="currentStep > 1"
        @click="currentStep--"
        class="px-5 py-2.5 text-sm font-medium text-[#8B7D6B] hover:text-[#2D2D2D] border border-[#e8e4de] rounded-lg hover:bg-[#f0ece6] transition-all"
      >
        ← Previous
      </button>
      <div v-else />

      <div class="flex gap-3">
        <button
          v-if="currentStep === totalSteps"
          @click="saveProduct('draft')"
          :disabled="saving"
          class="px-5 py-2.5 text-sm font-medium text-[#2D2D2D] border border-[#e8e4de] rounded-lg hover:bg-[#f0ece6] disabled:opacity-50 transition-all"
        >
          {{ saving ? 'Saving...' : 'Save as Draft' }}
        </button>
        <button
          v-if="currentStep < totalSteps"
          @click="nextStep"
          class="px-5 py-2.5 bg-[#2D2D2D] text-white text-sm font-medium rounded-lg hover:bg-[#1a1a1a] transition-colors"
        >
          Next →
        </button>
        <button
          v-if="currentStep === totalSteps"
          @click="saveProduct('active')"
          :disabled="saving || validationErrors.length > 0"
          class="px-5 py-2.5 bg-[#C9A96E] text-white text-sm font-medium rounded-lg hover:bg-[#b89758] disabled:opacity-50 transition-colors"
        >
          {{ saving ? 'Publishing...' : 'Publish Product' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const client = useSupabaseClient()
const router = useRouter()

// ─── Step management ─────────────────────────────────────────
const totalSteps = 5
const stepLabels = ['Basic Info', 'Images', 'Attributes', 'Variants', 'Review']
const currentStep = ref(1)

function goToStep(step: number) {
  if (step <= currentStep.value + 1) currentStep.value = step
}

function nextStep() {
  if (validateCurrentStep()) {
    currentStep.value = Math.min(currentStep.value + 1, totalSteps)
  }
}

// ─── Form state ──────────────────────────────────────────────
const form = reactive({
  name: '',
  slug: '',
  brand_id: null as string | null,
  base_price: 0,
  compare_at_price: null as number | null,
  status: 'draft',
  short_description: '',
  description: '',
  care_instructions: '',
  meta_title: '',
  meta_description: '',
  is_featured: false,
  is_new_arrival: false,
  tags: [] as string[],
  category_ids: [] as string[],
  collection_ids: [] as string[],
  images: [] as Array<{ url: string; alt_text: string; sort_order: number; is_primary: boolean }>,
  attributes: {} as Record<string, string>,
  variants: [] as Array<{
    sku: string
    barcode: string
    price_override: number | null
    compare_at_price: number | null
    cost_price: number | null
    weight_grams: number | null
    is_active: boolean
    sort_order: number
    stock_quantity: number
    attribute_values: Array<{ attribute_id: string; option_id: string; label: string }>
  }>,
})

const tagInput = ref('')
const errors = reactive<Record<string, string>>({})
const saving = ref(false)

function addTag() {
  const tag = tagInput.value.trim().toLowerCase()
  if (tag && !form.tags.includes(tag)) {
    form.tags.push(tag)
  }
  tagInput.value = ''
}

function autoSlug() {
  form.slug = form.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// ─── Reference data ──────────────────────────────────────────
interface AttrDef {
  id: string
  name: string
  slug: string
  type: string
  is_variant: boolean
  is_required: boolean
  options: Array<{ id: string; value: string; label: string | null; color_hex: string | null }>
}

const brands = ref<Array<{ id: string; name: string }>>([])
const categories = ref<Array<{ id: string; name: string; depth: number }>>([])
const allAttrs = ref<AttrDef[]>([])

const productLevelAttrs = computed(() => allAttrs.value.filter(a => !a.is_variant))
const variantAttrs = computed(() => allAttrs.value.filter(a => a.is_variant))

async function fetchReferenceData() {
  const [brandsRes, catsRes, attrsRes] = await Promise.all([
    client.from('brands').select('id, name').eq('is_active', true).order('name'),
    client.from('categories').select('id, name, depth').eq('is_active', true).order('sort_order'),
    client.from('attribute_definitions').select('id, name, slug, type, is_variant, is_required, attribute_options(id, value, label, color_hex, sort_order)').order('sort_order'),
  ])

  brands.value = (brandsRes.data as any[]) || []
  categories.value = (catsRes.data as any[]) || []
  allAttrs.value = ((attrsRes.data as any[]) || []).map(a => ({
    ...a,
    options: (a.attribute_options || []).sort((x: any, y: any) => x.sort_order - y.sort_order),
  }))
}

// ─── Image management ────────────────────────────────────────
const fileInput = ref<HTMLInputElement | null>(null)
const dragActive = ref(false)
const uploading = ref(false)
const uploadProgress = ref('')

async function handleDrop(e: DragEvent) {
  dragActive.value = false
  const files = Array.from(e.dataTransfer?.files || [])
  await uploadFiles(files)
}

function handleFileSelect(e: Event) {
  const files = Array.from((e.target as HTMLInputElement).files || [])
  uploadFiles(files)
}

async function uploadFiles(files: File[]) {
  const remaining = 10 - form.images.length
  const toUpload = files.slice(0, remaining)
  if (toUpload.length === 0) return

  uploading.value = true
  const tempId = form.slug || Date.now().toString()

  for (let i = 0; i < toUpload.length; i++) {
    const file = toUpload[i]
    uploadProgress.value = `${i + 1}/${toUpload.length}`
    const fileName = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`
    const path = `products/${tempId}/${fileName}`

    const { error } = await client.storage.from('product-images').upload(path, file)

    if (!error) {
      const { data: urlData } = client.storage.from('product-images').getPublicUrl(path)
      form.images.push({
        url: urlData.publicUrl,
        alt_text: file.name.replace(/\.[^.]+$/, ''),
        sort_order: form.images.length,
        is_primary: form.images.length === 0,
      })
    } else {
      console.error('Upload error:', error)
    }
  }
  uploading.value = false
}

function setPrimaryImage(index: number) {
  form.images.forEach((img, i) => { img.is_primary = i === index })
}

function removeImage(index: number) {
  const wasPrimary = form.images[index].is_primary
  form.images.splice(index, 1)
  if (wasPrimary && form.images.length > 0) {
    form.images[0].is_primary = true
  }
}

// ─── Variant matrix builder ──────────────────────────────────
const selectedVariantAttrs = ref<Set<string>>(new Set())
const selectedVariantOptions = ref<Record<string, Set<string>>>({})
const showBulkModal = ref(false)
const bulkValues = reactive({ stock_quantity: 0, price_override: null as number | null, weight_grams: null as number | null })

function toggleVariantAttr(attrId: string) {
  if (selectedVariantAttrs.value.has(attrId)) {
    selectedVariantAttrs.value.delete(attrId)
    delete selectedVariantOptions.value[attrId]
  } else {
    selectedVariantAttrs.value.add(attrId)
    selectedVariantOptions.value[attrId] = new Set()
  }
}

function toggleVariantOption(attrId: string, optId: string) {
  const set = selectedVariantOptions.value[attrId]
  if (!set) return
  if (set.has(optId)) {
    set.delete(optId)
  } else {
    set.add(optId)
  }
}

const canGenerateMatrix = computed(() => {
  return Array.from(selectedVariantAttrs.value).every(
    attrId => (selectedVariantOptions.value[attrId]?.size || 0) > 0
  ) && selectedVariantAttrs.value.size > 0
})

function generateMatrix() {
  // Build arrays of selected options per attribute
  const axes: Array<{ attrId: string; attrName: string; options: Array<{ id: string; value: string }> }> = []

  for (const attrId of selectedVariantAttrs.value) {
    const attr = variantAttrs.value.find(a => a.id === attrId)
    if (!attr) continue
    const optIds = selectedVariantOptions.value[attrId]
    const opts = attr.options.filter(o => optIds.has(o.id))
    axes.push({
      attrId,
      attrName: attr.name,
      options: opts.map(o => ({ id: o.id, value: o.label || o.value })),
    })
  }

  // Cartesian product
  const combinations = cartesian(axes.map(a => a.options.map((o, i) => ({ ...o, axisIndex: axes.indexOf(a) }))))

  form.variants = combinations.map((combo, i) => ({
    sku: '',
    barcode: '',
    price_override: null,
    compare_at_price: null,
    cost_price: null,
    weight_grams: null,
    is_active: true,
    sort_order: i,
    stock_quantity: 0,
    attribute_values: combo.map((opt: any, j: number) => ({
      attribute_id: axes[j].attrId,
      option_id: opt.id,
      label: `${axes[j].attrName}: ${opt.value}`,
    })),
  }))
}

function cartesian(arrays: any[][]): any[][] {
  if (arrays.length === 0) return [[]]
  const [first, ...rest] = arrays
  const restProduct = cartesian(rest)
  return first.flatMap(item => restProduct.map(combo => [item, ...combo]))
}

function autoGenerateSkus() {
  const slug = form.slug || 'product'
  form.variants.forEach(v => {
    const parts = v.attribute_values.map(av => av.label.split(': ')[1]?.toLowerCase().replace(/\s+/g, '-') || '').filter(Boolean)
    v.sku = `${slug}-${parts.join('-')}`
  })
}

function applyBulk() {
  form.variants.forEach(v => {
    if (bulkValues.stock_quantity != null) v.stock_quantity = bulkValues.stock_quantity
    if (bulkValues.price_override != null) v.price_override = bulkValues.price_override
    if (bulkValues.weight_grams != null) v.weight_grams = bulkValues.weight_grams
  })
  showBulkModal.value = false
}

// ─── Validation ──────────────────────────────────────────────
function validateCurrentStep(): boolean {
  Object.keys(errors).forEach(k => delete errors[k])

  if (currentStep.value === 1) {
    if (!form.name.trim()) errors.name = 'Product name is required'
    if (!form.slug.trim()) errors.slug = 'Slug is required'
    if (!form.brand_id) errors.brand_id = 'Brand is required'
    if (!form.base_price || form.base_price <= 0) errors.base_price = 'Base price must be greater than 0'
    if (form.category_ids.length === 0) errors.category_ids = 'Select at least one category'
    return Object.keys(errors).length === 0
  }

  if (currentStep.value === 2) {
    if (form.images.length === 0) errors.images = 'At least one image is required'
    else if (!form.images.some(img => img.is_primary)) errors.images = 'One image must be set as primary'
    return Object.keys(errors).length === 0
  }

  return true
}

const validationErrors = computed(() => {
  const errs: string[] = []
  if (!form.name.trim()) errs.push('Product name is required')
  if (!form.slug.trim()) errs.push('Slug is required')
  if (!form.brand_id) errs.push('Brand is required')
  if (!form.base_price || form.base_price <= 0) errs.push('Base price must be greater than 0')
  if (form.category_ids.length === 0) errs.push('Select at least one category')
  if (form.images.length === 0) errs.push('At least one image is required')
  if (form.images.length > 0 && !form.images.some(i => i.is_primary)) errs.push('One image must be primary')
  if (form.variants.length === 0) errs.push('At least one variant is required')
  if (form.variants.some(v => !v.sku.trim())) errs.push('All variants must have a SKU')
  return errs
})

// ─── Save via RPC ────────────────────────────────────────────
async function saveProduct(status: 'draft' | 'active') {
  saving.value = true
  try {
    const payload = {
      product: {
        name: form.name,
        slug: form.slug,
        brand_id: form.brand_id,
        description: form.description || null,
        short_description: form.short_description || null,
        base_price: form.base_price,
        compare_at_price: form.compare_at_price || null,
        status,
        care_instructions: form.care_instructions || null,
        meta_title: form.meta_title || null,
        meta_description: form.meta_description || null,
        is_featured: form.is_featured,
        is_new_arrival: form.is_new_arrival,
        tags: form.tags,
      },
      category_ids: form.category_ids,
      collection_ids: form.collection_ids,
      attributes: Object.entries(form.attributes)
        .filter(([_, value]) => value)
        .map(([attribute_id, value]) => ({ attribute_id, value })),
      images: form.images,
      variants: form.variants.map(v => ({
        sku: v.sku,
        barcode: v.barcode || null,
        price_override: v.price_override || null,
        compare_at_price: v.compare_at_price || null,
        cost_price: v.cost_price || null,
        weight_grams: v.weight_grams || null,
        is_active: v.is_active,
        sort_order: v.sort_order,
        stock_quantity: v.stock_quantity,
        attribute_values: v.attribute_values.map(av => ({
          attribute_id: av.attribute_id,
          option_id: av.option_id,
        })),
      })),
    }

    const { data, error } = await client.rpc('create_complete_product', { payload })

    if (error) {
      console.error('RPC error:', error)
      alert(`Error creating product: ${error.message}`)
      return
    }

    router.push('/admin/products')
  } catch (e: any) {
    console.error('Save error:', e)
    alert(`Error: ${e.message}`)
  } finally {
    saving.value = false
  }
}

// ─── Init ────────────────────────────────────────────────────
onMounted(fetchReferenceData)
</script>

<template>
  <header
    ref="headerEl"
    class="fixed top-0 left-0 right-0 z-50"
    :class="headerClasses"
    :style="headerStyle"
  >
    <!-- Announcement Bar -->
    <div
      class="transition-all duration-500 ease-luxury overflow-hidden"
      :style="announcementBarStyle"
    >
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-medium text-charcoal/70"
        :style="{
          opacity: isAtTop ? '1' : '0',
          transition: 'opacity 300ms ease',
        }"
      >
        Complimentary Shipping on Orders Above ₹10,000
      </div>
    </div>

    <!-- Main Navigation -->
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        class="relative flex items-center justify-between h-14 sm:h-16 lg:h-20"
      >
        <!-- Mobile Menu Button - Left -->
        <button
          class="lg:hidden p-2 -ml-2 text-charcoal hover:text-champagne transition-colors duration-300 z-10"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          aria-label="Toggle menu"
        >
          <svg
            class="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              v-if="!isMobileMenuOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <!-- Left Navigation - Desktop Only -->
        <div class="hidden lg:flex items-center gap-8 flex-1">
          <NuxtLink
            v-for="item in leftNav"
            :key="item.path"
            :to="item.path"
            class="nav-link text-[11px] tracking-[0.15em] uppercase font-medium text-charcoal/80 hover:text-champagne transition-colors duration-300 relative group"
          >
            {{ item.label }}
            <span
              class="absolute -bottom-1 left-0 w-0 h-[1px] bg-champagne transition-all duration-300 group-hover:w-full"
            />
          </NuxtLink>
        </div>

        <!-- Logo - Centered -->
        <div
          class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:static lg:transform-none"
        >
          <NuxtLink to="/" class="block">
            <h1
              class="font-heading text-xl sm:text-2xl lg:text-3xl tracking-[0.15em] uppercase text-charcoal whitespace-nowrap"
            >
              MAISON
            </h1>
          </NuxtLink>
        </div>

        <!-- Right Navigation - Icons -->
        <div class="flex items-center gap-1 sm:gap-2 flex-1 justify-end z-10">
          <!-- Search - Always Visible -->
          <button
            class="nav-icon"
            aria-label="Search"
            @click="$emit('open-search')"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          <!-- Account - Desktop Only (≥640px) -->
          <NuxtLink to="/account" class="nav-icon-desktop" aria-label="Account">
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </NuxtLink>

          <!-- Wishlist - Desktop Only (≥640px) -->
          <NuxtLink
            to="/wishlist"
            class="nav-icon-desktop"
            aria-label="Wishlist"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </NuxtLink>

          <!-- Cart - Always Visible -->
          <button
            class="nav-icon relative"
            aria-label="Shopping cart"
            @click="toggleCart"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <Transition name="scale">
              <span
                v-if="cartCount > 0"
                class="absolute -top-0.5 -right-0.5 min-w-[16px] h-[16px] px-0.5 flex items-center justify-center text-[9px] font-semibold bg-champagne text-white rounded-full"
              >
                {{ cartCount }}
              </span>
            </Transition>
          </button>
        </div>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <Transition name="slide-down">
      <div
        v-if="isMobileMenuOpen"
        class="lg:hidden border-t border-champagne/10 bg-ivory/95 backdrop-blur-xl"
      >
        <div class="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-1">
          <NuxtLink
            v-for="item in [...leftNav, ...mobileExtraNav]"
            :key="item.path"
            :to="item.path"
            class="block text-[11px] tracking-[0.12em] uppercase font-medium text-charcoal/80 hover:text-champagne transition-colors py-2.5 sm:py-3 border-b border-champagne/5 last:border-0"
            @click="isMobileMenuOpen = false"
          >
            {{ item.label }}
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </header>

  <!-- Spacer for fixed header -->
  <div class="h-14 sm:h-16 lg:h-20" :class="{ 'mt-9': isAtTop }" />
</template>

<script setup lang="ts">
const { cartCount, toggleCart } = useCart();
const { isVisible, isScrolled, isAtTop } = useSmartHeader();

const isMobileMenuOpen = ref(false);
const headerEl = ref<HTMLElement | null>(null);

const leftNav = [
  { label: "New Arrivals", path: "/shop/new-arrivals" },
  { label: "Women", path: "/shop/women" },
  { label: "Men", path: "/shop/men" },
  { label: "Collections", path: "/collections" },
];

const mobileExtraNav = [
  { label: "Account", path: "/account" },
  { label: "Wishlist", path: "/wishlist" },
];

const headerClasses = computed(() => ({
  "shadow-lg border-b border-champagne/10": isScrolled.value,
}));

const headerStyle = computed(() => ({
  transform: isVisible.value ? "translateY(0)" : "translateY(-100%)",
  transition:
    "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s ease, box-shadow 0.4s ease",
  backgroundColor: isScrolled.value
    ? "rgba(255, 255, 240, 0.95)"
    : "rgba(255, 255, 240, 0.7)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
}));

const announcementBarStyle = computed(() => ({
  maxHeight: isAtTop.value ? "36px" : "0px",
  backgroundColor: isAtTop.value ? "rgba(250, 240, 230, 0.3)" : "transparent",
  padding: isAtTop.value ? "0.5rem 0" : "0",
}));

// Close mobile menu on route change
const route = useRoute();
watch(
  () => route.path,
  () => {
    isMobileMenuOpen.value = false;
  },
);

// Prevent body scroll when mobile menu is open
watch(isMobileMenuOpen, (isOpen) => {
  if (process.client) {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }
});

onUnmounted(() => {
  if (process.client) {
    document.body.style.overflow = "";
  }
});
</script>

<style scoped>
/* Base icon button - always visible */
.nav-icon {
  @apply p-1.5 sm:p-2 text-charcoal/70 hover:text-champagne transition-colors duration-300 flex items-center justify-center;
}

/* Desktop-only icon button - hidden on mobile */
.nav-icon-desktop {
  @apply hidden sm:flex p-1.5 sm:p-2 text-charcoal/70 hover:text-champagne transition-colors duration-300 items-center justify-center;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.scale-enter-active,
.scale-leave-active {
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.5);
}

.nav-link,
.nav-icon,
.nav-icon-desktop {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

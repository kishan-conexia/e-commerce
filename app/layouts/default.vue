<template>
  <div class="min-h-screen flex flex-col bg-cream">
    <!-- Glassmorphism Header -->
    <AppHeader />

    <!-- Main Content -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <AppFooter />

    <!-- Cart Drawer -->
    <CartDrawer />
  </div>
</template>

<script setup lang="ts">
// Default layout with header, footer, and cart drawer
</script>

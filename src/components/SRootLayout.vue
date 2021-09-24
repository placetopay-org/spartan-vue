<template>
  <div class="h-screen flex bg-gray-100 overflow-hidden">
    <slot name="sidebar"></slot>
    <div class="flex flex-col w-0 flex-1 overflow-hidden">
      <slot name="top-bar"></slot>
      <main class="flex-1 relative overflow-y-auto focus:outline-none">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <slot></slot>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 rounded-2xl">
      <table class="min-w-full divide-y">
        <slot/>
      </table>
    </div>
  </div>
</template>

<script>
export default {
}
</script>
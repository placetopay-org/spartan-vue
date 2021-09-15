<template>
  <div class="relative border border-gray-300 rounded-xl px-4 py-2.5 shadow-sm focus-within:ring-1 focus-within:ring-gray-800 focus-within:border-gray-800">
    <label :for="id" class="absolute -top-2 left-3 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-500">
      {{ label }}
    </label>
    <input type="text" :name="name" :id="id" class="block w-full border-0 p-0 text-gray-900 placeholder-gray-400 focus:ring-0" :placeholder="placeholder"/>
  </div>
</template>

<script setup>
const props = defineProps({
  name: String,
  label: String,
  id: String,
  placeholder: String,
})

</script>

<template>
  <div class="inline-flex flex-col items-center justify-center text-center bg-white p-6 gap-6 rounded-2xl shadow m-auto">
    <div class="flex flex-col items-center">
      <h3 class="text-lg font-semibold text-gray-900">{{ title }}</h3>
      <p class="text-base font-normal text-gray-500">{{ description }}</p>
    </div>
    <div>
      <slot/>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    }
  }
}
</script>
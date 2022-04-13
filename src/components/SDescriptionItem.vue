<template>
  <div class="flex flex-col gap-1">
    <dt class="text-sm font-medium text-gray-500">{{ label }}</dt>
    <dd class="text-base font-normal text-gray-900">{{ value }}</dd>
  </div>
</template>

<script>

export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  }
}
</script>
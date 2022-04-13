<template>
  <div class="flex flex-col bg-white rounded-2xl shadow overflow-hidden">
    <div class="flex flex-row items-center justify-between p-5 gap-2.5">
      <div class="flex flex-col flex-1 gap-1">
        <h3 class="text-lg font-semibold text-gray-900">{{ title }}</h3>
        <p class="text-base font-medium text-gray-500">{{ description }}</p>
      </div>
      <div class="flex flex-col">
        <div class="flex flex-row gap-3 items-center">
          <slot name="actions"/>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-8 p-5">
      <dl class="grid grid-cols-2">
        <div class="flex flex-col gap-8">
          <slot name="col-1"/>
        </div>
        <div class="flex flex-col gap-8">
          <slot name="col-2"/>
        </div>
      </dl>

      <dl class="grid grid-cols-1">
        <div class="flex flex-col gap-8">
          <slot name="footer"/>
        </div>
      </dl>
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
      required: true,
    },
  }
}
</script>
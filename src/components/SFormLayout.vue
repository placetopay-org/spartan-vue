<template>
    <div :class="[max ? 'max-w-6xl' : 'max-w-xl', 'flex flex-col gap-6 p-6 rounded-2xl shadow bg-white']">
      <div>
        <h3 class="text-lg font-semibold leading-7 text-gray-900"> {{ title }} </h3>
        <p class="text-base font-normal text-gray-600"> {{ description }} </p>
      </div>
      <div :class="['grid gap-6', max ? 'grid-cols-2' : 'grid-cols-1']">
        <div class="flex flex-col gap-6">
          <slot name="col-1"/>
        </div>
        <div class="flex flex-col gap-6">
          <slot name="col-2"/>
        </div>
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
    },
    description: {
      type: String,
    },
    max: {
      type: Boolean,
      default: false,
    }
  }
}
</script>
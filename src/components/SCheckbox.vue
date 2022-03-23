<template>
  <div class="flex items-start">
    <div v-if="leading">
      <label v-if="label" :for="id" class="font-medium text-sm text-gray-900" v-text="label"></label>
      <p v-if="description" class="text-gray-500 text-sm" v-text="description"></p>
    </div>
    <div>
      <input :class="'items-center focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-500 text-gray-900 border-gray-300 rounded', [leading ? 'mx-3' : '']" :id="id" type="checkbox"/>
    </div>
    <div v-if="!leading">
      <label v-if="label" :for="id" class="font-medium text-sm text-gray-900 mx-2" v-text="label"></label>
      <p v-if="description" class="text-gray-500 text-sm mx-2" v-text="description"></p>
    </div>
  </div>

</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: false,
      default: undefined,
    },
    label: {
      type: String,
    },
    description: {
      type: String,
    },
    leading: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
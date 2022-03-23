<template>
    <div class="sm:hidden">
      <label for="tabs" class="sr-only">Select a tab</label>
      <select id="tabs" name="tabs">
        <option :href="href" :selected="active">{{ name }}</option>
      </select>
    </div>
    <div class="hidden sm:block">
      <nav class="flex space-x-4" aria-label="Tabs">
        <a :key="name" :href="href" :class="[active ? 'bg-white text-gray-900 rounded-xl' : 'text-gray-400 hover:text-gray-600', 'p-3 px-3 font-semibold text-sm']" :aria-current="active ? 'page' : undefined">
          {{ name }}
        </a>
      </nav>
    </div>

</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    href: {
      type: String,
      required: false,
      default: '#'
    },
    active: {
      type: Boolean,
      required: false,
      default: false,
    }
  }
}
</script>


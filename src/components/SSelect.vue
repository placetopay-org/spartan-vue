<template>
  <div
    class="rounded-xl border border-gray-300 placeholder:shadow focus-within:border-gray-900 focus-within:ring-1 focus-within:ring-gray-900"
  >
    <label
      :for="id"
      class="block px-3 pt-2 text-xs font-semibold text-gray-900"
    >
      {{ label }}
    </label>
    <select
      :name="name"
      :id="id"
      :disabled="disabled"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      :class="[
        '-mt-2 block w-full rounded-b-xl border-0 bg-[right_0.5rem_bottom_1rem] px-3 pb-2 pt-2 text-base text-gray-900 placeholder-gray-500 focus:ring-0',
      ]"
    >
      <option
        :value="option.value"
        :selected="modelValue === option.value"
        v-for="option in options"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    required: false,
    default: undefined,
  },
  type: {
    type: String,
    required: false,
    default: "text",
  },
  name: {
    type: String,
    required: false,
    default: undefined,
  },
  id: {
    type: String,
    required: false,
    default: undefined,
  },
  placeholder: {
    type: String,
    required: false,
    default: undefined,
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  rows: {
    type: Number,
    required: false,
    default: undefined,
  },
  modelValue: {
    type: [String, Number],
    default: null,
  },
  options: {
    type: Array,
    required: false,
    default: () => [],
  },
});
</script>

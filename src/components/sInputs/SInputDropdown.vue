<script setup>
import { defineProps } from "vue";

const props = defineProps({
  type: {
    type: String,
    required: false,
    default: "text",
  },
  rows: {
    type: Array,
    required: false,
    default: () => [],
    validator(values) {
      return values.some((item) => typeof item === "string");
    },
  },
  modelValue: [String, Number],
});
</script>

<template>
</template>

<style>
</style>
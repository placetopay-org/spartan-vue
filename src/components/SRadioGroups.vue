<template>
  <fieldset>
    <div class="space-y-6">
      <div
        v-for="option in options"
        :key="`${name}_${option.id}_option_radio`"
        class="flex items-start"
      >
        <input
          :id="`${name}_${option.id}_option_radio`"
          :name="name"
          type="radio"
          :value="option.id"
          :checked="modelValue === option.id"
          class="mt-1 h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-600"
          @change="$emit('update:modelValue', option.id)"
        />

        <div>
          <label
            :for="`${name}_${option.id}_option_radio`"
            class="ml-3 block text-sm font-semibold leading-6 text-gray-900"
          >
            {{ option.title }}
          </label>
          <p
            v-if="option.description"
            class="font-regular ml-3 block text-sm leading-6 text-gray-400"
          >
            {{ option.description }}
          </p>
        </div>
      </div>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
defineEmits(['update:modelValue']);
defineProps<{
  options: Array<{
    id: string;
    title: string;
    description?: string;
  }>;
  name: string;
  modelValue: any;
}>();
</script>

<template>
  <fieldset>
    <div class="space-y-6">
      <div
        v-for="option in options"
        :key="option.id"
        class="flex items-start"
      >
        <input
          :id="option.id"
          name="notification-method"
          type="radio"
          :checked="option.id === option.title"
          class="mt-1 h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-600"
        />

        <div>
          <label
            :for="option.id"
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
defineProps<{
  options: Array<{
    id: string;
    title: string;
    description?: string;
  }>;
}>();
</script>

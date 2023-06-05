<template>
  <fieldset>
    <div class="space-y-6">
      <div
        v-for="radioGroup in radioGroups"
        :key="radioGroup.id"
        class="flex items-start"
      >
        <input
          :id="radioGroup.id"
          name="notification-method"
          type="radio"
          :checked="radioGroup.id === radioGroup.title"
          class="mt-1 h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-600"
        />

        <div>
          <label
            :for="radioGroup.id"
            class="ml-3 block text-sm font-semibold leading-6 text-gray-900"
          >
            {{ radioGroup.title }}
          </label>
          <p
            v-if="radioGroup.description"
            class="font-regular ml-3 block text-sm leading-6 text-gray-400"
          >
            {{ radioGroup.description }}
          </p>
        </div>
      </div>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
defineProps<{
  radioGroups: Array<{
    id: string;
    title: string;
    description?: string;
  }>;
}>();
</script>

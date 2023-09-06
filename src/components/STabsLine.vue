<template>
  <div>
    <div class="border-b border-gray-200">
      <nav class="-mb-px flex" aria-label="Tabs">
        <a
          v-for="tab in tabs"
          :key="tab.name"
          :href="tab.href"
          :class="[
            tab.current
              ? 'border-orange-500 text-gray-900'
              : 'border-transparent text-gray-400 hover:border-gray-600 hover:text-gray-600',
            'group inline-flex items-center border-b-2 py-2 px-4 text-sm font-medium',
          ]"
          :aria-current="tab.current ? 'page' : undefined"
        >
          <component
            v-if="tab.icon"
            :is="tab.icon"
            :class="[
              tab.current
                ? 'text-gray-900'
                : 'text-gray-400 group-hover:text-gray-600','w-5',
            ]"
            aria-hidden="true"
          />
          <span class="px-2">{{ tab.name }}</span>
          <SBadge color="primary" v-if="tab.number !== undefined">
            {{ tab.number }}
          </SBadge>
        </a>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SBadge } from "./SBadge";

defineProps<{
  tabs: Array<{
    name: string;
    href: string;
    icon?: Object | string;
    number?: number;
    current: boolean;
  }>;
}>();
</script>

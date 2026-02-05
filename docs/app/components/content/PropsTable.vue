<script setup lang="ts">
/**
 * Tabla de props para documentación de componentes Spartan.
 * Muestra nombre, tipo, default y descripción de cada prop.
 */
interface Prop {
  name: string
  type: string
  default?: string
  description: string
}

defineProps<{
  /** Lista de props a mostrar */
  props: Prop[]
}>()
</script>

<template>
  <div class="my-6 overflow-x-auto">
    <table class="w-full text-sm">
      <thead>
        <tr class="border-b border-gray-200 dark:border-gray-700">
          <th class="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Prop</th>
          <th class="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Tipo</th>
          <th class="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Default</th>
          <th class="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Descripción</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="prop in props"
          :key="prop.name"
          class="border-b border-gray-100 dark:border-gray-800"
        >
          <td class="py-3 px-4">
            <code class="text-sm font-mono text-spartan-primary-600 dark:text-spartan-primary-400">
              {{ prop.name }}
            </code>
          </td>
          <td class="py-3 px-4">
            <code class="text-xs font-mono text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">
              {{ prop.type }}
            </code>
          </td>
          <td class="py-3 px-4 text-gray-500 dark:text-gray-400">
            <code v-if="prop.default" class="text-xs font-mono">{{ prop.default }}</code>
            <span v-else class="text-gray-400">-</span>
          </td>
          <td class="py-3 px-4 text-gray-600 dark:text-gray-300">
            {{ prop.description }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

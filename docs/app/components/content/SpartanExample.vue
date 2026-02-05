<script setup lang="ts">
/**
 * Componente para mostrar ejemplos de componentes Spartan en la documentación.
 * Muestra el componente renderizado y opcionalmente el código fuente.
 *
 * Uso en MDC:
 * ::spartan-example{title="Mi ejemplo"}
 * #default
 * <SButton>Click me</SButton>
 *
 * #code
 * ```vue
 * <SButton>Click me</SButton>
 * ```
 * ::
 */
defineProps<{
  /** Título del ejemplo */
  title?: string
  /** Descripción del ejemplo */
  description?: string
  /** Clases adicionales para el contenedor del preview */
  previewClass?: string
}>()

const slots = useSlots()
const hasCodeSlot = computed(() => !!slots.code)
</script>

<template>
  <div class="my-6">
    <!-- Header del ejemplo -->
    <div v-if="title || description" class="mb-3">
      <h4 v-if="title" class="text-base font-medium text-gray-900 dark:text-white">
        {{ title }}
      </h4>
      <p v-if="description" class="mt-1 text-sm text-gray-600 dark:text-gray-400">
        {{ description }}
      </p>
    </div>

    <!-- Container con preview y código -->
    <div class="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <!-- Preview del componente -->
      <div
        class="p-6 bg-white dark:bg-gray-900 flex items-center justify-center gap-4 flex-wrap min-h-[80px]"
        :class="previewClass"
      >
        <slot />
      </div>

      <!-- Código fuente (si hay slot code) -->
      <div v-if="hasCodeSlot" class="border-t border-gray-200 dark:border-gray-700">
        <slot name="code" />
      </div>
    </div>
  </div>
</template>

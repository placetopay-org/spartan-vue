<script lang="ts">
/**
 * A container that groups multiple buttons together with shared borders and consistent styling.
 * @see {@link https://github.com/placetopay-org/spartan-vue/tree/main/src/components/spartan/SButtonGroup Github}.
 */
export default {
    name: 'SButtonGroup',
};
</script>

<template>
    <div class="isolate inline-flex -space-x-px">
        <slot />
    </div>
</template>

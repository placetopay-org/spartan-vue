<template>
    <component :is="as" class="text-lg font-semibold text-gray-900">
        <slot />
    </component>
</template>

<script>
export default {
    props: {
        as: {
            type: String,
            default: 'h3',
        },
    },
};
</script>

<template>
    <component :is="as" class="text-sm text-gray-900">
        <slot />
    </component>
</template>

<script>
export default {
    props: {
        as: {
            type: String,
            default: 'dd',
        },
    },
};
</script>

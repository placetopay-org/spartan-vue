<template>
    <a
        :key="name"
        :href="href"
        :class="[
            active ? 'rounded-xl bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900',
            'flex-1 px-4 py-3 text-center text-sm font-medium',
        ]"
        :aria-current="active ? 'page' : undefined"
    >
        {{ name }}
    </a>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true,
        },
        href: {
            type: String,
            required: false,
            default: '#',
        },
        active: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
};
</script>

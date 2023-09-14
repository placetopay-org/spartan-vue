<template>
    <MenuButton
        class="flex max-w-xs items-center rounded-full border-transparent text-sm focus:border-primary-300 focus:outline-none focus:ring focus:ring-primary-300"
    >
        <SAvatar v-bind="$attrs"></SAvatar>
    </MenuButton>
</template>

<script>
import { SAvatar } from '@spartan';
import { MenuButton } from '@headlessui/vue';

export default {
    components: {
        SAvatar,
        MenuButton,
    },
};
</script>

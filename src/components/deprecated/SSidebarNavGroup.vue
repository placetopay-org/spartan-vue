<template>
    <Disclosure as="div" :default-open="defaultOpen">
        <slot />
        <DisclosurePanel class="mt-1 space-y-1">
            <slot name="items-list"></slot>
        </DisclosurePanel>
    </Disclosure>
</template>

<script>
import { DisclosurePanel, Disclosure } from '@headlessui/vue';

export default {
    components: {
        DisclosurePanel,
        Disclosure,
    },
    props: {
        defaultOpen: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    data() {
        return {};
    },
    computed: {},
};
</script>

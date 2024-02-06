<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { TTabItemProps } from '../../types';
import { useContext } from '../../api';

const props = withDefaults(defineProps<Partial<TTabItemProps>>(), {
    as: 'button',
});

const el = ref<HTMLElement>();
const updatedPath = ref(props.path);
const active = ref(false);
const setActive = (value: boolean) => (active.value = value);

const store = useContext('STabItem');

onMounted(() => {
    const elInnerText = el.value?.innerText;
    if (!updatedPath.value && elInnerText) updatedPath.value = elInnerText;
    if (updatedPath.value) store.registerTab({ path: updatedPath.value, setActive });
});
</script>

<template>
    <component
        ref="el"
        v-if="as"
        :is="as"
        :class="[
            active
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
            'group inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium',
        ]"
        :aria-current="active ? 'page' : undefined"
        @click="() => store.updateTab(updatedPath)"
    >
        <component
            v-if="icon"
            :is="icon"
            :class="[
                active ? 'text-primary-500' : 'text-gray-400 group-hover:text-gray-500',
                '-ml-0.5 mr-2 h-5 w-5',
            ]"
            aria-hidden="true"
        />
        <slot />
    </component>
</template>

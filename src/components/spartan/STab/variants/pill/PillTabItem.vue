<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import type { TTabItemProps } from '../../types';
import { useContext } from '../../api';

const { as = 'button', path, active, regex } = defineProps<TTabItemProps>();

const context = useContext('STabItem');

const el = ref<HTMLElement>();
const vPath = ref(path || '');
const vRegex = computed(() => regex || new RegExp(`^${vPath.value}$`));
const vActive = computed(() => active || vRegex.value.test(context.modelValue));

onMounted(() => {
    const elInnerText = el.value?.innerText;
    if (!vPath.value && elInnerText) vPath.value = elInnerText;
});
</script>

<template>
    <component
        ref="el"
        v-if="as"
        :is="as"
        :type="as === 'button' ? 'button' : undefined"
        :class="[
            vActive ? 'bg-spartan-primary-100 text-spartan-primary-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100',
            'group inline-flex items-center rounded-md px-3 py-2 text-sm font-medium',
            $props.class,
        ]"
        :aria-current="vActive ? 'page' : undefined"
        @click="() => context.updateModelValue(vPath)"
    >
        <component
            v-if="icon"
            :is="icon"
            :class="[vActive ? 'text-spartan-primary-500' : 'text-gray-400 group-hover:text-gray-500', '-ml-0.5 mr-2 h-5 w-5']"
            aria-hidden="true"
        />
        <slot />
    </component>
</template>

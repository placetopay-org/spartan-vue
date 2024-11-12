<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { TTabItemProps } from '../../types';
import { useContext } from '../../api';
import { SDropdown } from '../../../SDropdown';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';

const { as = 'button', path, dropdown } = defineProps<TTabItemProps>();

const el = ref<HTMLElement>();
const updatedPath = ref(path);
const active = ref(false);
const setActive = (value: boolean) => (active.value = value);
const dropdownContainerRef = ref<HTMLElement>();
const dropdownRef = ref<InstanceType<typeof SDropdown>>();

const context = useContext('STabItem');

onMounted(() => {
    const elInnerText = el.value?.innerText;
    if (!updatedPath.value && elInnerText) updatedPath.value = elInnerText;
    if (updatedPath.value) {
        if (!dropdown) context.registerTab({ path: updatedPath.value, setActive });
        else {
            dropdownContainerRef.value?.querySelectorAll('[data-item-path]').forEach((item: any) => {
                context.registerTab({ path: item.dataset.itemPath, setActive });
            });
        }
    }
});

const updatePath = () => {
    if (!dropdown) context.updateTab(updatedPath.value);
    else dropdownRef.value?.toggle();
};
</script>

<template>
    <component
        ref="el"
        v-if="as"
        :is="as"
        :type="as === 'button' ? 'button' : undefined"
        :class="[
            active
                ? 'border-spartan-primary-500 text-spartan-primary-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
            'group inline-flex items-center gap-1 border-b-2 px-1 py-4 text-sm font-medium',
        ]"
        :aria-current="active ? 'page' : undefined"
        :data-path="updatedPath"
        @click="updatePath"
    >
        <component
            v-if="icon"
            :is="icon"
            :class="[
                active ? 'text-spartan-primary-500' : 'text-gray-400 group-hover:text-gray-500',
                '-ml-0.5 mr-2 h-5 w-5',
            ]"
            aria-hidden="true"
        />

        <div ref="dropdownContainerRef" class="flex items-center gap-1" v-if="dropdown">
            <SDropdown ref="dropdownRef" :offset="9" manual>
                <template #reference>
                    <slot />
                </template>

                <slot name="items" />
            </SDropdown>
            <ChevronDownIcon :class="['h-5 w-5 text-gray-400', active ? 'text-spartan-primary-600' : 'group-hover:text-gray-500']" />
        </div>

        <slot v-else />
    </component>
</template>

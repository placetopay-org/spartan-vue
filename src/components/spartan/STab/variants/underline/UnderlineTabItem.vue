<script setup lang="ts">
import type { TTabItemProps, TDropdownContextKey } from '../../types';
import { useContext } from '../../api';
import { SDropdown } from '../../../SDropdown';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';
import { computed, onMounted, provide, ref } from 'vue';

const { as = 'button', path, dropdown, active, regex } = defineProps<TTabItemProps>();

const context = useContext('STabItem');

const el = ref<HTMLElement>();
const vPath = ref(path || '');
const vRegex = computed(() => regex || new RegExp(`^${vPath.value}$`));
const vActive = computed(() => {
    if (active || vRegex.value.test(context.modelValue)) return true;

    if (dropdown && Object.keys(context.dropdowns).length) {
        for (const reg of context.dropdowns[vPath.value]) {
            if (reg.test(context.modelValue)) {
                return true;
            }
        }
    }

    return false;
});
const itemsRef = ref<HTMLElement>();
const dropdownRef = ref<InstanceType<typeof SDropdown>>();

provide<TDropdownContextKey>('dropdown', vPath);

onMounted(() => {
    const elInnerText = el.value?.innerText;
    if (!vPath.value && elInnerText) vPath.value = elInnerText;
});

// console.log(vRegex);
</script>

<template>
    <SDropdown v-if="dropdown" ref="dropdownRef" useShow :responsive="false">
        <template #reference>
            <component
                ref="el"
                v-if="as"
                :is="as"
                :type="as === 'button' ? 'button' : undefined"
                :class="[
                    vActive
                        ? 'border-spartan-primary-500 text-spartan-primary-600'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                    'group inline-flex items-center gap-1 border-b-2 px-1 py-4 text-sm font-medium',
                ]"
                :aria-current="vActive ? 'page' : undefined"
            >
                <component
                    v-if="icon"
                    :is="icon"
                    :class="[
                        vActive ? 'text-spartan-primary-500' : 'text-gray-400 group-hover:text-gray-500',
                        '-ml-0.5 mr-2 h-5 w-5',
                    ]"
                    aria-hidden="true"
                />
                <slot />
                <ChevronDownIcon
                    v-if="dropdown"
                    :class="[
                        'h-5 w-5 text-gray-400',
                        vActive ? 'text-spartan-primary-600' : 'group-hover:text-gray-500',
                    ]"
                />
            </component>
        </template>

        <div ref="itemsRef">
            <slot name="items" />
        </div>
    </SDropdown>

    <component
        v-else
        ref="el"
        v-if="as"
        :is="as"
        :type="as === 'button' ? 'button' : undefined"
        :class="[
            vActive
                ? 'border-spartan-primary-500 text-spartan-primary-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
            'group inline-flex items-center gap-1 border-b-2 px-1 py-4 text-sm font-medium',
        ]"
        :aria-current="vActive ? 'page' : undefined"
        :data-path="vPath"
        @click="() => context.updateModelValue(vPath)"
    >
        <component
            v-if="icon"
            :is="icon"
            :class="[
                vActive ? 'text-spartan-primary-500' : 'text-gray-400 group-hover:text-gray-500',
                '-ml-0.5 mr-2 h-5 w-5',
            ]"
            aria-hidden="true"
        />
        <slot />
    </component>
</template>

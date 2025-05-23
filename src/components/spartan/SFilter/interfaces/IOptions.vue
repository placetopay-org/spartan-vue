<script setup lang="ts">
import { computed, ref } from 'vue';
import { XMarkIcon } from '@heroicons/vue/24/solid';
import { SRadio, SCheckbox } from '../../';
import { translator } from '@/helpers';
import { SBadge, SInput } from '@spartan';
import type { IOptionsConfig } from './types';
import { getOptions } from '../helpers';

const emit = defineEmits(['update:modelValue']);

const props = defineProps<{
    modelValue?: string | string[];
    config: IOptionsConfig;
}>();

const { t } = translator('filter');

const search = ref('');

const options = computed(() => getOptions(props.config.options));

const checked = computed({
    get() {
        return props.modelValue || (props.config.multiple ? [] : false);
    },
    set(value) {
        emit('update:modelValue', value);
    },
});

const getOptionLabel = (optionId: string) => {
    return options.value.find((option) => option.id === optionId)?.label;
};

const filteredOptions = computed(() => {
    return options.value.filter((option) => option.label.toLowerCase().includes(search.value.toLowerCase()));
});

const removeCheck = (option: string) => {
    if (checked.value === false) return;
    checked.value = (checked.value as string[]).filter((item) => item !== option);
};

const clear = () => {
    checked.value = [];
    search.value = '';
};
</script>

<template>
    <div class="flex flex-col gap-4">
        <SInput
            v-if="!config.multiple && config.options.length > 5"
            v-model="search"
            :placeholder="t('inputSelectorPlaceholder')"
        />
        <div
            v-if="config.multiple"
            :tabindex="-1"
            class="flex items-center gap-3 rounded-lg border border-gray-300 bg-white px-3 py-2 transition focus-within:border-spartan-primary-300 focus-within:ring focus-within:ring-spartan-primary-100"
            @focus="
                (event: FocusEvent) =>
                    ((event.target as HTMLDivElement).querySelector('input') as HTMLInputElement).focus()
            "
        >
            <div class="flex max-h-20 w-full flex-wrap gap-3 overflow-auto">
                <template v-if="checked">
                    <SBadge
                        v-for="option in checked"
                        :key="option"
                        removable
                        pill
                        size="sm"
                        @removed="removeCheck(option)"
                    >
                        {{ getOptionLabel(option) }}
                    </SBadge>
                </template>
                <input
                    id="input-search"
                    v-model="search"
                    type="text"
                    :placeholder="(checked as string[]).length ? '' : t('optionsSelectorPlaceholder')"
                    class="w-full border-0 p-0 text-sm placeholder:text-gray-400 focus:outline-0 focus:ring-0"
                />
            </div>
            <div class="flex items-center">
                <button @click="clear">
                    <XMarkIcon class="h-5 w-5 text-gray-500 duration-75 hover:scale-105 hover:text-gray-700" />
                </button>
            </div>
        </div>
        <div class="flex max-h-32 flex-col gap-2 overflow-y-auto py-1.5 pl-1.5">
            <div v-for="option in filteredOptions" :key="option.id" class="flex items-center gap-2">
                <!-- @vue-ignore -->
                <component :is="config.multiple ? SCheckbox : SRadio" v-model="checked" :value="option.id">
                    {{ option.label }}
                </component>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* width */
::-webkit-scrollbar {
    width: 0;
}
</style>

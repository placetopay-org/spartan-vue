<script setup lang="ts">
import { computed, ref } from 'vue';
import { XMarkIcon } from '@heroicons/vue/24/solid';
import { SRadio, SCheckbox } from '../../';
import { getChoices } from '../helpers';
import { translator } from '@/helpers';
import { SBadge, SInput } from '@spartan';
import type { SFilterOptionsField } from '../types';

const emit = defineEmits(['update:modelValue']);

const { t } = translator('filter');

const props = defineProps<{
    modelValue?: string | string[];
    field: SFilterOptionsField;
}>();

const search = ref('');

const normalizedChoices = computed(() => getChoices(props.field.choices));

const checked = computed({
    get() {
        return props.modelValue || (props.field.multiple ? [] : false);
    },
    set(value) {
        emit('update:modelValue', value);
    },
});

const getOptionLabel = (optionId: string) => normalizedChoices.value.find((option) => option.id === optionId)?.label;

const filteredChoices = computed(() =>
    normalizedChoices.value.filter((option) => option.label.toLowerCase().includes(search.value.toLowerCase())),
);

const removeCheck = (option: string) => {
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
            v-if="!field.multiple && field.choices.length > 5"
            v-model="search"
            :placeholder="t('inputSelectorPlaceholder')"
        />
        <div
            v-if="field.multiple"
            :tabindex="-1"
            class="focus-within:border-spartan-primary-300 focus-within:ring-spartan-primary-100 flex items-center gap-3 rounded-lg border border-gray-300 bg-white px-3 py-2 transition focus-within:ring dark:border-white/10 dark:bg-white/5"
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
                <!-- Named for screen readers via aria-label, since the placeholder is -->
                <!-- cleared on selection. Tests target the data-s-filter-search hook. -->
                <input
                    v-model="search"
                    data-s-filter-search
                    type="text"
                    :aria-label="t('optionsSelectorPlaceholder')"
                    :placeholder="(checked as string[]).length ? '' : t('optionsSelectorPlaceholder')"
                    class="w-full border-0 bg-transparent p-0 text-sm placeholder:text-gray-400 focus:ring-0 focus:outline-0"
                />
            </div>
            <div class="flex items-center">
                <button @click="clear">
                    <XMarkIcon
                        class="h-5 w-5 text-gray-500 duration-75 hover:scale-105 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    />
                </button>
            </div>
        </div>
        <div class="flex max-h-32 flex-col gap-2 overflow-y-auto py-1.5 pl-1.5">
            <div v-for="option in filteredChoices" :key="option.id" class="flex items-center gap-2">
                <!-- @vue-ignore -->
                <component :is="field.multiple ? SCheckbox : SRadio" v-model="checked" :value="option.id">
                    {{ option.label }}
                </component>
            </div>
        </div>
    </div>
</template>

<style scoped>
::-webkit-scrollbar {
    width: 0;
}
</style>

<template>
    <DatePicker
        v-bind="$attrs"
        unstyled
        :pt="theme"
        :ptOptions="{
            mergeProps: ptViewMerge,
        }"
    >
        <template #prevbutton="{ actionCallback, keydownCallback }">
            <SecondaryButton variant="text" rounded @click="actionCallback" @keydown="keydownCallback">
                <template #icon>
                    <ChevronLeftIcon />
                </template>
            </SecondaryButton>
        </template>
        <template #nextbutton="{ actionCallback, keydownCallback }">
            <SecondaryButton variant="text" rounded @click="actionCallback" @keydown="keydownCallback">
                <template #icon>
                    <ChevronRightIcon />
                </template>
            </SecondaryButton>
        </template>
        <template #todaybutton="{ actionCallback, keydownCallback }">
            <SecondaryButton
                variant="text"
                label="Today"
                size="small"
                @click="actionCallback"
                @keydown="keydownCallback"
            />
        </template>
        <template #clearbutton="{ actionCallback, keydownCallback }">
            <SecondaryButton
                variant="text"
                label="Clear"
                size="small"
                @click="actionCallback"
                @keydown="keydownCallback"
            />
        </template>
        <template #dropdownicon>
            <ChevronDownIcon />
        </template>
        <template #inputicon>
            <CalendarIcon />
        </template>
        <template #hourincrementbutton="{ callbacks }">
            <SecondaryButton variant="text" rounded v-on="callbacks">
                <template #icon>
                    <ChevronUpIcon />
                </template>
            </SecondaryButton>
        </template>
        <template #hourdecrementbutton="{ callbacks }">
            <SecondaryButton variant="text" rounded v-on="callbacks">
                <template #icon>
                    <ChevronDownIcon />
                </template>
            </SecondaryButton>
        </template>
        <template #minuteincrementbutton="{ callbacks }">
            <SecondaryButton variant="text" rounded v-on="callbacks">
                <template #icon>
                    <ChevronUpIcon />
                </template>
            </SecondaryButton>
        </template>
        <template #minutedecrementbutton="{ callbacks }">
            <SecondaryButton variant="text" rounded v-on="callbacks">
                <template #icon>
                    <ChevronDownIcon />
                </template>
            </SecondaryButton>
        </template>
        <template #secondincrementbutton="{ callbacks }">
            <SecondaryButton variant="text" rounded v-on="callbacks">
                <template #icon>
                    <ChevronUpIcon />
                </template>
            </SecondaryButton>
        </template>
        <template #seconddecrementbutton="{ callbacks }">
            <SecondaryButton variant="text" rounded v-on="callbacks">
                <template #icon>
                    <ChevronDownIcon />
                </template>
            </SecondaryButton>
        </template>
        <template #ampmincrementbutton="{ toggleCallback, keydownCallback }">
            <SecondaryButton variant="text" rounded @click="toggleCallback" @keydown="keydownCallback">
                <template #icon>
                    <ChevronUpIcon />
                </template>
            </SecondaryButton>
        </template>
        <template #ampmdecrementbutton="{ toggleCallback, keydownCallback }">
            <SecondaryButton variant="text" rounded @click="toggleCallback" @keydown="keydownCallback">
                <template #icon>
                    <ChevronDownIcon />
                </template>
            </SecondaryButton>
        </template>
        <template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
            <slot :name="slotName" v-bind="slotProps ?? {}" />
        </template>
    </DatePicker>
</template>

<script setup>
defineOptions({ inheritAttrs: false });

import CalendarIcon from '@primevue/icons/calendar';
import ChevronDownIcon from '@primevue/icons/chevrondown';
import ChevronLeftIcon from '@primevue/icons/chevronleft';
import ChevronRightIcon from '@primevue/icons/chevronright';
import ChevronUpIcon from '@primevue/icons/chevronup';
import DatePicker from 'primevue/datepicker';
import PrimeVueConfig from 'primevue/config';
import { getCurrentInstance, ref } from 'vue';
import SecondaryButton from './SecondaryButton.vue';
import { ptViewMerge } from './utils';

const instance = getCurrentInstance();
const app = instance?.appContext.app;
if (app && !app.config.globalProperties.$primevue) {
    app.use(PrimeVueConfig, { unstyled: true });
}

const theme = ref({
    root: `inline-flex max-w-full relative data-[p-fluid=true]:flex`,
    pcInputText: {
        root: `flex-auto w-[1%] appearance-none rounded-md outline-hidden
        data-[p-has-dropdown=true]:rounded-e-none data-[p-has-e-icon=true]:pe-10
        bg-white dark:bg-gray-950
        data-[p-filled=true]:bg-gray-50 dark:data-[p-filled=true]:bg-gray-800
        text-gray-700 dark:text-white
        placeholder:text-gray-500 dark:placeholder:text-gray-400
        border border-gray-300 dark:border-gray-700
        enabled:hover:border-gray-400 dark:enabled:hover:border-gray-600
        enabled:focus:border-spartan-primary-500
        disabled:bg-gray-200 disabled:text-gray-500
        dark:disabled:bg-gray-700 dark:disabled:text-gray-400
        data-[p-invalid=true]:border-red-400 dark:data-[p-invalid=true]:border-red-300
        data-[p-invalid=true]:placeholder:text-red-600 dark:data-[p-invalid=true]:placeholder:text-red-400
        px-3 py-2 data-[p-fluid=true]:w-full
        data-[p-small=true]:text-sm data-[p-small=true]:px-[0.625rem] data-[p-small=true]:py-[0.375rem]
        data-[p-large=true]:text-lg data-[p-large=true]:px-[0.875rem] data-[p-large=true]:py-[0.625rem]
        transition-colors duration-200 shadow-[0_1px_2px_0_rgba(18,18,23,0.05)]`,
    },
    dropdown: `cursor-pointer inline-flex items-center justify-center select-none overflow-hidden relative w-10 shrink-0 rounded-e-md
        border border-s-0 border-gray-300 dark:border-gray-700
        bg-gray-100 enabled:hover:bg-gray-200 enabled:active:bg-gray-300
        text-gray-600 enabled:hover:text-gray-700 enabled:hover:active:text-gray-800
        dark:bg-gray-800 dark:enabled:hover:bg-gray-700 dark:enabled:active:bg-gray-600
        dark:text-gray-300 dark:enabled:hover:text-gray-200 dark:enabled:active:text-gray-100
        focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-spartan-primary-500
        transition-colors duration-200`,
    inputIconContainer: `cursor-pointer absolute top-1/2 end-3 -mt-2 text-gray-400 leading-none data-[p-small=true]:*:size-[0.875rem] data-[p-large=true]:*:size-[1.125rem]`,
    panel: `data-[p-portal-self=true]:min-w-full w-auto p-3 rounded-md
        data-[p-inline=true]:inline-block data-[p-inline=true]:overflow-x-auto data-[p-inline=true]:shadow-none
        border border-gray-200 dark:border-gray-700
        bg-white dark:bg-gray-900
        text-gray-700 dark:text-white
        shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]`,
    calendarContainer: `flex`,
    calendar: `flex-auto border-s border-gray-200 dark:border-gray-700 gap-3 px-3
        first:ps-0 first:border-s-0 last:pe-0`,
    header: `flex items-center justify-between pt-0 px-0 pb-2 font-medium gap-2
        bg-white dark:bg-gray-900
        text-gray-700 dark:text-white
        border-b border-gray-200 dark:border-gray-700`,
    title: `flex items-center justify-between gap-2 font-medium`,
    selectMonth: `border-none bg-transparent m-0 cursor-pointer font-medium transition-colors duration-200
        py-1 px-2 rounded-md text-gray-700 dark:text-white
        enabled:hover:bg-gray-100 enabled:hover:text-gray-800
        dark:enabled:hover:bg-gray-800 dark:enabled:hover:text-white
        focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-spartan-primary-500`,
    selectYear: `border-none bg-transparent m-0 cursor-pointer font-medium transition-colors duration-200
        py-1 px-2 rounded-md text-gray-700 dark:text-white
        enabled:hover:bg-gray-100 enabled:hover:text-gray-800
        dark:enabled:hover:bg-gray-800 dark:enabled:hover:text-white
        focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-spartan-primary-500`,
    decade: `white-space-nowrap`,
    dayView: `w-full border-collapse text-base mt-2 mx-0 mb-0`,
    tableHeader: ``,
    tableHeaderRow: ``,
    weekHeader: `p-1`,
    weekHeaderLabel: `font-medium text-gray-700 dark:text-white opacity-60`,
    tableHeaderCell: ``,
    weekDayCell: `p-1`,
    weekDay: `font-medium text-gray-700 dark:text-white`,
    tableBody: ``,
    weekNumber: ``,
    weekLabelContainer: `opacity-60 flex w-8 h-8 p-1 justify-center`,
    weekLabel: ``,
    dayCell: `p-1`,
    day: `flex items-center justify-center cursor-pointer my-0 mx-auto overflow-hidden relative w-8 h-8
        rounded-full p-1 transition-colors duration-200 border border-transparent text-gray-700 dark:text-white
        focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-spartan-primary-500
        data-[p-disabled=true]:opacity-60 data-[p-disabled=true]:pointer-events-none
        hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-white
        data-[p-selected=true]:bg-spartan-primary-500 data-[p-selected=true]:text-white
        data-[p-today=true]:bg-gray-200 data-[p-today=true]:text-gray-900 dark:data-[p-today=true]:bg-gray-700 dark:data-[p-today=true]:text-white
        data-[p-today=true]:hover:bg-gray-100 data-[p-today=true]:hover:text-gray-800 dark:data-[p-today=true]:hover:bg-gray-800 dark:data-[p-today=true]:hover:text-white
        data-[p-today=true]:data-[p-selected=true]:bg-spartan-primary-500 data-[p-today=true]:data-[p-selected=true]:text-white`,
    monthView: `mt-2 mb-0 mx-0`,
    month: `w-1/3 inline-flex items-center justify-center cursor-pointer overflow-hidden relative
        p-[0.375rem] transition-colors duration-200 rounded-md text-gray-700 dark:text-white
        focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-spartan-primary-500
        hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-white
        data-[p-selected=true]:bg-spartan-primary-500 data-[p-selected=true]:text-white`,
    yearView: `mt-2 mb-0 mx-0`,
    year: `w-1/2 inline-flex items-center justify-center cursor-pointer overflow-hidden relative
        p-[0.375rem] transition-colors duration-200 rounded-md text-gray-700 dark:text-white
        focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-spartan-primary-500
        hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-white
        data-[p-selected=true]:bg-spartan-primary-500 data-[p-selected=true]:text-white`,
    timePicker: `flex items-center justify-center border-t border-gray-200 dark:border-gray-700 p-0 gap-2
        [&:not([data-p-time-only=true])]:pt-2 [&:not([data-p-time-only=true])]:pb-0 [&:not([data-p-time-only=true])]:px-0`,
    hourPicker: `flex items-center flex-col gap-1`,
    hour: `text-base`,
    separatorContainer: `flex items-center flex-col gap-1`,
    separator: `text-base`,
    minutePicker: `flex items-center flex-col gap-1`,
    minute: `text-base`,
    secondPicker: `flex items-center flex-col gap-1`,
    second: `text-base`,
    ampmPicker: `flex items-center flex-col gap-1`,
    ampm: `text-base`,
    buttonbar: `flex justify-between items-center pt-2 pb-0 px-0 border-t border-gray-200 dark:border-gray-700`,
    transition: {
        enterFromClass: 'opacity-0 scale-y-75',
        enterActiveClass: 'transition duration-120 ease-[cubic-bezier(0,0,0.2,1)]',
        leaveActiveClass: 'transition-opacity duration-100 ease-linear',
        leaveToClass: 'opacity-0',
    },
});
</script>

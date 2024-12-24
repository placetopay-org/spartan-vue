<template>
    <Transition
        mode="out-in"
        enter-active-class="duration-150 ease-out"
        leave-active-class="duration-150 ease-in"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
    >
        <slot />
    </Transition>
</template>

<!-- export const vertical = {
    'enter-active-class': 'transition duration-200 ease-out',
    'leave-active-class': 'transition duration-150 ease-in',
    'enter-from-class': '-translate-y-2 opacity-0',
    'enter-to-class': 'translate-y-0 opacity-100',
    'leave-from-class': 'translate-y-0 opacity-100',
    'leave-to-class': '-translate-y-2 opacity-0',
};

export const fade = {
    'enter-active-class': 'duration-300 ease-out',
    'enter-from-class': 'opacity-0',
    'enter-to-class': 'opacity-100',
    'leave-active-class': 'duration-200 ease-in',
    'leave-from-class': 'opacity-100',
    'leave-to-class': 'opacity-0',
}; -->
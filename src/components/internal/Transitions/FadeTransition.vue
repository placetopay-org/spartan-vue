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

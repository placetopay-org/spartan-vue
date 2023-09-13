<template>
    <div class="flex h-screen overflow-hidden bg-gray-100">
        <slot name="sidebar"></slot>
        <div class="flex w-0 flex-1 flex-col overflow-hidden">
            <slot name="top-bar"></slot>
            <main class="relative flex-1 overflow-y-auto focus:outline-none">
                <div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                    <slot></slot>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
export default {};
</script>

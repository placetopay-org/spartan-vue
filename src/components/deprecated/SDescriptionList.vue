<template>
    <div class="flex flex-col overflow-hidden rounded-2xl bg-white shadow">
        <div class="flex flex-row items-start justify-between px-6 pb-3 pt-6">
            <div class="flex flex-col">
                <h3 class="text-lg font-semibold text-gray-900">{{ title }}</h3>
                <p class="text-base font-medium text-gray-500">{{ description }}</p>
            </div>
            <div class="flex flex-row">
                <slot name="actions" />
            </div>
        </div>

        <div class="flex flex-col gap-8 px-6 pb-6 pt-3">
            <dl class="grid grid-cols-2">
                <div class="flex flex-col gap-8">
                    <slot name="col-1" />
                </div>
                <div class="flex flex-col gap-8">
                    <slot name="col-2" />
                </div>
            </dl>

            <dl class="grid grid-cols-1">
                <div class="flex flex-col">
                    <slot name="footer" />
                </div>
            </dl>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
};
</script>

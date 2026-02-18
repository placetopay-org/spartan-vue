<template>
    <div class="flex flex-col gap-6">
        <div class="flex items-center gap-4">
            <SSkeleton class="h-12 w-12 rounded-full" />
            <div class="flex-1 space-y-2">
                <SSkeleton class="h-4 w-3/4" />
                <SSkeleton class="h-4 w-1/2" />
            </div>
        </div>
        <div class="space-y-3">
            <SSkeleton class="h-40 w-full rounded-lg" />
            <SSkeleton class="h-4 w-3/4" />
            <SSkeleton class="h-4 w-1/2" />
            <SSkeleton class="h-4 w-5/6" />
        </div>
    </div>
</template>

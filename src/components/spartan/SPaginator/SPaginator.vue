<script setup lang="ts">
import type { TPaginatorProps, TPaginatorEmits, TLaravelResource } from './types';
import { translator } from '@/helpers';
import { SSelect } from '@spartan';
import { SButtonGroup, SButtonGroupItem } from '../SButtonGroup';
import { computed } from 'vue';
import { twMerge } from 'tailwind-merge';

const emit = defineEmits<TPaginatorEmits>();
const {
    paginatorSize,
    page,
    pageSizes,
    size,
    count,
    hideWhenSinglePage,
    total,
    canGoPrev = undefined,
    canGoNext = undefined,
    laravel,
    inertiaRouter,
} = defineProps<TPaginatorProps>();

const { t } = translator('dataTable');

function isLaravelResource(laravel: any): laravel is TLaravelResource {
    return laravel && 'meta' in laravel && laravel.meta && 'links' in laravel && laravel.links;
}

const vLaravel = computed(() => {
    if (!laravel) return;

    // Total
    const total = isLaravelResource(laravel) ? laravel.meta?.total : laravel.total;

    // Per page
    const perPage = isLaravelResource(laravel) ? laravel.meta?.per_page : laravel.per_page;

    // Last page
    const lastPage = isLaravelResource(laravel) ? laravel.meta?.last_page : laravel.last_page;

    // Current page
    const currentPage = isLaravelResource(laravel) ? laravel.meta?.current_page : laravel.current_page;

    // Prev page
    const prevPage = isLaravelResource(laravel) ? laravel.links?.prev : laravel.prev_page_url;

    // Next page
    const nextPage = isLaravelResource(laravel) ? laravel.links?.next : laravel.next_page_url;

    // Links
    const links = isLaravelResource(laravel) ? laravel.meta?.links : laravel.links;

    return {
        total,
        perPage,
        lastPage,
        currentPage,
        prevPage,
        nextPage,
        links,
    };
});

const vQuantity = computed(() => Number(paginatorSize) || 0);

const vTotal = computed(() => {
    if (total) return total;
    if (vLaravel.value?.total) return vLaravel.value.total;
});

const vSize = computed(() => {
    if (size) return size;
    if (vLaravel.value?.perPage) return vLaravel.value.perPage;
});

const vCount = computed(() => {
    if (count) return count;
    if (vLaravel.value?.lastPage) return vLaravel.value.lastPage;

    if (vTotal.value && vSize.value) return Math.ceil(vTotal.value / vSize.value);
});

const vPageSizes = computed(() => {
    if (!pageSizes || !vSize.value) return;

    let data = [...pageSizes];

    if (total) {
        data = [];

        for (const item of pageSizes) {
            if (item >= total) {
                data.push(total);
                break;
            }
            data.push(item);
        }
    }

    if (!data.includes(vSize.value)) {
        data.push(vSize.value);
        data.sort((a, b) => a - b);
    }

    return data;
});

const vPage = computed(() => {
    if (page) return page;

    if (vLaravel.value?.currentPage) return vLaravel.value.currentPage;
});

const vPages = computed(() => {
    if (!vCount.value || !vPage.value) return [];

    let arr: (string | number)[] = [];

    if (vCount.value <= vQuantity.value * 2 + 5) return vCount.value;

    if (vPage.value - vQuantity.value < 4) {
        arr = Array.apply(null, Array(vQuantity.value * 2 + 3)).map((_, i) => i + 1);
        arr.push('...');
        arr.push(vCount.value);
    } else if (vCount.value - vPage.value - vQuantity.value < 3) {
        arr.push(1);
        arr.push('...');
        arr = arr.concat(
            Array.apply(null, Array(vQuantity.value * 2 + 3)).map(
                (_, i) => vCount.value! - vQuantity.value * 2 - 2 + i,
            ),
        );
    } else {
        arr.push(1);
        arr.push('...');
        arr = arr.concat(
            Array.apply(null, Array(1 + vQuantity.value * 2)).map((_, i) => vPage.value! - vQuantity.value + i),
        );
        arr.push('...');
        arr.push(vCount.value);
    }

    return arr;
});

const vCanGoPrev = computed(() => {
    if (canGoPrev !== undefined) return canGoPrev;
    if (vLaravel.value?.prevPage) return true;
    return Boolean(vPage.value && vPage.value > 1);
});

const vCanGoNext = computed(() => {
    if (canGoNext !== undefined) return canGoNext;
    if (vLaravel.value?.nextPage) return true;
    return Boolean(vPage.value && vCount.value && vPage.value < vCount.value);
});

const prev = () => {
    if (vLaravel.value?.prevPage) {
        if (inertiaRouter) {
            inertiaRouter.visit(vLaravel.value.prevPage);
        } else {
            window.location.href = vLaravel.value.prevPage;
        }
        return;
    }

    if (!vPage.value || vPage.value === 1) {
        emit('change', { dir: 'prev' });
        return;
    }
    emit('change', { page: vPage.value - 1, dir: 'prev' });
    emit('update:page', vPage.value - 1);
};

const next = () => {
    if (vLaravel.value?.nextPage) {
        if (inertiaRouter) {
            inertiaRouter.visit(vLaravel.value.nextPage);
        } else {
            window.location.href = vLaravel.value.nextPage;
        }
        return;
    }

    if (!vPage.value || vPage.value === vCount.value) {
        emit('change', { dir: 'next' });
        return;
    }
    emit('change', { page: vPage.value + 1, dir: 'next' });
    emit('update:page', vPage.value + 1);
};

const selectPage = (pageItem: number) => {
    const link = vLaravel.value?.links?.find((link: any) => link.label === pageItem.toString());
    if (link?.url) {
        if (inertiaRouter) {
            inertiaRouter.visit(link.url);
        } else {
            window.location.href = link.url;
        }
        return;
    }

    if (pageItem === vPage.value) return;
    emit('change', { page: pageItem });
    emit('update:page', pageItem);
};

const updateSize = (value?: string | number) => {
    if (!value) return;

    if (laravel) {
        const currentUrl = window.location.href;
        const url = new URL(currentUrl);
        url.searchParams.set('page', '1');
        url.searchParams.set('per_page', value.toString());

        if (inertiaRouter) {
            inertiaRouter.visit(url.toString());
        } else {
            window.location.href = url.toString();
        }
        return;
    }

    emit('change', { size: Number(value), page: 1 });
    emit('update:size', Number(value));
    emit('update:page', 1);
};

const getLaravelAsLinksProps = (pageItem?: string | number) => {
    if (!laravel?.asLinks)
        return {
            onClick: pageItem === 'prev' ? prev : pageItem === 'next' ? next : () => selectPage(Number(pageItem)),
        };

    const data: any = {};

    data.as = laravel.asLinks;

    if (pageItem === 'prev') {
        const href = vLaravel.value?.prevPage;
        if (href != null) data.href = href;
    } else if (pageItem === 'next') {
        const href = vLaravel.value?.nextPage;
        if (href != null) data.href = href;
    } else {
        const link = vLaravel.value?.links?.find((link: any) => link.label === String(pageItem));
        if (link?.url != null) data.href = link.url;
    }

    return data;
};
</script>

<template>
    <div
        v-if="!hideWhenSinglePage || (vCount && vCount > 1)"
        :class="twMerge('flex flex-1 items-center justify-between gap-8', $props.class)"
    >
        <div v-if="vPageSizes" class="flex items-center gap-1 text-sm text-gray-700">
            <span>{{ t('showing') }}</span>

            <SSelect class="h-8 text-xs" :model-value="vSize" @update:model-value="updateSize">
                <option v-for="pageSize in vPageSizes" :key="pageSize" :value="pageSize">
                    {{ pageSize }}
                </option>
            </SSelect>

            <template v-if="total">
                <span>{{ t('of') }}</span>
                <span class="font-bold">{{ total }}</span>
            </template>
            <span>{{ t('results') }}</span>
        </div>
        <div>
            <SButtonGroup aria-label="pagination">
                <SButtonGroupItem
                    first
                    prev
                    v-bind="getLaravelAsLinksProps('prev')"
                    class="px-2"
                    :disabled="!vCanGoPrev"
                />

                <template v-if="!hideNumbers">
                    <SButtonGroupItem
                        v-for="pageItem in vPages"
                        :key="pageItem"
                        class="px-4"
                        v-bind="getLaravelAsLinksProps(pageItem)"
                        :active="Number(pageItem) === vPage"
                        :class="String(pageItem) === '...' ? 'pointer-events-none' : ''"
                    >
                        {{ pageItem }}
                    </SButtonGroupItem>
                </template>

                <SButtonGroupItem
                    last
                    next
                    v-bind="getLaravelAsLinksProps('next')"
                    class="px-2"
                    :disabled="!vCanGoNext"
                />
            </SButtonGroup>
        </div>
    </div>
</template>

import { ref } from 'vue';
import SStackedList from './SStackedList.vue';
import SStackedListItem from './SStackedListItem.vue';
import { SDefinitionTerm } from '../SDefinitionTerm';
import { SBadge } from '../SBadge';
import { SDropdownItem } from '../SDropdown';
import { buildSourceBinding, createDefault, createVariation, createHistory } from '@/helpers';
import { MagicpenIcon, TrashIcon } from '@placetopay/iconsax-vue/twotone';

export default {
    component: SStackedList,
    title: 'tables/StackedList',
    ...createHistory({
        description: 'A list of items with a stacked layout.',
        slots: [
            {
                name: 'default',
                description: 'The default slot for the content of the list.',
            },
            {
                name: 'dropdown',
                description: 'The slot to show the dropdown menu.',
            },
        ],
        props: [
            {
                name: 'class',
                type: 'string',
                description: 'The class to apply to the component.',
                default: '',
                control: null,
            },
        ],
    }),
};

const sourceBinding = buildSourceBinding({});

export const Default = createDefault({
    components: { SStackedList, SStackedListItem, SDefinitionTerm, SBadge, SDropdownItem },
    setup: () => {
        const value = ref(0);

        const project = {
            id: 1,
            name: 'GraphQL API',
            href: '#',
            status: 'Complete',
            createdBy: 'Leslie Alexander',
            dueDate: 'March 17, 2023',
            dueDateTime: '2023-03-17T00:00Z',
        };

        return { value, project, MagicpenIcon, TrashIcon };
    },
    args: {},
    template: `<SStackedList v-bind="args">
<SStackedListItem class="flex flex-col [&>*]:px-4 [&>*]:py-3">
    <template #dropdown>
        <SDropdownItem :icon="MagicpenIcon">
            Editar
            <template #description>Solo el monto</template>
        </SDropdownItem>
        <SDropdownItem :icon="TrashIcon">
            Elminiar
            <template #description>No se puede deshacer</template>
        </SDropdownItem>
    </template>

    <SDefinitionTerm class="w-full" labels="Referencia:" description="Mercado" />
    <SDefinitionTerm class="w-full" labels="Valor:">
        <template #description>$100.000 <span class="text-gray-400">COP</span></template>
    </SDefinitionTerm>
    <SDefinitionTerm class="w-full" labels="Fecha:" description="20 May 2022, 11:24 AM" />
    <SDefinitionTerm class="w-full" labels="Estado:">
        <template #description><SBadge pill size="sm" color="green">Aprobado</SBadge></template>
    </SDefinitionTerm>
</SStackedListItem>
</SStackedList>`,
    transform: (args) => `<SStackedList ${sourceBinding(args)}>${args.default}</SStackedList>`,
});

export const Base = createVariation({
    components: { SStackedList, SStackedListItem },
    template: `<SStackedList>
    <SStackedListItem>Any Item</SStackedListItem>
    <SStackedListItem>Any Item</SStackedListItem>
    <SStackedListItem>Any Item</SStackedListItem>
    <SStackedListItem>Any Item</SStackedListItem>
</SStackedList>`,
});

export const WithItemDropdown = createVariation({
    components: { SStackedList, SStackedListItem, SDropdownItem },
    containerClass: 'h-[300px]',
    template: `<SStackedList class="w-52">
    <SStackedListItem>Any Item</SStackedListItem>
    <SStackedListItem>Any Item</SStackedListItem>
    <SStackedListItem>
        <template #dropdown>
            <SDropdownItem :icon="MagicpenIcon">
                Editar
                <template #description>Solo el monto</template>
            </SDropdownItem>
            <SDropdownItem :icon="TrashIcon">
                Elminiar
                <template #description>No se puede deshacer</template>
            </SDropdownItem>
        </template>
        
        Any Item
    </SStackedListItem>
    <SStackedListItem>Any Item</SStackedListItem>
</SStackedList>`,
});

export const WithItemIcon = createVariation({
    components: { SStackedList, SStackedListItem, SDropdownItem },
    setup: () => {
        return { MagicpenIcon, TrashIcon };
    },
    containerClass: 'h-[300px]',
    template: `<SStackedList class="w-52">
    <SStackedListItem>Any Item</SStackedListItem>
    <SStackedListItem :icon="TrashIcon">Any Item</SStackedListItem>
    <SStackedListItem :icon="MagicpenIcon">
        <template #dropdown>
            <SDropdownItem :icon="MagicpenIcon">
                Editar
                <template #description>Solo el monto</template>
            </SDropdownItem>
            <SDropdownItem :icon="TrashIcon">
                Elminiar
                <template #description>No se puede deshacer</template>
            </SDropdownItem>
        </template>
        
        Any Item
    </SStackedListItem>
    <SStackedListItem>Any Item</SStackedListItem>
</SStackedList>`,
});

export const WithPagination = createVariation({
    components: { SStackedList, SStackedListItem, SDropdownItem },
    setup: () => {
        return { MagicpenIcon, TrashIcon };
    },
    containerClass: 'h-[300px]',
    template: `<SStackedList class="w-52">
    <SStackedListItem>Any Item</SStackedListItem>
    <SStackedListItem :icon="TrashIcon">Any Item</SStackedListItem>
    <SStackedListItem :icon="MagicpenIcon">
        <template #dropdown>
            <SDropdownItem :icon="MagicpenIcon">
                Editar
                <template #description>Solo el monto</template>
            </SDropdownItem>
            <SDropdownItem :icon="TrashIcon">
                Elminiar
                <template #description>No se puede deshacer</template>
            </SDropdownItem>
        </template>
        
        Any Item
    </SStackedListItem>
    <SStackedListItem>Any Item</SStackedListItem>
</SStackedList>`,
});

export const Custom = createVariation({
    components: { SStackedList, SStackedListItem },
    setup: () => {
        const project = {
            id: 1,
            name: 'GraphQL API',
            href: '#',
            status: 'Complete',
            createdBy: 'Leslie Alexander',
            dueDate: 'March 17, 2023',
            dueDateTime: '2023-03-17T00:00Z',
        };

        return { project };
    },
    template: `<SStackedList v-bind="args">
    <SStackedListItem>Any Item</SStackedListItem>
    <SStackedListItem class="flex gap-4">
        <div class="min-w-0">
            <div class="flex items-start gap-x-3">
                <p class="text-sm font-semibold leading-6 text-gray-900">{{ project.name }}</p>
                <p
                    :class="[
                        'mt-0.5 whitespace-nowrap rounded-md bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20',
                    ]"
                >
                    {{ project.status }}
                </p>
            </div>
            <div class="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                <p class="whitespace-nowrap">
                    Due on <time :datetime="project.dueDateTime">{{ project.dueDate }}</time>
                </p>
                •
                <p class="truncate">Created by {{ project.createdBy }}</p>
            </div>
        </div>
        <div class="flex flex-none items-center gap-x-4">
            <a
                :href="project.href"
                class="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
                >View project<span class="sr-only">, {{ project.name }}</span></a
            >
        </div>    
    </SStackedListItem>
    <SStackedListItem>Any Item</SStackedListItem>
</SStackedList>`,
});

import { SDescriptionList, SDescriptionItem, SButton } from "../index";
import { PencilIcon ,TrashIcon } from '@heroicons/vue/outline'

export default {
    title: "Components/SDescriptionList",
    component: SDescriptionList,
    decorators: [
        () => ({
            template:
                '<div class="bg-gray-100 py-12 px-8"><story /></div>',
        }),
    ],
    subcomponents: { SDescriptionItem }
};

const Template = (args) => ({
    components: { SDescriptionList, SDescriptionItem, SButton, PencilIcon, TrashIcon },
    setup() {
        return { args };
    },
    template: `
    <SDescriptionList
        :title="'Detalles del emisor'"
        :description="'lorem ipsum'"
    >
      <template v-slot:actions>
        <button class="flex justify-center items-center h-11 w-11">
          <PencilIcon class="h-5 w-5" />
        </button>
        <button class="flex justify-center items-center h-11 w-11">
          <TrashIcon class="h-5 w-5 text-red-600" />
        </button>
        <SButton color="primary">{{ args.actions.button }}</SButton>
      </template>
      <template v-slot:col-1>
        <SDescriptionItem
            v-for="item in args.col1"
            :label="item.label"
            :value="item.value"
        >
        </SDescriptionItem>
      </template>
      <template v-slot:col-2>
        <SDescriptionItem
            v-for="item in args.col2"
            :label="item.label"
            :value="item.value"
        >
        </SDescriptionItem>
      </template>
      <template v-slot:footer>
        <SDescriptionItem
            :label="args.footer.label"
            :value="args.footer.value"
        >
        </SDescriptionItem>
      </template>
    </SDescriptionList>
  `,
});

export const DescriptionList = Template.bind({});
DescriptionList.args = {
    actions: {
        button: 'Editar',
    },
    col1: [
        { label: 'País', value: 'Colombia' },
        { label: 'Slug', value: 'UI UX' },
    ],
    col2: [
        { label: 'Idioma', value: 'Español' },
        { label: 'Moneda', value: 'Peso colombiano' },
    ],
    footer: {
        label: 'Descripción',
        value: 'Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.'
    }
};
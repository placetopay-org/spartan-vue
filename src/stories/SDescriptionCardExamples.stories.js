import { SCard, SDefinitionTerm, SButton, SSectionTitle, SSectionDescription, SLink } from '../index';
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/outline';

export default {
    title: 'Examples/SDescriptionCardExamples',
    component: SCard,
    decorators: [
        () => ({
            template: '<div class="flex bg-gray-100 py-12 px-8"><story /></div>',
        }),
    ],
    subcomponents: { SDefinitionTerm },
};

const Template = (args) => ({
    components: {
        SDefinitionTerm,
        SButton,
        PencilIcon,
        TrashIcon,
        SSectionTitle,
        SSectionDescription,
        SCard,
        SLink,
    },
    setup() {
        return { args };
    },
    template: `
    <SCard class="mx-auto max-w-4xl w-full">
      <div class="flex justify-between">
        <div>
          <SSectionTitle>Sites Admin</SSectionTitle>
          <SSectionDescription>Role given to Operations administrator of sites</SSectionDescription>
        </div>
        <div class="space-x-3">
          <SButton color="danger">Delete</SButton>
          <SButton color="white">Edit</SButton>
        </div>
      </div>
      <div class="mt-6">
        <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <SDefinitionTerm class="sm:col-span-1">
            Permissions
            <template #description>32 Permissions assigned</template>
          </SDefinitionTerm>

          <SDefinitionTerm class="sm:col-span-1">
            Used by
            <template #description>23 Users are using this role</template>
          </SDefinitionTerm>

          <SDefinitionTerm class="sm:col-span-1">
            Created by
            <template #description>
              <SLink href="#">
                Jane Doe
              </SLink>
              - 20 May 2021, 13:45
            </template>
          </SDefinitionTerm>

          <SDefinitionTerm class="sm:col-span-1">
            Updated by
            <template #description>
              <SLink href="#">
                James Doe
              </SLink>
              - 22 May 2021, 11:45
            </template>
          </SDefinitionTerm>
        </dl>
      </div>
    </SCard>
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
        value: 'Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.',
    },
};

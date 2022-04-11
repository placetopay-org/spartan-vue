import { SEmptyState, SButton } from "../index";
import { PlusIcon } from '@heroicons/vue/solid'

export default {
    title: "Components/SEmptyState",
    component: SEmptyState,
    decorators: [
        () => ({
            template:
                '<div class="flex bg-gray-100 py-12 px-8"><story /></div>',
        }),
    ],
}

const Template = (args) => ({
    components: { SEmptyState, SButton },
    setup() {
        return { args, PlusIcon };
    },
    template: `
    <SEmptyState
        :title="args.title"
        :description="args.description"
    >
      <SButton color="primary" :icon="PlusIcon">New action</SButton>
    </SEmptyState>`,
});

export const TextInput = Template.bind({});
TextInput.args = {
    title: 'No se encontraron reportes',
    description: 'No hay reportes creados, pero puedes crear uno a continuación'
};
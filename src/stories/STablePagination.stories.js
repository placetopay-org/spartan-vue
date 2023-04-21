import { STablePagination } from "../index";

export default {
    title: "Components/STablePagination",
    component: STablePagination,
    args: {
        currentPage: "1",
        lastPage: "12",
        simple: false,
    },
    argTypes: {
        currentPage: {
            control: { type: "number" },
        },
        lastPage: {
            control: { type: "number" },
        },
        simple: {
            control: { type: "boolean" },
        },
    },
};

const Template = ( args ) => ({
    components: { STablePagination },
    setup() {
        return { args };
    },
    template: `
    <STablePagination
        :current-page="1"
        :last-page="12"
        :simple="args.simple"
    >
      <p> {{ args.info }} </p>
    </STablePagination>
  `,
});

export const Pagination = Template.bind({});

Pagination.args = {
    currentPage: 1,
    lastPage: 12,
    info: "Mostrando 01 a 10 de 14 resultados",
}

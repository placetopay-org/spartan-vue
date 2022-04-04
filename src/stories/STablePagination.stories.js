import { STablePagination } from "../index";

export default {
    title: "Components/STablePagination",
    component: STablePagination,
    args: {
        currentPage: "1",
        lastPage: "12",
    },
    argTypes: {
        currentPage: {
            control: { type: "number" },
        },
        lastPage: {
            control: { type: "number" },
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
    >
    </STablePagination>
  `,
});

export const Pagination = Template.bind({});

Pagination.args = {
    currentPage: 1,
    lastPage: 12,
}
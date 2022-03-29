import { SButtonTitle} from "../index"

export default {
    title: "Components/SButtonTitle",
    component: SButtonTitle,
};

const Template = (args) => ({
    components: { SButtonTitle },
    setup() {
        return { args };
    },
    template: `
        <SButtonTitle
            :href="args.href"
            :has-icon="args.hasIcon"
        >
            {{ args.label }}
        </SButtonTitle>`,
});
export const Title = Template.bind({});
Title.args = {
    href: '#',
    hasIcon: false,
    label: 'Reportes'
};

export const TitleWithIcon = Template.bind({});
TitleWithIcon.args = {
    href: '#',
    hasIcon: true,
    label: 'Reportes'
};
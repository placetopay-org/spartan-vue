import { SDropdown, SDropdownMenu, SDropdownMenuSection, SDropdownMenuItem } from "../index.js";

export default {
    title: "Components/SDropdown",
    component: SDropdown,
    subcomponents: { SDropdownMenuItem }
};

const Template = (args) => ({
    components: { SDropdown, SDropdownMenu, SDropdownMenuSection, SDropdownMenuItem },
    setup() {
        return { args };
    },
    template: `
    <SDropdown
        :label="args.label"
    >
        <SDropdownMenu>
            <SDropdownMenuSection
                v-for="section in args.sections"
            >
                <SDropdownMenuItem
                    v-for="item in section"
                    :href="item.href"
                >
                    {{ item.name }}
                </SDropdownMenuItem>
            </SDropdownMenuSection>
        </SDropdownMenu>
    </SDropdown>
  `,
});

export const Dropdown = Template.bind({});
Dropdown.args = {
    label: 'Options',
    sections: [
        [
            { name: 'Edit', href: '#'},
            { name: 'Duplicate', href: '#'},
        ],
        [
            { name: 'Archive', href: '#'},
            { name: 'Move', href: '#'},
        ],
        [
            { name: 'Share', href: '#'},
            { name: 'Add to favorites', href: '#'},
        ],
        [
            { name: 'Delete', href: '#'},
        ]
    ]
};
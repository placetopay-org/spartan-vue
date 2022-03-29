import { SInputSearch, SDropdown, SDropdownMenu, SDropdownMenuSection, SDropdownMenuItem } from "../index.js";
import { SearchIcon } from '@heroicons/vue/outline'

export default {
    title: "Components/SInputSearch",
    component: SInputSearch,
};

const Template = (args) => ({
    components: { SInputSearch, SDropdown, SDropdownMenu, SDropdownMenuSection, SDropdownMenuItem },
    setup() {
        return { args, SearchIcon };
    },
    template: `
        <SInputSearch
            :dropdown="args.dropdown.enabled"
            :input-args="args.input"
            :btn-icon="args.button.icon"
            :btn-label="args.button.label"
        >
            <SDropdown
                v-if="args.dropdown.enabled"
                :search="true"
                :label="args.dropdown.label"
            >
                <SDropdownMenu>
                    <SDropdownMenuSection>
                        <SDropdownMenuItem
                            v-for="item in args.dropdown.items"
                            :href="item.href"
                        >
                          {{ item.name }}
                        </SDropdownMenuItem>  
                    </SDropdownMenuSection>
                </SDropdownMenu>
            </SDropdown>
        </SInputSearch>
      `,
});

export const Primary = Template.bind({});
Primary.args = {
    dropdown: {
        enabled: false,
    },
    input: {
        placeholder: "John Doe",
        type: "text",
        id: "field_name",
        name: "field_name",
    },
    button: {
        label: 'Search',
        icon: SearchIcon
    }
};

export const PrimaryWithDropdown = Template.bind({});
PrimaryWithDropdown.args = {
    dropdown: {
        enabled: true,
        label: 'Options',
        items: [
            { name: 'Edit', href: '#'},
            { name: 'Duplicate', href: '#'},
            { name: 'Archive', href: '#'},
            { name: 'Move', href: '#'},
        ]
    },
    input: {
        placeholder: "John Doe",
        type: "text",
        id: "field_name",
        name: "field_name",
    },
    button: {
        label: 'Search',
        icon: SearchIcon
    }
};
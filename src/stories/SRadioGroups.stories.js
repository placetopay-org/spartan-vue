import { SRadioGroups } from "../index";

export default {
  title: "Components/SRadioGroups",
  argTypes: {
    
  },
  component: SRadioGroups,
};


const Template = (args) => ({
    components: { SRadioGroups },
    setup() {
      return { args };
    },
    template: `
      <SRadioGroups>
        
      </SRadioGroups>
      `,
  });
  
  export const Simple = Template.bind({});
  
  Simple.args = {
    id: "create-sites",
    label: "Create Sites",
    description: false,
  };
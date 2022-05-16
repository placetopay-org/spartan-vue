import {
  SDescriptionItemLabel,
  SDescriptionItem,
  SDescriptionItemValue,
} from "../index";

export default {
  title: "Components/SDescriptionItem",
  component: SDescriptionItem,
  subcomponents: {
    SDescriptionItemLabel,
  },
};

const Template = (args) => ({
  components: {
    SDescriptionItem,
    SDescriptionItemLabel,
    SDescriptionItemValue,
  },
  setup() {
    return { args };
  },
  template: `  
    <SDescriptionItem>
      <SDescriptionItemLabel>Nombre</SDescriptionItemLabel>
      <SDescriptionItemValue>Jhon Doe</SDescriptionItemValue>
    </SDescriptionItem>
  `,
});

export const Default = Template.bind({});
Default.args = {};

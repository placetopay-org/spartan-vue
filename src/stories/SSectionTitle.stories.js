import { SSectionTitle, SSectionDescription } from "../index";

export default {
  title: "Components/SSectionTitle",
  component: SSectionTitle,
  subcomponents: {
    SSectionDescription,
  },
};

const Template = (args) => ({
  components: {
    SSectionTitle,
    SSectionDescription,
  },
  setup() {
    return { args };
  },
  template: `  
    <div>
      <SSectionTitle>Administrador de sitios</SSectionTitle>
      <SSectionDescription>Tiene acceso a todas la funcionalidades de los sitios asignados</SSectionDescription>
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {};

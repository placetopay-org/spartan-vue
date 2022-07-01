import {
  SInput,
  SButton,
  SCard,
  SSelect,
  SSectionTitle,
  SSectionDescription,
} from "../index";

export default {
  title: "Examples/SFormExamples",
  component: SInput,
  decorators: [
    () => ({
      template: '<div class="flex bg-gray-100 py-12 px-8"><story /></div>',
    }),
  ],
};

const Template = (args) => ({
  components: {
    SInput,
    SButton,
    SCard,
    SSelect,
    SSectionTitle,
    SSectionDescription,
  },
  setup() {
    return { args };
  },
  template: `
  <SCard class="max-w-2xl w-full mx-auto">  
    <div class="grid gap-y-6 gap-x-4 grid-cols-6">
      <div class="col-span-6">
          <SSectionTitle>{{ args.title }}</SSectionTitle>
          <SSectionDescription>{{ args.description }}</SSectionDescription>
      </div>

      <div class="sm:col-span-3">
        <SInput label="Name" placeholder="Jhon"></SInput>
      </div>
      
      <div class="sm:col-span-3">
        <SInput label="Last Name" placeholder="Doe"></SInput>
      </div>

      <div class="sm:col-span-4">
        <SInput type="email" label="Email" placeholder="jhon@example.com"></SInput>
      </div>

      <div class="sm:col-span-3">
        <SSelect label="Country" :options="[{value:'', label:'Select your country'}, {value:'CO', label:'Colombia'},{value:'EC', label:'Ecuador'}, {value:'PE', label:'Peru'}]"></SSelect>
      </div>

      <div class="sm:col-span-6">
        <SInput as="textarea" rows="4" label="Bio"></SInput>
      </div>

      <div class="col-span-6 flex justify-end">
        <SButton color="primary">Continue</SButton>
      </div>
    </div>
</SCard>
  `,
});

export const Simple = Template.bind({});

Simple.args = {
  max: false,
  title: "Personal Information",
  description: "Use a permanent address where you can receive mail.",
  fields: [
    { label: "Name" },
    { label: "Email" },
    { label: "Phone" },
    { label: "Role" },
  ],
  button: {
    label: "Send",
  },
};

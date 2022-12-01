import {defineComponent} from "vue";

export default defineComponent({
  template: `
    <div class="flex flex-start gap-6 border-b border-gray-300 pb-4">
      <slot/>
    </div>
  `
})


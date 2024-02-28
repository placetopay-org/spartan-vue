import VForm from './VForm.vue';
import VFooter from './VFooter.vue';
import AccountsDemo from './AccountsDemo.vue';
import { createDefault } from '../../../helpers';

export default {
    title: 'examples/AccountsDemo',
};

export const FormStory = createDefault({
    design: 'https://www.figma.com/file/L7Q1hYhhz42H3zHPngVnbw/Accounts-V2?type=design&node-id=408-1756',
    containerClass: 'bg-black/80 w-[958px] h-[600px] flex justify-center items-center',
    components: { VForm },
    args: {
        modelValue: true,
    },
    template: `<div class="h-full px-16 bg-white"><VForm v-bind="args" v-model="args.modelValue"/></div>`,
    transform: () => `<script setup lang="ts">
    import { ref } from 'vue';
    import { SPlacetopayLogo, STab, STabItem, SInputBlock, SButton } from '../../../';
    import { computed } from 'vue';
    
    const tab = ref('Ingresar');
    const atLogin = computed(() => tab.value === 'Ingresar');
    </script>
    
    <template>
        <form class="flex h-full w-full max-w-sm flex-col items-center justify-center bg-white">
            <SPlacetopayLogo class="mb-8" :height="32" />
    
            <STab v-model="tab" full class="mb-6 w-full">
                <STabItem>Ingresar</STabItem>
                <STabItem>Soy nuevo</STabItem>
            </STab>
    
            <div class="flex w-full flex-col gap-6">
                <SInputBlock v-if="!atLogin" label="Nombre" />
                <SInputBlock label="Correo electrónico" placeholder="tuemail@ejemplo.com" />
                <SInputBlock label="Contraseña" type="password" />
                <SInputBlock v-if="!atLogin" label="Confirmar la contraseña" type="password" />
    
                <a class="text-center text-xs font-medium text-gray-400">¿Olvidaste tu contraseña?</a>
                <SButton class="w-full">{{ atLogin ? 'Ingresar' : 'Registrarse' }}</SButton>
    
                <p class="text-xs font-normal text-gray-400">
                    Al continuar acepto las políticas aplicables para el tratamiento de mis datos personales según la
                    jurisdicción local del responsable y de
                    <strong class="font-semibold text-gray-500">Evertec PlacetoPay</strong> en su calidad de encargado.
                </p>
            </div>
        </form>
    </template>
    `
});

export const FooterStory = createDefault({
    design: 'https://www.figma.com/file/L7Q1hYhhz42H3zHPngVnbw/Accounts-V2?type=design&node-id=408-1756',
    containerClass: 'bg-black/80 w-[958px] h-[600px] flex justify-center items-center',
    components: { VFooter },
    args: {
        modelValue: true,
    },
    template: `<div class="w-full py-6 bg-white"><VFooter v-bind="args" v-model="args.modelValue"/></div>`,
    transform: () => `<script setup lang="ts">
    import { SDropdown, SDropdownItem } from '../../../';
    import { ChatBubbleBottomCenterTextIcon } from '@heroicons/vue/24/outline';
    </script>
    
    <template>
        <footer class="flex w-full justify-center gap-8 bg-white text-gray-400">
            <span>© Placetopay</span>
    
            <SDropdown placement="top-start">
                <template #reference>
                    <button class="flex items-center gap-1.5">
                        <ChatBubbleBottomCenterTextIcon class="h-4 w-4" />
                        Idioma
                    </button>
                </template>
    
                <div class="text-sm font-medium text-gray-800 w-36">
                    <SDropdownItem>Español</SDropdownItem>
                    <SDropdownItem>Inglés</SDropdownItem>
                </div>
            </SDropdown>
        </footer>
    </template>
    `
});

export const PageStory = createDefault({
    design: 'https://www.figma.com/file/L7Q1hYhhz42H3zHPngVnbw/Accounts-V2?type=design&node-id=408-1756',
    containerClass: 'h-full w-full',
    components: { AccountsDemo },
    args: {},
    template: `<AccountsDemo />`,
    transform: () => `<script setup lang="ts">
    import VForm from './VForm.vue';
    import VFooter from './VFooter.vue';
    </script>
    
    <template>
        <div class="flex h-full w-full flex-1">
            <div class="relative hidden w-0 flex-1 lg:block">
                <img class="absolute inset-0 h-full w-full object-cover" src="./bento-grid.png" alt="bento grid">
            </div>
    
            <section class="px-4 sm:px-16 flex flex-col justify-center items-center bg-white flex-1 relative">
                <div class="mx-auto w-full max-w-sm lg:w-96">
                    <VForm />
                </div>
    
                <VFooter class="absolute bottom-0 py-6" /> 
            </section>
        </div>
    </template>
    `
});

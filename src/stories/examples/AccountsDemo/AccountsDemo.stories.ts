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
    import { SPlacetopayLogo, STab, STabItem, SInput, SInputBlock, SButton, SInputOTP, SInputOTPItem } from '@placetopay/spartan-vue';
    import { computed } from 'vue';
    import { ArrowLeftIcon } from '@heroicons/vue/20/solid';
    import { LockClosedIcon, KeyIcon } from '@heroicons/vue/24/outline';
    
    const props = withDefaults(
        defineProps<{
            routeParam: string;
        }>(),
        {
            routeParam: 'login',
        },
    );
    
    const route = ref(props.routeParam);
    const push = (newRoute?: string) => {
        if (!newRoute) return;
        route.value = newRoute;
    };
    
    const AuthRoutes = ['login', 'signup'];
    
    const atLogin = computed(() => route.value === 'login');
    
    const otp = ref('');
    const recoveryCode = ref('');
    </script>
    
    <template>
        <form class="flex h-full w-full max-w-sm flex-col items-center justify-center bg-white">
            <SPlacetopayLogo class="mb-8" :height="32" />
    
            <template v-if="AuthRoutes.includes(route)">
                <STab :model-value="route" @update:model-value="(newRoute) => push(newRoute)" full class="mb-6 w-full">
                    <STabItem path="login">Ingresar</STabItem>
                    <STabItem path="signup">Soy nuevo</STabItem>
                </STab>
    
                <div class="flex w-full flex-col gap-6">
                    <SInputBlock v-if="!atLogin" label="Nombre" />
                    <SInputBlock label="Correo electrónico" placeholder="tuemail@ejemplo.com" />
                    <SInputBlock label="Contraseña" type="password" />
                    <SInputBlock v-if="!atLogin" label="Confirmar la contraseña" type="password" />
    
                    <button
                        type="button"
                        @click="push('restore-password')"
                        class="text-center text-xs font-medium text-gray-400"
                    >
                        ¿Olvidaste tu contraseña?
                    </button>
                    <SButton class="w-full">{{ atLogin ? 'Ingresar' : 'Registrarse' }}</SButton>
    
                    <p class="text-xs font-normal text-gray-400">
                        Al continuar acepto las políticas aplicables para el tratamiento de mis datos personales según la
                        jurisdicción local del responsable y de
                        <strong class="font-semibold text-gray-500">Evertec PlacetoPay</strong> en su calidad de encargado.
                    </p>
                </div>
            </template>
    
            <template v-if="route === 'restore-password'">
                <h2 class="mb-1.5 font-semibold text-gray-900">Restablecer contraseña</h2>
                <p class="mb-6 text-center text-xs text-gray-600">
                    Ingrese el correo electrónico asociado con su cuenta y le enviaremos un enlace para restablecer su
                    contraseña.
                </p>
    
                <SInputBlock class="mb-6 w-full" label="Correo electrónico" placeholder="tuemail@ejemplo.com" />
    
                <div class="flex w-full">
                    <SButton class="mr-4 w-fit" variant="secondary" :left-icon="ArrowLeftIcon" @click="push('login')">
                        Volver
                    </SButton>
                    <SButton class="flex-1" @click="push('otp')">Envíar link</SButton>
                </div>
            </template>
    
            <template v-if="route === 'otp'">
                <div class="border border-gray-100 rounded-full p-3 mb-6">
                    <LockClosedIcon class="mx-auto h-6 w-6 text-gray-900" />
                </div>
                <h2 class="mb-1.5 font-semibold text-gray-900">Código de autenticación</h2>
                <p class="mb-6 text-center text-xs text-gray-600">
                    Abra su aplicación de autenticación de dos factores (TOTP) o la extensión del navegador para ver su
                    código de autenticación.
                </p>
    
                <SInputOTP v-model="otp" class="mb-6">
                    <SInputOTPItem />
                    <SInputOTPItem />
                    <SInputOTPItem class="mr-2.5" />
    
                    <SInputOTPItem />
                    <SInputOTPItem />
                    <SInputOTPItem />
                </SInputOTP>
    
                <div class="flex w-full">
                    <SButton class="mr-4 w-fit" variant="secondary" :left-icon="ArrowLeftIcon" @click="push('login')">
                        Volver
                    </SButton>
                    <SButton class="flex-1" @click="push('recovery-code')">Verificar</SButton>
                </div>
            </template>
    
            <template v-if="route === 'recovery-code'">
                <div class="border border-gray-100 rounded-full p-3 mb-6">
                    <KeyIcon class="mx-auto h-6 w-6 text-gray-900" />
                </div>
                <h2 class="mb-1.5 font-semibold text-gray-900">Código de recuperación</h2>
                <p class="mb-6 text-center text-xs text-gray-600">
                    Si no puede acceder a su dispositivo móvil, ingrese uno de sus códigos de recuperación para verificar su identidad.
                </p>
    
                <SInput v-model="recoveryCode" type="password" class="w-full mb-6" />
    
                <div class="flex w-full">
                    <SButton class="mr-4 w-fit" variant="secondary" :left-icon="ArrowLeftIcon" @click="push('login')">
                        Volver
                    </SButton>
                    <SButton class="flex-1" @click="push('recovery-code')">Verificar</SButton>
                </div>
            </template>
        </form>
    </template>`
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
    import { SDropdown, SDropdownItem } from '@placetopay/spartan-vue';
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

export const LoginPageStory = createDefault({
    design: 'https://www.figma.com/file/L7Q1hYhhz42H3zHPngVnbw/Accounts-V2?type=design&node-id=408-1756',
    containerClass: 'h-full w-full',
    components: { AccountsDemo },
    args: {},
    template: `<AccountsDemo route="login" />`,
    transform: () => `<script setup lang="ts">
    import VForm from './VForm.vue';
    import VFooter from './VFooter.vue';
    </script>
    
    <template>
        <div class="flex h-full w-full flex-1">
            <!-- Bento grid -->
    
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

export const RegisterPageStory = createDefault({
    design: 'https://www.figma.com/file/L7Q1hYhhz42H3zHPngVnbw/Accounts-V2?type=design&node-id=408-1756',
    containerClass: 'h-full w-full',
    components: { AccountsDemo },
    args: {},
    template: `<AccountsDemo route="signup" />`,
    transform: () => `<script setup lang="ts">
    import VForm from './VForm.vue';
    import VFooter from './VFooter.vue';
    </script>
    
    <template>
        <div class="flex h-full w-full flex-1">
            <!-- Bento grid -->
    
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

export const RestorePasswordPageStory = createDefault({
    design: 'https://www.figma.com/file/L7Q1hYhhz42H3zHPngVnbw/Accounts-V2?type=design&node-id=408-1756',
    containerClass: 'h-full w-full',
    components: { AccountsDemo },
    args: {},
    template: `<AccountsDemo route="restore-password" />`,
    transform: () => `<script setup lang="ts">
    import VForm from './VForm.vue';
    import VFooter from './VFooter.vue';
    </script>
    
    <template>
        <div class="flex h-full w-full flex-1">
            <!-- Bento grid -->
    
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

export const OTPPageStory = createDefault({
    design: 'https://www.figma.com/file/L7Q1hYhhz42H3zHPngVnbw/Accounts-V2?type=design&node-id=408-1756',
    containerClass: 'h-full w-full',
    components: { AccountsDemo },
    args: {},
    template: `<AccountsDemo route="otp" />`,
    transform: () => `<script setup lang="ts">
    import VForm from './VForm.vue';
    import VFooter from './VFooter.vue';
    </script>
    
    <template>
        <div class="flex h-full w-full flex-1">
            <!-- Bento grid -->
    
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

export const RecoveryCodePageStory = createDefault({
    design: 'https://www.figma.com/file/L7Q1hYhhz42H3zHPngVnbw/Accounts-V2?type=design&node-id=408-1756',
    containerClass: 'h-full w-full',
    components: { AccountsDemo },
    args: {},
    template: `<AccountsDemo route="recovery-code" />`,
    transform: () => `<script setup lang="ts">
    import VForm from './VForm.vue';
    import VFooter from './VFooter.vue';
    </script>
    
    <template>
        <div class="flex h-full w-full flex-1">
            <!-- Bento grid -->
    
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
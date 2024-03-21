import LoginPage from './LoginPage.vue';
import AuthPage from './AuthPage.vue';
import { LinkButton } from '@internal';
import { createDefault } from '@/helpers';

export default {
    title: 'examples/AccountsDemo/pages',
};

export const Login = createDefault({
    design: 'https://www.figma.com/file/L7Q1hYhhz42H3zHPngVnbw/Accounts-V2?type=design&node-id=408-1756',
    containerClass: 'h-full w-full',
    components: { LinkButton, LoginPage },
    args: { buttonPreviewMode: true },
    template: `<LinkButton :mode="args.buttonPreviewMode" example="accountsdemo-pages" name="login">
        <LoginPage route="login" />
    </LinkButton>`,
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

export const LoginBento = createDefault({
    design: 'https://www.figma.com/file/L7Q1hYhhz42H3zHPngVnbw/Accounts-V2?type=design&node-id=408-1756',
    containerClass: 'h-full w-full',
    components: { LinkButton, LoginPage },
    args: { buttonPreviewMode: true },
    template: `<LinkButton :mode="args.buttonPreviewMode" example="accountsdemo-pages" name="login-bento">
        <LoginPage route="login" bentoVariant />
    </LinkButton>`,
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

export const Register = createDefault({
    design: 'https://www.figma.com/file/L7Q1hYhhz42H3zHPngVnbw/Accounts-V2?type=design&node-id=408-1756',
    containerClass: 'h-full w-full',
    components: { LinkButton, LoginPage },
    args: { buttonPreviewMode: true },
    template: `<LinkButton :mode="args.buttonPreviewMode" example="accountsdemo-pages" name="register">
        <LoginPage route="signup" />
    </LinkButton>`,
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
    components: { LoginPage },
    args: {},
    template: `<LoginPage route="restore-password" />`,
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
    components: { LoginPage },
    args: {},
    template: `<LoginPage route="otp" />`,
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
    components: { LoginPage },
    args: {},
    template: `<LoginPage route="recovery-code" />`,
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

export const AuthPageStory = createDefault({
    design: 'https://www.figma.com/file/L7Q1hYhhz42H3zHPngVnbw/Accounts-V2?type=design&node-id=408-1756',
    containerClass: 'h-full w-full',
    components: { LinkButton, AuthPage },
    args: { buttonPreviewMode: true },
    template: `<LinkButton :mode="args.buttonPreviewMode" example="accounts-pages" name="page-story">
    <AuthPage />
    </LinkButton>`,
    transform: () => `---`,
});
import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import { HomeIcon } from '@placetopay/iconsax-vue/linear';
import SButton from './SButton.vue';

describe('SButton', () => {
    test('Can be rendered', () => {
        render(SButton);
        const button = screen.getByRole('button');

        expect(button).toBeInTheDocument();
    });

    test('Can be rendered with slot content', () => {
        render(SButton, { slots: { default: 'Click me' } });

        screen.getByRole('button', { name: 'Click me' });
    });

    test('Can be polymorphic', () => {
        render(SButton, { props: { as: 'a', href: 'test.com' }, slots: { default: 'As link' } });
        render(SButton, { slots: { default: 'Without as' } });

        expect(screen.getByRole('link', { name: 'As link' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Without as' })).toBeInTheDocument();
    });

    describe('Variants', () => {
        test('Applies primary variant classes by default', () => {
            render(SButton, { slots: { default: 'Primary' } });
            const button = screen.getByRole('button', { name: 'Primary' });

            expect(button.className).toContain('bg-spartan-primary-600');
            expect(button.className).toContain('text-white');
        });

        test('Applies secondary variant classes', () => {
            render(SButton, { props: { variant: 'secondary' }, slots: { default: 'Secondary' } });
            const button = screen.getByRole('button', { name: 'Secondary' });

            expect(button.className).toContain('bg-white');
            expect(button.className).toContain('text-gray-900');
        });

        test('Applies danger variant classes', () => {
            render(SButton, { props: { variant: 'danger' }, slots: { default: 'Danger' } });
            const button = screen.getByRole('button', { name: 'Danger' });

            expect(button.className).toContain('bg-red-500');
            expect(button.className).toContain('text-white');
        });

        test('Applies outline variant classes', () => {
            render(SButton, { props: { variant: 'outline' }, slots: { default: 'Outline' } });
            const button = screen.getByRole('button', { name: 'Outline' });

            expect(button.className).toContain('text-spartan-primary-600');
            expect(button.className).toContain('border-spartan-primary-600');
        });

        test('Applies link variant classes', () => {
            render(SButton, { props: { variant: 'link' }, slots: { default: 'Link' } });
            const button = screen.getByRole('button', { name: 'Link' });

            expect(button.className).toContain('text-spartan-primary-600');
            expect(button.className).toContain('bg-transparent');
            expect(button.className).toContain('border-transparent');
        });
    });

    describe('Sizes', () => {
        test('Applies md size classes by default', () => {
            render(SButton, { slots: { default: 'Medium' } });
            const button = screen.getByRole('button', { name: 'Medium' });

            expect(button.className).toContain('h-9');
            expect(button.className).toContain('text-sm');
        });

        test('Applies sm size classes', () => {
            render(SButton, { props: { size: 'sm' }, slots: { default: 'Small' } });
            const button = screen.getByRole('button', { name: 'Small' });

            expect(button.className).toContain('h-7');
            expect(button.className).toContain('text-xs');
        });

        test('Applies lg size classes', () => {
            render(SButton, { props: { size: 'lg' }, slots: { default: 'Large' } });
            const button = screen.getByRole('button', { name: 'Large' });

            expect(button.className).toContain('h-11');
            expect(button.className).toContain('text-base');
        });

        test('Applies noText size classes when no slot content', () => {
            render(SButton, { props: { size: 'md' } });
            const button = screen.getByRole('button');

            expect(button.className).toContain('h-9');
            expect(button.className).toContain('p-2');
            expect(button.className).not.toContain('text-sm');
        });
    });

    describe('Disabled', () => {
        test('Applies disabled attribute and classes', () => {
            render(SButton, { props: { disabled: true }, slots: { default: 'Disabled' } });
            const button = screen.getByRole('button', { name: 'Disabled' });

            expect(button).toBeDisabled();
            expect(button.className).toContain('opacity-50');
            expect(button.className).toContain('pointer-events-none');
        });

        test('Is not disabled by default', () => {
            render(SButton, { slots: { default: 'Enabled' } });
            const button = screen.getByRole('button', { name: 'Enabled' });

            expect(button).not.toBeDisabled();
        });
    });

    describe('Loading', () => {
        test('Disables button when loading', () => {
            render(SButton, { props: { loading: true }, slots: { default: 'Loading' } });
            const button = screen.getByRole('button', { name: 'Loading' });

            expect(button).toBeDisabled();
        });

        test('Applies transparent text classes when loading', () => {
            render(SButton, { props: { loading: true }, slots: { default: 'Loading' } });
            const button = screen.getByRole('button', { name: 'Loading' });

            expect(button.className).toContain('text-transparent');
            expect(button.className).toContain('pointer-events-none');
        });

        test('Renders spinner when loading', () => {
            const { container } = render(SButton, { props: { loading: true }, slots: { default: 'Loading' } });
            const spinner = container.querySelector('svg.animate-spin');

            expect(spinner).toBeInTheDocument();
        });

        test('Does not render spinner when not loading', () => {
            const { container } = render(SButton, { slots: { default: 'Not loading' } });
            const spinner = container.querySelector('svg.animate-spin');

            expect(spinner).not.toBeInTheDocument();
        });
    });

    describe('Rounded', () => {
        test('Applies rounded-lg by default (both)', () => {
            render(SButton, { slots: { default: 'Rounded' } });
            const button = screen.getByRole('button', { name: 'Rounded' });

            expect(button.className).toContain('rounded-lg');
        });

        test('Applies rounded-full when full', () => {
            render(SButton, { props: { rounded: 'full' }, slots: { default: 'Full' } });
            const button = screen.getByRole('button', { name: 'Full' });

            expect(button.className).toContain('rounded-full');
        });

        test('Applies rounded-l-lg when left', () => {
            render(SButton, { props: { rounded: 'left' }, slots: { default: 'Left' } });
            const button = screen.getByRole('button', { name: 'Left' });

            expect(button.className).toContain('rounded-l-lg');
        });

        test('Applies rounded-r-lg when right', () => {
            render(SButton, { props: { rounded: 'right' }, slots: { default: 'Right' } });
            const button = screen.getByRole('button', { name: 'Right' });

            expect(button.className).toContain('rounded-r-lg');
        });

        test('Applies no rounded class when none', () => {
            render(SButton, { props: { rounded: 'none' }, slots: { default: 'None' } });
            const button = screen.getByRole('button', { name: 'None' });

            expect(button.className).not.toContain('rounded-lg');
            expect(button.className).not.toContain('rounded-full');
            expect(button.className).not.toContain('rounded-l-lg');
            expect(button.className).not.toContain('rounded-r-lg');
        });
    });

    describe('Type', () => {
        test('Defaults to type="button"', () => {
            render(SButton, { slots: { default: 'Default type' } });
            const button = screen.getByRole('button', { name: 'Default type' });

            expect(button).toHaveAttribute('type', 'button');
        });

        test('Accepts type="submit"', () => {
            render(SButton, { props: { type: 'submit' }, slots: { default: 'Submit' } });
            const button = screen.getByRole('button', { name: 'Submit' });

            expect(button).toHaveAttribute('type', 'submit');
        });

        test('Does not set type when as is not button', () => {
            render(SButton, { props: { as: 'a', href: '#' }, slots: { default: 'Link' } });
            const link = screen.getByRole('link', { name: 'Link' });

            expect(link).not.toHaveAttribute('type');
        });
    });

    describe('Icons', () => {
        test('Renders leftIcon with correct classes', () => {
            render(SButton, { props: { leftIcon: HomeIcon }, slots: { default: 'With left icon' } });
            const button = screen.getByRole('button', { name: 'With left icon' });

            expect(button.firstElementChild).toHaveClass('h-5 w-5 -ml-0.5');
        });

        test('Renders icon prop as leftIcon (deprecated)', () => {
            render(SButton, { props: { icon: HomeIcon }, slots: { default: 'With icon' } });
            const button = screen.getByRole('button', { name: 'With icon' });

            expect(button.firstElementChild).toHaveClass('h-5 w-5 -ml-0.5');
        });

        test('Renders rightIcon with correct classes', () => {
            render(SButton, { props: { rightIcon: HomeIcon }, slots: { default: 'With right icon' } });
            const button = screen.getByRole('button', { name: 'With right icon' });
            const lastIcon = button.lastElementChild;

            expect(lastIcon).toBeInTheDocument();
            expect(lastIcon).toHaveClass('h-5 w-5 -mr-0.5');
        });

        test('Does not add margin classes for icon-only button', () => {
            render(SButton, { props: { leftIcon: HomeIcon } });
            const button = screen.getByRole('button');
            const icon = button.firstElementChild;

            expect(icon).toHaveClass('h-5 w-5');
            expect(icon).not.toHaveClass('-ml-0.5');
        });
    });
});

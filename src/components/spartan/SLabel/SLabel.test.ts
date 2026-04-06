import { test, describe } from 'vitest';
import SLabel from './SLabel.vue';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';

describe('SLabel', () => {
    describe('Rendering', () => {
        test('renders as a label element', () => {
            render(SLabel, { slots: { default: 'Email address' } });

            const label = screen.getByText('Email address');
            expect(label).toBeInTheDocument();
            expect(label.tagName).toBe('LABEL');
        });

        test('renders slot content', () => {
            render(SLabel, { slots: { default: 'Username' } });

            expect(screen.getByText('Username')).toBeInTheDocument();
        });

        test('renders HTML content in slot', () => {
            render(SLabel, { slots: { default: '<span>Rich Label</span>' } });

            expect(screen.getByText('Rich Label')).toBeInTheDocument();
        });

        test('renders empty when no slot content is provided', () => {
            const { container } = render(SLabel);

            const label = container.querySelector('label');
            expect(label).toBeInTheDocument();
            expect(label!.textContent).toBe('');
        });
    });

    describe('Props', () => {
        test('applies the for attribute to associate with an input', () => {
            render(SLabel, { props: { for: 'email-input' }, slots: { default: 'Email' } });

            const label = screen.getByText('Email');
            expect(label).toHaveAttribute('for', 'email-input');
        });

        test('applies sr-only class when srOnly is true', () => {
            render(SLabel, { props: { srOnly: true }, slots: { default: 'Hidden Label' } });

            const label = screen.getByText('Hidden Label');
            expect(label).toHaveClass('sr-only');
        });

        test('does not apply sr-only class by default', () => {
            render(SLabel, { slots: { default: 'Visible Label' } });

            const label = screen.getByText('Visible Label');
            expect(label).not.toHaveClass('sr-only');
        });
    });

    describe('Styles', () => {
        test('applies default base classes', () => {
            render(SLabel, { slots: { default: 'Label' } });

            const label = screen.getByText('Label');
            expect(label).toHaveClass('mb-1');
            expect(label).toHaveClass('block');
            expect(label).toHaveClass('text-sm');
            expect(label).toHaveClass('font-medium');
            expect(label).toHaveClass('text-gray-700');
        });

        test('includes dark mode class', () => {
            render(SLabel, { slots: { default: 'Label' } });

            const label = screen.getByText('Label');
            expect(label).toHaveClass('dark:text-gray-200');
        });

        test('merges custom classes with defaults', () => {
            render(SLabel, { props: { class: 'mt-4 mb-2' }, slots: { default: 'Label' } });

            const label = screen.getByText('Label');
            expect(label).toHaveClass('mt-4');
            expect(label).toHaveClass('mb-2');
            expect(label).toHaveClass('text-sm');
            expect(label).toHaveClass('font-medium');
        });

        test('allows overriding default text color via tailwind-merge', () => {
            render(SLabel, { props: { class: 'text-red-500' }, slots: { default: 'Label' } });

            const label = screen.getByText('Label');
            expect(label).toHaveClass('text-red-500');
            expect(label).not.toHaveClass('text-gray-700');
        });

        test('allows overriding default font weight via tailwind-merge', () => {
            render(SLabel, { props: { class: 'font-bold' }, slots: { default: 'Label' } });

            const label = screen.getByText('Label');
            expect(label).toHaveClass('font-bold');
            expect(label).not.toHaveClass('font-medium');
        });

        test('allows overriding default text size via tailwind-merge', () => {
            render(SLabel, { props: { class: 'text-lg' }, slots: { default: 'Label' } });

            const label = screen.getByText('Label');
            expect(label).toHaveClass('text-lg');
            expect(label).not.toHaveClass('text-sm');
        });
    });

    describe('Data attributes', () => {
        test('has data-s-label attribute', () => {
            render(SLabel, { slots: { default: 'Label' } });

            const label = screen.getByText('Label');
            expect(label).toHaveAttribute('data-s-label');
        });
    });
});

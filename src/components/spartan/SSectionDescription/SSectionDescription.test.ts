import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SSectionDescription from './SSectionDescription.vue';

describe('SSectionDescription', () => {
    describe('Rendering', () => {
        test('renders as a p element by default', () => {
            render(SSectionDescription, { slots: { default: 'A description' } });

            const element = screen.getByText('A description');
            expect(element).toBeInTheDocument();
            expect(element.tagName).toBe('P');
        });

        test('renders slot content', () => {
            render(SSectionDescription, { slots: { default: 'Some description text' } });

            expect(screen.getByText('Some description text')).toBeInTheDocument();
        });

        test('renders HTML content in slot', () => {
            render(SSectionDescription, { slots: { default: '<strong>Bold text</strong>' } });

            expect(screen.getByText('Bold text')).toBeInTheDocument();
        });

        test('renders empty when no slot content is provided', () => {
            const { container } = render(SSectionDescription);

            const element = container.querySelector('p');
            expect(element).toBeInTheDocument();
            expect(element!.textContent).toBe('');
        });
    });

    describe('Props', () => {
        test('renders as span when as prop is span', () => {
            render(SSectionDescription, { props: { as: 'span' }, slots: { default: 'Description' } });

            const element = screen.getByText('Description');
            expect(element.tagName).toBe('SPAN');
        });

        test('renders as div when as prop is div', () => {
            render(SSectionDescription, { props: { as: 'div' }, slots: { default: 'Description' } });

            const element = screen.getByText('Description');
            expect(element.tagName).toBe('DIV');
        });
    });

    describe('Styles', () => {
        test('applies default base classes', () => {
            render(SSectionDescription, { slots: { default: 'Description' } });

            const element = screen.getByText('Description');
            expect(element).toHaveClass('text-sm');
            expect(element).toHaveClass('font-normal');
            expect(element).toHaveClass('text-gray-500');
        });

        test('includes dark mode class', () => {
            render(SSectionDescription, { slots: { default: 'Description' } });

            const element = screen.getByText('Description');
            expect(element).toHaveClass('dark:text-gray-400');
        });

        test('merges custom classes with defaults', () => {
            render(SSectionDescription, { props: { class: 'mt-4 mb-2' }, slots: { default: 'Description' } });

            const element = screen.getByText('Description');
            expect(element).toHaveClass('mt-4');
            expect(element).toHaveClass('mb-2');
            expect(element).toHaveClass('text-sm');
            expect(element).toHaveClass('font-normal');
        });

        test('allows overriding default text color via tailwind-merge', () => {
            render(SSectionDescription, { props: { class: 'text-red-500' }, slots: { default: 'Description' } });

            const element = screen.getByText('Description');
            expect(element).toHaveClass('text-red-500');
            expect(element).not.toHaveClass('text-gray-500');
        });

        test('allows overriding default font weight via tailwind-merge', () => {
            render(SSectionDescription, { props: { class: 'font-medium' }, slots: { default: 'Description' } });

            const element = screen.getByText('Description');
            expect(element).toHaveClass('font-medium');
            expect(element).not.toHaveClass('font-normal');
        });

        test('allows overriding default text size via tailwind-merge', () => {
            render(SSectionDescription, { props: { class: 'text-base' }, slots: { default: 'Description' } });

            const element = screen.getByText('Description');
            expect(element).toHaveClass('text-base');
            expect(element).not.toHaveClass('text-sm');
        });
    });

    describe('Data attributes', () => {
        test('has data-s-section-description attribute', () => {
            render(SSectionDescription, { slots: { default: 'Description' } });

            const element = screen.getByText('Description');
            expect(element).toHaveAttribute('data-s-section-description');
        });
    });
});

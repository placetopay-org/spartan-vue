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

        test.each([
            ['text-red-500', 'text-gray-500'],
            ['font-medium', 'font-normal'],
            ['text-base', 'text-sm'],
        ])('overrides the default %s via tailwind-merge', (override, base) => {
            render(SSectionDescription, { props: { class: override }, slots: { default: 'Description' } });

            const element = screen.getByText('Description');
            expect(element).toHaveClass(override);
            expect(element).not.toHaveClass(base);
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

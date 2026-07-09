import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SSectionTitle from './SSectionTitle.vue';

describe('SSectionTitle', () => {
    describe('Rendering', () => {
        test('renders as an h3 element by default', () => {
            render(SSectionTitle, { slots: { default: 'Section Title' } });

            const heading = screen.getByRole('heading', { level: 3, name: 'Section Title' });
            expect(heading).toBeInTheDocument();
            expect(heading.tagName).toBe('H3');
        });

        test('renders slot content', () => {
            render(SSectionTitle, { slots: { default: 'My Section' } });

            expect(screen.getByText('My Section')).toBeInTheDocument();
        });

        test('renders HTML content in slot', () => {
            render(SSectionTitle, { slots: { default: '<span>Rich Content</span>' } });

            expect(screen.getByText('Rich Content')).toBeInTheDocument();
        });

        test('renders empty when no slot content is provided', () => {
            render(SSectionTitle);

            const heading = screen.getByRole('heading', { level: 3 });
            expect(heading).toBeInTheDocument();
            expect(heading.textContent).toBe('');
        });
    });

    describe('Props', () => {
        test('renders as h1 when as prop is h1', () => {
            render(SSectionTitle, { props: { as: 'h1' }, slots: { default: 'Title' } });

            const heading = screen.getByRole('heading', { level: 1, name: 'Title' });
            expect(heading.tagName).toBe('H1');
        });

        test('renders as h2 when as prop is h2', () => {
            render(SSectionTitle, { props: { as: 'h2' }, slots: { default: 'Title' } });

            const heading = screen.getByRole('heading', { level: 2, name: 'Title' });
            expect(heading.tagName).toBe('H2');
        });

        test('renders as h4 when as prop is h4', () => {
            render(SSectionTitle, { props: { as: 'h4' }, slots: { default: 'Title' } });

            const heading = screen.getByRole('heading', { level: 4, name: 'Title' });
            expect(heading.tagName).toBe('H4');
        });

        test('renders as h5 when as prop is h5', () => {
            render(SSectionTitle, { props: { as: 'h5' }, slots: { default: 'Title' } });

            const heading = screen.getByRole('heading', { level: 5, name: 'Title' });
            expect(heading.tagName).toBe('H5');
        });

        test('renders as h6 when as prop is h6', () => {
            render(SSectionTitle, { props: { as: 'h6' }, slots: { default: 'Title' } });

            const heading = screen.getByRole('heading', { level: 6, name: 'Title' });
            expect(heading.tagName).toBe('H6');
        });
    });

    describe('Styles', () => {
        test('applies default base classes', () => {
            render(SSectionTitle, { slots: { default: 'Title' } });

            const heading = screen.getByRole('heading', { name: 'Title' });
            expect(heading).toHaveClass('text-base');
            expect(heading).toHaveClass('font-semibold');
            expect(heading).toHaveClass('text-gray-900');
        });

        test('includes dark mode class', () => {
            render(SSectionTitle, { slots: { default: 'Title' } });

            const heading = screen.getByRole('heading', { name: 'Title' });
            expect(heading).toHaveClass('dark:text-white');
        });

        test('merges custom classes with defaults', () => {
            render(SSectionTitle, { props: { class: 'mt-4 mb-2' }, slots: { default: 'Title' } });

            const heading = screen.getByRole('heading', { name: 'Title' });
            expect(heading).toHaveClass('mt-4');
            expect(heading).toHaveClass('mb-2');
            expect(heading).toHaveClass('text-base');
            expect(heading).toHaveClass('font-semibold');
        });

        test.each([
            ['text-blue-600', 'text-gray-900'],
            ['font-bold', 'font-semibold'],
            ['text-lg', 'text-base'],
        ])('overrides the default %s via tailwind-merge', (override, base) => {
            render(SSectionTitle, { props: { class: override }, slots: { default: 'Title' } });

            const heading = screen.getByRole('heading', { name: 'Title' });
            expect(heading).toHaveClass(override);
            expect(heading).not.toHaveClass(base);
        });
    });

    describe('Data attributes', () => {
        test('has data-s-section-title attribute', () => {
            render(SSectionTitle, { slots: { default: 'Title' } });

            const heading = screen.getByRole('heading', { name: 'Title' });
            expect(heading).toHaveAttribute('data-s-section-title');
        });
    });
});

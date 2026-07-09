import { test, describe } from 'vitest';
import SPageTitle from './SPageTitle.vue';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';

describe('SPageTitle', () => {
    describe('Rendering', () => {
        test('renders as an h1 element', () => {
            render(SPageTitle, { slots: { default: 'Page Title' } });

            const heading = screen.getByRole('heading', { level: 1, name: 'Page Title' });
            expect(heading).toBeInTheDocument();
            expect(heading.tagName).toBe('H1');
        });

        test('renders slot content', () => {
            render(SPageTitle, { slots: { default: 'Dashboard Overview' } });

            expect(screen.getByText('Dashboard Overview')).toBeInTheDocument();
        });

        test('renders HTML content in slot', () => {
            render(SPageTitle, { slots: { default: '<span>Rich Content</span>' } });

            expect(screen.getByText('Rich Content')).toBeInTheDocument();
        });

        test('renders empty when no slot content is provided', () => {
            render(SPageTitle);

            const heading = screen.getByRole('heading', { level: 1 });
            expect(heading).toBeInTheDocument();
            expect(heading.textContent).toBe('');
        });
    });

    describe('Styles', () => {
        test('applies default base classes', () => {
            render(SPageTitle, { slots: { default: 'Title' } });

            const heading = screen.getByRole('heading', { name: 'Title' });
            expect(heading).toHaveClass('text-2xl');
            expect(heading).toHaveClass('font-semibold');
            expect(heading).toHaveClass('text-gray-900');
        });

        test('includes dark mode class', () => {
            render(SPageTitle, { slots: { default: 'Title' } });

            const heading = screen.getByRole('heading', { name: 'Title' });
            expect(heading).toHaveClass('dark:text-white');
        });

        test('merges custom classes with defaults', () => {
            render(SPageTitle, { props: { class: 'mt-4 mb-2' }, slots: { default: 'Title' } });

            const heading = screen.getByRole('heading', { name: 'Title' });
            expect(heading).toHaveClass('mt-4');
            expect(heading).toHaveClass('mb-2');
            expect(heading).toHaveClass('text-2xl');
            expect(heading).toHaveClass('font-semibold');
        });

        test.each([
            ['text-3xl', 'text-2xl'],
            ['text-blue-600', 'text-gray-900'],
            ['font-bold', 'font-semibold'],
        ])('overrides the default %s via tailwind-merge', (override, base) => {
            render(SPageTitle, { props: { class: override }, slots: { default: 'Title' } });

            const heading = screen.getByRole('heading', { name: 'Title' });
            expect(heading).toHaveClass(override);
            expect(heading).not.toHaveClass(base);
        });
    });

    describe('Data attributes', () => {
        test('has data-s-page-title attribute', () => {
            render(SPageTitle, { slots: { default: 'Title' } });

            const heading = screen.getByRole('heading', { name: 'Title' });
            expect(heading).toHaveAttribute('data-s-page-title');
        });
    });
});

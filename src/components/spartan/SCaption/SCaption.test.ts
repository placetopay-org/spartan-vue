import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SCaption from './SCaption.vue';

describe('SCaption', () => {
    describe('Rendering', () => {
        test('renders as a p element', () => {
            render(SCaption, { props: { text: 'Help text' } });

            const caption = screen.getByRole('caption');
            expect(caption).toBeInTheDocument();
            expect(caption.tagName).toBe('P');
        });

        test('renders text from the text prop', () => {
            render(SCaption, { props: { text: 'This field is required' } });

            expect(screen.getByText('This field is required')).toBeInTheDocument();
        });

        test('renders slot content over text prop', () => {
            render(SCaption, { props: { text: 'prop text' }, slots: { default: 'slot content' } });

            expect(screen.getByText('slot content')).toBeInTheDocument();
        });

        test('renders slot content when no text prop is provided', () => {
            render(SCaption, { slots: { default: 'Custom content' } });

            expect(screen.getByText('Custom content')).toBeInTheDocument();
        });

        test('renders empty when no content is provided', () => {
            render(SCaption);

            const caption = screen.getByRole('caption');
            expect(caption).toBeInTheDocument();
        });
    });

    describe('Variants', () => {
        test('applies error variant classes by default', () => {
            render(SCaption, { props: { text: 'Error message' } });

            const caption = screen.getByRole('caption');
            expect(caption).toHaveClass('text-red-500');
            expect(caption).toHaveClass('dark:text-red-400');
        });

        test('applies info variant classes', () => {
            render(SCaption, { props: { text: 'Info message', variant: 'info' } });

            const caption = screen.getByRole('caption');
            expect(caption).toHaveClass('text-gray-500');
            expect(caption).toHaveClass('dark:text-gray-400');
        });

        test('applies error variant classes explicitly', () => {
            render(SCaption, { props: { text: 'Error', variant: 'error' } });

            const caption = screen.getByRole('caption');
            expect(caption).toHaveClass('text-red-500');
            expect(caption).toHaveClass('dark:text-red-400');
        });
    });

    describe('Styles', () => {
        test('applies base classes', () => {
            render(SCaption, { props: { text: 'Caption' } });

            const caption = screen.getByRole('caption');
            expect(caption).toHaveClass('text-xs');
            expect(caption).toHaveClass('font-normal');
        });
    });

    describe('Data attributes', () => {
        test('has data-s-caption attribute', () => {
            render(SCaption, { props: { text: 'Caption' } });

            const caption = screen.getByRole('caption');
            expect(caption).toHaveAttribute('data-s-caption');
        });
    });
});

import { expect, test, describe, vi } from 'vitest';
import { render, screen } from '@testing-library/vue';
import SAccordion from './SAccordion.vue';

describe('SAccordion', () => {
    test('Throw warning for required props', () => {
        // Arrange
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

        // Act
        render(SAccordion);

        // Assert
        expect(warn).toHaveBeenCalledOnce();
    });

    test('Can be rendered', () => {
        // Act
        render(SAccordion, { props: { open: true }, slots: { default: 'Test Content' } });

        // Assert
        expect(screen.queryByText('Test Content')?.parentElement).toHaveClass('[grid-template-columns:1fr]');
    });

    test('It is hidden with open=false', () => {
        // Act
        render(SAccordion, { props: { open: false }, slots: { default: 'Test Content' }  });

        // Assert
        expect(screen.queryByText('Test Content')?.parentElement).toHaveClass('[grid-template-columns:0fr]');
    });

    test('Can be rendered in vertical mode', () => {
        // Act
        render(SAccordion, { props: { open: true, vertical: true }, slots: { default: 'Test Content' } });

        // Assert
        expect(screen.queryByText('Test Content')?.parentElement).toHaveClass('[grid-template-rows:1fr]');
    });

    test('Can be change his visibility', async () => {
        // Act
        const { rerender } = render(SAccordion, { props: { open: true }, slots: { default: 'Test Content' } });
        
        expect(screen.queryByText('Test Content')?.parentElement).toHaveClass('[grid-template-columns:1fr]');

        await rerender({ open: false });

        // Assert
        expect(screen.queryByText('Test Content')?.parentElement).toHaveClass('[grid-template-columns:0fr]');
    });
});

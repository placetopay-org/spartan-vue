import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SCaption from './SCaption.vue';

describe('SCaption', () => {
    test('Can be rendered', async () => {
        // Act
        render(SCaption, { props: { text: 'test message' } });

        // Assert
        screen.getByText('test message');
        const caption = screen.getByRole('caption');
        expect(caption).toBeInTheDocument();
    });

    test('Can be render with slot content', async () => {
        // Act
        render(SCaption, { slots: { default: 'test message' } });

        // Assert
        screen.getByText('test message');
        const caption = screen.getByRole('caption');
        expect(caption).toBeInTheDocument();
    });

    test('Can be rendered in error/info mode', async () => {
        // Act
        render(SCaption, { props: { text: 'error caption message' } });
        render(SCaption, { props: { text: 'info caption message', variant: 'info' } });

        // Assert
        const errorCaption = screen.getByText('error caption message');
        const infoCaption = screen.getByText('info caption message');
        expect(errorCaption).toHaveClass('text-red-500');
        expect(infoCaption).toHaveClass('text-gray-500');
    });
});

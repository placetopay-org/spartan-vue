import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import STooltip from './STooltip.vue';
import userEvent from '@testing-library/user-event';

describe('STooltip', () => {
    test('renders with default props', async () => {
        // Act
        render(STooltip, {
            props: { title: 'Tooltip content' },
            slots: {
                default: 'Hover me',
            },
        });

        const triggerElement = screen.getByText('Hover me');

        // Assert
        expect(screen.queryByRole('tooltip', { name: 'Tooltip content' })).not.toBeInTheDocument();

        await userEvent.hover(triggerElement);

        expect(screen.getByRole('tooltip', { name: 'Tooltip content' })).toBeInTheDocument();
    });
});

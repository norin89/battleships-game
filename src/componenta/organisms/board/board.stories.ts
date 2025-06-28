import type { Meta, StoryObj } from '@storybook/nextjs';

import { Board } from './board';

const meta = {
	title: 'Organisms / Board',
	component: Board,
	tags: ['autodocs'],
} satisfies Meta<typeof Board>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
	args: {},
};

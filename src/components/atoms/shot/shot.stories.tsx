import type { Meta, StoryObj } from '@storybook/nextjs';

import { Shot } from './shot';

const meta = {
	title: 'Atoms / Shot',
	component: Shot,
	tags: ['autodocs'],
} satisfies Meta<typeof Shot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Miss: Story = {
	args: {
		status: 'miss',
	},
};

export const Hit: Story = {
	args: {
		status: 'hit',
	},
};

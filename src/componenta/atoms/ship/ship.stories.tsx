import type { Meta, StoryObj } from '@storybook/nextjs';

import { Ship } from './ship';

const meta = {
	title: 'Atoms / Ship',
	component: Ship,
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<div style={{ fontSize: '30px' }}>
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof Ship>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
	args: {
		size: 5,
		orientation: 'horizontal',
	},
};

export const Vertical: Story = {
	args: {
		size: 5,
		orientation: 'vertical',
	},
};

export const Sunk: Story = {
	args: {
		size: 4,
		orientation: 'horizontal',
		isSunk: true,
	},
};

export const Size4: Story = {
	args: {
		size: 4,
	},
};

export const Size3: Story = {
	args: {
		size: 3,
	},
};

export const Size2: Story = {
	args: {
		size: 2,
	},
};

export const Size1: Story = {
	args: {
		size: 1,
	},
};

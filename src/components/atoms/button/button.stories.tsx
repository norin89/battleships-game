import type { Meta, StoryObj } from '@storybook/nextjs';

import { Button } from './button';

const meta = {
	title: 'Atoms / Button',
	component: Button,
	tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: 'Default button',
	},
};

export const Primary: Story = {
	args: {
		variant: 'primary',
		children: 'Primary button',
	},
};

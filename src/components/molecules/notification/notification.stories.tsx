import type { Meta, StoryObj } from '@storybook/nextjs';

import { fn } from 'storybook/test';
import { Notification } from './notification';

const meta = {
	title: 'Molecules / Notification',
	component: Notification,
	tags: ['autodocs'],
} satisfies Meta<typeof Notification>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: (
			<p>
				This is <strong>default</strong> notification message
			</p>
		),
	},
};

export const Closeable: Story = {
	args: {
		children: (
			<p>
				This is <strong>closeable</strong> notification message
			</p>
		),
		onClose: fn(),
	},
};

export const Success: Story = {
	args: {
		children: (
			<p>
				This is <strong>success</strong> notification message
			</p>
		),
		status: 'success',
	},
};

export const Error: Story = {
	args: {
		children: (
			<p>
				This is <strong>error</strong> notification message
			</p>
		),
		status: 'error',
	},
};

export const Warning: Story = {
	args: {
		children: (
			<p>
				This is <strong>warning</strong> notification message
			</p>
		),
		status: 'warning',
	},
};

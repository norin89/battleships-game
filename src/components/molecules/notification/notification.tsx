import { HTMLAttributes, ReactNode } from 'react';
import cx from 'clsx';

import s from './notification.module.scss';
import { ValidationStatusType } from '@/types';

export type NotificationProps = {
	children: ReactNode;
	status?: ValidationStatusType;
	onClose?: () => void;
} & HTMLAttributes<HTMLDivElement>;

/** Battleships game board */
export const Notification = ({ children, status = 'info', onClose, className, ...props }: NotificationProps) => (
	<div
		className={cx(
			s['notification'],
			{
				[s[`notification--status-${status}`]]: status,
			},
			className,
		)}
		{...props}
	>
		{children}
		{onClose && (
			<button type="button" className={s['notification__close']} onClick={onClose}>
				&times;
			</button>
		)}
	</div>
);

import { HTMLAttributes } from 'react';
import cx from 'clsx';

import s from './ship.module.scss';

export type ShipProps = HTMLAttributes<HTMLSpanElement> & {
	size: number;
	orientation?: 'horizontal' | 'vertical';
};

export const Ship = ({ size, orientation = 'horizontal', className, ...props }: ShipProps) => (
	<span
		className={cx(
			s['ship'],
			s[`ship--size-${size}`],
			{
				[s['ship--horizontal']]: orientation === 'horizontal',
				[s['ship--vertical']]: orientation === 'vertical',
			},
			className,
		)}
		{...props}
	/>
);

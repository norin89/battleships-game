import { HTMLAttributes } from 'react';
import cx from 'clsx';

import s from './ship.module.scss';
import { ShipType } from '@/types';

export type ShipProps = ShipType & {
	showSize?: boolean;
} & HTMLAttributes<HTMLSpanElement>;

export const Ship = ({ size, orientation, isSunk, showSize, className, ...props }: ShipProps) => (
	<span
		className={cx(
			s['ship'],
			s[`ship--size-${size}`],
			{
				[s['-is-sunk']]: isSunk,
				[s['ship--show-size']]: showSize,
				[s['ship--horizontal']]: orientation === 'horizontal',
				[s['ship--vertical']]: orientation === 'vertical',
			},
			className,
		)}
		{...props}
	/>
);

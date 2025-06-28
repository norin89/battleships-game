import { HTMLAttributes } from 'react';
import cx from 'clsx';

import s from './ship.module.scss';
import settings from '@/settings.json';
import { ShipType } from '@/types';

export type ShipProps = ShipType & HTMLAttributes<HTMLSpanElement>;

export const Ship = ({ size, orientation, isSunk, className, ...props }: ShipProps) => {
	if (size < settings['ship-size-min'] || size > settings['ship-size-max']) {
		throw new Error(
			`Ship size must be between ${settings['ship-size-min']} and ${settings['ship-size-max']}`,
		);
	}

	return (
		<span
			className={cx(
				s['ship'],
				s[`ship--size-${size}`],
				{
					[s['-is-sunk']]: isSunk,
					[s['ship--horizontal']]: orientation === 'horizontal',
					[s['ship--vertical']]: orientation === 'vertical',
				},
				className,
			)}
			{...props}
		/>
	);
};

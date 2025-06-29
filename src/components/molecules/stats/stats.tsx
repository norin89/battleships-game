import { HTMLAttributes, ReactNode } from 'react';
import cx from 'clsx';

import s from './stats.module.scss';

export type StatsProps = {
	items: ReactNode[];
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

export const Stats = ({ items, className, ...props }: StatsProps) => (
	<div className={cx(s['stats'], className)} {...props}>
		{items.map((item, idx) => (
			<div className={s['stats__item']} key={idx}>
				{item}
			</div>
		))}
	</div>
);

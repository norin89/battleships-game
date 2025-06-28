import { HTMLAttributes } from 'react';
import cx from 'clsx';

import s from './shot.module.scss';
import { ShotType } from '@/types';

export type ShotProps = ShotType & HTMLAttributes<HTMLSpanElement>;

export const Shot = ({ status, className, ...props }: ShotProps) => {
	return <span className={cx(s['shot'], s[`shot--${status}`], className)} {...props} />;
};

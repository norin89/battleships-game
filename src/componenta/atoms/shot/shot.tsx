import { HTMLAttributes } from 'react';
import cx from 'clsx';

import s from './shot.module.scss';

export type ShotProps = HTMLAttributes<HTMLSpanElement> & {
	status?: 'hit' | 'miss';
};

export const Shot = ({ status, className, ...props }: ShotProps) => {
	return <span className={cx(s['shot'], s[`shot--${status}`], className)} {...props} />;
};

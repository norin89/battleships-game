import { Fragment, HTMLAttributes } from 'react';
import cx from 'clsx';

import s from './board.module.scss';
import { numberIndexToAlphanumeric } from '@/utils/numberIndexToAlphanumeric';
import settings from '@/settings.json';
import { Ship, ShipProps, Shot, ShotProps } from '@/componenta/atoms';

const RENDERED_BOARD_SIZE = settings['board-size'] + 1; // add space for the row and column header

type Position = {
	row: number;
	column: number;
};

export type BoardProps = HTMLAttributes<HTMLDivElement> & {
	ships?: Array<
		ShipProps & {
			position: Position;
		}
	>;
	shots?: Array<
		ShotProps & {
			position: Position;
		}
	>;
};

/** Battleships game board */
export const Board = ({ ships, shots, className, ...props }: BoardProps) => (
	<div className={cx(s['board'], className)} {...props}>
		<div className={s['board__canvas']}>
			<div className={cx(s['board__layer'], s['board__layer'])}>
				{Array.from(Array(RENDERED_BOARD_SIZE), (_row, rowIdx) => (
					<Fragment key={rowIdx}>
						{Array.from(Array(RENDERED_BOARD_SIZE), (_column, columnIdx) => {
							const isHeader = rowIdx === 0 || columnIdx === 0;
							const columnLetter = columnIdx > 0 ? numberIndexToAlphanumeric(columnIdx - 1) : '';
							const fieldIdx = `${columnLetter}${rowIdx}`;

							return (
								<div
									key={fieldIdx}
									className={cx(s['board__field'], {
										[s['board__field--header']]: isHeader,
									})}
								>
									{isHeader ? (rowIdx === 0 ? columnLetter : rowIdx) : ''}
								</div>
							);
						})}
					</Fragment>
				))}
			</div>
			<div className={s['board__layer']}>
				{ships?.map((ship, idx) => (
					<Ship
						className={s['board__ship']}
						size={ship.size}
						orientation={ship.orientation}
						key={idx}
						style={{
							// +1 because of headers
							gridColumnStart: ship.position.column + 1,
							gridColumnEnd:
								ship.orientation === 'horizontal'
									? ship.size + ship.position.column + 1
									: undefined,
							gridRowStart: ship.position.row + 1,
							gridRowEnd:
								ship.orientation === 'vertical' ? ship.size + ship.position.row + 1 : undefined,
						}}
					/>
				))}
			</div>
			{shots && (
				<div className={s['board__layer']}>
					{shots?.map((shot, idx) => (
						<Shot
							className={s['board__shot']}
							key={idx}
							style={{
								// +1 because of headers
								gridColumnStart: shot.position.column + 1,
								gridRowStart: shot.position.row + 1,
							}}
							status={shot.status}
						/>
					))}
				</div>
			)}
		</div>
	</div>
);

import { BoardType, PositionType } from '@/types';

/** Returns array of positions of each `ship` field based on its `size` and `orientation` */
export const getShipFieldPositions = ({ ship }: { ship: BoardType['ships'][number] }): PositionType[] =>
	[...Array(ship.size)].reduce((result, _, idx) => {
		return [
			...result,
			{
				column: ship.position.column + (ship.orientation === 'horizontal' ? idx : 0),
				row: ship.position.row + (ship.orientation === 'vertical' ? idx : 0),
			},
		];
	}, []);

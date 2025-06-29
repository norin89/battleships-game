import { BoardType, ShipType } from '@/types';
import settings from '@/settings.json';
import { getRandomInteger } from '@/utils/getRandomInteger';
import { isShipInCollision } from '@/utils/isShipInCollision';

export type generateShipPositionsProps = {
	shipSizes: Array<ShipType['size']>;
};

/** Generate random ship positions based on board settings from `settings.json` */
export const generateShipPositions = ({ shipSizes }: generateShipPositionsProps): BoardType['ships'] =>
	shipSizes.reduce((result: BoardType['ships'], size) => {
		return [...result, findPositionForShip({ size, ships: result })];
	}, []);

/** Finds new position for a `ship` making sure it's not colliding with others */
const findPositionForShip = ({
	size,
	ships,
}: {
	size: ShipType['size'];
	ships: BoardType['ships'];
}): BoardType['ships'][number] => {
	const orientation = ['horizontal', 'vertical'][getRandomInteger(0, 1)] as ShipType['orientation'];

	const maxStartPosition = settings['board-size'] - size;
	const positionInLength = getRandomInteger(1, maxStartPosition);
	const positionInWidth = getRandomInteger(1, settings['board-size']);

	let ship = {
		size,
		orientation,
		position:
			orientation === 'horizontal'
				? {
						row: positionInWidth,
						column: positionInLength,
					}
				: {
						row: positionInLength,
						column: positionInWidth,
					},
	};

	if (isShipInCollision({ ship, ships })) {
		// eslint-disable-next-line no-console
		console.info("New ship can't be placed due to collision - finding new position.");
		ship = findPositionForShip({ size, ships });
	}

	return ship;
};

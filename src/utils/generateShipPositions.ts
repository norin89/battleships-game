import settings from '@/settings.json';

import { getRandomInteger } from '@/utils/getRandomInteger';
import { BoardProps } from '@/components/molecules';
import { ShipProps } from '@/components/atoms';
import { BoardType, PositionType, ShipType } from '@/types';

type generateShipPositionsProps = {
	shipSizes: Array<ShipProps['size']>;
};

const getShipFieldPositions = ({ ship }: { ship: BoardType['ships'][number] }): PositionType[] =>
	[...Array(ship.size)].reduce((result, _, idx) => {
		return [
			...result,
			{
				column: ship.position.column + (ship.orientation === 'horizontal' ? idx : 0),
				row: ship.position.row + (ship.orientation === 'vertical' ? idx : 0),
			},
		];
	}, []);

// todo: sibling fields of `ship` should be checked too
const isShipInCollision = ({
	ship,
	ships,
}: {
	ship: BoardType['ships'][number];
	ships: BoardType['ships'];
}): boolean => {
	const newShipFieldPositions = getShipFieldPositions({ ship });
	let hasCollision = false;

	ships.forEach((placedShip) => {
		const placedShipFieldPositions = getShipFieldPositions({ ship: placedShip });

		placedShipFieldPositions.forEach((placedPosition) => {
			newShipFieldPositions.forEach((newPosition) => {
				if (
					placedPosition.row === newPosition.row &&
					placedPosition.column === newPosition.column
				) {
					hasCollision = true;
				}
			});
		});
	});

	return hasCollision;
};

const findShipPosition = ({
	size,
	ships,
}: {
	size: ShipType['size'];
	ships: BoardType['ships'];
}): BoardType['ships'][number] => {
	const orientation = ['horizontal', 'vertical'][
		getRandomInteger(0, 1)
	] as ShipProps['orientation'];

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
		console.warn("New ship can't be placed due to collision - finding new position.");
		ship = findShipPosition({ size, ships });
	}

	return ship;
};

export const generateShipPositions = ({
	shipSizes,
}: generateShipPositionsProps): BoardProps['ships'] =>
	shipSizes.reduce((result: BoardProps['ships'], size) => {
		return [...result, findShipPosition({ size, ships: result })];
	}, []);

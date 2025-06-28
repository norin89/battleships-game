import { BoardType } from '@/types';
import { getShipFieldPositions } from '@/utils/getShipFieldPositions';

// todo: sibling fields of `ship` should be checked too

/** Checks if a `ship` is colliding with those already placed */
export const isShipInCollision = ({
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

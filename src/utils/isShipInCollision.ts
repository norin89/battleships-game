import { BoardType } from '@/types';
import { getShipFieldPositions } from '@/utils/getShipFieldPositions';

// todo: additional protection if the `board` is too small or/and there's too many ships

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
				// todo: expand `ship` field positions instead of this mess
				if (
					(placedPosition.row === newPosition.row &&
						placedPosition.column === newPosition.column) ||
					// Make sure there's a gap between ships
					(placedPosition.row - 1 === newPosition.row &&
						placedPosition.column - 1 === newPosition.column) ||
					(placedPosition.row + 1 === newPosition.row &&
						placedPosition.column + 1 === newPosition.column) ||
					(placedPosition.row - 1 === newPosition.row &&
						placedPosition.column + 1 === newPosition.column) ||
					(placedPosition.row + 1 === newPosition.row &&
						placedPosition.column - 1 === newPosition.column) ||
					(placedPosition.row + 1 === newPosition.row &&
						placedPosition.column === newPosition.column) ||
					(placedPosition.row - 1 === newPosition.row &&
						placedPosition.column === newPosition.column) ||
					(placedPosition.row === newPosition.row &&
						placedPosition.column + 1 === newPosition.column) ||
					(placedPosition.row === newPosition.row &&
						placedPosition.column - 1 === newPosition.column)
				) {
					hasCollision = true;
				}
			});
		});
	});

	return hasCollision;
};

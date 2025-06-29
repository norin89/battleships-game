import { BoardType, PositionType } from '@/types';
import { getShipFieldPositions } from '@/utils/getShipFieldPositions';

/** Checks if a `shot` is a `hit` or a `miss` */
export const hasShotHit = ({
	position,
	ships,
}: {
	position: PositionType;
	ships: BoardType['ships'];
}): boolean => {
	let isHit = false;

	ships.forEach((placedShip) => {
		const placedShipFieldPositions = getShipFieldPositions({ ship: placedShip });

		placedShipFieldPositions.forEach((placedPosition) => {
			if (placedPosition.row === position.row && placedPosition.column === position.column) {
				isHit = true;
			}
		});
	});

	return isHit;
};

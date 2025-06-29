import { PositionType } from '@/types';
import settings from '@/settings.json';

const BOARD_SIZE = settings['board-size'];

export const isPositionValid = (position: PositionType): boolean =>
	!(
		isNaN(position.column) ||
		isNaN(position.row) ||
		position.column < 1 ||
		position.row < 1 ||
		position.column > BOARD_SIZE ||
		position.row > BOARD_SIZE
	);

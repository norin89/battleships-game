export type ShipType = {
	// todo: generic type for number range
	size: number;
	orientation: 'horizontal' | 'vertical';
	isSunk?: boolean;
};

export type PositionType = {
	row: number;
	column: number;
};

export type ShotType = {
	status: 'hit' | 'miss';
};

export type BoardType = {
	size: number;
	ships: Array<
		ShipType & {
			position: PositionType;
		}
	>;
	shots?: Array<
		ShotType & {
			position: PositionType;
		}
	>;
};

export type ValidationStatusType = 'error' | 'success' | 'warning' | 'info';

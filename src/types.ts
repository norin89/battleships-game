export type ShipType = {
	// todo: generic type for number range
	size: number;
	orientation: 'horizontal' | 'vertical';
	isSunk?: boolean;
};

type PositionType = {
	row: number;
	column: number;
};

export type ShotType = {
	status: 'hit' | 'miss';
};

export type BoardType = {
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

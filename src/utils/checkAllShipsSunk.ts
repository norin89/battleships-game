import { BoardType } from '@/types';

/** Function to check if all ships are sunk */
export const checkAllShipsSunk = (ships: BoardType['ships']) => ships.every((ship) => ship.isSunk);

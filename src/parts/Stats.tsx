import { BoardType } from '@/types';
import { Ship, Shot } from '@/components/atoms';
import { Stats as StateComponent } from '@/components/molecules';

export const Stats = ({ ships, shots = [] }: { ships: BoardType['ships']; shots: BoardType['shots'] }) => {
	const hitsCount = shots.filter((shot) => shot.status === 'hit').length;
	const missesCount = shots.filter((shot) => shot.status === 'miss').length;

	const shipsCountBySize = ships.reduce(
		(result: Record<number, number>, ship) => ({
			...result,
			[ship.size]: (result[ship.size] || 0) + 1,
		}),
		{},
	);

	return (
		<StateComponent
			items={[
				<>
					<Shot status="hit" /> <strong>{hitsCount}x</strong> hit
					{` / `}
					<Shot status="miss" /> <strong>{missesCount}x</strong> miss
				</>,
				<>
					Ships count:
					{Object.entries(shipsCountBySize).map(([size, count]) => (
						<strong key={size}>
							{` ${count}x `}
							<Ship size={parseInt(size)} orientation="horizontal" showSize />
						</strong>
					))}
				</>,
			]}
		/>
	);
};

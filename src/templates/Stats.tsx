import { BoardType } from '@/types';
import { Ship, Shot } from '@/components/atoms';

export const Stats = ({
	ships,
	shots = [],
}: {
	ships: BoardType['ships'];
	shots: BoardType['shots'];
}) => {
	const hitsCount = shots.filter((shot) => shot.status === 'hit').length;
	const missesCount = shots.filter((shot) => shot.status === 'miss').length;
	const totalShotsCount = hitsCount + missesCount;

	const shipsCountBySize = ships.reduce(
		(result: Record<number, number>, ship) => ({
			...result,
			[ship.size]: (result[ship.size] || 0) + 1,
		}),
		{},
	);

	return (
		<pre>
			Total shots: <strong>{totalShotsCount}</strong> (<Shot status="hit" /> hit x{hitsCount}{' '}
			<Shot status="miss" /> miss x{missesCount}) | Ships count:{' '}
			{Object.entries(shipsCountBySize).map(([size, count]) => (
				<strong key={size}>
					{` ${count}x `}
					<Ship size={parseInt(size)} orientation="horizontal" />
				</strong>
			))}
			<br />
		</pre>
	);
};

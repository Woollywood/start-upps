import { NextPage } from 'next';
import { Skeleton } from '@/components/ui/skeleton';

const StartupCardsSkeleton: NextPage = () => {
	return (
		<div className='card_grid mt-7'>
			{new Array(6).fill(null).map((_, index) => (
				<Skeleton key={index} className='aspect-[2/3] w-full rounded-xl bg-black-100' />
			))}
		</div>
	);
};

export default StartupCardsSkeleton;

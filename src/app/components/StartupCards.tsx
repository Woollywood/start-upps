import { StartupCard, StartupTypeCard } from '@/components/shared/StartupCard';
import { client } from '@/sanity/lib/client';
import { STARTUPS_QUERY } from '@/sanity/lib/queries';
import { NextPage } from 'next';

interface Props {
	query?: string;
}

const StartupCards: NextPage<Props> = async ({ query }) => {
	const params = { search: query || null };
	const posts = (await client.fetch(STARTUPS_QUERY, params)) as unknown as StartupTypeCard[];

	return (
		<ul className='card_grid mt-7'>
			{posts?.length > 0 ? (
				posts.map((post) => <StartupCard key={post._id} post={post} />)
			) : (
				<p className='no-result'>No startups found</p>
			)}
		</ul>
	);
};

export default StartupCards;

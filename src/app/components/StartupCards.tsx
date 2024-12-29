import { StartupCard, StartupTypeCard } from '@/components/shared/StartupCard';
import { sanityFetch } from '@/sanity/lib/live';
import { STARTUPS_QUERY } from '@/sanity/lib/queries';
import { NextPage } from 'next';

interface Props {
	query?: string;
}

const StartupCards: NextPage<Props> = async ({ query }) => {
	const params = { search: query || null };
	const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });

	return (
		<ul className='card_grid mt-7'>
			{posts?.length > 0 ? (
				(posts as unknown as StartupTypeCard[]).map((post) => <StartupCard key={post._id} post={post} />)
			) : (
				<p className='no-result'>No startups found</p>
			)}
		</ul>
	);
};

export default StartupCards;

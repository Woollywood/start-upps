import { NextPage } from 'next';
import { SearchForm } from '@/components/shared/SearchForm';
import { StartupCard, StartupTypeCard } from '@/components/shared/StartupCard';
import { STARTUPS_QUERY } from '@/sanity/lib/queries';
import { sanityFetch, SanityLive } from '@/sanity/lib/live';

interface Props {
	searchParams: Promise<{ query?: string }>;
}

const Home: NextPage<Props> = async ({ searchParams }) => {
	const { query } = await searchParams;
	const params = { search: query || null };
	const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });

	return (
		<>
			<section className='pink_container'>
				<h1 className='heading'>
					Pitch Your Startup, <br /> Connect With Entrepreneurs
				</h1>
				<p className='sub-heading !max-w-3xl'>
					Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
				</p>
				<SearchForm query={query} />
			</section>
			<section className='section_container'>
				<p className='text-30-semibold'>{query ? `Search Results for ${query}` : 'All Startups'}</p>
				<ul className='card_grid mt-7'>
					{posts?.length > 0 ? (
						(posts as unknown as StartupTypeCard[]).map((post) => (
							<StartupCard key={post._id} post={post} />
						))
					) : (
						<p className='no-result'>No startups found</p>
					)}
				</ul>
			</section>

			<SanityLive />
		</>
	);
};

export default Home;

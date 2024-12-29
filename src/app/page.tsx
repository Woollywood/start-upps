import { NextPage } from 'next';
import { SearchForm } from '@/components/shared/SearchForm';
import { SanityLive } from '@/sanity/lib/live';
import StartupCards from './components/StartupCards';
import { Suspense } from 'react';
import StartupCardsSkeleton from './components/StartupCardsSkeleton';

interface Props {
	searchParams: Promise<{ query?: string }>;
}

const Home: NextPage<Props> = async ({ searchParams }) => {
	const { query } = await searchParams;

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
				<Suspense fallback={<StartupCardsSkeleton />}>
					<StartupCards query={query} />
				</Suspense>
			</section>

			<SanityLive />
		</>
	);
};

export default Home;

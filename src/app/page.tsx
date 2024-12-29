import { SearchForm } from '@/components/shared/SearchForm';

import { NextPage } from 'next';

interface Props {
	searchParams: Promise<{ query?: string }>;
}

const Home: NextPage<Props> = async ({ searchParams }) => {
	const { query } = await searchParams;

	return (
		<div className='pink_container'>
			<h1 className='heading'>
				Pitch Your Startup, <br /> Connect With Entrepreneurs
			</h1>
			<p className='sub-heading !max-w-3xl'>
				Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
			</p>
			<SearchForm query={query} />
		</div>
	);
};

export default Home;

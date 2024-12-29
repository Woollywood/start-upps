import { NextPage } from 'next';
import { SearchForm } from '@/components/shared/SearchForm';
import { StartupCard } from '@/components/shared/StartupCard';

interface Props {
	searchParams: Promise<{ query?: string }>;
}

const Home: NextPage<Props> = async ({ searchParams }) => {
	const { query } = await searchParams;

	const posts = [
		{
			_createdAt: new Date(),
			views: 55,
			author: { _id: 1, name: 'Woollywood' },
			_id: 1,
			description: 'This is a description',
			image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy85CghxDgvHub6aPkBf-dwZwK8JKl_2XUjw&s',
			category: 'Robots',
			title: 'We Robots',
		},
	];

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
						posts.map((post, index) => <StartupCard key={post?._id} post={post} />)
					) : (
						<p className='no-result'>No startups found</p>
					)}
				</ul>
			</section>
		</>
	);
};

export default Home;

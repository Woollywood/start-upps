import { client } from '@/sanity/lib/client';
import { STARTUPS_BY_AUTHOR_QUERY } from '@/sanity/lib/queries';
import { NextPage } from 'next';
import { StartupCard, StartupTypeCard } from './StartupCard';

interface Props {
	id: string;
}

export const UserStartups: NextPage<Props> = async ({ id }) => {
	const startups = (await client.fetch(STARTUPS_BY_AUTHOR_QUERY, { id })) as unknown as StartupTypeCard[];
	const hasStartups = startups.length > 0;

	return hasStartups ? (
		startups.map((startup) => <StartupCard key={startup._id} post={startup} />)
	) : (
		<p className='no-result'>No posts yet</p>
	);
};

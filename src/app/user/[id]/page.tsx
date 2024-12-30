import StartupCardsSkeleton from '@/app/components/StartupCardsSkeleton';
import { UserStartups } from '@/components/shared/UserStartups';
import { client } from '@/sanity/lib/client';
import { AUTHOR_BY_GITHUB_ID_QUERY } from '@/sanity/lib/queries';
import { NextPage } from 'next';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

interface Props {
	params: Promise<{ id: string }>;
}

const Page: NextPage<Props> = async ({ params }) => {
	const { id } = await params;
	const session = await getServerSession();

	const user = await client.fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: +id });
	if (!user) {
		notFound();
	}

	return (
		<>
			<section className='profile_container'>
				<div className='profile_card'>
					<div className='profile_title'>
						<h3 className='text-24-black line-clamp-1 text-center uppercase'>{user.name}</h3>
					</div>
					<Image
						src={user.image || ''}
						alt={user.name || ''}
						width={220}
						height={220}
						className='profile_image'
					/>
					<p className='text-30-extrabold mt-7 text-center'>@{user.username}</p>
					<p className='text-14-normal mt-1 text-center'>{user.bio}</p>
				</div>
				<div className='flex flex-1 flex-col gap-5 lg:-mt-5'>
					<p className='text-30-bold'>{session?.user.email === user.email ? 'Your' : 'All'} Startups</p>
					<ul className='card_grid-sm'>
						<Suspense fallback={<StartupCardsSkeleton />}>
							<UserStartups id={user._id} />
						</Suspense>
					</ul>
				</div>
			</section>
		</>
	);
};

export default Page;

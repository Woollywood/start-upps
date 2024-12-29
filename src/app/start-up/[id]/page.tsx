import { StartupTypeCard } from '@/components/shared/StartupCard';
import { client } from '@/sanity/lib/client';
import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import moment from 'moment';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import markdown from 'markdown-it';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/shared/View';

const md = markdown();

interface Props {
	params: Promise<{ id: string }>;
}

const Page: NextPage<Props> = async ({ params }) => {
	const { id } = await params;
	const post = (await client.fetch(STARTUP_BY_ID_QUERY, { id })) as unknown as StartupTypeCard;

	if (!post) {
		notFound();
	}

	const { _createdAt, title, description, image, author, category, pitch } = post;
	const parsedContent = md.render(pitch || '');

	return (
		<>
			<section className='pink_container !min-h-[14.375rem]'>
				<p className='tag'>{moment(_createdAt).fromNow()}</p>
				<h1 className='heading'>{title}</h1>
				<p className='sub-heading !max-w-5xl'>{description}</p>
			</section>
			<section className='section_container'>
				<Image src={image || ''} alt='thumbnail' width={1920} height={1080} className='rounded-xl' />
				<div className='mx-auto mt-10 max-w-4xl space-y-5'>
					<div className='flex-between gap-5'>
						<Link href={`/user/${post.author?._id}`} className='mb-3 flex items-center gap-2'>
							<Image
								src={author?.image || ''}
								alt='avatar'
								width={64}
								height={64}
								className='rounded-full drop-shadow-lg'
							/>
							<div>
								<p className='text-20-medium'>{author?.name}</p>
								<p className='text-16-medium !text-black-300'>@{author?.username}</p>
							</div>
						</Link>
						<p className='category-tag'>{category}</p>
					</div>
					<h3 className='text-30-bold'>Pitch Details</h3>
					{parsedContent ? (
						<article
							className='prose max-w-4xl break-all font-work-sans'
							dangerouslySetInnerHTML={{ __html: parsedContent }}
						/>
					) : (
						<p className='no-result'>No details provided</p>
					)}
				</div>
				<hr className='divider' />
				<Suspense fallback={<Skeleton className='view_skeleton' />}>
					<View id={id} />
				</Suspense>
			</section>
		</>
	);
};

export default Page;

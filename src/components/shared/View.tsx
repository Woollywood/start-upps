import { NextPage } from 'next';
import Ping from './Ping';
import { client } from '@/sanity/lib/client';
import { STARTUP_VIEWS_QUERY } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import { writeClient } from '@/sanity/lib/writeClient';
import { after } from 'next/server';

interface Props {
	id: string;
}

const View: NextPage<Props> = async ({ id }) => {
	const response = await client.withConfig({ useCdn: false }).fetch(STARTUP_VIEWS_QUERY, { id });
	if (!response) {
		notFound();
	}
	const { views: totalViews } = response;

	after(async () => {
		await writeClient
			.patch(id)
			.set({ views: totalViews! + 1 })
			.commit();
	});

	return (
		<div className='view-container'>
			<div className='absolute -right-2 -top-2'>
				<Ping />
			</div>
			<div className='view-text'>
				<span className='font-black'>Views: {totalViews}</span>
			</div>
		</div>
	);
};

export default View;

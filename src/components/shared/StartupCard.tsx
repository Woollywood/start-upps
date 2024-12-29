import React from 'react';
import moment from 'moment';
import { EyeIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../ui/button';

interface Props {
	post: StartupTypeCard;
}

export const StartupCard: React.FC<Props> = ({ post }) => {
	const {
		_id,
		_createdAt,
		views,
		author: { _id: authorId, name },
		title,
		category,
		image,
		description,
	} = post;

	return (
		<li className='startup-card group'>
			<div className='flex-between'>
				<p className='startup-card_date'>{moment(_createdAt).fromNow()}</p>
				<div className='flex gap-1.5'>
					<EyeIcon className='size-6 text-primary' />
					<span className='text-16-medium'>{views}</span>
				</div>
			</div>
			<div className='flex-between mt-5 gap-5'>
				<div>
					<Link href={`/user/${authorId}`}>
						<p className='text-16-medium line-clamp-1 hover:underline'>{name}</p>
					</Link>
					<Link href={`/start-up/${_id}`}>
						<h3 className='text-26-semibold line-clamp-1 hover:underline'>{title}</h3>
					</Link>
				</div>
				<Link href={`/user/${authorId}`}>
					<Image
						src='https://placehold.co/48x48'
						alt='placeholder'
						width={48}
						height={48}
						className='rounded-full transition-shadow hover:shadow-xl'
					/>
				</Link>
			</div>
			<Link href={`/start-up/${_id}`} className='group/description'>
				<p className='startup-card_desc group-hover/description:underline'>{description}</p>
				<div className='startup-card_img relative overflow-hidden'>
					<Image src={image} fill alt='placeholder' className='object-cover' />
				</div>
			</Link>
			<div className='flex-between mt-5 gap-3'>
				<Link href={{ query: { query: category.toLowerCase() } }}>
					<p className='text-16-medium hover:underline'>{category}</p>
				</Link>
				<Button className='startup-card_btn transition-shadow hover:shadow-300' asChild>
					<Link href={`/start-up/${_id}`}>Details</Link>
				</Button>
			</div>
		</li>
	);
};

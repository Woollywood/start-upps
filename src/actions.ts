'use server';

import { z } from 'zod';
import slugify from 'slugify';
import { writeClient } from './sanity/lib/writeClient';
import { client } from './sanity/lib/client';
import { AUTHOR_BY_GITHUB_ID_QUERY } from './sanity/lib/queries';
import { redirect } from 'next/navigation';

const schema = z.object({
	title: z.string().min(3).max(100),
	description: z.string().min(20).max(500),
	category: z.string().min(3).max(20),
	link: z
		.string()
		.url()
		.refine(async (url) => {
			try {
				const res = await fetch(url, { method: 'HEAD' });
				const contentType = res.headers.get('content-type');
				return contentType?.startsWith('image/');
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
			} catch (error) {
				return false;
			}
		}),
	pitch: z.string().min(10),
});

interface FormFields {
	title: string;
	description: string;
	category: string;
	link: string;
	pitch: string;
}

type FormState =
	| {
			errors?: {
				title?: string[];
				description?: string[];
				category?: string[];
				link?: string[];
				pitch?: string[];
			};
			state?: FormFields;
			response?: {
				status?: number;
				message: string;
			};
	  }
	| undefined;

export const createStartup = async (prevState: FormState, formData: FormData): Promise<FormState> => {
	const formFields = {
		title: formData.get('title') as string,
		description: formData.get('description') as string,
		category: formData.get('category') as string,
		link: formData.get('link') as string,
		pitch: formData.get('pitch') as string,
	};

	const { success, data, error } = await schema.safeParseAsync(formFields);

	const returnWithMerge = <T>(data: T) => ({ state: formFields, ...data });

	if (!success) {
		return returnWithMerge({ errors: error.flatten().fieldErrors });
	}

	const userId = formData.get('userId') as string | null;
	if (!userId) {
		return returnWithMerge({
			response: {
				status: 401,
				message: 'Unauthorized',
			},
		});
	}

	try {
		await createPitch(userId, formData, data.pitch);
		return returnWithMerge({ response: { status: 200, message: 'Success' } });
	} catch (error) {
		return returnWithMerge({ response: { message: (error as Error).message } });
	} finally {
		redirect('/');
	}
};

export const createPitch = async (userId: string, formData: FormData, pitch: string) => {
	const { title, description, category, link } = {
		title: formData.get('title') as string,
		description: formData.get('description') as string,
		category: formData.get('category') as string,
		link: formData.get('link') as string,
	};

	const slug = slugify(title as string, { lower: true, strict: true });

	try {
		const startup = {
			title,
			description,
			category,
			image: link,
			slug: { _type: slug, current: slug },
			author: { _type: 'reference', _ref: userId },
			pitch,
		};

		return await writeClient.create({ _type: 'startup', ...startup });
	} catch (error) {
		throw error;
	}
};

export const fetchUserAction = async (id: string) =>
	await client.withConfig({ useCdn: false }).fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id });

'use client';

import React, { useActionState, useEffect, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { createStartup, fetchUserAction } from '@/actions';
import { useSession } from 'next-auth/react';

const StartupForm: React.FC = () => {
	const [isLoading, setLoading] = useState(true);
	const [userId, setUserId] = useState('');

	const { data: session } = useSession();
	const [pitch, setPitch] = useState('');
	const { toast } = useToast();

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const user = await fetchUserAction(session?.user.id || '');
				setUserId(user?._id || '');
			} catch (error) {
				toast({
					title: 'Error',
					description: (error as Error).message,
					variant: 'destructive',
				});
			} finally {
				setLoading(false);
			}
		};

		fetchUser();
	}, [session?.user.id, toast]);

	const [state, dispatch, isPending] = useActionState(createStartup, undefined);

	useEffect(() => {
		const observe = () => {
			if (!state) {
				return;
			}

			if (Object.keys(state?.errors || {}).length > 0) {
				toast({
					title: 'Error',
					description: 'Validation errors',
					variant: 'destructive',
				});
			} else {
				if (state?.response?.status === 401) {
					toast({
						title: 'Error',
						description: state.response.message,
						variant: 'destructive',
					});
				} else if (state?.response?.status !== 200) {
					toast({
						title: 'Error',
						description: state?.response?.message,
						variant: 'destructive',
					});
				}
			}
		};
		observe();
	}, [state, toast]);

	return (
		<form action={dispatch} className='startup-form'>
			<input type='hidden' name='userId' defaultValue={userId} />
			<div>
				<label htmlFor='title' className='startup-form_label'>
					Title
				</label>
				<Input
					id='title'
					name='title'
					className='startup-form_input'
					required
					placeholder='Startup Title'
					defaultValue={state?.state?.title}
				/>
				{state?.errors?.title && <p className='startup-form_error'>{state?.errors?.title}</p>}
			</div>
			<div>
				<label htmlFor='description' className='startup-form_label'>
					Description
				</label>
				<Textarea
					id='description'
					name='description'
					className='startup-form_textarea'
					required
					placeholder='Startup Description'
					defaultValue={state?.state?.description}
				/>
				{state?.errors?.description && <p className='startup-form_error'>{state?.errors?.description}</p>}
			</div>
			<div>
				<label htmlFor='category' className='startup-form_label'>
					Category
				</label>
				<Input
					id='category'
					name='category'
					className='startup-form_input'
					required
					placeholder='Startup Category (Tech, Health, Education)'
					defaultValue={state?.state?.category}
				/>
				{state?.errors?.category && <p className='startup-form_error'>{state?.errors?.category}</p>}
			</div>
			<div>
				<label htmlFor='link' className='startup-form_label'>
					Image URL
				</label>
				<Input
					id='link'
					name='link'
					className='startup-form_input'
					required
					placeholder='Startup Image URL'
					defaultValue={state?.state?.link}
				/>
				{state?.errors?.link && <p className='startup-form_error'>{state?.errors?.link}</p>}
			</div>
			<div data-color-mode='light'>
				<label htmlFor='pitch' className='startup-form_label'>
					Pitch
				</label>
				<MDEditor
					id='pitch'
					preview='edit'
					height={300}
					style={{ borderRadius: 20, overflow: 'hidden' }}
					value={pitch}
					onChange={(value) => setPitch(value as string)}
					textareaProps={{
						placeholder: 'Briefly describe your idea and what problem it solves',
						name: 'pitch',
					}}
					previewOptions={{
						disallowedElements: ['style'],
					}}
				/>
				{state?.errors?.pitch && <p className='startup-form_error'>{state?.errors?.pitch}</p>}
			</div>
			<Button className='startup-form_btn text-white' disabled={isPending || isLoading}>
				{isPending ? 'Submitting...' : 'Submit Your Pitch'}
				<Send className='ml-2 size-6' />
			</Button>
		</form>
	);
};

export default StartupForm;

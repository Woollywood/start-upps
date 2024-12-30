import { client } from '@/sanity/lib/client';
import { AUTHOR_BY_GITHUB_ID_QUERY } from '@/sanity/lib/queries';
import { writeClient } from '@/sanity/lib/writeClient';
import { AuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

export const options: AuthOptions = {
	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_ID as string,
			clientSecret: process.env.GITHUB_SECRET as string,
		}),
	],
	callbacks: {
		async signIn({ user: { name, email, image }, profile }) {
			const existingUser = await client
				.withConfig({ useCdn: false })
				.fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: profile?.id });

			if (!existingUser) {
				await writeClient.create({
					_type: 'author',
					id: profile?.id,
					name,
					username: profile?.login,
					email,
					image,
					bio: profile?.bio || '',
				});
			}
			return true;
		},
		async jwt({ token, account, profile }) {
			if (account && profile) {
				const user = await client
					.withConfig({ useCdn: false })
					.fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: profile?.id });

				token.id = user?.id;
			}
			return token;
		},
		async session({ session, token }) {
			session.user.id = token?.id as string;
			return session;
		},
	},
};

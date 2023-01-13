import { testApi } from './base.service';

export interface User {
	id: number;
	name: string;
	username: string;
	email: string;
}

const USERS_TAG = 'USERS';

/**
 * Service to fetch data from the API for an endpoint.
 */
const usersApi = testApi
	.enhanceEndpoints({
		// Used for caching and invalidating data
		addTagTypes: [USERS_TAG],
	})
	.injectEndpoints({
		endpoints: (build) => ({
			users: build.query<User[], void>({
				query: () => '/users',
				// Provided tag to re-fetch the data if the specified tag is invalidated.
				providesTags: [USERS_TAG],
			}),
		}),
		/**
		 * If you inject an endpoint that already exists and doesn't explicitly specify `overrideExisting: true`.
		 * The endpoint will not get overridden in development mode but in production, endpoint will be overridden.
		 * So to avoid overriding set `overrideExisting: false`.
		 */
		overrideExisting: false,
	});

export const { useUsersQuery } = usersApi;
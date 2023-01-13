import { baseApi } from './de.service';
import { IProduct } from '../pages/decisionengine/interfaces/ModelInterface'

const PRODUCTS_TAG = 'PRODUCTS';

/**
 * Service to fetch data from the API for an endpoint.
 */
const ProductsApi = baseApi
	.enhanceEndpoints({
		// Used for caching and invalidating data
		addTagTypes: [PRODUCTS_TAG],
	})
	.injectEndpoints({
		endpoints: (build) => ({
			products: build.query<IProduct[], void>({
				query: () => '/products/all',
				// Provided tag to re-fetch the data if the specified tag is invalidated.
				providesTags: [PRODUCTS_TAG],
			}),
		}),
		/**
		 * If you inject an endpoint that already exists and doesn't explicitly specify `overrideExisting: true`.
		 * The endpoint will not get overridden in development mode but in production, endpoint will be overridden.
		 * So to avoid overriding set `overrideExisting: false`.
		 */
		overrideExisting: false,
	});

export const { useProductsQuery } = ProductsApi;
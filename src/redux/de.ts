// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IProduct } from '../pages/decisionengine/interfaces/ModelInterface'

let baseUrl: string = (process.env.REACT_APP_BACKEND_URL as string);

// Define a service using a base URL and expected endpoints
export const deApi = createApi({

    reducerPath: 'deApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getAllProducts: builder.query<IProduct[], void>({
            query: () => `products/all`,
        }),
        createModel: builder.mutation({
            query: (payload) => ({
                url: '/models/create_model',
                method: 'POST',
                body: payload,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }),
            //invalidatesTags: ['Post'],
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetAllProductsQuery,
    useCreateModelMutation } = deApi



// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IProduct } from '../pages/decisionengine/interfaces/ModelInterface'

// Define a service using a base URL and expected endpoints
export const deApi = createApi({
    reducerPath: 'deApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
    endpoints: (builder) => ({
        getAllProducts: builder.query<IProduct[], string>({
            query: () => `products/all`,
        }),
        getProducts: builder.mutation({
            query: () => ({
                url: `products/all`,
                method: 'GET',
            })
        }),
        // createModel: builder.query<IProduct[], string>({
        //     query: () => `models/create_model`,
        // }),
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
    useGetProductsMutation,
    useCreateModelMutation } = deApi



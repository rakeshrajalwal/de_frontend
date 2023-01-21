// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {IModel, IModelInput, IProduct} from '../pages/decisionengine/interfaces/ModelInterface'

let baseUrl: string = (process.env.REACT_APP_BACKEND_URL as string);

// Define a service using a base URL and expected endpoints
export const deApi = createApi({

    reducerPath: 'deApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getAllProducts: builder.query<IProduct[], void>({
            query: () => `/products`,
        }),
        getAllModels: builder.query<IModel[], void>({
            query: () => `/models`,
        }),
        getOneModel: builder.query<IModel, string>({
            query: (id:string) => `/models/${id}`,
        }),
        createModel: builder.mutation({
            query: (payload) => ({
                url: '/models/',
                method: 'POST',
                body: payload,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }),
            //invalidatesTags: ['Post'],
        }),
        modifyModel: builder.mutation({
            query: ({id, model}:{id:string, model:IModelInput}) => ({
                url: `/models/${id}`,
                method: 'PUT',
                body: model,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }),
        })
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetAllProductsQuery,
    useCreateModelMutation,
    useGetAllModelsQuery,
    useGetOneModelQuery,
    useModifyModelMutation
} = deApi



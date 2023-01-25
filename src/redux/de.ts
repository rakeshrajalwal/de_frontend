// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IModel, IModelInput, IProduct, IRunModel } from '../pages/decisionengine/interfaces/ModelInterface'

let baseUrl: string = (process.env.REACT_APP_BACKEND_URL as string);

// Define a service using a base URL and expected endpoints
export const deApi = createApi({
    reducerPath: 'deApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getAllProducts: builder.query<IProduct[], void>({
            query: () => `/products`,
        }),
        getManualInputsByProductName: builder.query<string[], string>({
            query: (productName) => `/products/${productName}/manualInputs`,
        }),

        getAllModels: builder.query<IModel[], void>({
            query: () => `/models`,
        }),
        getOneModel: builder.query<IModel, string>({
            query: (id: string) => `/models/${id}`,
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
            query: ({ id, model }: { id: string, model: IModelInput }) => ({
                url: `/models/${id}`,
                method: 'PUT',
                body: model,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }),
        }),
        approveModel: builder.mutation({
            query: (id: string) => ({
                url: `/models/${id}/approve`,
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }),
        }),
        activateModel: builder.mutation({
            query: ({ id, activate }: { id: string, activate: boolean }) => ({
                url: `/models/${id}/${activate ? "activate" : "de-activate"}`,
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }),
        }),
        runModel: builder.mutation({
            query: (input) => ({
                url: `/model-runs`,
                method: 'POST',
                body: input,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }),
        }),
        getRunSummaries: builder.query<IRunModel[], void>({
            query: () => `/model-runs`,
        }),
        getModelRunById: builder.query<IRunModel, string>({
            query: (id) => `/model-runs/${id}`,
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetAllProductsQuery,
    useCreateModelMutation,
    useGetAllModelsQuery,
    useGetOneModelQuery,
    useGetManualInputsByProductNameQuery,
    useLazyGetManualInputsByProductNameQuery,
    useModifyModelMutation,
    useGetRunSummariesQuery,
    useGetModelRunByIdQuery
} = deApi



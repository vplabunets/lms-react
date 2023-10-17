import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../../utils/API_CONFIG';

export const lmsBackApi = createApi({
    reducerPath: 'lmsBackApi',
    tagTypes: ['Articles', 'Auth'],
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL,
    }),
    endpoints: builder => ({
        createUser: builder.mutation({
            query: body => ({
                url: 'auth/signup',
                method: 'POST',
                body,
            }),
        }),
        loginUser: builder.mutation({
            query: body => ({
                url: 'auth/signin',
                method: 'POST',
                body,
            }),
        }),
        getArticles: builder.query({
            query: () => '/technical-articles',
            providesTags: result =>
                result
                    ? [
                          ...result.map(({ id }) => ({ type: 'Articles', id })),
                          { type: 'Articles', id: 'LIST' },
                      ]
                    : [{ type: 'Articles', id: 'LIST' }],
        }),
        getArticleById: builder.query({
            query: articleId => `technical-articles/${articleId}`,
        }),
        getArticleByTitle: builder.query({
            query: title => `technical-articles/titles/${title}`,
        }),
        addArticle: builder.mutation({
            query: body => ({
                url: 'technical-articles',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Articles', id: 'LIST' }],
        }),
        updateArticle: builder.mutation({
            query: data => {
                const { _id, ...body } = data;
                console.log('in lmsback', _id);
                console.log('in lmsback', body);
                return {
                    url: `technical-articles/${_id}`,
                    method: 'PUT',
                    body,
                };
            },
            invalidatesTags: [{ type: 'Articles', id: 'LIST' }],
        }),
    }),
});

export const {
    useCreateUserMutation,
    useLoginUserMutation,
    useGetArticlesQuery,
    useGetArticleByIdQuery,
    useGetArticleByTitleQuery,
    useUpdateArticleMutation,
    useAddArticleMutation,
} = lmsBackApi;

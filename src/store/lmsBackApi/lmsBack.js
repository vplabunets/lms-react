import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../../utils/API_CONFIG';

export const lmsBackApi = createApi({
    reducerPath: 'lmsBackApi',
    tagTypes: ['Articles', 'Auth', 'Lessons', 'Statistics', 'Homeworks'],
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }

            return headers;
        },
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
                return {
                    url: `technical-articles/${_id}`,
                    method: 'PUT',
                    body,
                };
            },
            invalidatesTags: [{ type: 'Articles', id: 'LIST' }],
        }),
        getLessons: builder.query({
            query: () => '/lessons',
            providesTags: result =>
                result
                    ? [
                          ...result.map(({ id }) => ({ type: 'Lessons', id })),
                          { type: 'Lessons', id: 'LIST' },
                      ]
                    : [{ type: 'Lessons', id: 'LIST' }],
        }),
        getLessonBySerialNumber: builder.query({
            query: lessonSerialNumber => `lessons/${lessonSerialNumber}`,
        }),
        getLessonByTitle: builder.query({
            query: title => `technical-articles/titles/${title}`,
        }),
        addLesson: builder.mutation({
            query: body => ({
                url: 'technical-articles',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Articles', id: 'LIST' }],
        }),
        updateLesson: builder.mutation({
            query: data => {
                const { _id, ...body } = data;
                return {
                    url: `technical-articles/${_id}`,
                    method: 'PUT',
                    body,
                };
            },
            invalidatesTags: [{ type: 'Articles', id: 'LIST' }],
        }),
        getHomeworks: builder.query({
            query: () => '/homeworks',
            providesTags: result =>
                result
                    ? [
                          ...result.map(({ id }) => ({
                              type: 'Homeworks',
                              id,
                          })),
                          { type: 'Homeworks', id: 'LIST' },
                      ]
                    : [{ type: 'Homeworks', id: 'LIST' }],
        }),
        getHomeworkBySerialNumber: builder.query({
            query: homeworkSerialNumber => `homeworks/${homeworkSerialNumber}`,
        }),
        getHomeworkByTitle: builder.query({
            query: title => `homeworks/titles/${title}`,
        }),
        getHomeworkById: builder.query({
            query: _id => `homeworks/ids/${_id}`,
        }),
        addHomework: builder.mutation({
            query: body => ({
                url: 'homeworks',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Homeworks', id: 'LIST' }],
        }),
        updateHomework: builder.mutation({
            query: data => {
                const { _id, body } = data;
                return {
                    url: `homeworks/${_id}`,
                    method: 'PATCH',
                    body,
                };
            },
            invalidatesTags: [{ type: 'Homeworks', id: 'LIST' }],
        }),
        getStatistics: builder.query({
            query: () => '/statistics',
            providesTags: result =>
                result
                    ? [
                          ...result.map(({ id }) => ({
                              type: 'Statistics',
                              id,
                          })),
                          { type: 'Statistics', id: 'LIST' },
                      ]
                    : [{ type: 'Statistics', id: 'LIST' }],
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
    useGetLessonsQuery,
    useGetLessonBySerialNumberQuery,
    useGetLessonByTitleQuery,
    userAddLessonMutation,
    useUpdateLessonMutation,
    useGetStatisticsQuery,
    useGetHomeworksQuery,
    useGetHomeworkBySerialNumberQuery,
    useGetHomeworkByTitleQuery,
    useGetHomeworkByIdQuery,
    useAddHomeworkMutation,
    useUpdateHomeworkMutation,
} = lmsBackApi;

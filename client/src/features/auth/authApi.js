import { apiSlice } from '../../api/apiSlice';
import { setCredentials, logoutState } from './authSlice';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            setCredentials({
              user: data.data.user,
              vendorProfile: data.data.vendorProfile,
            })
          );
        } catch (err) {
          // Error handling managed by component
        }
      },
    }),
    signup: builder.mutation({
      query: (userData) => ({
        url: '/auth/signup',
        method: 'POST',
        body: userData,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            setCredentials({
              user: data.data.user,
              vendorProfile: data.data.vendorProfile,
            })
          );
        } catch (err) {
          // Error handling managed by component
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logoutState());
          dispatch(apiSlice.util.resetApiState());
        } catch (err) {
          dispatch(logoutState());
        }
      },
    }),
    getCurrentUser: builder.query({
      query: () => '/auth/me',
      providesTags: ['User', 'VendorProfile'],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            setCredentials({
              user: data.data.user,
              vendorProfile: data.data.vendorProfile,
            })
          );
        } catch (err) {
          dispatch(logoutState());
        }
      },
    }),
    updatePassword: builder.mutation({
      query: (passwords) => ({
        url: '/auth/update-password',
        method: 'PATCH',
        body: passwords,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
  useUpdatePasswordMutation,
} = authApi;

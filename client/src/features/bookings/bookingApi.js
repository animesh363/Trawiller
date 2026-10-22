import { apiSlice } from '../../api/apiSlice';

export const bookingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (bookingData) => ({
        url: '/bookings',
        method: 'POST',
        body: bookingData,
      }),
      invalidatesTags: ['Booking'],
    }),
    getMyBookings: builder.query({
      query: () => '/bookings/my-bookings',
      providesTags: ['Booking'],
    }),
    getVendorBookings: builder.query({
      query: () => '/bookings/vendor-bookings',
      providesTags: ['Booking'],
    }),
    updateBookingStatus: builder.mutation({
      query: ({ bookingId, status }) => ({
        url: `/bookings/${bookingId}/status`,
        method: 'PUT',
        body: { status },
      }),
      invalidatesTags: ['Booking'],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetMyBookingsQuery,
  useGetVendorBookingsQuery,
  useUpdateBookingStatusMutation,
} = bookingApi;

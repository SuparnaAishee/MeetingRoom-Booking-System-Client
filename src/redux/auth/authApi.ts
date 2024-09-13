import { baseApi } from "../api/baseApi";
import { TLoginUser, TSignupPayload, TUser } from "./authType";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation<{
      success: boolean;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: any; token: string; user: TUser 
}, TLoginUser>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    signupUser: builder.mutation<
      { token: string; user: TUser },
      TSignupPayload
    >({
      query: (credentials) => ({
        url: "/auth/signup",
        method: "POST",
        body: credentials,
      }),
    }),
    // Add the getUserByEmail query here
    getUserByEmail: builder.query<TUser, string>({
      query: (email) => `/auth/${email}`, // Assuming your backend is set to handle this endpoint
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useLoginUserMutation,
  useSignupUserMutation,
  useGetUserByEmailQuery,
} = authApi;

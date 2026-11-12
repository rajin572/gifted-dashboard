import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "../tagTypes";
import Cookies from "js-cookie";
import { getBaseUrl } from "../../helpers/config/envConfig";
import { TOKEN_UPDATED_EVENT } from "../../hooks/useUserData";
import { IRefreshTokenResponse } from "../../types";

const ACCESS_TOKEN_COOKIE = "gifted-mainaccessToken";
const REFRESH_TOKEN_COOKIE = "gifted-mainrefreshToken";

const baseQuery = fetchBaseQuery({
  baseUrl: getBaseUrl(),
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = Cookies.get(ACCESS_TOKEN_COOKIE);
    const resendOtptoken = Cookies.get("gifted-mainforgetToken");
    const resetPasswordToken = Cookies.get("gifted-mainforgetOtpMatchToken");

    if (token) {
      headers.set("token", `${token}`);
      headers.set("authorization", `Bearer ${token}`);
    }
    if (resendOtptoken) {
      headers.set("token", `${resendOtptoken}`);
      headers.set("authorization", `Bearer ${resendOtptoken}`);
    }
    if (resetPasswordToken) {
      headers.set("token", `${resetPasswordToken}`);
      headers.set("authorization", `Bearer ${resetPasswordToken}`);
    }

    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401 && Cookies.get(ACCESS_TOKEN_COOKIE)) {
    const refreshToken = Cookies.get(REFRESH_TOKEN_COOKIE);
    let refreshed = false;

    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: "/auth/refresh-token",
          method: "POST",
          headers: { refreshToken },
        },
        api,
        extraOptions,
      );
      const tokens = (refreshResult.data as IRefreshTokenResponse | undefined)?.data;

      if (tokens?.accessToken) {
        Cookies.set(ACCESS_TOKEN_COOKIE, tokens.accessToken, {
          path: "/",
          expires: 365,
          secure: false,
        });
        if (tokens.refreshToken) {
          Cookies.set(REFRESH_TOKEN_COOKIE, tokens.refreshToken, {
            path: "/",
            expires: 365,
            secure: false,
          });
        }
        refreshed = true;
        result = await baseQuery(args, api, extraOptions);
      }
    }

    if (!refreshed) {
      Cookies.remove(ACCESS_TOKEN_COOKIE);
      Cookies.remove(REFRESH_TOKEN_COOKIE);
      window.dispatchEvent(new Event(TOKEN_UPDATED_EVENT));
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
  tagTypes: tagTypesList,
});

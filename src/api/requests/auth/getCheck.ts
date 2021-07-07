import request from "@api/index";
import { COMMON_VERSION_URL } from "@config";
import { AxiosRequestConfig } from "axios";

export interface GetCheckResponse {
  status: number;
}

/**
 * リンクの有効期限を取得する
 */
export const getCheck = async (email: string, verificationToken: string) => {
  const requestParams: AxiosRequestConfig = {
    headers: {
      "VERIFICATION-TOKEN": verificationToken
    }
  };

  const url = `${COMMON_VERSION_URL}/auth/check?email=${encodeURIComponent(
    email
  )}`;
  return request.get<GetCheckResponse>(url, requestParams);
};

export default getCheck;

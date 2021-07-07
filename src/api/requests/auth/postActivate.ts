import request from "@api/index";
import { COMMON_VERSION_URL } from "@config";
import { NewAccountParams } from "@stores/domain/account/type";
import { AxiosRequestConfig } from "axios";

/**
 * アカウントの新規登録
 * @param data
 */
export const postActivate = async (
  data: NewAccountParams,
  verificationToken: string
) => {
  const requestParams: AxiosRequestConfig = {
    headers: {
      "VERIFICATION-TOKEN": verificationToken
    }
  };
  const url = `${COMMON_VERSION_URL}/auth/activate`;
  return request.post(url, data, requestParams);
};

export default postActivate;

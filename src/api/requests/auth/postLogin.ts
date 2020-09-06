import { LoginParams, LoginSuccessInterFaceList } from "@stores/auth/type";
import request from "@api/index";
import { VERSION_URL } from "@config";

/**
 * 業務支援ログイン
 * @param data :stores/domain/auth/type LoginParams
 */
export const postLogin = async (data: LoginParams) => {
  const url = `${VERSION_URL}/auth/login`;
  return request.post<LoginSuccessInterFaceList, LoginParams>(url, data);
};

export default postLogin;

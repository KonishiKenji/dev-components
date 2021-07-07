import request from "@api/index";
import { VERSION_URL } from "@config";

/**
 * ログイン情報に紐づくユーザー情報を取得する
 */
export const getUser = async () => {
  const url = `${VERSION_URL}/user`;
  return request.get(url);
};

export default getUser;

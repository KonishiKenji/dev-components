import request from "@api/index";
import { VERSION_URL } from "@config";

/**
 * 事業所に紐づくユーザーをID指定で削除する。
 * @param id ユーザーID
 */
export const deleteFacilityUserTargetId = async (id: string) => {
  const url = `${VERSION_URL}/facility/users/${id}`;
  return request.delete(url);
};

export default deleteFacilityUserTargetId;

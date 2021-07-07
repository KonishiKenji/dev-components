import request from "@api/index";
import { COMMON_VERSION_URL } from "@config";

/**
 * 事業所に紐づくユーザーアカウントを取得する。
 */
export const getTargetFacilityUser = async () => {
  const url = `${COMMON_VERSION_URL}/facility_user`;
  return request.get(url);
};

export default getTargetFacilityUser;

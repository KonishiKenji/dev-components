import request from "@api/index";
import { VERSION_URL } from "@config";

export interface PostUpdateAssociatedFacilityParams {
  facility_id: {
    facility_id: number;
  };
}

/**
 * 所属事業所を更新する
 * @param values PostUpdateAssociatedFacilityParams
 */
export const postUpdateAssociatedFacility = async (
  value: PostUpdateAssociatedFacilityParams["facility_id"]
) => {
  const url = `${VERSION_URL}/user`;
  return request.post(url, value);
};

export default postUpdateAssociatedFacility;

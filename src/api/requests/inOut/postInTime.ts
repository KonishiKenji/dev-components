import request from "@api/index";
import { VERSION_URL } from "@config";

interface RequestParam {
  status: number;
  in_time: number;
}

/**
 * 指定したIDを通所状態に変更する
 * @param data
 */
export const postInTime = async (id: number, data: RequestParam) => {
  const url = `${VERSION_URL}/${id}/in_time/`;
  return request.post(url, data);
};

export default postInTime;

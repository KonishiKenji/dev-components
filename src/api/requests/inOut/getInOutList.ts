import request from "@api/index";
import { VERSION_URL } from "@config";

/**
 * タイムカード一覧を取得する
 * @param date YYYYMMDD
 */
export const getInOutList = async (date: string) => {
  const url = `${VERSION_URL}/inout/list/${date}`;
  return request.get(url);
};

export default getInOutList;

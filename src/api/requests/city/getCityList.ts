import request from "@api/index";
import { VERSION_URL } from "@config";

/**
 * 市区町村に一覧を取得する
 * @param prefectureName 都道府県名
 */
export const getCityList = async (prefectureName: string) => {
  const url = `${VERSION_URL}/city/${prefectureName}`;
  return request.get(url);
};

export default getCityList;

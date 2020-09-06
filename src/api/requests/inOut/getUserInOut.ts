import request from "@api/index";
import { VERSION_URL } from "@config";

/**
 * IDと日付に紐づくタイムカード情報を取得する
 * @param date YYYYMMDD
 */
export const getUserInOut = async (id: number, date: string) => {
  const url = `${VERSION_URL}/inout/users/${id}/date/${date}/`;
  return request.get(url);
};

export default getUserInOut;

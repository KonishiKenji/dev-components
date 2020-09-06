import request from "@api/index";
import { VERSION_URL } from "@config";

/**
 * 利用者請求書のデータを取得する
 * @param dataKey
 */
export const getInvoicesUserSeikyuJson = async (dataKey: string) => {
  const url = `${VERSION_URL}/invoices/user_invoice/${dataKey}`;
  return request.get(url);
};

export default getInvoicesUserSeikyuJson;

import request from "@api/index";
import { VERSION_URL } from "@config";

/**
 * 利用者代理受領書のデータを取得する
 * @param dataKey
 */
export const getInvoicesUserAgencyReceiptJson = async (dataKey: string) => {
  const url = `${VERSION_URL}/invoices/user_agency_receipt/${dataKey}`;
  return request.get(url);
};

export default getInvoicesUserAgencyReceiptJson;

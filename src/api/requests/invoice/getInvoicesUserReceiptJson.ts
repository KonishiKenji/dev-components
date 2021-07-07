import request from "@api/index";
import { VERSION_URL } from "@config";

/**
 * 利用者領収書のデータを取得する
 * @param dataKey
 */
export const getInvoicesUserReceiptJson = async (dataKey: string) => {
  const url = `${VERSION_URL}/invoices/user_receipt/${dataKey}`;
  return request.get(url);
};

export default getInvoicesUserReceiptJson;

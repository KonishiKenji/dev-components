import request from "@api/index";
import { VERSION_URL } from "@config";

/**
 * 請求ダウンロード可能対象取得
 */
export const getInvoicesHistory = async () => {
  const url = `${VERSION_URL}/invoices/history`;
  return request.get(url);
};

export default getInvoicesHistory;

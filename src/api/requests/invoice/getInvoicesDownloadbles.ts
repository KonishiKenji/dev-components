import request from "@api/index";
import { VERSION_URL } from "@config";

/**
 * 請求ダウンロード可能対象取得
 */
export const getInvoicesDownloadbles = async () => {
  const url = `${VERSION_URL}/invoices/downloadables`;
  return request.get(url);
};

export default getInvoicesDownloadbles;

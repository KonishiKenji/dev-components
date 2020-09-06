import request from "@api/index";
import { VERSION_URL } from "@config";
import { AxiosRequestConfig } from "axios";

/**
 * 対象の請求・明細書のCSVを取得
 * @param year
 * @param month
 * @param user_ids
 */
export const getInvoicesSeikyuCsv = async (
  year: string,
  month: string,
  user_ids: string
) => {
  const url = `${VERSION_URL}/invoices/seikyu_meisai/${year}/${month}?type=csv&excluded_user_ids=${user_ids}`;
  const requestParams: AxiosRequestConfig = {
    responseType: "blob"
  };
  return request.get(url, requestParams);
};

export default getInvoicesSeikyuCsv;

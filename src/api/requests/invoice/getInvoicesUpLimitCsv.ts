import request from "@api/index";
import { VERSION_URL } from "@config";
import { AxiosRequestConfig } from "axios";

/**
 * 利用者負担上限額管理結果票のCSVを取得
 * @param year
 * @param month
 * @param user_ids
 */
export const getInvoicesUpLimitCsv = async (
  year: string,
  month: string,
  user_ids: string
) => {
  const url = `${VERSION_URL}/invoices/uplimit/${year}/${month}?type=csv&excluded_user_ids=${user_ids}`;
  const requestParams: AxiosRequestConfig = {
    responseType: "blob"
  };
  return request.get(url, requestParams);
};

export default getInvoicesUpLimitCsv;

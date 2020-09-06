import request from "@api/index";
import { VERSION_URL } from "@config";

/**
 * 対象の請求・明細書のJSONを取得
 * @param year
 * @param month
 * @param user_ids
 */
export const getInvoicesUpLimitJson = async (
  year: string,
  month: string,
  user_ids: string
) => {
  const url = `${VERSION_URL}/invoices/uplimit/${year}/${month}?type=json&excluded_user_ids=${user_ids}`;
  return request.get(url);
};

export default getInvoicesUpLimitJson;

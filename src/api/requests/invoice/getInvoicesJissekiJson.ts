import request from "@api/index";
import { VERSION_URL } from "@config";

/**
 * 対象の実績記録票のJsonを取得
 * @param year
 * @param month
 * @param user_ids
 */
export const getInvoicesJissekiJson = async (
  year: string,
  month: string,
  user_ids: string
) => {
  const url = `${VERSION_URL}/invoices/jisseki/${year}/${month}?type=json&excluded_user_ids=${user_ids}`;
  return request.get(url);
};

export default getInvoicesJissekiJson;

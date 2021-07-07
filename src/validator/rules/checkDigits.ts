/**
 * 文字の固定桁数チェック
 * @param value
 */
const checkDigits = (value: string, length: number) => {
  let errorMessage;
  if (value !== "" && value.length !== length) {
    errorMessage = `${length}桁で入力してください`;
  }
  return errorMessage;
};

export default checkDigits;

/**
 * 時間形式チェック
 * @param value
 */
const checkTime = (value: string) => {
  let errorMessage;
  if (
    value !== "" &&
    !(
      /^[2][0-3]:[0-5][0-9]$/.test(value) ||
      /^[0-1][0-9]:[0-5][0-9]$/.test(value)
    )
  ) {
    errorMessage = "00:00の形式で入力してください";
  }

  return errorMessage;
};

export default checkTime;

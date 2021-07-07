/**
 * 文字数チェック
 * @param value
 */

const checkCharacterLength = (
  value: string,
  length: number
): string | undefined => {
  let errorMessage;
  if (value.length > length) {
    errorMessage = `全半角${length}文字以内で入力してください`;
  }

  return errorMessage;
};

export default checkCharacterLength;

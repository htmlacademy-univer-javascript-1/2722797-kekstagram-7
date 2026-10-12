function checkLength(str, maxLength) {
  if (str.length <= maxLength) {
    return true;
  }
  return false;
}

function isPalindrome(str) {
  const newStr = str.replaceAll(' ', '').toLowerCase();
  let reverseStr = '';

  for (let i = newStr.length - 1; i >= 0; i--) {
    reverseStr += newStr[i];
  }

  return newStr === reverseStr;
}

function getNumber(str) {
  const text = str.toString();
  let result = '';

  for (let i = 0; i < text.length; i++) {
    const number = parseInt(text[i], 10);
    if (!Number.isNaN(number)) {
      result += text[i];
    }
  }

  return parseInt(result, 10);
}

checkLength('проверяемая строка', 20);
isPalindrome('топот');
getNumber('2023 год');

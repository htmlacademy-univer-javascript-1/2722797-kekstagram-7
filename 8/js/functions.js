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

const MINUTES_IN_HOUR = 60;

function getMinutes(time) {
  const parts = time.split(':');
  return Number(parts[0]) * MINUTES_IN_HOUR + Number(parts[1]);
}

function isMeetingInWorkday(workdayStart, workdayEnd, meetingStart, meetingDuration) {
  const workdayStartMinutes = getMinutes(workdayStart);
  const workdayEndMinutes = getMinutes(workdayEnd);
  const meetingStartMinutes = getMinutes(meetingStart);
  const meetingEndMinutes = meetingStartMinutes + meetingDuration;

  return meetingStartMinutes >= workdayStartMinutes && meetingEndMinutes <= workdayEndMinutes;
}

checkLength('проверяемая строка', 20);
isPalindrome('топот');
getNumber('2023 год');

isMeetingInWorkday('08:00', '17:30', '14:00', 90); // true
isMeetingInWorkday('8:0', '10:0', '8:0', 120); // true
isMeetingInWorkday('08:00', '14:30', '14:00', 90); // false
isMeetingInWorkday('14:00', '17:30', '08:0', 90); // false
isMeetingInWorkday('8:00', '17:30', '08:00', 900); // false

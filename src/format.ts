// HHMMSS가 숫자 형태로 나타난 것을 HHMMSS 형식 문자열로 바꾸는 함수
function formatTimeHHMMSS(time: number, delimiter = "") {
  if (typeof time !== "number") {
    return time;
  }
  // 시, 분, 초를 각각 추출
  const hours = Math.floor(time / 10000);
  const minutes = Math.floor((time % 10000) / 100);
  const seconds = time % 100;

  // 시, 분, 초를 각각 2자리로 포맷팅
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  // 포맷팅된 시간 문자열을 반환
  return `${formattedHours}${delimiter}${formattedMinutes}${delimiter}${formattedSeconds}`;
}

function formatSecondHHMMSS(time: number, delimiter = "") {
  if (typeof time !== "number") {
    return time;
  }
  // 시, 분, 초를 각각 추출
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  // 시, 분, 초를 각각 2자리로 포맷팅
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  // 포맷팅된 시간 문자열을 반환
  return `${formattedHours}${delimiter}${formattedMinutes}${delimiter}${formattedSeconds}`;
}

export { formatTimeHHMMSS, formatSecondHHMMSS };

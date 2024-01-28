// "YYMMDD" 형태의 오늘 날짜 반환
function getCurrentDate(): string {
  const today = new Date();
  return (
    today.getFullYear().toString().slice(-2) +
    (today.getMonth() + 1).toString().padStart(2, "0") +
    today.getDate().toString().padStart(2, "0")
  );
}

// "HHMMSS" 형태로 현재 시간 반환
function getCurrentTime() {
  const today = new Date();
  return (
    ("0" + today.getHours()).slice(-2) +
    ("0" + today.getMinutes()).slice(-2) +
    ("0" + today.getSeconds()).slice(-2)
  );
}

export { getCurrentDate, getCurrentTime };

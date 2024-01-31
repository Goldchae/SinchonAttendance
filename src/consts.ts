const LECTURE_DATES = {
  "240122": 1,
  "240125": 2,
  "240129": 3,
  "240201": 4,
  "240205": 5,
  "240208": 6,
  "240213": 7,
  "240215": 8,
  "240219": 9,
  "240222": 10,
};

const MESSAGE = {
  DB_CONNECTION_ERROR: "데이터베이스 연결에 실패했습니다. 다시 시도해주세요.",
  YET_STARTED: "아직 출석 시간이 아닙니다.",
  ALREADY_FINISHED: "출석 시간이 지났습니다.",
  ALREADY_END: "이미 출석 완료되었습니다.",
  END: "출석 완료되었습니다.",
  DO_ATTENDANCE: "출석코드를 입력해주세요.",
  HANDLE_NOT_EXIST: "존재하는 핸들이 아닙니다.",
  TRY_AGAIN: "정해진 출석코드와 다릅니다. 재시도해주세요.",
  LOADING: "로딩중입니다...",
};

// 출석 제한 시간
const MINUTE_IN_SECONDS = 60;
const ATTEND_LIMIT_TIME = 15 * MINUTE_IN_SECONDS;

export { MESSAGE, LECTURE_DATES, ATTEND_LIMIT_TIME };

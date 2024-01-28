import { getCurrentDate } from "./time";

const lectureDates = {
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

function isLectureDate(curDate: string): curDate is keyof typeof lectureDates {
  return curDate in lectureDates;
}

function lectureWeek(curDate: string): number {
  // TODO : 강의 날짜가 아닐 때 input disabled 등의 처리
  if (!isLectureDate(curDate)) {
    alert("강의 날짜가 아닙니다.");
    return 0;
  }
  return lectureDates[curDate];
}

const THIS_WEEK = lectureWeek(getCurrentDate());
// for test
// const THIS_WEEK = 0;

const MESSAGE = {
  YET_STARTED: "출석 시간이 아닙니다.",
  ALREADY_FINISHED: "출석 시간이 지났습니다.",
  ALREADY_END: "이미 출석 완료되었습니다.",
  END: "출석 완료되었습니다.",
  DO_ATTENDANCE: "출석코드를 입력해주세요.",
  NOT_EXIST: "존재하는 핸들이 아닙니다.",
  TRY_AGAIN: "재시도해주세요.",
  LOADING: "로딩중입니다..",
};

export { THIS_WEEK, MESSAGE };

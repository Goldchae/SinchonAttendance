const lectureDates = {
  "0122": 1,
  "0125": 2,
  "0129": 3,
  "0201": 4,
  "0205": 5,
  "0208": 6,
  "0213": 7,
  "0215": 8,
  "0219": 9,
  "0222": 10,
};

function todayDate(): string {
  const today = new Date();
  return (
    (today.getMonth() + 1).toString() +
    today.getDate().toString().padStart(2, "0")
  );
}

function isLectureDate(curDate: string): curDate is keyof typeof lectureDates {
  return curDate in lectureDates;
}

function lectureWeek(curDate: string): number {
  if (!isLectureDate(curDate)) {
    alert("강의 날짜가 아닙니다.");
    throw new Error("Invalid date");
  }
  return lectureDates[curDate];
}

const THIS_WEEK = lectureWeek(todayDate());
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

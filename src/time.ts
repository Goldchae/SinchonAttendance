import { LECTURE_DATES } from "./consts";
// TODO : 23시 50분~24시 10분 사이 시간들을 제대로 처리하지 못하는 부분을 수정해야
// 당분간은 강의가 12시 근처에 진행 안되서 괜찮음

// "HHMMSS" 형태 시간 2개를 받아서 초 단위의 차이 반환
// time1에서 time2가 몇 초 지났는지를 반환한다
function timeDifferenceInSecond(time1: string, time2: string): number {
  // 시간을 시, 분, 초로 분리
  const parseTime = (time: string) => {
    const hours = parseInt(time.substring(0, 2), 10);
    const minutes = parseInt(time.substring(2, 4), 10);
    const seconds = parseInt(time.substring(4, 6), 10);
    return { hours, minutes, seconds };
  };

  // 초 단위로 변환
  const toSeconds = ({
    hours,
    minutes,
    seconds,
  }: {
    hours: number;
    minutes: number;
    seconds: number;
  }) => hours * 3600 + minutes * 60 + seconds;

  // 시간 차이 계산 (초 단위)
  const diffInSeconds =
    toSeconds(parseTime(time2)) - toSeconds(parseTime(time1));

  return diffInSeconds;
}

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

function addSecondToHHMMSS(time: string, addTime: number): string {
  const hours = parseInt(time.substring(0, 2), 10);
  const minutes = parseInt(time.substring(2, 4), 10);
  const seconds = parseInt(time.substring(4, 6), 10);

  const newSeconds = seconds + addTime;
  const newMinutes = minutes + Math.floor(newSeconds / 60);
  const newHours = hours + Math.floor(newMinutes / 60);

  return (
    ("0" + (newHours % 24)).slice(-2) +
    ("0" + (newMinutes % 60)).slice(-2) +
    ("0" + (newSeconds % 60)).slice(-2)
  );
}

type tickFunction = (remainingTime: number) => void;

// 상대적으로 정확한 카운트다운 함수 (1초 단위)
function startCountdown(
  durationInSeconds: number,
  onTick: tickFunction,
  onEnd: () => void
) {
  const endTime = Date.now() + durationInSeconds * 1000;

  const interval = setInterval(() => {
    const remainingTime = endTime - Date.now();

    if (remainingTime <= 0) {
      clearInterval(interval);
      onTick(0);
      onEnd();
    } else {
      onTick(Math.ceil(remainingTime / 1000));
    }
  }, 1000);

  return interval;
}

// 강의의 현재 회차를 구하기
function isLectureDate(curDate: string): curDate is keyof typeof LECTURE_DATES {
  return curDate in LECTURE_DATES;
}

function lectureWeek(curDate: string): number {
  // TODO : 강의 날짜가 아닐 때 input disabled 등의 처리
  if (!isLectureDate(curDate)) {
    return 0;
  }
  return LECTURE_DATES[curDate];
}

function getCurrentLectureWeek(): number {
  return lectureWeek(getCurrentDate());
}

export {
  addSecondToHHMMSS,
  timeDifferenceInSecond,
  getCurrentDate,
  getCurrentTime,
  getCurrentLectureWeek,
  startCountdown,
};

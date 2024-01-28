import { ATTEND_LIMIT_TIME, MESSAGE } from "./consts";

import {
  getThisWeekAttendance,
  getThisWeekSecret,
  updateStudentAttendance,
} from "./firebaseData";

import {
  timeDifferenceInSecond,
  getCurrentLectureWeek,
  getCurrentTime,
  addSecondToHHMMSS,
  startCountdown,
} from "./time";

import "./style.css";
import { formatSecondHHMMSS } from "./format";
import { isStudentAttended, isStudentInAttendance } from "./attend";

const attendForm = document.querySelector(".attendForm") as HTMLFormElement;
const attendInput = document.querySelector(".attendInput") as HTMLInputElement;
const attendSubmitButton = document.querySelector(
  ".attendSubmit"
) as HTMLButtonElement;
const userMessageHeading = document.querySelector(
  ".talking"
) as HTMLHeadingElement;
const attendFormContainer = document.querySelector(
  ".attendFormContainer"
) as HTMLDivElement;

type AttendStatus = {
  attendStep: 1 | 2;
  userHandle: string;
  thisWeekAttendance: Record<string, boolean>;
  thisWeekSecretCode: string;
  secretCodeStartTime: string;
  countDownInterval?: NodeJS.Timeout;
};

const CURRENT_ATTEND_STATUS: AttendStatus = {
  attendStep: 1,
  userHandle: "",
  thisWeekAttendance: {},
  thisWeekSecretCode: "",
  secretCodeStartTime: "",
};

async function attendCheckByCode(secretCode: string, userInputCode: string) {
  // 코드가 맞을 때
  if (secretCode == userInputCode) {
    await updateStudentAttendance(CURRENT_ATTEND_STATUS.userHandle, true);
    userMessageHeading.textContent = MESSAGE.END;
    attendFormContainer.style.display = "none";
    CURRENT_ATTEND_STATUS.attendStep = 1;
  } else {
    // 코드가 틀릴 때
    userMessageHeading.textContent = MESSAGE.TRY_AGAIN;
  }
}

window.addEventListener("load", () => {
  userMessageHeading.textContent = "백준 핸들을 입력해 주세요.";
  const currentLectureWeek = getCurrentLectureWeek();
  if (currentLectureWeek === 0) {
    alert("강의 날짜가 아닙니다.");
    // attendInput.disabled = true;
    // attendSubmitButton.disabled = true;
    return;
  }
});

const timerContent = document.querySelector(".timer") as HTMLParagraphElement;
const timerTitle = document.querySelector(".timerTitle") as HTMLHeadingElement;

// 타이머 설정
window.addEventListener("load", async () => {
  const thisWeekWordObject = await getThisWeekSecret();
  if (
    !thisWeekWordObject ||
    thisWeekWordObject.secretCodeStartTime === "000000"
  ) {
    userMessageHeading.textContent = MESSAGE.YET_STARTED;
    attendInput.disabled = true;
    attendSubmitButton.disabled = true;
    timerContent.textContent = "";
    return;
  }
  const { secretCodeStartTime } = thisWeekWordObject;
  // 출석이 끝나는 시간
  const secretCodeEndTime = addSecondToHHMMSS(
    secretCodeStartTime,
    ATTEND_LIMIT_TIME
  );

  const currentTime = getCurrentTime();
  const timeDifference = timeDifferenceInSecond(currentTime, secretCodeEndTime);

  // console.log(timeDifference, secretCodeEndTime, currentTime);

  if (Math.abs(timeDifference) > ATTEND_LIMIT_TIME || timeDifference < 0) {
    timerTitle.textContent = "출석 시간이 아닙니다.";
    return;
  } else {
    timerTitle.textContent = "남은 출석 시간";
    timerContent.textContent = formatSecondHHMMSS(timeDifference, ":");
    CURRENT_ATTEND_STATUS.countDownInterval = startCountdown(
      timeDifference,
      (remainingTime) => {
        timerContent.textContent = formatSecondHHMMSS(remainingTime, ":");
      },
      () => {
        timerTitle.textContent = "출석 시간이 지났습니다.";
        attendInput.disabled = true;
        attendSubmitButton.disabled = true;
      }
    );
  }
});

function emptyInput() {
  if (
    CURRENT_ATTEND_STATUS.attendStep === 1 ||
    CURRENT_ATTEND_STATUS.attendStep === 2
  ) {
    alert("핸들을 입력해 주세요");
  } else {
    alert("출석코드를 입력해 주세요");
  }
}

async function getDBData() {
  try {
    const thisWeekAttendance = await getThisWeekAttendance();
    const thisWeekSecretCode = await getThisWeekSecret();
    return { thisWeekAttendance, thisWeekSecretCode };
  } catch (e) {
    userMessageHeading.textContent = MESSAGE.DB_CONNECTION_ERROR;
    return;
  }
}

window.addEventListener("load", function () {
  // 폼 제출 부분
  attendForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    console.log("사용자의 제출");
    const userInputValue = attendInput.value;

    // 입력창이 비어 있는 상태
    if (!userInputValue) {
      emptyInput();
      return;
    }

    if (CURRENT_ATTEND_STATUS.attendStep == 2) {
      await attendCheckByCode(
        CURRENT_ATTEND_STATUS.thisWeekSecretCode,
        userInputValue
      );

      attendForm.reset();
      return;
    }

    // 핸들을 입력한 상태
    userMessageHeading.textContent = MESSAGE.LOADING;

    // DB 연결 시도
    const thisWeekInfo = await getDBData();
    if (!thisWeekInfo) {
      userMessageHeading.textContent = MESSAGE.DB_CONNECTION_ERROR;
      return;
    }
    const { thisWeekAttendance, thisWeekSecretCode } = thisWeekInfo;
    if (!thisWeekAttendance || !thisWeekSecretCode) {
      userMessageHeading.textContent = MESSAGE.DB_CONNECTION_ERROR;
      return;
    }

    // DB 연결 성공. 출석 시간 확인
    const { secretCode, secretCodeStartTime } = thisWeekSecretCode;
    // startTime이 없음 (강사진이 설정 안함)
    if (!secretCode || secretCodeStartTime === "000000") {
      userMessageHeading.textContent = MESSAGE.YET_STARTED;
      attendInput.disabled = true;
      attendSubmitButton.disabled = true;
      timerContent.textContent = "";
      clearInterval(CURRENT_ATTEND_STATUS.countDownInterval);
      return;
    }
    // console.log(thisWeekAttendance, secretCode, secretCodeStartTime);
    CURRENT_ATTEND_STATUS.thisWeekAttendance = thisWeekAttendance;
    CURRENT_ATTEND_STATUS.thisWeekSecretCode = secretCode;
    CURRENT_ATTEND_STATUS.secretCodeStartTime = secretCodeStartTime;

    const currentTime = getCurrentTime();
    const passedTime = timeDifferenceInSecond(secretCodeStartTime, currentTime);

    if (passedTime > ATTEND_LIMIT_TIME) {
      // 출석 시간이 지난 상태
      userMessageHeading.textContent = MESSAGE.ALREADY_FINISHED;
      return;
    }

    // 입력한 핸들이 학생 리스트에 있는지 확인
    if (!isStudentInAttendance(thisWeekAttendance, userInputValue)) {
      userMessageHeading.textContent = MESSAGE.HANDLE_NOT_EXIST;
      return;
    }

    // 핸들이 존재하고, 이미 출석한 경우
    if (isStudentAttended(thisWeekAttendance, userInputValue)) {
      userMessageHeading.textContent = MESSAGE.ALREADY_END;
      return;
    }

    // 출석코드 입력 화면으로 넘어가기
    CURRENT_ATTEND_STATUS.userHandle = userInputValue;
    // 핸들이 존재하고, 출석하지 않았을 때
    userMessageHeading.textContent = MESSAGE.DO_ATTENDANCE;
    CURRENT_ATTEND_STATUS.attendStep = 2;
    attendForm.reset();
  });
});

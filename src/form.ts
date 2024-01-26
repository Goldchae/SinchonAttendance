import { MESSAGE } from "./consts";

import {
  thisWeekAttendanceRef,
  isStudent,
  isAttendance,
  studentIsHere,
  getThisWeekWordObject,
} from "./firebaseData";
import { timeDifferenceInSecond } from "./utils";

import "./style.css";
import { getDoc } from "firebase/firestore";

const MINUTE_IN_SECONDS = 60;
const LIMIT_TIME = 15 * MINUTE_IN_SECONDS;

const attendForm = document.querySelector(".attendForm") as HTMLFormElement;
const attendInput = document.querySelector(".attendInput") as HTMLInputElement;
const userMessageHeading = document.querySelector(
  ".talking"
) as HTMLHeadingElement;
const middleContainer = document.querySelector(
  ".middleContainer"
) as HTMLDivElement;

type AttendStatus = {
  attendStep: 1 | 2;
  userHandle: string;
  thisWeekSecretCode: string;
  secretCodeStartTime: string;
};

const ATTEND_STATUS: AttendStatus = {
  attendStep: 1,
  userHandle: "",
  thisWeekSecretCode: "",
  secretCodeStartTime: "",
};

function getCurrentTime() {
  const today = new Date();
  return (
    ("0" + today.getHours()).slice(-2) +
    ("0" + today.getMinutes()).slice(-2) +
    ("0" + today.getSeconds()).slice(-2)
  );
}

async function attendCheckByCode(secretCode: string, userInputCode: string) {
  // 코드가 맞을 때
  if (secretCode == userInputCode) {
    await studentIsHere(thisWeekAttendanceRef, ATTEND_STATUS.userHandle);
    userMessageHeading.textContent = MESSAGE.END;
    middleContainer.style.display = "none";
    ATTEND_STATUS.attendStep = 1;
  } else {
    // 코드가 틀릴 때
    userMessageHeading.textContent = MESSAGE.TRY_AGAIN;
  }
}

async function attendCheckByHandle(userInputHandle: string) {
  const thisWeekAttendance = (await getDoc(thisWeekAttendanceRef)).data();
  if (!thisWeekAttendance) {
    alert("출석 데이터를 불러오는 데에 실패했습니다. 다시 시도해 주세요.");
    return;
  }

  // 핸들이 존재하지 않을 때
  if (!isStudent(thisWeekAttendance, userInputHandle)) {
    userMessageHeading.textContent = MESSAGE.NOT_EXIST;
    return;
  }

  // 핸들이 존재할 때
  if (isAttendance(thisWeekAttendance, userInputHandle)) {
    userMessageHeading.textContent = MESSAGE.ALREADY_END;
    return;
  }

  // 핸들이 존재하고, 출석하지 않았을 때
  userMessageHeading.textContent = MESSAGE.DO_ATTENDANCE;
  ATTEND_STATUS.attendStep = 2;
}

window.onload = function () {
  // 폼 제출 부분
  attendForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const input = attendInput.value;
    // HHMMSS 형태의 현재 시간
    const currentTime = getCurrentTime();

    if (!input) {
      const a = await getDoc(thisWeekAttendanceRef);
      console.log(a.data());
      if (ATTEND_STATUS.attendStep == 1) {
        alert("핸들을 입력해 주세요");
      } else {
        alert("출석코드를 입력해 주세요");
      }
      return;
    }

    // 핸들을 입력한 상태
    userMessageHeading.textContent = MESSAGE.LOADING;

    // 유저가 핸들을 입력하고 나서 이제 출석코드를 입력하는 상태
    // 이때는 출석 코드와 출석시간이 이미 불러와져 있다
    if (ATTEND_STATUS.attendStep == 2) {
      await attendCheckByCode(ATTEND_STATUS.thisWeekSecretCode, input);
      return;
    }

    const thisWeekWordObject = await getThisWeekWordObject();
    if (!thisWeekWordObject) {
      alert("출석코드를 불러오는 데에 실패했습니다. 다시 시도해 주세요.");
      return;
    }

    const { secretCode, startTime } = thisWeekWordObject;

    console.log(secretCode, startTime, currentTime);

    if (!secretCode || !startTime) {
      // 출석코드가 없는 상태 -> 강사가 출석코드를 설정하지 않은 상태이므로 출석 시간이 아니라고 알림
      userMessageHeading.textContent = MESSAGE.YET_STARTED;
      return;
    }

    ATTEND_STATUS.thisWeekSecretCode = secretCode;
    ATTEND_STATUS.secretCodeStartTime = startTime.toString();

    const timeDifference = timeDifferenceInSecond(
      ATTEND_STATUS.secretCodeStartTime,
      currentTime
    );

    if (timeDifference > LIMIT_TIME) {
      // 출석 시간이 지난 상태
      userMessageHeading.textContent = MESSAGE.ALREADY_FINISHED;
      return;
    }

    ATTEND_STATUS.userHandle = input;

    // 출석코드도 불러왔고, 출석 시간 중이다
    attendForm.reset();
    attendCheckByHandle(ATTEND_STATUS.userHandle);
    ATTEND_STATUS.attendStep = 2;
  });
};

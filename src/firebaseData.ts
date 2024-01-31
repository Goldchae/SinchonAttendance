import { initializeApp } from "firebase/app";
import { getFirestore, getDoc, doc, updateDoc } from "firebase/firestore";
import { getCurrentLectureWeek } from "./time";
import { formatTimeHHMMSS } from "./format";

// TODO : novice or advanced
export const lectureClass: string = "advanced";

//파이어베이스 초기 세팅
const firebaseNoviceConfig = {
  apiKey: "AIzaSyDPiIf3b-npnhE1yUe6zh71rH0Ao8LKeTo",
  authDomain: "sinchonattendance.firebaseapp.com",
  databaseURL: "https://sinchonattendance-default-rtdb.firebaseio.com",
  projectId: "sinchonattendance",
  storageBucket: "sinchonattendance.appspot.com",
  messagingSenderId: "502890463273",
  appId: "1:502890463273:web:8da140c037f1f532e09c38",
  measurementId: "G-ND0CDPHZ3Z",
};

const firebaseAdvancedConfig = {
  apiKey: "AIzaSyC2csBRWTvcDJY02-v182SdOFohVgnh170",
  authDomain: "sinchonattendanceadvanced.firebaseapp.com",
  projectId: "sinchonattendanceadvanced",
  storageBucket: "sinchonattendanceadvanced.appspot.com",
  messagingSenderId: "458774138568",
  appId: "1:458774138568:web:ee7151c3c3aef58a489ffd",
  measurementId: "G-70V4V9HH7Z",
};

const firebaseConfig =
  lectureClass === "novice" ? firebaseNoviceConfig : firebaseAdvancedConfig;

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
// 이번 주차 출석 데이터 가져오기
const thisWeekAttendanceRef = doc(
  db,
  "attendance",
  String(getCurrentLectureWeek())
);
// 이번 주차 출석 코드 가져오기
const thisWeekSecretRef = doc(db, "secret", String(getCurrentLectureWeek()));

async function getThisWeekAttendance(): Promise<
  Record<string, boolean> | undefined
> {
  const attedanceRef = await getDoc(thisWeekAttendanceRef);
  return attedanceRef.data();
}

async function getThisWeekSecret(): Promise<
  Record<string, string> | undefined
> {
  const secretRef = await getDoc(thisWeekSecretRef);
  const secretCode = secretRef.data()?.secretCode;
  const startTime = secretRef.data()?.startTime;
  const secretCodeStartTime = formatTimeHHMMSS(startTime);
  // {secretCode: "1234", secretCodeStartTime: "012400"} 형식
  return { secretCode, secretCodeStartTime };
}

async function updateStudentAttendance(
  handle: string,
  isAttendance: boolean
): Promise<void> {
  await updateDoc(thisWeekAttendanceRef, { [handle]: isAttendance });
}

export {
  thisWeekAttendanceRef,
  thisWeekSecretRef,
  getThisWeekAttendance,
  getThisWeekSecret,
  updateStudentAttendance,
};

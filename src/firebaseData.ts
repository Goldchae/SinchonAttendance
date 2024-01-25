import { THIS_WEEK } from "./consts";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  getDoc,
  doc,
  DocumentReference,
  DocumentData,
  updateDoc,
} from "firebase/firestore";

//파이어베이스 초기 세팅
const firebaseConfig = {
  apiKey: "AIzaSyDPiIf3b-npnhE1yUe6zh71rH0Ao8LKeTo",
  authDomain: "sinchonattendance.firebaseapp.com",
  databaseURL: "https://sinchonattendance-default-rtdb.firebaseio.com",
  projectId: "sinchonattendance",
  storageBucket: "sinchonattendance.appspot.com",
  messagingSenderId: "502890463273",
  appId: "1:502890463273:web:8da140c037f1f532e09c38",
  measurementId: "G-ND0CDPHZ3Z",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
// 이번 주차 출석 데이터 가져오기
const thisWeekAttendanceRef = doc(db, "attendance", String(THIS_WEEK));
const thisWeekSecretRef = doc(db, "secret", String(THIS_WEEK));

//핸들 해당 주차에 있는지 체크
function isStudent(
  attendance: Record<string, boolean>,
  handle: string
): boolean {
  return attendance[handle] !== undefined && attendance[handle] !== null;
}

//핸들 해당 주차 출석 여부 반환
function isAttendance(
  attendance: Record<string, boolean>,
  handle: string
): boolean {
  return attendance[handle];
}

//핸들 출석으로 업데이트
async function studentIsHere(
  weekAttendanceRef: DocumentReference<DocumentData, DocumentData>,
  handle: string
) {
  await updateDoc(weekAttendanceRef, { [handle]: true });
}

async function getThisWeekWordObject() {
  const code = (await getDoc(thisWeekSecretRef)).data();
  if (!code || !code.secretCode) {
    alert("출석코드가 없습니다. 다시 시도해주세요.");
    return null;
  }
  // {secretCode: "1234", startTime: "012400"} 형식
  return code;
}

export {
  thisWeekAttendanceRef,
  thisWeekSecretRef,
  isStudent,
  isAttendance,
  studentIsHere,
  getThisWeekWordObject,
};

// (async function getAttendance() {
//   console.log(THIS_WEEK, thisWeekAttendanceRef);
//   const attendance = await getDoc(thisWeekAttendanceRef);
//   console.log(attendance.data());
// })();

// 데이터 확인 테스트 / 저장
/*let attendanceArray;

attendance.get().then((data) => {
  data.forEach((doc) => {
    if (doc.id == THIS_WEEK) {
      //console.log(doc.data());
      attendanceArray = doc.data();
    }
  });
});

//핸들 해당 주차에 있는지 체크
function IsStudent(handle) {
  if (
    typeof attendanceArray[handle] == "undefined" ||
    attendanceArray[handle] == null
  ) {
    return false;
  }
  return true;
}

//핸들 해당 주차 출석 여부 반환
function IsStudentHere(handle) {
  return attendanceArray[handle]; // true, false
}

//핸들 출석으로 업데이트
function studentIsHere(handle) {
  attendance.doc(String(THIS_WEEK)).update({ [handle]: true });
}

let thisWeekWord;
let startTime;
//강사진이 설정한 출석코드, 입력시간 가져오기
function whatIsWord() {
  const secret = db.collection("secret");
  secret.get().then((data) => {
    data.forEach((doc) => {
      if (doc.id == THIS_WEEK) {
        const secretArray = doc.data();
        thisWeekWord = secretArray["secretCode"];
        startTime = secretArray["startTime"];
      }
    });
  });
}

export { IsStudent, IsStudentHere, studentIsHere, whatIsWord, db };*/

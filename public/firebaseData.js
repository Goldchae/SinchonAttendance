import { THIS_WEEK } from "./consts.js";

//파이어베이스 초기 세팅
var firebaseConfig = {
  apiKey: "AIzaSyDPiIf3b-npnhE1yUe6zh71rH0Ao8LKeTo",
  authDomain: "sinchonattendance.firebaseapp.com",
  databaseURL: "https://sinchonattendance-default-rtdb.firebaseio.com",
  projectId: "sinchonattendance",
  storageBucket: "sinchonattendance.appspot.com",
  messagingSenderId: "502890463273",
  appId: "1:502890463273:web:8da140c037f1f532e09c38",
  measurementId: "G-ND0CDPHZ3Z",
};

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
const attendance = db.collection("attendance");

// 데이터 확인 테스트 / 저장
var attendanceArray;

attendance.get().then((data) => {
  data.forEach((doc) => {
    if (doc.id == THIS_WEEK) {
      console.log(doc.data());
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
  attendance.doc(THIS_WEEK).update({ [handle]: true });
}

export { IsStudent, IsStudentHere, studentIsHere };

import {
  ALREADY_END,
  END,
  DO_ATTENDANCE,
  NOT_EXIST,
  TRY_AGAIN,
  ROADING,
  ALREADY_FINISHED,
  YET_STARTED,
  THIS_WEEK,
} from "./consts.js";

import { IsStudent, IsStudentHere, studentIsHere, db } from "./firebaseData.js";

var form = document.getElementById("form");
var input = document.getElementById("msg");
var txt = document.getElementById("txt");

var mode = 1;
var thisHandle;

var thisWeekWord;
var startTime;
const secret = db.collection("secret");

// 이번주의 비밀 단어와 시작 시간을 가져와서 콜백함수로 넘겨줌
function fromclicked(callback) {
  secret.get().then((data) => {
    data.forEach((doc) => {
      if (doc.id == THIS_WEEK) {
        var secretArray = doc.data();
        thisWeekWord = secretArray["secretCode"];
        startTime = secretArray["startTime"];
      }
    });
  });

  callback(thisWeekWord, startTime);
}

const today = new Date();

window.onload = function () {
  // 폼 제출 부분
  fromclicked(function (thisWeekWord, startTime) {
    //console.log(thisWeekWord, startTime);
  });
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var msg = input.value;
    if (msg) {
      txt.textContent = ROADING;
      if (mode == 1) {
        //시간 체크
        var time =
          ("0" + today.getHours()).slice(-2) +
          ("0" + today.getMinutes()).slice(-2) +
          ("0" + today.getSeconds()).slice(-2);
        time = Number(time);
        fromclicked(function (thisWeekWord, startTime) {
          if (
            // 설정하지 않은 상태
            thisWeekWord == null ||
            thisWeekWord == "" ||
            typeof thisWeekWord == "undefined"
          ) {
            txt.innerHTML = YET_STARTED;
          } else if (
            // 강사진이 설정을 완료한 상태일 시
            //15분이 지나지 않음
            time - startTime <=
            1500
          ) {
            form.reset();
            thisHandle = msg;
            getHandle(msg);
          } else {
            // 시간이 지난 상태
            txt.innerHTML = ALREADY_FINISHED;
          }
        });
      } else {
        getCode(msg);
        form.reset();
      }
    }
  });
};

var twice = 1;
function getHandle(handle) {
  // 핸들이 리스트에 있을 때
  if (IsStudent(handle)) {
    if (!IsStudentHere(handle) && twice == 1) {
      // 핸들이 출석하지 않았을 떄
      txt.innerHTML = DO_ATTENDANCE;
      mode = 2;
      twice = 2;
    } else {
      // 핸들이 출석했을 때
      txt.innerHTML = ALREADY_END;
    }
  } else {
    // 핸들이 리스트에 없을 때
    txt.innerHTML = NOT_EXIST;
  }
}

function getCode(code) {
  // 코드가 맞을 때
  if (code == thisWeekWord) {
    studentIsHere(thisHandle);
    txt.innerHTML = END;
    document.getElementById("inMiddle").style.display = "none";
    mode = 1;
  } else {
    // 코드가 틀릴 때
    txt.innerHTML = TRY_AGAIN;
  }
}

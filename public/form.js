import {
  THIS_WEEK_WORD,
  ALREADY_END,
  END,
  DO_ATTENDANCE,
  NOT_EXIST,
  TRY_AGAIN,
  ROADING,
} from "./consts.js";

import { IsStudent, IsStudentHere, studentIsHere } from "./firebaseData.js";

var form = document.getElementById("form");
var input = document.getElementById("msg");
var txt = document.getElementById("txt");

var msg = document.getElementById("msg").value;

var mode = 1;
var thisHandle;

window.onload = function () {
  // 폼 제출 부분
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var msg = input.value;
    if (msg) {
      txt.textContent = ROADING;
      form.reset();
      if (mode == 1) {
        thisHandle = msg;
        getHandle(msg);
      } else {
        getCode(msg);
      }
    }
  });
};

function getHandle(handle) {
  // 핸들이 리스트에 있을 때
  if (IsStudent(handle)) {
    // 핸들이 출석했을 때
    if (IsStudentHere(handle)) {
      txt.innerHTML = ALREADY_END;
    } else {
      // 핸들이 출석하지 않았을 떄
      txt.innerHTML = DO_ATTENDANCE;
      mode = 2;
    }
  } else {
    // 핸들이 리스트에 없을 때
    txt.innerHTML = NOT_EXIST;
  }
}

function getCode(code) {
  // 코드가 맞을 때
  if (code == THIS_WEEK_WORD) {
    studentIsHere(thisHandle);
    txt.innerHTML = END;
    mode = 1;
  } else {
    // 코드가 틀릴 때
    txt.innerHTML = TRY_AGAIN;
  }
}

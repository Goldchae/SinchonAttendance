"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YET_STARTED = exports.ALREADY_FINISHED = exports.ROADING = exports.TRY_AGAIN = exports.NOT_EXIST = exports.DO_ATTENDANCE = exports.END = exports.ALREADY_END = exports.THIS_WEEK = void 0;
let THIS_WEEK = 0;
exports.THIS_WEEK = THIS_WEEK;
function pad(n) {
    return n < 10 ? "0" + n : n.toString();
}
const today = new Date();
const todayDate = pad(today.getMonth() + 1) + pad(today.getDate());
const weekToNumber = {
    "0222": 10,
    "0219": 9,
    "0215": 8,
    "0213": 7,
    "0208": 6,
    "0205": 5,
    "0201": 4,
    "0129": 3,
    "0125": 2,
    "0122": 1,
};
exports.THIS_WEEK = THIS_WEEK = weekToNumber[todayDate];
if (todayDate == 222) {
    exports.THIS_WEEK = THIS_WEEK = 10;
}
else if (todayDate == 219) {
    exports.THIS_WEEK = THIS_WEEK = 9;
}
else if (todayDate == 215) {
    exports.THIS_WEEK = THIS_WEEK = 8;
}
else if (todayDate == 213) {
    exports.THIS_WEEK = THIS_WEEK = 7;
}
else if (todayDate == 208) {
    exports.THIS_WEEK = THIS_WEEK = 6;
}
else if (todayDate == 205) {
    exports.THIS_WEEK = THIS_WEEK = 5;
}
else if (todayDate == 201) {
    exports.THIS_WEEK = THIS_WEEK = 4;
}
else if (todayDate == 129) {
    exports.THIS_WEEK = THIS_WEEK = 3;
}
else if (todayDate == 125) {
    exports.THIS_WEEK = THIS_WEEK = 2;
}
else if (todayDate == 122) {
    exports.THIS_WEEK = THIS_WEEK = 1;
}
else {
    exports.THIS_WEEK = THIS_WEEK = 0;
}
const msgs = {
    YET_STARTED: "출석 시간이 아닙니다.",
    ALREADY_FINISHED: "출석 시간이 지났습니다.",
    ALREADY_END: "이미 출석 완료되었습니다.",
    END: "출석 완료되었습니다.",
    DO_ATTENDANCE: "출석코드를 입력해주세요.",
    NOT_EXIST: "존재하는 핸들이 아닙니다.",
    TRY_AGAIN: "재시도해주세요.",
    LOADING: "로딩중입니다..",
};
const YET_STARTED = "출석 시간이 아닙니다.";
exports.YET_STARTED = YET_STARTED;
const ALREADY_FINISHED = "출석 시간이 지났습니다.";
exports.ALREADY_FINISHED = ALREADY_FINISHED;
const ALREADY_END = "이미 출석 완료되었습니다.";
exports.ALREADY_END = ALREADY_END;
const END = "출석 완료되었습니다.";
exports.END = END;
const DO_ATTENDANCE = "출석코드를 입력해주세요.";
exports.DO_ATTENDANCE = DO_ATTENDANCE;
const NOT_EXIST = "존재하는 핸들이 아닙니다.";
exports.NOT_EXIST = NOT_EXIST;
const TRY_AGAIN = "재시도해주세요.";
exports.TRY_AGAIN = TRY_AGAIN;
const ROADING = "로딩중입니다..";
exports.ROADING = ROADING;

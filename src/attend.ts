// 출석과 관련된 함수들을 정의한다

// 핸들이 해당 주차 출석 리스트에 있는지 체크
function isStudentInAttendance(
  attendance: Record<string, boolean>,
  handle: string
): boolean {
  return Boolean(attendance[handle]);
}

//핸들 해당 주차 출석 여부 반환
function isAttended(
  attendance: Record<string, boolean>,
  handle: string
): boolean {
  return attendance[handle];
}

export { isStudentInAttendance, isAttended };

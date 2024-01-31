// 출석과 관련된 함수들을 정의한다

// 핸들이 해당 주차 출석 리스트에 있는지 체크
function isStudentInAttendance(
  attendance: Record<string, boolean>,
  handle: string
): boolean {
  return handle in attendance && Object.hasOwnProperty.call(attendance, handle);
}

//핸들 해당 주차 출석 여부 반환
function isStudentAttended(
  attendance: Record<string, boolean>,
  handle: string
): boolean {
  return attendance[handle];
}

export { isStudentInAttendance, isStudentAttended };

// "HHMMSS" 형태 시간 2개를 받아서 초 단위의 차이 반환
function timeDifferenceInSecond(time1: string, time2: string): number {
  // 시간을 시, 분, 초로 분리
  const parseTime = (time: string) => {
    const hours = parseInt(time.substring(0, 2), 10);
    const minutes = parseInt(time.substring(2, 4), 10);
    const seconds = parseInt(time.substring(4, 6), 10);
    return { hours, minutes, seconds };
  };

  // 초 단위로 변환
  const toSeconds = ({
    hours,
    minutes,
    seconds,
  }: {
    hours: number;
    minutes: number;
    seconds: number;
  }) => hours * 3600 + minutes * 60 + seconds;

  // 시간 차이 계산 (초 단위)
  const diffInSeconds = Math.abs(
    toSeconds(parseTime(time1)) - toSeconds(parseTime(time2))
  );

  return diffInSeconds;
}

export { timeDifferenceInSecond };

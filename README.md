# **✅ ICPC Sinchon 알고리즘 캠프 출석체크 시스템 ✅**

[ICPC Sinchon](https://icpc-sinchon.io/) 알고리즘 캠프에서 출석체크를 위해 사용하는 페이지입니다.

## 링크

[알고리즘 캠프 초급 출석확인](https://sinchonattendance.web.app)

[알고리즘 캠프 중급 출석확인](https://sinchonattendanceadvanced.web.app)

## 기술

- 언어 : TypeScript
- 스타일링 : Vanilla CSS
- DB : Firebase
- Hosting : Firebase
- VCS : Git
- build : Webpack

## 실행

1. 코드 내려받기

```bash
git clone https://github.com/Goldchae/SinchonAttendance.git
```

2. 의존성 설치

```bash
cd SinchonAttendance
yarn
```

3. 개발 서버 실행

```bash
yarn dev
```

4. 빌드

```bash
yarn build
```

5. Firebase 배포

```bash
firebase deploy
```

## 폴더 구조



## DB 구조

```
attendance
  1(주차)
    핸들1(string): 출석여부(boolean)
    핸들2: 출석여부
    ...
  2(주차)
    ...
  ...
secret
  1(주차)
    secretCode: 출석 코드(string)
    startTime: 출석 코드 등록 시간(number)
    ...
  2(주차)
    ...
  ...
```

"attendance" 컬렉션 - "n주차" 문서 - "핸들:출석여부" 필드

"secret" 컬렉션 - "n주차" 문서 - "secretCode:출석코드", "startTime:출석코드 등록 시간" 필드

## TODO

### 📍 Status 페이지 구현하기

전체 주차 출석체크 현황 + 현재 환급 가능 여부 표시

### 📍글자 / 이미지 가운데 정렬 수정

## 작성자

MIT @ [SungHyun Kim](https://witch.work/), [EunChae Jung](https://github.com/Goldchae)
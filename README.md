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

```
/root
├── /src // 프로젝트 소스 코드 폴더
│   ├── /image // 사용할 이미지 파일
│   ├── attend.ts // 출석체크 관련 함수 정의
│   ├── consts.ts // 상수 정의
│   ├── firebaseData.ts // Firebase 관련 데이터와 DB 접근 함수 정의
|   ├── form.ts // 출석체크 폼의 동작 정의
|   ├── format.ts // 시간 포맷 관련 함수 정의
|   ├── time.ts // 시간 관련 함수 정의
|   ├── index.html // 메인 페이지 문서 구조 정의
|   ├── style.css // 전역 스타일 시트
├── /dist // 빌드 결과물 폴더
├── .eslintignore // ESLint 무시 파일 목록
├── .eslintrc.json // ESLint 설정 파일
├── .firebaserc // firebase 설정 파일
├── firebase.json // firebase 설정 파일
├── firestore.rules // firestore 프로젝트 규칙 파일
├── package.json // 프로젝트 정보 및 의존성 목록
├── tsconfig.json // TypeScript 설정 파일
├── webpack.config.js // Webpack 설정 파일
└── yarn.lock // 의존성 버전 세부 목록
```

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
# 프로젝트 정보

## 지원자명 : 박진영

## 프로젝트 실행방법 :
- `git clone https://github.com/jypman/wanted-pre-onboarding-frontend.git` : 
  - 프로젝트 내려받기
- `npm install` : 패키지 설치
- `npm start` : 
  - 브라우저 실행
    - (홈페이지로 이동합니다.)
- `npm test` : 테스트 실행
- `홈페이지('/')` : 
  - 로그인, 회원가입, todo list
  <br>페이지로 이동할 수 있는 버튼이
  <br>있습니다.

## 과제 정보
- https://github.com/walking-sunset/selection-task

## 프로젝트 구조:
- `src / api`: api 요청 함수 관리
- `src / providers`: context api를 이용하여 데이터를 넘겨 받도록 하는 provider 관리
- `src / types`: 컴포넌트 간 공통적으로 사용하는 type alias 혹은 interface를 관리
- `src / pages`: 페이지를 렌더링하는 컴포넌트 관리
- `src / styles` : style module 관리
- `src/ tests` : 테스트 파일 관리
- `src / utils` : 자주 사용되는 유틸성 함수 관리

## 이 부분은 어필하고 싶어요!
1. 관심사 분리
   - 컴포넌트의 로직과 뷰(tsx)를 분리
   - <span style="color:green">how?</span> 로직의 경우 context api를 통해 컴포넌트에 전달하도록 하여 컴포넌트로부터 로직을 분리 
   - <span style="color:green">why?</span> 하나의 모듈은 하나의 목적만 갖게 됨으로써 특정 부분을 수정할 경우 수정할 이유가 한가지로 제한됩니다.
     - 추후 특정 기능 수정 시 해당 모듈만 수정하기에 서비스의 변화에 대응할 수 있으며 유지보수 용이
   
2. 최적화
   - todo 목록의 일부만 수정해도 전체 todo가 리렌더링되는 현상 발견
   - <span style="color:green">how?</span> React.memo로 TodoItem.tsx 컴포넌트를 감싸주기
   - <span style="color:green">why?</span>특정 목록의 상태 값이 바뀌었을 때 해당 목록만 리렌더링 되도록 최적화할 수 있기 때문입니다.

3. 서버 공통 요청 로직 모듈로 분리
   - <span style="color:green">how?</span> axios의 instance 생성
   - <span style="color:green">why?</span> 서버 요청시 공통적으로 적용되는 로직을 한 파일(/api/http.ts)에서 관리하여 매번 서버 요청 시 로직을 추가(예 : 요청 헤더)할 필요가 없기 때문에 서버 요청 코드 경량화 가능

## 배포링크
- https://jyp-todo-list.vercel.app
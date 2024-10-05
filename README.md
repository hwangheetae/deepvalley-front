# 🌲 깊은산골짜기

- **📅 프로젝트 기간**: 2024.07 - 2024.10 (약 4개월)

- **👥 팀원**: 이주원(팀장), 김하은, 양윤수, 이재빈, 구본헌, 황희태

- **🌐 배포 링크**: [깊은산골짜기](https://djw9hdrinhwdq.cloudfront.net/intro)

## 📌 프로젝트 소개

'깊은산골짜기'는 사용자가 주변 계곡을 탐색하고 리뷰를 남길 수 있는 웹 서비스입니다. 본 프로젝트는 자연 속에서 계곡을 찾고 즐기려는 사람들에게 유용한 정보를 제공하기 위해 기획되었습니다.

이 개인 레포지토리에서는 프로젝트에 기여한 내용을 좀 더 깊이 있게 다루고, 각 작업을 진행하며 겪은 어려움과 그 해결 방법, 그리고 개선한 부분들을 상세히 설명합니다. 또한, 개발 과정에서 얻은 통찰과 앞으로 개선할 부분들에 대해 서술하여 프로젝트와 개인의 성장을 함께 기록하고자 합니다.

## 📝 작성한 페이지

- 🔒 인증/인가 페이지
- 🏠 메인 페이지
- 📝 프로필 수정 페이지
- ✍️ 리뷰 수정 페이지 (다른 팀원이 작성한 페이지 수정)

## 🛠️ 기술 스택

![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-%23000000.svg?style=for-the-badge&logo=zustand&logoColor=white)
![React](https://img.shields.io/badge/React-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Tanstack Query](https://img.shields.io/badge/Tanstack_Query-%235A29E4.svg?style=for-the-badge&logo=tanstackquery&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Chakra UI](https://img.shields.io/badge/Chakra_UI-%234ED1C5.svg?style=for-the-badge&logo=chakraui&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)
![AWS S3](https://img.shields.io/badge/AWS_S3-%23FF9900.svg?style=for-the-badge&logo=amazonaws&logoColor=white)
![CloudFront](https://img.shields.io/badge/CloudFront-%23232F3E.svg?style=for-the-badge&logo=amazonaws&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-%234B32C3.svg?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-%23F7B93E.svg?style=for-the-badge&logo=prettier&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-%23646CFF.svg?style=for-the-badge&logo=vitest&logoColor=white)
![Framer](https://img.shields.io/badge/Framer-%23000000.svg?style=for-the-badge&logo=framer&logoColor=white)
![GitHub Projects](https://img.shields.io/badge/GitHub_Projects-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white)
![Discord](https://img.shields.io/badge/Discord-%237289DA.svg?style=for-the-badge&logo=discord&logoColor=white)

## ✨ 기여 내용

- **🖼️ 이미지 업로드 최적화**
  - 모바일 환경에서 고화질 이미지 업로드 문제 해결
  - 사용자가 업로드한 파일을 **WebP**로 변환하고, 필요한 크기로 리사이즈하여 **S3**에 저장

- **🚀 불필요한 서버 요청 및 렌더링 개선**
  - **서버 요청 최적화**
    - **Zustand**와 **Tanstack Query**를 사용하여 불필요한 서버 요청 감소
    - 메인 페이지의 사용자 데이터를 **Zustand**의 **persist 미들웨어**로 전역 관리하여 반복 요청 방지
    - **Tanstack Query**의 **캐시 무효화** 기능을 활용하여 변경된 정보의 즉각적 반영
  - **렌더링 최적화**
    - `memo`를 적용하여 메인 페이지의 렌더링 횟수를 **8회에서 2회로 감소**
    - 불필요한 컴포넌트 재렌더링 방지로 성능 향상
  - **사용자 경험 개선**
    - 에러 핸들링과 **Tanstack Query**의 `isLoading` 상태를 활용하여 UX 개선

- **🔧 CI/CD 구축 및 배포**
  - **AWS S3**와 **CloudFront**를 이용한 프론트엔드 배포
  - **GitHub Actions**를 통해 메인 브랜치에 푸시될 때 자동으로 빌드, 배포 및 캐시 무효화 설정하여 배포 자동화 구현
  - 테스트 자동화 추가 (Vitest 사용)
  - **PWA** 적용, 사용자 환경에 따라 라우팅 분리
  - **TWA** 전환 후 안드로이드 **PlayStore**에 앱 등록 진행 중 (비공개 테스트 진행 중)

- **🔍 검색 엔진 SEO 최적화 및 Lighthouse 지표 개선**
  - `robots.txt`, `react-helmet`을 이용한 메타태그 작성으로 **SEO 성능을 83점에서 100점으로 개선**
  - **Lighthouse** 점수 개선

- **🌟 랜딩 페이지 작성**
  - **Intersection Observer**와 **Framer**를 사용하여 동적인 랜딩 페이지 제작

- **📝 코드 가독성 및 재사용성 개선**
  - 코드 가독성 향상으로 새로운 기능 추가 시 소요 시간 단축
  - **Tanstack Query**를 사용하여 선언형 코드 작성으로 재사용성 높임

- **🤝 개발 환경 및 협업 설정**
  - **TypeScript**, **ESLint**, **Prettier**를 사용하여 통일성 있는 개발 환경 구축
  - **GitHub Projects**, **Notion**, **Discord**를 활용한 이슈 관리 및 협업
  - 기여한 부분에 테스트 코드 도입 시도 (Vitest 사용)

- **🛡️ 인증/인가**
  - **JWT Access Token**을 사용한 인증 구현 (**Session Storage** 관리)
  - Access Token 만료 에러를 **Error Boundary**로 처리
  - **Private Route**를 구현하여 인증된 사용자만 서비스 접근 가능
  - **OAuth 2.0** 기반의 **카카오 로그인 API**를 사용하여 소셜 로그인 구현

<img src="" alt="배너" width="100%"/>
</a>

<br/>
<br/>

# 1. Project Overview (프로젝트 개요)

- 프로젝트 이름: Mec
- 프로젝트 설명: Likelion JavaScript 프로젝트

<br/>
<br/>

# 2. Team Members (팀원 및 팀 소개)

|                 최승균                  |               김하영               |                남주성                |                  강석현                  |
| :-------------------------------------: | :--------------------------------: | :----------------------------------: | :--------------------------------------: |
|                   FE                    |                 FE                 |                  FE                  |                    FE                    |
| [GitHub](https://github.com/seuchoi0531) | [GitHub](https://github.com/hayeonggim1) | [GitHub](https://github.com/namju1) | [GitHub](https://github.com/Kanghyeon00) |

<br/>
<br/>

# 3. Key Features (주요기능 개발)

- **Mec 페이지**
- **doodi 페이지**
- **sockast 페이지**
- **card 페이지**
- **arrow-dodge 페이지**

<br/>
<br/>

# 4. Tasks & Responsibilities (주요 역할 분담)

|        |                                                      |
| ------ | ---------------------------------------------------- |
| 최승균 | <ul><li>Mec</li></ul> |
| 김하영 | <ul><li>doodi</li><li>sockast</li></ul> |
| 남주성 | <ul><li>arrow-dodge</li></ul>                        |
| 강석현 | <ul><li>card</li></ul>            |

<br/>
<br/>

# 5. Technology Stack (기술 스택)

| 분류           | 사용 기술                                                                                                                                                                                                                                                                                                                                                                                                              |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Frontend** | ![HTML5](https://img.shields.io/badge/-HTML5-E34F26?style=flat\&logo=html5\&logoColor=white) ![CSS3](https://img.shields.io/badge/-CSS3-1572B6?style=flat\&logo=css3\&logoColor=white) ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat\&logo=typescript\&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/-TailwindCSS-06B6D4?style=flat\&logo=tailwindcss\&logoColor=white) |
| **빌드 도구**    | ![Vite](https://img.shields.io/badge/-Vite-646CFF?style=flat\&logo=vite\&logoColor=white)                                                                                                                                                                                                                                                                                                                          |
| **형상 관리**    | ![Git](https://img.shields.io/badge/-Git-F05032?style=flat\&logo=git\&logoColor=white) ![GitHub](https://img.shields.io/badge/-GitHub-181717?style=flat\&logo=github\&logoColor=white)                                                                                                                                                                                                                             |
| **디자인 협업**   | ![Figma](https://img.shields.io/badge/-Figma-F24E1E?style=flat\&logo=figma\&logoColor=white) ![Notion](https://img.shields.io/badge/-Notion-000000?style=flat\&logo=notion\&logoColor=white)                                                                                                                                                                                                                       |

# 6. Project Structure (프로젝트 구조)

```plaintext
.
|-- dist
|   |-- asserts
|   |-- assets
|   |-- fonts
|   |-- index.html
|   |-- src
|   `-- vite.svg
|-- eslint.config.js
|-- index.html
|-- package-lock.json
|-- package.json
|-- prettier.config.js
|-- public
|   |-- asserts
|   |-- fonts
|   `-- vite.svg
|-- src
|   |-- components
|   |-- main.ts
|   |-- pages
|   |-- programID.ts
|   |-- style.css
|   |-- ts
|   |-- typescript.svg
|   `-- vite-env.d.ts
|-- tsconfig.json
`-- vite.config.js
```

<br/>
<br/>

# 7. 커밋 컨벤션

## 기본 구조

```
type : subject

body
```

<br/>
| 이모지 | 타입               | 설명                      | 커밋 예시                                              |
| --- | ---------------- | ----------------------- | -------------------------------------------------- |
| ✨   | `feat:`          | 새 기능 추가                 | `:sparkles: feat: 카드 뽑기 기능 추가`                     |
| 🐛  | `fix:`           | 버그 수정                   | `:bug: fix: 카드 뽑기 오류 수정`                           |
| 📝  | `docs:`          | 문서 수정                   | `:memo: docs: README 업데이트`                         |
| ♻️  | `refactor:`      | 코드 리팩토링                 | `:recycle: refactor: 중복 코드 제거`                     |
| 💄  | `style:`         | UI 스타일 수정 (마진, 여백 등)    | `:lipstick: style: 버튼 여백 조정`                       |
| 💄  | `design:`        | 디자인 요소 수정 (색상, 폰트 등)    | `:lipstick: design: 카드 배경색 변경`                     |
| 💡  | `comment:`       | 주석 추가/수정                | `:bulb: comment: 함수 설명 추가`                         |
| 👁️ | `accessibility:` | 웹 접근성 개선                | `:eye: accessibility: ARIA 속성 추가`                  |
| ✅   | `test:`          | 테스트 코드 작성/수정            | `:white_check_mark: test: 유닛 테스트 추가`               |
| 🦁  | `chore:`         | 기타 작업 (빌드 설정, 패키지 설치 등) | `:lion: chore: 패키지 업데이트`                           |
| ✏️  | `rename:`        | 파일명/경로 변경               | `:pencil: rename: Card.ts → CardItem.ts`           |
| 🔥  | `remove:`        | 코드/파일 제거                | `:fire: remove: 불필요한 이미지 삭제`                       |
| 🔀  | `merge:`         | 브랜치 병합                  | `:twisted_rightwards_arrows: merge: dev → main 병합` |
| 🔧  | `build:`         | 빌드 관련 설정                | `:wrench: build: Vite 설정 추가`                       |
| 🎉  | `init:`          | 초기 커밋                   | `:tada: init: 프로젝트 초기 세팅`                          |
| 🚀  | `deploy:`        | 배포 작업                   | `:rocket: deploy: vercel 배포 설정`                    |

---

## 🛠️ 커밋 메시지 사용 예시

| 작업 내용     | 커밋 메시지 예시                          |
| --------- | ---------------------------------- |
| 새로운 기능 추가 | `:sparkles: feat: 카드 뽑기 기능 추가`     |
| 버그 수정     | `:bug: fix: 카드 이미지가 로딩되지 않던 문제 수정` |
| 문서 작성/수정  | `:memo: docs: README에 사용법 추가`      |


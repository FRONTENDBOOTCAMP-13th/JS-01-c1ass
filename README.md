![Group 131](https://github.com/user-attachments/assets/b57c81be-88d8-4de4-82f0-4b9a784ae871)

---
## 🔗 Links

* 🎨 **[Figma 바로가기](https://www.figma.com/design/0eOjUl0RQVHyLiZx2asam8/c1ass?node-id=23-2&p=f&t=Gm7MrYDcKO5l7mzG-0)**
* 🌐 **[배포 사이트 바로가기](https://c1ass.netlify.app/)**
---

# 🎯 1. Project Overview (프로젝트 개요)

* **프로젝트 이름:** Mec
* **설명:** Likelion JavaScript 프로젝트

---

# 👥 2. Team Members (팀원 및 팀 소개)

| 최승균                                      | 김하영                                      | 남주성                                 | 강석현                                      |
| ---------------------------------------- | ---------------------------------------- | ----------------------------------- | ---------------------------------------- |
| FE                                       | FE                                       | FE                                  | FE                                       |
| [GitHub](https://github.com/seuchoi0531) | [GitHub](https://github.com/hayeonggim1) | [GitHub](https://github.com/namju1) | [GitHub](https://github.com/Kanghyeon00) |

---

# 🚀 3. Key Features (주요 기능)

* ✅ **Mec 페이지**
* ✅ **doodi 페이지**
* ✅ **sockast 페이지**
* ✅ **card 페이지**
* ✅ **arrow-dodge 페이지**

---

# 🧩 4. Tasks & Responsibilities (주요 역할 분담)

| 이름  | 담당 페이지         |
| --- | -------------- |
| 최승균 | Mec            |
| 김하영 | doodi, sockast |
| 남주성 | arrow-dodge    |
| 강석현 | card           |

---

# 💻 5. Technology Stack (기술 스택)

| 분류           | 사용 기술                                                                                                                                                                                                                                                                                                                                                                                                              |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Frontend** | ![HTML5](https://img.shields.io/badge/-HTML5-E34F26?style=flat\&logo=html5\&logoColor=white) ![CSS3](https://img.shields.io/badge/-CSS3-1572B6?style=flat\&logo=css3\&logoColor=white) ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat\&logo=typescript\&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/-TailwindCSS-06B6D4?style=flat\&logo=tailwindcss\&logoColor=white) |
| **빌드 도구**    | ![Vite](https://img.shields.io/badge/-Vite-646CFF?style=flat\&logo=vite\&logoColor=white)                                                                                                                                                                                                                                                                                                                          |
| **형상 관리**    | ![Git](https://img.shields.io/badge/-Git-F05032?style=flat\&logo=git\&logoColor=white) ![GitHub](https://img.shields.io/badge/-GitHub-181717?style=flat\&logo=github\&logoColor=white)                                                                                                                                                                                                                             |
| **디자인 협업**   | ![Figma](https://img.shields.io/badge/-Figma-F24E1E?style=flat\&logo=figma\&logoColor=white) ![Notion](https://img.shields.io/badge/-Notion-000000?style=flat\&logo=notion\&logoColor=white)                                                                                                                                                                                                                       |


---

# 📁 6. Project Structure (프로젝트 구조)

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

---

# 📌 7. Commit Convention (커밋 컨벤션)

## 🧱 기본 구조

```bash
type: subject

body
```

## 📋 커밋 타입 및 설명

| 이모지 | 타입               | 설명                   | 예시                                              |
| --- | ---------------- | -------------------- | ----------------------------------------------- |
| ✨   | `feat:`          | 새 기능 추가              | `:sparkles: feat: 카드 뽑기 기능 추가`                  |
| 🐛  | `fix:`           | 버그 수정                | `:bug: fix: 카드 이미지 오류 수정`                       |
| 📝  | `docs:`          | 문서 작성 및 수정           | `:memo: docs: README 업데이트`                      |
| ♻️  | `refactor:`      | 리팩토링 (기능 변화 없음)      | `:recycle: refactor: 중복 코드 제거`                  |
| 💄  | `style:`         | UI 스타일 수정 (마진, 여백 등) | `:lipstick: style: 버튼 여백 조정`                    |
| 💄  | `design:`        | 디자인 요소 수정 (색, 폰트 등)  | `:lipstick: design: 카드 배경색 변경`                  |
| 💡  | `comment:`       | 주석 추가 및 수정           | `:bulb: comment: 함수 설명 추가`                      |
| 👁️ | `accessibility:` | 웹 접근성 개선 작업          | `:eye: accessibility: ARIA 속성 추가`               |
| ✅   | `test:`          | 테스트 코드 추가 및 수정       | `:white_check_mark: test: 유닛 테스트 추가`            |
| 🦁  | `chore:`         | 기타 작업 (설정 파일, 패키지 등) | `:lion: chore: 패키지 업데이트`                        |
| ✏️  | `rename:`        | 파일명 또는 경로 변경         | `:pencil: rename: Card.ts → CardItem.ts`        |
| 🔥  | `remove:`        | 파일 또는 코드 제거          | `:fire: remove: 불필요한 이미지 삭제`                    |
| 🔀  | `merge:`         | 브랜치 병합               | `:twisted_rightwards_arrows: merge: dev → main` |
| 🔧  | `build:`         | 빌드/배포 관련 설정 변경       | `:wrench: build: Vite 설정 추가`                    |
| 🎉  | `init:`          | 초기 커밋                | `:tada: init: 프로젝트 초기 세팅`                       |
| 🚀  | `deploy:`        | 배포 작업                | `:rocket: deploy: vercel 배포 설정`                 |

## ✨ 사용 예시

| 작업 내용 | 커밋 메시지 예시                          |
| ----- | ---------------------------------- |
| 기능 추가 | `:sparkles: feat: 카드 뽑기 기능 추가`     |
| 버그 수정 | `:bug: fix: 카드 이미지가 로딩되지 않던 문제 수정` |
| 문서 수정 | `:memo: docs: README에 사용법 추가`      |

# 🔥 주요기능 소개

## Mec
| 기능        | GIF                                                                                          |
| -------------- | -------------------------------------------------------------------------------------------- |
| 전원 키기     | ![전원키기](https://github.com/user-attachments/assets/fb8c35f2-bc7d-4588-8012-9c1bdecabd08)     |
| 메모장       | ![메모장](https://github.com/user-attachments/assets/39042dcd-11d3-4c3c-ab2d-ec8edc7f3da2)      |
| 위젯 이동     | ![위젯이동](https://github.com/user-attachments/assets/6b89af5b-e942-41af-bb24-d5bc922b78e6)     |
| 위젯 기능     | ![위젯기능](https://github.com/user-attachments/assets/2a71a852-3017-4310-99aa-286b3416528c)     |
| 맥 패널      | ![맥패널](https://github.com/user-attachments/assets/71de2591-9fa2-4e2e-822d-6fad5b13515f)      |
| 다크/라이트 전환 | ![다크-라이트변환](https://github.com/user-attachments/assets/c59609ec-c803-49f1-9ca0-4d89467b1813) |
| 배경 변경     | ![배경바꾸기](https://github.com/user-attachments/assets/6f9e117f-7bf5-4c02-9d53-322e7e10bffd)    |

## Doodi
| 기능        | GIF                                                                                          |
| -------------- | -------------------------------------------------------------------------------------------- |
| 두디     |   ![두디](https://github.com/user-attachments/assets/15e3e9a9-d7aa-4f2d-8b27-88fffb9324d3) |

## Sockast
| 기능        | GIF                                                                                          |
| -------------- | -------------------------------------------------------------------------------------------- |
| 양말 관측소     |  ![양말](https://github.com/user-attachments/assets/2a8b10d9-8f69-4b6a-945f-27774dd7d03b)|

## Card
| 기능        | GIF                                                                                          |
| -------------- | -------------------------------------------------------------------------------------------- |
| 카드     |  ![카드](https://github.com/user-attachments/assets/15c87611-4b95-4d2d-a26b-b6936af65c84) |

## Arrow-dodge
| 기능        | GIF                                                                                          |
| -------------- | -------------------------------------------------------------------------------------------- |
| 화살 피하기     |  ![화살피하기](https://github.com/user-attachments/assets/8c306815-487c-4cba-8e68-4afd98938915) |
---
🍎 Mec
© 2025 LikeLion Team c1ass

# Pokemon 도감

pokemon api를 활용한 포켓몬스터 도감용 사이트입니다

---

## 📖 소개

데이터가 1~2년 주기로 업데이트되는 포켓몬이기에 별도의 서버를 두지않고 JSON으로 변환한뒤
로컬스토리지를 활용해 도감을 저장하도록 만든 next.js 웹앱입니다.

## 🛠 기술 스택

- **Frontend**: React, Next.js, TypeScript, Zustand
- **Styling**: TailwindCSS, shadcn/ui
- **Testing**: Jest, react-testing-library

---

## ✨ 주요 기능

- [x] 리스트 조회 및 검색
- [x] 세대, 타입 별 정렬
- [x] 포켓몬 상세 조회
- [x] 도감 기능
- [x] 타입, 특성 조회 

---

## 🌐 데모

https://poke-nextjs-eight.vercel.app/

---

## 🧪 테스트 커버리지

<!-- COVERAGE_START -->
![Statements](https://img.shields.io/badge/statements-84.2%25-green) ![Branches](https://img.shields.io/badge/branches-87.8%25-green) ![Functions](https://img.shields.io/badge/functions-82.8%25-green) ![Lines](https://img.shields.io/badge/lines-84.2%25-green)
<!-- COVERAGE_END -->

---

## 📦 설치 & 실행

```bash
# 저장소 클론
git clone https://github.com/kigpand/poke-nextjs

# 패키지 설치
pnpm install

# 개발 서버 실행
pnpm dev
```

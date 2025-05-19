# Nexon-Backend-Assignment

## 실행 방법
```
docker-compose up
```


## 서버 구조
1. Gateway 서버
   
   - 모든 요청을 받아 Auth 서버, Event 서버로 라우팅
   - JWT 토큰 검증 (Auth 서버로부터 public JWK 조회하여 사용)
   - 역할 검사

2. Auth 서버

   - 회원가입/로그인
   - JWT 생성 및 public JWK 제공

3. Event 서버

   - 이벤트 등록 및 조회
   - 보상 등록 및 조회
   - 유저 보상 요청 처리


## 디렉터리 구조
```
 📦 .
  ┣ 📄 docker-compose.yml     # 마이크로 서비스와 Mongo DB 실행
  ┗ 📦 pacakges
     ┣ 📂 auth-server         # 인증 서버
     ┃  ┣ 📂 src
     ┃  ┃  ┣ 📂 auth          # 회원가입, 로그인, jwt 발급 등
     ┃  ┃  ┣ 📂 user          # 유저 데이터 접근
     ┃  ┃  ┗ ...
     ┃  ┣ 📂 scripts          # jwk 생성하여 저장 (서버 실행을 위해 임시로 매번 생성되도록 함.)
     ┃  ┣ 📄 Dockerfile       # 인증 서버 실행 - TCP 마이크로서비스 서버 
     ┃  ┗ ...
     ┃
     ┣ 📂 event-server        # 이벤트 서버
     ┃  ┣ 📂 src
     ┃  ┃  ┣ 📂 event         # 이벤트 등록, 조회 등
     ┃  ┃  ┣ 📂 reward        # 보상 등록, 조회 등
     ┃  ┃  ┣ 📂 reward-user   # 보상 지급, 지급 내역 조회 등
     ┃  ┃  ┗ ...
     ┃  ┣ 📄 Dockerfile       # 이벤트 서버 실행 - TCP 마이크로서비스 서버
     ┃  ┗ ...
     ┃
     ┗ 📂 gateway-server      # 게이트웨이 서버
        ┣ 📂 src
        ┃  ┣ 📂 auth          # 인증 API 연결
        ┃  ┣ 📂 event         # 이벤트 API 연결
        ┃  ┗ ...
        ┣ 📄 Dockerfile       # 게이트웨이 서버 실행 - HTTP 서버
        ┗ ...
```
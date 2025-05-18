FROM node:18 AS development
WORKDIR /app/develop
COPY package*.json ./
RUN npm install

FROM node:18 AS build
WORKDIR /app/build
COPY --from=development /app/develop/node_modules ./node_modules/
COPY . .

# JWT 키 생성 스크립트 복사 및 실행
RUN chmod +x ./scripts/generate_jwks.sh && ./scripts/generate_jwks.sh

RUN npm run build

FROM node:18 AS production
WORKDIR /app
COPY --from=build /app/build/node_modules ./node_modules/
COPY --from=build /app/build/dist ./dist/
COPY --from=build /app/build/keys ./keys/

ENTRYPOINT [ "node", "dist/main.js" ]

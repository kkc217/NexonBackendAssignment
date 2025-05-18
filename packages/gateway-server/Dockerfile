FROM node:18 AS development
WORKDIR /app/develop
COPY package*.json ./
RUN npm install

FROM node:18 AS build
WORKDIR /app/build
COPY --from=development /app/develop/node_modules ./node_modules/
COPY . .
RUN npm run build

FROM node:18 AS production
WORKDIR /app
COPY --from=build /app/build/node_modules ./node_modules/
COPY --from=build /app/build/dist ./dist/

ENTRYPOINT [ "node", "dist/main.js" ]

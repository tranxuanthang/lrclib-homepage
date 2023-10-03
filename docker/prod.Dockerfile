FROM node:18-alpine as build-stage
MAINTAINER tranxuanthang<thang.dovah@gmail.com>
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM caddy:2.2.1-alpine as serve-stage
COPY --from=build-stage /app/dist /app
COPY /docker/Caddyfile /etc/caddy/Caddyfile

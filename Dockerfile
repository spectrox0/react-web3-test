# frontend/Dockerfile
FROM node:18-alpine as base
RUN npm i -g pnpm

FROM base as deps
WORKDIR /app
COPY package.json pnpm-lock.yaml .
RUN pnpm i

FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN pnpm build
RUN pnpm prune --production
run pnpm rebuild

FROM nginx:stable-alpine as production

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]

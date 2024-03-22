# frontend/Dockerfile
FROM node:18-alpine as base
RUN npm i -g pnpm

FROM base as dev
WORKDIR /app
COPY package.json .
RUN pnpm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
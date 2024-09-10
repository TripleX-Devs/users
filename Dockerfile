FROM node:20-alpine AS builder
WORKDIR /app
COPY ./ ./ 
RUN apk add yarn
RUN yarn install --frozen-lockfile
RUN yarn run build

FROM node:20-alpine
WORKDIR /app

COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock
COPY ./prisma ./prisma
COPY --from=builder /app/dist ./dist

RUN apk add yarn
RUN yarn install --prod --frozen-lockfile
RUN yarn run migrate:prod

EXPOSE 5001
ENTRYPOINT [ "node", "./dist/index.js" ]

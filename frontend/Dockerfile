FROM node:20 as builder

WORKDIR /cshack

COPY . .

RUN npm install

RUN npm build

FROM thistine/simple-http-server

WORKDIR /app

COPY --from=builder /cshack/dist ./static

EXPOSE 4000
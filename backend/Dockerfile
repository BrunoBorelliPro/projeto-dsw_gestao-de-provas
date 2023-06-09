FROM node:18.13.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm i -g prisma

COPY . .

RUN prisma generate

RUN npm run build


EXPOSE 8080
CMD [ "npm","run","start:migrate:prod" ]
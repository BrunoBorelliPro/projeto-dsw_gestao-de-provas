FROM node:18.13.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3331
CMD [ "npm","run", "start" ]

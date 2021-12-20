FROM node:lts-alpine

RUN npm install -g http-server

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . . 
# копи конкретные файлы, ноду конкретную

RUN npm run build

CMD [ "http-server", "dist" ]
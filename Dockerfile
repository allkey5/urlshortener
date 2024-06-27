FROM node:22.2.0

WORKDIR /urlshortener

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install typescript ts-node --save-dev

EXPOSE 3000

CMD [ "npm", "start"]
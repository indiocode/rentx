FROM node:18-alpine

WORKDIR /usr/app

COPY package.json ./

RUN yarn 

COPY . .

EXPOSE 3333

CMD ["yarn", "dev"]
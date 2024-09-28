FROM node:20 AS builder

WORKDIR /usr/src/app

COPY . .

EXPOSE 3001

CMD ["yarn", "start"]

FROM node:16

LABEL author="Roman Kuzmichev <yetikotuch@yandex.ru>"

RUN mkdir -p /sylladex
WORKDIR /sylladex

COPY package.json package-lock.json /sylladex/
RUN npm ci

CMD ["npm", "start"]

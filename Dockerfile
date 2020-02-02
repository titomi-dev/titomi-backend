FROM node:alpine

COPY . /titomi
WORKDIR /titomi

RUN apk add --no-cache --virtual .gyp python make g++ \
    && npm install [ your npm dependencies here ] \
    && apk del .gyp

RUN npm build
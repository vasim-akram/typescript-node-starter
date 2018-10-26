FROM node:8.11.4-alpine

MAINTAINER Vasim Akram

WORKDIR /usr/app

RUN rm -rf ./node_modules

ADD ./src ./
ADD ./logs ./

ADD ./package.json ./
ADD ./package-lock.json ./
ADD ./tsconfig.json ./

#EXPOSE PORT

RUN npm prune
RUN npm install

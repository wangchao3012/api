
# FROM node:latest
# MAINTAINER author
# LABEL Name=project Version=0.0.1 
# COPY package.json /tmp/package.json
# RUN cd /tmp && npm install --production
# RUN mkdir -p /usr/src/app && mv /tmp/node_modules /usr/src
# WORKDIR /usr/src/app
# COPY . /usr/src/app
# EXPOSE 3000
# CMD node app.js

# Statusbar
#
# VERSION               1.0.0

FROM docker.io/node
MAINTAINER wangchao3012@163.com

ENV HTTP_PORT 3000

COPY . /app
WORKDIR /app

RUN npm --registry=https://registry.npm.taobao.org --disturl=https://npm.taobao.org/dist install

EXPOSE 3000

CMD ["npm", "start"]
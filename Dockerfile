# change with the Node.js version of your choice
ARG NODE_VERSION="18.13.0"

# change with the Linux Alpine version of your choice
ARG ALPINE_VERSION="3.17"

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS base

# install OpenSSL 1.1.x, needed for Linux Alpine 3.17+
RUN apk update \
  && apk add openssl1.1-compat

WORKDIR /app

# install your project dependencies
COPY package.json ./
RUN npm install --force
RUN npm install --global tslib ts-node typescript

# copy your project files
COPY . ./
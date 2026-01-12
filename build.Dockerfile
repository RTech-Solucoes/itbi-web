FROM node:22.14.0-alpine

RUN mkdir /c && chown node:node /c && npm install -g @angular/cli@21

USER node

WORKDIR /c

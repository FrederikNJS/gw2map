FROM node:5.3

ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install -g http-server jspm

RUN mkdir /code
WORKDIR /code

ADD package.json /code/
RUN npm install

ADD . /code

EXPOSE 8080
CMD http-server

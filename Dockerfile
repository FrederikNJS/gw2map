FROM node:5.3

ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install -g http-server jspm

RUN mkdir /code
WORKDIR /code

ADD package.json /code/
ADD config.js /code/
RUN npm install
RUN jspm install

ADD . /code

EXPOSE 8080
CMD http-server

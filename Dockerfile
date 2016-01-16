FROM node:5.3

ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install -g http-server jspm karma-cli

RUN mkdir /code
WORKDIR /code

ADD package.json /code/
RUN npm install

ADD .jspmgithubconfig /code/
RUN ./.jspmgithubconfig

ADD config.js /code/
RUN jspm install

ADD . /code

EXPOSE 8080
CMD http-server

FROM node:8-alpine

RUN apk add --update wget
RUN wget -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub
RUN wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.27-r0/glibc-2.27-r0.apk
RUN apk add glibc-2.27-r0.apk

RUN rm /etc/apk/keys/sgerrand.rsa.pub
RUN rm glibc-2.27-r0.apk
RUN apk del wget

WORKDIR /var/www

ADD .babelrc .babelrc
ADD .eslintignore .eslintignore
ADD .eslintrc .eslintrc
ADD .flowconfig .flowconfig
ADD stryker.conf.js stryker.conf.js

ADD package.json package.json
ADD package-lock.json package-lock.json

RUN cp package.json /tmp/package.json
RUN cp package-lock.json /tmp/package-lock.json
RUN cd /tmp && npm install
RUN cp -a /tmp/node_modules /var/www/

VOLUME /var/www/src
VOLUME /var/www/__tests__

CMD ["npm", "run", "watch"]

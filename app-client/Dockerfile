FROM node:latest

WORKDIR /usr/src/app
ADD package.json /usr/src/app/package.json
RUN npm install
# add app
ADD . /usr/src/app
# start app
CMD ["npm", "start"]
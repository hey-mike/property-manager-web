FROM node

WORKDIR /usr/src/app
ADD package.json /usr/src/app/package.json
RUN npm install
# add app
ADD . /usr/src/app

EXPOSE 3000
# start app
CMD ["npm", "start"]
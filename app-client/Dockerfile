# You should always specify a full version here to ensure all of your developers
# are running the same version of Node.
FROM node

# The base node image sets a very verbose log level.
ENV NPM_CONFIG_LOGLEVEL warn

# Copy all local files into the image.
COPY . .

# Build for production.
RUN npm run build --production

# Install `serve` to run the application.
RUN npFROM node:8.11.1

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install -g @angular/cli
RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# RUN npm rebuild

# Bundle app source
COPY . /usr/src/app

EXPOSE 4200
CMD npm run dev:dockerm install -g serve

# Set the command to start the node server.
CMD serve -s build

# Tell Docker about the port we'll run on.
EXPOSE 5000
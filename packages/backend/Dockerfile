# Source: https://gigi.nullneuron.net/gigilabs/running-puppeteer-under-docker/
# Source: https://www.zenrows.com/blog/puppeteer-cloudflare-bypass#how-to-bypass-cloudflare-with-puppeteer

# official node image with Linux Alpine 3.18
FROM node:current-alpine3.18

# create app directory
WORKDIR /usr/src/app

# install app dependencies
COPY package*.json .
RUN npm install

# bundle app source
COPY . .

# volume for node_modules
VOLUME [ "/usr/src/app/node_modules" ]

# expose server port
EXPOSE $PORT

# start the app
CMD [ "npm", "run", "start:dev" ]
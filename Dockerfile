# final image
FROM node:18-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package.json ./
COPY package-lock.json ./

# upgrade npm
RUN npm i -g npm@8.13.1

# args for production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN npm install --omit=dev

COPY --chown=node:node . .

USER node

CMD ["node", "app.js"]
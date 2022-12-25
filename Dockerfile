FROM node:16-alpine

WORKDIR /app

ENV PATH /app/node_module/.bin:$PATH

COPY package.json ./

COPY package-lock.json ./

RUN npm install --force

RUN npm install react-script --force

COPY . ./

RUN npm install -g serve

RUN npm run build

CMD [ "npx", "serve", "build" ]
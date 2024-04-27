
FROM node:14-slim

WORKDIR /usr/src/app

RUN npm install -g nodemon

COPY package*.json ./

COPY . .

EXPOSE 4000

CMD ["npm", "start"]
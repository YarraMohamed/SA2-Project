FROM node:14-slim

RUN npm install -g nodemon

WORKDIR /app

COPY ./package.json ./

RUN npm install

COPY . .

EXPOSE 5003

CMD ["npm", "run", "dev"]
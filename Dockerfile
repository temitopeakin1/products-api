FROM node:latest

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

ENV NAME products-api

CMD ["npm", "start"]

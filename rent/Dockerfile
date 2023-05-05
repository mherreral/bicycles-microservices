FROM node:14-alpine

RUN mkdir /app
WORKDIR /app

COPY package*.json /app/

RUN npm install
COPY . /app

ENV NODE_ENV QA
ENV PORT 5002
EXPOSE 5002
CMD ["npm", "start"]
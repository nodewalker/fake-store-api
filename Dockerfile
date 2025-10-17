FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --silent

COPY . .

RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "start:prod"]
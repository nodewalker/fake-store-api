FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --silent

COPY . .

RUN npm run build

FROM node:20-alpine AS production

WORKDIR /app

COPY package*.json ./

RUN npm ci --silent

COPY --from=builder /app/dist ./dist

EXPOSE 5000

CMD ["node", "dist/main.js"]
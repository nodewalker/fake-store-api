FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --silent

COPY . .

RUN npm run build

FROM node:20-alpine AS production

WORKDIR /app

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY fakestoreapi.crt /etc/nginx/fakestoreapi.ru/fakestoreapi.crt
COPY fakestoreapi.key /etc/nginx/fakestoreapi.ru/fakestoreapi.key

COPY package*.json ./

RUN npm ci --only=production --silent

COPY --from=builder /app/dist ./dist

RUN apk add --no-cache nginx

RUN nginx -T

EXPOSE 5000

CMD ["node", "dist/main.js"]
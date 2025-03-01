# 🛠 Stage 1: Build the NestJS App
FROM node:16.15.1-alpine3.16
WORKDIR /app
COPY package*.json ./
RUN npm install -f
COPY . .
RUN npm run build
COPY env/dev_env ./.env
CMD ["node", "dist/main"]
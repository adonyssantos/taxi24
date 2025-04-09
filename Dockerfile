# BUILD FOR LOCAL DEVELOPMENT
FROM node:22-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# CREATE BUILD FOR PRODUCTION
FROM node:22-alpine AS build

WORKDIR /usr/src/app

COPY --from=development /usr/src/app .

RUN npm run build

# RUN ON PRODUCTION MODE
FROM node:22-alpine AS production

WORKDIR /usr/src/app

COPY --from=build /usr/src/app .

RUN npm ci --omit=dev

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "run", "start:prod"]

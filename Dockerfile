FROM node:19.8

COPY package.json .
COPY package-lock.json .
COPY .env ./
COPY tsconfig.json ./
ADD . .
RUN npm install npm install -g @prisma/client prisma && prisma generate
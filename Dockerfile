FROM node:19.8

COPY package.json .
COPY package-lock.json .
ADD . .
RUN npm install -g @prisma/client prisma && prisma generate
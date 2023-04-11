## SPST API

- api for spst library project

## How to run
- clone the repo
- create .env file and copy variables from .env.local
- npm install
- run npx prisma init for initialize prisma 
- DATABASE_URL="postgresql://<NAME_OF_DATABASE>:<DATABASE_PASSWORD>@localhost:5432/express-prisma?schema=public" Add your database crendential here
- run npx prisma migrate dev and create migration
- run npm run seeder for seeding database
- 
## Technologies

- Node
- Typescript
- Express
- Postgresql
- Prisma
- Docker(later)
- Sengrid/Mailgen for sending emails

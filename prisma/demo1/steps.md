```bash
npm init -y 
npm install typescript ts-node @types/node --save-dev

npx tsc --init

npm install prisma --save-dev
```

```sh
npx prisma init --datasource-provider sqlite
```
if `npx prisma init` it's postgress, the datbase url in .env will be 
    DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"

`npx prisma init sqlite ` will result in Error: The init command does not take any argument.

2. modle
add to prisma/schema.prisma
```prisma
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  author    User    @relation(fields: [authorId], references: [id])
  authorId  Int
}
```

3. Run a migration to create your database tables with Prisma Migrate

```sh
npx prisma migrate dev --name init
```
This command did two things:

It creates a new SQL migration file for this migration in the prisma/migrations directory.
It runs the SQL migration file against the database.
Because the SQLite database file didn't exist before, the command also created it inside the prisma directory with the name dev.db as defined via the environment variable in the .env file.

`npx prisma migrate dev` will ask for migration name

    Create a migration from changes in Prisma schema, apply it to the database, trigger generators (e.g. Prisma Client)
    $ prisma migrate dev

    Reset your database and apply all migrations
    $ prisma migrate reset

    Apply pending migrations to the database in production/staging
    $ prisma migrate deploy

    Check the status of migrations in the production/staging database
    $ prisma migrate status

3.5. generate the prisma client (unnecessary, it's automatically generated in the last step)
```
npx prisma generate
```
Prisma Client is Prisma reads your `schema.prisma` file and generates code that lets you execute queries against your database table from your application.

Running `prisma generate` will generate a `PrismaClient` that you can import and use in your code like this:

```js
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
// get all records in the user table
const users = await prisma.user.findMany()
```
So the Prisma Client exposes CRUD (create, read, update, delete) methods that match your Prisma data model.
Note: you need atleast one model to generate 
4. Explore how to send queries to your database with Prisma Client

touch script.ts

it has crud code in it

`npx ts-node script.ts` run it

5. dashboard

`npx prisma studio`

## CRUD

https://www.prisma.io/docs/reference/api-reference/prisma-client-reference

## Create 
### create a single record
```js
const user = await prisma.user.create({
  data: {
    email: 'elsa@prisma.io',
    name: 'Elsa Prisma',
  },
})
```

### creat multiple 
```js
const createMany = await prisma.user.createMany({
  data: [
    { name: 'Bob', email: 'bob@prisma.io' },
    { name: 'Bobo', email: 'bob@prisma.io' }, // Duplicate unique key!
    { name: 'Yewande', email: 'yewande@prisma.io' },
    { name: 'Angelique', email: 'angelique@prisma.io' },
  ],
  skipDuplicates: true, // Skip 'Bobo'
})
```

## Read

### Get record by ID or unique identifier
select * from user where email = 'elsa@prisma.io';
```js
// By unique identifier
const user = await prisma.user.findUnique({
  where: {
    email: 'elsa@prisma.io',
  },
})

// By ID
const user = await prisma.user.findUnique({
  where: {
    id: 99,
  },
})
```
Get all records
```
const users = await prisma.user.findMany()
```
pagination
```js
const results = await prisma.post.findMany({
  skip: 3,
  take: 4,
})
```

SELECT u.*
FROM user u
JOIN posts p ON u.id = p.user_id
WHERE p.likes > 100
ORDER BY p.likes DESC
LIMIT 1;
```js
  const findUser = await prisma.user.findFirst({
    where: {
      posts: {
        some: {
          likes: {
            gt: 100
          }
        }
      }
    },
    orderBy: {
      id: "desc"
    }
  })

```

# Select a subset of fields
SELECT email, name
FROM user
WHERE email = 'emma@prisma.io';
```js
const user = await prisma.user.findUnique({
  where: {
    email: 'emma@prisma.io',
  },
  select: {
    email: true,
    name: true,
  },
})
```

## Update
### Update a single record
```
const updateUser = await prisma.user.update({
  where: {
    email: 'viola@prisma.io',
  },
  data: {
    name: 'Viola the Magnificent',
  },
})
```

### Update or create records
```js
const upsertUser = await prisma.user.upsert({
  where: {
    email: 'viola@prisma.io',
  },
  update: {
    name: 'Viola the Magnificent',
  },
  create: {
    email: 'viola@prisma.io',
    name: 'Viola the Magnificent',
  },
})
```

### Update a number field
Use atomic number operations  to update a number field based on its current value - for example, increment or multiply. The following query increments the views and likes fields by 1:
```js
const updatePosts = await prisma.post.updateMany({
  data: {
    views: {
      increment: 1,
    },
    likes: {
      increment: 1,
    },
  },
})
```

## Delete
### Delete a single record
The following query uses delete  to delete a single User record:
```
const deleteUser = await prisma.user.delete({
  where: {
    email: 'bert@prisma.io',
  },
})
```

### Delete multi record
```

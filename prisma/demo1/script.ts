import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // ... you will write your Prisma Client queries here
    let rand = +(Math.random() * 1000000000)
    // create
    const user = await prisma.user.create({
        data: {
            name: 'Alice',
            email: `alice@prismia${rand}.io`,
        },
    })
    console.log(user)

    // read
    const users = await prisma.user.findMany()
    console.log(users)


}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
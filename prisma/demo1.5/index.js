// import { PrismaClient } from '@prisma/client' //SyntaxError: Cannot use import statement outside a module

// This works
const { PrismaClient } = require('@prisma/client')
// const PrismaClient = require('@prisma/client').PrismaClient 
const prisma = new PrismaClient({ schema: './migrations/schema.prisma' })

// this also works
// const entireshit = require('@prisma/client')
// const prisma = new entireshit.PrismaClient()
// equivelant to

async function main() {
    let users = await prisma.user.create({
        data: {
            email: `${+(Math.random() * 1000000000)}@email.io`,
        }
    })
    // without await this prints
    // '''
    // {
    //     then: [Function: then],
    //     catch: [Function: catch],
    //     finally: [Function: finally],
    //     requestTransaction: [Function: requestTransaction],
    //     [Symbol(Symbol.toStringTag)]: 'PrismaPromise'
    //   }

    // '''
    // So i need to use await to print user, and to use await you need to have it inside a function with async (main)
    console.log(users)
}

main()

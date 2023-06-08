import express, { Express } from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const prisma = new PrismaClient()
const app: Express = express()

app.use(express.json());
app.use(cors());
// GET /users 
app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany({

    })
    res.json(users)
})

// POST /users
app.post('/users', async (req, res) => {
    try {
        const user = await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email
            }
        })
        res.json(user)
    } catch (err: any) {
        if (err.code === 'P2002') {
            return res.status(400).json({ error: 'User with that email already exists' })
        }
        return res.status(500).json({ error: 'Internal server error' })
    }
})
// get /users/:id
// get /users/:id/messages

// get /messages
app.get('/messages', async (req, res) => {
    let query = req.query
    // keeping the cursor in query parameters also has some benefits
    //     - Simple implementation - No need to save state in the backend 
    //     - Cacheable - The frontend can cache paginated responses, improving performance 
    // let paginationCursor = query.cursor || 0 //: req.session.paginationCursor || 0; // - Saving the cursor in the backend session for authenticated users 

    // let messages = await prisma.message.findMany({
    //     take: 10,
    //     cursor: {
    //         id: +paginationCursor
    //     }
    // })
    let messages = await prisma.message.findMany({
        include: { author: { select: { name: true, email: true } } },
        orderBy: { sentAt: 'desc' }
    })
    res.status(200).json(messages)
    // res.status(200).json({ messages: [messages], nextCursor: messages.at(-1)?.id || paginationCursor })

})



// POST /message  -  anonymous posting
app.post('/messages', async (req, res) => {
    // this doesn't need to be anonymous we could use session token or JWT token.
    const message = await prisma.message.create(
        {
            data: {
                content: req.body.content,
                authorId: 4
            }
        }
    )
    res.status(201).json(message)
})
// // we'll check whichever works later
// post /users/:id/messages
app.post('/users/:id/messages', async (req, res) => {
    const userId = req.params.id;

    // getting the user or not doesn't make much of difference in function
    // it's useful only in validation.

    const user = await prisma.user.findUnique({
        where: { id: +userId }
    })

    if (!user) {
        return res.status(404).json({ error: 'User not found' })
    }

    const message = await prisma.message.create({
        data: {
            content: req.body.content,
            author: {
                connect: { id: +userId }
            }
        }
    })

    res.status(201).json(message)
})



const port = 5550
app.listen(port, () => {
    console.log(`app is listening my friend at http://localhost:${port}`)
})



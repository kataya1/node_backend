import express, { Express } from 'express';
import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient()
const app: Express = express()

app.use(express.json());



app.get('/', async (req, res) => {
    let query = req.query
    // keeping the cursor in query parameters also has some benefits
    //     - Simple implementation - No need to save state in the backend 
    //     - Cacheable - The frontend can cache paginated responses, improving performance 
    let paginationCursor = query.cursor || 0 //: req.session.paginationCursor || 0; // - Saving the cursor in the backend session for authenticated users 

    let messages = await prisma.message.findMany({
        take: 10,
        cursor: {
            id: +paginationCursor
        }
    })
    res.status(200).json({ messages: [], nextCursor: messages.at(-1)?.id || paginationCursor })

})

app.post('/message', async (req, res) => {
    let body = req.body
    res.status(200)
})
const port = 3000
app.listen(port, () => {
    console.log(`app is listening my friend at http://localhost:${port}`)
})

// auxillary function 
// function getMessages(page = 1, pageSize = 10) {
//     const offset = (page - 1) * pageSize;

//     return prisma.message.findMany({
//         skip: offset,
//         take: pageSize
//     })
// }


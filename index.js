const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

require('dotenv').config()

app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.6v5oj5d.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

console.log(uri)


async function run() {

    try {
        const postCollection = client.db('canvaLook').collection('postCollection')
        const userCollection = client.db('canvaLook').collection('userCollection')

        app.post('/posts', async (req, res) => {
            const postBody = req.body
            const result = await postCollection.insertOne(postBody)
            res.send(result)

        })
        app.get('/allpost', async (req, res) => {
            const query = {}
            const result = await postCollection.find(query).toArray()
            res.send(result)
        })
        app.post('/users', async (req, res) => {
            const userInfo = req.body
            const result = await userCollection.insertOne(userInfo)
            res.send(result)

        })

    }
    finally {

    }

}
run().catch(err => console.error(err))





app.get('/', (req, res) => {
    res.send('Canva look !!')
})
app.listen(port, () => {
    console.log(`Canva look server running on ${port}`)
})
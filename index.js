const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.Port || 5000;
const app = express();

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_pass}@cluster0.abv9u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const itemcollection = client.db('rideriot').collection('item');
        app.get('/item', async(req, res) =>{
            const query = {};
        const cursor = itemcollection.find(query);
        const items = await cursor.toArray();
        res.send(items);
        });

    }

    finally{

    }

}

run().catch(console.dir);






app.get('/', (req, res) =>{
    res.send('Running Rideriot server');


});

app.listen(port, () =>{
    console.log('Listening to port', port);
})

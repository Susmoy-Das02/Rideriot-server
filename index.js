const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.abv9u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const itemcollection = client.db('rideriot').collection('item');
        
        app.get('/item', async(req, res) =>{
            const query = {};
        const cursor = itemcollection.find(query);
        const items = await cursor.limit(6).toArray();
        res.send(items);
        });

        app.get('/item/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const item = await itemcollection.findOne(query);
            res.send(item);
        });


        app.post('/item', async(req, res) =>{
            console.log(req.body)
            const newItem =req.body;
            const result = await itemcollection.insertOne(newItem);
            res.send(result);
        });





        app.delete('/item/:id', async(req, res) =>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await itemcollection.deleteOne(query);
            res.send(result);

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

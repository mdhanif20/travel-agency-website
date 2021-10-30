const express = require('express')
const cors = require('cors');
const { MongoClient } = require('mongodb');
// const axios = require('axios').default;
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8f4kw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

console.log(uri);

async function run(){
    try{
        await client.connect();
        const database = client.db("travelsInfo");
        const logo = database.collection("logo");
        app.get('/logo',async(req,res)=>{
            const getLogo = logo.find({});
            const result = await getLogo.toArray();
            res.send(result);
        })
    }
    finally{
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Orna Travels')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
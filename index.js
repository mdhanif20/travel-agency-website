const express = require('express')
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;
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
        const sliders = database.collection("sliders");
        const services = database.collection("services");
        const popularTour = database.collection("popularTour");
        const booking = database.collection("booking");
        // logo get 
        app.get('/logo',async(req,res)=>{
            const getLogo = logo.find({});
            const result = await getLogo.toArray();
            res.send(result);
        })
        // sliders data get 
        app.get("/sliders", async(req,res)=>{
          const getSliders = sliders.find({});
          const result = await getSliders.toArray();
          res.send(result);
        })
        // service area data get 
        app.get("/services", async(req,res)=>{
          const getServices = services.find({});
          const result = await getServices.toArray();
          res.send(result);
        })
        // popular area data get 
        app.get("/popular",async(req,res)=>{
          const getPopularTour = popularTour.find({});
          const result = await getPopularTour.toArray();
          res.send(result);
        })
        // booking set 
        app.post("/booking", async(req,res)=>{
          const customer = req.body;
          const result = await booking.insertOne(customer);
          // console.log(result);
          res.json(result);
        })
        // booking get 
        app.get("/manageBooking",async(req,res)=>{
          const getCustomer = booking.find({});
          const customer = await getCustomer.toArray();
          res.send(customer);
        })
        //DELETE API
        app.delete("/manageBooking/:id",async(req,res)=>{
          const id = req.params.id;
          console.log("delet id is",id);
          const query = {_id: ObjectId(id)};
          console.log("ei id ta delet korte hoba.",query)
          const result = await booking.deleteOne(query);
          console.log("deleted id",result);
          res.json(result);
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
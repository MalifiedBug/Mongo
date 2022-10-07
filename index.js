import express from "express";

import { MongoClient } from "mongodb";


import * as dotenv from 'dotenv'


dotenv.config();



const app = express();

app.use(express.json());

const PORT = process.env.PORT;  

console.log(PORT)


const MONGO_URL = process.env.MONGO_URL;



 async function createConnection(){
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    return client;
}


app.post("/addpost", async (request, response)=>{
console.log(request.body)
const client = await createConnection();
const result = await client
.db("webcode")
.collection("rent")
.insertMany(request.body)
console.log(result)
response.json({
    data:result
})
// return result;  
})

app.get("/getpost", async (request, response)=>{
    console.log(request.body)
    const client = await createConnection();
    const result = await client
    .db("webcode")
    .collection("rent")
    .find({})
    .toArray()
    console.log(result)
    response.json({
        data:result
    })
    // return result;  
    })









app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩");
});

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
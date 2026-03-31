/*const mongoose = require("mongoose");

//testdb is name of database, it will automatically make it
mongoose
  mongoose.connect("mongodb://omatt10:1738@ac-0nrauf9-shard-00-00.1kbr6gi.mongodb.net:27017,ac-0nrauf9-shard-00-01.1kbr6gi.mongodb.net:27017,ac-0nrauf9-shard-00-02.1kbr6gi.mongodb.net:27017/?ssl=true&replicaSet=atlas-prbp2l-shard-0&authSource=admin&appName=Cluster0")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("could not connect ot mongodb...", err));

const schema = new mongoose.Schema({
  name: String,
});

//this creates a Message class in our app
const Message = mongoose.model("Message", schema);
const message = new Message({
  name: "Hello World",
});

//added in class 3/31*/

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const app = express();
app.use(express.static("public"));
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, file.originalname);
  },
})

const upload = multer({ storage: storage });

let houses = [
    {
        "_id":1,
        "name": "Farmhouse",
        "size": 2000,
        "bedrooms": 3,
        "bathrooms": 2.5,
        "features": [
            "wrap around porch",
            "attached garage"
        ],
        "main_image": "farm.webp",
        "floor_plans": [
            {
                "name": "Main Level",
                "image": "farm-floor1.webp"
            },
            {
                "name": "Basement",
                "image": "farm-floor2.webp"
            }
        ]
    },
    {
        "_id":2,
        "name": "Mountain House",
        "size": 1700,
        "bedrooms": 3,
        "bathrooms": 2,
        "features": [
            "grand porch",
            "covered deck"
        ],
        "main_image": "mountain-house.webp",
        "floor_plans": [
            {
                "name": "Main Level",
                "image": "mountain-house1.webp"
            },
            {
                "name": "Optional Lower Level",
                "image": "mountain-house2.webp"
            },
            {
                "name": "Main Level Slab Option",
                "image": "mountain-house3.jpg"
            }
        ]
    },
    {
        "_id":3,
        "name": "Lake House",
        "size": 3000,
        "bedrooms": 4,
        "bathrooms": 3,
        "features": [
            "covered deck",
            "outdoor kitchen",
            "pool house"
        ],
        "main_image": "farm.webp",
        "floor_plans": [
            {
                "name": "Main Level",
                "image": "lake-house1.webp"
            },
            {
                "name": "Lower Level",
                "image": "lake-house2.webp"
            }
        ]
    }
]

app.get("/api/houses", (req, res) => {
    res.send(houses);
});

app.get("/api/houses/:id", (req, res) => {
    const house =houses.find((h)=>h._id===parseInt(req.params.id));  
    res.send(house); 
});

//listen for incoming requests
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});

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
=
//added in class 3/31*/
/*
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
*/
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const Joi = require("joi");
const mongoose = require("mongoose");

const app = express();
app.use(express.static("public"));
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

mongoose
  .connect(
    "mongodb+srv://omatt10:1738@cluster0.1kbr6gi.mongodb.net/coremetrics?retryWrites=true&w=majority",
  )
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

// ── Mongoose Schema & Model ──────────────────────────────
const recipeSchema = new mongoose.Schema({
  name: String,
  category: String,
  calories: Number,
  protein: Number,
  carbs: Number,
  fat: Number,
  prep_time: String,
  description: String,
  ingredients: String,
  instructions: String,
  image: String,
});

const Recipe = mongoose.model("Recipe", recipeSchema);

// ── Joi Validation Schema ────────────────────────────────
const recipeJoi = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  category: Joi.string().min(2).max(50).required(),
  calories: Joi.number().integer().min(1).max(5000).required(),
  protein: Joi.number().min(0).max(500).required(),
  carbs: Joi.number().min(0).max(500).required(),
  fat: Joi.number().min(0).max(500).required(),
  prep_time: Joi.string().min(1).max(30).required(),
  description: Joi.string().min(5).max(300).required(),
  ingredients: Joi.string().min(5).max(1000).required(),
  instructions: Joi.string().min(5).max(1000).required(),
  image: Joi.string().min(1).max(200).required(),
});

// ── GET all recipes ──────────────────────────────────────
app.get("/api/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.send(recipes);
  } catch (err) {
    res.status(500).send({ message: "Error fetching recipes" });
  }
});

// ── GET single recipe ────────────────────────────────────
app.get("/api/recipes/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).send({ message: "Recipe not found" });
    res.send(recipe);
  } catch (err) {
    res.status(500).send({ message: "Error fetching recipe" });
  }
});

// ── POST new recipe ──────────────────────────────────────
app.post("/api/recipes", async (req, res) => {
  const { error } = recipeJoi.validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  try {
    const recipe = new Recipe({
      name: req.body.name,
      category: req.body.category,
      calories: req.body.calories,
      protein: req.body.protein,
      carbs: req.body.carbs,
      fat: req.body.fat,
      prep_time: req.body.prep_time,
      description: req.body.description,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      image: req.body.image,
    });

    const result = await recipe.save();
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({ message: "Error saving recipe" });
  }
});

// ── PUT edit recipe ──────────────────────────────────────
app.put("/api/recipes/:id", async (req, res) => {
  const { error } = recipeJoi.validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  try {
    const recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        category: req.body.category,
        calories: req.body.calories,
        protein: req.body.protein,
        carbs: req.body.carbs,
        fat: req.body.fat,
        prep_time: req.body.prep_time,
        description: req.body.description,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        image: req.body.image,
      },
      { new: true },
    );

    if (!recipe) return res.status(404).send({ message: "Recipe not found" });
    res.send(recipe);
  } catch (err) {
    res.status(500).send({ message: "Error updating recipe" });
  }
});

// ── DELETE recipe ────────────────────────────────────────
app.delete("/api/recipes/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) return res.status(404).send({ message: "Recipe not found" });
    res.send({ message: "Recipe deleted successfully" });
  } catch (err) {
    res.status(500).send({ message: "Error deleting recipe" });
  }
});

// ── Listen ───────────────────────────────────────────────
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

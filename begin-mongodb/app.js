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

let recipes = [
  {
    "_id": 1,
    "name": "Grilled Chicken & Veggie Bowl",
    "category": "High Protein",
    "calories": 520,
    "protein": 45,
    "carbs": 38,
    "fat": 14,
    "prep_time": "25 min",
    "description": "A high-protein bowl perfect for post-workout recovery.",
    "ingredients": "6 oz grilled chicken breast, 1 cup mixed veggies (bell pepper, zucchini, broccoli), 1/2 cup brown rice, 1 tbsp olive oil, salt, pepper, garlic powder.",
    "instructions": "1. Season chicken with salt, pepper, and garlic powder. Grill for 6-7 min per side. 2. Sauté veggies in olive oil for 5 minutes. 3. Serve over cooked brown rice.",
    "main_image": "images/chicken-bowl.webp"
  },
  {
    "_id": 2,
    "name": "Avocado & Egg Toast",
    "category": "Breakfast",
    "calories": 380,
    "protein": 18,
    "carbs": 32,
    "fat": 20,
    "prep_time": "10 min",
    "description": "A quick and healthy breakfast to start your day right.",
    "ingredients": "2 slices whole grain bread, 1 ripe avocado, 2 eggs, lemon juice, red pepper flakes, salt and pepper.",
    "instructions": "1. Toast bread. 2. Mash avocado with lemon juice, salt, and pepper. 3. Fry or poach eggs. 4. Spread avocado on toast and top with eggs and red pepper flakes.",
    "main_image": "images/avo-toast.webp"
  },
  {
    "_id": 3,
    "name": "Greek Yogurt Parfait",
    "category": "Snack",
    "calories": 290,
    "protein": 20,
    "carbs": 35,
    "fat": 6,
    "prep_time": "5 min",
    "description": "Creamy yogurt layered with berries and granola.",
    "ingredients": "1 cup plain Greek yogurt, 1/3 cup granola, 1/2 cup mixed berries, 1 tsp honey.",
    "instructions": "1. Add yogurt to a bowl. 2. Layer with granola and berries. 3. Drizzle with honey. Serve immediately.",
    "main_image": "images/parfait.webp"
  },
  {
    "_id": 4,
    "name": "Salmon & Quinoa Plate",
    "category": "Omega-3 Rich",
    "calories": 480,
    "protein": 42,
    "carbs": 30,
    "fat": 18,
    "prep_time": "30 min",
    "description": "Omega-3 rich salmon served over fluffy quinoa with greens.",
    "ingredients": "5 oz salmon fillet, 3/4 cup cooked quinoa, 1 cup spinach, 1 lemon, 1 tbsp olive oil, salt, dill.",
    "instructions": "1. Season salmon with salt, dill, and lemon juice. Bake at 400°F for 12-15 min. 2. Cook quinoa per package. 3. Serve salmon over quinoa with fresh spinach.",
    "main_image": "images/salmon.webp"
  },
  {
    "_id": 5,
    "name": "Turkey & Spinach Wrap",
    "category": "Lunch",
    "calories": 410,
    "protein": 35,
    "carbs": 40,
    "fat": 10,
    "prep_time": "10 min",
    "description": "A lean, filling wrap loaded with turkey and fresh greens.",
    "ingredients": "1 large whole wheat tortilla, 4 oz sliced turkey, 1 cup spinach, 2 tbsp hummus, tomato, cucumber.",
    "instructions": "1. Spread hummus on tortilla. 2. Layer turkey, spinach, tomato, and cucumber. 3. Roll tightly and slice in half.",
    "main_image": "images/wrap.webp"
  },
  {
    "_id": 6,
    "name": "Overnight Oats",
    "category": "Breakfast",
    "calories": 350,
    "protein": 15,
    "carbs": 55,
    "fat": 8,
    "prep_time": "5 min",
    "description": "Make-ahead oats packed with fiber and natural energy.",
    "ingredients": "1/2 cup rolled oats, 1/2 cup almond milk, 1/4 cup Greek yogurt, 1 tbsp chia seeds, 1 tsp honey, berries.",
    "instructions": "1. Combine oats, milk, yogurt, and chia seeds. 2. Stir well and refrigerate overnight. 3. Top with berries and honey before serving.",
    "main_image": "images/oats.webp"
  },
  {
    "_id": 7,
    "name": "Lentil Veggie Soup",
    "category": "Plant-Based",
    "calories": 310,
    "protein": 18,
    "carbs": 45,
    "fat": 5,
    "prep_time": "35 min",
    "description": "A warm, hearty soup full of plant protein and fiber.",
    "ingredients": "1 cup red lentils, 2 cups vegetable broth, 1 can diced tomatoes, 1 carrot, 2 celery stalks, 1 onion, garlic, cumin, turmeric.",
    "instructions": "1. Sauté onion, garlic, carrot, and celery. 2. Add lentils, broth, tomatoes, and spices. 3. Simmer 25 minutes until lentils are tender.",
    "main_image": "images/soup.webp"
  },
  {
    "_id": 8,
    "name": "Protein Smoothie",
    "category": "Post-Workout",
    "calories": 280,
    "protein": 30,
    "carbs": 28,
    "fat": 5,
    "prep_time": "5 min",
    "description": "A fast recovery smoothie with banana, protein powder, and almond milk.",
    "ingredients": "1 scoop vanilla protein powder, 1 banana, 1 cup almond milk, 1 tbsp peanut butter, ice.",
    "instructions": "1. Add all ingredients to a blender. 2. Blend until smooth. 3. Serve immediately.",
    "main_image": "images/smoothie.webp"
  },
  {
    "_id": 9,
    "name": "Tuna Stuffed Peppers",
    "category": "Low Carb",
    "calories": 340,
    "protein": 36,
    "carbs": 18,
    "fat": 12,
    "prep_time": "20 min",
    "description": "Bell peppers stuffed with seasoned tuna and topped with cheese.",
    "ingredients": "2 bell peppers, 2 cans tuna, 2 tbsp mayo, 1 tbsp mustard, celery, shredded cheese, salt and pepper.",
    "instructions": "1. Halve and seed peppers. 2. Mix tuna with mayo, mustard, celery, salt, and pepper. 3. Fill peppers and top with cheese. 4. Bake at 375°F for 15 minutes.",
    "main_image": "images/peppers.webp"
  },
  {
    "_id": 10,
    "name": "Sweet Potato & Black Bean Bowl",
    "category": "Plant-Based",
    "calories": 430,
    "protein": 16,
    "carbs": 62,
    "fat": 11,
    "prep_time": "30 min",
    "description": "A colorful, nutrient-dense bowl packed with complex carbs.",
    "ingredients": "1 sweet potato, 1 can black beans, 1 cup brown rice, avocado, lime, cilantro, cumin, chili powder.",
    "instructions": "1. Roast cubed sweet potato at 400°F for 25 min. 2. Cook rice per package. 3. Warm black beans with cumin and chili powder. 4. Assemble bowl and top with avocado, lime, and cilantro.",
    "main_image": "images/sweet-potato-bowl.webp"
  }
];

app.get("/api/recipes", (req, res) => {
  res.send(recipes);
});

app.get("/api/recipes/:id", (req, res) => {
  const recipe = recipes.find((r) => r._id === parseInt(req.params.id));
  res.send(recipe);
});

// listen for incoming requests
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
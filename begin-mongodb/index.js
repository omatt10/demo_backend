const mongoose = require("mongoose");

//testdb is name of database, it will automatically make it
mongoose
  mongoose.connect("mongodb://omatt10:1738@ac-0nrauf9-shard-00-00.1kbr6gi.mongodb.net:27017,ac-0nrauf9-shard-00-01.1kbr6gi.mongodb.net:27017,ac-0nrauf9-shard-00-02.1kbr6gi.mongodb.net:27017/?ssl=true&replicaSet=atlas-prbp2l-shard-0&authSource=admin&appName=Cluster0")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("could not connect ot mongodb...", err));

const schema = new mongoose.Schema({
  name: String,
});

async function createMessage() {
  const result = await message.save();
  console.log(result);
}

//this creates a Message class in our app
const Message = mongoose.model("Message", schema);
const message = new Message({
  name: "Hello World",
});

createMessage();

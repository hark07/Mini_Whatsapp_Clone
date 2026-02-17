const mongoose = require("mongoose");
const Chat = require("./models/chat");

mongoose
  .connect("mongodb://127.0.0.1:27017/whatsapp")
  .then(() => console.log("Connected for seeding"))
  .catch((err) => console.log(err));

async function seed() {
  await Chat.insertMany([
    {
      from: "Harish",
      to: "Janak",
      msg: "Hey Janak, please send the money for your exam form.",
      created_at: new Date(),
    },
    {
      from: "Harish",
      to: "Suresh",
      msg: "Hi Suresh, can you call me when you are free?",
      created_at: new Date(),
    },
    {
      from: "Harish",
      to: "Deepak",
      msg: "Deepak, please fill out the form today.",
      created_at: new Date(),
    },
  ]);

  console.log("Data inserted successfully!");
  mongoose.connection.close();
}

seed();

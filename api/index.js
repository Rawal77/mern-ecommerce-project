const express = require("express");
const { config } = require("dotenv");
const mongoose = require("mongoose");

const app = express();
config();
const listener = app.listen(
  process.env.API_PORT,
  process.env.API_HOST,
  async function () {
    console.log(
      `Server Started at ${listener.address().address}:${
        listener.address().port
      }`
    );
    try {
      await mongoose.connect(process.env.MONGO_URL);
      console.log(`Db successfully connected`);
    } catch (error) {
      console.log(`There was some error while connecting to db ${error}`);
    }
  }
);

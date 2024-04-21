import { connect } from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors"

dotenv.config();
const mongodbUser = process.env.MONGODB_USER;
const mongodbPassword = process.env.MONGODB_PASSWORD;
const port = process.env.PORT;

const app = express();
app.use(cors())
const uri = `mongodb+srv://${mongodbUser}:${mongodbPassword}@cluster0.huleewa.mongodb.net/data?retryWrites=true&w=majority&appName=Cluster0`;
connect(uri)
  .then(() => {
    console.log("Connected to MongoDB.");
    app.listen(port, () => {
      console.log(`Listening on port ${port}.`);
    });
  })
  .catch((err) => {
    console.error(err);
  });

import { redirect, create, remove } from "./apis.js";

app.get("/:shortUrl", redirect);
app.post("/api/create", bodyParser.json(), create);
app.delete("/api/delete/:shortUrl", remove);
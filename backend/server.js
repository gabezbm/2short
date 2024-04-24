import { connect } from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config({ path: "../.env" });
const mongodbUser = process.env.MONGODB_USER;
const mongodbPassword = process.env.MONGODB_PASSWORD;
const port = process.env.VITE_PORT;

const app = express();
app.use(cors());
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

import cookieParser from "cookie-parser";
import crypto from "crypto";
app.use(cookieParser());
app.use((req, res, next) => {
  if (!req.cookies.sessionToken) {
    res.cookie("sessionToken", crypto.randomBytes(16).toString("hex"), {
      httpOnly: true,
    });
  } else {
  }
  next();
});

import { fileURLToPath } from "url";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const buildPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(buildPath));

import { redirect, create, remove, list } from "./apis.js";
app.get("/:shortUrl", redirect);
app.post("/api/create", bodyParser.json(), create);
app.delete("/api/delete/:shortUrl", remove);
app.get("/api/list", list);

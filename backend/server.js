const mongoose = require("mongoose");
const app = require("express")();

require("dotenv").config();
const mongodbUser = process.env.MONGODB_USER;
const mongodbPassword = process.env.MONGODB_PASSWORD;
const port = process.env.PORT;

const uri = `mongodb+srv://${mongodbUser}:${mongodbPassword}@cluster0.huleewa.mongodb.net/data?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB.");
    app.listen(port, () => {
      console.log(`Listening on port ${port}.`);
    });
  })
  .catch((err) => {
    console.error(err);
  });

const UrlPair = require("./models/urlPair");

app.get("/:shortUrl", async (req, res) => {
  const record = await UrlPair.findOne({ short: req.params.shortUrl });
  res.redirect(record.toJSON().full);
});
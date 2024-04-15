import { Schema, model } from "mongoose";

const urlPairSchema = new Schema({
  full: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true,
  },
});

export const UrlPair = model("UrlPair", urlPairSchema);
import mongoose, { Schema, model } from "mongoose";

const sessionDataSchema = new Schema({
  sessionToken: {
    type: String,
    required: true,
  },
  urlPairs: {
    type: [mongoose.Types.ObjectId],
    required: true,
    ref: "UrlPair",
  },
});

export const SessionData = model("SessionData", sessionDataSchema);

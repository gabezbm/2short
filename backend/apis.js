import { UrlPair } from "./models/urlPair.js";

export const redirect = async (req, res) => {
  const query = { short: req.params.shortUrl };
  const recordExists = await UrlPair.exists(query);
  if (!recordExists) {
    res.sendStatus(404);
    return;
  }
  const record = await UrlPair.findOne(query);
  res.redirect(record.toJSON().full);
};

export const create = async (req, res) => {
  const recordExists = await UrlPair.exists({ short: req.body.short });
  if (recordExists) {
    res.sendStatus(409);
    return;
  }
  UrlPair.create(req.body)
    .then(() => {
      res.sendStatus(201);
    })
    .catch(() => {
      res.sendStatus(409);
    });
};
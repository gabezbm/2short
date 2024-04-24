import { UrlPair } from "./models/urlPair.js";
import { SessionData } from "./models/sessionData.js";

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
    console.log(`Short URL: [${req.body.short}] already exists in records.`);
    res.sendStatus(409);
    return;
  }

  const insertSessionData = async (sessionToken, urlPairId) => {
    const tokenExists = await SessionData.exists({
      sessionToken: sessionToken,
    });
    if (!tokenExists) {
      SessionData.create({
        sessionToken: sessionToken,
        urlPairs: [urlPairId],
      })
        .then(() => {
          res.sendStatus(201);
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(409);
        });
    } else {
      SessionData.updateOne(
        { sessionToken: sessionToken },
        { $push: { urlPairs: urlPairId } }
      )
        .then(() => {
          res.sendStatus(201);
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(409);
        });
    }
  };

  UrlPair.create(req.body)
    .then((urlPair) => {
      insertSessionData(req.cookies.sessionToken, urlPair._id);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(409);
    });
};

export const remove = async (req, res) => {
  const query = { short: req.params.shortUrl };
  const recordExists = await UrlPair.exists(query);
  if (!recordExists) {
    res.sendStatus(404);
    return;
  }

  if (!req.cookies.sessionToken) {
    res.sendStatus(401);
    return;
  }

  const urlPair = await UrlPair.findOne(query);
  const recordUnderSessionExists = await SessionData.exists({
    sessionToken: req.cookies.sessionToken,
    urlPairs: { $in: [urlPair._id] },
  });
  if (!recordUnderSessionExists) {
    res.sendStatus(403);
    return;
  }

  const deleteSessionData = async (sessionToken, urlPairId) => {
    SessionData.updateOne(
      { sessionToken: sessionToken },
      { $pull: { urlPairs: urlPairId } }
    )
      .then(() => {
        res.sendStatus(204);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(404);
      });
  };

  UrlPair.deleteOne(urlPair)
    .then(() => {
      deleteSessionData(req.cookies.sessionToken, urlPair._id);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(404);
    });
};

export const list = async (req, res) => {
  const sessionToken = req.cookies.sessionToken;
  if (!sessionToken) {
    return { entries: [] };
  }

  const tokenExists = await SessionData.exists({ sessionToken: sessionToken });
  if (!tokenExists) {
    return { entries: [] };
  }

  SessionData.findOne({
    sessionToken: sessionToken,
  })
    .populate("urlPairs")
    .then((data) => {
      res.json({ entries: data.urlPairs });
    })
    .catch((err) => {
      console.error(err);
    });
};

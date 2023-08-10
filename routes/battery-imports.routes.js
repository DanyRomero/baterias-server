const router = require("express").Router();
const { parse } = require("csv-parse")
const { createReadStream } = require("fs")
const Battery = require("../models/Battery.model")

router.post("/", (req, res) => {
  if (!req.files || !req.files.csv) {
    return res.status(422).json({ errors: { csv: "no puede estar vacío" } })
  } 

  const parser = parse({ columns: true })
  parser.on("data", async (row) => {
    /* Battery.findOneAndUpdate({ model: row.model }, row, { upsert: true }).then() */
    await Battery.findOneAndUpdate({ model: row.model.trim() }, row, { upsert: true })
  })
  parser.on("end", () => {
    res.json({ success: true })
  })
  
  createReadStream(req.files.csv.tempFilePath).pipe(parser)
});

module.exports = router;

const router = require("express").Router();
const { parse } = require("csv-parse");
const { createReadStream } = require("fs");
const Battery = require("../models/Battery.model");
const Brand = require("../models/Brand.model");
const Model = require("../models/Model.model");

router.post("/", (req, res) => {
  if (!req.files || !req.files.csv) {
    return res.status(422).json({ errors: { csv: "requiere de un archivo" } });
  }
  const parser = parse({ columns: true });
  parser.on("data", async (row) => {
    const brand = await Brand.findOneAndUpdate(
      { name: row.brand.trim() },
      { $set: { brand: row.brand.trim() } },
      { upsert: true, new: true }
    );
    const model = await Model.findOneAndUpdate(
      { name: row.model.trim(), brand: brand._id },
      { $set: { name: row.model.trim(), brand: brand._id } },
      { upsert: true, new: true }
    );
    let batteryIds = await Promise.all(
      row.batteries.split("|").map(async (batteryModel) => {
        const battery = await Battery.findOne({ model: batteryModel.trim() });
        return battery?._id;
      })
    );
    batteryIds = batteryIds.filter(Boolean);

    const existingYear = model.years.find(
      (year) => year.from === Number(row.from) && year.to === Number(row.to)
    );
    
    if (existingYear) {
      existingYear.batteries = batteryIds;
    } else {
      model.years.push({
        from: row.from,
        to: row.to,
        batteries: batteryIds,
      });
    }
    await model.save();
  });

  parser.on("end", () => {
    res.json({ success: true });
  });
  createReadStream(req.files.csv.tempFilePath).pipe(parser);
});

module.exports = router;

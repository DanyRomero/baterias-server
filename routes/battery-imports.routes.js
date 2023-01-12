const router = require("express").Router();

router.post("/", (req, res) => {
  if (!req.files || !req.files.csv) {
    return res.status(422).json({ errors: { csv: "no puede estar vacío" } })
  } 
  const { name, size, mimetype } = req.files.csv
  console.log({ name, size, mimetype })
  res.json({ success: true })
});

module.exports = router;
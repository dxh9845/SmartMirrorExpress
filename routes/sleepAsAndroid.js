const express = require('express'),
      axios = require('axios');
const router = express.Router();

/* GET users listing. */
router.get('/:eventName', async (req, res, next) => {
  try {
    res.sendStatus(req.params.eventName);
    // res.sendStatus(200);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;


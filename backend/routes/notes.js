const express = require('express');
const router = express.Router();

//API
router.get('/', (req, res) => {
    res.json([]);
});

module.exports = router;
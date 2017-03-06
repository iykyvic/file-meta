var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'File Upload FCC' });
});

router.post('/upload', (req, res) => {
  res.status(200).send({status: 'success', data: req.body});
});

module.exports = router;

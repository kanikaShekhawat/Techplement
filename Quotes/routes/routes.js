const express=require('express');
const { getQuote, getAuthor, createQuote } = require('../controllers/getquote');
const router = express.Router();

router.post('/add', createQuote);
router.get('/random',getQuote);
router.get('/author',getAuthor);

module.exports=router;
const express = require('express');
const router = express.Router();
const BookController = require('../controllers/book.controller2');
const upload = require('../middleware/uploadFile');


router.get('/', BookController.index);
router.get('/search', BookController.search);
router.get('/create', BookController.create);
router.post('/create', upload.single('image'), BookController.store);
router.get('/detail/:id', BookController.show);
router.get('/update/:id', BookController.edit);
router.post('/update/:id', upload.single('image'), BookController.update);
router.post('/delete', BookController.destroy);

module.exports = router;

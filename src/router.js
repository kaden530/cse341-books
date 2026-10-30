import express from 'express';
import { getBooksHandler, getBookByIdHandler, createViews} from './controllers/books.js';


const router = express.Router()

router.get('/books',getBooksHandler);
router.get('/books/:id', getBookByIdHandler);
router.get('/views/books', createViews )

export default router
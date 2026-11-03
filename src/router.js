import express from 'express';
import { getBooksHandler, getBookByIdHandler, createViews} from './controllers/books.js';

const router = express.Router()

/**
 * @openapi
 * /books:
 *   get:
 *     tags: [Books]
 *     summary: Get all books
 *     responses:
 *       200:
 *         description: A list of books
 *       500:
 *         description: Server error
 */
router.get('/books',getBooksHandler);

/**
 * @openapi
 * /books/{id}:
 *   get:
 *     tags: [Books]
 *     summary: Get a book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the book to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 author:
 *                   type: string
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error
 */
router.get('/books/:id', getBookByIdHandler);

/**
 * @openapi
 * /views/books:
 *   get:
 *     tags: [Books]
 *     summary: Get books from the books view
 *     responses:
 *       200:
 *         description: A list of books returned from the books view
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   author:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get('/views/books', createViews )

export default router
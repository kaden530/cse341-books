import express from 'express';
import { getBooksHandler, 
    getBookByIdHandler,
    updateBookHandler,
    createBookHandler,
    deleteBookHandler,  
     createBookViews} from './controllers/books.js';

import { getAuthorsHandler,
     getAuthorByIdHandler,
     createAuthorsHandler,
    updateAuthorHandler,
    deleteAuthorHandler,
      createAuthorViews} from './controllers/authors.js';


const router = express.Router()


//book routes.

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
 * /books/{id}:
 *   put:
 *     tags: [Books]
 *     summary: Update an existing book
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The custom string ID of the book to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - authorId
 *               - author
 *               - title
 *               - publicationDate
 *             properties:
 *               authorId:
 *                 type: string
 *               author:
 *                 type: string
 *               title:
 *                 type: string
 *               publicationDate:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated book object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 authorId:
 *                   type: string
 *                 author:
 *                   type: string
 *                 title:
 *                   type: string
*                 publicationDate:
*                   type: string
*       400:
*         description: Required field missing or invalid data provided
*       404:
*         description: Book not found
*       500:
*         description: Server error
*/
router.put('/books/:id', updateBookHandler);

/** * @openapi
 * /books:
 *   post:
 *     tags: [Books]
 *     summary: Create a new book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - authorId
 *               - author
 *               - title
 *               - publicationDate
 *             properties:
 *               id:
 *                 type: string
 *               authorId:
 *                 type: string
 *               author:
 *                 type: string
 *               title:
 *                 type: string
 *               publicationDate:
 *                 type: string
 *     responses:
 *       201:
 *         description: The newly created book object
 *         content:
 */
router.post('/books', createBookHandler);

/**
 * @openapi
 * /books/{id}:
 *   delete:
 *     tags: [Books]
 *     summary: Delete a book
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The custom string ID of the book to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Book deleted successfully
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error
 */
router.delete('/books/:id', deleteBookHandler);

//author routes

/**
 * @openapi
 * /authors:
 *   get:
 *     tags: [Authors]
 *     summary: Get all authors
 *     responses:
 *       200:
 *         description: A list of authors
 *       500:
 *         description: Server error
 */
router.get('/authors', getAuthorsHandler);

/**
 * @openapi
 * /authors/{id}:
 *   get:
 *     tags: [Authors]
 *     summary: Get an author by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the author to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Author found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 bio:
 *                   type: string
 *                 birthYear:
 *                   type: string
 *       404:
 *         description: Author not found
 *       500:
 *         description: Server error
 */
router.get('/authors/:id', getAuthorByIdHandler);

/**
 * @openapi
 * /authors:
 *   post:
 *     tags: [Authors]
 *     summary: Create a new author
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *               - birthYear
 *             properties:
 *               id:
 *                 type: string
 *                 example: a3
 *               name:
 *                 type: string
 *                 example: Jane Doe
 *               bio:
 *                 type: string
 *                 example: Award-winning science fiction novelist.
 *               birthYear:
 *                 type: string
 *                 example: "1985"
 *     responses:
 *       201:
 *         description: The newly created author object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 bio:
 *                   type: string
 *                 birthYear:
 *                   type: string
 *       400:
 *         description: Required field missing, or id already exists
 *       500:
 *         description: Server error
 */
router.post('/authors', createAuthorsHandler);

/**
 * @openapi
 * /authors/{id}:
 *   put:
 *     tags: [Authors]
 *     summary: Update an existing author
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The custom string ID of the author to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - birthYear
 *             properties:
 *               name:
 *                 type: string
 *                 example: Jane Smith
 *               bio:
 *                 type: string
 *                 example: Updated biography text.
 *               birthYear:
 *                 type: string
 *                 example: "1985"
 *     responses:
 *       200:
 *         description: The updated author object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 bio:
 *                   type: string
 *                 birthYear:
 *                   type: string
 *       400:
 *         description: Required field missing
 *       404:
 *         description: No author exists with that id
 *       500:
 *         description: Server error
 */
router.put('/authors/:id', updateAuthorHandler);

/**
 * @openapi
 * /authors/{id}:
 *   delete:
 *     tags: [Authors]
 *     summary: Delete an existing author
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The custom string ID of the author to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Author deleted successfully (No content returned)
 *       400:
 *         description: The author cannot be deleted because books still reference their id
 *       404:
 *         description: No author exists with that id
 *       500:
 *         description: Server error
 */
router.delete('/authors/:id', deleteAuthorHandler);

//views routes

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
router.get('/views/books', createBookViews )
/**
 * @openapi
 * /views/authors:
 *   get:
 *     tags: [Authors]
 *     summary: Get authors from the authors view
 *     responses:
 *       200:
 *         description: A list of authors returned from the authors view
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   bio:
 *                     type: string
 *                   birthYear:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get('/views/authors', createAuthorViews )


export default router



/**
/**
 * @
 * openapi
 * /books/update:
 *   post:
 *     tags: [Maintenance]
 *     summary: Run database migration to link existing books to authorIds
 *     description: Scans all book documents, reads the 'author' name text field, finds the matching author profile in the authors collection, and dynamically sets the 'authorId' field with the correct custom string ID.
 *     responses:
 *       200:
 *         description: Book authorId field updates completed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Book authorId field updates completed successfully.
 *                 totalBooksHandled:
 *                   type: integer
 *                   example: 12
 *                 successfullyLinked:
 *                   type: integer
 *                   example: 10
 *                 skippedOrFailed:
 *                   type: integer
 *                   example: 2
 *       500:
 *         description: An unexpected error occurred during database migration
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An unexpected error occurred during database migration
 *//*
router.post('/books/update', syncBookAuthorIdsHandler);

 */
import { getAllBooks,
     getBookById,
     updateBook,
    createBook,
    bookHasAuthor,
     deleteBook
     } from "../models/books.js";
import {booksListTemplate} from "../js/templates.js";


const getBooksHandler = async(req, res) => {
    try{
        const books = await getAllBooks()
        return res.status(200).json(books)
    } catch(error) {
        console.error('Database connection GET/books failed:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
export{getBooksHandler};

const getBookByIdHandler = async(req,res) =>{
     const requestedId = req.params.id;
    try{
        const book = await getBookById(requestedId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        return res.status(200).json(book);
    }catch(error){
        console.error('GET /books/:id failed:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
export{getBookByIdHandler};

const updateBookHandler = async (req, res) => {
   try {
        const bookId = req.params.id;
        const { authorId, author, title, publicationDate } = req.body;

        // 1. Validate required fields
        if ( !authorId || !author || !title || publicationDate === undefined) {
            return res.status(400).json({ message: "Required field is missing" });
        }

        // 2. Verify the author actually exists
        const bookExists = await getBookById(bookId);
        if (!bookExists) {
            return res.status(404).json({ message: "No book exists with that id" });
        }
        const bookswithoutAuthor = await bookHasAuthor(authorId);
        console.warn(`Author ID: ${authorId}, Exists: ${bookswithoutAuthor}`);
        if (!bookswithoutAuthor) {
            return res.status(400).json({ 
                message: "You cannot update the book because you have selected an invalid author" 
            });
        }
       

        const updatedData = { authorId, author, title, publicationDate };

        // 3. Perform the update
        await updateBook(bookId, updatedData);
        

        // Return the full updated object including its custom ID
        return res.status(200).json({ _id: bookId, ...updatedData });
    } catch (error) {
        return res.status(500).json({ message: "Unable to update book." });
    }
};
export { updateBookHandler };

const createBookHandler = async (req, res) => {
    try {
        const { id, authorId, author, title, publicationDate } = req.body;
        // 1. Validate required fields
        if (!id || !authorId || !author || !title || publicationDate === undefined) {
            return res.status(400).json({ message: "Required field is missing" });
        }

        // 2. Check if custom ID already exists
        const book = await getBookById(id);
        if (book) {
            return res.status(400).json({ message: "The id already exists" });
        }

        const newBook = { _id: id, authorId, author, title, publicationDate };
        
        // 3. Save to MongoDB
        await createBook(newBook);
        
        return res.status(201).json(newBook);
    } catch (error) {
        return res.status(500).json({ message: "unable to create book." });
    }
};
export { createBookHandler };

const deleteBookHandler = async (req, res) => {
    try {
        const bookId = req.params.id;

        // 1. Verify the book actually exists first
        const bookExists = await getBookById(bookId);
        if (!bookExists) {
            return res.status(404).json({ message: "No book exists with that id" });
        }

        // 3. Complete deletion if valid
        await deleteBook(bookId);
        return res.status(204).send(); // 204 sends no response body
    } catch (error) {
        return res.status(500).json({ message: "An unexpected server or database error occurs" });
    }
};
export { deleteBookHandler };


 const createBookViews = async (req, res) => {
  try {
    const books = await getAllBooks();
          console.log(Array.isArray(books), "book view")
    // Generate HTML string
    const htmlOutput = booksListTemplate(books);
    // Express automatically sets content-type to text/html when sending strings
    return res.send(htmlOutput); 
  } catch (err) {
    console.error(err);
    return res.status(500).send('Database error');
  }
};
export{createBookViews}


//code to add authorId to books collection based on author name in authors collection
/*
import { updateBookAuthor, bookAuthorName } from '../models/books.js'; 

const syncBookAuthorIdsHandler = async (req, res) => {
    try {
        // 1. Fetch all books from the database
        const books = await getAllBooks();
        let updatedCount = 0;
        let skippedCount = 0;

        console.log(`Scanning ${books.length} books for dynamic author matching...`);

        // 2. Loop through every book in your collection
        for (const book of books) {
            // Get the text-based author name already attached to the book document
            const embeddedAuthorName = book.author; 

            if (!embeddedAuthorName) {
                console.warn(`Book "${book.title}" (ID: ${book._id}) has no embedded author name field. Skipping.`);
                skippedCount++;
                continue;
            }

            // 3. Look up the author profile by name in the authors collection
            // NOTE: Make sure this function inside your model uses collection.findOne() to return the document object!
            const authorDoc = await bookAuthorName(embeddedAuthorName);
                 console.warn(`authorDoc "${authorDoc}"`);
            // If authorDoc is a number from countDocuments, or if it isn't found, check it cleanly:
           

                // Pass the book's _id and the author's structural _id string
                await updateBookAuthor(book._id, authorDoc);
                updatedCount++;
              
        }

        return res.status(200).json({
            message: "Dynamic book-to-author synchronization completed successfully.",
            totalBooksHandled: books.length,
            successfullyUpdated: updatedCount,
            skippedOrFailed: skippedCount
        });

    } catch (error) {
        console.error('Dynamic author sync failed:', error.message);
        return res.status(500).json({ message: "An unexpected error occurred during the relationship migration" });
    }
};


export { syncBookAuthorIdsHandler };

*/
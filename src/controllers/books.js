import { getAllBooks, getBooksById } from "../models/books.js";
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
        const book = await getBooksById(requestedId);
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

 const createViews = async (req, res) => {
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
export{createViews}
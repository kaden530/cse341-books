import { getAllAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor, authorHasBooks } from "../models/authors.js";
import {authorsListTemplate} from "../js/templates.js";


const getAuthorsHandler = async(req, res) => {
    try{
        const authors = await getAllAuthors()
        return res.status(200).json(authors)
    } catch(error) {
        console.error('Database connection GET/authors failed:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
export{getAuthorsHandler};

const getAuthorByIdHandler = async(req,res) =>{
     const requestedId = req.params.id;
    try{
        const author = await getAuthorById(requestedId);
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }
        return res.status(200).json(author);
    }catch(error){
        console.error('GET /authors/:id failed:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
export{getAuthorByIdHandler};

// POST /authors - Create a new author
const createAuthorsHandler = async (req, res) => {
    try {
        const { id, name, bio, birthYear } = req.body;
        // 1. Validate required fields
        if (!id || !name || birthYear === undefined) {
            return res.status(400).json({ message: "Required field is missing" });
        }

        // 2. Check if custom ID already exists
        const author = await getAuthorById(id);
        if (author) {
            return res.status(400).json({ message: "The id already exists" });
        }

        const newAuthor = { _id: id, name, bio: bio || "", birthYear };
        
        // 3. Save to MongoDB
        await createAuthor(newAuthor);
        
        return res.status(201).json(newAuthor);
    } catch (error) {
        return res.status(500).json({ message: "Unable to create author." });
    }
};
export { createAuthorsHandler };

// PUT /authors/:id - Update an existing author
const updateAuthorHandler = async (req, res) => {
    try {
        const authorId = req.params.id;
        const { name, bio, birthYear } = req.body;

        // 1. Validate required fields
        if (!name || !birthYear) {
            return res.status(400).json({ message: "Required field is missing" });
        }

        // 2. Verify the author actually exists
        const authorExists = await getAuthorById(authorId);
        if (!authorExists) {
            return res.status(404).json({ message: "No author exists with that id" });
        }

        const updatedData = { name, bio: bio || "", birthYear };

        // 3. Perform the update
        const updatedAuthor = await updateAuthor(authorId, updatedData);
        

        // Return the full updated object including its custom ID
        return res.status(200).json(updatedAuthor);
    } catch (error) {
        return res.status(500).json({ message: "Unable to update author." });
    }
};
export { updateAuthorHandler };

// DELETE /authors/:id - Delete an existing author
const deleteAuthorHandler = async (req, res) => {
    try {
        const authorId = req.params.id;

        // 1. Verify the author actually exists first
        const authorExists = await getAuthorById(authorId);
        if (!authorExists) {
            return res.status(404).json({ message: "No author exists with that id" });
        }

        // 2. Relationship Validation: Check if books still reference this author ID
        const booksReferencingAuthor = await authorHasBooks(authorId);
        if (booksReferencingAuthor) {
            return res.status(409).json({ 
                message: "The author cannot be deleted because books still reference their id" 
            });
        }

        // 3. Complete deletion if valid
        await deleteAuthor(authorId);
        return res.status(204).send(); // 204 sends no response body
    } catch (error) {
        return res.status(500).json({ message: "Unable to delete author." });
    }
};
export { deleteAuthorHandler };





 const createAuthorViews = async (req, res) => {
  try {
    const authors = await getAllAuthors();
          console.log(Array.isArray(authors), "author view")
    // Generate HTML string
    const htmlOutput = authorsListTemplate(authors);
    // Express automatically sets content-type to text/html when sending strings
    return res.send(htmlOutput); 
  } catch (err) {
    console.error(err);
    return res.status(500).send('Database error');
  }
};
export{createAuthorViews}
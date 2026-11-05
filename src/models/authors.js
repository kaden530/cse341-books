import { getDb } from "../db/connect.js";

async function getAllAuthors(){
   const db = getDb();
  const collection = db.collection('authors');
  const authors = await collection.find({}).toArray();
  return authors;
};
export {getAllAuthors};

async function getAuthorById(authorId){
    const db= getDb()
    const collection = db.collection('authors');
  const author = await collection.findOne({ _id: authorId });
  return author;
};
export{getAuthorById};

async function createAuthor(author) {
    const db = getDb();
    const collection = db.collection('authors');
    const result = await collection.insertOne(author);
    return result;
}
export { createAuthor };

async function updateAuthor(id, author) {
    const db = getDb();
    const collection = db.collection('authors');
    const result = await collection.updateOne({ _id: id }, { $set: author });
    return result;
}
export { updateAuthor };

async function deleteAuthor(id) {
    const db = getDb();
    const collection = db.collection('authors');
    const result = await collection.deleteOne({ _id: id });
    return result;
}
export { deleteAuthor };

async function authorHasBooks(id) {
    const db = getDb();
    const collection = db.collection('books');
    const book = await collection.countDocuments({ authorId: id });
    return  book > 0;
}
export { authorHasBooks };
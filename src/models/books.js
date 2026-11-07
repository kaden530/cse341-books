import { getDb } from "../db/connect.js";

async function getAllBooks(){
   const db = getDb();
  const collection = db.collection('books');
  const books = await collection.find({}).toArray();
  return books;
};
export {getAllBooks};

async function getBookById(bookId){
    const db= getDb()
    const collection = db.collection('books');
  const book = await collection.findOne({ _id: bookId });
  return book;
};
export{getBookById};

async function updateBook(bookId, updatedData) {
    const db = getDb();
    const collection = db.collection('books');
    const result = await collection.updateOne({ _id: bookId }, { $set: updatedData });
    return result;
}
export { updateBook };

async function createBook(book) {
    const db = getDb();
    const collection = db.collection('books');
    const result = await collection.insertOne(book);
    return result;
}
export { createBook };

async function deleteBook(bookId) {
    const db = getDb();
    const collection = db.collection('books');
    const result = await collection.deleteOne({ _id: bookId });
    return result;
}
export { deleteBook };

async function bookHasAuthor(Authorid) {
    const db = getDb();
    const collection = db.collection('authors');
    const author = await collection.countDocuments({ _id: Authorid });
    console.warn(`Author ID: ${Authorid}, Count: ${author}`);
    return  author > 0;
}
export { bookHasAuthor };

/*
export const updateBookAuthor = async (bookId, authorId) => {
    const db = getDb();
    const collection = db.collection('books');

    // Update using your structural string primary key _id
    const result = await collection.updateOne(
        { _id: bookId },
        { $set: { authorId: authorId } }
    );

    return result;
};

export const bookAuthorName = async (authorName) => {
    const db = getDb();
    const collection = db.collection('authors');
    const results = await collection.findOne({ name: authorName });
    console.warn(`${results._id}`);
    return results._id;
}*/
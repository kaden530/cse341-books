import { getDb } from "../db/connect.js";

async function getAllBooks(){
   const db = getDb();
  const collection = db.collection('books');
  const books = await collection.find({}).toArray();
  return books;
};
export {getAllBooks};
async function getBooksById(bookId){
    const db= getDb()
    const collection = db.collection('books');
  const book = await collection.findOne({ _id: bookId });
  return book;
};
export{getBooksById};
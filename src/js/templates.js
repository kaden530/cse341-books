 function booksListTemplate(books) {
        console.log("check 2")
return`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Book List</title>
  <style>
    body { font-family: system-ui, sans-serif; padding: 20px; background: rgba(83, 83, 83, 0.25);; }
    div#app{background: white; margins:auto; justify-content:space-around; min-width:90%; display: flex; flex-wrap: wrap; justify-self:center;}
    .book-card {border: solid black 3px; min-width:30%; background: white; padding: 15px; margin: 10px 0; border-radius: 6px; box-shadow: 0 4px 6px rgba(6, 6, 6, 0.54); }
  </style>
</head>
<body>

  <div id="app">
    ${books.length === 0 
      ? '<p>No books available.</p>' 
      : books.map(book => {return `
          <div class="book-card">
            <h3>${book.title || 'Untitled'}</h3>
            <p>Author: ${book.author || 'Unknown'}</p>
            <p>published: ${book.publicationDate|| 'Unknown'}</p>
          </div>
        `}).join('')
    }
  </div>

</body>
</html>
  `;
}

export{booksListTemplate};
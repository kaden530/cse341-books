/*export function bookTemplate(book) {
    if(book=== undefined){
        return
    } else {return `
        <article class="book-card">   
        <header class="book-card-header">
        <section>
                <h2>${book.title}</h2>
            </section>
                </header>

            <section class="book">
            
             <p>Author: ${book.author}</p>
              <p>published: ${book.publicationDate}</p>
            </section>
        </article>
    `;
}}
export function bookListTemplate(books) {
    return books.map(book => {return bookTemplate(book)}).join("");
}*/
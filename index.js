// link http://localhost:4000/
//ctrl c to close the server

const express = require("express");
//imported epress mpdule

const Database = require("./database");
//imported database

const ourApp = express();
//stored the express const in a new varaible

ourApp.use(express.json());
//consider the input in the form of the json format

ourApp.get("/",(request,response) =>{
    //json format
    response.json({message : "HELLO DEVS"});
});

// we will call the function via the http route

//SITE :http://localhost:4000/book
//DESC : to get all the books
//METHOD: GET
//BODY: NONE
//PARAMS: NONE

ourApp.get("/book",(req, res) => {
    return res.json({ Books : Database.Book});
})

//SITE :http://localhost:4000/publication
//DESC : to get all the publications
//METHOD: GET
//BODY: NONE
//PARAMS: NONE

ourApp.get("/publication",(req, res) => {
    return res.json({ Publication : Database.Publication});
})

//SITE :http://localhost:4000/publication/:pubid
//DESC : to get all the publication
//METHOD: //GETTING A SPECIFI publication WITH ID
//BODY: NONE
//PARAMS: pubid

ourApp.get("/publication/:pubID",(req,res) =>{
    const {pubID} = req.params;
    const getPubl = Database.Publication.filter(
        (author) => author.id == parseInt(pubID)
    );
    return res.json({Pubication : getPubl});
});



//SITE :http://localhost:4000/book/12345Two
//DESC : to get all the books
//METHOD: //GETTING A SPECIFI BOOK WITH ISBN
//BODY: NONE
//PARAMS: bookID


ourApp.get("/book/:bookID",(req,res) =>{
    const getBook = Database.Book.filter(
        (book) => book.ISBN == req.params.bookID
    );
    return res.json({book : getBook});
});

//SITE :http://localhost:4000/book/c/:category
//DESC : to get all the books
//METHOD: //GETTING A SPECIFI BOOK WITH ISBN
//BODY: NONE
//PARAMS: category

ourApp.get("/book/c/:category",(req,res) =>{
    //checked the array of the category to see if the input vategory is present or not
    const getBook = Database.Book.filter(
        (book) => book.category.includes(req.params.category)
    );
    return res.json({book : getBook});
});

//SITE :http://localhost:4000/book/a/:author
//DESC : to get all the books
//METHOD: //GETTING A SPECIFI BOOK WITH ISBN
//BODY: NONE
//PARAMS: author

ourApp.get("/book/a/:author",(req,res) =>{
    const {author} = req.params;
    const getBook = Database.Book.filter(
        (book) => book.authors.includes(parseInt(author))
    );
    return res.json({book : getBook});
});

//SITE :http://localhost:4000/author
//DESC : to get all the books
//METHOD: GET
//BODY: NONE
//PARAMS: NONE

ourApp.get("/author",(req, res) => {
    return res.json({ authors : Database.Author});
})


//SITE :http://localhost:4000/author/:authorID
//DESC : to get all the info about author
//METHOD: //GETTING A SPECIFI BOOK WITH ISBN
//BODY: NONE
//PARAMS: author name


ourApp.get("/author/:authorID",(req,res) =>{
    const {authorID} = req.params;
    const getAuthor = Database.Author.filter(
        (author) => author.id == parseInt(authorID)
    );
    return res.json({author : getAuthor});
});


//***********************POST*****************************//

//SITE :http://localhost:4000/book/new
//DESC : post a new book
//METHOD:  post
//BODY: json
//PARAMS:NONE

ourApp.post("/book/new",(req, res) => {

    const {newBook} = req.body;

    Database.Book.push(newBook);

    return res.json(Database.Book);
});

//SITE :http://localhost:4000/author/new
//DESC : post a new author
//METHOD:  post
//BODY: json
//PARAMS:NONE

ourApp.post("/author/new",(req, res) => {

    const {newAuthor} = req.body;

    Database.Author.push(newAuthor);

    return res.json(Database.Author);
});

//SITE :http://localhost:4000/publication/new
//DESC : post a new publication
//METHOD:  post
//BODY: json
//PARAMS:NONE

ourApp.post("/publication/new",(req, res) => {

    const {newPublication} = req.body;

    Database.Publication.push(newPublication);

    return res.json(Database.Publication);
});

//**************************UPDATE OF THE BOOK*****************/
//SITE :http://localhost:4000/book/update/:bookid
//DESC : uodate the book
//METHOD:  put
//BODY: json
//PARAMS:ISBN

ourApp.put("/book/update/:isbn", (req,res) =>{
    const {updatedBook} = req.body;
    const {isbn} = req.params;
 
    const book = Database.Book.map((book) => {
       if(book.ISBN == isbn){
          console.log({...book,...updatedBook});
          return { ...book, ...updatedBook};
       }
       return book;
    });
    return res.json(book);
 })

 //SITE :http://localhost:4000/bookAuthor/update/:isbn
//DESC : post a new publication
//METHOD:  put
//BODY: json
//PARAMS:isbn

ourApp.put("/bookAuthor/update/:isbn",(req,res) =>{
    const { newAuthor } = req.body;
    const { isbn } = req.params;
 
    Database.Book.forEach((book) =>{
       if(book.ISBN === isbn){//if book isbn == isbn
          if(!book.authors.includes(newAuthor)){//if book already has author or not
             return book.authors.push(newAuthor);//if nt then add
          }
          return book;
       }
       return book;
    });
    Database.Author.forEach((author) =>{
       if(author.id === newAuthor){
          if(!author.books.includes(isbn)){//if author oes not have isbn
             return author.books.push(isbn);
          }
          return author; 
       }
       return author;
    });
    return res.json({book: Database.Book, author: Database.Author});
 });

//SITE :http://localhost:4000/author/update/:id
//DESC : uodate the author
//METHOD:  put
//BODY: json
//PARAMS:id

ourApp.put("/author/update/:ID", (req,res) =>{
    const {updatedAuthor} = req.body;
    const {ID} = req.params;
 
    const author = Database.Author.map((author) => {
       if(author.id == parseInt(ID)){
          console.log({...author,...updatedAuthor});
          return { ...author, ...updatedAuthor};
       }
       return author;
    });
    return res.json(author);
 })

 
//SITE :http://localhost:4000/publ/update/:id
//DESC : uodate the publication
//METHOD:  put
//BODY: json
//PARAMS:id
 
ourApp.put("/publ/update/:ID", (req,res) =>{
    const {updatedPubs} = req.body;
    const {ID} = req.params;
 
    const pubs = Database.Publication.map((pubs) => {
       if(pubs.id == parseInt(ID)){
          console.log({...pubs,...updatedPubs});
          return { ...pubs, ...updatedPubs};
       }
       return pubs;
    });
    return res.json(pubs);
 })

////////////**********************************DELETE ROUTE */
//SITE :http://localhost:4000/book/delete/:isbn
//DESC : delete the book
//METHOD:  delete
//BODY: NONE
//PARAMS:isbn

// NOT FILTER,MAP ,FOR EACH are like the loops only


 ourApp.delete("/book/delete/:isbn", (req,res) => {
     const {isbn} = req.params;

     const newbooks = Database.Book.filter((book) => book.ISBN !== isbn)//include all the book which is not having given ISBN

     Database.Book = newbooks;

     return res.json(Database.Book);
 })

 //SITE :http://localhost:4000/book/delete/author/:isbn/:id
//DESC : delete the author form the book
//METHOD:  delete
//BODY: NONE
//PARAMS:isbn

ourApp.delete("/book/delete/author/:isbn/:id",(req,res) =>{
    
    const { isbn, id } = req.params;
    
    Database.Book.forEach((book) => {
        if(book.ISBN === isbn){
            if(!book.authors.includes(parseInt(id))){//check if id is there in the book
            return book;
            }

            book.authors = book.authors.filter(
                (databaseId) => databaseId !== parseInt(id));
            return book;
        }
        return book;

    });

    Database.Author.forEach((author) => {
         if(author.id === parseInt(id)){
             if(!(author.books.includes(isbn))){
                
                 return author;
                 
             }
             
             author.books = author.books.filter((book) => book !== isbn);
             
             return ;
         }
         return author;
    });
    
    return res.json({book: Database.Book, author: Database.Author});
});


//SITE :http://localhost:4000/author/delete/:id
//DESC : delete the author
//METHOD:  delete
//BODY: NONE
//PARAMS:id


ourApp.delete("/author/delete/:id", (req,res) => {
    const {id} = req.params;

    const Updatedauthor = Database.Author.filter((author) => author.id !== parseInt(id));//include all the book which is not having given ISBN

    Database.Author = Updatedauthor;

    return res.json(Database.Author);
})


//SITE :http://localhost:4000/publication/delete/:id
//DESC : delete the publication
//METHOD:  delete
//BODY: NONE
//PARAMS:id


ourApp.delete("/publication/delete/:id", (req,res) => {
    const {id} = req.params;

    const Updatedpub = Database.Publication.filter((pub) => pub.id !== parseInt(id));//include all the book which is not having given ISBN

    Database.Publication = Updatedpub;

    return res.json(Database.Publication);
})

//SITE :http://localhost:4000/publication/delete/book/:isbn/:id
//DESC : delete the publication
//METHOD:  delete
//BODY: NONE
//PARAMS:id,isbn


ourApp.delete("/publication/delete/book/:isbn/:id", (req,res) => {
    const { isbn, id } = req.params;
    
    Database.Book.forEach((book) => {
        if (book.ISBN === isbn) {
            book.publication = 0;//statets that no publicatio is there
            return book;
        }
        return book;
    })

    Database.Publication.forEach((pub) => {
        if(pub.id === parseInt(id)){
            
       const updbooks = pub.books.filter((book) => book !== isbn);
       pub.books = updbooks;

       return pub;

    }
    return pub;
});
    return res.json(Database.Publication );
});


    
    
    







ourApp.listen(4000,() => console.log("server is running"));//in terminal



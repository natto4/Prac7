let listOfAllKnownAuthors = []

// Bookstore class
class BookStore
{
    constructor(name, address, owner)
    {
        // Private attributes:
        this._name = name;
        this._address = address;
        this._owner = owner;
        this._booksAvailable = [];
        this._totalCopiesOfAllBooks = 0
    }

    // Public methods:
    
    authorKnown(authorName)
    //Returns true if the author is found in the bookstore
    {
        let foundThem = false;
        for (let pos = 0; pos < listOfAllKnownAuthors.length; pos++)
        {
            if (authorName === listOfAllKnownAuthors[pos])
            {
                foundThem = true
            }
        }
        return foundThem
    }

    addBook(bookInstance, copies)
    //Adds books to _booksAvailable array
    {
        let positionOfBook = this.checkForBook(bookInstance); 
        if (positionOfBook != null) //Check if book is already in bookstore
        {
             let foundBook = this._booksAvailable[positionOfBook];
             foundBook.copies += copies; //adds on to the existing number of copies
             console.log("Added " + copies + " copies of " + foundBook.book);
             listOfAllKnownAuthors.push(foundBook.book.author); //REMOVE THIS STATEMENT
        }
        else
        {
             let bookCopies = {
                 book: bookInstance,
                 copies: copies
             };
             this._booksAvailable.push(bookCopies); //Adds a new book object to the _booksAvailable array 
             console.log("Added " + copies + " copies of a new book: " + bookInstance);
        }

        this._totalCopiesOfAllBooks += copies; //adjusts the total number of books in the store (adds)
    }

    sellBook(bookInstance, numberSold)
    //Removes copies of book from book array
    {
        let positionOfBook = this.checkForBook(bookInstance);
        if (positionOfBook != null) //Check if book is already in bookstore
        {
            let foundBook = this._booksAvailable[positionOfBook];
            if (numberSold > this._booksAvailable[positionOfBook].copies) //accounting for if there aren't enough copies to sell
            {
                console.log("Not enough copies of " + foundBook.book + " to sell");
            }
            else
            {
                foundBook.copies -= numberSold;
                if (foundBook.copies === 0) //if there are no more copies left
                {
                    this._booksAvailable.pop(PositionOfBook); //Remove book from bookstore
                    this._NumTitles -= 1;
                    let foundAuth = this.authorKnown(foundBook.book.author); 
                    listOfAllKnownAuthors.pop(foundAuth); //remove author from known authors
                }
                this._totalCopiesOfAllBooks -= numberSold; //adjusts the total number of books in the store (subtracts)
                console.log("Sold " + numberSold + " copies of " + foundBook.book);
            }
        }
        else
        {
            console.log(bookInstance + " not found");
        }
    }

    checkForBook(bookInstance)
    //Check if book is in bookstore
    //Return a book number (var currBookNum) if it is in store
    //Return null if book cannot be found
    {
        let currBookNum = 0;
        while (currBookNum < this._booksAvailable.length)
        {
            if (this._booksAvailable[currBookNum].book.isTheSame(bookInstance))
            {
                return currBookNum;
            }
            else
            {
                return null;
            }
            currBookNum += 1;
        }
        return null;
    }

    get name()
    //Returns name of bookstore
    {
        return this._name;
    }

    set name(newName)
    //sets the name of the bookstore
    {
        this._name = newName;
    }

    get address()
    //returns address of bookstore
    {
        return this._address;
    }

    set address(newAddress)
    //sets address of bookstore
    {
        this._address = newAddress;
    }

    get owner()
    //returns name of owner of bookstore
    {
        return this._owner;
    }

    set owner(newOwner) 
    //sets the name of the owner
    {
        this._owner = newOwner;
    }
}

//Book class
class Book
{
    constructor(title, author, publicationYear, price)
    //Contructs book instance
    {
        // Private attributes:
        this._title = title;
        this._author = author;
        this._publicationYear = publicationYear;
        this._price = price;
        if (this.authorKnown(this._author) === false) //adds a a new author if the author is not already in the bookstore
        {
            listOfAllKnownAuthors.push(this._author)
        }
    }

    // Public methods:
    
    isTheSame(otherBook)
    //Checks if two books are the same
    {
        return otherBook.price === this.price;
    }

    authorKnown(authorName)
    //Returns true if the author is known in the bookstore
    {
        let foundThem = false;
        for (let pos = 0; pos < listOfAllKnownAuthors.length; pos++)
        {
            if (authorName === listOfAllKnownAuthors[pos])
            {
                foundThem = true;
            }
        }
        return foundThem;
    }

    get title()
    //Returns the title of the book
    {
        return this._title;
    }

    get author()
    //Returns the author of the book
    {
        return this._author;
    }

    get publicationYear()
    //Returns the publication year of the book
    {
        return this._publicationYear;
    }

    get price()
    //Returns the price of the book
    {
        return this._price;
    }

    toString()
    //Converts the books detail to a string
    {
        return this.title + ", " + this.author + ". " + this.publicationYear + " ($" + this.price + ")";
    }
}

// Book details courtesy of Harry Potter series by J.K. Rowling
let cheapSpellBook = new Book("The idiot's guide to spells","Morlan",2005,40);
let flourishAndBlotts = new BookStore("Flourish & Blotts", "North side, Diagon Alley, London, England", "unknown");
let monsterBook = new Book("The Monster Book of Monsters", "Edwardus Lima", 1978, 40);
let monsterBookToSell = new Book("The Monster Book of Monsters", "Edwardus Lima", 1978, 40);
let spellBook = new Book("The Standard Book of Spells, Grade 4", "Miranda Goshawk", 1921, 80);
flourishAndBlotts.addBook(cheapSpellBook,1000);
flourishAndBlotts.addBook(monsterBook, 500);
flourishAndBlotts.sellBook(monsterBookToSell, 200);
flourishAndBlotts.addBook(spellBook, 40);
flourishAndBlotts.addBook(spellBook, 20);
flourishAndBlotts.sellBook(spellBook, 15);
flourishAndBlotts.addBook(monsterBookToSell, -30);
flourishAndBlotts.sellBook(monsterBookToSell, 750);

console.log("Authors known: " + listOfAllKnownAuthors);

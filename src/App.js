import React from 'react'
import Search from './Search';
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    this.state = {
      value: 'coconut',
      books: [],
      showSearchPage: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
  }

  componentDidMount() {
    BooksAPI.getAll().then((data) => {
      this.setState({ books: data })
    });
  }

  handleChange(event, book) {
    BooksAPI.update(book, event.target.value).then(data => {
      console.log(data);
    }).catch((err) => {
      console.log(err);
    });
    // if "none" then remove book from array
    book.shelf = event.target.value;
    // re-render
    this.forceUpdate();
  }

  handleSearch(event) {
    this.setState({ showSearchPage: true });
    console.log('search start');
    /*
    BooksAPI.search("Football").then(data => {
      console.log(data);
      BooksAPI.update(data[0], "read").then(res => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
    });
    */
  }

  handleSearchClick() {
    this.setState({ showSearchPage: false });
    console.log('search end');
  }

  render() {
    const { books } = this.state;

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <Search name="Humphrey Bogart" onClick={this.handleSearchClick} />
        ) : (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {books.filter(book => book.shelf === 'currentlyReading').map(book =>
                          <li key={book.id}>
                            <div className="book">
                              <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url( ${book.imageLinks.thumbnail}% )` }}></div>
                                <div className="book-shelf-changer">
                                  <select value={book.shelf} onChange={(e) => this.handleChange(e, book)}>
                                    <option value="move" disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                  </select>
                                </div>
                              </div>
                              <div className="book-title">{book.title}</div>
                              <div className="book-authors">{book.authors[0]}</div>
                            </div>
                          </li>
                        )}
                      </ol>
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {books.filter(book => book.shelf === 'wantToRead').map(book =>
                          <li key={book.id}>
                            <div className="book">
                              <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url( ${book.imageLinks.thumbnail}% )` }}></div>
                                <div className="book-shelf-changer">
                                  <select value={book.shelf} onChange={(e) => this.handleChange(e, book)}>
                                    <option value="move" disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                  </select>
                                </div>
                              </div>
                              <div className="book-title">{book.title}</div>
                              <div className="book-authors">{book.authors[0]}</div>
                            </div>
                          </li>
                        )}
                      </ol>
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {books.filter(book => book.shelf === 'read').map(book =>
                          <li key={book.id}>
                            <div className="book">
                              <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url( ${book.imageLinks.thumbnail}% )` }}></div>
                                <div className="book-shelf-changer">
                                  <select value={book.shelf} onChange={(e) => this.handleChange(e, book)}>
                                    <option value="move" disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                  </select>
                                </div>
                              </div>
                              <div className="book-title">{book.title}</div>
                              <div className="book-authors">{book.authors[0]}</div>
                            </div>
                          </li>
                        )}
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              <div className="open-search">
                <a onClick={(e) => this.handleSearch(e)}>Add a book</a>
              </div>
            </div>
          )}
      </div>
    )
  }
}

export default BooksApp

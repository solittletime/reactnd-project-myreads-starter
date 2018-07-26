import React from 'react'
import { Link, Route, Switch } from 'react-router-dom';

import { debounce } from 'lodash'

import Search from './Search';
import BooksGrid from './BooksGrid';
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      books: [],
      filterText: '',
      search: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.bookSearch = debounce(this.bookSearch, 300);
  }

  bookSearch = filterText => {
    console.log(this.state);
    if (filterText === '') {
      this.setState({
        search: [],
        filterText: ''
      });
      return;
    }
    BooksAPI.search(filterText).then((foundBooks) => {
      if (!foundBooks || foundBooks.error) {
        foundBooks = [];
      } else {
        foundBooks.forEach((foundBook) => {
          let match = this.state.books.find((book) => book.id === foundBook.id);
          if (match) {
            foundBook.shelf = match.shelf;
          } else {
            foundBook.shelf = 'none';
          }
        });
      }
      this.setState({
        search: [...foundBooks]
      });
    });
    return 0;
  }

  componentDidMount() {
    BooksAPI.getAll().then((data) => {
      this.setState({ books: data })
    });
  }

  handleChange(value, updateBook) {
    BooksAPI.update(updateBook, value).then((data) => {
      // console.log(data);
      const books = this.state.books;
      let bookIndex = books.findIndex((book) => book.id === updateBook.id);
      if (bookIndex >= 0) {
        if (value === 'none') {
          // mainpage - remove book
          books.splice(bookIndex, 1);
        } else {
          // mainpage - update shelf
          books[bookIndex].shelf = value;
        }
      } else {
        // search - add book
        updateBook.shelf = value;
        books.push(updateBook);
      }
      const search = this.state.search;
      let searchIndex = search.findIndex((book) => book.id === updateBook.id);
      if (searchIndex >= 0) {
        // search - update shelf
        search[searchIndex].shelf = value;
      }
      this.setState({ books: books, search: search })
    }).catch((err) => {
      console.log(err);
    });
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
    this.bookSearch(filterText);
  }

  render() {
    const { books } = this.state;

    return (
      <div className="app">
        <Switch key="a1">
          <Route path="/search" render={(routeProps) =>
            <Search
              history={routeProps.history}
              filterText={this.state.filterText}
              onFilterTextChange={this.handleFilterTextChange}
              search={this.state.search}
              onChange={(e, book) => this.handleChange(e, book)}
            />
          } />
          <Route exact path="/" render={(routeProps) =>
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <div className="bookshelf-books">
                      <BooksGrid
                        books={books}
                        shelf="currentlyReading"
                        onChange={(e, book) => this.handleChange(e, book)}
                      />
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <div className="bookshelf-books">
                      <BooksGrid
                        books={books}
                        shelf="wantToRead"
                        onChange={(e, book) => this.handleChange(e, book)}
                      />
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                      <BooksGrid
                        books={books}
                        shelf="read"
                        onChange={(e, book) => this.handleChange(e, book)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="open-search">
                <nav key="a2">
                  <Link to="/search">Add a book</Link>
                </nav>
              </div>
            </div>
          } />
        </Switch>
      </div>
    )
  }
}

export default BooksApp

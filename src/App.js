import React from 'react'
import { Link, Route, Switch } from 'react-router-dom';
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
    // TODO - if shelf "none" then remove book from array
    book.shelf = event.target.value;
    // re-render
    this.forceUpdate();
  }

  handleFilterTextChange(filterText) {
    BooksAPI.search(filterText).then(data => {
      if (data.error) {
        data = [];
      } else {
        // TODO - set shelf for books on shelf already
        data.forEach((n) => {
          n.shelf = 'none';
        });
      }
      this.setState({
        search: data,
        filterText: filterText
      });
    });
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

import * as React from 'react';
import BooksGrid from './BooksGrid';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={() => this.props.history.goBack()}>Close</a>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.props.filterText}
              onChange={this.handleFilterTextChange}
            />
          </div>
        </div>
        <div className="search-books-results">
          <BooksGrid
            books={this.props.search}
            shelf="all"
            onChange={(e, book) => this.props.onChange(e, book)}
          />
        </div>
      </div>
    );
  }
}

export default Search;

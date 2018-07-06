import * as React from 'react';
import './Search.css';

class Search extends React.Component {

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={() => this.props.onClick()}>Close</a>
          <div className="search-books-input-wrapper">
            {
            }
            <input type="text" placeholder="Search by title or author" />
            <h2> {this.props.name.toUpperCase()} Details</h2>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid"></ol>
        </div>
      </div>
    );
  }
}

export default Search;

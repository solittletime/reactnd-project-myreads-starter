import * as React from 'react';

class BooksGrid extends React.Component {

  render() {
    return (
      <ol className="books-grid">
        {this.props.books.filter(book => this.props.shelf === book.shelf || this.props.shelf === 'all').map(book =>
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                {!book.imageLinks || !book.imageLinks.thumbnail ? (
                  <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url('no-image.png')` }}></div>
                ) : (
                  <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url( ${book.imageLinks.thumbnail} )` }}></div>
                )}
                <div className="book-shelf-changer">
                  <select value={book.shelf} onChange={(e) => this.props.onChange(e.target.value, book)}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              {!book.authors ? (
                <div className="book-authors">Anonymous</div>
              ) : (
                <div className="book-authors">{book.authors}</div>
              )}
        </div>
          </li>
        )}
      </ol>
    );
  }
}

export default BooksGrid;

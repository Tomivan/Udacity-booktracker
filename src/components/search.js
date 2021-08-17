import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Books from './books';
import { Link } from 'react-router-dom';
import { List } from 'react-content-loader'
import * as BooksAPI from './BooksAPI';

class Search extends Component {
	state = {
		query: '',
		sBooks: [],
		isSearching: false,
		error: false
	};

	updateQuery = event => {
		this.setState({ query: event.target.value }, () => {
			this.searchBooks(event);
		});
	};

	searchBooks = event => {

		const { query } = this.state;

		if (query) {
			this.setState({ isSearching: true });
			BooksAPI.search(query).then(res => {
				if (res.error) {
					this.setState({ sBooks: [], isSearching: false, error: true });
				} else if (res) {
					this.setState({ error: false });
					this.updateBooks(res);
				}
			});
		} else {
			this.setState({ sBooks: [] });
		}
	};

	updateBooks = books => {
		const { shelvedBooks } = this.props;
		for (const book of books) {
			book.shelf = 'none';
			for (const shelvedBook of shelvedBooks) {
				if (book.id === shelvedBook.id) book.shelf = shelvedBook.shelf;
			}
		}

		this.setState({
			sBooks: books,
			isSearching: false
		});
	};

	updateBook = books => {
		const {sBooks} = this.state;
		for (const book of sBooks) {
			for (const shelvedBook of books) {
				if (book.id === shelvedBook.id) book.shelf = shelvedBook.shelf;
			}
		}

		this.setState({ sBooks });
	};

	changeShelf = (book, event) => {
		this.props.onChangeShelf(book, event).then(books => this.updateBook(books));
	};

	render() {
		const { sBooks } = this.state;

		return (
			<div className="search">
				<div className="search-bar">
					<Link to="/" className="close">
						Close
					</Link>
					<div className="input">
						<input
							type="text"
							value={this.state.query}
							placeholder="Search for books by title or author"
							onChange={event => this.updateQuery(event)}
						/>
					</div>
				</div>

				{ this.state.error && !this.state.isSearching && (
					<div className="search-books-results center">
						<h3>No Result Found</h3>
					</div>
				)}

				{this.state.isSearching ? (
					<List />
				) : (
					<div className="results">
						<ol className="books-grid">
							{sBooks.map(book => (
								<Books key={book.id} book={book} onChangeShelf={this.changeShelf} />
							))}
						</ol>
					</div>
				)}
			</div>
		);
	}
}

Search.propTypes = {
	shelvedBooks: PropTypes.array.isRequired,
	onChangeShelf: PropTypes.func.isRequired
};

export default Search;
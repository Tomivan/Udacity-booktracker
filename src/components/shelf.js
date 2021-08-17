import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'react-content-loader';
import Books from './books';

function Shelf(props) {
	return (
		<div className="shelf">
			<h2 className="shelf-name">{props.shelfName}</h2>
			<div className="shelf-books">
				{!props.appLoaded ? (
					<List />
				) : props.fBooks.length <= 0 ? (
					<h3 className="shelf-status">Empty Shelf</h3>
				) : (
					<ol className="shelf-grid">
						{props.fBooks.map(book => (
							<Books key={book.id} book={book} onChangeShelf={props.onChangeShelf} />
						))}
					</ol>
				)}
			</div>
		</div>
	);
}

Shelf.propTypes = {
	shelfName: PropTypes.string.isRequired,
	appLoaded: PropTypes.bool.isRequired,
	fBooks: PropTypes.array.isRequired,
	onChangeShelf: PropTypes.func.isRequired
};

export default Shelf;
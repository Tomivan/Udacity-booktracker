import React from 'react';
import PropTypes from 'prop-types';
import ChangeShelf from './changeShelf';

function Books(props) {
	const { book, onChangeShelf } = props;

	const width = 150;
	const height = 200;

	const thumbnail =
		book.imageLinks === undefined
			? `https://dummyimage.com/${width}x${height}/000/fff.png&text=No+Image`
			: book.imageLinks.thumbnail;

	const authors = book.authors === undefined ? 'Unknown Author' : book.authors.join(', ');

	return (
		<li>
			<div className="book">
				<div className="book-top">
					<div
						className="book-cover"
						style={{ width: 150, height: 200, backgroundImage: `url(${thumbnail})` }}
					/>
					<ChangeShelf book={book} onChangeShelf={onChangeShelf} />
				</div>
				<div className="book-title">{book.title}</div>
				<div className="book-authors">{authors}</div>
			</div>
		</li>
	);
}

Books.propTypes = {
	book: PropTypes.object.isRequired,
	onChangeShelf: PropTypes.func.isRequired
};

export default Books;
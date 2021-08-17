import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import './App.css';

import * as BooksAPI from './components/BooksAPI';
import Shelf from './components/shelf';
import Search from './components/search';

class App extends Component {

  state = {
		books: [],
		isLoaded: false
	};

	componentDidMount() {
		BooksAPI.getAll().then(res => {
			this.setState({
				books: res,
				isLoaded: true
			});
		});
  }
  
  changeShelf = (book, event) => {
		return new Promise(resolve => {
			BooksAPI.update(book, event.target.value).then(res => {
				BooksAPI.getAll().then(res => {
					this.setState(
						{
							books: res
						},
						resolve(res)
					);
				});
			});
		});
	};


  render() {

    const { isLoaded, books } = this.state;
    return (
      <div className="app">
        <Router>
          <Switch>
        <Route
					exact
					path="/"
					render={() => (
            <div className="book-list">
              <div className="book-list-title">
                <h1>Tomivan Books</h1>
              </div>
              <div className="book-list-info">
                <div>
                  <Shelf
                    key="Currently Reading"
                    shelfName="Currently Reading"
                    appLoaded={isLoaded}
                    fBooks={books.filter(book => book.shelf === 'currentlyReading')}
                    onChangeShelf={this.changeShelf}
                  />
                  <Shelf
                    key="Want to Read"
                    shelfName="Want to Read"
                    appLoaded={isLoaded}
                    fBooks={books.filter(book => book.shelf === 'wantToRead')}
                    onChangeShelf={this.changeShelf}
                  />
                  <Shelf
                    key="Read"
                    shelfName="Read"
                    appLoaded={isLoaded}
                    fBooks={books.filter(book => book.shelf === 'read')}
                    onChangeShelf={this.changeShelf}
                  />
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add Book</Link>
              </div>
            </div>
          )}/>

          <Route
            path="/search"
            render={() => <Search shelvedBooks={books} onChangeShelf={this.changeShelf} />}
				  />

           </Switch>
          </Router>
      </div>
    );
  }
}

export default App;
import React, { Component } from 'react';

class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchTerm: '',
		};
	}

	handleChange = (e) => {
		const searchTerm = e.target.value;
		this.setState({ searchTerm });
	};

	handleSearch = () => {
		const { searchTerm } = this.state;
		this.props.onSearch(searchTerm);
	};

	render() {
		const { searchTerm } = this.state;
    
		return (
			<div>
				<input
					type="text"
					id="searchInput"
					name="searchInput"
					placeholder="Search..."
					value={searchTerm}
					onChange={this.handleChange}
				/>
				<button onClick={this.handleSearch} disabled={searchTerm.length === 0}>
					Search
				</button>
			</div>
		);
	}
}

export default SearchBar;

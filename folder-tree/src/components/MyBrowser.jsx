import React, { Component } from 'react';
import Folder from './Folder';
import File from './File';
import SearchBar from './SearchBar';
const data = require('../data/data.json');

class MyBrowser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			expandedPaths: this.getExpandedPaths(props.expandedFolders),
			searchResults: [],
			indexedFiles: {},
		};
	}

	componentDidMount() {
		this.createIndexedFiles(data);
	}

	getExpandedPaths = (folders) => {
		const expandedPaths = new Set();
		folders.forEach((folder) => {
			const parts = folder.split('/').filter((part) => part !== '');
			let fullPath = '';
			parts.forEach((part) => {
				fullPath += `/${part}`;
				expandedPaths.add(fullPath);
			});
		});
		return expandedPaths;
	};

	isPathExpanded = (path) => {
		const { expandedPaths } = this.state;
		return expandedPaths.has(path);
	};

	createIndexedFiles = (items, parentPath = '') => {
		const updatedIndexedFiles = { ...this.state.indexedFiles };

		const updateIndexedFile = (item, path) => {
			if (item.type === 'FILE') {
				if (updatedIndexedFiles[item.name]) {
					updatedIndexedFiles[item.name].push(path);
				} else {
					updatedIndexedFiles[item.name] = [path];
				}
			} else if (item.type === 'FOLDER' && item.children) {
				item.children.forEach((child) => updateIndexedFile(child, `${path}/${child.name}`));
			}
		};

		items.forEach((item) => updateIndexedFile(item, `${parentPath}/${item.name}`));

		this.setState({ indexedFiles: updatedIndexedFiles });
	};

	handleSearch = (searchTerm) => {
		const { indexedFiles } = this.state;

		const searchResults = Object.entries(indexedFiles)
			.filter(([fileName]) => fileName.toLowerCase().includes(searchTerm.toLowerCase()))
			.map(([fileName, filePaths]) => filePaths)
			.flat();

		const expandedPaths = this.getExpandedPaths(searchResults);

		this.setState({ searchResults, expandedPaths });
	};

	renderItems = (items, parentPath = '') => {
		return items.map((item) => {
			const path = `${parentPath}/${item.name}`;
			const expanded = this.isPathExpanded(path);
			if (item.type === 'FOLDER') {
				return (
					<Folder key={path} name={item.name} path={path} expanded={expanded}>
						{item.children && this.renderItems(item.children, path)}
					</Folder>
				);
			} else if (item.type === 'FILE') {
				return <File key={path} name={item.name} />;
			} else {
				return null;
			}
		});
	};

	renderFilteredItems = (items, parentPath = '') => {
		const { searchResults, expandedPaths } = this.state;

		return items.map((item) => {
			const path = `${parentPath}/${item.name}`;

			if (item.type === 'FOLDER') {
				const containsFilesFromSearch = item.children.some((child) => {
					const childPath = `${path}/${child.name}`;
					return searchResults.some((result) => result.startsWith(childPath));
				});

				const expanded = containsFilesFromSearch || searchResults.includes(path) || expandedPaths.has(path);

				if (containsFilesFromSearch) {
					return (
						<Folder key={path} name={item.name} path={path} expanded={expanded}>
							{this.renderFilteredItems(item.children, path)}
						</Folder>
					);
				} else {
					return null;
				}
			} else if (item.type === 'FILE') {
				if (searchResults.includes(path)) {
					return <File key={path} name={item.name} />;
				} else {
					return null;
				}
			} else {
				return null;
			}
		});
	};

	render() {
		const { searchResults } = this.state;
		const itemsToRender = searchResults.length > 0 ? searchResults : data;

		return (
			<div>
				<SearchBar onSearch={this.handleSearch} />
				{searchResults.length ? this.renderFilteredItems(data) : this.renderItems(itemsToRender)}
			</div>
		);
	}
}

export default MyBrowser;

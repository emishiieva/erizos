import React, { Component } from 'react';
import MyBrowser from './components/MyBrowser'
import './index.css';
import { EXPANDED_FOLDERS } from './constants';

class App extends Component {
  render() {
    return (
      <div className='main-block'>
        <h1>FOLDER TREE</h1>
        <MyBrowser expandedFolders={EXPANDED_FOLDERS} />
      </div>
    );
  }
}

export default App;

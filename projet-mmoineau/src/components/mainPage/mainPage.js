import React from 'react';
import PropTypes from 'prop-types';
import Artists from '../artists';
import styles from './mainPage.scss';

class MainPage extends React.Component {

	constructor() {
	  super();
	  
	}

	fetchArtists(){
		
	}

	render() {
	  return (
	  <div>
		<div>TITLE</div>
		<div>SEARCHBAR</div>
		<div><Artists /><Artists /><Artists /></div>
		<div>TAGS</div>
	  </div>
	  );
	}
  
}
  

export default MainPage;

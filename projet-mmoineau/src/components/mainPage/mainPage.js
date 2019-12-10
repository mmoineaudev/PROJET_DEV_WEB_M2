import React from 'react';
import PropTypes from 'prop-types';
import Artists from '../artists';
import styles from './mainPage.scss';

class MainPage extends React.Component {

	constructor() {
	  super();
	  this.state = { 
			start: 0 ,
			artists: []
		}
	}

	async fetchArtists(){
		const URL = "https://wasabi.i3s.unice.fr/api/v1/artist_all/"+this.state.start ;
		const headers = new Headers();
		const requestInfos = { method: 'GET',
					headers: headers,
					mode: 'cors',
					cache: 'default' };
		const result = await fetch(URL,requestInfos);
		const jsonRes = await result.json();
		return jsonRes;
	}
	
	componentWillMount() {
		const artists = this.fetchArtists().then((e) => {
			//this.setState({artists: });
			console.log(e)
		});
	}
	
	render() {
	return (
	 <div>
		<div>TITLE</div>
		<div>SEARCHBAR</div>
		<div>{this.state.artists.}</div>
		<div>TAGS</div>
	  </div>
	  );  
	

	}
}

export default MainPage;

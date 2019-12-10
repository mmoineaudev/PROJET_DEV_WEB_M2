import React from 'react';
import PropTypes from 'prop-types';
import Artists from '../artists';
import styles from './mainPage.scss';

class MainPage extends React.Component {

	constructor() {
	  super();
	  this.state = { start: 0 }

	}

	fetchArtists(){
		const URL = "https://wasabi.i3s.unice.fr/api/v1/artist_all/"+this.state.start ;
		var headers = new Headers();
		var requestInfos = { method: 'GET',
					headers: headers,
					mode: 'cors',
					cache: 'default' };
		const result = fetch(URL,requestInfos).then((response) => {
			if(response.ok){
				return response.body ;
			}else{
				return response.statusText ;				
			}
		});
		console.log(URL, result);
		return result.then((e) => console.log(e)  );
	}

	render() {
	const artists = this.fetchArtists();
	console.log(artists);

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

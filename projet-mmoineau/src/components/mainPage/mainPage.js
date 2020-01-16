import React, { Component } from 'react'

import PropTypes from 'prop-types'
import Artists from '../artists'

class MainPage extends React.Component {

	constructor() {
	  super()
	  this.state = { 
			start: 0 ,
			artists: []
		}
	}

	async fetchArtists(){
		console.log('fetchArtists')
		const URL = "https://wasabi.i3s.unice.fr/api/v1/artist_all/"+this.state.start 
		const headers = new Headers()
		const requestInfos = { method: 'GET',
					headers: headers,
					mode: 'cors',
					cache: 'default' }
		const result = await fetch(URL,requestInfos)
		console.log('fetchArtists ', URL , result)
		const jsonRes = await result.json()
		console.log('fetchArtists ', jsonRes)
		return jsonRes
	}

	//https://wasabi.i3s.unice.fr/search/member/name/:memberName
	async fetchArtistsByName(){
		console.log('fetchArtistsByName')
		const URL = "https://wasabi.i3s.unice.fr/search/member/name/"+this.state.searchbar 
		const headers = new Headers()
		const requestInfos = { method: 'GET',
					headers: headers,
					mode: 'cors',
					cache: 'default' }
		const result = await fetch(URL,requestInfos)
		//console.log('fetchArtistsByName ', result)
		const jsonRes = await result.json()
		console.log('fetchArtistsByName ', jsonRes)
		return jsonRes
	}
	getAllArtist(){
		console.log('this.getAllArtist')
		this.fetchArtists().then(newArtist => {
			this.setState({
				artists: newArtist
			})
		})

	}
	getArtistFromSearch(){
		console.log('this.getArtistFromSearch')
		this.fetchArtistsByName().then(newArtist => {
			this.setState({
				artists: newArtist
			})
		})

	}
	componentWillMount() {
		console.log('componentWillMount');
		let newArtist = [];
		if( (this.state.artists && this.state.artists.length>0) ){
			//ok
		}else {
			if(this.props.search && this.props.search.length>0){
				newArtist = this.getArtistFromSearch();
			}else{
				newArtist = this.getAllArtist();
			}
			this.setState({
				artists: newArtist
			})	
		}
		console.log('componentWillMount', this.state, this.props)
	}
	
	getFormattedArtistsFromState() {
		console.log('getFormattedArtistsFromState')
		if(this.state.artists){
			const artists = this.state.artists;
			const res = (this.state.artists.length>0)?
			<ul>{artists.map((element) => 
				<li key={element._id}>{'*' + element.name +' ; '+ element.type,element.genres}</li>
			)}</ul> : <p> sadness, pas d'artistes </p>; 
			console.log(res)
			
			return res
		} return [];	
	}

	render() {
		const artists = this.getFormattedArtistsFromState()
		return (
	 	<div>
			<div>TITLE</div>
			<div>
				<form onSubmit={this.getArtistFromSearch()} >
					<input type="text" 	ref={(search) => this.search = search} className="searchbar" placeholder="Search..." />
					<button type="submit">Search</button>
				</form>
			</div>
			<div>{artists}</div>
			<div>TAGS</div>
	  	</div>
	  )  
	

	}
}

export default MainPage

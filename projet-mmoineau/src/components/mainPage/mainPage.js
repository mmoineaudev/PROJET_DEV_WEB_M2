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
		//console.log('fetchArtists ', result)
		const jsonRes = await result.json()
		//console.log('fetchArtists ', jsonRes)
		return jsonRes
	}
	
	componentWillMount() {
		console.log('componentWillMount')
		this.fetchArtists()
			  .then(newArtist => { // data c'est le texte json de response ci-dessus
				this.setState({
					artists: newArtist
			   })
			  }).catch(err => {
				console.log("erreur dans le get : " + err)
			  }) 
	}
	
	getFormattedArtistsFromState() {
		console.log('getFormattedArtistsFromState')
		let formattedArtist = []

		if(this.state.artists.length>0) this.state.artists.forEach(element => {
			//console.log(element)
			formattedArtist.push(element.name)
		})
		if(formattedArtist.length>0) formattedArtist.forEach(element => {
			element= <li> element </li>
		})
		return (formattedArtist)?<ul>{formattedArtist.join()}</ul>:<p>pas d'artiste...</p> 
	}

	render() {
		const artists = this.getFormattedArtistsFromState()
		return (
	 	<div>
			<div>TITLE</div>
			<div>SEARCHBAR</div>
			<div>{artists}</div>
			<div>TAGS</div>
	  	</div>
	  )  
	

	}
}

export default MainPage

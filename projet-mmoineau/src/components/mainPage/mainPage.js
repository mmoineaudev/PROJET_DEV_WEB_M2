import React, { Component, Input } from 'react'

import PropTypes from 'prop-types'
import Artists from '../artists'
import artists from '../artists'

class MainPage extends React.Component {
	constructor() {
	  console.log(`#############################################################
DEBUG : constructor
#############################################################`)
	  super()
	  this.state = { 
			start: 0 ,
			search : 'An artist',
			display: 'all', //'all', 'search'
			artists: [],
			htmlArtists: []
		}
	}
	getAll(){
		console.log('getAll')
		this.setState({display:'all'})
	}
	async fetchArtists(){
		console.log(`#############################################################
DEBUG : fetchArtists
############################################################`)
		const URL = "https://wasabi.i3s.unice.fr/api/v1/artist_all/"+this.state.start 
		const headers = new Headers()
		const requestInfos = { method: 'GET',
					headers: headers,
					mode: 'cors',
					cache: 'default' }
		const result = await fetch(URL,requestInfos)
		const jsonRes = await result.json()
		console.log(`#############################################################
		DEBUG : fetchArtists
DEBUG : `,jsonRes,`
############################################################`)
		this.setState({
			artists: Promise.resolve(jsonRes),
			display: 'all'
		})
	}	

	getSearch(){
		console.log('getSearch : ', this.search.value)
		this.setState({display:'search',
						searche: this.search.value})
	}
	//https://wasabi.i3s.unice.fr/search/member/name/:memberName
	async fetchArtistsByName(){
		console.log(`#############################################################
DEBUG : fetchArtistsByName `, this.search.value, `
############################################################`)
		const URL = "https://wasabi.i3s.unice.fr/search/member/name/"+this.state.search
		const headers = new Headers()
		const requestInfos = { method: 'GET',
					headers: headers,
					mode: 'cors',
					cache: 'default' }
		const result = await fetch(URL,requestInfos)
		const jsonRes = await result.json()
		console.log('fetchArtistsByName ', jsonRes)
		this.setState({
			artists: Promise.resolve(jsonRes),
			display: 'search'
		})
	}


	componentDidMount() {
		console.log(`#############################################################
START : componentWillMount`, this.state, this.props, 
`############################################################`)
		let newArtists = []
		switch (this.state.display) {
			case 'all':
				this.displayFactory(Promise.resolve(this.fetchArtists()))
				break;
			case 'search':
				this.displayFactory(Promise.resolve(this.fetchArtistsByName()))
				break;
			default:
				console.log('default display')
				break;
		}
		console.log(`#############################################################
END : componentWillMount`, this.state, this.props, 
`############################################################`)
	}

	displayFactory(artists){
		console.log(`#############################################################
DEBUG : displayFactory
############################################################`)
		const htmlArtists = [];
		for(let i = 0; i<artists.length ; i++){
			let artist = artists[i]
			htmlArtists.push(<li>{artist._id} - {artist.name} </li>)
		}
		this.setState({htmlArtists: htmlArtists})
		return (htmlArtists.length>0 )? htmlArtists : 'une liste d\'artistes'; 
	}

	render() {
		const artists = this.state.artists
		return (
	 	<div>
			<div>TITLE</div>
			<div>
					<input type="text" 	ref={(search) => this.search = search} className="searchbar" placeholder="Search..." />
					
					<button onClick={() => this.getAll()} >
						ALL
					</button>
					
					<button onClick={() => this.getSearch() } > Search </button>
			</div>
			{this.state.htmlArtists}
			<div>TAGS</div>
	  	</div>
	  )  
	

	}
}

export default MainPage

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
			artists: jsonRes,
			display: 'all'
		})
	}	

	getSearch(){
		console.log('getSearch : ', this.search.value)
		this.setState({display:'search',
						search: this.search.value})
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
			artists: jsonRes,
			display: 'search'
		})	

	}


	componentDidMount() {
		console.log(`#############################################################
START : componentWillMount`, this.state, this.props, 
`############################################################`)
		
		this.displayFactory()

		console.log(`#############################################################
END : componentWillMount`, this.state, this.props, 
`############################################################`)
	}

	displayFactory(){
		console.log(`#############################################################
DEBUG : displayFactory
############################################################`)
		let artists
		switch (this.state.display) {
			case 'all':
				artists = this.fetchArtists()
				break;
			case 'search':
				artists = this.fetchArtistsByName()
				break;
			default:
				break;
		}

	}

	render() {
		console.log('render :' , this.state)
		let htmlArtists = '';
		this.state.artists.forEach(artist => {
			console.log(artist.name, artist._id)
			htmlArtists.concat(`<li key=${artist._id} >${artist.name} </li>`)
		});
		console.log('render : htmlArtists :' , htmlArtists)
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
			{ this.state.artists.length }
			<div>
				wtf <ul>{ htmlArtists }</ul>
			</div>
			<div>TAGS</div>
	  	</div>
	  )  
	

	}
}

export default MainPage

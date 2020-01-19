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
			isLoaded : false,
			search : 'An artist',
			artists: [],
		}
		this.fetchArtists()
	}
	getAll(){
		
		console.log('getAll')
		this.setState({isLoaded:false})
		this.fetchArtists()
			
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
		
		fetch(URL,requestInfos).then(res => res.json()).then(jsonRes => {
			
			this.setState({isLoaded:true,artists: jsonRes})

		}
	).then(console.log('loaded'))

	}	

	getSearch(){
		console.log('getSearch : ', this.search.value)	
		this.setState({isLoaded:false})
		this.fetchArtistsByName()
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
		(URL,requestInfos).
		then(res => res.json()).
		then(jsonRes => {
				this.setState({isLoaded:true,artists: jsonRes })

			}
		).then(console.log('loaded'))
	}

	componentDidMount() {
		console.log(`#############################################################
START : componentWillMount`, this.state, this.props, 
`############################################################`)
	
	if( this.state.artists.length>0 ) {
		let htmlArtists = ''
		this.state.artists.forEach(artist => {
				console.log(artist.name, artist._id)
				htmlArtists.concat(`<li key=${artist._id} >${artist.name} </li>`)
			})
		console.log('htmlArtists',htmlArtists)
		this.setState({htmlArtists: htmlArtists})
		}
	}

	render() {
		console.log('render :' , this.state)
		if(!this.state.isLoaded) return <div>Loading...</div>
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
				wtf <ul>{ this.state.htmlArtists }</ul>
			</div>
			<div>TAGS</div>
	  	</div>
	  )  
	

	}
}

export default MainPage

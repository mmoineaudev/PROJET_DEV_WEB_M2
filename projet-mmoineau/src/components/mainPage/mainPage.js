import React from 'react'
import './mainPage.css';


class MainPage extends React.Component {
	constructor() {
	  super()
	  this.state = { 
			start: 0 ,
			isLoaded : false,
			search : 'An artist',
			artists: [],
			lastOperation: ()=>{}
		}
		this.fetchArtists()
	}
	getAll(){
		this.debug('getAll')
		this.setState({isLoaded:false})
		this.fetchArtists()
			
	}
	async fetchArtists(){
		this.debug("fetchArtists")
		let oldArtists = this.state.artists
		const URL = "https://wasabi.i3s.unice.fr/api/v1/artist_all/"+this.state.start 
		const headers = new Headers()
		const requestInfos = { method: 'GET',
					headers: headers,
					mode: 'cors',
					cache: 'default' }
		
		fetch(URL,requestInfos).then(res => res.json()).then(jsonRes => {
			
			this.setState({isLoaded:true,artists: jsonRes, lastOperation:this.fetchArtists})

		}
	).then(this.debug('fetchArtists','loaded'))

	}	

	getSearch(){
		console.log('getSearch : ', this.search.value)	
		this.setState({isLoaded:false})
		this.fetchArtistsByName()
	}
	//https://wasabi.i3s.unice.fr/search/member/name/:memberName
	async fetchArtistsByName(){
		this.debug("fetchArtistsByName" , this.search.value)
		const URL = "https://wasabi.i3s.unice.fr/search/member/name/"+this.search.value
		const headers = new Headers()
		let oldArtists = this.state.artists
		const requestInfos = { method: 'GET',
					headers: headers,
					mode: 'cors',
					cache: 'default' }
		fetch(URL,requestInfos).then(res => res.json()).then(jsonRes => {
				this.setState({isLoaded:true,artists: jsonRes, lastOperation:this.fetchArtistsByName})
			}
		).then(this.debug('fetchArtistsByName','loaded'))
	}

	callLastOperation(){
		this.setState({isLoaded:false})
		this.debug('callLastOperation', this.state.lastOperation)
		if(this.state.lastOperation==this.fetchArtists) this.fetchArtists()
		else if(this.state.lastOperation==this.fetchArtistsByName) this.fetchArtistsByName()
		else this.debug('no last operation')
	}

	componentDidMount() {
		this.debug("componentWillMount", this.state)
		if(this.state.artists.length===0) this.fetchArtists()
	}

	render() {
		this.debug('render :' , this.state)
		if(!this.state.isLoaded) return <div class="debug">Loading...</div>
		return (
	 	<div class="debug">
			<div class="debug">FRONTEND WASABI</div>
			<div class="debug">
					<input type="text" 	ref={(search) => this.search = search} className="searchbar" placeholder="Search..." />
					
					<button onClick={() => this.getAll()} > ALL </button>
					<button onClick={() => this.getSearch() } > Search </button>
					{this.displayArtists()}
					{this.displayPager()}
			</div>
			
			<div class="debug">TAGS</div>
	  	</div>
	  )  
	}
	displayPager(){
		const start = this.state.start 
		return (<div className="pager">
			<button className="pagerButton" onClick={()=>{
				this.debug('pageDecrement')
				if(start>0) this.setState({start:start-200})
				this.callLastOperation()
			}}>Previous</button>
			<label className="pagerButton">{start}</label>
			<button className="pagerButton" onClick={()=>{
				this.debug('pageIncrement')
				this.setState({start:start+200})
				this.callLastOperation()
			}}>Next</button>
		</div>)
	}
	displayArtists(){	
		const artists = this.state.artists;
		this.debug('displayArtists', artists.length)
		if(artists.length === 0 ) return <div className="noResultFound"> No result found ... </div>
		else return (
		<div className="resultsFound"> { artists.length } result found
			<div className="list">
				<nav><ol>{ artists.map(el => <li key={el._id}> {el.name} </li>)}</ol></nav>
			</div>
		</div>)
	}

	debug(label, message){
		console.log(`#############################################################`)
		console.log(label)
		console.log(message)
		console.log(`#############################################################`);
	}
}

export default MainPage

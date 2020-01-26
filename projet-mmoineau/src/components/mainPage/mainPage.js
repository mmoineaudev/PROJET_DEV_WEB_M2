import React from 'react' ; 
import './mainPage.css';
import { List, Button, TableContainer, Card, CardContent, Typography, Container } from '@material-ui/core';
import MyLineGraph from '../myLineGraph';
import Artist from '../artist';
import base from '../../base';
  

class MainPage extends React.Component {
	constructor() {
	  super()
	  this.state = { 
			start: 0,
			listIsLoaded : false,
			dataIsLoaded : false,
			popularityIsLoaded : false,
			search : 'An artist',
			artists: [],
			memberWithTheMostBand: [],
			popularities: [],
			mostAlbumsIsLoaded:false, 
			memberWithTheMostAlbums: [],
			selected: '',
			history: {},
			lastOperation: ()=>{}
		}		
		
	}

	/**
	 * Lance une nouvelle requete
	 */
	getAll(){
		const debug=false
		this.debug(debug, 'getAll')
		this.setState({listIsLoaded:false, dataIsLoaded:false, fetchArtistWithTheMostAlbums:false})
		this.fetchArtists()
		this.fetchMemberWithTheMostBand()
		this.fetchPopularity()
		this.fetchArtistWithTheMostAlbums()
			
	}
	async fetchArtists(){
		const debug=false
		this.debug(debug, "fetchArtists")
		const URL = "https://wasabi.i3s.unice.fr/api/v1/artist_all/"+this.state.start 
		const headers = new Headers()
		const requestInfos = { method: 'GET',
					headers: headers,
					mode: 'cors',
					cache: 'default' }
		
		fetch(URL,requestInfos).then(res => res.json()).then(jsonRes => {
			
			this.setState({listIsLoaded:true, artists: jsonRes, lastOperation:this.fetchArtists})

		}
	).then(this.debug(debug, 'fetchArtists','loaded'))

	}	
	/**
	 * Lance une nouvelle requete
	 */
	getSearch(){
		const debug=false
		const oldHistory = this.state.history;
		let newHistory = oldHistory
		const key = "search"+this.count(oldHistory)
		newHistory[key] = this.search.value
		this.debug(debug, 'getSearch : ', this.search.value)	
		this.setState({listIsLoaded:false, artists:[], history:newHistory})
		this.fetchArtistsByName()
	}
	count(obj) {	
		var c = 0, p;
		for (p in obj) {
			if (obj.hasOwnProperty(p)) {
				c += 1;
			}
		}
		return c;
	}

	//https://wasabi.i3s.unice.fr/search/member/name/:memberName
	async fetchArtistsByName(){
		const debug=false
		this.debug(debug, "fetchArtistsByName : " , this.search.value)
		const URL = "https://wasabi.i3s.unice.fr/search/fulltext/"+this.search.value
		const headers = new Headers()
		const requestInfos = { method: 'GET',
					headers: headers,
					mode: 'cors',
					cache: 'default' }
			
		let response = await fetch(URL, requestInfos).then(res => {this.debug(debug, 'fetchArtistsByName', res) ; return res })
		let body = await response.json().then(res => {this.debug(debug, 'fetchArtistsByName', res) ; return res })
		if(body) this.setState({listIsLoaded: true, artists: body  })
		else this.setState({listIsLoaded: true})

	}
	
	async fetchPopularity(){
		const debug=false
		const URL = "https://wasabi.i3s.unice.fr/api/v1/artist/genres/popularity?limit=3"
		const headers = new Headers()
		const requestInfos = { method: 'GET',
					headers: headers,
					mode: 'cors',
					cache: 'default' }
		let response = await fetch(URL, requestInfos).then(res => {this.debug(debug, 'fetchPopularity', res) ; return res })
		let body = await response.json().then(res => {this.debug(debug, 'fetchPopularity', res) ; return res })
		this.setState({popularityIsLoaded: true, popularities:body  })
	}
	//wasabi.i3s.unice.fr/api/v1/artist/member/count/band
	async fetchMemberWithTheMostBand(){
		const debug=false
		const URL = "https://wasabi.i3s.unice.fr/api/v1/artist/member/count/band?limit=10"
		const headers = new Headers()
		const requestInfos = { method: 'GET',
					headers: headers,
					mode: 'cors',
					cache: 'default' }
		let response = await fetch(URL, requestInfos).then(res => {this.debug(debug, 'fetchMemberWithTheMostBand', res) ; return res })
		let body = await response.json().then(res => {this.debug(debug, 'fetchMemberWithTheMostBand', res) ; return res })
		this.setState({dataIsLoaded:true, memberWithTheMostBand:body})
	}
	//https://wasabi.i3s.unice.fr/api/v1/artist/count/album
	async fetchArtistWithTheMostAlbums(){
		const debug=false
		const URL = "https://wasabi.i3s.unice.fr/api/v1/artist/count/album?limit=2"
		const headers = new Headers()
		const requestInfos = { method: 'GET',
					headers: headers,
					mode: 'cors',
					cache: 'default' }
		let response = await fetch(URL, requestInfos).then(res => {this.debug(debug, 'fetchArtistWithTheMostAlbums', res) ; return res })
		let body = await response.json().then(res => {this.debug(debug, 'fetchArtistWithTheMostAlbums', res) ; return res })
		
		this.setState({mostAlbumsIsLoaded:true, memberWithTheMostAlbums:body})
	}
	/**
	 * Rappelle la derniere opération réalisée quand on change des parametres
	 */
	callLastOperation(){
		const debug=false
		this.setState({listIsLoaded:false})
		this.debug(debug, 'callLastOperation', this.state.lastOperation)
		if(this.state.lastOperation===this.fetchArtists) this.fetchArtists()
		else if(this.state.lastOperation===this.fetchArtistsByName) this.fetchArtistsByName()
		else this.debug(debug, 'no last operation')
	}
	//#############FireBase########################################################
	UNSAFE_componentWillMount(){
		const debug=true
		this.ref = base.syncState('history', {
			context: this,
			state: 'history'
		  });
		  //probleme de cors ?
		this.debug(debug, 'componentWillMount : firebase', this.state.history)
		
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}
	//###############################################################################
	
	componentDidMount() {
		const debug=false
		this.getAll()
		this.debug(debug, "componentWillMount", this.state)
		
	}
	
	//###############################################################################
	//###############################################################################
	//###############################################################################
	render() {
		const debug=false
		this.debug(debug, 'render :' , this.state)
		
		return (
	 	<div>
			<div maxheight="10em" className="App-header">FRONTEND WASABI</div>
			<div className="style1">
					 <input type="text" ref={(search) => this.search = search} />
					<Button padding="3em 3em" id="searchButton" className="MuiButton-iconSizeSmall MuiButton-outlinedSizeSmall" onClick={() => this.getSearch() } > Search </Button>
					{this.displayHistory()}
					<Button padding="3em 3em" id="getAllButton" className="MuiButton-iconSizeSmall MuiButton-outlinedSizeSmall" onClick={() => this.getAll()} > SEARCH ALL SONGS </Button>
					{this.displayArtists()}
					{this.displayPager()}
					{this.displayData()}
			</div>
			<div>

				{this.displayGraphs()}

			</div>
	  	</div>
	  )  
	}
	//###############################################################################
	//###############################################################################
	//###############################################################################

	displayGraphs(){
		let graphPopularity = ''
		let graphMostAlbums = ''
		let graphMostBand = ''
		const debug=false
		if(!(this.state.popularityIsLoaded || this.state.mostAlbumsIsLoaded || this.state.dataIsLoaded)) return <label>Loading...</label>
		if(this.state.popularityIsLoaded){
			const labels1 = []
			this.state.popularities.forEach((genre) => labels1.push(genre._id))
			const values1 = []
			this.state.popularities.forEach((genre) => values1.push(genre.sum))

			this.debug(debug, 'displayGraphs :' , { labels1, values1})
			graphPopularity = <MyLineGraph label="genres populaires" data={values1} labels={labels1}></MyLineGraph>
		}
		if(this.state.mostAlbumsIsLoaded){
			const labels2 = []
			this.state.memberWithTheMostAlbums.forEach((artist) => labels2.push(artist.name))
			const values2 = []
			this.state.memberWithTheMostAlbums.forEach((artist) => values2.push(artist.sum))

			this.debug(debug, 'displayGraphs :' , { labels2, values2})
			graphMostAlbums = <MyLineGraph label="Participants au plus d'albums" data={values2} labels={labels2}></MyLineGraph>
		}
		if(this.state.dataIsLoaded){
			const labels3 = []
			this.state.memberWithTheMostBand.forEach((artist) => labels3.push(artist.membername))
			const values3 = []
			this.state.memberWithTheMostBand.forEach((artist) => values3.push(artist.sum))
			this.debug(debug, 'displayGraphs :' , { labels3, values3})
			graphMostBand = <MyLineGraph label="Membres du plus de groupes" data={values3} labels={labels3}></MyLineGraph>
		}
	return <Container className="MuiContainer-root MuiContainer-maxWidthXs">{graphPopularity}{graphMostAlbums}{graphMostBand}</Container>
	}

	displayPager(){
		const debug=false
		const start = this.state.start 
		return (<div className="pager style4">
			<Button className="pagerButton MuiButton-iconSizeSmall MuiButton-outlinedSizeSmall" onClick={()=>{
				this.debug(debug, 'pageDecrement')
				if(start-200>0) this.setState({start:start-200})
				this.callLastOperation()
			}}>Previous</Button>
			<label className="pagerButton">{start}</label>
			<Button className="pagerButton MuiButton-iconSizeSmall MuiButton-outlinedSizeSmall" onClick={()=>{
				this.debug(debug, 'pageIncrement')
				this.setState({start:start+200})
				this.callLastOperation()
			}}>Next</Button>
		</div>)
	}
	displayArtists(){	
		const debug=false
		const artists = this.state.artists;
		let items = []
		if(!this.state.listIsLoaded) return <div>Loading...</div>
		
		else if(!artists || artists.length < 1 ) return <div className="noResultFound"> No result found ... </div>
		else {
			 items = artists.map(el => {
			 return <Artist name={el.name} genre={el.genres ?el.genres.join("/"): "pas de donnée"} jsonArtist={el}></Artist> })
			 this.debug(debug, "displayArtists : artists : ", artists)
			 this.debug(debug, "displayArtists : artists[0] : ", artists[0])
			 //this.(debug, "key : ",artists[0].index )
			 
			 return (
			<TableContainer className="resultsFound" style={{maxHeight: "25em", overflow: 'auto', display:"auto"}}> 
				<List>
					{items}
				</List>
			</TableContainer>
			)
		}	
	}
	
	/**
	* Affiche des statistiques en provenance de l'API 
	*/
	displayData(){
		const debug=false
		this.debug(debug, this.state.dataIsLoaded, this.state.memberWithTheMostBand)
		let card1 = ''
		let card2 = ''
		let card3 = ''
		
		if(!this.state.dataIsLoaded) {
			 card1 = (<label>Loading...</label>) ;
		}else if(this.state.memberWithTheMostBand && this.state.memberWithTheMostBand.length>0){
			const result = this.state.memberWithTheMostBand[0]
			const title = result.membername
			const message1 = result.sum
			const message2 = 'Participation au plus grand nombre de groupes'
			this.debug(debug, 'displayData', {title, message1,message2 })
			card1 = this.createCard(title, message1, message2)
		}

		if(!this.state.popularityIsLoaded) {
			card2 = (<label>Loading...</label>) ;
		}else if(this.state.popularities){
			const result = this.state.popularities[0]
			const genre = result._id
			const count = result.sum
			this.debug(debug, 'displayPopularities', {count, genre})
			card2 = this.createCard(genre, count, "Genre le plus populaire")
		}

		if(!this.state.mostAlbumsIsLoaded) {
			card3 = (<label>Loading...</label>) ;
	   	}else if(this.state.memberWithTheMostAlbums){
		   const result = this.state.memberWithTheMostAlbums[0]
		   const title = result.name
		   const message1 = result.sum
		   const message2 = 'Artiste ayant le plus d\'albums'
		   this.debug(debug, 'displayData', {title, message1,message2})
		   card3 = this.createCard(title, message1, message2)
	   }
			return (<Container className="MuiContainer-root MuiContainer-maxWidthLg style2">
				<div width="100%" className="style4">
					{card1} 
					</div>
				<div width="100%" className="style2">
					{card2} 
					</div>
				<div width="100%" className="style4">
					{card3}
					</div>
			</Container>)
		
	}
	createCard(title, message1, message2){
		return(
		<Card display='block'>
			<CardContent>
			<Typography color="textPrimary" gutterBottom>
				{title}
			</Typography>
			<Typography variant="h2" component="h2">
				{message1}
			</Typography>
			<Typography color="textSecondary">
				{message2}
			</Typography>
			</CardContent>
		</Card>)
	}

	displayHistory(){
		const debug=true
		this.debug(debug,'displayHistory : ', this.state.history)
	}

	debug(debug, label, message){
		if(debug){
			console.log('#DEBUG#', label)
			console.log(message)
		}
	}
	createGraphLine(dataArray, labelsArray, label){
		return <MyLineGraph labels={labelsArray} data={dataArray} label={label}></MyLineGraph>
	}
}

export default MainPage

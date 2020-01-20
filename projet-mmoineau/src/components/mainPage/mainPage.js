import React from 'react' ; 
import './mainPage.css';
import { List, ListItem, Button, TableContainer, Card, CardContent, Typography, Container } from '@material-ui/core';
import MyLineGraph from '../myLineGraph';

  

class MainPage extends React.Component {
	constructor() {
	  super()
	  this.state = { 
			start: 0 ,
			listIsLoaded : false,
			dataIsLoaded : false,
			popularityIsLoaded : false,
			search : 'An artist',
			artists: [],
			memberWithTheMostBand: [],
			popularities: [],
			mostAlbumsIsLoaded:false, 
			memberWithTheMostAlbums: [],
			lastOperation: ()=>{}
		}		
		
	}

	/**
	 * Lance une nouvelle requete
	 */
	getAll(){
		const debug = false
		this.debug(debug, 'getAll')
		this.setState({listIsLoaded:false, dataIsLoaded:false, fetchArtistWithTheMostAlbums:false})
		this.fetchArtists()
		this.fetchMemberWithTheMostBand()
		this.fetchPopularity()
		this.fetchArtistWithTheMostAlbums()
			
	}
	async fetchArtists(){
		const debug = false
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
		const debug = true
		this.debug(debug, 'getSearch : ', this.search.value)	
		this.setState({listIsLoaded:false, artists:[]})
		this.fetchArtistsByName()
	}
	//https://wasabi.i3s.unice.fr/search/member/name/:memberName
	async fetchArtistsByName(){
		const debug = true
		this.debug(debug, "fetchArtistsByName : " , this.search.value)
		const URL = "https://wasabi.i3s.unice.fr/api/v1/artist/name/"+this.search.value
		const headers = new Headers()
		const requestInfos = { method: 'GET',
					headers: headers,
					mode: 'cors',
					cache: 'default' }
			
		let response = await fetch(URL, requestInfos).then(res => {this.debug(debug, 'fetchArtistsByName', res) ; return res })
		let body = await response.json().then(res => {this.debug(debug, 'fetchArtistsByName', res) ; return res })
		if(body) this.setState({listIsLoaded: true, artists: Array(body)  })
		else this.setState({listIsLoaded: true})

	}
	
	async fetchPopularity(){
		const debug = false
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
		const debug = false
		const URL = "https://wasabi.i3s.unice.fr/api/v1/artist/member/count/band?limit=10"
		const headers = new Headers()
		const requestInfos = { method: 'GET',
					headers: headers,
					mode: 'cors',
					cache: 'default' }
		let response = await fetch(URL, requestInfos).then(res => {this.debug(debug, 'fetchMemberWithTheMostBand', res) ; return res })
		let body = await response.json().then(res => {this.debug(debug, 'fetchMemberWithTheMostBand', res) ; return res })
		
		this.setState({dataIsLoaded:true, memberWithTheMostBand:body[0]})
	}
	//https://wasabi.i3s.unice.fr/api/v1/artist/count/album
	async fetchArtistWithTheMostAlbums(){
		const debug = false
		const URL = "https://wasabi.i3s.unice.fr/api/v1/artist/count/album?limit=2"
		const headers = new Headers()
		const requestInfos = { method: 'GET',
					headers: headers,
					mode: 'cors',
					cache: 'default' }
		let response = await fetch(URL, requestInfos).then(res => {this.debug(debug, 'fetchArtistWithTheMostAlbums', res) ; return res })
		let body = await response.json().then(res => {this.debug(debug, 'fetchArtistWithTheMostAlbums', res) ; return res })
		
		this.setState({mostAlbumsIsLoaded:true, memberWithTheMostAlbums:body[0]})
	}
	/**
	 * Rappelle la derniere opération réalisée quand on change des parametres
	 */
	callLastOperation(){
		const debug = false
		this.setState({listIsLoaded:false})
		this.debug(debug, 'callLastOperation', this.state.lastOperation)
		if(this.state.lastOperation===this.fetchArtists) this.fetchArtists()
		else if(this.state.lastOperation===this.fetchArtistsByName) this.fetchArtistsByName()
		else this.debug(debug, 'no last operation')
	}
	/**
	 * Appelle le fetch par defaut 
	 */
	componentDidMount() {
		const debug=true
		this.getAll()
		this.debug(debug, "componentWillMount", this.state)
		
	}

	render() {
		const debug = false
		this.debug(debug, 'render :' , this.state)
		
		return (
	 	<div className="debug">
			<div maxheight="5em" className="App-header">FRONTEND WASABI</div>
			<div className="debug">
					 <input type="text" ref={(search) => this.search = search} />
					<Button id="searchButton" className="MuiButton-iconSizeSmall MuiButton-outlinedSizeSmall" onClick={() => this.getSearch() } > Search </Button>
					<Button id="getAllButton" className="MuiButton-iconSizeSmall MuiButton-outlinedSizeSmall" onClick={() => this.getAll()} > SEARCH ALL SONGS </Button>
					{this.displayArtists()}
					{this.displayPager()}
					{this.displayData()}
			</div>
			<div className="debug">

				{this.displayGraphs()}

			</div>
	  	</div>
	  )  
	}

	displayGraphs(){
		const debug = true
		
		const labels1 = this.state.popularities.map((genre) => genre._id)
		const values1 = this.state.popularities.map((genre) => genre.sum)
		const graph1 = this.createGraphLine(labels1, values1, 'genres populaires')

		this.debug(debug, 'displayGraphs :' , { labels1, values1, graph1})

	}

	displayPager(){
		const debug = false
		const start = this.state.start 
		return (<div className="pager">
			<Button className="pagerButton MuiButton-iconSizeSmall MuiButton-outlinedSizeSmall" onClick={()=>{
				this.debug(debug, 'pageDecrement')
				if(start>0) this.setState({start:start-200})
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
		const debug = false
		const artists = this.state.artists;
		if(!this.state.listIsLoaded) return <div className="debug">Loading...</div>
		else if(!artists || artists.length < 1 ) return <div className="noResultFound"> No result found ... </div>
		else return (
		<TableContainer className="resultsFound debug" style={{maxHeight: "25em", overflow: 'auto', display:"auto"}}> 
			<List>
				{ artists.map(el => <ListItem align-items="center" button="true" key={el._id}> {el.name} </ListItem>)}
			</List>
		</TableContainer>
		)
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
			const result = this.state.memberWithTheMostBand
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
		   const result = this.state.memberWithTheMostAlbums
		   const title = result.name
		   const message1 = result.sum
		   const message2 = 'Artiste ayant le plus d\'albums'
		   this.debug(debug, 'displayData', {title, message1,message2})
		   card3 = this.createCard(title, message1, message2)
	   }
			return (<Container className="MuiContainer-root MuiContainer-maxWidthXs">
				<div width="100%">
					{card1} 
					{card2} 
					{card3}
				</div>
			</Container>)
		
	}
	createCard(title, message1, message2){
		return(
		<Card className="debug" display='block'>
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

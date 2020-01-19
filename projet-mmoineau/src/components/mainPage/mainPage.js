import React from 'react' ; 
import './mainPage.css';
import { List, ListItem, Button, TableContainer, Card, CardContent, Typography, Container } from '@material-ui/core';
/**
 * wasabi.i3s.unice.fr/api/v1/artist/genres/popularity?limit=10
 */
var debug = true;
  

class MainPage extends React.Component {
	constructor() {
	  super()
	  this.state = { 
			start: 0 ,
			isLoaded : false,
			search : 'An artist',
			artists: [],
			lastOperation: ()=>{},
			memberWithTheMostBand: []
		}
		this.fetchArtists()
		

	}

	/**
	 * Lance une nouvelle requete
	 */
	getAll(){
		this.debug('getAll')
		this.setState({isLoaded:false})
		this.fetchArtists()
			
	}
	async fetchArtists(){
		this.debug("fetchArtists")
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
	/**
	 * Lance une nouvelle requete
	 */
	getSearch(){
		console.log('getSearch : ', this.search.value)	
		this.setState({isLoaded:false, artists:[]})
		this.fetchArtistsByName()
	}
	//https://wasabi.i3s.unice.fr/search/member/name/:memberName
	async fetchArtistsByName(){
		this.debug("fetchArtistsByName : " , this.search.value)
		const URL = "https://wasabi.i3s.unice.fr/search/member/name/"+this.search.value
		const headers = new Headers()
		const requestInfos = { method: 'GET',
					headers: headers,
					mode: 'cors',
					cache: 'default' }
		fetch(URL,requestInfos).then(res => res.json()).then(jsonRes => {
				this.setState({isLoaded:true,artists: jsonRes, lastOperation:this.fetchArtistsByName})
			}
		).then(this.debug('fetchArtistsByName','loaded'))
	}

	//wasabi.i3s.unice.fr/api/v1/artist/member/count/band
	async fetchMemberWithTheMostBand(){
		const URL = "wasabi.i3s.unice.fr/api/v1/artist/member/count/band?limit=2"
		const headers = new Headers()
		const requestInfos = { method: 'GET',
					headers: headers,
					mode: 'cors',
					cache: 'default' }
		fetch(URL,requestInfos).then(res => res.json()).then(jsonRes => {
				this.debug('fetchMemberWithTheMostBand', jsonRes)
				this.setState({memberWithTheMostBand: jsonRes})
			}
		).then(this.debug('fetchMemberWithTheMostBand loaded',this.state.memberWithTheMostBand))
	}

	/**
	 * Rappelle la derniere opération réalisée quand on change des parametres
	 */
	callLastOperation(){
		this.setState({isLoaded:false})
		this.debug('callLastOperation', this.state.lastOperation)
		if(this.state.lastOperation===this.fetchArtists) this.fetchArtists()
		else if(this.state.lastOperation===this.fetchArtistsByName) this.fetchArtistsByName()
		else this.debug('no last operation')
	}
	/**
	 * Appelle le fetch par defaut 
	 */
	componentDidMount() {
		this.debug("componentWillMount", this.state)
		//if(this.state.artists.length===0) this.fetchArtists()
		//if(this.state.memberWithTheMostBand.length===0) this.fetchMemberWithTheMostBand()
	}

	render() {
		this.debug('render :' , this.state)

		return (
	 	<div className="debug">
			<div className="debug">FRONTEND WASABI</div>
			<div className="debug">
					 <input type="text" ref={(search) => this.search = search} />
					<Button id="searchButton" className="MuiButton-iconSizeSmall MuiButton-outlinedSizeSmall" onClick={() => this.getSearch() } > Search </Button>
					<Button id="getAllButton" className="MuiButton-iconSizeSmall MuiButton-outlinedSizeSmall" onClick={() => this.getAll()} > ALL </Button>
					
					{this.displayArtists()}
					{this.displayPager()}
					{this.displayData()}
			</div>
	  	</div>
	  )  
	}
	displayPager(){
		const start = this.state.start 
		return (<div className="pager">
			<Button className="pagerButton MuiButton-iconSizeSmall MuiButton-outlinedSizeSmall" onClick={()=>{
				this.debug('pageDecrement')
				if(start>0) this.setState({start:start-200})
				this.callLastOperation()
			}}>Previous</Button>
			<label className="pagerButton">{start}</label>
			<Button className="pagerButton MuiButton-iconSizeSmall MuiButton-outlinedSizeSmall" onClick={()=>{
				this.debug('pageIncrement')
				this.setState({start:start+200})
				this.callLastOperation()
			}}>Next</Button>
		</div>)
	}
	displayArtists(){	
		const artists = this.state.artists;
		this.debug('displayArtists', artists.length)
		if(!this.state.isLoaded) return <div className="debug">Loading...</div>
		else if(artists.length === 0 ) return <div className="noResultFound"> No result found ... </div>
		else return (
		<TableContainer className="resultsFound debug" style={{maxHeight: "25em", overflow: 'auto', display:"auto"}}> 
			<ListItem>{ artists.length } result found</ListItem>
			<List>
				{ artists.map(el => <ListItem align-items="center" Button="true" key={el._id}> {el.name} </ListItem>)}
			</List>
		</TableContainer>
		)
	}
	/**
	* Affiche des statistiques en provenance de l'API 
	*/
	displayData(){
		this.debug('displayData')
		if(this.state.memberWithTheMostBand.length===0) {
			return (<label>Loading...</label>) ;
		}else if(this.state.memberWithTheMostBand.length>0){
			const result = this.state.memberWithTheMostBand[0]
			const title = result.membername
			const message1 = result.sum
			const message2 = 'Participation au plus grand nombre de groupes'
			this.debug('displayData', {title, message1,message2})
			return (<Container>{this.createCard(title, message1, message2)}</Container>)
		}
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
	debug(label, message){
		if(debug){
			console.log(`#############################################################`)
			console.log(label)
			console.log(message)
			console.log(`#############################################################`)
		}
	}
}

export default MainPage

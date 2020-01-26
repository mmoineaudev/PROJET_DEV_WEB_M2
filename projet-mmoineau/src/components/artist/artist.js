import React from 'react';
import {  ListItem } from '@material-ui/core';
const nodata ='Pas de données...'
class Artist extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name:'Jean',
        genre: '',
        jsonArtist: {},
        details: nodata
      }
    }

componentDidMount(){
    this.setState({
        name:this.props.name,
        genre: this.props.genre,
        jsonArtist: this.props.jsonArtist
    })
}

render(){
  const details = this.state.details
  const display = <div className="artist sublistitem style4" onClick={() => { this.fillDetails() }}><ListItem align-items="center" button="true" key={this.state.jsonArtist._id} id={this.state.jsonArtist._id} > {this.state.jsonArtist.name} 
  { (this.state.jsonArtist.genres && this.state.jsonArtist.genres.length>0) ? <div class="sublistitem style1"> {this.state.jsonArtist.genres.join(", " )}
  </div> :''} </ListItem> 
  {(details!==nodata)?details:null}
  </div>
    //console.log(display)
    return ( display )

  }
  /*
        {(this.state.jsonArtist.type) ? }
      {(this.state.jsonArtist.albums) ?  .title .genre .dateRelease : ''}
  */
  fillDetails(){
    let details = nodata;
    if(this.state.details===nodata){
      details = <div className="sublistitem"> 
      {this.getLocationInfos()}
      {this.getMembersInfo()}
      {this.getAlbums()}
    </div>
    }

    this.setState({details:details})
  }
  getLocationInfos() {
    return(this.state.jsonArtist.locationInfo && this.state.jsonArtist.locationInfo.length>0) ? <div className=""> Origine du groupe : {this.state.jsonArtist.locationInfo.join(', ')} </div>: ''
  }
  getMembersInfo(){
    return (this.state.jsonArtist.members && this.state.jsonArtist.members.length>0) ?  <div className=""> <label>Membres :</label>{ 
      this.state.jsonArtist.members.map(e => {
        return <div> {e.name}  {(e.instruments && e.instruments.length>0)? ' ('+ e.instruments.join(', ')+ ')': ''} </div>
      })  } </div> :''
  }
  getAlbums(){
    return ((this.state.jsonArtist.albums && this.state.jsonArtist.albums.length>0)? 
      <div className=""> Albums : {this.state.jsonArtist.albums.map(e => {
        return <div>{e.title}{(e.dateRelease)? ', date de sortie : '+e.dateRelease:''} </div> 
      })} </div> : ''
    )
  }
}
  export default Artist;
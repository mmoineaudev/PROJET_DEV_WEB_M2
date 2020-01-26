import React from 'react';
import {  ListItem } from '@material-ui/core';

class Artist extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name:'Jean',
        genre: '',
        jsonArtist: {},
        details: ''
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
  const display = <div onClick={() => { this.fillDetails() }}><ListItem align-items="center" button="true" key={this.state.jsonArtist._id} id={this.state.jsonArtist._id} > {this.state.jsonArtist.name} 
  { (this.state.jsonArtist.genres && this.state.jsonArtist.genres.length>0) ? <div className="sublistitem"> {this.state.jsonArtist.genres.join(", " )}
  </div> :''} </ListItem> 
  {(details) ? details : '' }
  </div>
    //console.log(display)
    return ( display )

  }
  /*
        {(this.state.jsonArtist.type) ? }
      {(this.state.jsonArtist.albums) ?  .title .genre .dateRelease : ''}
  */
  fillDetails(){
    let details = '';
    if(this.state.details===''){
      details = <div class="details"> 
      {(this.state.jsonArtist.locationInfo) ? this.state.jsonArtist.locationInfo : ''}
      {(this.state.jsonArtist.members && this.state.jsonArtist.members.length>0) ? 
        this.state.jsonArtist.members.map(e => {
          return e.name + (e.instruments && e.instruments.length>0)? ' '+ e.instruments.join(', ') : ''
        }) : ''}
    </div>
    }
    this.setState({details:details})
  }
  }
  export default Artist;
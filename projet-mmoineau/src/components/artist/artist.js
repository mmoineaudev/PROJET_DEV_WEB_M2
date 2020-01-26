import React from 'react';
import {  ListItem } from '@material-ui/core';

class Artist extends React.Component {
    constructor(props) {
      super(props);
      console.log('Artist :' , props)
      this.state = {
        name:'Jean',
        genre: '',
        jsonArtist: {}
      }
    }

componentDidMount(){
    console.log('hello, I am an artist')
    this.setState({
        name:this.props.name,
        genre: this.props.genre,
        jsonArtist: this.props.jsonArtist
    })
    console.log('I am an artist : ', this.props, this.state)
}

render(){
  const display = <ListItem align-items="center" button="true" key={this.state.jsonArtist._id} id={this.state.jsonArtist._id} onClick={console.log('clic')}> {this.state.jsonArtist.name} 
  { (this.state.jsonArtist.genres && this.state.jsonArtist.genres.length>0) ? <div className="sublistitem"> {this.state.jsonArtist.genres.join(", " )}
</div> :''} </ListItem>
    //console.log(display)
    return ( display )

}

  }
  export default Artist;
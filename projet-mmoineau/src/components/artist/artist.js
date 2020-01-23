import React from 'react';
import { List, ListItem, Button, TableContainer, Card, CardContent, Typography, Container } from '@material-ui/core';

class Artist extends React.Component {
    constructor(props) {
      super(props);
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
    return 
    <ListItem align-items="center" button="true" key={el._id} id={el._id} onClick={this.toggleClass.bind(this)}> {el.name} 
        { (el.genres && el.genres.length>0) ? <div className="sublistitem"> {el.genres.join(", " )}
    </div> :''} </ListItem>
}

  }
  export default Artist;
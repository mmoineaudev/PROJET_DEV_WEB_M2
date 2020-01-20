import React, { Component } from 'react'
import Chart from "chart.js";

export default class MyLineGraph extends Component {
    chartRef = React.createRef();
    constructor(props){
        super(props)
        this.state={
            mostAlbumsIsLoaded:false, 
            memberWithTheMostAlbums:[],
            popularityIsLoaded: false,
            popularities:[],
            dataIsLoaded:false, 
            memberWithTheMostBand:[]
        }
    }
    async fetchPopularity(){
		const debug = false
		const URL = "https://wasabi.i3s.unice.fr/api/v1/artist/genres/popularity?limit=10"
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
		const URL = "https://wasabi.i3s.unice.fr/api/v1/artist/count/album?limit=10"
		const headers = new Headers()
		const requestInfos = { method: 'GET',
					headers: headers,
					mode: 'cors',
					cache: 'default' }
		let response = await fetch(URL, requestInfos).then(res => {this.debug(debug, 'fetchArtistWithTheMostAlbums', res) ; return res })
		let body = await response.json().then(res => {this.debug(debug, 'fetchArtistWithTheMostAlbums', res) ; return res })
		
		this.setState({mostAlbumsIsLoaded:true, memberWithTheMostAlbums:body[0]})
	}
    componentDidMount() {
        console.log("MyLineGraph", this.props)
        const myChartRef = this.chartRef.current.getContext("2d");

        new Chart(myChartRef, {
            type: "line",
            data: {
                //Bring in data
                labels: this.props.labels,
                datasets: [
                    {
                        label: this.props.label,
                        data: this.props.data,
                    }
                ]
            }
        });
    }
    render() {
        return (
            <div >
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}
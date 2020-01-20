import React, { Component } from 'react'
import Chart from "chart.js";

export default class MyLineGraph extends Component {
    chartRef = React.createRef();
    constructor(props){
        super(props)
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
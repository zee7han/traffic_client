import React from 'react';
import './App.css';
import api_service from './service';


var trafficStyle = {
  red: {
    backgroundColor: "red"
  },
  yellow: {
    backgroundColor: "yellow"
  },
  green: {
    backgroundColor: "green"
  },
  black: {
    backgroundColor: "black"
  }
};

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
          red_signal: trafficStyle.red, 
          yellow_signal: trafficStyle.black, 
          green_signal: trafficStyle.black,
          next: "yellow_signal",
          red: null,
          green: null,
          yellow: null
    }
  }
  setInterval =  () =>  {
      this._timeout = setTimeout( () => {
        this.changeHandle();
    }, 500); 
  }

  componentDidMount() {
    api_service.get('/timer').then((response)=>{
      response.data.result.map((item)=>{
        this.setState({
          [item.traffic_signal_name] : item.duration
        });
      })
      this.setInterval(this.tick, 500);
    }).catch((error)=>{
      console.log("Error.....",error);
    })
  }
  componentWillUnmount()  {
      clearInterval(this._timeout);
  }

  changeHandle = () => {    
      switch (this.state.next) {
        case "red_signal":
            this.setState({
            red_signal:trafficStyle.red, 
            yellow_signal: trafficStyle.black, 
            green_signal: trafficStyle.black,
            next: "green_signal"
          });
          this._timeout = setTimeout(() => {
                  this.changeHandle();
              }, this.state.red);
          break;
        case "yellow_signal":
          this.setState({
            red_signal:trafficStyle.black, 
            yellow_signal: trafficStyle.yellow, 
            green_signal: trafficStyle.black,
            next: "red_signal"
          });
          this._timeout = setTimeout(() => {
                  this.changeHandle();
              }, this.state.yellow);
          break;
        case "green_signal":
          this.setState({
            red_signal:trafficStyle.black, 
            yellow_signal: trafficStyle.black, 
            green_signal: trafficStyle.green,
            next: "yellow_signal"
          });
          this._timeout = setTimeout(() => {
                  this.changeHandle();
              }, this.state.green);
          break;
      }

}

  render() {
    return (
        <div className="box">
        <div className="circle" style={this.state.green_signal}></div>
        <div className="circle" style={this.state.yellow_signal}></div>
        <div className="circle" style={this.state.red_signal}></div>
        </div> 
    )
  }

}

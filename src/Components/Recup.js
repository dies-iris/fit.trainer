import React, {Component} from 'react';
import {LinearProgress} from '@material-ui/core';

import '../css/Countdown.css';
import Session from './Session';


export default class Chrono extends Component {
    constructor(props){
        super(props);
        this.state = {
            timerOn: false,
            timerStart: 0,
            timerTime: this.props.time,
            sessionOn: false
        }
    }

    componentDidMount(){
      this.setState({
        timerOn: true,
        timerTime: this.state.timerTime,
        timerStart: this.state.timerTime
      });
      this.timer = setInterval(() => {
        const newTime = this.state.timerTime-1;
        if (newTime > 0) {
          this.setState({
            timerTime: newTime
          });
        } else if (newTime === 0) {
          this.setState({timerTime: 'GO'})
        } else {
          clearInterval(this.timer);
          this.setState({ timerOn: false, sessionOn: true });
        }
      }, 1000); 
    }

    render(){
      if(this.state.timerTime === 'GO'){
        this.props.recupOff();
      }
        return(
            <div className="popup-page recup">
              <h1>Pause</h1>
              <h1 className="countdown-number">{this.state.timerTime}</h1>
              <a onClick={this.props.recupOff}>Sauter la pause</a>
              <LinearProgress variant="static" value={100-(this.state.timerTime/this.props.time *100)} />
            </div>
        )
    }
}
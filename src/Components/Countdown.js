import React, {Component} from 'react';
import '../css/Countdown.css';

export default class Countdown extends Component {
    constructor(props){
        super(props);
        this.state = {
            timerOn: false,
            timerStart: 0,
            timerTime: 5,
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
          this.setState({timerTime: 'GO'});
          setTimeout(this.props.endCountdown(), 1000);
        } else {
          clearInterval(this.timer);
          this.setState({ timerOn: false, sessionOn: true });
        }
      }, 1000);  
    }

    render(){
        return(
            <h1 className="countdown-number">{this.state.timerTime}</h1>
        )
    }
}
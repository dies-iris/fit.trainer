import React, {Component} from 'react';

export default class Stopwatch extends Component {
    constructor(props){
        super(props);
        this.state = {
                timerOn: false,
                timerStart: 0,
                timerTime: 0
            }
    }
    
        componentDidMount(){
          this.setState({
            timerOn: true,
            timerTime: this.state.timerTime,
            timerStart: Date.now() - this.state.timerTime
          });
          this.timer = setInterval(() => {
            this.setState({
              timerTime: Date.now() - this.state.timerStart
            });
          }, 10);  
        }

        componentDidUpdate(prevProps) {
          if (this.props.stop !== prevProps.stop) {
            this.stopTimer();
          }
        }

        stopTimer = () => {
          
          console.log(this.state.timerTime);
          this.setState({ timerOn: false });
          this.props.endSession(this.state.timerTime);
          clearInterval(this.timer);
          
        };
    
        render(){
            const { timerTime } = this.state;
            // let centiseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
            let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
            let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
            let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2);
            return(
                <div className="Stopwatch-display">
                    {hours} : {minutes} : {seconds} 
                    {/* : {centiseconds} */}
                </div>
            )
        }
    }
import React, { Component } from 'react';
import Stopwatch from './Stopwatch';
import Recup from './Recup';
import Query from "../tools/Query";
import { Button, Step, StepLabel, Stepper, MobileStepper } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import Countdown from '../Components/Countdown';

import "../css/Session.css";


export default class Session extends Component {
    constructor(props){
        super(props);
        this.state = {
            recupOn: false,
            currentEx: 0,
            currentSerie: 1,
            continuer: false,
            sessionTime: 0,
            finSession : false,
            areYouSure : false,
            countdown : true, 
            showStopwatch: false
        }
        this.recupOn = this.recupOn.bind(this);
        this.recupOff = this.recupOff.bind(this);
        this.nextEx = this.nextEx.bind(this);
        this.endSession = this.endSession.bind(this);
    }

    recupOn(){
        this.setState({
            recupOn: true
        });  
    }

    recupOff(){
        console.log('recupOff')
       this.setState({
                    recupOn: false,
                    currentSerie: this.state.currentSerie+1
                }) 
    }

    nextEx(){
        if(this.state.currentEx === this.props.exs.length-1){
            this.setState({
                finSession : true
            })
        } else {
            this.setState({
                currentSerie: 1,
                currentEx: this.state.currentEx+1
            })
        }
    }

    areYouSure(){
        this.setState(prevState => ({
            areYouSure: !prevState.areYouSure,
         }));    
        }

    endCountdown(){
        this.setState({
            countdown : false,
            showStopwatch: true
        })
    }

    endSession(time){
        this.setState({
            sessionTime : time,
            showStopwatch : false
        })
        let upd = this.props.user;
        console.log(typeof upd.entr);
        upd.entr = +upd.entr,10+1;
        console.log(upd);
        new Query('user', this.props.id).post({
            acf: upd
          }).then(data => {
            return data.json();
          }).then(json => {
            console.log(json);
          }).catch(function(error) {
            console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
          });
    }

    closeSession(){
          this.props.closeSession(); 
    }

    render(){
        console.log("Current exercice : "+ this.state.currentEx + "; Serie : " + this.state.currentSerie);
        console.log(this.props.exs);
        let exercice = this.props.exs[this.state.currentEx];
        const timerTime = this.state.sessionTime;
            // let centiseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
            let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
            let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
            let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2);
        return (
            <div className="popup-page">
                <span className="text-fit">FIT.</span>               
                <span className="text-trainer">TRAINER</span>
            {
                (this.state.countdown)?
                <Countdown endCountdown={this.endCountdown.bind(this)}/>
                :
                <div>
                    {(!this.state.finSession) ?
                    <div className="exercices"> 
                        <a className="close-popup" onClick={this.areYouSure.bind(this)}><ClearIcon/></a> 
                        {
                        (this.state.areYouSure) &&
                        <div className="popup-page noir">
                            <div className="popup-message">
                                <p>Ça serait dommage d'abandonner maintenant ! Tu veux continuer ton entrainement ?</p>
                                <Button variant="contained" color="primary" onClick={this.areYouSure.bind(this)} className="button-primary">Oui</Button>
                                <Button onClick={this.closeSession.bind(this)} className="button-secondary">Non</Button>
                            </div>
                        </div>
                        }
                        
                        <Stepper activeStep={this.state.currentEx} alternativeLabel>
                            {
                                this.props.exs.map((ex, i) =>
                                    <Step key={i}>
                                        <StepLabel>{ex.titre}</StepLabel>
                                    </Step>
                                    )
                            }
                        </Stepper>
                        <div className="header-close-exercice">    
                            <h2>{ exercice.titre } :</h2>
                            {exercice.repititions !="" ?
                            <h2>{exercice.series} x {exercice.repititions} répétitions</h2>
                            :
                            <p>{exercice.description}</p>
                            }
                        </div>
                        <div className="two-images-container">     
                        <img src={exercice.image1 && exercice.image1.sizes.medium_large } className="exercice-image"/>
                        <img src={exercice.image2 && exercice.image2.sizes.medium_large } className="exercice-image animate"/>
                        </div>
                        <Button variant="outlined" color="secondary" onClick={this.state.currentSerie < exercice.series ? this.recupOn : this.nextEx}>J'ai fini la série {this.state.currentSerie} sur { exercice.series}</Button>
                        
                        {
                            (this.state.recupOn) &&
                            <Recup time={exercice.recup} recupOff={this.recupOff}/>
                        } 
                        
                    </div>
                :
                <div className="bravo-fin-entrainement">
                    <h1>Bravo!</h1>
                    <h2>Temps de session : {hours} : {minutes} : {seconds}</h2>
                    <Button variant="outlined" color="secondary" onClick={this.closeSession.bind(this)}>Fermer</Button>
                </div>
                }
                <Stopwatch 
                stop={this.state.finSession ? true : false} 
                endSession={this.endSession}/> 
            </div>
        }
        </div>                    
        )
    }
}
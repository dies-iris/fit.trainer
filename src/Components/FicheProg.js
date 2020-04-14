import React, { Component } from 'react';
import Exercices from './Exercices';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import {Button} from '@material-ui/core';

import '../css/Programme.css';
import Session from './Session';

export default class FicheProg extends Component {
    constructor(props){
        super(props);
        this.state={
            progActif: false,
            areYouSure: false
        }
        this.handleClick = this.handleClick.bind(this);
    }

    

    handleClick(){
        // e.target.removeEventListener('click', this.handleClick, false);
        this.setState(prevState => ({
            progActif: !prevState.progActif,
         })); 
      }

    
    render(){
        return(
            <div >
                {
                    (this.props.exs.length > 0) &&
                    <div>
                        {this.props.exs.map(exercice =>{ 
                        return <Exercices  setEx={this.props.setEx} exs={exercice}/>}
                        )}
                    </div>
                }
                {/* //TODO: mettre image de categorie */}
                <div className="img-prog-commencer">
                    {/* <img src={this.props.exs[0].image1} />  */}
                    <Button variant="contained" color="primary" onClick={this.handleClick}><PlayCircleOutlineIcon/>Commencer</Button>
                </div>
                
                {
                    (this.state.progActif)&&
                        <Session exs={this.props.exs.map(ex => ex.acf)} closeSession={this.handleClick} id={this.props.id} user={this.props.user} />
                }
            </div> 
        )
    }
    
}
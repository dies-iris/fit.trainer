import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';

import '../css/Silhouette.css';

import Query from '../tools/Query';
import { TextField, Button } from '@material-ui/core';



//TODO: version femme

export default class Silhouette extends Component {

   constructor(props){

    super(props);



    this.handleOnFocus = this.handleOnFocus.bind(this);

    this.handleOnBlur = this.handleOnBlur.bind(this);

    this.handleMouseLeave = this.handleMouseLeave.bind(this);

    this.handleMouseEnter = this.handleMouseEnter.bind(this);

    this.handleChange = this.handleChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);

    const gender=this.props.sex === "Femme" ? this.props.sex : this.props.sex.toLowerCase();
    const bodyparts= ["Silhouette.png","SilhouetteEpaule.png","SilhouettePoitrine.png","SilhouetteBras.png","SilhouetteTaille.png","SilhouetteFesses.png","SilhouetteHanche.png","SilhouetteCuisses.png","SilhouetteMollets.png"]
    const imgSilhouette = bodyparts.map(part => gender+part);

    this.state = {

        userID: props.id,

        index: 0,

        imgList : imgSilhouette,

        active: false,
        success: false,

        acf: {

            poids: 0,

            tour_de_bras: 0,

            tour_de_cuisse: 0,

            tour_de_fessiers: 0,

            tour_de_hanche: 0,

            tour_de_mollet: 0,

            tour_de_poitrine: 0,

            tour_de_taille: 0,

            tour_depaule: 0

        }

    }

    

   }

   

   handleOnFocus(id) {

        this.setState ({ 

            active: true,

            index : id

        })

    }



    handleMouseEnter(id){

        if(this.state.active === false){

            this.setState ({ 

                index : id

            }) 

        }

    }



    handleOnBlur() {

        this.setState ({

            index: 0,

            active: false  

        })

    }



    handleMouseLeave(){

        if(this.state.active === false){

            this.setState ({ 

            index: 0

            }) 

        }

    }



    handleChange(e) {

        let target = e.target;

        let value = target.value;

        let name = target.name;



        this.setState({

          acf: {

            ...this.state.acf,

              [name]: value

            }

        });
    }



    handleSubmit(e){

        e.preventDefault();
        let t=this;
        new Query('mesures').post({

            title: 'whatever',
            status: 'publish',
            author: this.props.id,
            fields: this.state.acf

          }).then(data => {

            return data.json();

          }).then(json => {
              console.log(json);
              t.setState({
                success: true,
                acf: {

                    poids: 0,
        
                    tour_de_bras: 0,
        
                    tour_de_cuisse: 0,
        
                    tour_de_fessiers: 0,
        
                    tour_de_hanche: 0,
        
                    tour_de_mollet: 0,
        
                    tour_de_poitrine: 0,
        
                    tour_de_taille: 0,
        
                    tour_depaule: 0
        
                }})
          });    
    }

    handleClose(event, reason){
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({success:false});
      };

    render(){
        return(
            <div className="silhouette-et-form">
                <img src={"/wp-content/uploads/2019/07/"+this.state.imgList[this.state.index]} alt="hommeSilhouette" id="hommeSilhouette" />
                <form onSubmit={this.handleSubmit} className="mesures">
                <TextField id="0" type="number" name="poids" label="votre poids" className="case-formulaire" onChange={this.handleChange}></TextField>
                    <TextField id="1" type="number" name="tour_depaule" label="votre tour d'épaule" className="case-formulaire" 
                    onMouseEnter={this.handleMouseEnter.bind(null,1)} onFocus={this.handleOnFocus.bind(null,1)} onMouseLeave={this.handleMouseLeave} onBlur={this.handleOnBlur} onChange={this.handleChange}></TextField>
                    <TextField id="2" type="number" name="tour_de_torse" label="votre tour de torse" className="case-formulaire" 
                    onMouseEnter={this.handleMouseEnter.bind(null,2)} onFocus={this.handleOnFocus.bind(null,2)} onMouseLeave={this.handleMouseLeave} onBlur={this.handleOnBlur} onChange={this.handleChange}></TextField>
                    <TextField id="3" type="number" name="tour_de_bras" label="votre tour de bras" className="case-formulaire" 
                    onMouseEnter={this.handleMouseEnter.bind(null,3)} onFocus={this.handleOnFocus.bind(null,3)} onMouseLeave={this.handleMouseLeave} onBlur={this.handleOnBlur} onChange={this.handleChange}></TextField>
                    <TextField id="4" type="number" name="tour_de_taille" label="votre tour de taille" className="case-formulaire" 
                    onMouseEnter={this.handleMouseEnter.bind(null,4)} onFocus={this.handleOnFocus.bind(null,4)} onMouseLeave={this.handleMouseLeave} onBlur={this.handleOnBlur} onChange={this.handleChange}></TextField>
                    <TextField id="5" type="number" name="tour_de_hanche" label="votre tour de hanche" className="case-formulaire" 
                    onMouseEnter={this.handleMouseEnter.bind(null,5)} onFocus={this.handleOnFocus.bind(null,5)} onMouseLeave={this.handleMouseLeave} onBlur={this.handleOnBlur} onChange={this.handleChange}></TextField>
                    <TextField id="6" type="number" name="tour_de_fesses" label="votre tour de fesses" className="case-formulaire" 
                    onMouseEnter={this.handleMouseEnter.bind(null,6)} onFocus={this.handleOnFocus.bind(null,6)} onMouseLeave={this.handleMouseLeave} onBlur={this.handleOnBlur} onChange={this.handleChange}></TextField>
                    <TextField id="7" type="number" name="tour_de_cuisse" label="votre tour de cuisse" className="case-formulaire" 
                    onMouseEnter={this.handleMouseEnter.bind(null,7)} onFocus={this.handleOnFocus.bind(null,7)} onMouseLeave={this.handleMouseLeave} onBlur={this.handleOnBlur} onChange={this.handleChange}></TextField>
                    <TextField id="8" type="number" name="tour_de_mollet" label="votre tour de mollet" className="case-formulaire" 
                    onMouseEnter={this.handleMouseEnter.bind(null,8)} onFocus={this.handleOnFocus.bind(null,8)} onMouseLeave={this.handleMouseLeave} onBlur={this.handleOnBlur} onChange={this.handleChange}></TextField>
                <Button variant="contained" color="primary" type="submit" className="button-primary submit">Mettre à jour</Button>
                </form>
                <Snackbar open={this.state.success} autoHideDuration={2000} onClose={this.handleClose.bind(this)}
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    }}
                    message="Tes mesures sont maintenant à jour !" />
            </div>
        )
    }
}
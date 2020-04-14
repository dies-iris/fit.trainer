import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button, Slider, TextField, Radio, RadioGroup, FormControl, FormLabel, FormControlLabel, FormHelperText, Input, InputLabel} from '@material-ui/core';
import Query from "../tools/Query";


export default function Profil(props){

    const [nom, setNom] = useState(props.data.last_name);
    const [prenom, setPrenom] = useState(props.data.first_name);
    const [tel, setTel] = useState(props.data.acf.telephone);
    const [email, setEmail] = useState(props.data.email);
    const [age, setAge] = useState(props.data.acf.age);
    const [sex, setSex] = useState(props.data.acf.genre);

    const [taille, setTaille] = useState(props.data.acf.taille);
    const [blessures, setBlessures] = useState(props.data.acf.blessures);
    const [niveau, setNiveau] = useState(props.data.acf.niveau);
    const [nbentr, setNbentr] = useState(props.data.acf.nb_entrainements);
    const [objPoids, setObjPoids] = useState(props.data.acf.objectif_poids);
    const marks = [
      {
        value: 0,
        label: 'Débutant',
      },
      {
        value: 50,
        label: 'Intermédiaire',
      },
      {
        value: 100,
        label: 'Confirmé',
      }
    ];

    const handleSubmit = (e) => {
      e.preventDefault();
      new Query('user', props.data.id).post({
            last_name: nom,
            first_name: prenom,
            acf:{  
              age: age,
              telephone: tel,
              taille: taille,
              blessures: blessures,
              niveau: niveau/50,
              nb_entrainements: nbentr,
              objectif_poids: objPoids
            }
        }).then(data => {
          return data.json();
        }).then(json => {
          console.log(json);
        }).catch(function(error) {
          console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
        });    
    }

console.log(nom);
    return(
      <div className="container-coach-appli profil" >
        <form onSubmit={handleSubmit} className="donnees-profil" noValidate autoComplete="off">
          <TextField id="standard-basic" 
          defaultValue={props.data.last_name}
          value={nom} 
          label="Nom" 
          onChange={(e) => setNom(e.target.value)} 
          InputLabelProps={{
              shrink: true,
            }}/>
          <TextField id="standard-basic" 
          defaultValue={props.data.first_name}
          value={prenom} label="Prénom" 
          onChange={(e) => setPrenom(e.target.value)} 
          InputLabelProps={{
              shrink: true,
            }}/>
          <FormControl component="fieldset">
            <FormLabel component="legend">Genre</FormLabel>
            <RadioGroup aria-label="gender" name="gender" value={sex} onChange={(e) => setSex(e.target.value)}>
              <FormControlLabel value="Femme" control={<Radio />} label="Femme" />
              <FormControlLabel value="Homme" control={<Radio />} label="Homme" />
            </RadioGroup>
          </FormControl>
          <TextField id="standard-basic" defaultValue={props.data.acf.telephone} value={tel} label="Téléphone"
          onChange={(e) => setTel(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}/>
          <TextField id="standard-basic" value={age} label="Age" 
          onChange={(e) => setAge(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}/>
          <TextField id="standard-basic" value={taille} label="Taille" 
          onChange={(e) => setTaille(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}/>
          <Slider
          defaultValue={50}
          aria-labelledby="discrete-slider-restrict"
          step={50}
          marks={marks}
          onChange={(e) => setAge(e.target.value)}
        />

          <Button variant="contained" color="primary" type="submit" className="button-primary submit">Enregistrer</Button>
        
        </form>
      </div>
    )
}
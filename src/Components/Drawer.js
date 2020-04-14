import React from 'react';
import {makeStyles, IconButton, Button, LinearProgress} from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

import '../css/Drawer.css';

const useStyles = makeStyles((theme) => ({
    input: {
      display: 'none',
    },
  }));

export default function Drawer(props) {
    const classes = useStyles();

    return (
        <div className={props.open ? "drawer open" : "drawer"}>

            <h1>Bonjour, {props.name}</h1>
            <input accept="image/*" className={classes.input} 
            onChange={(e) => props.submit(e.target.files)}
            id="icon-button-file" type="file" />
            <label htmlFor="icon-button-file">
                <IconButton color="primary" aria-label="upload picture" component="span">
                <PhotoCamera />
                </IconButton>
            </label>
            <LinearProgress variant="determinate" value={props.profile} />
            <p>Ton profil est rempli à {props.profile}%</p>
            
            {/* <h3>Ton IMC : {props.bmi}</h3> */}
            {props.user.entr>1 &&
                <h3>Tu as terminé {props.user.entr} entrainements. Bravo !</h3>
            }
            <Button onClick={() => props.action("modifier")}>Modifier le profil</Button>
        </div>
    )
}
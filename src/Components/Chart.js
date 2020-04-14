import React, {useState} from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
import {Button, FormControl, Select, MenuItem, InputLabel, makeStyles} from '@material-ui/core';

import '../css/Chart.css';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Chart(props) {
  const classes = useStyles();
      const [state, setState] = useState({
        mesure: 'poids',
      });
      
      const handleChange = name => event => {
        setState({
          ...state,
          [name]: event.target.value,
        });
      };

console.log(props.mesures.map(el => el[state.mesure] > 0 ? el : null));
        return (
          <div className="chart-global">
            <h2 className="souligne_jaune">Mon évolution</h2>
            {(props.mesures.length > 0) ?
              <div className="chart-container">
                  <FormControl className={classes.formControl}>
                  <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                    value={state.mesure}
                    onChange={handleChange('mesure')}>
                    <MenuItem value="poids">Poids</MenuItem>
                    <MenuItem value="tour_de_poitrine">Tour de poitrine</MenuItem>
                    <MenuItem value="tour_de_taille">Tour de taille</MenuItem>
                    <MenuItem value="tour_de_fessiers">Tour de fesses</MenuItem>
                    <MenuItem value="tour_de_bras">Tour de bras</MenuItem>
                    <MenuItem value="tour_de_cuisse">Tour de cuisse</MenuItem>
                    <MenuItem value="tour_de_hanche">Tour de hanche</MenuItem>
                    <MenuItem value="tour_de_mollet">Tour de mollet</MenuItem>
                    <MenuItem value="tour_depaule">Tour d'épaule</MenuItem>
                  </Select>
                  </FormControl>
          <ResponsiveContainer 
          width="100%" 
          height={300}
          maxWidth={700}>
          <AreaChart
          data={props.mesures.filter(el => el[state.mesure] > 0)}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor='rgb(252, 74, 26)' stopOpacity={0.8}/>
              <stop offset="95%" stopColor='rgb(247, 183, 51)' stopOpacity={0.8}/>
            </linearGradient>
            </defs>  
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" hide={true} />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey={state.mesure} stroke='rgba(248,95,43,255)' fillOpacity={1} fill="url(#colorUv)" />
          </AreaChart>
          </ResponsiveContainer>
          </div>
        :
        <p>Il n'y a pas encore de données...Mets à jour tes mésures !</p>  
        }
        <Button onClick={props.action} className="button-secondary">Mettre à jour</Button>
    </div>  
    );
}

      

 
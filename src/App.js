import React, { Component, useState, useEffect } from 'react';
import Query from './tools/Query';
import Tabdebord from './pages/Tabdebord';
import CircularProgress from '@material-ui/core/CircularProgress';

import './css/App.css';

export default function App () {
  const [loaded, setLoaded] = useState(false);
  const [cat,setCat] = useState([]);
  const [mesures,setMesures] = useState([]);
  const [exs,setExs] = useState([]);
  const [conseils,setConseils] = useState([]);
  const [data, setData] = useState(false);

  useEffect(() => {
    new Query('profile').get()
        .then(data => {
          return data.json()
        })
        .then(json => {
          console.log(json);
          setData(json); 
          setCat(json.acf.prog); 
        });
    new Query('conseils').get()
      .then(data => {
        return data.json()
      })
      .then(response => {
        setConseils(response);
      })
    if(cat.length > 0){
      new Query('exByProg', cat).get()
        .then(data => {
          return data.json()
        })
      .then(response => {
          setExs(response);
      })
      getMesures(data.id);     
    } 
  }, [])
    
  const getMesures = (id) => {
    new Query('mesuresByAuthor', id).get()
      .then(data => {
        return data.json()
      })
      .then(mesures => {
        let mes = mesures.map(mapmesure).reverse();
        setLoaded(true);
        setMesures(mes);
      });
  }

  const mapmesure = (mesure) => {
    const acf = mesure.acf;
    const date = {date : mesure.date.substring(8,10)+ "/" + mesure.date.substring(5,7) + "/" + mesure.date.substring(0,4)};
    const mesureDate = Object.assign(acf, date);
    return mesureDate;
  } 

return (
  loaded ?
    <Tabdebord  
    data={data}
    prog={cat} 
    mesures={mesures}
    exs={exs}
    conseils={conseils}
    />
    :
    <div className="tableau-de-bord"> 
      <CircularProgress />
    </div>
  );
}


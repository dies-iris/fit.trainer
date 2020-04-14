import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Drawer from '../Components/Drawer';
import Chart from '../Components/Chart';
import Nutrition from './Nutrition';
import Profil from "../Components/Profil";
import Silhouette from '../Components/Silhouette';
import ClearIcon from '@material-ui/icons/Clear';
import Menu from '../Components/Menu';
import Query from '../tools/Query';

import '../css/Tabdebord.css'
import Programme from './Programme';
import DrawerContent from '../Components/DrawerContent';

export default function Tabdebord(props) {
    const [popup, openPopup] = useState(false);
    const [popupContent, changePopup] = useState();
    const [ex, setEx] = useState();
    const [bmi, setBMI] = useState();

    const togglePopup = () => openPopup(!popup);
    
    const [profile, setProfile] = useState(0);
    
    useEffect(() => {
        let length = 0;
        let rempli = 0;
        for (let [key, value] of Object.entries(props.data.acf)) {
            length ++;
            if (value) {
                rempli ++;
            }
          }
        let result = Math.floor(rempli/length*100);
        if(result > 0){
            setProfile(result);
        }
    },[]);

    const handleSubmit = (file) => {
        console.log(file);
        new Query('media').postMedia(file)
        .then(data => {
            return data.json();
          }).then(json => {
            console.log(json);
          }).catch(function(error) {
            console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
          });
    }

    const changePopupContent = (content) => {
        console.log(content);
        openPopup(true);
        changePopup(content);
    }

    const calculerBMI = () => {
        let i = props.mesures.length-1;
        let poids = 0;
        while(i >= 0){
           if(props.mesures[i]["poids"]){
               poids=props.mesures[i]["poids"];
               break;
           } 
           i--;
        } 
        let imc = poids/((props.data.acf.taille/100)^2);
        setBMI(imc);
    } 

    useEffect(() => calculerBMI());

    const renderSwitch = (content) => { 
        switch(content){
            case 'silhouette':
                console.log('afficher les mesures');
              return <Silhouette sex={props.data.acf.genre} id={props.data.id}/>; 
            break;
            case 'modifier':
                console.log('modifier');
                return <Profil data={props.data}/>;
                break;
            case 'supprimer':
                console.log('supprimer');
                return <h1>Supprimer</h1>;
                break;
            case 'exercice':
            return(
                <div className='container-coach-appli'>
                    <h2>{ ex.titre }</h2>
                    {ex.repititions &&
                    <h2>{ ex.series} x {ex.repititions} répétitions</h2>
                    }
                    <div className="two-images-container full">
                      <img src={ ex.image1 && ex.image1.sizes.medium_large } className="exercice-image"/>
                      <img src={ ex.image2 && ex.image2.sizes.medium_large } className="exercice-image animate"/>
                    </div>
                    {ex.description.split("<br />").map(par =>
                        <p className="list_item">{par}</p>
                    )} 
                </div> 
            );
            break;
        }
    }

    const afficherEx = (ex) => {
        console.log(ex);
        changePopupContent("exercice");
        setEx(ex);
    }

    const handleAction = (content) => {changePopupContent(content)};
    
    const random = (arr) => {
        let index = Math.floor(Math.random() * (arr.length-1));
        return {titre: arr[index].acf.titre, conseil:arr[index].acf.conseil};
    }

    return(
        <div className="tableau-de-bord"> 
            <Menu />
            <div className="body-trois-quarts" >
                <div className="element">
                    <div>
                        <Chart action={() => changePopupContent("silhouette")} mesures={props.mesures} />
                    </div>
                    <Nutrition data={random(props.conseils)} />
                </div>
                <div className='element chart'>
                    <DrawerContent profile={profile} submit={handleSubmit} action={handleAction} user={props.data.acf} name={props.data.first_name} />
                    {props.prog.length > 0 &&
                        <Programme prog={props.prog} data={props.data} afficherEx={afficherEx} exs={props.exs}/>
                    }
                </div>
            </div>
            <div className={popup ? "backdrop open" : "backdrop"} onClick={togglePopup}></div>
            <div className={popup ? "popup-tab open" : "popup-tab"}> 
                <a className="close-popup" onClick={togglePopup}><ClearIcon/></a> 
                {renderSwitch(popupContent)}
            </div>
            <Drawer profile={profile} submit={handleSubmit} action={handleAction} user={props.data.acf} name={props.data.first_name} />
        </div>

    )
    
}

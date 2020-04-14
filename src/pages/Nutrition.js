import React from 'react';

export default function Nutrition (props) {
    return(
        <div className="container-coach-appli nutrition">
            <h2 className="souligne_jaune">Conseil nutrition du jour</h2>
        <h3>{props.data.titre}</h3>
        {props.data.conseil.includes("<br />") ? 
        props.data.conseil.split('<br />').map((conseil, i) =>
        <p key={i}>{conseil}</p>
        )
        :
        <p>{props.data.conseil}</p> 
        }
        </div>
    )
}
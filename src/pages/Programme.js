import React, { useState } from 'react';
import FicheProg from '../Components/FicheProg';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

export default function Programme (props) {
  const [prog, setProg] = useState(0);

  return(
    <div className="container-coach-appli programme">
      <h2 className="souligne_jaune">Mon programme</h2>
      <ToggleButtonGroup value={prog} color="primary" aria-label="outlined primary button group">
          {props.prog && props.prog.map((prog, i) => 
          <ToggleButton value={i} onClick={() => setProg(i)}>{prog.name}</ToggleButton>)
          }
      </ToggleButtonGroup>
      <FicheProg id={props.data.id} user={props.data.acf} setEx={props.afficherEx} exs={props.exs.filter(ex => ex.categories.includes(props.prog[prog].term_id))}/>
    </div>
  )
}
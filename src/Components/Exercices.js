import React, {Component} from 'react';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';import ClearIcon from '@material-ui/icons/Clear';

export default class Exercices extends Component {
    constructor(props){
        super(props);
        this.state = {
          popupVisible: false
         }
         this.handleClick = this.handleClick.bind(this)
      }

      handleClick(e) {
        e.target;
        this.setState(prevState => ({
          popupVisible: !prevState.popupVisible,
       }));
      }
    
      render() {
        let exercice = this.props.exs.acf;
        return (
            <div className="exercices"> 
              <div className="exercice-court">
                <div className="exercice-info">
                  <h3>{ exercice.titre }</h3>
                  {exercice.repititions !="" ?
                  <p>{ exercice.series} x {exercice.repititions} répétitions</p>
                  :
                  <p>{exercice.description}</p>
                  }
                </div>
                <a onClick={() => this.props.setEx(exercice)}><InfoOutlinedIcon/></a>
              </div>    
            </div>
        )
      }
}
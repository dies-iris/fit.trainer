import React, { Component } from 'react';
// import Calendar from 'react-calendar';
import Popup from '../Components/Popup';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import '../css/Calendrier.css';
import Query from '../tools/Query';


const MONTHS = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre',
];
const WEEKDAYS_LONG = [
  'Dimanche',
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi',
];
const WEEKDAYS_SHORT = ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'];

const birthdayStyle = `.DayPicker-Day--highlighted {
  background-color: orange;
  color: white;
}`;

export default class Calendrier extends Component {
constructor(props){
  super(props);
  this.state = {
      date: new Date(),
      dateRdv:[] ,
      loaded: false
    }
    this.handleDayClick = this.handleDayClick.bind(this);
    // this.handleDayMouseEnter = this.handleDayMouseEnter.bind(this);   
}
      
  componentDidMount(){
    let t = this;
    new Query('rdv').get()
          .then(data => {
            return data.json()
          })
      .then(dateRdv => {
          t.setState({loaded:true, dateRdv: dateRdv.map(this.mapDateRdv)});
        });  
  }


mapDateRdv(rdv){
  if (rdv.acf.client.ID === 3){ //TODO : mettre ID client {this.props.user.id}
  return {
    nom_du_coach: rdv.acf.nom_du_coach,
    date: rdv.acf.date,
    horaire: rdv.acf.horaire,
    lieu: rdv.acf.lieu
  }}
} 

parseDate (rdv){
  let date = rdv.date;
  let year = date.substring(6,10);
  let month = parseInt(date.substring(3,5))-1;
  let day = date.substring(0,2);
  return new Date(year,month,day);
}

// handleDayMouseEnter(day, { highlighted}) {
//   if (firstOfMonth) {
//     // Do something when the first day of month has been mouse-entered
//   }
// }

handleDayClick(day, { highlighted }) { //TODO : montrer le rdv onClick
  if (highlighted) {
    window.alert("C'est un rendez-vous !");
  }
}
  render() {
    const dates = this.state.dateRdv.map(this.parseDate);
    const modifiers = {
      highlighted: dates,
    };
        return (  
          <div className="page-coach-appli calendrier">
            <style>{birthdayStyle}</style>

            <DayPicker 
            locale="fr"
            months={MONTHS}
            weekdaysLong={WEEKDAYS_LONG}
            weekdaysShort={WEEKDAYS_SHORT}
            firstDayOfWeek={1}
            modifiers={modifiers}
            onDayClick={this.handleDayClick}
            // onDayMouseEnter={this.handleDayMouseEnter}
            />

            {/* <Popup onClick={this.onClick} value={this.state.dateRdv}/> */}
          </div>
        );
      }

}
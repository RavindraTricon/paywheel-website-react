import React, { useState } from "react";
import addMonths from 'date-fns/addMonths'
import subMonths from 'date-fns/subMonths'
import format from 'date-fns/format'
import startOfWeek from 'date-fns/startOfWeek'
import startOfMonth from 'date-fns/startOfMonth'
import endOfMonth from 'date-fns/endOfMonth'
import endOfWeek from 'date-fns/endOfWeek'
import isSameMonth from 'date-fns/isSameMonth'
import isSameDay from 'date-fns/isSameDay'
import addDays from 'date-fns/addDays'
import Form from 'react-bootstrap/Form';
import TimePicker from 'react-time-picker';
// import TimeRangePicker from '@wojtekmaj/react-timerange-picker';

import Basic from '../Email'
import axios from '../axios-order'
import './calender.scss';




const Calendar = (props) => {
const [currentDate, setCurrentDate] = useState(new Date());
const [selectedDate, setSelectedDate] = useState(new Date("03/25/2015"));
const [isPopup, setPopup] = useState(false);

const [startTime, onStartTimeChange] = useState('10:00');
const [endTime, onEndTimeChange] = useState('11:00');
const [description, onDescriptionChange] = useState();
const [videoConferencing, onVideoConferencingChange] = useState(false);
const [emails, setEmails] = useState([]);




const header = () => {
const dateFormat = "MMMM yyyy";
return (
   <div className="header row flex-middle">
      <div className="column col-start">
         <div className="icon" onClick={prevMonth}>
            chevron_left
         </div>
      </div>
      <div className="column col-center">.
         <span>{format(currentDate, dateFormat)}</span>
      </div>
      <div className="column col-end">
         <div className="icon" onClick={nextMonth}>
            chevron_right
         </div>
      </div>
   </div>
   );
};
const days = () => {
const dateFormat = "E";
const days = [];
let startDate = startOfWeek(currentDate);
for (let i = 0; i < 7; i++) {
      days.push(
         <div className="column col-center" key={i}>
         {format(addDays(startDate, i), dateFormat)}
         </div>
      );
   }
   return <div className="days row">{days}</div>;
};
const cells = () => {
const monthStart = startOfMonth(currentDate);
const monthEnd = endOfMonth(monthStart);
const startDate = startOfWeek(monthStart);
const endDate = endOfWeek(monthEnd);
const dateFormat = "d";
const rows = [];
let days = [];
let day = startDate;
let formattedDate = "";
while (day <= endDate) {
   for (let i = 0; i < 7; i++) {
   formattedDate = format(day, dateFormat);
   const cloneDay = day;
days.push(
      <div 
       className={`column cell ${!isSameMonth(day, monthStart)
       ? "disabled" : isSameDay(day, selectedDate) 
       ? "selected" : "" }`} 
       key={day} 
       onClick={() => onDateClick(cloneDay)}
       > 
       <span className="number">{formattedDate}</span>
       <span className="bg">{formattedDate}</span>
     </div>
     );
   day = addDays(day, 1);
  }
rows.push(
      <div className="row" key={day}> {days} </div>
    );
   days = [];
 }
 return <div className="body">{rows}</div>;
}
const nextMonth = () => {
   setCurrentDate(addMonths(currentDate, 1));
};
const prevMonth = () => {
   setCurrentDate(subMonths(currentDate, 1));
};
const onDateClick = day => {
   setSelectedDate(day);
   setPopup(true);
}
const style = {
   'maxWidth': '560px',
   "maxHeight": '180px',
   'marginBottom': '20px',
   'borderRadius': '15px',
   'padding': '10px'
}

async function handleSubmit(event) {
   const body = {
      selectedDate, startTime, endTime, description ,videoConferencing, emails
   }
   axios.post( '/Events.json', body )
      .then( response => {
         if(response.status === 200) {
             setPopup(false);
         }
   }  )
   .catch( error => {
      console.log('fail', error)
   });   
} 

function handleTitleChange(evt) {
   setEmails(evt);
}

return (
   <div className="calendar">
      <div>{header()}</div>
      <div>{days()}</div>
      <div>{cells()}</div>
      {  isPopup ? 
         <div className="popup">
            <div className="task-heading">
               <span >Schedule Event For The Day</span>
               <span className="cancel-button" onClick={() => setPopup(false)}>X</span>
            </div>
            <div className="popup-date">
               { format(selectedDate, 'PPPP')}
            </div>
            <div className="starttime">
               <span>Start Time</span>
               <span className="starttimepicker">
                  <TimePicker
                     amPmAriaLabel="Select AM/PM"
                     onChange={onStartTimeChange}
                     value={startTime}
                     locale="hu-HU"
                  />
               </span>
            </div>
            <div className="endtime">
               <span>End Time</span>
               <span className="starttimepicker">
                  <TimePicker
                     amPmAriaLabel="Select AM/PM"
                     onChange={onEndTimeChange}
                     value={endTime}
                     locale="hu-HU"
                  />
               </span>
            </div>
            <Basic onTitleChange={handleTitleChange}/>
            <div className="">
                  <Form.Group controlId="formBasicCheckbox">
                     <Form.Check type="checkbox" label="Add Video Conferencing" 
                     value={videoConferencing} 
                     onChange={event => {
                        onVideoConferencingChange(!videoConferencing);
                     }}
                     />
                  </Form.Group>
            </div>
            <div>
               <h3>Event Description</h3>
               <textarea style={style} rows="4" cols="100" 
                  value={description} 
                  onChange={event => {
                        onDescriptionChange(event.target.value);
                  }}
                  ></textarea>
               </div>
               <div className="plan-button">
               <button onClick={() => {handleSubmit(); props.onTitleChange('true')}} >Add Plan</button>
            </div>
         </div>
         : <div></div>
      }
   </div>
  );
};
export default Calendar;
              

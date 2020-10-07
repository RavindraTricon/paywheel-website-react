import React from 'react';
import './Dashboard.scss';
import Webcheckin from '../Web-checkin/web-checkin';
import Calender from '../Calender/calender';
import EventList from '../EventList/eventList';


function Dashboard() {
  const [render, setRender] = React.useState('no');

  function handleTitleChange(evt) {
    console.log('popo');
    setTimeout(() => {
      setRender('yes');
    }, 1000);
  } 
  return (
      <div className="dashboard">
            <div className="frame1">
              <div className="calender-heading">
                Event Planner
              </div>            
              <Calender onTitleChange={handleTitleChange}/>
            </div>
            <div className="frame2">
              <div className="calender-heading">
                EventList
              </div> 
              <EventList update={render}/>
            </div>
            <div className="frame2">
              <Webcheckin/>
          </div>          
      </div>
  );
}

export default Dashboard;

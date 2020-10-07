import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Header from './Header/Header'
import Dashboard from './Dashboard/Dashboard'
import Webcheckin from './Web-checkin/web-checkin';
import Calender from './Calender/calender';
import Schedular from './Schedular/schedular'
import { ToastContainer } from 'react-toastify';
import Notify from './services/Notify';
import EventList from './EventList/eventList';



function App() {
  React.useEffect(() => {
    Notify.notifications.subscribe((alert) => alert instanceof Function && alert());
  }, []); 
const [render, setRender] = React.useState('no');

function handleTitleChange(evt) {
  console.log('popo');
  setTimeout(() => {
    setRender('yes');
  }, 1000);
} 

  return (
   <Router>
      <div className="App">
        <Header/>
        <ToastContainer autoClose={null} limit={1} />
        <Switch>
          <Route path="/planner">
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
          </div>
          </Route>
          <Route path="/web">
            <div className="dashboard">
              <div className="frame2">            
                <Webcheckin/>
              </div>
            </div>        
          </Route>
          <Route path="/schedular">
            <div className="dashboard">
              <div className="frame3">            
                <Schedular/>
              </div>
            </div>         
          </Route>
          <Route path="/">
            <Dashboard/>
          </Route>
        </Switch>
      </div>
    </Router>
   
  );
}
export default App;

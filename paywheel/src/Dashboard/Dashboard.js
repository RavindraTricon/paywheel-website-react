// import React, { Component } from "react";
// import { Calendar, momentLocalizer, Views } from "react-big-calendar";
// import moment from "moment";
// import PopUp from "../Popup/PopUp"; 
// import parseISO from 'date-fns/parseISO'
// import "./Dashboard.scss";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import axios from '../axios-order'

// const localizer = momentLocalizer(moment);

// class Dashboard extends Component {
//   state = {
//     events: [
//       {
//         start: parseISO('2020-10-07T01:00'),
//         end: parseISO('2020-10-07T02:00'),
//         title: "Some title",
//         seen: false,
//         contacts:['qweqwewq@aads.com']
//       },
//       // {
//       //   end: "2020-10-05T01:00:00.000Z",
//       //   start: "2020-10-04T19:30:00.000Z",
//       //   title: "masdasdas",
//       //   seen: false,
//       //   contacts:['qweqwewq@aads.com']
//       // },
//       // {
//       //   start: '2020-10-07T00:00',
//       //   end: '2020-10-08T00:00',
//       //   title: "Some title",
//       //   seen: false,
//       //   contacts:['qweqwewq@aads.com']
//       // }

//     ], 
//     seen: false,
//     contacts:[]
//   };
//   componentDidMount() {
//     console.log(parseISO('2020-10-07T01:00'), 'sass')
//     axios.get( 'https://schedular-27ac2.firebaseio.com/Events.json' )
//           .then( response => {       
//               const arrayOfObj = Object.entries(response.data).map(e => e[1]);
//               console.log(arrayOfObj, )
//                 arrayOfObj.forEach((element,i) => {
//                 element.start = parseISO(element.start)
//                 element.end = parseISO(element.end)
//                 console.log(element, i )
//             });
//               this.setState({ events: arrayOfObj });
//               return () =>  this.setState({ events: arrayOfObj });
//           } )
//               .catch( error => {
//                   console.log(error, 'get')
//               } );
//   }
//   togglePop = (evt) => {
//     this.setState({
//       seen: !this.state.seen,
//       createEvent: evt
//     });
//   };

//   addEvent = (evt) => {
//     console.log(parseISO(evt.startTime) ,'iso' );
//     this.setState({
//       seen: !this.state.seen,
//       events:[...this.state.events,{
//         start: (evt.startTime),
//         end: (evt.endTime),
//         title: evt.description,
//         contacts: evt.emails
//       }],
//     });
//     const event = {
//         start: (evt.startTime),
//         end: (evt.endTime),
//         title: evt.description,
//         contacts: evt.emails
//     }
//     axios.post( '/Events.json', event )
//         .then( response => {
//             console.log(response)
//         } )
//         .catch( error => {
//             console.log('fail', error)
//         } );
//   };
  

//   render() {
//     return (
//       <div className="Calender">
//         <Calendar
//           localizer={localizer}
//           defaultDate={new Date()}
//           defaultView={Views.WEEK}
//           events={this.state.events}
//           style={{ height: "800px" }}
//           onSelectEvent={ (evt) => { this.togglePop(evt)} }
//           selectable={true}
//           onSelectSlot={ (evt) => { this.togglePop(evt); console.log(evt)} }
//           onShowMore={(evt) => { console.log(evt, 'event')}}
//           popup={true}
//         />
//         {this.state.seen ? <PopUp data = { this.state.createEvent} submit = {this.addEvent} toggle={this.togglePop} /> : null}
//       </div>
//     );
//   }
// }

// export default Dashboard;

import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import PopUp from "../Popup/PopUp"; 
import parseISO from 'date-fns/parseISO'

import "./Dashboard.scss";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from '../axios-order'


const localizer = momentLocalizer(moment);

function Dashboard () {
    const [events, setEvents] = useState([{
        start: parseISO('2020-10-07T01:00'),
        end: parseISO('2020-10-07T02:00'),
        title: "Some title",
        seen: false,
        contacts:['qweqwewq@aads.com']
      }]);
    const [createEvent, setCreateEvent] = useState()
    const [seen, setSeen] = useState(false)


    React.useEffect(() => {
      axios.get( 'https://schedular-27ac2.firebaseio.com/Events.json' )
      .then( response => {       
          const arrayOfObj = Object.entries(response.data).map(e => e[1]);
           arrayOfObj.forEach((element,i) => {
                element.start = parseISO(element.start)
                element.end = parseISO(element.end)
          });
          setEvents(arrayOfObj);
          return () => setEvents();
      } )
          .catch( error => {
              console.log(error, 'get')
          } );
      },[setEvents]
    );


  function togglePop (evt)  {
    setCreateEvent(evt);
    setSeen(true)
  };
  function togglePopClose() {
        setSeen(false);
  }

  function addEvent (evt) {
    setSeen(false);
    setEvents( [ ...events, {
        start: parseISO(evt.startTime),
        end: parseISO(evt.endTime),
        title: evt.description,
        contacts: evt.emails,
        videoCall: evt.videoConferencing
    }])
    const event = {
        start: (evt.startTime),
        end: (evt.endTime),
        title: evt.description,
        contacts: evt.emails,
        videoCall: evt.videoConferencing
    }
    axios.post( '/Events.json', event )
        .then( response => {
            console.log(response)
        } )
        .catch( error => {
            console.log('fail', error)
        } ); 
  };
  

    return (
      <div className="Calender">
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={events}
          style={{ height: "800px" }}
          onSelectEvent={ (evt) => { togglePop(evt)} }
          selectable={true}
          onSelectSlot={ (evt) => { togglePop(evt)} }
          onShowMore={(evt) => { console.log(evt, 'event')}}
          popup={true}
        />
        {seen ? <PopUp data = { createEvent} submit = {addEvent} toggle={togglePopClose} /> : null}
      </div>
    );
  
}

export default Dashboard;
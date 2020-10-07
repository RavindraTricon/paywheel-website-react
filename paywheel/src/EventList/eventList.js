import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import axios from '../axios-order'
import 'react-toastify/dist/ReactToastify.css';
import './eventList.css';
import format from 'date-fns/format'

import parseISO from 'date-fns/parseISO'


function EventList (props) {

    // const [id , setId]= useState(Math.random().toString());

    let  initialTask = [];
    const [addedTask, setAddedTask] = useState(initialTask);

    React.useEffect(() => {
        axios.get( 'https://schedular-27ac2.firebaseio.com/Events.json' )
        .then( response => {       
           const arrayOfObj = Object.entries(response.data).map(e => e[1]);
            console.log(props, 'prop', arrayOfObj)
            setAddedTask(arrayOfObj);
            return () => setAddedTask();
        } )
            .catch( error => {
                console.log(error, 'get')
            } );
        },[props]
    ); 
    
    function removeTask(id) {
        axios.get( 'https://schedular-27ac2.firebaseio.com/Events.json' )
        .then( response => {       
            var myData = Object.keys(response.data).map(key => {
                return key;
            })    
            setAddedTask([...addedTask.filter(task =>  task.id !== id)]);

            axios.delete( `https://schedular-27ac2.firebaseio.com/Events/${myData[id]}/.json` )
            .then( response => {           
               setAddedTask([...addedTask.filter(task =>  task.id !== id)]);
               axios.get( 'https://schedular-27ac2.firebaseio.com/Events.json' )
                    .then( response => {       
                    const arrayOfObj = Object.entries(response.data).map(e => e[1]);
                        arrayOfObj.forEach((element,i) => {
                        });
                        setAddedTask(arrayOfObj);
                        return () => setAddedTask();
                    } )
                    .catch( error => {
                        console.log(error, 'get')
                    } );
            } )
        } )         
    }
  
  return (
    <div className="schedular">
        <div>
            { 
                addedTask.map((list,index) => (
                    <Card key={index}>
                        <Card.Body>
                        <Card.Title>Event {index + 1 }</Card.Title>
                                <Card.Text>
                                    <strong> { format(parseISO(list.selectedDate), 'PPPP')}</strong>
                                </Card.Text>
                                <Card.Text>
                                    {list.description}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Time</strong> { list.startTime} - {list.endTime }
                                </Card.Text>
                                { list.videoConferencing ? 
                                    <div className="text"><strong>Contacts Details</strong> 
                                    { 
                                        list.emails.map((emailList,index) => (
                                            <div className="text" key={index}> {index + 1 } . {emailList}</div>
                                        ))

                                    }
                                    <div className="text link">
                                        Go to video Conferencing website link
                                    </div>
                                    </div>
                                    : 
                                    <div></div>
                                }
                                <Button 
                                    onClick={() => removeTask(index)} variant="danger">Delete
                                </Button>
                        </Card.Body>
                    </Card>
                ))
            }
        </div> 
    </div>
  );
}

export default EventList;

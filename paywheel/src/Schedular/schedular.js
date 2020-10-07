import React, { useState } from 'react';
import './schedular.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import axios from '../axios-order'
import 'react-toastify/dist/ReactToastify.css';
import Notify, { AlertTypes } from '../services/Notify';
import differenceInSeconds from 'date-fns/differenceInSeconds'

import TimeLeftHandler from '../TimeHandler/Time-handler'

function Schedular() {
    const [task, handleTaskChange] = useState('');
    const [time, handleTimeChange] = useState('');
    const [id , setId]= useState(Math.random().toString());


    let  initialTask = [];
    const [addedTask, setAddedTask] = useState(initialTask);


   
    React.useEffect(() => {
        axios.get( 'https://schedular-27ac2.firebaseio.com/list.json' )
        .then( response => {       
           const arrayOfObj = Object.entries(response.data).map(e => e[1]);
            arrayOfObj.forEach((element,i) => {
                const second = differenceInSeconds(new Date(element.time),new Date());
                if ( second < 0) {
                    notifySuccess();
                    removeTask(element.id);
                }
            });
            setAddedTask(arrayOfObj);
            return () => setAddedTask();
        } )
            .catch( error => {
                console.log(error, 'get')
            } );
        },
    ); 
    


    async function handleSubmit(event) {
        event.preventDefault();
        setId(Math.random().toString());
        setAddedTask([...addedTask, { task, time}]);
        const list = { task, time ,id} ;
        axios.post( '/list.json', list )
        .then( response => {
            console.log(response)
        } )
        .catch( error => {
            console.log('fail', error)
        } );   
        
        
    }    
    function removeTask(id) {
        axios.get( 'https://schedular-27ac2.firebaseio.com/list.json' )
        .then( response => {       
            const arrayOfObj = Object.entries(response.data).map(e => e[1])
            var myData = Object.keys(response.data).map(key => {
                return key;
            })    
            axios.delete( `https://schedular-27ac2.firebaseio.com/list/${myData[arrayOfObj.findIndex(element => element.id === id)]}/.json` )
            .then( response => {           
               setAddedTask([...addedTask.filter(task =>  task.id !== id)]);
            } )
        } )         
    }

    const notifySuccess = () => {
        Notify.sendNotification('Your reminder has arrived', AlertTypes.success);
    }


  
  return (
    <div className="schedular">
        <div className="schedular-heading" onClick={notifySuccess}>
            Schedular
        </div>
        <div className='form'>
            <Form onSubmit={handleSubmit} >
                <Form.Group controlId='task'>
                    <Form.Label>Task</Form.Label>
                    <Form.Control type="text" placeholder="Enter Task" 
                    value={task}
                    required
                    onChange={event => {
                        handleTaskChange(event.target.value);
                      }}
                    />
                </Form.Group>

                <Form.Group controlId='time'>
                    <Form.Label>Enter Date</Form.Label>
                    <Form.Control type="datetime-local" placeholder="Enter Date" 
                    required
                    value={time}
                    onChange={event => {
                        handleTimeChange(event.target.value);
                      }}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add Reminder
                </Button>
            </Form>     
        </div>
        <div>
            { 
                addedTask.map((list,index) => (
                    <Card key={index}>
                        <Card.Body>
                        <Card.Title>Task {index}</Card.Title>
                                <Card.Text>
                                    {list.task}
                                </Card.Text>
                                    <TimeLeftHandler time={list.time} task={list.task}/>
                            <Button 
                            onClick={() => removeTask(list.id)} variant="danger">Delete</Button>
                        </Card.Body>
                    </Card>
                ))
            }
        </div> 
    </div>
  );
}

export default Schedular;

import './App.css';
import React,{ useEffect, useState} from 'react';
import {AiOutlineDelete} from 'react-icons/ai';
import {BsCheckLg} from 'react-icons/bs';

function App() {
  const [isCompleteScreen,setIsCompleteScreen] =  useState (false);
  const [allTodo,setTodo] = useState([]);
  const [newTitle,setNewTitle] = useState("");
  const [newDescription,setNewDescription] = useState(""); 
  const [CompletedTodo,setCompletedTodo] = useState([]);
  const handleAddTodo = ()=>{
    let newTodoItem = {
      title:newTitle,
      description:newDescription
    };
    let updatedTodoArr = [...allTodo];
    updatedTodoArr.push(newTodoItem);
    setTodo(updatedTodoArr);
    localStorage.setItem('todolist',JSON.stringify(updatedTodoArr));
  };
  const handleDeleteTodo = index=> {
    let reducedTodo = [...allTodo];
    reducedTodo.splice(index);
    localStorage.setItem('todolist',JSON.stringify(reducedTodo));
    setTodo(reducedTodo)
  };
  const handleComplete = index=> {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd + '-' + mm + '-' + yyyy + ' at ' + h + ':'+m+':' + s;
    let filteredItem = {
      ...allTodo[index],
      completedOn:completedOn
    };
    let updatedCompletedArr = [...CompletedTodo];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodo(updatedCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem('CompletedTodo',JSON.stringify(updatedCompletedArr));
  };
  const handleDeleteCompletedTodo = index => {
    let reducedTodo = [...CompletedTodo];
    reducedTodo.splice(index);
    localStorage.setItem('CompletedTodo',JSON.stringify(reducedTodo));
    setCompletedTodo(reducedTodo);
  };

  useEffect(()=>{
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    let savedCompletedTodo = JSON.parse(localStorage.getItem('CompletedTodo'));
    if(savedTodo){
      setTodo(savedTodo);
    }
    if(savedCompletedTodo){
      setCompletedTodo(savedCompletedTodo);
    }
  },[])
  return (
    <div className="App">
      <h1>TO-DO LIST WEB APP</h1>
      <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Title</label>
            <input type="text" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder="What's the task title?" />
          </div>
          <div className='todo-input-item'>
            <label>Description</label>
            <input type="text" value={newDescription} onChange={(e)=>setNewDescription(e.target.value)} placeholder="What's the task description?" />
          </div>
          <div className='todo-input-item'>
            <button type='button' onClick={handleAddTodo} className='primarybtn'>Save</button>
          </div>
        </div>
        <div className='btn-area'>
          <button className={`secondarybtn ${isCompleteScreen===false && 'active'}`} onClick={()=>setIsCompleteScreen(false)}>Todo</button>
          <button className={`secondarybtn ${isCompleteScreen===true && 'active'}`} onClick={()=>setIsCompleteScreen(true)}>Completed</button>
        </div>
        <div className='todo-list'>
          {isCompleteScreen===false && allTodo.map((item,index)=>{
            return(
              <div className='todo-list-item' key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div>
                  <AiOutlineDelete className='icon' onClick={()=>handleDeleteTodo(index)} title='Delete?' />
                  <BsCheckLg className='check-icon' onClick={()=>handleComplete(index)} title='Completed?' />
                </div>
              </div>
            );
          })}
          
          {isCompleteScreen===true && CompletedTodo.map((item,index)=>{
            return(
              <div className='todo-list-item' key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p><small>completed on:{item.completedOn}</small></p>
                  
                  
                </div>
                <div>
                  <AiOutlineDelete className='icon' onClick={()=>handleDeleteCompletedTodo(index)} title='Delete?' />
                </div>
              </div>
            )
          })}

        </div>
      </div>
    </div>
  );
}

export default App;

import { useState, useRef } from 'react'
import Tasks from './Tasks'

export default function Cards({ card, cardFunctions, taskFunctions, dragged }) {

    const [newTask, setNewTask] = useState('')
    const cardRef = useRef()
  
    const deleteCard = (cardId) => {
      cardFunctions.delete(cardId)
    }
  
    const handleNewTask = (e) => {
      setNewTask(e.target.value)
    }
  
    const addNewTask = (cardId) => {
      taskFunctions.add(cardId, newTask)
      setNewTask('')
    }
  
    const dragOver = (e) => {
      e.preventDefault()
    }
  
    const drop= (e) => {
      e.preventDefault()
      dragged.card(cardRef)
    }
    
    const dragTask = (ref) => {
      dragged.task(ref.current.id)
    }
  
  
    return(
        <div onDragOver={dragOver} onDrop={drop} ref={cardRef} id={card.id}>
          <h3>{card.name}</h3>
          <Tasks cardId={card.id} tasks={card.tasks} taskFunctions={taskFunctions} dragTask={dragTask}/>
          <div className='addNewTask'>
            <input placeholder='Add new Task' value={newTask} onChange={handleNewTask} type="text"></input>
            <button onClick={()=>addNewTask(card.id)}>+</button>
          </div>
          <button className='deleteButton' onClick={()=>deleteCard(card.id)}>Delete</button>
        </div>
    )
  }

import { useState, useRef, createRef } from 'react'

export default function Tasks ({ cardId, tasks, taskFunctions, dragTask }) {
    const [isEditing, setIsEditing] = useState(false)
    const [editTaskId, setEditTaskId] = useState(null)
    const taskRef = useRef([])
    taskRef.current = tasks.map((task, i) => taskRef.current[i] ?? createRef());
  
  
    const deleteTask = (cardId, taskId) => {
      taskFunctions.delete(cardId, taskId)
    }
  
    const editTask = (taskId) => {
      let editStatus = isEditing
      setIsEditing(!editStatus)
      setEditTaskId(taskId)
    }
  
    const changeEditTask = (e, cardId, taskId) => {
      taskFunctions.update(cardId, taskId, e.target.value)
    }
  
  
    return (
      <div>
        {tasks.map((task,i)=> 
          <div className='tasksContainer' key={`${cardId}_${task.id}`} id={`${cardId}_${task.id}`} onDragStart={()=>dragTask(taskRef.current[i])} draggable="true" ref={taskRef.current[i]}>
            {isEditing && task.id === editTaskId ? 
              <input type="text" value={task.name} onChange={(e)=>changeEditTask(e, cardId, task.id)}></input> : 
            <div>
              {task.name}
            </div> 
            }
            <button className='editButton' onClick={() => {editTask(task.id)}}>{isEditing && task.id === editTaskId ? 'Save' : 'Edit'}</button>
            <button className='deleteButton' onClick={() => {deleteTask(cardId, task.id)}}>Delete</button>
          </div>
          )}
      </div>
    )
  }
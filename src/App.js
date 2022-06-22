import './App.css';
import { useState } from 'react'
import Cards from './Cards'

function App() {
  const defaultCards = [
    {
      name: 'List 1',
      id: 1,
      tasks: [{
        name: 'Task1',
        id: 1,
      },{
        name: 'Task2',
        id: 2,
      }]
    },
    {
      name: 'List 2',
      id: 2,
      tasks: [{
        name: 'Task3',
        id: 3,
      }]
    }
  ]
  const [cards, setCards] = useState(defaultCards)
  const [draggedTask, setDraggedTask] = useState(null)


  const deleteCard = (cardId) => {
    const allCards = [...cards]
    allCards.forEach((card, i) => {
      if(cardId === card.id) {
        allCards.splice(i,1)
        setCards(allCards)
        return
      }
    })
  }

  const addNewCard = () => {
    const name = prompt('Add a name for new card');
    if(name) {
      const allCards = [...cards]
      const newCard = {
        name: name,
        id: Math.random(),
        tasks: []
      }
      allCards.push(newCard)
      setCards(allCards)
    }
  }

  const addNewTask = (cardId, task) => {
    const allCards = [...cards]
    allCards.forEach((card, i) => {
      if(cardId === card.id) {
        const newTask = {
          name: task,
          id: Math.random(),
        }
        card.tasks.push(newTask)
        setCards(allCards)
        return
      }
    })
  }

  const cardFunctions = {
    delete: deleteCard,
  }

  const deleteTask = (cardId, taskId) => {
    const allCards = [...cards]
    allCards.forEach((card, i) => {
      if(cardId === card.id) {
        card.tasks.forEach((task, i) => {
          if (taskId === task.id) {
            card.tasks.splice(i,1)
            setCards(allCards)
            return
          }
        })
        
        return
      }
    })
  }

  const updateTask = (cardId, taskId, taskName) => {
    const allCards = [...cards]
    allCards.forEach((card, i) => {
      if(cardId === card.id) {
        card.tasks.forEach((task, i) => {
          if (taskId === task.id) {
            task.name = taskName
            setCards(allCards)
            return
          }
        })
        
        return
      }
    })
  }

  const dragTask = (ref) => {
    setDraggedTask(ref)
  }

  const dragCard = (ref) => {
    const taskId = draggedTask.split('_')[1]
    const oldCardId = draggedTask.split('_')[0]
    const newCardId = ref.current.id
    updateDragging(oldCardId, newCardId, taskId)
  }

  const updateDragging = (oldCardId, newCardId, taskId) => {
    const allCards = [...cards]
    let tempTask
    allCards.forEach(card => {
      if (oldCardId == card.id) {
        card.tasks.forEach((task,i) => {
          if (taskId == task.id) {
            tempTask = task
            card.tasks.splice(i,1)
          }
        })
      }
    })
    allCards.forEach(card => {
      if (newCardId == card.id) {
        card.tasks.push(tempTask)
      }
    })

    setCards(allCards)
  }

  const taskFunctions = {
    add: addNewTask,
    delete: deleteTask,
    update: updateTask,
  }

  const dragged = {
    task: dragTask,
    card: dragCard,
  }

  return (
    <div className="App">
      <header className="App-header">
      
        </header>
        <button className='addNewCard' onClick={addNewCard}> + </button>
      {cards.map(card =>
        <div key={card.id} className="cardContainer">
        <Cards card={card} cardFunctions={cardFunctions} taskFunctions={taskFunctions} dragged={dragged}></Cards>
      </div>
      )}
    </div>
  );
}

export default App;

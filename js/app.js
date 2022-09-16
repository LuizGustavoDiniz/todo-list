const inputTask = document.querySelector('#task')
const inputSearch = document.querySelector('#search')
const formTaskValue = document.querySelector('#form-task')
const formSearchValue = document.querySelector('#form-search')
const tasksContainer = document.querySelector('#tasks-container')
const completeTasks = document.querySelector('#complete-task-container')
const completeContainer = document.querySelector('#complete-container')
const taskCompletedContainer = document.querySelector('#tasks-completed')
const messageAddTaskContainer = document.querySelector('#message-add')
const messageCheckTaskContainer = document.querySelector('#message-complete')
const body = document.querySelector('body')

const generateId = () => String(Math.round(Math.random() * 1000))

let bankTasks = JSON.parse(localStorage.getItem('tasks'))  || []

let completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || []

let filteredTasks = JSON.parse(localStorage.getItem('filteredTasks'))  || []

const flashMessage = (element) => {

  element.classList.add('active')

  setTimeout(() => {

    element.classList.remove('active')

  }, 4000)

}

const createCompleteContainer = task => {
  
  let completeTaskContainer = `
        <label class="tasks" id="tasks">
            <span>${task.name}</span>
        </label>
  `

  taskCompletedContainer.innerHTML += completeTaskContainer

  flashMessage(messageCheckTaskContainer)

}

const refreshCompleteContainer = () => {

  taskCompletedContainer.innerHTML = ''

  completedTasks.forEach(task => createCompleteContainer(task))

}

const editTask = () => {
  alert('Editou!')
}

const createTask = (task, index) => {

    let taskContent = `
    <label class="tasks" id="tasks">
    <span>${task.name}</span>
      <div class="actions">
        <button><i onclick="checkTask(event)" data-id="${task.id}" class="fas fa-check"></i></button>
        <button><i onclick="editTask(event)" data-id="${task.id}"  class="fas fa-edit"></i></button>
        <button><i data-id="${task.id}"  class="fas fa-trash-alt"></i></button>
      </div>
    </label>
    `

    tasksContainer.innerHTML += taskContent 

}

const refresh = (tasks) => {

 tasksContainer.innerHTML = ''

 inputTask.value = ''

 tasks.forEach((task, index) => createTask(task, index))

}

const checkTask = event => {
  let currentTask = event.target
  let currentTaskIndex = currentTask.dataset.id

  bankTasks.filter(item => item.id === currentTaskIndex)
   .reduce((acc, item) => {
      item.status = true
     completedTasks.push(item)
   }, {})

   localStorage.setItem('completedTasks', JSON.stringify(completedTasks))

   let tasks = bankTasks.filter(item => item.status !== true)

   localStorage.setItem('tasks', JSON.stringify(tasks))

   refreshCompleteContainer()

   refresh(tasks)

   //refreshTasksArray(currentTaskIndex)
}

const insertTaskIntoBank = (value) => {

  let data = {id: generateId(), name: value, status: false}

  bankTasks.push(data)

  localStorage.setItem('tasks', JSON.stringify(bankTasks))

  refresh(bankTasks)

  flashMessage(messageAddTaskContainer)

}

const getInputValue = event => {
   event.preventDefault()
   const inputTaskValue = event.target.task.value

   if(!inputTaskValue){
    alert('o campo de tarefa deve estar preenchido!')
   }

   insertTaskIntoBank(inputTaskValue)
}


const getCompleteTasks = event => {
  completeContainer.classList.toggle('active')
}


const closeCompleteTasksContainer = event => {
   const element = event.target

   if(element.id === 'close'){
    element.parentElement.parentElement.classList.remove('active')
   }
}


const closeModals = event => {

  if(event.target.tagName !== 'DIV' && event.target.tagName !== 'SPAN'){
    if(event.target.id !== 'close' || event.target.className !== 'close'){
      completeContainer.classList.remove('active')
    }
  }

}




const getSearch = event => {
  event.preventDefault()
  const searchValue = event.target.value
    
  let tasksFilter = bankTasks.filter(task => task.name.includes(searchValue))

  if(searchValue === ''){
    refresh(bankTasks)
    return
  }

  filteredTasks = tasksFilter
  localStorage.setItem('filteredTasks', JSON.stringify(filteredTasks))
  refresh(filteredTasks)

}

formTaskValue.addEventListener('submit', getInputValue)
formSearchValue.addEventListener('input', getSearch)
completeTasks.addEventListener('click', getCompleteTasks)
completeContainer.addEventListener('click', closeCompleteTasksContainer)
//body.addEventListener('click', closeModals)


refresh(bankTasks)
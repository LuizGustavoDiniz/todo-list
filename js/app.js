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

let tasks = [
    // {id: 1, name: 'jogar bola', status: false },
    // {id: 2, name: 'jogar video-game', status: false },
    // {id: 3, name: 'tirar lixo', status: false },
    // {id: 4, name: 'ler livros', status: false }
]

const completedTasks = []

const flashMessage = (element) => {

  element.classList.add('active')

  setTimeout(() => {

    element.classList.remove('active')
    console.log('oi')

  }, 4000)

}

const refreshTasksArray = (index) => {

 const tas = tasks.filter(task => task.id !== index)
//  .reduce((acc, item) => {
//   tasks.push(item)
//   }, {})

 tasks = tas

 refresh(tasks)

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

const checkTask = event => {
  let currentTask = event.target
  let currentTaskIndex = currentTask.dataset.id

  tasks.filter(item => item.id === currentTaskIndex)
   .reduce((acc, item) => {
     completedTasks.push(item)
   }, {})

   refreshCompleteContainer()

   refreshTasksArray(currentTaskIndex)
}

const createTask = (task, index) => {

    let taskContent = `
    <label class="tasks" id="tasks">
    <span>${task.name}</span>
      <div class="actions">
        <button><i onclick="checkTask(event)" data-id="${task.id}" class="fas fa-check"></i></button>
        <button><i data-id="${task.id}"  class="fas fa-edit"></i></button>
        <button><i data-id="${task.id}"  class="fas fa-trash-alt"></i></button>
      </div>
    </label>
    `

    tasksContainer.innerHTML += taskContent 

}

const refresh = (tasks) => {

 tasksContainer.innerHTML = ''

 inputTask.value = ''

 console.log(tasks)

 tasks.forEach((task, index) => createTask(task, index))

}

const insertTaskIntoBank = (value) => {

 tasks.push({id: generateId(), name: value, status: false})

 refresh(tasks)

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
  console.log(event.target.tagName)
  
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

const getInputSearchValue = (event) => {
  const searchValue = event.target.value.trim()

}

formTaskValue.addEventListener('submit', getInputValue)
formSearchValue.addEventListener('input', getInputSearchValue)
completeTasks.addEventListener('click', getCompleteTasks)
completeContainer.addEventListener('click', closeCompleteTasksContainer)
//body.addEventListener('click', closeModals)


refresh(tasks)
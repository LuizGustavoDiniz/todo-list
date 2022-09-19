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
const editContainer = document.querySelector('#edit')
const formEditTask = document.querySelector('#form-edit-task')
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

}

const refreshCompleteContainer = () => {

  taskCompletedContainer.innerHTML = ''

  completedTasks.forEach(task => createCompleteContainer(task))

}



const closeEditContainer = (event, id) => {
  const element = event.target

  if(element.id === 'close'){
    element.parentElement.parentElement.parentElement.classList.remove('active')
   }

  if(element.tagName !== "FORM" || element.tagName !== "H2" || element.tagName !== "INPUT" || element.tagName !== "BUTTON"){
    element.classList.remove('active')
  }
  
}

const editContainerShow = (event) => {
  editContainer.classList.add('active')

  const id = event.target.dataset.id

  editContainer.addEventListener('click', closeEditContainer(event, id))

  formEditTask.setAttribute('data-id', id)

}

const deleteTask = (event) => {
  const id = event.target.dataset.id

  
}

const createTask = (task, index) => {

    let taskContent = `
    <label class="tasks" id="tasks">
    <span>${task.name}</span>
      <div class="actions">
        <button><i onclick="checkTask(event)" data-id="${task.id}" class="fas fa-check"></i></button>
        <button><i onclick="editContainerShow(event)" data-id="${task.id}"  class="fas fa-edit"></i></button>
        <button><i onclick="deleteTask(event)"data-id="${task.id}"  class="fas fa-trash-alt"></i></button>
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

  const item = bankTasks.filter(item => item.id === currentTaskIndex)
   .reduce((acc, item) => {
      item.status = true
     
      return item
   }, {})

   completedTasks.push(item)

   console.log(completedTasks)

   localStorage.setItem('completedTasks', JSON.stringify(completedTasks))

   let tasks = bankTasks
   .filter(item => item.id !== currentTaskIndex)

   bankTasks = tasks
    

   console.log(tasks)
   console.log(bankTasks)

   localStorage.setItem('tasks', JSON.stringify(bankTasks))

   refreshCompleteContainer()

   flashMessage(messageCheckTaskContainer)

   refresh(bankTasks)

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

   event.target.task.value = ''
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

  let teste = bankTasks
   .filter(task => task.name.includes(searchValue) && task.status !== true)
   .reduce((acc, item) => {
    return item
   }, {}) 

   console.log(teste)


  let tasksFilter = bankTasks
   .filter(task => task.name.includes(searchValue)  && task.status !== true)
                            

  if(searchValue === ''){
    refresh(bankTasks)
    return
  }

  filteredTasks = tasksFilter
  localStorage.setItem('filteredTasks', JSON.stringify(filteredTasks))
  refresh(filteredTasks)


}


const editTask = (event) => {
  event.preventDefault()
  const inputEditValue = event.target.task.value
  const id = event.target.dataset.id
 
  let task = bankTasks
              .filter(task => task.id === id)
              .reduce((acc, item) => {

                return item

              }, {})

 

 bankTasks.forEach(task => {

  if(task.id === id){
    task.name = inputEditValue
  }

 })

  localStorage.setItem('tasks', JSON.stringify(bankTasks))
  refresh(bankTasks)
  
  editContainer.classList.remove('active')

 }


formTaskValue.addEventListener('submit', getInputValue)
formSearchValue.addEventListener('input', getSearch)
completeTasks.addEventListener('click', getCompleteTasks)
completeContainer.addEventListener('click', closeCompleteTasksContainer)
editContainer.addEventListener('click', closeEditContainer)
formEditTask.addEventListener('submit', editTask)
//body.addEventListener('click', closeModals)


refresh(bankTasks)
refreshCompleteContainer()
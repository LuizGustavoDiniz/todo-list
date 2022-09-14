const inputTask = document.querySelector('#task')
const inputSearch = document.querySelector('#search')
const formTaskValue = document.querySelector('#form-task')
const formSearchValue = document.querySelector('#form-search')
const tasksContainer = document.querySelector('#tasks-container')
const completeTasks = document.querySelector('#complete-task-container')
const completeContainer = document.querySelector('#complete-container')
const body = document.querySelector('body')

const tasks = [
    { name: 'jogar bola', status: false },
    { name: 'jogar video-game', status: false },
    { name: 'tirar lixo', status: false },
    { name: 'ler livros', status: false }
]

const createTask = (task, index) => {

    let taskContent = `
    <label class="tasks" id="tasks">
    <span>${task.name}</span>
      <div class="actions">
        <button><i data-id="${index}" class="fas fa-check"></i></button>
        <button><i data-id="${index}"  class="fas fa-edit"></i></button>
        <button><i data-id="${index}"  class="fas fa-trash-alt"></i></button>
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

 tasks.push({name: value, status: false})

 refresh(tasks)

}

const getInputValue = event => {
   event.preventDefault()
   const inputTaskValue = event.target.task.value

   if(!inputTaskValue){
    alert('o campo de tarefa deve estar preenchido!')
   }

   insertTaskIntoBank(inputTaskValue)
}

const getInputSearchValue = (event) => {
   console.log(event.target.value)
}

const getCompleteTasks = () => {
  completeContainer.classList.toggle('active')
}


const closeCompleteTasksContainer = event => {
   const element = event.target

   if(element.id === 'close'){
    element.parentElement.parentElement.classList.remove('active')
   }
}


const closeModals = event => {
  body.children[0].classList.remove('active')

}


formTaskValue.addEventListener('submit', getInputValue)
formSearchValue.addEventListener('input', getInputSearchValue)
completeTasks.addEventListener('click', getCompleteTasks)
completeContainer.addEventListener('click', closeCompleteTasksContainer)
body.addEventListener('click', closeModals)


refresh(tasks)
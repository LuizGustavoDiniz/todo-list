const inputTask = document.querySelector('#task')
const inputSearch = document.querySelector('#search')
const formTasksContainer = document.querySelector('form')
const tasksContainer = document.querySelector('#tasks-container')

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
   const search = event.target.search
   console.log()

   if(search.id === 'search'){
    console.log('procurou')
   }

   if(event.target.task.id === 'task' && !inputTaskValue){
    alert('o campo de tarefa deve estar preenchido!')
   }

   insertTaskIntoBank(inputTaskValue)
}


formTasksContainer.addEventListener('submit', getInputValue)


refresh(tasks)
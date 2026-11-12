const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

// Масив для збереження завдань
let todos = []

function updateCounters() {
  const totalCount = todos.length
  const uncheckedCount = todos.filter(todo => !todo.checked).length

  itemCountSpan.textContent = totalCount
  uncheckedCountSpan.textContent = uncheckedCount
}

function render() {
  list.innerHTML = ''

  todos.forEach((todo, index) => {
    // Створюємо контейнер для завдання
    const li = document.createElement('li')
    li.className = classNames.TODO_ITEM

    // Чекбокс для позначки виконання
    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.className = classNames.TODO_CHECKBOX
    checkbox.checked = todo.checked
    checkbox.onchange = () => {
      todos[index].checked = checkbox.checked
      updateCounters()
    }

    // Текст завдання
    const span = document.createElement('span')
    span.className = classNames.TODO_TEXT
    span.textContent = todo.text
    if (todo.checked) {
      span.style.textDecoration = 'line-through'
    }

    // Кнопка видалення
    const deleteBtn = document.createElement('button')
    deleteBtn.className = classNames.TODO_DELETE
    deleteBtn.textContent = 'Видалити'
    deleteBtn.onclick = () => {
      todos.splice(index, 1)
      render()
      updateCounters()
    }

    // Збираємо все до купи
    li.appendChild(checkbox)
    li.appendChild(span)
    li.appendChild(deleteBtn)
    list.appendChild(li)
  })
}

function newTodo() {
  const todoText = prompt('Введіть назву нового завдання:')
  
  if (todoText && todoText.trim() !== '') {
    todos.push({
      text: todoText.trim(),
      checked: false
    })
    render()
    updateCounters()
  }
}
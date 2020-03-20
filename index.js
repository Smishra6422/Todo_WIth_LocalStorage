let addTitle = document.getElementById('addButton')
let updateButton = document.getElementById('updateButton')
let addContainer = document.getElementsByClassName('addTodo')[0]
let inputTitle = document.getElementById('title')
let titleUl = document.getElementsByClassName('todoLists')[0]
let deleteListItem = document.getElementsByClassName('deleteButton')

let titleList = JSON.parse(localStorage.getItem('todoTitle'))

if(titleList) {
	let titles = titleList

	for(let i=0; i<titles.length; i++) {
		let list = `<li class="todoList">
					<input type="text" name="todoTitle" data-id=${titles[i].id} disabled="true" value=${titles[i].title}>
					<input class="editButton" type="button" name="" value="Edit">
					<input class="deleteButton" type="button" name="" value="Delete">
				</li>`

	titleUl.insertAdjacentHTML("beforeend",list);
	inputTitle.value = ''
	}
} else {
	titleList = []
}

addButton.addEventListener('click', function (event) {
	let dataId = Math.random()*10
	let list = `<li class="todoList">
					<input type="text" name="todoTitle" data-id=${dataId} disabled="true" value=${inputTitle.value}>
					<input class="editButton" type="button" name="" value="Edit">
					<input class="deleteButton" type="button" name="" value="Delete">
				</li>`

	titleUl.insertAdjacentHTML("beforeend",list);
	titleList.push({
		title:inputTitle.value,
		id: dataId
	})
	localStorage.setItem('todoTitle', JSON.stringify(titleList))
	inputTitle.value = ''
	
	
})

titleUl.addEventListener('click', function (event) {
	
	let element = event.target;
	if(element.value=='Delete') {
		element.parentNode.parentNode.removeChild(element.parentNode);
		let newTodoTitleList = titleList.filter((title) => title.id != element.parentNode.firstElementChild.dataset.id)
		titleList = newTodoTitleList
		localStorage.setItem('todoTitle', JSON.stringify(titleList))
		
	}
	if(element.value == 'Edit') {
		let editValue = element.parentNode.firstElementChild.value
		inputTitle.value = editValue
		updateButton.style.display = 'block'
		addTitle.style.display = 'none'

		addContainer.addEventListener('click', function (event) {
			
			if(event.target.value == 'Update') {
				element.parentNode.firstElementChild.value = inputTitle.value

				// change the value in the Local Storage

				for(let i=0; i<titleList.length; i++) {
					if( titleList[i].id == element.parentNode.firstElementChild.dataset.id ) {
						titleList[i].title = inputTitle.value
					}
				}

				localStorage.setItem('todoTitle', JSON.stringify(titleList))


				inputTitle.value = ''
				element = null // to change it because it is always pointing to the same element
				updateButton.style.display = 'none'
				addTitle.style.display = 'block'
				
			}
	
		})

	}
	

})


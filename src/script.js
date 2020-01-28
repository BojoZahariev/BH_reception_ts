const electron = require('electron');
const { ipcRenderer } = electron;

const form = document.querySelector('form');
const item = document.querySelector('#input1');
const item2 = document.querySelector('#input2');
const list = document.querySelector('ul');

class Colleague {
  constructor(firstName, lastName, date) {
    this.firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
    this.lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
    this.date = date;
  }
}

//Render Items to Screen
const render = item => {
  const li = document.createElement('li');

  const date = document.createElement('p');
  date.textContent = item.date;
  date.classList.add('names');
  li.appendChild(date);

  const name1 = document.createElement('p');
  name1.textContent = item.firstName.charAt(0).toUpperCase() + item.firstName.slice(1);
  name1.classList.add('names');
  li.appendChild(name1);

  const name2 = document.createElement('p');
  name2.textContent = item.lastName.charAt(0).toUpperCase() + item.lastName.slice(1);
  name2.classList.add('names');
  li.appendChild(name2);

  const returnedCheck = document.createElement('p');
  returnedCheck.id = 'radio';
  returnedCheck.textContent = item.returned;
  returnedCheck.classList.add('names');
  li.appendChild(returnedCheck);

  const deleteBtn = document.createElement('p');
  deleteBtn.textContent = 'delete';
  deleteBtn.classList.add('names');
  li.appendChild(deleteBtn);

  returnedCheck.addEventListener('click', function(e) {
    if (this.textContent === 'Not Returned') {
      ipcRenderer.send('updateItemReturned', { item });
      this.textContent = 'Returned';
    } else if (this.textContent === 'Returned') {
      ipcRenderer.send('updateItemNotReturned', { item });
      this.textContent = 'Not Returned';
    }
  });

  deleteBtn.addEventListener('click', function(e) {
    var div = this.parentElement;
    div.style.display = 'none';
    ipcRenderer.send('deleteItem', { item });
  });

  list.appendChild(li);
};

//Get All Items After Starting
window.addEventListener('load', () => ipcRenderer.send('loadAll'));
ipcRenderer.on('loaded', (e, items) => items.forEach(item => render(item)));

//Send Item to the server
form.addEventListener('submit', e => {
  e.preventDefault();

  if (item.value !== '' && item2.value !== '') {
    //set the date format
    var dateObj = new Date();
    var month = dateObj.getMonth() + 1; //months from 1-12
    var day = dateObj.getDate();
    var year = dateObj.getFullYear();
    issueDate = day + '/' + month + '/' + year;

    ipcRenderer.send('addItem', { id: Date.now(), firstName: item.value, lastName: item2.value, date: issueDate, returned: 'Not Returned' });

    form.reset();
  }
});

//Catches Add Item from server
ipcRenderer.on('added', (e, item) => render(item));

//Catches ClearAll from menu, sends the event to server to clear the db.
ipcRenderer.on('clearAll', () => ipcRenderer.send('clearAll'));
ipcRenderer.on('cleared', () => (list.innerHTML = ''));

//Catches delete
//ipcRenderer.on('deleted', (e, item) => console.log(item));

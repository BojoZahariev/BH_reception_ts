const electron = require('electron');
const { ipcRenderer } = electron;

const form = document.querySelector('form');
const item = document.querySelector('#input1');
const item2 = document.querySelector('#input2');
const list = document.querySelector('ul');

class Colleague {
  constructor(firstName, lastName) {
    this.firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
    this.lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
  }
}

//Render Items to Screen
const render = item => {
  const li = document.createElement('li');
  li.innerHTML = `${item.firstName}  ${item.lastName}`;
  list.appendChild(li);
};

//Get All Items After Starting
window.addEventListener('load', () => ipcRenderer.send('loadAll'));
ipcRenderer.on('loaded', (e, items) => items.forEach(item => render(item.item)));

//Send Item to the server
form.addEventListener('submit', e => {
  e.preventDefault();

  //new object with the input values
  let colleague = new Colleague(item.value, item2.value);

  ipcRenderer.send('addItem', { item: colleague });
  form.reset();
});

//Catches Add Item from server
ipcRenderer.on('added', (e, item) => render(item.item));

//Catches ClearAll from menu, sends the event to server to clear the db.
ipcRenderer.on('clearAll', () => ipcRenderer.send('clearAll'));
ipcRenderer.on('cleared', () => (list.innerHTML = ''));

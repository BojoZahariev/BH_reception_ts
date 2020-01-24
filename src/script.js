const electron = require('electron');
const { ipcRenderer } = electron;

const form = document.querySelector('form');
const item = document.querySelector('#input1');
const item2 = document.querySelector('#input2');
const list = document.querySelector('ul');

//Render Items to Screen
const render = item => {
  const li = document.createElement('li');
  li.innerHTML = item;
  list.appendChild(li);
};

//Get All Items After Starting
window.addEventListener('load', () => ipcRenderer.send('loadAll'));
ipcRenderer.on('loaded', (e, items) => items.forEach(item => render(item.item)));

//Send Item to the server
form.addEventListener('submit', e => {
  e.preventDefault();

  //concat the two values and make the first letter uppercase
  let test = item.value.charAt(0).toUpperCase() + item.value.slice(1) + ' ' + item2.value.charAt(0).toUpperCase() + item2.value.slice(1);

  ipcRenderer.send('addItem', { item: test });
  form.reset();
});

//Catches Add Item from server
ipcRenderer.on('added', (e, item) => render(item.item));

//Catches ClearAll from menu, sends the event to server to clear the db.
ipcRenderer.on('clearAll', () => ipcRenderer.send('clearAll'));
ipcRenderer.on('cleared', () => (list.innerHTML = ''));

const electron = require('electron');
const { ipcRenderer } = electron;

//colleagues
const form = document.querySelector('#colleaguesForm');
const item = document.querySelector('#input1');
const item2 = document.querySelector('#input2');
const list = document.querySelector('#colleaguesList');

//visitors
const visitorsForm = document.querySelector('#visitorsForm');
const visitorsItem = document.querySelector('#input1Visitors');
const visitorsItem2 = document.querySelector('#input2Visitors');
const visitorsItem3 = document.querySelector('#input3Visitors');
const visitorsItem4 = document.querySelector('#input4Visitors');
const visitorsList = document.querySelector('#visitorsList');

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
    let div = this.parentElement;
    div.style.display = 'none';
    ipcRenderer.send('deleteItem', { item });
  });

  list.appendChild(li);
};

//render visitors
const renderVisitors = item => {
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

  const company = document.createElement('p');
  company.textContent = item.company;
  company.classList.add('names');
  li.appendChild(company);

  const visiting = document.createElement('p');
  visiting.textContent = item.visiting;
  visiting.classList.add('names');
  li.appendChild(visiting);

  const deleteBtn = document.createElement('p');
  deleteBtn.textContent = 'delete';
  deleteBtn.classList.add('names');
  li.appendChild(deleteBtn);

  deleteBtn.addEventListener('click', function(e) {
    let div = this.parentElement;
    div.style.display = 'none';
    //ipcRenderer.send('deleteItem', { item });
  });

  visitorsList.appendChild(li);
};

//Get All Items After Starting
window.addEventListener('load', () => ipcRenderer.send('loadAll'));
//ipcRenderer.on('loaded', (e, items) => items.forEach(item => render(item)));

ipcRenderer.on('loaded', (e, items) =>
  items.forEach(function(item) {
    if (item.type === 'colleagues') {
      render(item);
    } else {
      renderVisitors(item);
    }
  })
);

//Send Item to the server
form.addEventListener('submit', e => {
  e.preventDefault();

  if (item.value.length > 1 && item2.value.length > 1) {
    //set the date format
    let dateObj = new Date();
    let month = addZero(dateObj.getMonth() + 1);
    let day = addZero(dateObj.getDate());
    let year = dateObj.getFullYear();
    let hours = addZero(dateObj.getHours());
    let minutes = addZero(dateObj.getMinutes());

    issueDate = day + '/' + month + '/' + year + ' ' + hours + ':' + minutes;

    ipcRenderer.send('addItem', { id: Date.now(), firstName: item.value, lastName: item2.value, date: issueDate, returned: 'Not Returned', type: 'colleagues' });

    form.reset();
  }
});

visitorsForm.addEventListener('submit', e => {
  e.preventDefault();

  if (visitorsItem.value.length > 1 && visitorsItem2.value.length > 1) {
    //set the date format
    let dateObj = new Date();
    let month = addZero(dateObj.getMonth() + 1);
    let day = addZero(dateObj.getDate());
    let year = dateObj.getFullYear();
    let hours = addZero(dateObj.getHours());
    let minutes = addZero(dateObj.getMinutes());

    issueDate = day + '/' + month + '/' + year + ' ' + hours + ':' + minutes;

    ipcRenderer.send('addItem', {
      id: Date.now(),
      firstName: visitorsItem.value,
      lastName: visitorsItem2.value,
      date: issueDate,
      company: visitorsItem3.value,
      visiting: visitorsItem4.value,
      type: 'visitors'
    });

    visitorsForm.reset();
  }
});

const addZero = i => {
  if (i < 10) {
    i = '0' + i;
  }
  return i;
};

//Catches Add Item from server
ipcRenderer.on('added', (e, item) => {
  if (item.type === 'colleagues') {
    render(item);
  } else {
    renderVisitors(item);
  }
});

//Catches ClearAll from menu, sends the event to server to clear the db.
ipcRenderer.on('clearAll', () => ipcRenderer.send('clearAll'));
ipcRenderer.on('cleared', () => (list.innerHTML = ''));

//Catches delete
//ipcRenderer.on('deleted', (e, item) => console.log(item));

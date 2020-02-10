const electron = require('electron');
const { ipcRenderer } = electron;

//colleagues
const form = document.querySelector('#colleaguesForm');
const item = document.querySelector('#input1');
const item2 = document.querySelector('#input2');
const item3 = document.querySelector('#input3');
const list = document.querySelector('#colleaguesList');
const colleaguesSubmit = document.querySelector('#colleaguesSubmit');

//visitors
const visitorsForm = document.querySelector('#visitorsForm');
const visitorsItem = document.querySelector('#input1Visitors');
const visitorsItem2 = document.querySelector('#input2Visitors');
const visitorsItem3 = document.querySelector('#input3Visitors');
const visitorsItem4 = document.querySelector('#input4Visitors');
const visitorsList = document.querySelector('#visitorsList');
const visitorsSubmit = document.querySelector('#visitorsSubmit');

//divs and buttons
const initialDiv = document.querySelector('#initial');
const colleaguesDiv = document.querySelector('#colleagues');
const visitorsDiv = document.querySelector('#visitors');
const colleaguesListDiv = document.querySelector('#colleaguesListDiv');
const visitorsListDiv = document.querySelector('#visitorsListDiv');
const colleaguesBtn = document.querySelector('#colleaguesBtn');
const visitorsBtn = document.querySelector('#visitorsBtn');
const backBtn = document.querySelector('#backBtn');
const colleaguesListBtn = document.querySelector('#colleaguesListBtn');
const visitorsListBtn = document.querySelector('#visitorsListBtn');
const tyDiv = document.querySelector('#tyDiv');
const archiveDiv = document.querySelector('#archiveDiv');
const archiveBtn = document.querySelector('#archiveBtn');

//store the previous date so it knows when to break the list
var lastDate;
var lastDateV;

colleaguesBtn.addEventListener('click', function(e) {
  initialDiv.style.display = 'none';
  colleaguesDiv.style.display = 'block';
  backBtn.style.display = 'block';
  item.focus();
});

visitorsBtn.addEventListener('click', function(e) {
  initialDiv.style.display = 'none';
  visitorsDiv.style.display = 'block';
  backBtn.style.display = 'block';
  visitorsItem.focus();
});

colleaguesListBtn.addEventListener('click', function(e) {
  let passwordDiv = document.createElement('div');
  passwordDiv.classList.add('passwordDiv');
  document.body.appendChild(passwordDiv);
  let passwordMsg = document.createElement('p');
  passwordMsg.textContent = 'Enter password';
  passwordDiv.appendChild(passwordMsg);
  let passwordForm = document.createElement('form');
  passwordDiv.appendChild(passwordForm);
  let inputPassword = document.createElement('input');
  inputPassword.type = 'text';
  inputPassword.autofocus = true;
  inputPassword.classList.add('inputs');
  passwordForm.appendChild(inputPassword);
  let passwordSubmit = document.createElement('button');
  passwordSubmit.type = 'submit';
  passwordSubmit.textContent = 'Submit';
  passwordSubmit.classList.add('submitBtn');
  passwordForm.appendChild(passwordSubmit);
  let close = document.createElement('p');
  close.textContent = 'close';
  close.classList.add('close');
  passwordDiv.appendChild(close);

  close.addEventListener('click', e => {
    passwordDiv.style.display = 'none';
  });

  passwordForm.addEventListener('submit', e => {
    e.preventDefault();
    if (inputPassword.value === 'bh') {
      initialDiv.style.display = 'none';
      visitorsDiv.style.display = 'none';
      colleaguesDiv.style.display = 'none';
      visitorsListDiv.style.display = 'none';
      colleaguesListDiv.style.display = 'block';
      backBtn.style.display = 'block';
      archiveDiv.style.display = 'none';
      passwordDiv.style.display = 'none';
    } else {
      passwordMsg.textContent = 'Wrong password';
      passwordForm.reset();
      setTimeout(function() {
        passwordDiv.style.display = 'none';
        passwordMsg.textContent = 'Enter password';
      }, 1500);
    }
  });
});

visitorsListBtn.addEventListener('click', function(e) {
  let passwordDiv = document.createElement('div');
  passwordDiv.classList.add('passwordDiv');
  document.body.appendChild(passwordDiv);
  let passwordMsg = document.createElement('p');
  passwordMsg.textContent = 'Enter password';
  passwordDiv.appendChild(passwordMsg);
  let passwordForm = document.createElement('form');
  passwordDiv.appendChild(passwordForm);
  let inputPassword = document.createElement('input');
  inputPassword.type = 'text';
  inputPassword.autofocus = true;
  inputPassword.classList.add('inputs');
  passwordForm.appendChild(inputPassword);
  let passwordSubmit = document.createElement('button');
  passwordSubmit.type = 'submit';
  passwordSubmit.textContent = 'Submit';
  passwordSubmit.classList.add('submitBtn');
  passwordForm.appendChild(passwordSubmit);

  let close = document.createElement('p');
  close.textContent = 'close';
  close.classList.add('close');
  passwordDiv.appendChild(close);

  close.addEventListener('click', e => {
    passwordDiv.style.display = 'none';
  });

  passwordForm.addEventListener('submit', e => {
    e.preventDefault();
    if (inputPassword.value === 'bh') {
      initialDiv.style.display = 'none';
      visitorsDiv.style.display = 'none';
      colleaguesDiv.style.display = 'none';
      colleaguesListDiv.style.display = 'none';
      visitorsListDiv.style.display = 'block';
      backBtn.style.display = 'block';
      passwordDiv.style.display = 'none';
      archiveDiv.style.display = 'none';
    } else {
      passwordMsg.textContent = 'Wrong password';
      passwordForm.reset();
      setTimeout(function() {
        passwordDiv.style.display = 'none';
        passwordMsg.textContent = 'Enter password';
      }, 1500);
    }
  });
});

backBtn.addEventListener('click', function(e) {
  backToInitial();
});

const backToInitial = () => {
  initialDiv.style.display = 'block';
  visitorsDiv.style.display = 'none';
  colleaguesDiv.style.display = 'none';
  backBtn.style.display = 'none';
  colleaguesListDiv.style.display = 'none';
  visitorsListDiv.style.display = 'none';
  archiveDiv.style.display = 'none';
};

archiveBtn.addEventListener('click', function(e) {
  initialDiv.style.display = 'none';
  visitorsDiv.style.display = 'none';
  colleaguesDiv.style.display = 'none';
  backBtn.style.display = 'block';
  colleaguesListDiv.style.display = 'none';
  visitorsListDiv.style.display = 'none';
  archiveDiv.style.display = 'block';
});

//set the date format
const getToday = () => {
  let dateObj = new Date();
  let month = addZero(dateObj.getMonth() + 1);
  let day = addZero(dateObj.getDate());
  let year = dateObj.getFullYear();
  let hours = addZero(dateObj.getHours());
  let minutes = addZero(dateObj.getMinutes());

  issueDate = day + '/' + month + '/' + year + ' ' + hours + ':' + minutes;

  return issueDate;
};

//get yesterday date
const getYesterday = () => {
  let today = new Date();
  let yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  var dd = addZero(yesterday.getDate());
  var mm = addZero(yesterday.getMonth() + 1); //January is 0!
  var yyyy = yesterday.getFullYear();

  yesterday = dd + '/' + mm + '/' + yyyy;

  return yesterday;
};

//Render colleagues
const render = item => {
  const li = document.createElement('li');
  li.classList.add('colleaguesListPart');

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

  const card = document.createElement('p');
  card.textContent = item.card;
  card.classList.add('names');
  li.appendChild(card);

  const returnedCheck = document.createElement('p');
  returnedCheck.textContent = item.returned;
  returnedCheck.classList.add('names');
  returnedCheck.classList.add('returned');
  if (item.returned === 'Returned') {
    returnedCheck.style.color = '#76c043';
  } else {
    returnedCheck.style.color = 'red';
  }

  li.appendChild(returnedCheck);

  const note = document.createElement('p');
  note.textContent = item.note;
  note.classList.add('names');
  note.classList.add('notes');
  note.classList.add('listInput');
  li.appendChild(note);

  //add note
  note.addEventListener('click', function(e) {
    let noteDiv = document.createElement('div');
    noteDiv.classList.add('passwordDiv');
    document.body.appendChild(noteDiv);
    let noteMsg = document.createElement('p');
    noteMsg.textContent = 'Write a note';
    noteDiv.appendChild(noteMsg);
    let noteForm = document.createElement('form');
    noteDiv.appendChild(noteForm);
    let inputNote = document.createElement('input');
    inputNote.type = 'text';
    inputNote.autofocus = true;
    inputNote.classList.add('inputs');
    noteForm.appendChild(inputNote);
    let noteSubmit = document.createElement('button');
    noteSubmit.type = 'submit';
    noteSubmit.textContent = 'Submit';
    noteSubmit.classList.add('submitBtn');
    noteForm.appendChild(noteSubmit);

    let close = document.createElement('p');
    close.textContent = 'close';
    close.classList.add('close');
    noteDiv.appendChild(close);

    close.addEventListener('click', e => {
      noteDiv.style.display = 'none';
    });

    noteForm.addEventListener('submit', e => {
      e.preventDefault();
      if (inputNote.value !== '') {
        note.textContent = inputNote.value;
        let noteValue = inputNote.value;
        ipcRenderer.send('updateNote', { item, noteValue });
        noteForm.reset();
        noteDiv.style.display = 'none';
      } else {
        setTimeout(function() {
          noteDiv.style.display = 'none';
        }, 1500);
      }
    });
  });

  const deleteBtn = document.createElement('p');
  deleteBtn.textContent = 'delete';
  deleteBtn.classList.add('names');
  deleteBtn.classList.add('deleteBtn');
  li.appendChild(deleteBtn);

  returnedCheck.addEventListener('click', function(e) {
    if (this.textContent === 'Not Returned') {
      ipcRenderer.send('updateItemReturned', { item });
      this.textContent = 'Returned';
      this.style.color = '#76c043';
    } else if (this.textContent === 'Returned') {
      ipcRenderer.send('updateItemNotReturned', { item });
      this.textContent = 'Not Returned';
      this.style.color = 'red';
    }
  });

  deleteBtn.addEventListener('click', function(e) {
    let div = deleteBtn.parentElement;
    div.style.display = 'none';
    ipcRenderer.send('deleteItem', { item });
  });

  //set the gap between the dates
  if (item.date.slice(0, 3) !== lastDate && list.getElementsByTagName('li').length > 0) {
    li.classList.add('lastLi');
  }
  lastDate = item.date.slice(0, 3);

  list.appendChild(li);

  //console.log(list.getElementsByTagName('li').length);
};

//render visitors
const renderVisitors = item => {
  const li = document.createElement('li');
  li.classList.add('colleaguesListPart');

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
  deleteBtn.classList.add('deleteBtn');
  li.appendChild(deleteBtn);

  deleteBtn.addEventListener('click', function(e) {
    let div = deleteBtn.parentElement;
    div.style.display = 'none';
    ipcRenderer.send('deleteItem', { item });
  });

  //set the gap between the dates
  if (item.date.slice(0, 3) !== lastDateV && list.getElementsByTagName('li').length > 0) {
    li.classList.add('lastLi');
  }
  lastDateV = item.date.slice(0, 3);

  visitorsList.appendChild(li);
};

//Get All Items After Starting
window.addEventListener('load', () => ipcRenderer.send('loadAll'));
//ipcRenderer.on('loaded', (e, items) => items.forEach(item => render(item)));

ipcRenderer.on('loaded', (e, items) =>
  items.forEach(function(item) {
    //send for display only today and yesterday
    if (
      item.type === 'colleagues' &&
      (item.date.slice(0, 10) === getToday().slice(0, 10) || item.date.slice(0, 10) === getYesterday().slice(0, 10))
    ) {
      render(item);
    } else if (
      item.type === 'visitors' &&
      (item.date.slice(0, 10) === getToday().slice(0, 10) || item.date.slice(0, 10) === getYesterday().slice(0, 10))
    ) {
      renderVisitors(item);
    }
  })
);

//Send Item to the server
form.addEventListener('submit', e => {
  e.preventDefault();

  if (item.value.length > 1 && item2.value.length > 1 && item3.value.length > 0) {
    ipcRenderer.send('addItem', {
      id: Date.now(),
      date: getToday(),
      firstName: item.value,
      lastName: item2.value,
      card: item3.value,
      returned: 'Not Returned',
      note: 'Click to add',
      type: 'colleagues'
    });

    playSound('success');
    backToInitial();
    form.reset();
  } else {
    playSound('fail');
    fail();
  }
});

visitorsForm.addEventListener('submit', e => {
  e.preventDefault();

  if (
    visitorsItem.value.length > 1 &&
    visitorsItem2.value.length > 1 &&
    visitorsItem3.value.length > 1 &&
    visitorsItem4.value.length > 1
  ) {
    ipcRenderer.send('addItem', {
      id: Date.now(),
      date: getToday(),
      firstName: visitorsItem.value,
      lastName: visitorsItem2.value,
      company: visitorsItem3.value,
      visiting: visitorsItem4.value,
      type: 'visitors'
    });

    playSound('success');
    backToInitial();

    visitorsForm.reset();
  } else {
    playSound('fail');
    fail();
  }
});

//show message if the form is not filled
const fail = () => {
  let noteDiv = document.createElement('div');
  noteDiv.classList.add('passwordDiv');
  document.body.appendChild(noteDiv);
  let noteMsg = document.createElement('p');
  noteMsg.classList.add('smallTitle');
  noteMsg.textContent = 'Please use full names';
  noteDiv.appendChild(noteMsg);

  setTimeout(function() {
    noteDiv.style.display = 'none';
  }, 2000);
};

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

//Catches ClearAll from menu, asks for a password and sends the event to server to clear the db.
ipcRenderer.on('clearAll', () => {
  let passwordDiv = document.createElement('div');
  passwordDiv.classList.add('passwordDiv');
  document.body.appendChild(passwordDiv);
  let passwordMsg = document.createElement('p');
  passwordMsg.textContent = 'Enter password';
  passwordDiv.appendChild(passwordMsg);
  let passwordForm = document.createElement('form');
  passwordDiv.appendChild(passwordForm);
  let inputPassword = document.createElement('input');
  inputPassword.type = 'text';
  inputPassword.autofocus = true;
  inputPassword.classList.add('inputs');
  passwordForm.appendChild(inputPassword);
  let passwordSubmit = document.createElement('button');
  passwordSubmit.type = 'submit';
  passwordSubmit.textContent = 'Submit';
  passwordSubmit.classList.add('submitBtn');
  passwordForm.appendChild(passwordSubmit);

  let close = document.createElement('p');
  close.textContent = 'close';
  close.classList.add('close');
  passwordDiv.appendChild(close);

  close.addEventListener('click', e => {
    passwordDiv.style.display = 'none';
  });

  passwordForm.addEventListener('submit', function(e) {
    e.preventDefault();

    if (inputPassword.value === 'bhadmin') {
      ipcRenderer.send('clearAll');
      passwordDiv.style.display = 'none';
      passwordForm.reset();
    } else {
      passwordMsg.textContent = 'Wrong password';
      passwordForm.reset();
      setTimeout(function() {
        passwordDiv.style.display = 'none';
        passwordMsg.textContent = 'Enter password';
      }, 1500);
    }
  });
});

ipcRenderer.on('cleared', () => {
  list.innerHTML = '';
  visitorsList.innerHTML = '';
});

const playSound = status => {
  let sound1 = document.getElementById('audio1');
  let sound2 = document.getElementById('audio2');
  if (status === 'success') {
    sound1.play();

    //show thank you
    tyDiv.style.display = 'block';
    setTimeout(function() {
      tyDiv.style.display = 'none';
    }, 2000);
  } else if (status === 'fail') {
    sound2.play();
  }
};

const fireTest = () => {
  const fireTestText = document.getElementsByClassName('fire');
  const day = new Date();
  const day1 = day.getDay();
  // Sunday - Saturday : 0 - 6
  if (day1 === 3) {
    fireTestText[0].style.display = 'block';
    fireTestText[1].style.display = 'block';
  } else {
    fireTestText[0].style.display = 'none';
    fireTestText[1].style.display = 'none';
  }
};

fireTest();

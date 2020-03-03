const electron = require('electron');
const { ipcRenderer } = electron;

//colleagues
const form = document.querySelector('#colleaguesForm');
const item = document.querySelector('#input1');
const item2 = document.querySelector('#input2');
const item3 = document.querySelector('#input3');
const list = document.querySelector('#colleaguesList');
const colleaguesCount = document.querySelector('#colleaguesCount');
const colleaguesSubmit = document.querySelector('#colleaguesSubmit');

//visitors
const visitorsForm = document.querySelector('#visitorsForm');
const visitorsItem = document.querySelector('#input1Visitors');
const visitorsItem2 = document.querySelector('#input2Visitors');
const visitorsItem3 = document.querySelector('#input3Visitors');
const visitorsItem4 = document.querySelector('#input4Visitors');
const visitorsList = document.querySelector('#visitorsList');
const visitorsCount = document.querySelector('#visitorsCount');
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
const passwordDivHolder = document.querySelector('#passwordDivHolder');

//archive
const archiveDiv = document.querySelector('#archiveDiv');
const archiveBtn = document.querySelector('#archiveBtn');
const archForm = document.querySelector('#archForm');
const archItem1 = document.querySelector('#archItem1');
const archItem2 = document.querySelector('#archItem2');
const archItem3 = document.querySelector('#archItem3');
const archItem4 = document.querySelector('#archItem4');
const archItem5 = document.querySelector('#archItem5');
const archSubmit = document.querySelector('#archSubmit');
const archList = document.querySelector('#archList');
const archSelect = document.querySelector('#archSelect');
const archClear = document.querySelector('#archClear');
const archNumberLi = document.querySelector('#archNumberLi');
const archHeadV = document.querySelector('#archHeadV');
const archHeadC = document.querySelector('#archHeadC');

//store the previous date so it knows when to break the lists
var lastDate;
var lastDateV;

colleaguesBtn.addEventListener('click', function(e) {
  initialDiv.style.display = 'none';
  colleaguesDiv.style.display = 'block';
  backBtn.style.display = 'block';
  item.focus();
  fireTest();

  //clear old records once a day
  runOncePerDay();
});

visitorsBtn.addEventListener('click', function(e) {
  initialDiv.style.display = 'none';
  visitorsDiv.style.display = 'block';
  backBtn.style.display = 'block';
  visitorsItem.focus();
  fireTest();

  //clear old records once a day
  runOncePerDay();
});

colleaguesListBtn.addEventListener('click', function(e) {
  clearPasswordDiv();

  let passwordDiv = document.createElement('div');
  passwordDiv.classList.add('passwordDiv');
  passwordDivHolder.style.display = 'block';
  passwordDivHolder.appendChild(passwordDiv);
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
    passwordDivHolder.style.display = 'none';
  });

  passwordForm.addEventListener('submit', e => {
    e.preventDefault();
    if (inputPassword.value === 'bh' || inputPassword.value === 'BH') {
      initialDiv.style.display = 'none';
      visitorsDiv.style.display = 'none';
      colleaguesDiv.style.display = 'none';
      visitorsListDiv.style.display = 'none';
      colleaguesListDiv.style.display = 'block';
      backBtn.style.display = 'block';
      archiveDiv.style.display = 'none';
      passwordDivHolder.style.display = 'none';
    } else {
      passwordMsg.textContent = 'Wrong password';
      passwordForm.reset();
      setTimeout(function() {
        passwordDivHolder.style.display = 'none';
        passwordMsg.textContent = 'Enter password';
      }, 1500);
    }
  });

  //send a request to the db
  ipcRenderer.send('loadListColleagues', {
    today: getToday().slice(0, 10),
    yesterday: getYesterday().slice(0, 10),
    type: 'colleagues'
  });

  //clear the list first
  list.innerHTML = '';

  //clear old records once a day
  runOncePerDay();
});

visitorsListBtn.addEventListener('click', function(e) {
  clearPasswordDiv();

  let passwordDiv = document.createElement('div');
  passwordDiv.classList.add('passwordDiv');
  passwordDivHolder.style.display = 'block';
  passwordDivHolder.appendChild(passwordDiv);
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
    passwordDivHolder.style.display = 'none';
  });

  passwordForm.addEventListener('submit', e => {
    e.preventDefault();
    if (inputPassword.value === 'bh' || inputPassword.value === 'BH') {
      initialDiv.style.display = 'none';
      visitorsDiv.style.display = 'none';
      colleaguesDiv.style.display = 'none';
      colleaguesListDiv.style.display = 'none';
      visitorsListDiv.style.display = 'block';
      backBtn.style.display = 'block';
      passwordDivHolder.style.display = 'none';
      archiveDiv.style.display = 'none';
    } else {
      passwordMsg.textContent = 'Wrong password';
      passwordForm.reset();
      setTimeout(function() {
        passwordDivHolder.style.display = 'none';
        passwordMsg.textContent = 'Enter password';
      }, 1500);
    }
  });

  //send a request to the db
  ipcRenderer.send('loadListVisitors', {
    today: getToday().slice(0, 10),
    yesterday: getYesterday().slice(0, 10),
    type: 'visitors'
  });

  //clear the list first
  visitorsList.innerHTML = '';

  //clear old records once a day
  runOncePerDay();
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
  passwordDivHolder.style.display = 'none';

  lastDate = '';
  lastDateV = '';

  form.reset();
  visitorsForm.reset();
};

archiveBtn.addEventListener('click', function(e) {
  clearPasswordDiv();

  let passwordDiv = document.createElement('div');
  passwordDiv.classList.add('passwordDiv');
  passwordDivHolder.style.display = 'block';
  passwordDivHolder.appendChild(passwordDiv);
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
    passwordDivHolder.style.display = 'none';
  });

  passwordForm.addEventListener('submit', e => {
    e.preventDefault();
    if (inputPassword.value === 'bh' || inputPassword.value === 'BH') {
      initialDiv.style.display = 'none';
      visitorsDiv.style.display = 'none';
      colleaguesDiv.style.display = 'none';
      backBtn.style.display = 'block';
      colleaguesListDiv.style.display = 'none';
      visitorsListDiv.style.display = 'none';
      archiveDiv.style.display = 'block';
      passwordDivHolder.style.display = 'none';
    } else {
      passwordMsg.textContent = 'Wrong password';
      passwordForm.reset();
      setTimeout(function() {
        passwordDivHolder.style.display = 'none';
        passwordMsg.textContent = 'Enter password';
      }, 1500);
    }
  });

  //clear records older than 6 months
  runOncePerDay();
});

//clear the password div holder
const clearPasswordDiv = () => {
  while (passwordDivHolder.firstChild) {
    passwordDivHolder.removeChild(passwordDivHolder.firstChild);
  }

  passwordDivHolder.style.display = 'none';
};

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
  date.textContent = item.date + ' ' + item.hour;
  date.classList.add('names');
  li.appendChild(date);

  const name1 = document.createElement('p');
  name1.textContent = item.firstName.toUpperCase();
  name1.classList.add('names');
  li.appendChild(name1);

  const name2 = document.createElement('p');
  name2.textContent = item.lastName.toUpperCase();
  name2.classList.add('names');
  li.appendChild(name2);

  const card = document.createElement('p');
  card.textContent = item.card.toUpperCase();
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
        //get the actual status of returned
        let returnedStatus = returnedCheck.textContent;
        ipcRenderer.send('updateNote', { item, noteValue, returnedStatus });
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
    div.classList.remove('today');
    colleaguesCount.textContent = list.getElementsByClassName('today').length;
    ipcRenderer.send('deleteItem', { item });
  });

  //set the gap between the dates
  if (item.date.slice(0, 3) !== lastDate && list.getElementsByTagName('li').length > 0) {
    li.classList.add('lastLi');
  }

  //count
  if (item.date.slice(0, 10) === getToday().slice(0, 10)) {
    li.classList.add('today');
  }

  lastDate = item.date.slice(0, 3);

  return li;
};

//render visitors
const renderVisitors = item => {
  const li = document.createElement('li');
  li.classList.add('colleaguesListPart');

  const date = document.createElement('p');
  date.textContent = item.date + ' ' + item.hour;
  date.classList.add('names');
  li.appendChild(date);

  const name1 = document.createElement('p');
  name1.textContent = item.firstName.toUpperCase();
  name1.classList.add('names');
  li.appendChild(name1);

  const name2 = document.createElement('p');
  name2.textContent = item.lastName.toUpperCase();
  name2.classList.add('names');
  li.appendChild(name2);

  const company = document.createElement('p');
  company.textContent = item.company.toUpperCase();
  company.classList.add('names');
  company.classList.add('capitalize');
  li.appendChild(company);

  const visiting = document.createElement('p');
  visiting.textContent = item.visiting.toUpperCase();
  visiting.classList.add('names');
  visiting.classList.add('capitalize');
  li.appendChild(visiting);

  const deleteBtn = document.createElement('p');
  deleteBtn.textContent = 'delete';
  deleteBtn.classList.add('names');
  deleteBtn.classList.add('deleteBtn');
  li.appendChild(deleteBtn);

  deleteBtn.addEventListener('click', function(e) {
    let div = deleteBtn.parentElement;
    div.style.display = 'none';
    div.classList.remove('todayVisitors');
    visitorsCount.textContent = visitorsList.getElementsByClassName('todayVisitors').length;
    ipcRenderer.send('deleteItem', { item });
  });

  //set the gap between the dates
  if (item.date.slice(0, 3) !== lastDateV && visitorsList.getElementsByTagName('li').length > 0) {
    li.classList.add('lastLi');
  }

  //count
  if (item.date.slice(0, 10) === getToday().slice(0, 10)) {
    li.classList.add('todayVisitors');
  }

  lastDateV = item.date.slice(0, 3);

  return li;
};

//catch loaded colleagues list
ipcRenderer.on('loadedColleagues', (e, items) =>
  //send for display
  items.forEach(function(item) {
    list.appendChild(render(item));
    colleaguesCount.textContent = list.getElementsByClassName('today').length;
  })
);

//catch loaded visitors list
ipcRenderer.on('loadedVisitors', (e, items) =>
  //send for display
  items.forEach(function(item) {
    visitorsList.appendChild(renderVisitors(item));
    visitorsCount.textContent = visitorsList.getElementsByClassName('todayVisitors').length;
  })
);

//Send Item to the server
form.addEventListener('submit', e => {
  e.preventDefault();

  if (item.value.length > 1 && item2.value.length > 1 && item3.value.length > 0) {
    ipcRenderer.send('addItem', {
      id: Date.now(),
      date: getToday().slice(0, 10),
      hour: getToday().slice(11, 16),
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
      date: getToday().slice(0, 10),
      hour: getToday().slice(11, 16),
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
  noteMsg.textContent = 'Please fill all the boxes and use full names';
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

//archive submit and send to db
archForm.addEventListener('submit', e => {
  e.preventDefault();

  //clear the list
  archList.innerHTML = '';
  archHeadC.style.display = 'none';
  archHeadV.style.display = 'none';
  archNumberLi.textContent = '';

  let searchDate = `${archItem1.value.slice(8, 10)}/${archItem1.value.slice(5, 7)}/${archItem1.value.slice(0, 4)}`;
  let type = archSelect.options[archSelect.selectedIndex].value;
  let firstName = archItem2.value;
  let lastName = archItem3.value;
  let card = archItem4.value;
  let month = `${archItem5.value.slice(5, 7)}/${archItem5.value.slice(0, 4)}`;

  ipcRenderer.send('findItem', {
    searchDate,
    type,
    firstName,
    lastName,
    card,
    month
  });
});

//display search results
ipcRenderer.on('found', (e, docs) => {
  archList.innerHTML = '';
  archHeadC.style.display = 'none';
  archHeadV.style.display = 'none';
  archNumberLi.textContent = '';
  docs.forEach(function(item) {
    if (item.type === 'colleagues') {
      archList.appendChild(render(item));
      archHeadC.style.display = 'flex';
    } else if (item.type === 'visitors') {
      archList.appendChild(renderVisitors(item));
      archHeadV.style.display = 'flex';
    }
  });

  archNumberLi.textContent = archList.getElementsByTagName('li').length;
});

//clear the form and list
archClear.addEventListener('click', () => {
  archList.innerHTML = '';
  archHeadC.style.display = 'none';
  archHeadV.style.display = 'none';
  archNumberLi.textContent = '';
  archForm.reset();
});

//Catches ClearAll from menu, asks for a password and sends the event to server to clear the db.
ipcRenderer.on('clearAll', () => {
  clearPasswordDiv();
  let passwordDiv = document.createElement('div');
  passwordDiv.classList.add('passwordDiv');
  passwordDivHolder.style.display = 'block';
  passwordDivHolder.appendChild(passwordDiv);
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
    passwordDivHolder.style.display = 'none';
  });

  passwordForm.addEventListener('submit', function(e) {
    e.preventDefault();

    if (inputPassword.value === 'bhadmin') {
      ipcRenderer.send('clearAll');
      passwordDivHolder.style.display = 'none';
      passwordForm.reset();
    } else {
      passwordMsg.textContent = 'Wrong password';
      passwordForm.reset();
      setTimeout(function() {
        passwordDivHolder.style.display = 'none';
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
    tyDiv.style.display = 'flex';
    setTimeout(function() {
      tyDiv.style.display = 'none';
    }, 2000);
  } else if (status === 'fail') {
    sound2.play();
  }
};

//shows fire alarm test every wednesday before 11.00
const fireTest = () => {
  const fireTestText = document.getElementsByClassName('fire');
  const day = new Date();
  const day1 = day.getDay();
  const time = day.getHours();

  // Sunday - Saturday : 0 - 6
  if (day1 === 3 && time < 11) {
    fireTestText[0].style.display = 'block';
    fireTestText[1].style.display = 'block';
  } else {
    fireTestText[0].style.display = 'none';
    fireTestText[1].style.display = 'none';
  }
};

const clearOld = () => {
  //get the date 6 months ago
  var d = new Date();
  d.setMonth(d.getMonth() - 6);
  let sixAgo = d.toLocaleDateString();

  //add zero if < 10
  let arr = sixAgo.split('/');
  const zerAd = arr.map(i => {
    if (i.length < 2) {
      i = '0' + i;
      return i;
    } else {
      return i;
    }
  });

  const sixAgoFormated = `${zerAd[1]}/${zerAd[0]}/${zerAd[2]}`;
  console.log(sixAgoFormated);
  ipcRenderer.send('deleteOld', { sixAgoFormated });
};

// Clears the old once a day if one day has passed.
function hasOneDayPassed() {
  // get today's date.
  var date = new Date().toLocaleDateString();

  // if there's a date in localstorage and it's equal to the above:
  // inferring a day has yet to pass since both dates are equal.
  if (localStorage.myDate == date) return false;

  // this portion of logic occurs when a day has passed
  localStorage.myDate = date;
  return true;
}

// some function which should run once a day
function runOncePerDay() {
  if (!hasOneDayPassed()) {
    console.log('cleared');
    return false;
  } else {
    clearOld();
  }
}

//clear old records once a day
runOncePerDay();

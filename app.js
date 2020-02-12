const electron = require('electron');
const Datastore = require('nedb');
const url = require('url');
const path = require('path');
const menuBar = require('./src/components/MenuBar');

const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    icon: path.join(__dirname, 'assets/icons/win/icon.ico'),
    title: 'Britannia House Reception',
    webPreferences: { nodeIntegration: true }
  });
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, 'src/index.html'),
      protocol: 'File:',
      slashes: true
    })
  );
  mainWindow.on('closed', () => app.quit());
  mainWindow.maximize();
  const mainMenu = Menu.buildFromTemplate(menuBar);

  Menu.setApplicationMenu(mainMenu);
});

const db = new Datastore({
  filename: './items.db',
  autoload: true
});

// Get all items from db, sort by id and send them to the client
ipcMain.on('loadAll', () =>
  db
    .find({})
    .sort({ id: 1 })
    .exec((err, items) => mainWindow.webContents.send('loaded', items))
);

//Saves item and returns it to client
ipcMain.on('addItem', (e, item) => {
  db.insert(item, err => {
    if (err) throw new Error(err);
  });

  mainWindow.webContents.send('added', item);
});

// Clears database and send event to client if sussesful
ipcMain.on('clearAll', () => {
  db.remove({}, { multi: true }, err => {
    if (err) throw new Error(err);
    mainWindow.webContents.send('cleared');
  });
});

//delete item from the db
ipcMain.on('deleteItem', (e, item) => {
  db.remove({ id: item.item.id }, {});
});

//update returned
ipcMain.on('updateItemReturned', (e, item) => {
  db.update(
    { id: item.item.id },
    {
      id: item.item.id,
      firstName: item.item.firstName,
      lastName: item.item.lastName,
      card: item.item.card,
      date: item.item.date,
      hour: item.item.hour,
      returned: 'Returned',
      note: item.item.note,
      type: 'colleagues'
    },
    {}
  );
});

//update not returned
ipcMain.on('updateItemNotReturned', (e, item) => {
  db.update(
    { id: item.item.id },
    {
      id: item.item.id,
      firstName: item.item.firstName,
      lastName: item.item.lastName,
      card: item.item.card,
      date: item.item.date,
      hour: item.item.hour,
      returned: 'Not Returned',
      note: item.item.note,
      type: 'colleagues'
    },
    {}
  );
});

ipcMain.on('updateNote', (e, item, noteValue) => {
  db.update(
    { id: item.item.id },
    {
      id: item.item.id,
      firstName: item.item.firstName,
      lastName: item.item.lastName,
      card: item.item.card,
      date: item.item.date,
      hour: item.item.hour,
      returned: item.item.returned,
      note: item.noteValue,
      type: 'colleagues'
    },
    {}
  );
});

//find

ipcMain.on('findItem', (e, item) => {
  /*
  db.find({ date: item.searchDate, type: item.type })
    .sort({ id: 1 })
    .exec((err, docs) => mainWindow.webContents.send('found', docs));
*/
  //date only
  if (item.searchDate !== '//' && item.firstName === '' && item.lastName === '') {
    db.find({ date: item.searchDate, type: item.type })
      .sort({ id: 1 })
      .exec((err, docs) => mainWindow.webContents.send('found', docs));

    //last name no date
  } else if (item.searchDate === '//' && item.firstName === '' && item.lastName !== '') {
    db.find({ type: item.type, lastName: item.lastName })
      .sort({ id: 1 })
      .exec((err, docs) => mainWindow.webContents.send('found', docs));

    //first name no date
  } else if (item.searchDate === '//' && item.firstName !== '' && item.lastName === '') {
    db.find({ type: item.type, firstName: item.firstName })
      .sort({ id: 1 })
      .exec((err, docs) => mainWindow.webContents.send('found', docs));

    //last name with date
  } else if (item.searchDate !== '//' && item.firstName === '' && item.lastName !== '') {
    db.find({ date: item.searchDate, type: item.type, lastName: item.lastName })
      .sort({ id: 1 })
      .exec((err, docs) => mainWindow.webContents.send('found', docs));

    //first name with date
  } else if (item.searchDate !== '//' && item.firstName !== '' && item.lastName === '') {
    db.find({ date: item.searchDate, type: item.type, firstName: item.firstName })
      .sort({ id: 1 })
      .exec((err, docs) => mainWindow.webContents.send('found', docs));

    //both names no date
  } else if (item.searchDate === '//' && item.firstName !== '' && item.lastName !== '') {
    db.find({ type: item.type, firstName: item.firstName, lastName: item.lastName })
      .sort({ id: 1 })
      .exec((err, docs) => mainWindow.webContents.send('found', docs));

    //both names with date
  } else if (item.searchDate !== '//' && item.firstName !== '' && item.lastName !== '') {
    db.find({ type: item.type, firstName: item.firstName, lastName: item.lastName })
      .sort({ id: 1 })
      .exec((err, docs) => mainWindow.webContents.send('found', docs));
  }
});

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

// Get all items from db and send them to the client
//ipcMain.on('loadAll', () => db.find({}, (err, items) => mainWindow.webContents.send('loaded', items)));

ipcMain.on('loadAll', () =>
  db
    .find({})
    .sort({ date: 1 })
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

ipcMain.on('deleteItem', (e, item) => {
  db.remove({ id: item.item.id }, {});
});

ipcMain.on('updateItemReturned', (e, item) => {
  db.update(
    { id: item.item.id },
    {
      id: item.item.id,
      firstName: item.item.firstName,
      lastName: item.item.lastName,
      card: item.item.card,
      date: item.item.date,
      returned: 'Returned',
      type: 'colleagues'
    },
    {}
  );
});

ipcMain.on('updateItemNotReturned', (e, item) => {
  db.update(
    { id: item.item.id },
    {
      id: item.item.id,
      firstName: item.item.firstName,
      lastName: item.item.lastName,
      card: item.item.card,
      date: item.item.date,
      returned: 'Not Returned',
      type: 'colleagues'
    },
    {}
  );
});

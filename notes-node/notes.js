console.log('Starting notes.js');

const fs = require('fs');

var fetchNotes = () => {
  try {
    var notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  } catch (e) {
    // return empty array, if an error occured (ie. no file exists)
    return [];
  }
};

var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
  // fetch notes
  var notes = fetchNotes();
  // declare note object
  var note = {
    title,
    body
  };
  // get rid of duplicate note titles
  var duplicateNotes = notes.filter((note) => note.title === title);

  // if not empty save note
  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

var getAll = () => {
  console.log('Getting all notes');
};

var getNote = (title) => {
  console.log('Getting note', title);
};

var removeNote = (title) => {
  // fetch notes
  var notes = fetchNotes();
  // filter notes, removing the one with title of argument
  var newNotes = notes.filter((note) => note.title !== title);
  // save new notes array
  saveNotes(newNotes);

  // return boolean if note was deleted
  return notes.length !== newNotes.length;
};

// export modules
module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote
};

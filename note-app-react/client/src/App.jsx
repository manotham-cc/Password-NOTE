
import React, { useState } from 'react';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  const addNote = () => {
    if (newNote.trim() !== '') {
      setNotes([...notes, newNote]);
      setNewNote('');
    }
  };

  const deleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  return (
    <div className="app">
      <h1>PASSWORD NOTE</h1>
      <div className="note-form">
        <input
          type="text"
          placeholder="Enter a note"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <button onClick={addNote}>Add Note</button>
      </div>
      <div className="note-list">
        {notes.map((note, index) => (
          <div className="note" key={index}>
            <span>{note}</span>
            <button onClick={() => deleteNote(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

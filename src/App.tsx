import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';
import './App.css';
import NoteForm from './components/NoteForm';
import NoteList, { Note } from './components/NotesList';
import { Routes, Route, NavLink } from "react-router-dom";
import Swal from 'sweetalert2';
import NoteBin from './components/NoteBin';

function App() {

  const [notes, setNotes] = useState<Array<Note>>(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : 
      [{ id: nanoid(), text: 'nota 1', deleted: false }, { id: nanoid(), text: 'nota 2', deleted: false }, { id: nanoid(), text: 'nota 3', deleted: false }]
  });

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  })

  const addNoteHandler = (text: string) => {
    setNotes([...notes, { text, id: nanoid(), deleted: false }]);
  }

  const removeNoteHandler = (id: string) => {
    const index = notes.findIndex(note => note.id === id);
    if (notes[index].deleted) {
      Swal.fire({
        title: 'Caution',
        text: 'Are you sure?',
        showCancelButton: true
      }).then(({ isConfirmed }) => {
        if (isConfirmed) {
          notes.splice(index, 1);
          setNotes([...notes]);
        }
      })
    } else {
      notes.splice(index, 1, { ...notes[index], deleted: true });
      setNotes([...notes]);
    }
  }

  const editNoteHandler = (id: string) => (text: string) => {
    const index = notes.findIndex(note => note.id === id);
    notes[index].text = text;
    setNotes([...notes]);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>Notes Management App</h2>
        <div className='navigation'>
          <NavLink to='/'>Notes</NavLink>
          <NavLink to='/trashBin'>Trash Bin</NavLink>
        </div>
        <div className='notes-list'>
          <Routes>
            <Route path='/' element={
              <React.Fragment>
                <NoteList notes={notes.filter((note) => !note.deleted)} editNoteHandler={editNoteHandler} removeNoteHandler={removeNoteHandler} />
                <NoteForm addNoteHandler={addNoteHandler} />
              </React.Fragment>
            } />
            <Route path='/trashBin' element={
              <NoteBin notes={notes.filter((note) => note.deleted)} removeNoteHandler={removeNoteHandler}/>
            } />
          </Routes>
        </div>
      </header>
    </div>
  );
}

export default App;

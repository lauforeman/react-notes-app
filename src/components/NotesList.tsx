import React, { useState } from 'react';
import NoteForm from './NoteForm';
import NoteItem from './NoteItem';

export type Note = {
    id: string;
    text: string;
    deleted: boolean;
}

type Dictionary<T> = {
    [key: string]: T;
}

type NoteListProp = {
    notes : Array<Note>;
    editNoteHandler: (id: string) => (text: string) => void;
    removeNoteHandler: (id: string) => void;
}

function NoteList({ notes, editNoteHandler, removeNoteHandler }: NoteListProp) {

    const [editMode, setEditMode] = useState<Dictionary<boolean>>(notes.reduce((dic, note) => ({ ...dic, [note.id]: false }), {}));

    const toggleEditModeHandler = (id: string) => {
        setEditMode({ ...editMode, [id]: !editMode[id] });
    }

    return (<React.Fragment> {
        notes.map(note => !editMode[note.id] ? (
            <NoteItem key={note.id} text={note.text} removeNoteHandler={() => removeNoteHandler(note.id)} editNoteHandler={() => toggleEditModeHandler(note.id)} deleted={note.deleted}/>
          ) : <NoteForm key={note.id} addNoteHandler={editNoteHandler(note.id)} toggleEditMode={() => toggleEditModeHandler(note.id)} text={note.text} editMode={editMode[note.id]} />)
     }</React.Fragment>)

}

export default NoteList;
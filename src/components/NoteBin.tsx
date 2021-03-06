import React, { } from 'react';
import NoteItem from './NoteItem';

export type Note = {
    id: string;
    text: string;
    deleted: boolean;
}

type NoteBinProp = {
    notes: Array<Note>;
    removeNoteHandler: (id: string) => void;
}

function NoteBin({ notes, removeNoteHandler }: NoteBinProp) {

    return (<React.Fragment> {
        notes.map(note => (
            <NoteItem key={note.id} text={note.text} removeNoteHandler={() => removeNoteHandler(note.id)} deleted={note.deleted} />
        ))
    }</React.Fragment>)

}

export default NoteBin;
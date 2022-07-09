import { useState } from "react";
import { AiTwotoneDelete, AiFillFileAdd } from "react-icons/ai";

type NoteFormProp = {
    addNoteHandler: (text: string) => void;
    text?: string;
    editMode?: boolean;
    toggleEditMode?: () => void;
}

function NoteForm({ addNoteHandler, text, editMode, toggleEditMode }: NoteFormProp) {

    const [noteText, setNoteText] = useState(text || '');

    const onAddClick = () => {
        if (noteText.length > 0) {
            addNoteHandler(noteText);
            setNoteText('');
            if (editMode && toggleEditMode) {
                toggleEditMode();
            }
        }
    }

    const onCancelClick = () => {
        if (editMode && toggleEditMode) {
            toggleEditMode();
        } else {
            setNoteText('');
        }
    }

    return (<div className='note-item'>
        <textarea value={noteText} onChange={(event) => setNoteText(event.target.value)} />
        <div className="note-item-footer">
            <AiFillFileAdd color="green" onClick={onAddClick}></AiFillFileAdd>
            <AiTwotoneDelete color="red" onClick={onCancelClick}></AiTwotoneDelete>
        </div>
    </div>)
}

export default NoteForm;
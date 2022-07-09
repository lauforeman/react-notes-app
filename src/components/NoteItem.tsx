import { AiTwotoneDelete, AiFillEdit } from "react-icons/ai";

type NoteItemProp = {
    text: string;
    deleted: boolean;
    removeNoteHandler: () => void;
    editNoteHandler?: () => void;
}

function NoteItem({ text, removeNoteHandler, editNoteHandler, deleted }: NoteItemProp) {

    const onDeleteClick = () => {
        removeNoteHandler();
    }

    const onEditClick = () => {
        if (editNoteHandler) {
            editNoteHandler();
        }
    }

    return (<div className='note-item'>

        <textarea placeholder="Write note content here:" value={text} readOnly />

        <div className="note-item-footer">
            {deleted || <AiFillEdit color="blue" onClick={onEditClick}></AiFillEdit>}
            <AiTwotoneDelete color="red" onClick={onDeleteClick}></AiTwotoneDelete>
        </div>
    </div>)
}

export default NoteItem;
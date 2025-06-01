const Note = ({ note, toggleImportance }) => {
    const label = note.important ? 'set as not important' : 'set as important'
    return (
        <li className="note">{note.content}
        <button className="impToggle" onClick={toggleImportance}>{label}</button>
        </li>
    )
}
export default Note
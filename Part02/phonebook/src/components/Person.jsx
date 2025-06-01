import Button from './Button'
const Person = ({name, number, del, id}) => {
    return (
        <li>
            <span>{name}, {number}</span>
            <Button key={id} handler={del} name='delete'/>
        </li>
    )
}
export default Person
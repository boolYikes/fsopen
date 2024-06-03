import Person from './Person'
const Search = ({result}) => {
    return (
        <div>
            {result.map((person) => <Person key={person.id} name={person.name} number={person.number}/>)}
        </div>
    )
}
export default Search
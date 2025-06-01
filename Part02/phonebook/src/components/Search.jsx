import Person from './Person'
const Search = ({result, del}) => {
    return (
        <ul>
            {result.map((person) => 
                <Person key={person.id}  name={person.name} number={person.number} del={del}/>
            )}
        </ul>
    )
}
export default Search
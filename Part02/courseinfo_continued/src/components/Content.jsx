import Part from './Part'
const Content = ({parts}) => {
    return(
    <div>
        <ul style={{listStyleType: 'none'}}>
            {parts.map(part=>
                <Part key={part.id} part={part}/>
                )
            }
        </ul>
        <strong>Total of {parts.reduce((acc, curr)=>{
            acc += curr['exercises']
            return acc
        }, 0)} exercises</strong>
    </div>
    )
}
export default Content
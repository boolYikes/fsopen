import Head from './Head'
import Content from './Content'
const Course = ({course}) => {
    return (
        <div>
            <Head title={course.name}/>
            <Content parts={course.parts}/>
        </div>
    )
}
export default Course